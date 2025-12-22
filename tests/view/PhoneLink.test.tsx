//--------------------------------------------------------------------//
// Imports

//frui
import PhoneLink from '../../src/view/PhoneLink.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it
} from 'vitest';
import {
  render,
  screen
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Tests

describe('<PhoneLink />', () => {
  it('renders the phone number correctly', () => {
    render(<PhoneLink value="123-456-7890" />);

    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });

  it('passes the correct tel: value to Link', () => {
    render(<PhoneLink value="123-456-7890" />);
    const linkElement = screen.getByText('123-456-7890');

    expect(
      linkElement.closest('a')
    ).toHaveAttribute('href', 'tel:123-456-7890');
  });

  it('accepts additional attributes and passes them to Link', () => {
    render(
      <PhoneLink value="123-456-7890" className="phone-link" />
    );
    const linkElement = screen.getByText('123-456-7890');

    expect(linkElement.closest('a')).toHaveClass('phone-link');
  });

  it('renders different phone numbers correctly', () => {
    render(<PhoneLink value="+1 (800) 555-1212" />);

    expect(
      screen.getByText('+1 (800) 555-1212')
    ).toBeInTheDocument();
    expect(
      screen.getByText('+1 (800) 555-1212').closest('a')
    ).toHaveAttribute('href', 'tel:+1 (800) 555-1212');
  });
});