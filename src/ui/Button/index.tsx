import React from 'react';
import styled from 'styled-components';
import { colors } from '@constants';

const StyledButton = styled.button`
    border: none;
    padding: 12px 20px;
    background: ${colors.main};
    color: ${colors.text};
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background: ${colors.secondary};
    }
    &:focus {
        outline: none;
    }
`;

type ButtonProps = {
    label: string;
    disabled?: boolean;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function Button(props: ButtonProps) {
    return <StyledButton {...props}>{props.label}</StyledButton>;
}
