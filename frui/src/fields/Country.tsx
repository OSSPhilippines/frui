//types
import type { ExtendsType } from '../types';
import type { SelectProps, SelectOption } from './Select';
//components
import Select from './Select';
//data
import countries from '../data/intl.json';

/**
 * Country Data
 */
export type CountryData = {
  countryCode: string,
  countryName: string,
  currencyType: string,
  currencyCode: string,
  currencyName: string,
  currencyPlural: string,
  currencySymbol: string,
  language: string
};

/**
 * Country Option
 */
export type CountryOption = SelectOption<CountryData>;

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
  const options = countries
    .filter(country => country.currencyType === 'fiat')
    .map(map);

  const selected = typeof value === 'string' 
    ? options.filter(
        option => option.value?.countryCode === value
      )[0] as CountryOption
    : undefined;
  
  const selectedDefault = typeof defaultValue === 'string' 
    ? options.filter(
        option => option.value?.countryCode === defaultValue
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
          <img 
            alt={`${country.countryName} Flag`} 
            src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`} 
            loading="lazy"
          />
          <span className="frui-field-select-label">
            {country.countryName}
          </span>  
        </>
      ),
      value: country,
      keyword: (keyword: string) => country.countryCode.toLowerCase().indexOf(keyword) >= 0
        || country.countryName.toLowerCase().indexOf(keyword) >= 0
        || country.currencyCode.toLowerCase().indexOf(keyword) >= 0
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