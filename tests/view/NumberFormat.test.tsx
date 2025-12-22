//--------------------------------------------------------------------//
// Imports

//frui
import NumberFormat, { 
  formatNumber 
} from '../../src/view/NumberFormat.js';
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

describe('formatNumber()', () => {
  it('formats number with default behavior', () => {
    const result = formatNumber(1234.567, '', '.', undefined, false);

    expect(Number(result)).toBeCloseTo(1234.567, 3);
  });

  it('formats number with a thousands separator', () => {
    const result = formatNumber(1000000, ',', '.', 0, false);

    expect(result).toBe('1,000,000');
  });

  it('formats number with a custom decimal symbol', () => {
    const result = formatNumber(12.5, '.', ',', 1, false);

    expect(result).toBe('12,5');
  });

  it('rounds or trims decimals based on the decimals prop', () => {
    const rounded = formatNumber(1.2345, ',', '.', 2, false);

    expect(rounded).toBe('1.23');
  });

  it('returns absolute value when absolute is true', () => {
    const result = formatNumber(-42.5, ',', '.', 1, true);

    expect(result).toBe('42.5');
  });

  it('keeps the negative sign when absolute is false', () => {
    const result = formatNumber(-42.5, ',', '.', 1, false);

    expect(result).toBe('-42.5');
  });
});

describe('<NumberFormat />', () => {
  it('renders formatted number with default settings', () => {
    render(<NumberFormat value={1234.5} />);

    expect(screen.getByText('1234.5')).toBeInTheDocument();
  });

  it('renders formatted number with a custom separator', () => {
    render(
      <NumberFormat
        value={1000000}
        separator=","
        decimals={0}
      />
    );

    expect(screen.getByText('1,000,000')).toBeInTheDocument();
  });

  it('renders formatted number with a custom decimal symbol', () => {
    render(
      <NumberFormat
        value={12.5}
        decimal=","
        decimals={1}
      />
    );

    expect(screen.getByText('12,5')).toBeInTheDocument();
  });

  it('renders absolute value correctly', () => {
    render(
      <NumberFormat
        value={-100.5}
        absolute
        decimals={1}
      />
    );

    expect(screen.getByText('100.5')).toBeInTheDocument();
  });

  it('renders negative number when absolute is false', () => {
    render(<NumberFormat value={-100.5} decimals={1} />);

    expect(screen.getByText('-100.5')).toBeInTheDocument();
  });
});