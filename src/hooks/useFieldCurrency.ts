//types
import type { FieldCurrencyOption, FieldCurrencyConfig } from '../types';
//data
import countries from '../data/countries.json';

export default function useSelectCurrency(config: FieldCurrencyConfig) {
  const { value, map } = config;
  //generate options
  const options = countries
    .filter(country => country.currencyType === 'fiat')
    .filter(country => country.currencyCode !== 'USD' || country.countryCode === 'US')
    .map(map);

  const selected = typeof value === 'string' 
    ? options.filter(
        option => option.value?.currencyCode === value
      )[0] as FieldCurrencyOption
    : undefined;

  return { selected, options };
  
};