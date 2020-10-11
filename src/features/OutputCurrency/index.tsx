import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { Preloader } from '@features';
import {
    fetchCurrencies,
    $currencies,
    changeSecondaryCur,
    $secondaryCurrency,
    $currenciesOptions,
} from '../../core/models/converter';
import { Select } from '@ui';
import { colors } from '@constants';

const Wrapper = styled.div`
    color: #000;
    display: flex;
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

export function OutputCurrency(): JSX.Element {
    const loading = useStore(fetchCurrencies.pending);
    const currenciesList: any = useStore($currencies);
    const secondaryCurrency: string = useStore($secondaryCurrency);
    const options = useStore($currenciesOptions);
    return (
        <Wrapper>
            {loading && <Preloader />}
            {currenciesList && (
                <>
                    <Inner>Output currency: {secondaryCurrency}</Inner>
                    <div>
                        <Select
                            label="Change output currency:"
                            value={secondaryCurrency}
                            options={options}
                            onChange={changeSecondaryCur}
                        />
                    </div>
                </>
            )}
        </Wrapper>
    );
}
