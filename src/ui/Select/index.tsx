import React from 'react';
import styled from 'styled-components';
import { Event } from 'effector';
import { useSelect } from 'downshift';
import { colors } from '@constants';
import { Button } from '@ui';

const Wrapper = styled.div`
    position: relative;
`;

const StyledLabel = styled.label`
    color: ${colors.secondarylight};
    display: flex;
    flex-direction: column;
    font-size: 12px;
    position: relative;
`;

const OptionsList = styled.ul`
    max-height: 120px;
    max-width: 300px;
    overflow-y: scroll;
    background-color: #eee;
    padding: 0;
    list-style: none;
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    right: 0;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    &:focus {
        outline: none;
    }
`;

const Option = styled.li`
    padding: 5px 12px;
    transition: all 0.3s ease;
    color: ${colors.neutral};
    cursor: pointer;
`;

type SelectProps = {
    label?: string;
    value: string;
    disabled?: boolean;
    options: string[];
    onChange: Event<string>;
};

export function Select(props: SelectProps) {
    const { onChange, label, value, disabled, options } = props;
    function handleSelectedItemChange({ selectedItem }: { selectedItem?: string | null }) {
        if (typeof onChange === 'function' && selectedItem) {
            onChange(selectedItem);
        }
    }

    const { isOpen, getToggleButtonProps, getLabelProps, getMenuProps, highlightedIndex, getItemProps } = useSelect({
        items: options,
        onSelectedItemChange: handleSelectedItemChange,
        selectedItem: value,
    });

    return (
        <Wrapper>
            <StyledLabel {...getLabelProps()}>
                {label || ''}
                <Button disabled={disabled} type="button" label={value} {...getToggleButtonProps()} />
            </StyledLabel>
            <OptionsList {...getMenuProps()}>
                {isOpen &&
                    options.map((item, index) => (
                        <Option
                            style={
                                highlightedIndex === index
                                    ? { backgroundColor: `${colors.secondary}`, color: `${colors.text}` }
                                    : {}
                            }
                            key={`${item}${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </Option>
                    ))}
            </OptionsList>
        </Wrapper>
    );
}
