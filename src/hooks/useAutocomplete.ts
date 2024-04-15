//types
import type { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import type { AutocompleteConfig, SelectOption } from '../types/fields';
//hooks
import { useState } from 'react';

export default function useAutocomplete(config: AutocompleteConfig) {
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