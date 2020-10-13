import React from 'react';
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useGate, useStore } from 'effector-react';
import { Preloader } from '@features';
import { tearUp, fetchCurrencies, $currencies } from '../../core/models/converter';
import { colors } from '@constants';
import { BaseCurrency } from '@features';

const Wrapper = styled.div`
    color: #000;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const CurrenciesWrapper = styled.div`
    flex-grow: 1;
    margin-right: 20px;
`;

const List = styled.ul`
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    list-style: none;
`;

const ListWrapper = styled.div`
    padding: 20px;
    border-radius: 4px;
    background: ${colors.mainlight};
    flex-grow: 1;
    color: ${colors.secondarylight};
`;

const ListItem = styled.li`
    padding: 0;
    display: flex;
    letter-spacing: 0.8px;
    padding: 5px 0;
    border-bottom: 1px solid ${colors.secondarylight};
    font-weight: bold;
    &:last-child {
        border-bottom: none;
    }
    &:first-child {
        padding-top: 0;
    }
`;

const CurrencySymbol = styled.span``;

const CurrencyName = styled.span`
    min-width: 60px;
    display: block;
`;

export function Home(): JSX.Element {
    useGate(tearUp);
    const loading = useStore(fetchCurrencies.pending);
    const currenciesList: any = useStore($currencies);
    return (
        <Wrapper>
            {loading && <Preloader />}
            {currenciesList && (
                <CurrenciesWrapper>
                    <BaseCurrency />
                    {currenciesList.rates && (
                        <ListWrapper>
                            Currency course:
                            <List>
                                {Object.keys(currenciesList?.rates).map((currency) => (
                                    <ListItem key={currency}>
                                        <CurrencyName>{currency}:</CurrencyName>
                                        {currenciesList.rates[currency].toFixed(2)}&nbsp;
                                        <CurrencySymbol>{getSymbolFromCurrency(currency)}</CurrencySymbol>
                                    </ListItem>
                                ))}
                            </List>
                        </ListWrapper>
                    )}
                </CurrenciesWrapper>
            )}
        </Wrapper>
    );
}
