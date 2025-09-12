//types
import type { ExtendsType } from '../types.js';
import type { SelectProps, SelectOption } from './Select.js';
//components
import Select from './Select.js';
//data
import countries from '../data/countries.js';

/**
 * Country Data
 */
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

/**
 * Country Option
 */
export type CountryOption = SelectOption<string>;

/**
 * Country Config
 */
export type CountryConfig = {
  value?: string,
  defaultValue?: string,
  map: (country: CountryData) => CountryOption
};

/**
 * Country Props
 */
export type CountryProps = ExtendsType<SelectProps, {
  options?: undefined,
  defaultValue?: string,
  value?: string
}>;

/**
 * Country Hook Aggregate
 */
export function useCountry(config: CountryConfig) {
  const { value, defaultValue, map } = config;
  //generate options
  const options = (countries as CountryData[]).map(map);

  const selected = typeof value === 'string' 
    ? options.filter(
        option => option.value === value
      )[0] as CountryOption
    : undefined;
  
  const selectedDefault = typeof defaultValue === 'string' 
    ? options.filter(
        option => option.value === defaultValue
      )[0] as CountryOption
    : undefined;

  return { selected, selectedDefault, options };
};

/**
 * Styled Country  Component (Main)
 */
export default function Country(props: CountryProps) {
  const { 
    value, 
    defaultValue, 
    placeholder = 'Choose a Country', 
    ...attributes 
  } = props;
  const { selected, selectedDefault, options } = useCountry({
    value, 
    defaultValue,
    map: country => ({
      label: (
        <>
          <span className="text-lg">{country.flag}</span>
          <span className="frui-field-select-label">
            {country.name}
          </span>  
        </>
      ),
      value: country.iso3,
      keyword: (keyword: string) => country.iso3.toLowerCase().indexOf(keyword) >= 0
        || country.name.toLowerCase().indexOf(keyword) >= 0
        || country.iso3.toLowerCase().indexOf(keyword) >= 0
    })
  });

  return (
    <Select<CountryData>
      {...attributes} 
      placeholder={placeholder} 
      value={selected} 
      defaultValue={selectedDefault}
      options={options} 
      searchable={true} 
    />
  );
};