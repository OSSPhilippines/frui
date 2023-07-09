//types
import type { 
  AutocompleteDropdownProps, 
  AutocompleteProps 
} from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useAutocomplete  from 'frui-core/dist/hooks/useAutocomplete';
//helpers
import { makeGroupStyles, makeGroupClasses } from 'frui-core/dist/utils';

/**
 * Autocomplete Dropdown
 */
export const Dropdown: React.FC<AutocompleteDropdownProps> = (props) => {
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
      dropdown: {
        backgroundColor: '#EFEFEF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
        display: !show ? 'none': undefined,
        marginTop: '-1px',
        position: 'absolute',
        width: '100%'
      },
      options: {
        maxHeight: '256px',
        overflow: 'auto'
      },
      option: {
        alignItems: 'center',
        borderColor: '#AAAAAA',
        borderStyle: 'solid',
        borderTopWidth: '1px',
        cursor: 'pointer',
        display: 'flex',
        paddingBottom: '8px',
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '8px'
      }
    }),
    classNames: makeGroupClasses(classNames, {
      dropdown: undefined,
      options: undefined,
      option: undefined
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
 * Autocomplete  Component (Main)
 */
const Autocomplete: React.FC<AutocompleteProps> = (props) => {
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

export default Autocomplete;