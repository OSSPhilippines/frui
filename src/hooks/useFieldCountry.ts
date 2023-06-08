//types
import type { FieldCountryOption, FieldCountryConfig } from '../types';
//data
import countries from '../data/countries.json';

export default function useFieldSelectCountry(config: FieldCountryConfig) {
  const { value, map } = config;
  //generate options
  const options = countries
    .filter(country => country.currencyType === 'fiat')
    .map(map);

  const selected = typeof value === 'string' 
    ? options.filter(
        option => option.value?.countryCode === value
      )[0] as FieldCountryOption
    : undefined;

  return { selected, options };
  
};