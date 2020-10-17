import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { colors } from '@constants';

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: block;
    transition: all 0.3s ease;
    padding: 6px 16px;
    border-radius: 4px;
    position: relative;
    z-index: 1;
    &:before {
        content: '';
        left: 0;
        width: 4px;
        background: ${colors.secondary};
        top: 0;
        bottom: 0;
        position: absolute;
        transition: all 0.3s ease;
        z-index: -1;
    }
    &:hover::before {
        width: 100%;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        top: 0;
    }
`;

type LinkProps = {
    to: string;
    children: string | JSX.Element;
};

export function Link(props: LinkProps) {
    return <StyledLink {...props}>{props.children}</StyledLink>;
}
