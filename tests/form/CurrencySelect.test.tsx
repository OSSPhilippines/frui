//--------------------------------------------------------------------//
// Imports

//frui
import CurrencySelect from '../../src/form/CurrencySelect.js';
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
  it('renders with default placeholder', () => {
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

  it('renders searchable input with placeholder', () => {
    render(
      <CurrencySelect searchable="Search currency" />
    );
    expect(
      screen.getByTestId('dropdown-head')
    ).toBeInTheDocument();
    const searchInput = 
      screen.getByPlaceholderText('Search currency');
    expect(searchInput).toBeInTheDocument();
  });

  it('filters list when typing in search', async () => {
    render(<CurrencySelect searchable />);
    const searchInput = screen.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'Euro');
    fireEvent.keyUp(searchInput, { target: { value: 'Euro' } });
    await waitFor(() => {
      expect(searchInput).toHaveValue('Euro');
    });
  });

  it('onUpdate with one currency', () => {
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

  it('onUpdate with multiple currencies', () => {
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