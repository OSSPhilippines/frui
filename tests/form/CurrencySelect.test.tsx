//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
//modules
import type { ReactNode } from 'react';
//frui
import CurrencySelect from '../../src/form/CurrencySelect.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/data/currencies.js', () => ({
  __esModule: true,
  default: [
    {
      code: 'USD',
      name: 'US Dollar',
      plural: 'US Dollars',
      symbol: '$',
      type: 'currency'
    },
    {
      code: 'EUR',
      name: 'Euro',
      plural: 'Euros',
      symbol: '€',
      type: 'currency'
    }
  ]
}));

vi.mock('../../src/data/countries.js', () => ({
  __esModule: true,
  default: [
    { iso3: 'USA', cur: 'USD', flag: '🇺🇸' },
    { iso3: 'FRA', cur: 'EUR', flag: '🇫🇷' }
  ]
}));

let capturedOnUpdate: ((value: string | string[]) => void) | undefined;

vi.mock('../../src/form/Select.js', () => ({
  __esModule: true,
  Select: (props: {
    children?: ReactNode
    className?: string
    onUpdate?: (value: string | string[]) => void
    placeholder?: string
  }) => {
    capturedOnUpdate = props.onUpdate;
    return (
      <div data-testid="select" className={props.className}>
        <div data-testid="placeholder">{props.placeholder}</div>
        {props.children}
      </div>
    );
  },
  SelectDropdownHead: ({ children }: { children?: ReactNode }) => (
    <div data-testid="dropdown-head">{children}</div>
  ),
  SelectOption: ({ children, value }: { 
    children?: ReactNode, 
    value?: string 
  }) => (
    <div data-testid="option" data-value={value}>
      {children}
    </div>
  ),
}))

//--------------------------------------------------------------------//
// Tests

describe('<CurrencySelect />', () => {
  it('renders with default placeholder and displays all currencies', () => {
    render(<CurrencySelect />);

    const wrapper = screen.getByTestId('select');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('frui-form-currency-select');

    expect(screen.getByText(/US Dollar/)).toBeInTheDocument();
    expect(screen.getByText(/Euro/)).toBeInTheDocument();

    expect(screen.getByTestId('placeholder')).toHaveTextContent(
      'Select a currency'
    );
  })

  it('renders a searchable input with correct placeholder text', () => {
    render(<CurrencySelect searchable="Search currency" />);
    expect(screen.getByTestId('dropdown-head')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search currency')
    ).toBeInTheDocument();
  });

  it('updates filtered list when typing into search field', async () => {
    render(<CurrencySelect searchable />);
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'Euro');
    fireEvent.keyUp(searchInput, { target: { value: 'Euro' } });

    await waitFor(() => {
      expect(searchInput).toHaveValue('Euro');
    });
  });

  it('calls onUpdate with a single currency when a code is selected', () => {
    const onUpdate = vi.fn();
    render(<CurrencySelect onUpdate={onUpdate} />);

    capturedOnUpdate && capturedOnUpdate('EUR');

    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
      })
    );
  });

  it('calls onUpdate with multiple currencies when array of codes selected', () => {
    const onUpdate = vi.fn();
    render(<CurrencySelect onUpdate={onUpdate} />);

    capturedOnUpdate && capturedOnUpdate(['USD', 'EUR']);

    expect(onUpdate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ code: 'USD' }),
        expect.objectContaining({ code: 'EUR' }),
      ])
    );
  });
});