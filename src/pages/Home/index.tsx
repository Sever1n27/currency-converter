import React from 'react';
import styled from 'styled-components';
import { useGate, useStore } from 'effector-react';
import { Preloader } from '@features';
import { tearUp, fetchCurrencies, $currencies } from '../../core/models';
import { Button } from '@ui';
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
`;

const ListItem = styled.li`
    padding: 0;
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
                                        {currency}: {currenciesList.rates[currency]}
                                    </ListItem>
                                ))}
                            </List>
                        </ListWrapper>
                    )}
                </CurrenciesWrapper>
            )}
            <Button onClick={() => fetchCurrencies()} label="Refresh" disabled={loading} />
        </Wrapper>
    );
}
