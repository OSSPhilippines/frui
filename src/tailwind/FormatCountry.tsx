//types
import type { FormatCountryProps } from '../types';
//react
import React from 'react';
//helpers
import countries from '../data/countries.json';
import { makeGroupStyles, makeGroupClasses, makeClasses } from '../utils';

const FormatCountry: React.FC<FormatCountryProps> = (props) => {
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
  const country = countries.find(country => country.countryCode === value);
  if (!country) {
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
          alt={`${country.countryName} Flag`} 
          src={`https://flagcdn.com/w80/${country.countryCode.toLowerCase()}.png`} 
          loading="lazy"
        />
        <span className={map.classes.text} style={map.styles.text}>
          {country.countryName}
        </span>
      </span>
    );  
  } else if (flag) {
    return (
      <img 
        className={map.classes.box} 
        style={map.styles.box}
        alt={`${country.countryName} Flag`} 
        src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`} 
        loading="lazy"
      />
    );
  }

  return (
    <span className={map.classes.text} style={map.styles.text}>
      {country.countryName}
    </span>
  );
  
};

export default FormatCountry;