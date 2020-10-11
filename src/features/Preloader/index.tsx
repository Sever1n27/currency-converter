import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { fetchCurrencies } from '../../core/models';

const Wrapper = styled.div`
    position: fixed;
    background: rgba(255, 255, 255, 0.6);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
`;

export function Preloader(): JSX.Element | null {
    const [visible, setVisible] = React.useState(false);
    const timeoutRef = React.useRef(0);
    const loading = useStore(fetchCurrencies.pending);
    const revealDelay = 200;

    React.useEffect(() => {
        if (loading) {
            timeoutRef.current = setTimeout(() => setVisible(true), revealDelay);
        }
        return () => {
            clearTimeout(timeoutRef.current);
            setVisible(false);
        };
    }, [loading]);

    return visible ? <Wrapper>preloader</Wrapper> : null;
}
