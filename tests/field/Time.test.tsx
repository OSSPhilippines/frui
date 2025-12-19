//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
//frui
import Time, { useTime } from '../../frui/src/field/Time.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseTime(
  config: Parameters<typeof useTime>[ 0 ]
) {
  let hookResult: ReturnType<typeof useTime> | undefined;
  function TestHook() {
    hookResult = useTime(config);
    return <div />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useTime Hook', () => {
  it('converts Date object to time string', () => {
    const date = new Date('2023-01-01T10:30:00Z');
    const getHook = renderHookWithUseTime({ defaultValue: date });
    const hook = getHook();
    expect(hook).toBe('10:30');
  });
  it('converts string date to time string', () => {
    const getHook = renderHookWithUseTime({
      defaultValue: '2023-01-01T15:45:30Z'
    });
    const hook = getHook();
    expect(hook).toBe('15:45');
  });
  it('converts timestamp to time string', () => {
    const timestamp = Date.UTC(2023, 0, 1, 8, 15, 0);
    const getHook = renderHookWithUseTime(
      { defaultValue: timestamp }
    );
    const hook = getHook();
    expect(hook).toBe('08:15');
  });
  it('returns undefined for invalid date', () => {
    const getHook = renderHookWithUseTime({
      defaultValue: 'invalid-date'
    });
    const hook = getHook();
    expect(hook).toBeUndefined();
  });
  it('returns undefined when no defaultValue provided', () => {
    const getHook = renderHookWithUseTime({});
    const hook = getHook();
    expect(hook).toBeUndefined();
  });
});

describe('<Time /> Component', () => {
  it('renders input with time type', () => {
    const { container } = render(<Time />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'time');
  });
  
  it('applies custom className', () => {
    const { container } = render(<Time className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });
  
  it('passes converted defaultValue to input', () => {
    const { container } = render(
      <Time defaultValue="2023-01-01T14:30:00Z" />
    );
    const input = 
      container.querySelector('input') as HTMLInputElement;
    expect(input).toHaveValue('14:30');
  });
  
  it('passes through other input attributes', () => {
    const { container } = render(
      <Time placeholder="Select time" name="time-field" />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Select time');
    expect(input).toHaveAttribute('name', 'time-field');
  });
  
  it('handles invalid defaultValue gracefully', () => {
    const { container } = render(
      <Time defaultValue="invalid-date" />
    );
    const input = 
      container.querySelector('input') as HTMLInputElement;
    expect(input).toHaveValue('');
  });
});