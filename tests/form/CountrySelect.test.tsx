//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';

import {
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
//frui
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
    dropdown?: { className?: string, style?: unknown },
    onUpdate?: (value: string | string[]) => void,
    placeholder?: string
  }) => (
    <div
      className={className}
      data-dropdown-class={dropdown?.className}
      data-placeholder={placeholder}
      data-testid="mock-select"
    >
      <button
        data-testid="trigger-single"
        onClick={() => onUpdate?.('US')}
      >
        Select Single
      </button>
      <button
        data-testid="trigger-multi"
        onClick={() => onUpdate?.([ 'US', 'FR' ])}
      >
        Select Multi
      </button>
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
    <div data-testid={`option-${value}`}>{children}</div>
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
    },
    {
      type: 'country',
      iso2: 'DE',
      iso3: 'DEU',
      name: 'Germany',
      flag: '🇩🇪',
      ne: [ 0, 0 ],
      sw: [ 0, 0 ],
      cur: 'EUR',
      tel: '+49',
      lang: 'de',
      num: [ '005', '006' ]
    }
  ]
}));

vi.mock('../../src/helpers/getClassStyles.js', () => ({
  __esModule: true,
  default: (config: { classes: string[] }) => ({
    classes: config.classes,
    styles: {}
  })
}));

vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: (props: unknown) => props || {}
}));

//--------------------------------------------------------------------//
// Tests

describe('CountrySelect', () => {
  it('renders with default props', () => {
    render(<CountrySelect />);
    expect(screen.getByTestId('mock-select')).toBeInTheDocument();
  });

  it('applies base className', () => {
    render(<CountrySelect />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveClass('frui-form-country-select');
  });

  it('applies custom className', () => {
    render(<CountrySelect className="custom" />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveClass('custom');
  });

  it('uses default placeholder', () => {
    render(<CountrySelect />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveAttribute(
      'data-placeholder',
      'Select a country'
    );
  });

  it('uses custom placeholder', () => {
    render(<CountrySelect placeholder="Pick one" />);
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveAttribute('data-placeholder', 'Pick one');
  });

  it('renders all country options', () => {
    render(<CountrySelect />);
    expect(screen.getByTestId('option-US')).toBeInTheDocument();
    expect(screen.getByTestId('option-FR')).toBeInTheDocument();
    expect(screen.getByTestId('option-DE')).toBeInTheDocument();
  });

  it('renders country options with flag and name', () => {
    render(<CountrySelect />);
    expect(
      screen.getByTestId('option-US')
    ).toHaveTextContent('🇺🇸 United States');
    expect(
      screen.getByTestId('option-FR')
    ).toHaveTextContent('🇫🇷 France');
  });

  it('does not render search when searchable is false', () => {
    render(<CountrySelect />);
    expect(screen.queryByTestId('select-head')).not.toBeInTheDocument();
  });

  it('renders search input when searchable is true', () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    expect(head).toBeInTheDocument();
    const input = head.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('renders custom search placeholder', () => {
    render(<CountrySelect searchable="Find country..." />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input');
    expect(input).toHaveAttribute(
      'placeholder',
      'Find country...'
    );
  });

  it('renders search icon when searchable', () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    expect(head).toHaveTextContent('🔍');
  });

  it('filters countries by name', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'france' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-FR')).toBeInTheDocument();
      expect(
        screen.queryByTestId('option-US')
      ).not.toBeInTheDocument();
    });
  });

  it('filters countries by iso2 code', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'us' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-US')).toBeInTheDocument();
      expect(
        screen.queryByTestId('option-FR')
      ).not.toBeInTheDocument();
    });
  });

  it('filters countries by iso3 code', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'deu' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-DE')).toBeInTheDocument();
      expect(
        screen.queryByTestId('option-US')
      ).not.toBeInTheDocument();
    });
  });

  it('filters countries by currency', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'eur' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-FR')).toBeInTheDocument();
      expect(screen.getByTestId('option-DE')).toBeInTheDocument();
      expect(
        screen.queryByTestId('option-US')
      ).not.toBeInTheDocument();
    });
  });

  it('filters countries by language', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'de' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-DE')).toBeInTheDocument();
    });
  });

  it('filters countries by telephone code', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '+33' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-FR')).toBeInTheDocument();
      expect(
        screen.queryByTestId('option-US')
      ).not.toBeInTheDocument();
    });
  });

  it('shows all countries when search is cleared', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'france' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(
        screen.queryByTestId('option-US')
      ).not.toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-US')).toBeInTheDocument();
      expect(screen.getByTestId('option-FR')).toBeInTheDocument();
    });
  });

  it('calls onUpdate with single country data', () => {
    const onUpdate = vi.fn();
    render(<CountrySelect onUpdate={onUpdate} />);

    fireEvent.click(screen.getByTestId('trigger-single'));

    expect(onUpdate).toHaveBeenCalledWith({
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
    });
  });

  it('calls onUpdate with multiple country data', () => {
    const onUpdate = vi.fn();
    render(<CountrySelect onUpdate={onUpdate} />);

    fireEvent.click(screen.getByTestId('trigger-multi'));

    expect(onUpdate).toHaveBeenCalledWith([
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
    ]);
  });

  it('does not pass onUpdate when not provided', () => {
    render(<CountrySelect />);
    expect(screen.getByTestId('mock-select')).toBeInTheDocument();
  });

  it('applies dropdown className from props', () => {
    render(
      <CountrySelect dropdown={{ className: 'custom-dropdown' }} />
    );
    const select = screen.getByTestId('mock-select');
    expect(select).toHaveAttribute(
      'data-dropdown-class',
      'frui-form-country-select-dropdown'
    );
  });

  it('exports countries data', () => {
    expect(CountrySelect.countries).toBeDefined();
    expect(Array.isArray(CountrySelect.countries)).toBe(true);
    expect(CountrySelect.countries.length).toBeGreaterThan(0);
  });

  it('handles case-insensitive search', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'FRANCE' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-FR')).toBeInTheDocument();
    });
  });

  it('trims whitespace in search', async () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '  france  ' } });
    fireEvent.keyUp(input);

    await waitFor(() => {
      expect(screen.getByTestId('option-FR')).toBeInTheDocument();
    });
  });

  it('updates keyword state on input change', () => {
    render(<CountrySelect searchable />);
    const head = screen.getByTestId('select-head');
    const input = head.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });
});