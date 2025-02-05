import React from 'react';
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useStore } from 'effector-react';
import { Currencies } from '@types';
import { BaseCurrency } from '@features';
import { $currencies } from '../../core/models/converter';
import { colors } from '@constants';

const Wrapper = styled.div`
    color: ${colors.secondarylight};
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const CurrenciesWrapper = styled.div`
    flex-grow: 1;
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
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 1px 5px 0px rgba(0, 0, 0, 0.12);
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

export function Home() {
    const currenciesList: Currencies = useStore($currencies);
    return (
        <Wrapper>
            {currenciesList && (
                <CurrenciesWrapper>
                    <BaseCurrency />
                    {currenciesList?.rates && (
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
