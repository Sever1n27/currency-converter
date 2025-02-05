import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { StyleReset } from './styleReset';
import { Header, Notifications } from '@features';
import { Converter, Home } from '@pages';

const AppContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
    flex-direction: column;
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    padding: 20px;
    position: relative;
    min-height: 100%;
    border-radius: 4px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;

export function App() {
    return (
        <AppContainer>
            <StyleReset />
            <Router>
                <Header />
                <ContentContainer>
                    <Notifications />
                    <Switch>
                        <Route path="/converter">
                            <Converter />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </ContentContainer>
            </Router>
        </AppContainer>
    );
}

export default App;
