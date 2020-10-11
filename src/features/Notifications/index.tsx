import React from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { $error, clearError } from '../../core/models';
import { colors } from '@constants';

type ErrorNotificationProps = {
    visible?: boolean;
};

const ErrorNotification = styled.div<ErrorNotificationProps>`
    position: fixed;
    left: 30%;
    right: 30%;
    padding: 20px;
    background: ${colors.secondary};
    color: #fff;
    top: 0;
    border-radius: 4px;
    transform: translateY(${(props) => (props.visible ? '10%' : '-150%')});
    transition: transform 0.4s ease;
    font-weight: bold;
    box-shadow: 0px 10px 22px 0px rgba(0, 0, 0, 0.2);
`;

export function Notifications(): JSX.Element | null {
    const error: any = useStore($error);
    const [visible, setVisible] = React.useState(false);
    const timeoutRefVisible = React.useRef(0);
    const timeoutRefMounted = React.useRef(0);
    const hideDelay = 3000;
    const unmountDelay = hideDelay + 1000;

    React.useEffect(() => {
        if (error) {
            setVisible(true);
            timeoutRefVisible.current = setTimeout(() => setVisible(false), hideDelay);
            timeoutRefMounted.current = setTimeout(() => clearError(), unmountDelay);
        }
        return () => {
            clearTimeout(timeoutRefVisible.current);
            clearTimeout(timeoutRefMounted.current);
        };
    }, [error, unmountDelay, hideDelay]);

    return error && <ErrorNotification visible={visible}>{error.message}</ErrorNotification>;
}
