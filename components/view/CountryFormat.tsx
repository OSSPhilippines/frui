//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';
//helpers
import countries from '../data/countries.js';

//--------------------------------------------------------------------//
// Types

export type CountryFormatProps = { 
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
 * CountryFormat Component (Main)
 */
export function CountryFormat(props: CountryFormatProps) {
  const { 
    value, 
    flag = true, 
    text = true,
    // sm,
    // md,
    // lg,
    className, 
    style = {}
  } = props;

  const country = countries.find(
    country => country.iso3 === value
  );
  if (!country) {
    const classNames = ['frui-format-country-text'];
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
    const classNames = ['frui-format-country'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        <span className="frui-format-country-flag">
          {country.flag}
        </span>
        <span className="frui-format-country-text">
          {country.name}
        </span>
      </span>
    );  
  } else if (flag) {
    const classNames = ['frui-format-country-flag'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className="frui-format-country-flag">
        {country.flag}
      </span>
    );
  }

  const classNames = ['frui-format-country-text'];
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
export default CountryFormat;