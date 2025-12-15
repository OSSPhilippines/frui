//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import DatetimeInput, {
  toDatetimeInputString,
  toDatetimeString
} from '../../src/form/DatetimeInput.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate,
    type,
    value
  }: {
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    value?: string
  }) => (
    <input
      className={className}
      data-testid="mock-input"
      onChange={onUpdate}
      type={type}
      value={value || ''}
    />
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('<DatetimeInput />', () => {
  it('applies custom className if provided', () => {
    render(<DatetimeInput className="custom-dt" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveClass(
      'frui-form-datetime-input',
      'custom-dt'
    );
  });

  it('calls onUpdate when user changes the datetime', () => {
    const onUpdate = vi.fn();
    render(<DatetimeInput onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input');
    fireEvent.change(input, {
      target: { value: '2024-06-01T12:00' }
    });
    expect(onUpdate).toHaveBeenCalled();
    expect(onUpdate.mock.calls[ 0 ][ 0 ]).toBeInstanceOf(Date);
  });

  it('renders main datetime-local input and hidden input', () => {
    const { container } = render(
      <DatetimeInput name="schedule" />
    );
    const input = screen.getByTestId('mock-input');
    const hidden = container.querySelector(
      'input[ type="hidden" ]'
    );
    expect(input).toHaveAttribute('type', 'datetime-local');
    expect(input).toHaveClass('frui-form-datetime-input');
    expect(hidden).toHaveAttribute('name', 'schedule');
    expect(hidden).toHaveAttribute('type', 'hidden');
  });

  it('renders with provided defaultValue', () => {
    render(<DatetimeInput defaultValue="2024-07-15T09:45" />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('2024-07-15T09:45');
  });

  it('updates when controlled value prop changes', () => {
    const { rerender } = render(
      <DatetimeInput value="2024-05-10T14:00" />
    );
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('2024-05-10T14:00');
    rerender(<DatetimeInput value="2024-08-20T18:30" />);
    expect(input.value).toBe('2024-08-20T18:30');
  });
});

describe('Datetime helper functions', () => {
  it('formats dates correctly with toDatetimeInputString()', () => {
    const d = new Date('2024-03-10T08:30:00');
    expect(toDatetimeInputString(d)).toBe('2024-03-10T08:30');
  });

  it('formats dates correctly with toDatetimeString()', () => {
    const d = new Date('2024-03-10T08:30:00');
    expect(toDatetimeString(d)).toBe('2024-03-10 08:30:00');
  });

  it('returns undefined for invalid date', () => {
    expect(toDatetimeString(new Date('invalid'))).toBeUndefined();
    expect(
      toDatetimeInputString(new Date('invalid'))
    ).toBeUndefined();
  });
});