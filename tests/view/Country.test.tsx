//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Country from '../../src/view/Country.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../../src/data/countries.js', () => ({
  __esModule: true,
  default: [
    { iso3: 'USA', name: 'United States', flag: '🇺🇸' },
    { iso3: 'FRA', name: 'France', flag: '🇫🇷' },
  ],
}))

//--------------------------------------------------------------------//
// Tests

describe('<Country />', () => {
  it('renders both flag and name by default', () => {
    render(<Country value="FRA" />);

    const wrapper = document.querySelector('.frui-format-country')!;
    const flag = wrapper.querySelector('.frui-format-country-flag');
    const text = wrapper.querySelector('.frui-format-country-text');

    expect(wrapper).toHaveClass('frui-format-country');
    expect(flag).toHaveTextContent('🇫🇷');
    expect(text).toHaveTextContent('France');
  });

  it('renders text only when flag is false', () => {
    render(<Country value="USA" flag={false} />);

    const text = document.querySelector('.frui-format-country-text');
    expect(text).toHaveTextContent('United States');
    expect(text).not.toHaveClass('frui-format-country-flag');
  });

  it('renders flag only when text is false', () => {
    render(<Country value="USA" text={false} />);

    const flag = document.querySelector('.frui-format-country-flag');
    expect(flag).toHaveTextContent('🇺🇸');
  });

  it('renders raw value when ISO3 code not found', () => {
    render(<Country value="XYZ" />);

    const fallback = document.querySelector('.frui-format-country-text');
    expect(fallback).toHaveTextContent('XYZ');
  });

  it('applies custom className and style when provided', () => {
    render(
      <Country
        value="USA"
        className="custom"
        style={{ margin: '10px' }}
      />
    );

    const wrapper = document.querySelector('.frui-format-country');
    expect(wrapper).toHaveClass('custom');
    expect(wrapper).toHaveStyle({ margin: '10px' });
  });
});