import { createStore, createEvent, split } from 'effector';
import { fetchCurrencies } from '../converter';

export const $error = createStore<Record<string, string> | null>(null);

const { badRequest, notfoundError, serversideError, networkError } = split(fetchCurrencies.failData, {
    badRequest: (error: Error) => error.message === '400',
    notfoundError: (error: Error) => error.message === '404',
    serversideError: (error: Error) => error.message >= '500',
    networkError: (error: Error) => error.message === undefined,
});

export const clearError = createEvent();

$error
    .on(fetchCurrencies, () => null)
    .on(clearError, () => null)
    .on(badRequest, () => ({ message: 'Неправильный запрос (HTTP 400)', type: 'error' }))
    .on(notfoundError, () => ({ message: 'Страница не найдена (HTTP 404)', type: 'error' }))
    .on(serversideError, () => ({ message: 'Ошибка на стороне сервера (HTTP 500)', type: 'error' }))
    .on(networkError, () => ({ message: 'Проблема с сетевым подключением', type: 'error' }));
