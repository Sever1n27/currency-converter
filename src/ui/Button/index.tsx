import React from 'react';
import styled from 'styled-components';
import { colors } from '@constants';

const StyledButton = styled.button`
    padding: 6px 16px;
    min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    text-transform: uppercase;
    color: ${colors.secondarylight};
    background-color: ${colors.main};
    border: none;
    cursor: pointer;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    &:hover {
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
        background-color: ${colors.secondary};
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
