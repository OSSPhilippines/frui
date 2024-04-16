//types
import type { CurrencyProps } from '../types/formats';
//helpers
import countries from '../utils/intl.json';

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
          alt={`${currency.countryName} Flag`} 
          src={`https://flagcdn.com/w80/${currency.countryCode.toLowerCase()}.png`} 
          loading="lazy"
        />
        <span className="format-country-text">
          {currency.currencyName}
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
        alt={`${currency.countryName} Flag`} 
        src={`https://flagcdn.com/w40/${currency.countryCode.toLowerCase()}.png`} 
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
      {currency.currencyName}
    </span>
  );
};