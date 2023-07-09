//types
import type { KeyboardEvent } from 'react';
import type { SelectOption, SelectConfig } from '../types/fields';
//hooks
import { useState } from 'react';

export default function useSelect(config: SelectConfig) {
  const { 
    value,
    onDropdown,
    onSelected,
    onUpdate
  } = config;
  //hooks
  //search query string
  const [ query, setQuery ] = useState('');
  //selected option
  const [ selected, setSelected ] = useState(value);
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

  return { selected, showing, handlers };
  
};