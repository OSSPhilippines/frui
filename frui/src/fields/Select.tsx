//types
import type { ReactNode, KeyboardEvent, CSSProperties } from 'react';
//hooks
import { useState, useEffect } from 'react';
//components
import Input from './Input';

/**
 * Select Option
 */
export type SelectOption<T = any> = {
  label: ReactNode,
  value?: T,
  keyword?: string|Function
};

/**
 * Select Config
 */
export type SelectConfig = {
  value?: SelectOption,
  defaultValue?: SelectOption,
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption) => void,
  onUpdate?: (value: string|number) => void
};

/**
 * Select Dropdown Props
 */
export type SelectDropdownProps = { 
  options: SelectOption[]|Record<string, string>
  show: boolean,
  error?: boolean,
  searchable?: boolean,
  select: (value: SelectOption) => void,
  search: (e: KeyboardEvent) => void,
  match: (option: SelectOption) => void
};

/**
 * Select Props
 */
export type SelectProps = {
  value?: SelectOption,
  defaultValue?: SelectOption,
  options: SelectOption[]|Record<string, string>,
  searchable?: boolean,
  placeholder?: string,
  error?: boolean,
  style?: CSSProperties,
  className?: string,
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption) => void,
  onUpdate?: (value: string|number) => void
};

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
export function SelectDropdown(props: SelectDropdownProps) {
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
    <div className="frui-field-select-dropdown" style={style}>
      {searchable && (
        <div className="frui-field-select-search">
          <Input className="frui-field-select-search-control" onKeyUp={search} />
          <span className="frui-field-select-search-icon">
            &#x1F50E;
          </span>
        </div>
      )}
      <div className="field-select-options">
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className="frui-field-select-option"
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

  const classNames = [ 'frui-field-select' ];
  if (className) {
    classNames.push(className);
  }

  const placeholderClass = [ 'frui-field-select-placeholder' ];
  if (error) {
    placeholderClass.push('frui-tx-error', 'frui-bd-error');
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      <div className="frui-field-select-control" onClick={handlers.toggle}>
        {value?.label || selected?.label || (
          <span className={placeholderClass.join(' ')}>
            {placeholder}
          </span>
        )}
      </div>
      <SelectDropdown 
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