//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Phone from '../../frui/src/format/Phone.js';
import { LinkProps } from '../../frui/src/format/Link.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/format/Link.js', () => ({
  __esModule: true,
  default: ({
    value,
    label,
    ...rest
  }: LinkProps) => (
    <a data-testid="mock-link" href={value} {...rest}>
      {label}
    </a>
  )
}));

//--------------------------------------------------------------------//
// Helpers

const defaultPhone = '+1234567890';

//--------------------------------------------------------------------//
// Tests

describe('<Phone /> Component', () => {
  it('renders Link with tel: URL', () => {
    render(<Phone value={defaultPhone} />);
    const link = screen.getByTestId('mock-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `tel:${defaultPhone}`);
    expect(link).toHaveTextContent(defaultPhone);
  });
  it('uses telephone URI for various dial formats', () => {
    render(<Phone value="(555) 123-4567" />);
    const link = screen.getByTestId('mock-link');
    expect(link).toHaveAttribute('href', 'tel:(555) 123-4567');
  });
  it('passes custom className and style to Link', () => {
    render(
      <Phone
        value={defaultPhone}
        className="phone-link"
        style={{ color: 'red' }}
      />
    );
    const link = screen.getByTestId('mock-link');
    expect(link).toHaveClass('phone-link');
    expect(link).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
  it('forwards additional attributes like title', () => {
    render(
      <Phone
        value={defaultPhone}
        title="Call now"
      />
    );
    const link = screen.getByTestId('mock-link');
    expect(link).toHaveAttribute('title', 'Call now');
  });
  it('matches snapshot for default render', () => {
    const { container } = render(<Phone value={defaultPhone} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('matches snapshot with extra attributes', () => {
    const { container } = render(
      <Phone
        value={defaultPhone}
        className="styled-phone"
        title="Call now"
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});