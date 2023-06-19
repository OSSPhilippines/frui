//types
import type { 
  FieldSelectDropdownProps, 
  FieldSelectOption,
  FieldSelectProps 
} from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useSelect from '../hooks/useFieldSelect';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from '../utils';

/**
 * Select Dropdown
 */
export const Dropdown: React.FC<FieldSelectDropdownProps> = (props) => {
  const { 
    show, 
    error,
    searchable,
    classNames = {},
    styles = {}, 
    select, 
    search, 
    match 
  } = props;

  //we need to change from {k:v} to [{value: k, label: v}]
  const options: FieldSelectOption[] = (
    typeof props.options === 'object' && !Array.isArray(props.options)
  ) ? Object.keys(props.options).map(value => ({ 
    value, label: (props.options as Record<string, string>)[value] 
  })) : props.options;

  const map = {
    styles: makeGroupStyles(styles, {
      dropdown: undefined,
      searchField: undefined,
      searchControl: undefined,
      searchIcon: undefined,
      options: undefined,
      option: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      dropdown: [
        'bg-[#EFEFEF]',
        'border-b',
        'border-black',
        'border-l',
        'border-r',
        !show ? 'hidden' : undefined,
        'absolute',
        'mt-[-1px]',
        'absolute',
        'w-full'
      ].filter(Boolean).join(' '),
      searchField: [
        'p-2',
        'relative'
      ].filter(Boolean).join(' '),
      searchControl: 'pr-8',
      searchIcon: [
        'bg-white',
        'text-black',
        'p-2',
        'absolute',
        'right-[9px]',
        'top-[9px]'
      ].filter(Boolean).join(' '),
      options: [
        'max-h-[256px]',
        'overflow-auto'
      ].filter(Boolean).join(' '),
      option: [
        'flex',
        'items-center',
        'border-t',
        'border-[#AAAAAA]',
        'cursor-pointer',
        'py-2',
        'px-3'
      ].filter(Boolean).join(' ')
    })
  };

  return (
    <div className={map.classNames.dropdown} style={map.styles.dropdown}>
      {searchable && (
        <div className={map.classNames.searchField} style={map.styles.searchField}>
          <Input 
            error={error}
            className={map.classNames.searchControl} 
            style={map.styles.searchControl}
            onKeyUp={search}
          />
          <span 
            className={map.classNames.searchIcon} 
            style={map.styles.searchIcon}
          >
            <i className="fas fa-search"></i>
          </span>
        </div>
      )}
      <div className={map.classNames.options} style={map.styles.options}>
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className={map.classNames.option} 
            style={map.styles.option}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Styled Select Field Component (Main)
 */
const FieldSelect: React.FC<FieldSelectProps> = (props) => {
  const { 
    options,
    searchable,
    value,
    placeholder = 'Choose an Option',
    error, 
    className,
    style,
    classNames = {},
    styles = {},
    onDropdown,
    onSelected,
    onUpdate
  } = props;

  const { selected, showing, handlers } = useSelect({
    value,
    onDropdown,
    onSelected,
    onUpdate
  })

  const map = {
    styles: makeGroupStyles(styles, {
      field: style,
      control: undefined,
      placeholder: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      field: [
        className,
        'relative',
      ].filter(Boolean).join(' ').trim(),
      control: [
        'bg-white',
        'border',
        error ? 'border-[#DC3545]': 'border-black',
        'box-border',
        error? 'text-[#DC3545]': 'text-black',
        'flex',
        'items-center',
        'p-2',
        'whitespace-nowrap',
        'w-full'
      ].filter(Boolean).join(' '),
      placeholder: error ? 'text-[#DC3545]': 'text-[#666666]'
    })
  };

  return (
    <div className={map.classNames.field} style={map.styles.field}>
      <div 
        className={map.classNames.control} 
        style={map.styles.control} 
        onClick={handlers.toggle}
      >
        {value?.label || selected?.label || (
          <span 
            className={map.classNames.placeholder} 
            style={map.styles.placeholder}
          >
            {placeholder}
          </span>
        )}
      </div>
      <Dropdown 
        options={options} 
        show={showing} 
        error={error}
        searchable={searchable} 
        classNames={classNames}
        styles={styles}
        select={handlers.select} 
        search={handlers.search} 
        match={handlers.match} 
      />
    </div>
  );
};

export default FieldSelect;