//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Country from '../../frui/src/field/Country.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Select.js', () => ({
  __esModule: true,
  default: ({
    placeholder,
    searchable,
    value,
    defaultValue,
    options,
    className
  }: {
    placeholder?: string,
    searchable?: boolean,
    value?: any,
    defaultValue?: any,
    options?: any[],
    className?: string
  }) => {
    const getValStr = (val: any) =>
      val && typeof val === 'object'
        ? val.value || JSON.stringify(val)
        : val || 'none';

    return (
      <div 
        data-testid="select-mock" 
        className={className}
      >
        <span data-testid="placeholder">{placeholder}</span>
        <span data-testid="searchable">
          {searchable ? 'true' : 'false'}
        </span>
        <span data-testid="value">{getValStr(value)}</span>
        <span data-testid="default-value">
          {getValStr(defaultValue)}
        </span>
        <span data-testid="options-count">
          {options?.length || 0}
        </span>
      </div>
    );
  }
}));

vi.mock('../../frui/src/data/countries.js', () => ({
  __esModule: true,
  default: [
    {
      type: 'country',
      iso2: 'US',
      iso3: 'USA',
      name: 'United States',
      flag: '🇺🇸',
      ne: [ -66.95, 49.38 ],
      sw: [ -124.77, 24.52 ],
      cur: 'USD',
      tel: '+1',
      lang: 'EN',
      num: [ '840', 'US' ]
    },
    {
      type: 'country',
      iso2: 'CA',
      iso3: 'CAN',
      name: 'Canada',
      flag: '🇨🇦',
      ne: [ -52.62, 83.11 ],
      sw: [ -141, 41.68 ],
      cur: 'CAD',
      tel: '+1',
      lang: 'EN',
      num: [ '124', 'CA' ]
    }
  ]
}));

//--------------------------------------------------------------------//
// Tests

describe('<Country />', () => {
  it('renders with default placeholder', () => {
    render(<Country />);
    expect(screen.getByTestId('placeholder')).toHaveTextContent(
      'Choose a Country'
    );
  });

  it('renders with custom placeholder', () => {
    render(<Country placeholder="Select Country" />);
    expect(screen.getByTestId('placeholder')).toHaveTextContent(
      'Select Country'
    );
  });

  it('passes searchable prop to Select', () => {
    render(<Country />);
    expect(
      screen.getByTestId('searchable')
    ).toHaveTextContent('true');
  });

  it('loads country options', () => {
    render(<Country />);
    expect(
      screen.getByTestId('options-count')
    ).toHaveTextContent('2');
  });

  it('passes value to Select component', () => {
    render(<Country value="USA" />);
    expect(screen.getByTestId('value')).toHaveTextContent('USA');
  });

  it('passes defaultValue to Select component', () => {
    render(<Country defaultValue="CAN" />);
    expect(
      screen.getByTestId('default-value')
    ).toHaveTextContent('CAN');
  });

  it('applies custom className', () => {
    render(<Country className="custom-class" />);
    const select = screen.getByTestId('select-mock');
    expect(select).toHaveClass('custom-class');
  });
});