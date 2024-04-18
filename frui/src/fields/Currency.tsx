//types
import type { 
  CurrencyProps, 
  CurrencyOption, 
  CurrencyConfig 
} from '../types/fields';
//components
import Select from './Select';
//data
import countries from '../data/intl.json';

/**
 * Currency Hook Aggregate
 */
export function useCurrency(config: CurrencyConfig) {
  const { value, defaultValue, map } = config;
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

  const selectedDefault = typeof defaultValue === 'string' 
    ? options.filter(
        option => option.value?.currencyCode === defaultValue
      )[0] as CurrencyOption
    : undefined;

  return { selected, selectedDefault, options };
};

/**
 * Styled Currency  Component (Main)
 */
export default function Currency(props: CurrencyProps) {
  const { 
    value, 
    defaultValue, 
    placeholder = 'Choose a Currency', 
    ...attributes 
  } = props;
  const { selected, selectedDefault, options } = useCurrency({
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
          <span className="inline-block ml-2">
            {country.currencyName} ({country.currencyCode})
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
    <Select 
      {...attributes} 
      placeholder={placeholder} 
      value={selected} 
      defaultValue={selectedDefault}
      options={options} 
      searchable={true} 
    />
  );
};