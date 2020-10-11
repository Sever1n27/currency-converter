import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    border: none;
    padding: 12px 5px;
`;

type InputProps = {
    value: string;
    placeholder: string;
    disabled?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Input(props: InputProps): JSX.Element {
    return <StyledInput {...props} />;
}
