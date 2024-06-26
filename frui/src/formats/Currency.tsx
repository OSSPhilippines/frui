//types
import type { CSSProperties } from 'react';
//helpers
import countries from '../data/intl.json';

/**
 * Currency Props
 */
export type CurrencyProps = {
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
 * Currency Format Component (Main)
 */
export default function Currency(props: CurrencyProps) {
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
  const currency = countries.find(country => (
    (value.toUpperCase() !== 'USD' && country.currencyCode === value)
    || (value.toUpperCase() === 'USD' && country.countryCode === 'US')
  ));
  if (!currency) {
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
        <img 
          className="frui-format-country-flag"
          style={flagStyles}
          alt={`${currency.countryName} Flag`} 
          src={`https://flagcdn.com/w80/${currency.countryCode.toLowerCase()}.png`} 
          loading="lazy"
        />
        <span className="frui-format-country-text">
          {currency.currencyName}
        </span>
      </span>
    );  
  } else if (flag) {
    const classNames = ['frui-format-country-flag'];
    if (className) {
      classNames.push(className);
    }
    return (
      <img 
        className={classNames.join(' ')} 
        style={{ ...style, ...flagStyles }}
        alt={`${currency.countryName} Flag`} 
        src={`https://flagcdn.com/w40/${currency.countryCode.toLowerCase()}.png`} 
        loading="lazy"
      />
    );
  }

  const classNames = ['frui-format-country-text'];
  if (className) {
    classNames.push(className);
  }
  return (
    <span className={classNames.join(' ')} style={style}>
      {currency.currencyName}
    </span>
  );
};