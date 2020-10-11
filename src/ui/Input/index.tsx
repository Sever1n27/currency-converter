import React from 'react';
import styled from 'styled-components';
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
    onChange: any;
};

export function Input(props: InputProps): JSX.Element {
    const { onChange, disabled, placeholder, value, label } = props;
    const handleChange = (e: any) => {
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
