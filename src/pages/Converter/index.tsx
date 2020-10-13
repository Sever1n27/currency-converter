import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { Preloader, BaseCurrency, OutputCurrency } from '@features';
import {
    fetchCurrencies,
    $currencies,
    $baseCurrency,
    $secondaryCurrency,
    $baseAmount,
    $secondaryAmount,
    changeBaseAmount,
    swapCurrencies,
} from '../../core/models/converter';
import { Currencies } from '@types';
import { Input, Button } from '@ui';
import { colors } from '@constants';

const Wrapper = styled.div`
    color: ${colors.text};
    display: flex;
    flex-direction: column;
`;

const FormWrapper = styled.form`
    display: flex;
    align-items: center;
    label + label {
        margin-left: 40px;
    }
`;

const EqualitySymbol = styled.span`
    color: ${colors.neutral};
    font-size: 32px;
    font-weight: bold;
    padding-top: 14px;
    display: block;
    margin: 0 10px;
`;

const SwapWrapper = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
`;

export function Converter() {
    const loading: boolean = useStore(fetchCurrencies.pending);
    const baseCurrency: string = useStore($baseCurrency);
    const secondaryCurrency: string = useStore($secondaryCurrency);
    const baseAmount: number = useStore($baseAmount);
    const secondaryAmount: number = useStore($secondaryAmount);
    const currenciesList: Currencies = useStore($currencies);
    return (
        <Wrapper>
            {loading && <Preloader />}
            {currenciesList && (
                <>
                    <BaseCurrency />
                    <SwapWrapper>
                        <Button label="Swap" disabled={loading} onClick={() => swapCurrencies()} />
                    </SwapWrapper>
                    <OutputCurrency />
                    <FormWrapper>
                        <Input
                            placeholder="Amount"
                            label={`Amount of ${baseCurrency}`}
                            onChange={changeBaseAmount}
                            value={baseAmount}
                        />
                        <EqualitySymbol>=</EqualitySymbol>
                        <Input
                            placeholder="Result"
                            label={`Amount of ${secondaryCurrency}`}
                            disabled
                            value={secondaryAmount.toFixed(2)}
                        />
                    </FormWrapper>
                </>
            )}
        </Wrapper>
    );
}
