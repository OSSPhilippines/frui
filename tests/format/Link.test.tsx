//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Link from '../../frui/src/format/Link.js';

//--------------------------------------------------------------------//
// Helpers

const defaultUrl = 'https://example.com';

//--------------------------------------------------------------------//
// Tests

describe('Link component', () => {
  it('renders an <a> element with correct href attribute', () => {
    render(<Link value={defaultUrl} />);
    const link = screen.getByRole('link', { name: defaultUrl });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', defaultUrl);
  });

  it('shows label if provided', () => {
    const labelText = 'Example Site';
    render(<Link value={defaultUrl} label={labelText} />);
    const link = screen.getByRole('link', { name: labelText });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent(labelText);
    expect(link).toHaveAttribute('href', defaultUrl);
  });

  it('falls back to showing URL when label is empty string', () => {
    render(<Link value={defaultUrl} label="" />);
    const link = screen.getByRole('link', { name: defaultUrl });
    expect(link).toHaveTextContent(defaultUrl);
  });

  it('forwards additional attributes correctly', () => {
    render(
      <Link
        value={defaultUrl}
        label="External"
        rel="noopener noreferrer"
        target="_blank"
      />
    );
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('applies className and style props', () => {
    render(
      <Link
        value={defaultUrl}
        label="Styled Link"
        className="custom-link"
        style={{ color: 'red' }}
      />
    );
    const link = screen.getByRole('link', { name: 'Styled Link' });
    expect(link).toHaveClass('custom-link');
    expect(link).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('matches snapshot for default link', () => {
    const { container } = render(<Link value={defaultUrl} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for link with label and attributes', () => {
    const { container } = render(
      <Link
        value={defaultUrl}
        label="Example Link"
        className="nav-link"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});