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
  value: T,
  keyword?: string|Function
};

/**
 * Select Config
 */
export type SelectConfig<T = any> = {
  value?: T,
  defaultValue?: T,
  defaultOptions?: SelectOption<T>[],
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption<T>) => void,
  onUpdate?: (value: T) => void,
  onQuery?: (
    query: string, 
    update: (options: SelectOption<T>[]) => void
  ) => void
};

/**
 * Select Dropdown Props
 */
export type SelectDropdownProps<T = any> = { 
  options: SelectOption<T>[]
  show: boolean,
  error?: boolean,
  searchable?: boolean,
  select: (value: SelectOption<T>) => void,
  search: (e: KeyboardEvent) => void,
  match: (option: SelectOption<T>) => void
};

/**
 * Select Props
 */
export type SelectProps<T = any> = {
  name?: string,
  value?: T,
  defaultValue?: T,
  options: SelectOption<T>[]|Record<string, T>,
  searchable?: boolean,
  placeholder?: string,
  error?: boolean,
  style?: CSSProperties,
  className?: string,
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption<T>) => void,
  onUpdate?: (value: T) => void,
  onQuery?: (
    query: string, 
    update: (options: SelectOption<T>[]) => void
  ) => void
};

/**
 * Select Hook Aggregate
 */
export function useSelect<T = any>(config: SelectConfig<T>) {
  const { 
    value,
    defaultValue,
    defaultOptions = [],
    onDropdown,
    onSelected,
    onUpdate,
    onQuery
  } = config;
  //get the current value
  const currentValue = typeof defaultValue !== 'undefined'
    ? defaultValue
    : typeof value !== 'undefined'
    ? value
    : undefined;
  //get the default selected option based on the current value
  const defaultSelected = defaultOptions.find(
    option => option.value === currentValue
  );
  //hooks
  const [ options, setOptions ] = useState(defaultOptions);
  //search query string
  const [ query, setQuery ] = useState('');
  //selected option
  const [ selected, setSelected ] = useState(defaultSelected);
  //whether to show dropdown
  const [ showing, show ] = useState(false);
  //handlers
  const handlers = {
    toggle() {
      show(!showing);
      onDropdown && onDropdown(!showing);
    },
    //updates query string
    search(e: KeyboardEvent) {
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        setQuery(input.value);
        onQuery && onQuery(input.value, setOptions);
      });
    },
    //(internally) matches options with query string
    match(option: SelectOption<T>) {
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
          .indexOf(keyword) >= 0;
      } else if (typeof option.label === 'string') {
        return option.label
          .toLowerCase()
          .indexOf(keyword) >= 0;
      }

      return true;
    },
    //selects an option from the dropdown
    select(option: SelectOption<T>) {
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
    const selected = options.find(
      option => option.value === value
    );
    setSelected(selected);
  }, [ value ]);

  return { selected, options, showing, handlers };
  
};

/**
 * Select Dropdown
 */
export function SelectDropdown(props: SelectDropdownProps) {
  const {
    options, 
    show, 
    searchable,
    select, 
    search, 
    match 
  } = props;

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
      <div className="frui-field-select-options">
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
export default function Select<T = any>(props: SelectProps) {
  const { 
    name,
    searchable,
    value,
    defaultValue,
    options: defaultOptions,
    placeholder = 'Choose an Option',
    error, 
    className,
    style,
    onQuery,
    onDropdown,
    onSelected,
    onUpdate
  } = props;

  //we need to change from {k:v} to [{value: k, label: v}]
  const entries = (
    typeof defaultOptions === 'object' && !Array.isArray(defaultOptions)
  ) ? Object.keys(defaultOptions).map(value => ({ 
    value, label: (defaultOptions as Record<string, string>)[value] 
  })): defaultOptions;

  const { selected, options, showing, handlers } = useSelect<T>({
    value,
    defaultValue,
    defaultOptions: entries,
    onQuery,
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

  const inputValue = typeof selected?.value === 'string' 
    ? selected.value 
    : typeof selected?.value === 'number'
    ? String(selected.value)
    : typeof selected?.value === 'boolean'
    ? String(selected.value)
    : selected?.value && typeof selected.value === 'object'
    ? JSON.stringify(selected.value)
    : '';

  return (
    <div className={classNames.join(' ')} style={style}>
      <div className="frui-field-select-control" onClick={handlers.toggle}>
        {selected?.label || (
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
      <input name={name} type="hidden" value={inputValue} />
    </div>
  );
};