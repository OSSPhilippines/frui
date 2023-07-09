//types
import type { CurrencyOption, CurrencyConfig } from '../types/fields';
//data
import countries from '../data/countries.json';

export default function useSelectCurrency(config: CurrencyConfig) {
  const { value, map } = config;
  //generate options
  const options = countries
    .filter(country => country.currencyType === 'fiat')
    .filter(country => country.currencyCode !== 'USD' || country.countryCode === 'US')
    .map(map);

  const selected = typeof value === 'string' 
    ? options.filter(
        option => option.value?.currencyCode === value
      )[0] as CurrencyOption
    : undefined;

  return { selected, options };
};