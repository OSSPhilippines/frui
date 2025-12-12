//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import DateInput, {
  toDate,
  toDateString,
  useDateInput
} from '../../src/form/DateInput.js';
import { ChangeEvent } from 'react';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    accept,
    className,
    onUpdate,
    type
  }: {
    accept?: string,
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
  }) => (
    <input
      accept={accept}
      className={className}
      data-testid="mock-input"
      onChange={onUpdate}
      type={type}
    />
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('toDate()', () => {
  it('returns undefined for empty input', () => {
    expect(toDate()).toBeUndefined();
    expect(toDate('')).toBeUndefined();
  });

  it('returns same Date object when Date is passed', () => {
    const date = new Date('2024-01-15');
    expect(toDate(date)).toBe(date);
  });

  it('converts string to Date object', () => {
    const result = toDate('2024-01-15');
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2024);
    expect(result?.getMonth()).toBe(0);
    expect(result?.getDate()).toBe(15);
  });

  it('converts timestamp number to Date object', () => {
    const timestamp = new Date('2024-06-20').getTime();
    const result = toDate(timestamp);
    expect(result).toBeInstanceOf(Date);
    expect(result?.getFullYear()).toBe(2024);
  });
});

describe('toDateString()', () => {
  it('returns undefined for undefined input', () => {
    expect(toDateString(undefined)).toBeUndefined();
  });

  it('returns undefined for invalid Date', () => {
    expect(toDateString(new Date('invalid'))).toBeUndefined();
  });

  it('formats Date as YYYY-MM-DD string', () => {
    const date = new Date(2024, 0, 15);
    expect(toDateString(date)).toBe('2024-01-15');
  });

  it('pads single digit month and day with zeros', () => {
    const date = new Date(2024, 4, 5);
    expect(toDateString(date)).toBe('2024-05-05');
  });
});

describe('<DateInput />', () => {
  it('renders with default class name', () => {
    render(<DateInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('frui-form-date-input');
  });

  it('applies custom className', () => {
    render(<DateInput className="custom-class" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveClass('frui-form-date-input');
    expect(input).toHaveClass('custom-class');
  });

  it('renders with type date', () => {
    render(<DateInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('type', 'date');
  });

  it('displays formatted date from defaultValue', () => {
    render(<DateInput defaultValue="2024-03-15" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveValue('2024-03-15');
  });

  it('calls onUpdate when date changes', () => {
    const onUpdate = vi.fn();
    render(<DateInput onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input');
    fireEvent.change(input, { target: { value: '2024-06-20' } });
    expect(onUpdate).toHaveBeenCalledWith(expect.any(Date));
  });

  it('displays controlled value correctly', () => {
    render(<DateInput value="2024-12-25" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveValue('2024-12-25');
  });
});

describe('useDateInput()', () => {
  it('initializes with defaultValue', () => {
    const { result } = renderHook(() =>
      useDateInput({ defaultValue: '2024-01-15' })
    );
    expect(result.current.date).toBeInstanceOf(Date);
    expect(result.current.handlers.toString()).toBe('2024-01-15');
  });

  it('returns undefined toString when no date set', () => {
    const { result } = renderHook(() => useDateInput({}));
    expect(result.current.handlers.toString()).toBeUndefined();
  });

  it('calls onUpdate when update handler is called', () => {
    const onUpdate = vi.fn();
    const { result } = renderHook(() => useDateInput({ onUpdate }));
    act(() => {
      result.current.handlers.update('2024-05-10');
    });
    expect(onUpdate).toHaveBeenCalledWith(expect.any(Date));
  });

  it('updates internal state when value prop changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDateInput({ value }),
      {
        initialProps: {
          value: '2024-01-01' as string | undefined
        }
      }
    );
    expect(result.current.handlers.toString()).toBe('2024-01-01');
    rerender({ value: '2024-06-15' });
    expect(result.current.handlers.toString()).toBe('2024-06-15');
  });

  it('does not override existing value when value prop is undefined', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDateInput({
        defaultValue: '2024-03-01',
        value
      }),
      {
        initialProps: {
          value: undefined as string | undefined
        }
      }
    );
    expect(result.current.handlers.toString()).toBe('2024-03-01');
    rerender({ value: undefined });
    expect(result.current.handlers.toString()).toBe('2024-03-01');
  });
});