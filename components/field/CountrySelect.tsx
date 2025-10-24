//--------------------------------------------------------------------//
// Imports

//modules
import type { KeyboardEvent } from 'react';
import { useState } from 'react';
//frui
import type { ExtendsType } from '../types.js';
import type { SelectProps } from './Select.js';
import countries from '../data/countries.js';
import { 
  Select, 
  SelectDropdownHead,
  SelectOption
} from './Select.js';

//--------------------------------------------------------------------//
// Types

export type CountryData = {
  type: string,
  iso2: string,
  iso3: string,
  name: string,
  flag: string,
  ne: [ number, number ],
  sw: [ number, number ],
  cur: string,
  tel: string,
  lang: string,
  num: [ string, string ]
};

export type CountrySelectProps = ExtendsType<SelectProps, {
  searchable?: boolean | string,
  onUpdate?: (country: CountryData | CountryData[]) => void
}>;

//--------------------------------------------------------------------//
// Components

export function CountrySelect(props: CountrySelectProps) {
  //props
  const { className, onUpdate, placeholder, searchable } = props;
  //hooks
  const [ keyword, setKeyword ] = useState('');
  const [ options, setOptions ] = useState(countries);
  //variables
  const classes = [ 'frui-field-country-select' ];
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
        const filtered = countries.filter(
          country => country.name.toLowerCase().includes(keyword)
            || country.iso2.toLowerCase().includes(keyword)
            || country.iso3.toLowerCase().includes(keyword)
            || country.cur.toLowerCase().includes(keyword)
            || country.lang.toLowerCase().includes(keyword)
            || country.tel.includes(keyword)
        );
        setOptions(filtered);
      });
      return false;
    },
    update: onUpdate ? (value: string | string[]) => {
      if (Array.isArray(value)) {
        const selected = countries.filter(
          country => value.includes(country.iso2)
        ) as CountryData[];
        onUpdate && onUpdate(selected);
      } else {
        const selected = countries.find(
          country => country.iso2 === value
        ) as CountryData | undefined;
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
      placeholder={placeholder || 'Select a country'}
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
        <SelectOption key={option.iso2} value={option.iso2}>
          {option.flag} {option.name}
        </SelectOption>
      ))}
    </Select>
  );
};

//defaults to country
export default CountrySelect;