import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
    0% {
        transform: scale(0)
    }
    50% {
        transform: scale(1.0)
    }
    100% {
        transform: scale(0)
    }
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    background-color: #2d55b2;
    border-radius: 50%;
    display: inline-block;
    animation: ${bounce} 1.4s infinite ease-in-out both;
    & + & {
        margin-left: 5px;
    }
    :nth-child(1) {
        animation-delay: -0.32s;
    }
    :nth-child(2) {
        animation-delay: -0.16s;
    }
    :nth-child(3) {
        animation-delay: -0s;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.7);
    z-index: 10;
`;

export function Preloader() {
    const [visible, setVisible] = React.useState<boolean>(false);
    const timeoutRef = React.useRef<number>(0);
    const revealDelay = 200;
    React.useEffect(() => {
        timeoutRef.current = setTimeout(() => setVisible(true), revealDelay);
        return () => {
            clearTimeout(timeoutRef.current);
            setVisible(false);
        };
    }, [revealDelay]);

    return visible ? (
        <Wrapper>
            <Dot />
            <Dot />
            <Dot />
        </Wrapper>
    ) : null;
}
