//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';
//helpers
import countries from '../data/countries.js';

//--------------------------------------------------------------------//
// Types

export type CountryProps = { 
  value: string, 
  flag?: boolean, 
  text?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  className?: string, 
  style?: CSSProperties
};

//--------------------------------------------------------------------//
// Components

/**
 * Country Component (Main)
 */
export function Country(props: CountryProps) {
  const { 
    value, 
    flag = true, 
    text = true,
    className, 
    style = {}
  } = props;

  const country = countries.find(
    country => country.iso3 === value
  );
  if (!country) {
    const classNames = ['frui-view-country'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        {value}
      </span>
    );
  }

  if (flag && text) {
    const classNames = ['frui-view-country'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        <span className="frui-view-country-flag">
          {country.flag}
        </span>
        <span className="frui-view-country-text">
          {country.name}
        </span>
      </span>
    );  
  } else if (flag) {
    const classNames = ['frui-view-country-flag'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className="frui-view-country-flag">
        {country.flag}
      </span>
    );
  }

  const classNames = ['frui-view-country-text'];
  if (className) {
    classNames.push(className);
  }
  return (
    <span className={classNames.join(' ')} style={style}>
      {country.name}
    </span>
  );
};

//defaults to country format
export default Country;