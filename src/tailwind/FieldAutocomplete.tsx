//types
import type { 
  FieldAutocompleteDropdownProps, 
  FieldAutocompleteProps 
} from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useAutocomplete from '../hooks/useFieldAutocomplete';
//helpers
import { makeGroupStyles, makeGroupClasses } from '../utils';

/**
 * Autocomplete Dropdown
 */
export const Dropdown: React.FC<FieldAutocompleteDropdownProps> = (props) => {
  const { 
    options, 
    show, 
    classNames = {},
    styles = {}, 
    select, 
    match 
  } = props;

  const map = {
    styles: makeGroupStyles(styles, {
      dropdown: undefined,
      options: undefined,
      option: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      field: undefined,
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
      <div className={map.classNames.options} style={map.styles.options}>
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className={map.classNames.option} 
            style={map.styles.option}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Autocomplete Field Component (Main)
 */
const FieldAutocomplete: React.FC<FieldAutocompleteProps> = (props) => {
  const { 
    options,
    error, 
    errorColor = '#DC3545',
    className,
    style,
    classNames = {},
    styles = {},
    defaultValue,
    onQuery,
    onDropdown,
    onChange,
    onUpdate,
    ...attributes
  } = props;
  const { value, showing, handlers } = useAutocomplete({
    defaultValue,
    onQuery,
    onDropdown,
    onChange,
    onUpdate
  });
  //variables
  const map = {
    styles: makeGroupStyles(styles, {
      field: { position: 'relative', ...(style || {}) }
    }),
    classNames: makeGroupClasses(classNames, {
      field: className
    })
  };

  return (
    <div className={map.classNames.field} style={map.styles.field}>
      <Input 
        onBlur={handlers.blur}
        onKeyDown={handlers.search}
        onChange={handlers.update}
        {...attributes}
        value={value}
      />
      <Dropdown 
        options={options} 
        show={showing} 
        classNames={classNames}
        styles={styles}
        select={handlers.select} 
        match={handlers.match} 
      />
    </div>
  );
};

export default FieldAutocomplete;