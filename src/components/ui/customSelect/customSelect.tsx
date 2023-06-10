import React, { FC, useState } from 'react';
import Select, { ActionMeta, components, GroupBase, InputActionMeta, MultiValue, OptionProps, SingleValue, StylesConfig } from 'react-select';
import { ProductOption } from '../../invoices/interfaces/interfaces';


export interface SelectOption extends ProductOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
  onChange?: (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => void;
  placeholder?: string;
}

const CustomOption: FC<OptionProps<SelectOption>> = (props) => (
  <components.Option {...props}>
    {props.data.label}
  </components.Option>
);

const CustomSelect = ({ options, onChange, placeholder = 'Select Item' }: SelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (newValue: string, actionMeta: InputActionMeta) => {
    setSearchTerm(newValue);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customStyles: StylesConfig<SelectOption, boolean, GroupBase<SelectOption>> = {
    control: (provided) => ({
      ...provided,
      minHeight: '40px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3949AB' : provided.backgroundColor,
      color: state.isFocused ? '#fff' : provided.color,
    }),
  };

  const [selectedOption,] = useState<SelectOption | null>(null);

  const handleOptionChange = (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
    if (onChange) {
      onChange(newValue, actionMeta);
    }
  };

  return (
    <Select
      options={filteredOptions}
      placeholder={placeholder}
      isClearable
      value={selectedOption}
      onChange={handleOptionChange}
      styles={customStyles}
      components={{ Option: CustomOption }}
      onInputChange={handleSearchChange}
      menuPlacement="top"
    />
  );
};

export default CustomSelect;
