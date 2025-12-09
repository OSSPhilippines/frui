//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
//frui
import Link from '../../src/view/Link.js';

//--------------------------------------------------------------------//
// Tests

describe('<Link />', () => {
  it('renders an anchor element', () => {
    render(<Link value="https://example.com" />);
    const anchor = screen.getByRole('link');
    expect(anchor.tagName.toLowerCase()).toBe('a');
  });

  it('sets href attribute from value prop', () => {
    render(<Link value="https://example.com" />);
    const anchor = screen.getByRole('link');
    expect(anchor).toHaveAttribute('href', 'https://example.com');
  });

  it('renders provided label text', () => {
    render(<Link value="https://example.com" label="Visit Site" />);
    const anchor = screen.getByText('Visit Site');
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute('href', 'https://example.com');
  });

  it('renders value as fallback text when label is missing', () => {
    render(<Link value="https://fallback.com" />);
    const anchor = screen.getByText('https://fallback.com');
    expect(anchor).toBeInTheDocument();
  });

  it('forwards additional props such as className and target', () => {
    render(
      <Link
        value="https://company.com"
        label="Company"
        className="custom-class"
      />
    );
    const anchor = screen.getByRole('link');
    expect(anchor).toHaveClass('custom-class');
  });
});