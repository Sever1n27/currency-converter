import { createEffect, createStore, createEvent, guard, split } from 'effector';
import { createGate } from 'effector-react';

const url = 'https://api.exchangeratesapi.io/latest123';

type Currencies = {
    base: string;
    date: string;
    rates: Record<string, number>;
};

export const tearUp = createGate();

export const fetchCurrencies = createEffect(async () => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`${res.status}`);
    } else {
        return res.json();
    }
});

export const $currencies = createStore<Currencies | null>(null).on(fetchCurrencies.doneData, (state, result) => result);

export const $availableCurrencies = $currencies.map((state) => state?.rates);

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
