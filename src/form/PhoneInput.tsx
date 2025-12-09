//--------------------------------------------------------------------//
// Imports

//modules
import type { KeyboardEvent } from 'react';
import { useEffect, useState } from 'react';
import { 
  parsePhoneNumberFromString, 
  AsYouType, 
  CountryCode 
} from 'libphonenumber-js';
//frui
import type { 
  SlotStyleProp, 
  CallableSlotStyleProp 
} from '../types.js';
import type { 
  DropdownStates, 
  DropdownConfig 
} from '../base/Dropdown.js';
import type { InputProps } from './Input.js';
import type { CountryData } from './CountrySelect.js';
import countriesData from '../data/countries.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import getClassStyles from 'src/helpers/getClassStyles.js';
import Button from '../base/Button.js';
import Dropdown from '../base/Dropdown.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type PhoneData = {
  code: string,
  local: string,
  full: string,
  iso: string,
  flag: string,
  name: string
};

export type DialCode = `+${string}`;

export type PhoneInputConfig = {
  //default country iso2 code
  defaultCountry?: string,
  //uncontrolled value
  defaultValue?: string,
  //controlled value
  value?: string
};

export type PhoneInputControlConfig = {
  //default value (uncontrolled)
  defaultValue?: string,
  //controlled value
  value?: string
};

export type PhoneInputControlProps = Omit<InputProps & {
  //position of the dropdown
  bottom?: boolean,
  //position of the dropdown
  left?: boolean,
  //position of the dropdown
  right?: boolean,
  //position of the dropdown
  top?: boolean
}, 'multiple'>;

export type PhoneInputProps = Omit<InputProps 
  & PhoneInputConfig
  & DropdownConfig
  & { 
    //slot: style to apply to the select control
    control?: SlotStyleProp,
    //slot: style to apply to the select drop down
    dropdown?: SlotStyleProp,
    //slot: style to apply to the select control
    option?: CallableSlotStyleProp<DropdownStates>,
    //whether to add search filter to dropdown
    // (if string, used as placeholder)
    searchable?: boolean | string
  }, 
  'multiple'
>;

//--------------------------------------------------------------------//
// Constants

export const allCountries = countriesData as CountryData[];

//--------------------------------------------------------------------//
// Helpers

/**
 * Retrieves phone data from a given value
 */
export function getPhoneData(value?: string) {
  //get phone number object from value
  const data = parsePhoneNumberFromString(String(value));
  //if no phone object, return null
  if (!data) return null;
  //format number
  const country = allCountries.find(
    country => country.iso2.toUpperCase() === (data?.country || '').toUpperCase()
  )!;
  const code = data.countryCallingCode as string;
  const formatter = new AsYouType(data.country as CountryCode);
  const full = formatter.input(data.number);
  const local = full.replace(`+${code}`, '').trim();
  const flag = country.flag;
  const name = country.name;
  const iso = country.iso2;
  return { code, local, full, iso, flag, name };
};

