import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useStore } from 'effector-react';
import { $isLoading } from '../../core/models/converter';
import refreshIcon from './refresh.svg';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const StyledButton = styled.button`
    width: 20px;
    height: 20px;
    border: none;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    cursor: pointer;
    &:disabled {
        cursor: default;
        animation-name: ${rotate};
        background-image: url(${refreshIcon});
    }
    &:focus {
        outline: none;
    }
`;

export function Preloader() {
    const [visible, setVisible] = React.useState<boolean>(false);
    const timeoutRef = React.useRef<number>(0);
    const loading = useStore<boolean>($isLoading);
    const visibilityDelay = 200;
    useEffect(() => {
        if (loading) {
            timeoutRef.current = setTimeout(() => setVisible(true), visibilityDelay);
        } else {
            clearTimeout(timeoutRef.current);
            setVisible(false);
        }
    }, [loading]);

    return visible ? <StyledButton disabled={loading} /> : null;
}
