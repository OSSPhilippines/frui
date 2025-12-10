//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import Country from '../../src/view/Country.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/data/countries.js', () => ({
  __esModule: true,
  default: [
    { iso3: 'USA', name: 'United States', flag: '🇺🇸' },
    { iso3: 'FRA', name: 'France', flag: '🇫🇷' }
  ]
}));

//--------------------------------------------------------------------//
// Tests

describe('<Country />', () => {
  it('renders both flag and name by default', () => {
    const { container } = render(<Country value="FRA" />);
    const wrapper = container.querySelector('.frui-view-country')!;
    const flag = wrapper.querySelector('.frui-view-country-flag');
    const text = wrapper.querySelector('.frui-view-country-text');
    expect(wrapper).toHaveClass('frui-view-country');
    expect(flag).toHaveTextContent('🇫🇷');
    expect(text).toHaveTextContent('France');
  });

  it('renders text only when flag is false', () => {
    const { container } = render(<Country value="USA" flag={false} />);
    const text = container.querySelector('.frui-view-country-text');
    expect(text).toHaveTextContent('United States');
    expect(text).toHaveClass('frui-view-country-text');
  });

  it('renders flag only when text is false', () => {
    const { container } = render(<Country value="USA" text={false} />);
    const flag = container.querySelector('.frui-view-country-flag');
    expect(flag).toHaveTextContent('🇺🇸');
  });

  it('renders raw value when ISO3 code not found', () => {
    const { container } = render(<Country value="XYZ" />);
    const fallback = container.querySelector('.frui-view-country');
    expect(fallback).toHaveTextContent('XYZ');
  });

  it('applies custom className and style when provided', () => {
    const { container } = render(
      <Country
        value="USA"
        className="custom"
        style={{ margin: '10px' }}
      />
    );
    const wrapper = container.querySelector('.frui-view-country');
    expect(wrapper).toHaveClass('custom');
    expect(wrapper).toHaveStyle({ margin: '10px' });
  });
});