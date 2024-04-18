//types
import type { CSSProperties } from 'react';
//helpers
import countries from '../data/intl.json';

/**
 * Country Props
 */
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

/**
 * Country Format Component (Main)
 */
export default function Country(props: CountryProps) {
  const { 
    value, 
    flag = true, 
    text = true,
    sm,
    md,
    lg,
    className, 
    style = {}
  } = props;
  const flagStyles = { width: sm ? '20px'
    : md ? '40px' 
    : lg ? '60px' 
    : '40px' 
  };

  const country = countries.find(
    country => country.countryCode === value
  );
  if (!country) {
    const classNames = ['format-country-text'];
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
    const classNames = ['format-country'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        <img 
          className="format-country-flag"
          style={flagStyles}
          alt={`${country.countryName} Flag`} 
          src={`https://flagcdn.com/w80/${country.countryCode.toLowerCase()}.png`} 
          loading="lazy"
        />
        <span className="format-country-text">
          {country.countryName}
        </span>
      </span>
    );  
  } else if (flag) {
    const classNames = ['format-country-flag'];
    if (className) {
      classNames.push(className);
    }
    return (
      <img 
        className={classNames.join(' ')} 
        style={{ ...style, ...flagStyles }}
        alt={`${country.countryName} Flag`} 
        src={`https://flagcdn.com/w40/${country.countryCode.toLowerCase()}.png`} 
        loading="lazy"
      />
    );
  }

  const classNames = ['format-country-text'];
    if (className) {
      classNames.push(className);
    }
  return (
    <span className={classNames.join(' ')} style={style}>
      {country.countryName}
    </span>
  );
};