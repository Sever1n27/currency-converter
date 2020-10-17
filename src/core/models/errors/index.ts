import { createStore, createEvent, split } from 'effector';
import { fetchCurrencies } from '../converter';

export const $error = createStore<string>('');

const { badRequest, notfoundError, serversideError, networkError } = split(fetchCurrencies.failData, {
    badRequest: (error: Error) => error.message === '400',
    notfoundError: (error: Error) => error.message === '404',
    serversideError: (error: Error) => error.message >= '500',
    networkError: (error: Error) => error.message === undefined,
});

export const clearError = createEvent();

$error
    .on(fetchCurrencies, () => '')
    .on(clearError, () => '')
    .on(badRequest, () => 'Неправильный запрос (HTTP 400)')
    .on(notfoundError, () => 'Страница не найдена (HTTP 404)')
    .on(serversideError, () => 'Ошибка на стороне сервера (HTTP 500)')
    .on(networkError, () => 'Проблема с сетевым подключением');
