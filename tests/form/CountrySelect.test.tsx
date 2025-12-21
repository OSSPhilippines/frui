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
import { describe, expect, it, vi } from 'vitest';
//frui
import type { CountryData } from '../../src/form/CountrySelect.js';
import CountrySelect from '../../src/form/CountrySelect.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Select.js', () => {
  const SelectMock = ({
    children,
    className,
    dropdown,
    onUpdate,
    placeholder
  }: {
    children?: ReactNode,
    className?: string,
    dropdown?: Record<string, unknown>,
    onUpdate?: (value: string | string[]) => void,
    placeholder?: string
  }) => (
    <div
      className={className}
      data-dropdown={JSON.stringify(dropdown)}
      data-on-update={onUpdate ? 'true' : 'false'}
      data-placeholder={placeholder}
      data-testid="mock-select"
    >
      {children}
    </div>
  );

  SelectMock.Head = ({ children }: { children?: ReactNode }) => (
    <div data-testid="select-head">{children}</div>
  );

  SelectMock.Option = ({
    children,
    value
  }: {
    children?: ReactNode,
    value?: string
  }) => (
    <div data-testid={`select-option-${value}`}>{children}</div>
  );

  return {
    __esModule: true,
    default: Object.assign(SelectMock, {
      Head: SelectMock.Head,
      Option: SelectMock.Option
    })
  };
});

vi.mock('../../src/data/countries.js', () => ({
  __esModule: true,
  default: [
    {
      type: 'country',
      iso2: 'US',
      iso3: 'USA',
      name: 'United States',
      flag: '🇺🇸',
      ne: [ 0, 0 ],
      sw: [ 0, 0 ],
      cur: 'USD',
      tel: '+1',
      lang: 'en',
      num: [ '001', '002' ]
    },
    {
      type: 'country',
      iso2: 'FR',
      iso3: 'FRA',
      name: 'France',
      flag: '🇫🇷',
      ne: [ 0, 0 ],
      sw: [ 0, 0 ],
      cur: 'EUR',
      tel: '+33',
      lang: 'fr',
      num: [ '003', '004' ]
    }
  ]
}));

vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: (config: Record<string, unknown>) => ({
    classes: (config.classes as string[]) || [],
    styles: {}
  })
}));

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => props
}));

//--------------------------------------------------------------------//
// Helpers

const mockCountries: CountryData[] = [
  {
    type: 'country',
    iso2: 'US',
    iso3: 'USA',
    name: 'United States',
    flag: '🇺🇸',
    ne: [ 0, 0 ],
    sw: [ 0, 0 ],
    cur: 'USD',
    tel: '+1',
    lang: 'en',
    num: [ '001', '002' ]
  },
  {
    type: 'country',
    iso2: 'FR',
    iso3: 'FRA',
    name: 'France',
    flag: '🇫🇷',
    ne: [ 0, 0 ],
    sw: [ 0, 0 ],
    cur: 'EUR',
    tel: '+33',
    lang: 'fr',
    num: [ '003', '004' ]
  }
];

//--------------------------------------------------------------------//
// Tests

describe('<CountrySelect />', () => {
  it('renders component with default props', () => {
    render(<CountrySelect />);
    const select = screen.getByTestId('mock-select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveClass('frui-form-country-select');
  });

  it('applies additional className', () => {
    render(<CountrySelect className="extra-class" />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveClass('extra-class');
  });

  it('renders placeholder when provided', () => {
    render(<CountrySelect placeholder="Pick a country" />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveAttribute(
      'data-placeholder',
      'Pick a country'
    );
  });

  it('renders all options from countries list', () => {
    render(<CountrySelect />);
    const usOption = screen.getByTestId('select-option-US');
    const frOption = screen.getByTestId('select-option-FR');
    expect(usOption).toHaveTextContent('🇺🇸 United States');
    expect(frOption).toHaveTextContent('🇫🇷 France');
  });

  it('renders all mock countries', () => {
    render(<CountrySelect />);
    mockCountries.forEach(country => {
      const option = screen.getByTestId(
        `select-option-${country.iso2}`
      );
      expect(option).toHaveTextContent(country.name);
    });
  });

  it('renders search input when searchable is true', () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    expect(head).toBeInTheDocument();
    expect(head.querySelector('input')).toHaveAttribute(
      'placeholder',
      'Search...'
    );
  });

  it(
    'renders custom search placeholder when string provided',
    () => {
      render(<CountrySelect searchable="Lookup..." />);
      const head = screen.getByTestId('select-head');
      const input = head.querySelector('input');
      expect(input).toHaveAttribute('placeholder', 'Lookup...');
    }
  );

  it('filters countries on search input', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;
    fireEvent.keyUp(input, { target: { value: 'france' } });
    await waitFor(() => {
      const frOption = screen.queryByTestId('select-option-FR');
      expect(frOption).toBeInTheDocument();
    });
  });

  it('exports countries on default export', () => {
    expect(CountrySelect.countries).toBeDefined();
    expect(Array.isArray(CountrySelect.countries)).toBe(true);
  });

  it('renders dropdown with computed classes', () => {
    render(
      <CountrySelect dropdown={{ className: 'custom-dropdown' }} />
    );
    const select = screen.getByTestId('mock-select');
    const dropdown = select.getAttribute('data-dropdown');
    expect(dropdown).toContain('className');
  });

  it('renders search icon when searchable enabled', () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    expect(head).toHaveTextContent('🔍');
  });

  it('passes onUpdate handler to Select component', () => {
    const onUpdate = vi.fn();
    render(<CountrySelect onUpdate={onUpdate} />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveAttribute('data-on-update', 'true');
  });
});