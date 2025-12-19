//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Currency from '../../frui/src/format/Currency.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/data/currencies.js', () => ({
  __esModule: true,
  default: [
    { code: 'USD', name: 'US Dollar', type: 'fiat' },
    { code: 'EUR', name: 'Euro', type: 'fiat' },
    { code: 'BTC', name: 'Bitcoin', type: 'crypto' }
  ]
}));

vi.mock('../../frui/src/data/countries.js', () => ({
  __esModule: true,
  default: [
    { cur: 'USD', flag: '🇺🇸' },
    { cur: 'EUR', flag: '🇪🇺' },
    { cur: 'JPY', flag: '🇯🇵' }
  ]
}));

//--------------------------------------------------------------------//
// Helpers

function getFlagElement() {
  return document.querySelector('.frui-format-country-flag');
}

function getTextElement() {
  return document.querySelector('.frui-format-country-text');
}

const defaultCurrency = 'USD';
const notFoundCurrency = 'XYZ';

//--------------------------------------------------------------------//
// Tests

describe('<Currency /> Component', () => {
  it('renders both flag and text when both are true', () => {
    render(<Currency value={defaultCurrency} />);
    const wrapper = document.querySelector('.frui-format-country');
    const flag = getFlagElement();
    const text = getTextElement();
    expect(wrapper).toBeInTheDocument();
    expect(flag).toHaveTextContent('🇺🇸');
    expect(text).toHaveTextContent('US Dollar');
  });

  it('renders only flag when text is false', () => {
    render(<Currency value={defaultCurrency} text={false} />);
    const flag = getFlagElement();
    const text = getTextElement();
    expect(flag).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
    expect(flag).toHaveTextContent('🇺🇸');
  });

  it('renders only text when flag is false', () => {
    render(<Currency value={defaultCurrency} flag={false} />);
    const flag = getFlagElement();
    const text = getTextElement();
    expect(text).toBeInTheDocument();
    expect(flag).not.toBeInTheDocument();
    expect(text).toHaveTextContent('US Dollar');
  });

  it('renders fallback text when currency not found', () => {
    render(<Currency value={notFoundCurrency} />);
    const text = getTextElement();
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(notFoundCurrency);
  });

  it('applies provided className correctly', () => {
    const customClass = 'custom-currency';
    const { container } = render(
      <Currency 
        value={defaultCurrency} 
        className={customClass} 
      />
    );
    const wrapper = 
      container.querySelector('.frui-format-country');
    expect(wrapper).toHaveClass(customClass);
  });

  it('applies style prop correctly', () => {
    const { container } = render(
      <Currency 
        value={defaultCurrency} 
        style={{ margin: '6px' }} 
      />
    );
    const wrapper = 
      container.querySelector('.frui-format-country');
    expect(wrapper).toHaveStyle({ margin: '6px' });
  });

  it('does not render crypto currencies (no flag)', () => {
    render(<Currency value="BTC" />);
    const text = getTextElement();
    expect(text).toHaveTextContent('BTC');
  });

  it('matches snapshot for default render', () => {
    const { container } = render(
      <Currency value={defaultCurrency} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for flag-only render', () => {
    const { container } = render(
      <Currency value={defaultCurrency} text={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for text-only render', () => {
    const { container } = render(
      <Currency value={defaultCurrency} flag={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for unknown currency', () => {
    const { container } = render(
      <Currency value={notFoundCurrency} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});