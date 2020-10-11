import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { Preloader } from '@features';
import {
    fetchCurrencies,
    $currencies,
    changeBaseCur,
    $baseCurrency,
    $currenciesOptions,
} from '../../core/models/converter';
import { Select } from '@ui';
import { colors } from '@constants';

const Wrapper = styled.div`
    color: #000;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    background: ${colors.mainlight};
    border-radius: 4px;
    padding: 20px;
`;

const Inner = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
    min-width: 200px;
`;

export function BaseCurrency(): JSX.Element {
    const loading = useStore(fetchCurrencies.pending);
    const currenciesList: any = useStore($currencies);
    const baseCurrency: string = useStore($baseCurrency);
    const options = useStore($currenciesOptions);
    return (
        <Wrapper>
            {loading && <Preloader />}
            {currenciesList && (
                <>
                    <Inner>Base currency: {currenciesList.base}</Inner>
                    <div>
                        <Select
                            label="Change base currency:"
                            value={baseCurrency}
                            options={options}
                            onChange={changeBaseCur}
                        />
                    </div>
                </>
            )}
        </Wrapper>
    );
}
