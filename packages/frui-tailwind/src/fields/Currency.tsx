//types
import type { CurrencyProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Select from './Select';
//hooks
import useCurrency from 'frui-core/dist/hooks/useCurrency';

/**
 * Styled Currency  Component (Main)
 */
const Currency: React.FC<CurrencyProps> = (props) => {
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

export default Currency;