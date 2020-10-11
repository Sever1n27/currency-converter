import React from 'react';
import styled from 'styled-components';
import { useGate, useStore } from 'effector-react';
import { tearUp, fetchCurrencies, $currencies } from '../../core/models';
import { Button } from '@ui';

const BaseCurrency = styled.div`
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
    color: white;
`;

const List = styled.ul`
    padding: 10px 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    list-style: none;
`;

const ListWrapper = styled.div`
    padding: 20px;
    background: rgba(0, 0, 0, 0.3);
`;

const ListItem = styled.li`
    padding: 0;
`;

export function Home(): JSX.Element {
    useGate(tearUp);
    const loading = useStore(fetchCurrencies.pending);
    const currenciesList: any = useStore($currencies);
    return (
        <>
            {currenciesList && (
                <>
                    <BaseCurrency>Base currency: {currenciesList?.base}</BaseCurrency>
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
                </>
            )}
            <Button onClick={() => fetchCurrencies()} label="Refresh" disabled={loading} />
        </>
    );
}
