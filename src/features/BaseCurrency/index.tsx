import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { $currencies, changeBaseCur, $baseCurrency, $currenciesOptions } from '../../core/models/converter';
import { Currencies } from '@types';
import { Select } from '@ui';
import { colors } from '@constants';

const Wrapper = styled.div`
    color: ${colors.secondarylight};
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    background: ${colors.mainlight};
    border-radius: 4px;
    padding: 20px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 1px 5px 0px rgba(0, 0, 0, 0.12);
`;

const Inner = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
    min-width: 200px;
`;

export function BaseCurrency() {
    const currenciesList: Currencies = useStore($currencies);
    const baseCurrency: string = useStore($baseCurrency);
    const options = useStore($currenciesOptions);
    return (
        <Wrapper>
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
