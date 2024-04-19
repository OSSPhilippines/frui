//types
import type { 
  ChangeEvent, 
  FocusEvent, 
  KeyboardEvent, 
  CSSProperties 
} from 'react';
import type { InputProps } from './Input';
import type { SelectOption } from './Select';
//hooks
import { useState } from 'react';
//components
import Input from './Input';

/**
 * Autocomplete Config
 */
export type AutocompleteConfig = {
  defaultValue?: string|number|readonly string[],
  onSelected?: (option: SelectOption) => void,
  onQuery?: (query: string) => void,
  onDropdown?: (show: boolean) => void,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  onUpdate?: (value: string) => void
};

/**
 * Autocomplete Dropdown Props
 */
export type AutocompleteDropdownProps = { 
  options: SelectOption[],
  show: boolean,
  styles?: Record<string, CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  select: (option: SelectOption) => void,
  match: (option: SelectOption) => void
};

/**
 * Autocomplete Props
 */
export type AutocompleteProps = InputProps & {
  options: SelectOption[],
  error?: boolean,
  errorColor?: string,
  styles?: Record<string, CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onSelected?: (option: SelectOption) => void,
  onQuery?: (query: string) => void,
  onDropdown?: (show: boolean) => void
};

/**
 * Autocomplete Hook Aggregate
 */
export function useAutocomplete(config: AutocompleteConfig) {
  const { 
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
        onQuery && onQuery(input.value);
      });
    },
    //send the input value on input change
    update: (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e);
      onUpdate && onUpdate(e.target.value);
      setValue(e.target.value);
    },
    //matches options with query string
    match: (option: SelectOption) => {
      const keyword = (query || '').toLowerCase();
      const phrase = option.keyword || option.label || option.value;
      return query.length && phrase.toLowerCase().indexOf(keyword) >= 0;
    },
    //selects an option from the dropdown
    select: (option: SelectOption) => {
      show(false);
      onDropdown && onDropdown(false);
      onUpdate && onUpdate(option.label || option.value);
      setValue(option.label || option.value);
      if (onChange) {
        //simulate input change event
        const e = { target: { value: option.value || option.label } };
        onChange(e as ChangeEvent<HTMLInputElement>);
      }
      onSelected && onSelected(option);
    },
    //hide dropdown on blur
    blur: (e: FocusEvent<HTMLInputElement>) => {
      setTimeout(() => show(false), 10)
    }
  };

  return { value, showing, handlers };
};

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

  return (
    <div className="frui-field-autocomplete-dropdown" style={style}>
      <div className="frui-field-autocomplete-options">
        {options.filter(match).map((option, i) => (
          <div 
            key={i} 
            onClick={_ => select(option)} 
            className="frui-field-autocomplete-option"
          >
            {option.label || option.value}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Autocomplete  Component (Main)
 */
export default function Autocomplete(props: AutocompleteProps) {
  const { 
    options,
    error, 
    className,
    style,
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
  const classNames = [ 'frui-field-autocomplete' ];
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