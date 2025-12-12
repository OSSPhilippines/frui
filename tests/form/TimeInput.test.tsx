//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
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
import {
  TimeInput,
  toDate,
  toTimeInputString,
  toTimeString
} from '../../src/form/TimeInput.js';

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

describe('Time helper functions', () => {
  it('converts various input types correctly', () => {
    const d = new Date('2024-01-01T12:30:00');
    expect(toDate(d)).toEqual(d);
    expect(toDate('12:45')?.getHours()).toBe(12);
    expect(toDate(1700000000000)?.getTime()).toBe(1700000000000);
    expect(toDate(undefined)).toBeUndefined();
  });

  it('formats valid Date to hh:mm:ss', () => {
    const d = new Date('2024-01-01T14:45:00');
    expect(toTimeString(d)).toBe('14:45:00');
  });

  it('returns undefined for invalid date in toTimeString', () => {
    expect(toTimeString(new Date('invalid'))).toBeUndefined();
  });

  it('formats valid Date to hh:mm for input string', () => {
    const d = new Date('2024-01-01T09:30:00');
    expect(toTimeInputString(d)).toBe('09:30');
  });

  it(
    'returns undefined for invalid date in toTimeInputString',
    () => {
      expect(
        toTimeInputString(new Date('invalid'))
      ).toBeUndefined();
    }
  );
});

describe('<TimeInput />', () => {
  it('renders with correct type and default class', () => {
    render(<TimeInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveAttribute('type', 'time');
    expect(input).toHaveClass('frui-form-input-time');
  });

  it('applies provided defaultValue', () => {
    render(<TimeInput defaultValue="13:45" />);
    const input = screen.getByTestId(
      'mock-input'
    ) as HTMLInputElement;
    expect(input.value).toBe('13:45');
  });

  it('calls onUpdate with Date object when changed', () => {
    const onUpdate = vi.fn();
    render(<TimeInput onUpdate={onUpdate} />);
    const input = screen.getByTestId('mock-input');
    fireEvent.change(input, { target: { value: '15:00' } });
    expect(onUpdate).toHaveBeenCalled();
    expect(onUpdate.mock.calls[ 0 ][ 0 ]).toBeInstanceOf(Date);
  });

  it(
    'updates internal value when controlled prop changes',
    async () => {
      const { rerender } = render(
        <TimeInput value="10:30" />
      );
      const input = screen.getByTestId(
        'mock-input'
      ) as HTMLInputElement;
      expect(input.value).toBe('10:30');
      rerender(<TimeInput value="16:45" />);
      await waitFor(() => expect(input.value).toBe('16:45'));
    }
  );

  it('merges custom className with existing ones', () => {
    render(<TimeInput className="custom-time" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveClass(
      'frui-form-input-time',
      'custom-time'
    );
  });
});