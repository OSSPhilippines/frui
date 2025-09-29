//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';
//helpers
import currencies from '../data/currencies.js';
import countries from '../data/countries.js';

//--------------------------------------------------------------------//
// Types

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

//--------------------------------------------------------------------//
// Components

/**
 * Currency Format Component (Main)
 */
export function Currency(props: CurrencyProps) {
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
  const currency = currencies
    .filter(currency => currency.type === 'fiat')
    .map(currency => ({ 
      ...currency, 
      flag: countries.find(
        country => country.cur === currency.code
      )?.flag 
    }))
    .filter(currency => !!currency.flag)
    .find(currency => (
      currency.code === value
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
        <span className="frui-format-country-flag">
          {currency.flag}
        </span>
        <span className="frui-format-country-text">
          {currency.name}
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
        {currency.flag}
      </span>
    );
  }

  const classNames = ['frui-format-country-text'];
  if (className) {
    classNames.push(className);
  }
  return (
    <span className={classNames.join(' ')} style={style}>
      {currency.name}
    </span>
  );
};

//defaults to currency
export default Currency;