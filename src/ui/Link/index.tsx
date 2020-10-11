import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    display: block;
`;

type LinkProps = {
    to: string;
    children: string;
};

export function Link(props: LinkProps): JSX.Element {
    return <StyledLink {...props}>{props.children}</StyledLink>;
}
