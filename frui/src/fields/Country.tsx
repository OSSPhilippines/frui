//types
import type { 
  CountryProps, 
  CountryOption, 
  CountryConfig 
} from '../types/fields';
//components
import Select from './Select';
//data
import countries from '../data/intl.json';

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
          <span style={{ display: 'inline-block', marginLeft: '4px' }}>{country.countryName}</span>  
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