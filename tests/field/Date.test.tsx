//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
//frui
import DateField, { useDate } from '../../frui/src/field/Date.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseDate(
  config: Parameters<typeof useDate>[ 0 ]
) {
  let hookResult: ReturnType<typeof useDate> | undefined;
  function TestHook() {
    hookResult = useDate(config);
    return <div data-testid="hook" />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useDate Hook', () => {
  it('triggers onUpdate with ISO date', () => {
    const onUpdate = vi.fn();
    const getHook = renderHookWithUseDate({ onUpdate });
    const hook = getHook();
    hook('2023-01-01');
    expect(onUpdate).toHaveBeenCalledWith(
      expect.stringMatching(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
      )
    );
  });
  it('does not call onUpdate when no value is provided', () => {
    const onUpdate = vi.fn();
    const getHook = renderHookWithUseDate({ onUpdate });
    const hook = getHook();
    hook('');
    expect(onUpdate).not.toHaveBeenCalled();
  });
});

describe('<DateField />', () => {
  it('renders input with date type', () => {
    const { container } = render(<DateField />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'date');
  });
  it('applies custom className', () => {
    const { container } = render(
      <DateField className="custom-class" />
    );
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });
  it('converts defaultValue to ISO date string', () => {
    const { container } = render(
      <DateField defaultValue="2023-01-01T10:00:00Z" />
    );
    const input = container.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input).toHaveValue('2023-01-01');
  });
  it('calls onUpdate when date changes', () => {
    const onUpdate = vi.fn();
    const { container } = render(<DateField onUpdate={onUpdate} />);
    const input = container.querySelector('input');
    fireEvent.change(input!, { target: { value: '2023-01-01' } });
    expect(onUpdate).toHaveBeenCalledWith(
      expect.stringMatching(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
      )
    );
  });
});