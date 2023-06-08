//types
import type { FormatCountryProps } from '../types';
//react
import React from 'react';
//helpers
import countries from '../data/countries.json';
import { makeGroupStyles, makeGroupClasses, makeStyles } from '../utils';

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
  const size = sm ? '20px': md ? '40px' : lg ? '60px' : '40px';
  const map = {
    styles: makeGroupStyles(styles, {
      container: makeStyles(style, {
        alignItems: 'center', 
        display: 'flex'
      }),
      flag: {
        display: 'inline-block', 
        marginRight: '4px', 
        width: size
      },
      text: undefined
    }),
    classes: makeGroupClasses(classNames, {
      container: className,
      flag: undefined,
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