export function getCountryCode(phoneNumber: string) {
  const data = parsePhoneNumberFromString(phoneNumber);
  return data?.country;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Hook to manage phone input control state and logic
 */
export function usePhoneInputControl(config: PhoneInputControlConfig) {
  const {
    defaultValue,
    value
  } = config;
  //hooks
  const { open, opened, selected } = Dropdown.useContext();
  // determine country (make it guaranteed)
  const [ country, setCountry ] = useState(selected[0] ? allCountries.find(
    country => country.iso2 === selected[0]
  ) || allCountries[0] : allCountries[0]);
  const [ data, setData ] = useState(
    //it's possible phone number is invalid,
    getPhoneData(defaultValue ? String(defaultValue) : '')
    // so we should add the country tel code if it is invalid
    || getPhoneData(defaultValue ? `${country.tel} ${defaultValue}`: '')
  );
  //handlers
  const handlers = {
    toggle() {
      open(!opened);
    },
    hide() {
      setTimeout(() => open(false));
    },
    update(value: string) {
      setData(getPhoneData(`${country.tel} ${value}`));
    }
  };
  //effects
  // whenever controlled value changes
  useEffect(() => {
    //if no value, do nothing
    if (typeof value === 'undefined') return;
    //update phone data
    setData(getPhoneData(String(value)));
  }, [ value ]);
  // whenever selected country changes
  useEffect(() => {
    //if no selection, do nothing
    if (selected.length === 0) return;
    //find country data
    const selectedCountry = allCountries.find(
      country => country.iso2 === selected[0]
    );
    //if no country found, do nothing
    if (!selectedCountry) return;
    //update country state
    setCountry(selectedCountry);
    //update phone data with new country code
    setData(prevData => {
      const localNumber = prevData ? prevData.local : '';
      return getPhoneData(`${selectedCountry.tel} ${localNumber}`);
    });
  }, [ selected ]);

  return { country, data, handlers };
};

/**
 * Hook to manage phone input state and logic
 */
export function usePhoneInput(config: PhoneInputConfig) {
  //config
  const { 
    //default country iso2 code
    defaultCountry,
    //uncontrolled value
    defaultValue, //?: string
    //controlled value
    value //?: string
  } = config;
  //hooks
  const [ options, setOptions ] = useState(allCountries);
  const [ keyword, setKeyword ] = useState('');
  //variables
  // determine country
  const country = (value && getCountryCode(value)) 
    || (defaultValue && getCountryCode(defaultValue)) 
    || defaultCountry;

  //handlers
  const handlers = {
    setOptions,
    setKeyword,
    filter: (e: KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      setTimeout(() => {
        const input = e.target as HTMLInputElement;
        const keyword = input.value.toLowerCase().trim();
        const filtered = allCountries.filter(
          country => country.name.toLowerCase().includes(keyword)
            || country.iso2.toLowerCase().includes(keyword)
            || country.iso3.toLowerCase().includes(keyword)
            || country.cur.toLowerCase().includes(keyword)
            || country.lang.toLowerCase().includes(keyword)
            || country.tel.includes(keyword)
        );
        setOptions(filtered);
      });
      return false;
    }
  };

  return {
    country,
    options,
    keyword,
    handlers
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Phone input control component
 */
export function PhoneInputControl(props: PhoneInputControlProps) {
  //props
  const { 
    //position of the dropdown
    bottom, //?: boolean,
    //custom class name
    className,
    //in this case the default value is the full phone number
    // ie. "+1 123 456 7890"
    // (uncontrolled)
    defaultValue, //?: string,
    //position of the dropdown
    left, //?: boolean,
    //field name (for form submission)
    name, //?: string
    //position of the dropdown
    right, //?: boolean,
    //position of the dropdown
    top, //?: boolean
    //in this case the default value is the full phone number
    // ie. "+1 123 456 7890"
    // (controlled)
    value, //?: string,
    ...inputProps
  } = props;
  //hooks
  const { data, country, handlers } = usePhoneInputControl({ 
    defaultValue: typeof defaultValue !== 'undefined' 
      ? String(defaultValue) 
      : undefined, 
    value: typeof value !== 'undefined' 
      ? String(value) 
      : undefined
  });
  //variables
  // determine classes
  const classes = [ 'frui-form-phone-input-control-input' ];
  className && classes.push(className);
  // determine direction symbol
  const direction = top ? '▲' 
    : bottom ? '▼' 
    : left ? '◀' 
    : right ? '▶' 
    : '▼';
  //render
  return (
    <div className="frui-form-phone-input-control">
      <Button
        type="button"
        onClick={handlers.toggle}
      >
        <span className="frui-form-phone-input-flag">{country.flag}</span>
        <span className="frui-form-phone-input-tel">{country.tel}</span>
        <span className="frui-form-phone-input-direction">{direction}</span>
      </Button>
      <Input
        {...inputProps}
        className={classes.join(' ')}
        onBlur={handlers.hide}
        onUpdate={handlers.update}
        value={data?.local}
      />
      {/* hidden input for form submission */}
      <input 
        type="hidden" 
        name={name}
        value={data?.full || ''}
      />
    </div>
  );
};

/**
 * PhoneInput Component
 */
export function PhoneInput(props: PhoneInputProps) {
  //props
  const {
    //selector used to get the element to which the dialog will be
    // appended to when activated
    append, //?: string  
    //position of the dropdown
    bottom, //?: boolean
    //slot: style to apply to the select control
    control, //?: SlotStyleProp,
    //slot: style to apply to the select drop down
    dropdown, //?: SlotStyleProp,
    //slot: style to apply to the select control
    option, //?: CallableSlotStyleProp<DropdownStates>
    //custom class name to apply to dropdown container
    className,
    //default country iso2 code
    defaultCountry = 'US',
    //default value (uncontrolled)
    defaultValue,
    //whether input is in an error state
    error, //?: boolean
    //position of the dropdown
    left, //?: boolean
    //dropdown handler
    onDropdown, //?: (show: boolean) => void
    //update handler
    onUpdate, //?: (value: string) => void
    //position of the dropdown
    right, //?: boolean
    //whether to add search filter to dropdown
    // (if string, used as placeholder)
    searchable, //?: boolean | string,
    //custom styles to apply to dropdown container
    style,
    //position of the dropdown
    top, //?: boolean
    //value (controlled)
    value,
    //the rest goes to input...
    ...inputProps
  } = props;
  //hooks
  const {
    country,
    options,
    keyword,
    handlers
  } = usePhoneInput({
    defaultCountry,
    defaultValue,
    value
  });
  //variables
  // determine classes
  const classes = [ 'frui-form-phone-input' ];
  error && classes.push('frui-form-phone-input-error');
  className && classes.push(className);
  // get slot styles
  const controlStyles = control ? getSlotStyles(control, {}) : {};
  const dropdownStyles = getClassStyles({
    //default classes to apply
    classes: [ 'frui-form-phone-input-dropdown' ],
    //style props
    props: dropdown ? getSlotStyles(dropdown, {}) : {},
    //state to pass to callable props
    state: {}
  });
  //determine search placeholder
  const searchPlaceholder = typeof searchable === 'string' 
    ? searchable 
    : 'Search...';
  //render
  return (
    <Dropdown
      append={append}
      bottom={bottom}
      className={dropdownStyles.classes.join(' ')}
      container={{ className: classes.join(' '), style }}
      left={left}
      defaultValue={country}
      onDropdown={onDropdown}
      onUpdate={onUpdate}
      option={option}
      right={right}
      style={dropdownStyles.styles}
      top={top}
    >
      <Dropdown.Control>
        <PhoneInputControl 
          {...inputProps}
          bottom={bottom}
          className={controlStyles.className} 
          defaultValue={defaultValue}
          left={left}
          right={right}
          top={top}
          style={controlStyles.style}
          value={value}
        />
      </Dropdown.Control>
      {!!searchable && (
        <Dropdown.Head>
          <div>
            <input 
              type="text" 
              onKeyUp={handlers.filter} 
              placeholder={searchPlaceholder} 
              value={keyword}
              onChange={e => handlers.setKeyword(e.target.value)}
            />
            <span>🔍</span>
          </div>
        </Dropdown.Head>
      )}
      {options.map(option => (
        <Dropdown.Option key={option.iso2} value={option.iso2}>
          <span>{option.flag}</span>
          <span>{option.name}</span>
          <span>{option.tel}</span>
        </Dropdown.Option>
      ))}
    </Dropdown>
  );
};

//defaults to phone input
export default Object.assign(PhoneInput, {
  usePhoneInput,
  Control: PhoneInputControl,
  use: usePhoneInput
});