//types
import type { CountryProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Select from './Select';
//hooks
import useSelectCountry from 'frui-core/dist/hooks/useCountry';

/**
 * Styled Country  Component (Main)
 */
const Country: React.FC<CountryProps> = (props) => {
  const { 
    value, 
    defaultValue, 
    placeholder = 'Choose a Country', 
    ...attributes 
  } = props;
  const { selected, selectedDefault, options } = useSelectCountry({
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

export default Country;