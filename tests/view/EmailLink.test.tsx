//--------------------------------------------------------------------//
// Imports

//frui
import EmailLink from '../../src/view/EmailLink.js';
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

describe('<EmailLink />', () => {
  it('forwards className and other attributes', () => {
    render(
      <EmailLink
        className="custom"
        value="support@company.com"
      />
    );

    const link = screen.getByRole(
      'link', { name: 'support@company.com' }
    );
    expect(link).toHaveClass('custom');
  });

  it('renders correct mailto href', () => {
    render(<EmailLink value="user@example.com" />);
    const link = screen.getByRole(
      'link', { name: 'user@example.com' }
    );

    expect(link).toHaveAttribute(
      'href', 'mailto:user@example.com'
    );
  });

  it('renders email address as visible text', () => {
    render(<EmailLink value="contact@domain.com" />);
    const link = screen.getByRole(
      'link', { name: 'contact@domain.com' }
    );

    expect(link).toHaveAttribute(
      'href', 'mailto:contact@domain.com'
    );
  });
});