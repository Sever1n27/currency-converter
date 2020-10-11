import React from 'react';
import { useGate, useStore } from 'effector-react';
import { tearUp, fetchCurrencies, $currencies } from '../../core/models';

export function Converter(): JSX.Element {
    useGate(tearUp);
    const loading = useStore(fetchCurrencies.pending);
    const currenciesList = useStore($currencies);
    return <div>{loading ? 'loading...' : 'loaded'}</div>;
}
