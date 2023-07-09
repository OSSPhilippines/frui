//types
import type { CurrencyProps }from 'frui-core/dist/types/formats';
//react
import React from 'react';
//helpers
import countries from 'frui-core/dist/data/countries.json';
import { makeGroupStyles, makeGroupClasses, makeClasses } from 'frui-core/dist/utils';

const Currency: React.FC<CurrencyProps> = (props) => {
  const { 
    value, 
    flag = true, 
    text = true,
    sm,
    md,
    lg,
    className, 
    classNames,
    style,  
    styles
  } = props;
  const size = sm ? 'w-5': md ? 'w-10' : lg ? 'w-14' : 'w-10';
  const map = {
    styles: makeGroupStyles(styles, {
      container: style,
      flag: undefined,
      text: undefined
    }),
    classes: makeGroupClasses(classNames, {
      container: makeClasses(className, 'flex items-center'),
      flag: `inline-block mr-1 ${size}`,
      text: undefined
    })
  };
  const currency = countries.find(country => (
    (value.toUpperCase() !== 'USD' && country.currencyCode === value)
    || (value.toUpperCase() === 'USD' && country.countryCode === 'US')
  ));
  if (!currency) {
    return (
      <span className={map.classes.text} style={map.styles.text}>
        {value}
      </span>
    );
  }

  if (flag && text) {
    return (
      <span className={map.classes.container} style={map.styles.container}>
        <img 
          className={map.classes.flag} 
          style={map.styles.flag}
          alt={`${currency.countryName} Flag`} 
          src={`https://flagcdn.com/w80/${currency.countryCode.toLowerCase()}.png`} 
          loading="lazy"
        />
        <span className={map.classes.text} style={map.styles.text}>
          {currency.currencyName}
        </span>
      </span>
    );  
  } else if (flag) {
    return (
      <img 
        className={map.classes.box} 
        style={map.styles.box}
        alt={`${currency.countryName} Flag`} 
        src={`https://flagcdn.com/w40/${currency.countryCode.toLowerCase()}.png`} 
        loading="lazy"
      />
    );
  }

  return (
    <span className={map.classes.text} style={map.styles.text}>
      {currency.currencyName}
    </span>
  );
  
};

export default Currency;