import React, { useEffect, useRef, useState } from 'react';
import { 
  parsePhoneNumberFromString, 
  AsYouType, 
  CountryCode 
} from 'libphonenumber-js';
import type { CountryData as Country } from '../field/Country';
import countriesData from '../data/countries';

export type DialCode = `+${string}`;

export type PhoneInputProps = {
  error?: boolean;
  initialValue?: string;
  name?: string;
  placeholder?: string;
  searchable?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const typedCountries = countriesData as Country[];

export function usePhoneInput(initialValue?: string, defaultCountry: Country = typedCountries[0]) {
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ rawNumber, setRawNumber ] = useState('');
  const [ selectedCountry, setSelectedCountry ] = useState<Country>(defaultCountry);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ countries, setCountries ] = useState<Country[]>(typedCountries);
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  //format & validate input
  const handlePhoneInputChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    setRawNumber(numericValue);

    const formatter = new AsYouType(selectedCountry.iso2.toUpperCase() as CountryCode);
    const formatted = formatter.input(numericValue);

    setPhoneNumber(formatted);
  };

  //select country
  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setSearchTerm('');
    setCountries(typedCountries);
    setIsDropdownOpen(false);
  };

  //search countries
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = typedCountries.filter(c =>
      c.name.toLowerCase().includes(term.toLowerCase()) ||
      c.iso2.toLowerCase().includes(term.toLowerCase())
    );
    setCountries(filtered);
  };

  //format initial value
  useEffect(() => {
    if (!initialValue) return;

    const parsed = parsePhoneNumberFromString(initialValue);
    if (parsed) {
      const isoCode = parsed.country as CountryCode;
      const match = typedCountries.find(c => c.iso2.toUpperCase() === isoCode);

      if (match) {
        setSelectedCountry(match);
        const formatter = new AsYouType(isoCode);
        const formatted = formatter.input(parsed.nationalNumber);
        setPhoneNumber(formatted);
        setRawNumber(parsed.nationalNumber);
      } else {
        setPhoneNumber(parsed.nationalNumber || initialValue);
        setRawNumber(parsed.nationalNumber || initialValue);
      }
    } else {
      setPhoneNumber(initialValue);
      setRawNumber(initialValue.replace(/\D/g, ''));
    }
  }, [ initialValue ]);

  //outside click closes dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
        setCountries(typedCountries);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //escape key closes dropdown
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setSearchTerm('');
        setCountries(typedCountries);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [ isDropdownOpen ]);

  return {
    phoneNumber,
    rawNumber,
    selectedCountry,
    countries,
    searchTerm,
    isDropdownOpen,
    dropdownRef,
    setIsDropdownOpen,
    handlers: { handlePhoneInputChange, handleCountryChange, handleSearch }
  };
}

//dropdown component
export function PhoneDropdown({
  countries,
  searchTerm,
  searchable,
  onSearch,
  onSelect
}: {
  countries: Country[];
  searchTerm: string;
  searchable?: boolean;
  onSearch: (term: string) => void;
  onSelect: (country: Country) => void;
}) {
  return (
    <div className="frui-phone-input-dropdown-container">
      <ul className="frui-phone-input-dropdown">
        {searchable && (
          <input
            autoFocus
            value={searchTerm}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search for country..."
            className="frui-phone-input-search"
            type="search"
          />
        )}
        {countries.map(country => (
          <li
            key={country.iso2}
            className="frui-phone-input-dropdown-item"
            onClick={() => onSelect(country)}
          >
            <span className="frui-phone-input-flag">{country.flag}</span>
            <span>{country.name}</span>
            <span className="frui-phone-input-dialcode">{country.tel}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

//main component
export default function PhoneInput({
  error = false,
  initialValue,
  name,
  placeholder,
  searchable = true,
  className,
  style
}: PhoneInputProps) {
  const {
    phoneNumber,
    rawNumber,
    selectedCountry,
    countries,
    searchTerm,
    isDropdownOpen,
    dropdownRef,
    setIsDropdownOpen,
    handlers
  } = usePhoneInput(initialValue, typedCountries[0]);

  //base + user class
  const classNames = [ 'frui-phone-input-wrapper' ];
  if (error) classNames.push('frui-phone-input-error');
  if (className) classNames.push(className);

  return (
    <>
      <div className={classNames.join(' ')} style={style}>
        <div className="frui-phone-input-container">
          <button
            className="frui-phone-input-select-btn"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="frui-phone-input-flag">{selectedCountry.flag}</span>
            <span>{selectedCountry.tel}</span>
          </button>
          <input
            className="frui-phone-input-container-input"
            type="tel"
            inputMode="numeric"
            value={phoneNumber}
            onChange={e => handlers.handlePhoneInputChange(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        {isDropdownOpen && (
          <div ref={dropdownRef}>
            <PhoneDropdown
              countries={countries}
              searchTerm={searchTerm}
              searchable={searchable}
              onSearch={handlers.handleSearch}
              onSelect={handlers.handleCountryChange}
            />
          </div>
        )}
      </div>
      {/* hidden input for form submission */}
      <input type="hidden" name={name} value={`${selectedCountry.tel}${rawNumber}`} />
    </>
  );
}