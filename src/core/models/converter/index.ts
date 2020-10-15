import { createEffect, combine, createEvent, forward, sample, restore } from 'effector';
import { Currencies, Rates } from '@types';

async function fetchCurrenciesRequest(currency: string) {
    const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${currency}`);
    if (!res.ok) throw new Error(`${res.status}`);
    return res.json();
}

function calculateTargetAmount(baseAmount: number, target: string, rates: Rates) {
    const rate = rates[target] || 0;
    return baseAmount * rate;
}

export const changeBaseCur = createEvent<string>();
export const changeSecondaryCur = createEvent<string>();
export const swapCurrencies = createEvent();
export const fetchCurrencies = createEffect(fetchCurrenciesRequest);
export const $currencies = restore<Currencies>(fetchCurrencies.doneData, null);
export const $baseCurrency = restore(changeBaseCur, 'EUR');
export const $secondaryCurrency = restore(changeSecondaryCur, 'CAD');
export const $rates = $currencies.map((currencies) => currencies?.rates ?? {});
export const changeBaseAmount = createEvent<number>();
export const $baseAmount = restore(changeBaseAmount, 0);
export const $secondaryAmount = combine($baseAmount, $secondaryCurrency, $rates, calculateTargetAmount);

export const $currenciesOptions = $rates.map((currenciesList) =>
    Object.keys(currenciesList).map((key) => ({ label: key, value: key })),
);

const swapped = sample(combine($baseCurrency, $secondaryCurrency), swapCurrencies);

forward({ from: swapped.map(([_, target]) => target), to: changeBaseCur });
forward({ from: swapped.map(([base, _]) => base), to: changeSecondaryCur });
forward({ from: $baseCurrency, to: fetchCurrencies });
