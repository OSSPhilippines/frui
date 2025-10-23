//--------------------------------------------------------------------//
// Imports

//modules
import type { 
  ChangeEvent, 
  FocusEvent, 
  KeyboardEvent, 
  CSSProperties 
} from 'react';
import { useState } from 'react';
//frui
import type { InputProps } from './Input.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type AutocompleteConfig = {
  options?: string[],
  defaultValue?: string|number|readonly string[],
  onSelected?: (option: string) => void,
  onQuery?: (query: string, set: Function) => void,
  onDropdown?: (show: boolean) => void,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  onUpdate?: (value: string) => void
};

export type AutocompleteDropdownProps = { 
  options?: string[],
  show: boolean,
  styles?: Record<string, CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  select: (option: string) => void,
  match: (option: string) => void
};

export type AutocompleteProps = InputProps & {
  options?: string[],
  styles?: Record<string, CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onSelected?: (option: string) => void,
  onQuery?: (query: string, set: Function) => void,
  onDropdown?: (show: boolean) => void
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Autocomplete Hook Aggregate
 */
export function useAutocomplete(config: AutocompleteConfig) {
  const { 
    options: defaultOptions,
    defaultValue,
    onSelected,
    onQuery,
    onDropdown,
    onChange,
    onUpdate
  } = config;
  //hooks
  //controlled input value
  const [ value, setValue ] = useState(defaultValue || '');
  //options
  const [ options, setOptions ] = useState(defaultOptions || []);
  //search query string
  const [ query, setQuery ] = useState('');
  //whether to show dropdown
  const [ showing, show ] = useState(false);
  //handlers
  const handlers = {
    //updates query string on key down
    search: (e: KeyboardEvent) => {
      show(true);
      onDropdown && onDropdown(true);
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        setQuery(input.value);
        onQuery && onQuery(input.value, setOptions);
      });
    },
    //send the input value on input change
    update: (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onUpdate && onUpdate(e.target.value);
      setValue(e.target.value);
    },
    //matches options with query string
    match: (option: string) => {
      const keyword = (query || '').toLowerCase();
      const phrase = option;
      return query.length && phrase.toLowerCase().indexOf(keyword) >= 0;
    },
    //selects an option from the dropdown
    select: (option: string) => {
      show(false);
      onDropdown && onDropdown(false);
      onUpdate && onUpdate(option);
      setValue(option);
      if (onChange) {
        //simulate input change event
        const e = { target: { value: option } };
        onChange(e as ChangeEvent<HTMLInputElement>);
      }
      onSelected && onSelected(option);
    },
    //hide dropdown on blur
    blur: (_e: FocusEvent<HTMLInputElement>) => {
      setTimeout(() => show(false), 10)
    }
  };

  return { value, options, showing, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * Autocomplete Dropdown
 */
export function AutocompleteDropdown(props: AutocompleteDropdownProps) {
  const { 
    options, 
    show, 
    select, 
    match 
  } = props;

  const style = !show ? { display: 'none' }: undefined;

  if (!options || options.filter(match).length === 0) {
    return null;
  }

  return (
    <div className="frui-field-input-suggest-dropdown" style={style}>
      <div className="frui-field-input-suggest-options">
        {options && options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className="frui-field-input-suggest-option"
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
export function Autocomplete(props: AutocompleteProps) {
  const { 
    options: defaultOptions,
    className,
    style,
    defaultValue,
    value: _value,
    onQuery,
    onDropdown,
    onChange,
    onUpdate,
    ...attributes
  } = props;
  const { value, options, showing, handlers } = useAutocomplete({
    defaultValue: defaultValue || _value,
    options: defaultOptions,
    onQuery,
    onDropdown,
    onChange,
    onUpdate
  });
  //variables
  const classNames = [ 'frui-field-input-suggest' ];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      <Input 
        onBlur={handlers.blur}
        onKeyDown={handlers.search}
        onChange={handlers.update}
        {...attributes}
        value={value}
      />
      <AutocompleteDropdown 
        options={options} 
        show={showing} 
        select={handlers.select} 
        match={handlers.match} 
      />
    </div>
  );
};

//defaults to autocomplete
export default Autocomplete;