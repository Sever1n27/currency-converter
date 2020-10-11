import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    border: none;
    padding: 12px 5px;
    background: blue;
    color: white;
`;

type ButtonProps = {
    label: string;
    disabled?: boolean;
    onClick: () => void;
};

export function Button(props: ButtonProps): JSX.Element {
    return <StyledButton {...props}>{props.label}</StyledButton>;
}
