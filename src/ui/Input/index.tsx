import React from 'react';
import styled from 'styled-components';
import { Event } from 'effector';
import { colors } from '@constants';

const StyledInput = styled.input`
    border: 2px solid ${colors.neutral};
    border-radius: 4px;
    padding: 12px;
    transition: all 0.3s ease;
    &:focus {
        outline: none;
        border-color: ${colors.main};
    }
`;

const StyledLabel = styled.label`
    color: ${colors.neutral};
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

type InputProps = {
    value: number | string;
    label?: string;
    placeholder: string;
    disabled?: boolean;
    onChange?: Event<number>;
};

export function Input(props: InputProps) {
    const { onChange, disabled, placeholder, value, label } = props;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (typeof onChange === 'function') {
            onChange(parseInt(e.target.value) || 0);
        }
    };
    return (
        <StyledLabel>
            {label || ''}
            <StyledInput disabled={disabled} placeholder={placeholder} onChange={handleChange} value={value} />
        </StyledLabel>
    );
}
