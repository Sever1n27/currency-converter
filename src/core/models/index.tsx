import { createEffect, createStore, createEvent, guard, split, forward, sample } from 'effector';
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
export const changeBaseCur = createEvent<string>();
const $url = createStore(url).on(changeBaseCur, (state, payload) => {
    const currentUrl = new URL(state);
    currentUrl.searchParams.set('base', payload);
    return currentUrl.toString();
});

export const fetchCurrencies = createEffect(async () => handleFetch($url.getState()));
export const $currencies = createStore<Currencies | null>(null).on(fetchCurrencies.doneData, (state, result) => result);

export const $baseCurrency = $currencies
    .map((state) => (state ? state.base : 'EUR'))
    .on(changeBaseCur, (state, payload) => payload);

export const $currenciesOptions = $currencies.map((currenciesList) =>
    currenciesList ? Object.keys(currenciesList.rates).map((key) => ({ label: key, value: key })) : [],
);
export const changeSecondaryCur = createEvent();
export const $secondaryCurrency = createStore('CAD').on(changeSecondaryCur, (state, payload) => payload);
export const changeBaseAmount = createEvent<number>();
export const $baseAmount = createStore(0).on(changeBaseAmount, (state, payload) => payload);
export const $secondaryAmount = $currencies
    .map((currencies) => {
        if (currencies) {
            return $baseAmount.getState() * currencies?.rates[$secondaryCurrency.getState()];
        }
        return 0;
    })
    .on(changeBaseAmount, (state, payload) => {
        const currencies = $currencies.getState();
        const rates = currencies?.rates;
        if (rates) {
            return payload * rates[$secondaryCurrency.getState()];
        }
    })
    .on(changeSecondaryCur, (state, payload) => {
        const currencies = $currencies.getState();
        const rates = currencies?.rates;
        const baseAmount = $baseAmount.getState();
        if (rates) {
            return baseAmount * rates[`${payload}`];
        }
    });

forward({
    from: changeBaseCur,
    to: fetchCurrencies,
});

export const $error = createStore<Record<string, string> | null>(null);

const { badRequest, notfoundError, serversideError, networkError } = split(fetchCurrencies.failData, {
    badRequest: (error: any) => error.message === '400',
    notfoundError: (error: any) => error.message === '404',
    serversideError: (error: any) => error.message >= '500',
    networkError: (error: any) => error.message === undefined,
});

export const clearError = createEvent();

$error
    .on(fetchCurrencies, () => null)
    .on(clearError, () => null)
    .on(badRequest, () => ({ message: 'Неправильный запрос (HTTP 400)', type: 'error' }))
    .on(notfoundError, () => ({ message: 'Страница не найдена (HTTP 404)', type: 'error' }))
    .on(serversideError, () => ({ message: 'Ошибка на стороне сервера (HTTP 500)', type: 'error' }))
    .on(networkError, () => ({ message: 'Проблема с сетевым подключением', type: 'error' }));

const listIsEmpty = $currencies.map((state) => !state);

guard({
    source: tearUp.open,
    filter: listIsEmpty,
    target: fetchCurrencies,
});
