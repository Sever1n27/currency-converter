import React from 'react';
import styled from 'styled-components';
import { colors } from '@constants';

const StyledSelect = styled.select`
    border: 2px solid ${colors.neutral};
    border-radius: 4px;
    padding: 12px;
    transition: all 0.3s ease;
    background: #fff;
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

type SelectProps = {
    label?: string;
    value: string;
    disabled?: boolean;
    options: { label: string; value: any }[];
    onChange: any;
};

export function Select(props: SelectProps): JSX.Element {
    const { onChange, label, value, disabled, options } = props;
    const handleChange = (e: any) => {
        onChange(e.target.value);
    };

    return (
        <StyledLabel>
            {label || ''}
            <StyledSelect onChange={handleChange} disabled={disabled} value={value}>
                {options.map((item) => (
                    <option key={item.label} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </StyledSelect>
        </StyledLabel>
    );
}
