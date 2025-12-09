//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Currency from '../../src/view/Currency.js';

//--------------------------------------------------------------------//
// Mocks 

vi.mock('../../src/data/currencies.js', () => ({
  __esModule: true,
  default: [
    { code: 'USD', name: 'US Dollar', type: 'fiat' },
    { code: 'EUR', name: 'Euro', type: 'fiat' },
  ],
}))

vi.mock('../../src/data/countries.js', () => ({
  __esModule: true,
  default: [
    { cur: 'USD', flag: '🇺🇸' },
    { cur: 'EUR', flag: '🇪🇺' },
  ],
}))

//--------------------------------------------------------------------//
// Tests

describe('<Currency />', () => {
  it('applies custom className and style', () => {
    const { container } = render(
      <Currency className="custom" style={{ margin: '5px' }} value="USD" />
    );
    const wrapper = container.querySelector('.frui-format-country');
    expect(wrapper).toHaveClass('custom');
    expect(wrapper).toHaveStyle({ margin: '5px' });
  });

  it('renders both flag and name by default', () => {
    const { container } = render(<Currency value="EUR" />);
    const wrapper = container.querySelector('.frui-format-country')!;
    expect(wrapper
      .querySelector('.frui-format-country-flag')
    ).toHaveTextContent('🇪🇺');
    expect(
      wrapper.querySelector('.frui-format-country-text')
    ).toHaveTextContent('Euro');
  });

  it('renders only the flag when text is false', () => {
    const { container } = render(<Currency text={false} value="USD" />);
    const flag = container.querySelector('.frui-format-country-flag');
    expect(flag).toHaveTextContent('🇺🇸');
  });

  it('renders only the text when flag is false', () => {
    const { container } = render(<Currency flag={false} value="USD" />);
    const text = container.querySelector('.frui-format-country-text');
    expect(text).toHaveTextContent('US Dollar');
  });

  it('renders raw value when currency code not found', () => {
    const { container } = render(<Currency value="UNKNOWN" />);
    const fallback = container.querySelector('.frui-format-country-text');
    expect(fallback).toHaveTextContent('UNKNOWN');
  });
});