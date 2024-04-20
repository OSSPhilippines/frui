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
  options: SelectOption<T>[],
  value?: T,
  defaultValue?: T,
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption<T>) => void,
  onUpdate?: (value: T) => void
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
  onUpdate?: (value: T) => void
};

/**
 * Select Hook Aggregate
 */
export function useSelect<T = any>(config: SelectConfig<T>) {
  const { 
    options,
    value,
    defaultValue,
    onDropdown,
    onSelected,
    onUpdate
  } = config;
  //get the current value
  const currentValue = typeof defaultValue !== 'undefined'
    ? defaultValue
    : typeof value !== 'undefined'
    ? value
    : undefined;
  //get the default selected option based on the current value
  const defaultSelected = options.find(
    option => option.value === currentValue
  );
  //hooks
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
      });
    },
    //matches options with query string
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
    //selests an option from the dropdown
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

  return { selected, showing, handlers };
  
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

  //we need to change from {k:v} to [{value: k, label: v}]
  const entries = (
    typeof options === 'object' && !Array.isArray(options)
  ) ? Object.keys(options).map(value => ({ 
    value, label: (options as Record<string, string>)[value] 
  })): options;

  const { selected, showing, handlers } = useSelect<T>({
    options: entries,
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
        {selected?.label || (
          <span className={placeholderClass.join(' ')}>
            {placeholder}
          </span>
        )}
      </div>
      <SelectDropdown 
        options={entries} 
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