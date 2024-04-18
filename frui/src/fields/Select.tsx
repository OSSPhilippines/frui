//types
import type { KeyboardEvent } from 'react';
import type { 
  SelectDropdownProps, 
  SelectOption, 
  SelectProps,
  SelectConfig
} from '../types/fields';
//hooks
import { useState, useEffect } from 'react';
//components
import Input from './Input';

/**
 * Select Hook Aggregate
 */
export function useSelect(config: SelectConfig) {
  const { 
    value,
    defaultValue,
    onDropdown,
    onSelected,
    onUpdate
  } = config;
  //hooks
  //search query string
  const [ query, setQuery ] = useState('');
  //selected option
  const [ selected, setSelected ] = useState(defaultValue);
  //whether to show dropdown
  const [ showing, show ] = useState(false);
  //handlers
  const handlers = {
    toggle: () => {
      show(!showing);
      onDropdown && onDropdown(!showing);
    },
    //updates query string
    search: (e: KeyboardEvent) => {
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        setQuery(input.value);
      });
    },
    //matches options with query string
    match: (option: SelectOption) => {
      const keyword = (query || '').toLowerCase();
      if (typeof option.keyword === 'string') {
        return option.keyword
          .toLowerCase()
          .indexOf(keyword) >= 0;
      } else if (typeof option.keyword === 'function') {
        return option.keyword(keyword);
      } else if (typeof option.value !== 'undefined' 
        && option.value !== null
      ) {
        return option.value
          .toString()
          .toLowerCase()
          .indexOf(keyword) >= 0 ;
      } else if (typeof option.label === 'string') {
        return option.label
          .toLowerCase()
          .indexOf(keyword) >= 0;
      }

      return true;
    },
    //selests an option from the dropdown
    select: (option: SelectOption) => {
      show(false);
      setSelected(option);
      onDropdown && onDropdown(false);
      onSelected && onSelected(option);
      onUpdate && onUpdate(option.value);
    }
  };

  //for controlled states we should update 
  //the values when the value prop changes
  useEffect(() => {
    if (!value) return;
    setSelected(value)
  }, [ value ]);

  return { selected, showing, handlers };
  
};

/**
 * Select Dropdown
 */
export function Dropdown(props: SelectDropdownProps) {
  const { 
    show, 
    searchable,
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

  const style = !show ? { display: 'none' }: undefined;

  return (
    <div className="field-select-dropdown" style={style}>
      {searchable && (
        <div className="field-select-search">
          <Input className="field-select-search-control" onKeyUp={search} />
          <span className="field-select-search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>
      )}
      <div className="field-select-options">
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className="field-select-option"
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
export default function Select(props: SelectProps) {
  const { 
    options,
    searchable,
    value,
    defaultValue,
    placeholder = 'Choose an Option',
    error, 
    className,
    style,
    onDropdown,
    onSelected,
    onUpdate
  } = props;

  const { selected, showing, handlers } = useSelect({
    value,
    defaultValue,
    onDropdown,
    onSelected,
    onUpdate
  });

  const classNames = [ 'field-select' ];
  if (className) {
    classNames.push(className);
  }

  const placeholderClass = [ 'field-select-placeholder' ];
  if (error) {
    placeholderClass.push('tx-error', 'bd-error');
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      <div className="field-select-control" onClick={handlers.toggle}>
        {value?.label || selected?.label || (
          <span className={placeholderClass.join(' ')}>
            {placeholder}
          </span>
        )}
      </div>
      <Dropdown 
        options={options} 
        show={showing} 
        error={error}
        searchable={searchable} 
        select={handlers.select} 
        search={handlers.search} 
        match={handlers.match} 
      />
    </div>
  );
};