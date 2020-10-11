import { createEffect, createStore, createEvent, guard, forward, sample } from 'effector';
import { createGate } from 'effector-react';

const url = 'https://api.exchangeratesapi.io/latest';

type Currencies = {
    base: string;
    date: string;
    rates: Record<string, number>;
};

export const tearUp = createGate();

async function handleFetch(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`${res.status}`);
    } else {
        return res.json();
    }
}

function handleQueryString(url: string, param: string) {
    const currentUrl = new URL(url);
    currentUrl.searchParams.set('base', param);
    return currentUrl.toString();
}

export const changeSecondaryCur = createEvent();
export const changeBaseCur = createEvent<any>();
const swapCurrenciesFx = createEffect((obj: any) => {
    changeBaseCur(obj.$secondaryCurrency);
    changeSecondaryCur(obj.$baseCurrency);
});

const $url = createStore(url).on(changeBaseCur, (state, payload) => handleQueryString(state, payload));

export const fetchCurrencies = createEffect(async () => handleFetch($url.getState()));
export const $currencies = createStore<Currencies | null>(null).on(fetchCurrencies.doneData, (state, result) => result);

export const swapCurrencies = createEvent();

export const $baseCurrency = $currencies
    .map((state) => (state ? state.base : 'EUR'))
    .on(changeBaseCur, (state, payload) => payload);

export const $currenciesOptions = $currencies.map((currenciesList) =>
    currenciesList ? Object.keys(currenciesList.rates).map((key) => ({ label: key, value: key })) : [],
);

export const $secondaryCurrency = createStore('CAD').on(changeSecondaryCur, (state, payload) => payload);
export const changeBaseAmount = createEvent<number>();
export const $baseAmount = createStore(0).on(changeBaseAmount, (state, payload) => payload);

const changeCurFx = createEffect((obj: any) => {
    const rates = obj.$currencies.rates;
    return obj.$baseAmount * rates[obj.$secondaryCurrency];
});

const changeBaseAmountFx = createEffect((obj: any) => {
    const rates = obj.$currencies.rates;
    return obj.$baseAmount * rates[obj.$secondaryCurrency];
});

export const $secondaryAmount = createStore(0)
    .on(changeBaseAmountFx.doneData, (state, result) => result)
    .on(changeCurFx.doneData, (state, result) => result);

sample({
    source: { $baseCurrency, $secondaryCurrency },
    clock: [swapCurrencies],
    fn: (obj: any) => obj,
    target: swapCurrenciesFx,
});

sample({
    source: { $currencies, $baseAmount, $secondaryCurrency },
    clock: [changeBaseCur, fetchCurrencies.doneData],
    fn: (obj: any) => obj,
    target: changeCurFx,
});

sample({
    source: { $currencies, $baseAmount, $secondaryCurrency },
    clock: changeSecondaryCur,
    fn: (obj) => obj,
    target: changeCurFx,
});

sample({
    source: { $currencies, $secondaryCurrency, $baseAmount },
    clock: changeBaseAmount,
    fn: (obj) => obj,
    target: changeBaseAmountFx,
});

forward({
    from: changeBaseCur,
    to: fetchCurrencies,
});

const listIsEmpty = $currencies.map((state) => !state);

guard({
    source: tearUp.open,
    filter: listIsEmpty,
    target: fetchCurrencies,
});
