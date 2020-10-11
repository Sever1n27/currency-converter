import React from 'react';
import styled from 'styled-components';
import { Link } from '@ui';
import { colors } from '@constants';

const Wrapper = styled.div`
    width: 100%;
    background: ${colors.main};
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
                <Link to="/">Курс валют</Link>
                <Link to="/converter">Конвертер валют</Link>
            </Navbar>
        </Wrapper>
    );
}
