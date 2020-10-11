import React from 'react';
import styled from 'styled-components';
import { useGate, useStore } from 'effector-react';
import { Preloader } from '@features';
import {
    tearUp,
    fetchCurrencies,
    $currencies,
    $baseCurrency,
    $secondaryCurrency,
    $baseAmount,
    $secondaryAmount,
    changeBaseAmount,
    swapCurrencies,
} from '../../core/models/converter';
import { Input, Button } from '@ui';
import { colors } from '@constants';
import { BaseCurrency, OutputCurrency } from '@features';

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

export function Converter(): JSX.Element {
    useGate(tearUp);
    const loading = useStore(fetchCurrencies.pending);
    const baseCurrency = useStore($baseCurrency);
    const secondaryCurrency = useStore($secondaryCurrency);
    const baseAmount = useStore($baseAmount);
    const secondaryAmount = useStore($secondaryAmount);
    const currenciesList: any = useStore($currencies);
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
                            onChange={() => {
                                return;
                            }}
                            disabled
                            value={secondaryAmount.toFixed(2)}
                        />
                    </FormWrapper>
                </>
            )}
        </Wrapper>
    );
}
