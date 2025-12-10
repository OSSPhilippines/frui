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
    {
      type: 'country',
      iso2: 'US',
      iso3: 'USA',
      name: 'United States',
      flag: '🇺🇸',
      ne: [0, 0],
      sw: [0, 0],
      cur: 'USD',
      tel: '+1',
      lang: 'en',
      num: [ '001', '002' ]
    },
    {
      type: 'country',
      iso2: 'FR',
      iso3: 'FRA',
      name: 'France',
      flag: '🇫🇷',
      ne: [0, 0],
      sw: [0, 0],
      cur: 'EUR',
      tel: '+33',
      lang: 'fr',
      num: [ '003', '004' ]
    }
  ]
}));

//--------------------------------------------------------------------//
// Tests

describe('<Country />', () => {
  it('renders both flag and name by default', () => {
    const { container } = render(<Country value="USA" />);
    const wrapper = container.querySelector('.frui-view-country')!;
    expect(
      wrapper.querySelector('.frui-view-country-flag')
    ).toHaveTextContent('🇺🇸');
    expect(
      wrapper.querySelector('.frui-view-country-text')
    ).toHaveTextContent('United States');
  });
  it('applies custom className and style', () => {
    const { container } = render(
      <Country
        className="custom"
        style={{ margin: '5px' }}
        value="USA"
      />
    );
    const wrapper = container.querySelector('.frui-view-country');
    expect(wrapper).toHaveClass('custom');
    expect(wrapper).toHaveStyle({ margin: '5px' });
  });
  it('renders only the flag when text is false', () => {
    const { container } = render(<Country text={false} value="USA" />);
    const flag = container.querySelector('.frui-view-country-flag');
    expect(flag).toHaveTextContent('🇺🇸');
    expect(container.querySelector('.frui-view-country-text')).toBeNull();
  });
  it('renders only the text when flag is false', () => {
    const { container } = render(<Country flag={false} value="USA" />);
    const text = container.querySelector('.frui-view-country-text');
    expect(text).toHaveTextContent('United States');
    expect(container.querySelector('.frui-view-country-flag')).toBeNull();
  });
  it('renders raw value when country code not found', () => {
    const { container } = render(<Country value="UNKNOWN" />);
    const wrapper = container.querySelector('.frui-view-country');
    expect(wrapper).toHaveTextContent('UNKNOWN');
  });
  it('renders France flag and name correctly', () => {
    const { container } = render(<Country value="FRA" />);
    const wrapper = container.querySelector('.frui-view-country')!;
    expect(
      wrapper.querySelector('.frui-view-country-flag')
    ).toHaveTextContent('🇫🇷');
    expect(
      wrapper.querySelector('.frui-view-country-text')
    ).toHaveTextContent('France');
  });
});