//types
import type { 
  SelectDropdownProps, 
  SelectOption, 
  SelectProps 
} from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useSelect from 'frui-core/dist/hooks/useSelect';
//helpers
import { makeGroupStyles, makeGroupClasses } from 'frui-core/dist/utils';

/**
 * Select Dropdown
 */
export const Dropdown: React.FC<SelectDropdownProps> = (props) => {
  const { 
    show, 
    searchable,
    classNames = {},
    styles = {}, 
    select, 
    search, 
    match 
  } = props;

  //we need to change from {k:v} to [{value: k, label: v}]
  const options: SelectOption[] = (
    typeof props.options === 'object' && !Array.isArray(props.options)
  ) ? Object.keys(props.options).map(value => ({ 
    value, label: (props.options as Record<string, string>)[value] 
  })) : props.options;

  const map = {
    styles: makeGroupStyles(styles, {
      dropdown: {
        backgroundColor: '#EFEFEF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: '1px',
        borderLeftWidth: '1px',
        borderRightWidth: '1px',
        borderTopWidth: 0,
        boxSizing: 'border-box',
        display: !show ? 'none': undefined,
        position: 'absolute',
        width: '100%'
      },
      search: {
        paddingBottom: '4px',
        paddingLeft: '4px',
        paddingRight: '4px',
        paddingTop: '4px',
        position: 'relative'
      },
      searchControl: {
        paddingRight: '32px'
      },
      searchIcon: {
        backgroundColor: 'white',
        color: 'black',
        padding: '4px',
        position: 'absolute',
        right: '9px',
        top: '9px'
      },
      options: {
        maxHeight: '256px',
        overflow: 'auto'
      },
      option: {
        alignItems: 'center',
        borderColor: '#AAAAAA',
        borderStyle: 'solid',
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
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
      search: undefined,
      searchControl: undefined,
      searchIcon: undefined,
      options: undefined,
      option: undefined
    })
  };

  return (
    <div className={map.classNames.dropdown} style={map.styles.dropdown}>
      {searchable && (
        <div className={map.classNames.search} style={map.styles.search}>
          <Input 
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
 * Styled Select  Component (Main)
 */
const Select: React.FC<SelectProps> = (props) => {
  const { 
    options,
    searchable,
    value,
    placeholder = 'Choose an Option',
    error, 
    errorColor = '#DC3545',
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
  });

  const map = {
    styles: makeGroupStyles(styles, {
      field: { position: 'relative', ...(style || {}) },
      control: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: error ? errorColor :'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        boxSizing: 'border-box',
        color: error ? errorColor :'black',
        display: 'flex',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '8px',
        whiteSpace: 'nowrap',
        width: '100%'
      },
      placeholder: { 
        color: error ? errorColor: '#666666' 
      }
    }),
    classNames: makeGroupClasses(classNames, {
      field: className,
      control: undefined,
      placeholder: undefined
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

export default Select;