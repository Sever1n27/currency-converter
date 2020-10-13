import { createEffect, createStore, createEvent, guard, forward, sample, Store, GetCombinedValue } from 'effector';
import { createGate } from 'effector-react';
import { Currencies, CurrenciesObject, CurrenciesContainer } from '@types';

const url = 'https://api.exchangeratesapi.io/latest';

export const tearUp = createGate();

async function handleFetch(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`${res.status}`);
    } else {
        return res.json();
    }
}

function handleQueryString(url: string, key: string, param: string) {
    const currentUrl = new URL(url);
    currentUrl.searchParams.set(key, param);
    return currentUrl.toString();
}

export const changeSecondaryCur = createEvent<string>();
export const changeBaseCur = createEvent<string>();
const swapCurrenciesFx = createEffect((obj: CurrenciesObject) => {
    changeBaseCur(obj.$secondaryCurrency);
    changeSecondaryCur(obj.$baseCurrency);
});

const $url = createStore(url).on(changeBaseCur, (state, payload) => handleQueryString(state, 'base', payload));

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

const recalculateCurrenciesFx = createEffect((obj: CurrenciesContainer) => {
    const rates = obj?.$currencies?.rates || {};
    return obj.$baseAmount * rates[obj.$secondaryCurrency];
});

export const $secondaryAmount = createStore(0).on(recalculateCurrenciesFx.doneData, (state, result) => result);

sample({
    source: { $baseCurrency, $secondaryCurrency },
    clock: [swapCurrencies],
    fn: (obj: CurrenciesObject) => obj,
    target: swapCurrenciesFx,
});

sample({
    source: { $currencies, $baseAmount, $secondaryCurrency },
    clock: [changeBaseCur, fetchCurrencies.doneData, changeBaseAmount, changeSecondaryCur],
    fn: (
        obj: GetCombinedValue<{
            $currencies: Store<Currencies | null>;
            $baseAmount: Store<number>;
            $secondaryCurrency: Store<string>;
        }>,
    ) => obj,
    target: recalculateCurrenciesFx,
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
