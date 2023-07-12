//types
import type { CountryOption, CountryConfig } from '../types/fields';
//data
import countries from '../data/countries.json';

export default function useSelectCountry(config: CountryConfig) {
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