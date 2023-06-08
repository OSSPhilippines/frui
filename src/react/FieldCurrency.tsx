//types
import type { FieldCurrencyProps } from '../types';
//react
import React from 'react';
//components
import Select from './FieldSelect';
//hooks
import useSelectCurrency from '../hooks/useFieldCurrency';

/**
 * Styled Currency Field Component (Main)
 */
const FieldCurrency: React.FC<FieldCurrencyProps> = (props) => {
  const { value, placeholder = 'Choose a Currency', ...attributes } = props;
  const { selected, options } = useSelectCurrency({
    value, 
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
      options={options} 
      searchable={true} 
    />
  );
};

export default FieldCurrency;