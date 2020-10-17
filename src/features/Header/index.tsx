import React from 'react';
import styled from 'styled-components';
import { Link } from '@ui';
import { colors } from '@constants';
import { Preloader } from '@features';

const Wrapper = styled.div`
    width: 100%;
    background: ${colors.main};
    padding: 20px;
`;

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const Navbar = styled.nav`
    width: 100%;
    display: flex;
    a + a {
        margin-left: 15px;
    }
`;

export function Header() {
    return (
        <Wrapper>
            <Container>
                <Navbar>
                    <Link to="/">Курс валют</Link>
                    <Link to="/converter">Конвертер валют</Link>
                </Navbar>
                <Preloader />
            </Container>
        </Wrapper>
    );
}
