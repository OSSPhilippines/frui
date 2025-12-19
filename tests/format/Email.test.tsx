//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Email from '../../frui/src/format/Email.js';

//--------------------------------------------------------------------//
// Helpers

const defaultEmail = 'test@example.com';

//--------------------------------------------------------------------//
// Tests

describe('Email component', () => {
  it('renders an <a> element with mailto: href', () => {
    render(<Email value={defaultEmail} />);
    const link = screen.getByRole('link', { name: defaultEmail });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `mailto:${defaultEmail}`);
  });

  it('displays email address as link text', () => {
    render(<Email value={defaultEmail} />);
    const link = screen.getByRole('link', { name: defaultEmail });
    expect(link).toHaveTextContent(defaultEmail);
  });

  it('forwards additional attributes correctly', () => {
    render(
      <Email
        value={defaultEmail}
        rel="noopener noreferrer"
        target="_blank"
      />
    );
    const link = screen.getByRole('link', { name: defaultEmail });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies className prop', () => {
    render(<Email value={defaultEmail} className="email-link" />);
    const link = screen.getByRole('link', { name: defaultEmail });
    expect(link).toHaveClass('email-link');
  });

  it('applies style prop', () => {
    render(
      <Email
        value={defaultEmail}
        style={{ color: 'blue', textDecoration: 'underline' }}
      />
    );
    const link = screen.getByRole('link', { name: defaultEmail });
    expect(link).toHaveStyle({
      color: 'rgb(0, 0, 255)',
      textDecoration: 'underline'
    });
  });

  it('handles different email formats', () => {
    const emails = [
      'user@domain.com',
      'first.last@company.co.uk',
      'name+tag@example.org'
    ];

    emails.forEach(email => {
      const { unmount } = render(<Email value={email} />);
      const link = screen.getByRole('link', { name: email });
      expect(link).toHaveAttribute('href', `mailto:${email}`);
      expect(link).toHaveTextContent(email);
      unmount();
    });
  });

  it('matches snapshot for default email', () => {
    const { container } = render(<Email value={defaultEmail} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with className and style', () => {
    const { container } = render(
      <Email
        value={defaultEmail}
        className="custom-email"
        style={{ fontWeight: 'bold' }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});