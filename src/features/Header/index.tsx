import React from 'react';
import styled from 'styled-components';
import { Link } from '@ui';

const Wrapper = styled.div`
    width: 100%;
    background: blue;
    padding: 20px;
`;

const Navbar = styled.nav`
    width: 100%;
    display: flex;
    a + a {
        margin-left: 15px;
    }
`;

export function Header(): JSX.Element {
    return (
        <Wrapper>
            <Navbar>
                <Link to="/">Курсы валют</Link>
                <Link to="/converter">Конвертер валют</Link>
            </Navbar>
        </Wrapper>
    );
}
