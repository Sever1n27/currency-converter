import React from 'react';
import styled from 'styled-components';
import { colors } from '@constants';

const Wrapper = styled.div`
    width: 100%;
    background: ${colors.main};
    padding: 20px;
`;

export function Footer(): JSX.Element {
    return <Wrapper>Footer</Wrapper>;
}
