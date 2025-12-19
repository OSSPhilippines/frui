//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
//frui
import Datetime, { useDatetime } from '../../frui/src/field/Datetime.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', async () => {
  const actual = await vi.importActual('../../frui/src/field/Input.js');
  return {
    ...actual,
    default: ({
      type,
      defaultValue,
      className,
      onUpdate,
      ...rest
    }: any) => (
      <input
        className={className}
        defaultValue={defaultValue}
        onChange={(e: any) => onUpdate && onUpdate(e.target.value)}
        type={type}
        {...rest}
      />
    )
  };
});

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseDatetime(
  config: Parameters<typeof useDatetime>[ 0 ]
) {
  let hookResult: ReturnType<typeof useDatetime> | undefined;
  function TestHook() {
    hookResult = useDatetime(config);
    return <div />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useDatetime Hook', () => {
  it('converts defaultValue to datetime-local format', () => {
    const getHook = renderHookWithUseDatetime({
      defaultValue: '2023-01-01T10:30:00Z'
    });
    const hook = getHook();
    expect(hook.value).toBe('2023-01-01T10:30:00.000');
  });
  it('returns undefined for invalid defaultValue', () => {
    const getHook = renderHookWithUseDatetime({
      defaultValue: 'invalid-date'
    });
    const hook = getHook();
    expect(hook.value).toBeUndefined();
  });
  it('returns undefined when no defaultValue provided', () => {
    const getHook = renderHookWithUseDatetime({});
    const hook = getHook();
    expect(hook.value).toBeUndefined();
  });
});

describe('<Datetime />', () => {
  it('renders input with datetime-local type', () => {
    const { container } = render(<Datetime />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'datetime-local');
  });
  it('applies custom className', () => {
    const { container } = render(
      <Datetime className="custom-class" />
    );
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });
  it('passes converted defaultValue to input', () => {
    const { container } = render(
      <Datetime defaultValue="2023-01-01T10:30:00Z" />
    );
    const input = container.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input).toHaveValue('2023-01-01T10:30');
  });
  it('calls onUpdate when datetime changes', () => {
    const onUpdate = vi.fn();
    const { container } = render(
      <Datetime onUpdate={onUpdate} />
    );
    const input = container.querySelector('input');
    fireEvent.change(
      input!, { target: { value: '2023-01-01T10:30' } }
    );
    expect(onUpdate).toHaveBeenCalled();
  });
});