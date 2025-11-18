//--------------------------------------------------------------------//
// Imports

//modules
import type { KeyboardEvent } from 'react';
import { useState } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { SelectProps } from './Select.js';
import currencies from '../data/currencies.js';
import countries from '../data/countries.js';
import { 
  Select, 
  SelectDropdownHead,
  SelectOption
} from './Select.js';

//--------------------------------------------------------------------//
// Types

export type CurrencyData = {
  flag: string,
  type: string,
  code: string,
  name: string,
  plural: string,
  symbol: string
}

export type CurrencySelectProps = ExtendsType<SelectProps, {
  searchable?: boolean | string,
  onUpdate?: (currency: CurrencyData | CurrencyData[]) => void
}>;

//--------------------------------------------------------------------//
// Constants

export const currencyWithFlags = currencies.map(currency => {
  return {
    ...currency,
    flag: countries.find(
      country => (currency.code === 'USD' && country.iso3 === 'USA')
        || (currency.code !== 'USD' && country.cur === currency.code)
    )?.flag 
  };
});

//--------------------------------------------------------------------//
// Components

export function CurrencySelect(props: CurrencySelectProps) {
  //props
  const { className, onUpdate, placeholder, searchable } = props;
  //hooks
  const [ keyword, setKeyword ] = useState('');
  const [ options, setOptions ] = useState(currencyWithFlags);
  //variables
  const classes = [ 'frui-form-currency-select' ];
  className && classes.push(className);
  const searchPlaceholder = typeof searchable === 'string' 
    ? searchable 
    : 'Search...';
  //handlers
  const handlers = {
    filter: (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        const keyword = input.value.toLowerCase().trim();
        const filtered = currencyWithFlags.filter(
          currency => currency.name.toLowerCase().includes(keyword)
            || currency.code.toLowerCase().includes(keyword)
            || currency.plural.toLowerCase().includes(keyword)
        );
        setOptions(filtered);
      });
      return false;
    },
    update: onUpdate ? (value: string | string[]) => {
      if (Array.isArray(value)) {
        const selected = currencies.filter(
          currency => value.includes(currency.code)
        ) as CurrencyData[];
        onUpdate && onUpdate(selected);
      } else {
        const selected = currencies.find(
          currency => currency.code === value
        ) as CurrencyData | undefined;
        selected && onUpdate && onUpdate(selected);
      }
    }: undefined
  };
  //render
  return (
    <Select
      {...props}
      className={classes.join(' ')}
      onUpdate={handlers.update}
      placeholder={placeholder || 'Select a currency'}
    >
      {!!searchable && (
        <SelectDropdownHead>
          <div>
            <input 
              type="text" 
              onKeyUp={handlers.filter} 
              placeholder={searchPlaceholder} 
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <span>🔍</span>
          </div>
        </SelectDropdownHead>
      )}
      {options.map(option => (
        <SelectOption key={option.code} value={option.code}>
          {option.flag} {option.name} ({option.symbol})
        </SelectOption>
      ))}
    </Select>
  );
};

//defaults to currency
export default CurrencySelect;