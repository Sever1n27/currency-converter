import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { StyleReset } from './styleReset';
import { Header, Footer, Preloader, Notifications } from '@features';
import { Converter, Home } from '@pages';

const AppContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    flex-direction: column;
`;

const ContentContainer = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    min-height: 100%;
`;

export function App(): JSX.Element {
    return (
        <AppContainer>
            <StyleReset />
            <Preloader />
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
                <Footer />
            </Router>
        </AppContainer>
    );
}

export default App;
