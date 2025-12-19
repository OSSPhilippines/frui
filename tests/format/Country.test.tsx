//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Country from '../../frui/src/format/Country.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../data/countries.js', () => ({
  __esModule: true,
  default: [
    { iso3: 'USA', name: 'United States', flag: '🇺🇸' },
    { iso3: 'CAN', name: 'Canada', flag: '🇨🇦' },
    { iso3: 'MEX', name: 'Mexico', flag: '🇲🇽' }
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

const defaultCountry = 'USA';
const notFoundCountry = 'XYZ';

//--------------------------------------------------------------------//
// Tests

describe('Country component', () => {
  it('renders both flag and text when both are true', () => {
    render(<Country value={defaultCountry} />);
    const wrapper = document.querySelector('.frui-format-country');
    const flag = getFlagElement();
    const text = getTextElement();

    expect(wrapper).toBeInTheDocument();
    expect(flag).toHaveTextContent('🇺🇸');
    expect(text).toHaveTextContent('United States');
  });

  it('renders only flag when text is false', () => {
    render(<Country value={defaultCountry} text={false} />);
    const flag = getFlagElement();
    const text = getTextElement();

    expect(flag).toBeInTheDocument();
    expect(text).not.toBeInTheDocument();
    expect(flag).toHaveTextContent('🇺🇸');
  });

  it('renders only text when flag is false', () => {
    render(<Country value={defaultCountry} flag={false} />);
    const flag = getFlagElement();
    const text = getTextElement();

    expect(text).toBeInTheDocument();
    expect(flag).not.toBeInTheDocument();
    expect(text).toHaveTextContent('United States');
  });

  it('renders fallback text when country not found', () => {
    render(<Country value={notFoundCountry} />);
    const text = getTextElement();

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(notFoundCountry);
  });

  it('applies provided className correctly', () => {
    const customClass = 'custom-class';
    render(
      <Country value={defaultCountry} className={customClass} />
    );
    const wrapper = document.querySelector('.frui-format-country');
    expect(wrapper).toHaveClass(customClass);
  });

  it('applies style prop correctly', () => {
    const customStyle: CSSProperties = { margin: '8px' };
    render(<Country value={defaultCountry} style={customStyle} />);
    const wrapper = document.querySelector('.frui-format-country');
    expect(wrapper).toHaveStyle(customStyle);
  });

  it('matches snapshot for default rendering', () => {
    const { container } = render(
      <Country value={defaultCountry} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for flag-only rendering', () => {
    const { container } = render(
      <Country value={defaultCountry} text={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for text-only rendering', () => {
    const { container } = render(
      <Country value={defaultCountry} flag={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot when country not found', () => {
    const { container } = render(
      <Country value={notFoundCountry} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});