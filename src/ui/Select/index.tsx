import React from 'react';
import styled from 'styled-components';
import { Event } from 'effector';
import { useCombobox, UseComboboxStateChange } from 'downshift';
import { colors } from '@constants';
import { Button } from '@ui';

const StyledLabel = styled.label`
    color: ${colors.neutral};
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;

const ComboBox = styled.div`
    display: flex;
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
`;

const Option = styled.li`
    padding: 5px 12px;
`;

const InputWrapper = styled.div`
    position: relative;
`;

// TODO: problems with styled-components and {...getInputProps()}
const inputStyle = {
    border: `2px solid ${colors.neutral}`,
    borderRadius: '4px',
    padding: '12px',
    transition: 'all 0.3s ease',
};

type SelectProps = {
    label?: string;
    value: string;
    disabled?: boolean;
    options: { label: string; value: any }[];
    onChange: Event<string>;
};

export function Select(props: SelectProps) {
    const { onChange, label, value, disabled, options } = props;
    const [inputItems, setInputItems] = React.useState(options);
    const itemToString = (item: { value: any; label: string } | null) => (item ? item.label : '');
    const handleChange = (value: UseComboboxStateChange<{ label: string; value: any }>) => {
        onChange(value.selectedItem?.value);
    };
    const {
        isOpen,
        getToggleButtonProps,
        getMenuProps,
        getInputProps,
        getComboboxProps,
        highlightedIndex,
        getItemProps,
    } = useCombobox({
        items: inputItems,
        selectedItem: options.find((item) => item.label === value) || null,
        onSelectedItemChange: handleChange,
        itemToString,
        onInputValueChange: ({ inputValue }) => {
            setInputItems(
                options.filter((item) =>
                    itemToString(item)
                        .toLowerCase()
                        .startsWith(inputValue ? inputValue.toLowerCase() : ''),
                ),
            );
        },
    });

    return (
        <StyledLabel>
            {label || ''}
            <ComboBox {...getComboboxProps()}>
                <InputWrapper>
                    <input style={inputStyle} {...getInputProps()} disabled={disabled} />
                    <OptionsList {...getMenuProps()}>
                        {isOpen &&
                            inputItems.map((item, index) => (
                                <Option
                                    style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                                    key={`${item}${index}`}
                                    {...getItemProps({ item, index })}
                                >
                                    {item.label.split('')}
                                </Option>
                            ))}
                    </OptionsList>
                </InputWrapper>
                <Button type="button" {...getToggleButtonProps()} aria-label="toggle menu" label="Toggle" />
            </ComboBox>
        </StyledLabel>
    );
}
