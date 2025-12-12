//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import CurrencySelect from '../../src/form/CurrencySelect.js';

//--------------------------------------------------------------------//
// Mocks

let capturedOnUpdate: ((value: string | string[]) => void) | undefined;

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
    { cur: 'USD', flag: '🇺🇸', iso3: 'USA' },
    { cur: 'EUR', flag: '🇫🇷', iso3: 'FRA' }
  ]
}));

vi.mock('../../src/helpers/getClassStyles.ts', () => ({
  __esModule: true,
  default: ({ classes }: { classes?: string[] }) => ({
    classes: classes || [],
    styles: {}
  })
}));

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: () => ({})
}));

vi.mock('../../src/form/Select.js', () => {
  const SelectMock = (props: {
    children?: ReactNode,
    className?: string,
    onUpdate?: (value: string | string[]) => void,
    placeholder?: string
  }) => {
    capturedOnUpdate = props.onUpdate;
    return (
      <div className={props.className} data-testid="select">
        <div data-testid="placeholder">{props.placeholder}</div>
        {props.children}
      </div>
    );
  };

  SelectMock.Head = ({ children }: { children?: ReactNode }) => (
    <div data-testid="dropdown-head">{children}</div>
  );

  SelectMock.Option = ({
    children,
    value
  }: {
    children?: ReactNode,
    value?: string
  }) => (
    <div data-testid="option" data-value={value}>
      {children}
    </div>
  );

  return {
    __esModule: true,
    default: SelectMock,
    Select: SelectMock,
    SelectDropdownHead: SelectMock.Head,
    SelectOption: SelectMock.Option
  };
});

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
  });

  it('renders a searchable input with correct placeholder text', () => {
    render(<CurrencySelect searchable="Search currency" />);
    expect(screen.getByTestId('dropdown-head')).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText('Search currency');
    expect(searchInput).toBeInTheDocument();
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
        symbol: '€'
      })
    );
  });

  it('calls onUpdate with multiple currencies when array selected', () => {
    const onUpdate = vi.fn();
    render(<CurrencySelect onUpdate={onUpdate} />);
    capturedOnUpdate && capturedOnUpdate([ 'USD', 'EUR' ]);
    expect(onUpdate).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ code: 'USD' }),
        expect.objectContaining({ code: 'EUR' })
      ])
    );
  });
});