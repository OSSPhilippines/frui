//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Input, { useInput } from '../../frui/src/field/Input.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseInput(
  config: Parameters<typeof useInput>[ 0 ]
) {
  let hookResult: ReturnType<typeof useInput> | undefined;
  function TestHook() {
    hookResult = useInput(config);
    return <div data-testid="hook" />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useInput Hook', () => {
  it('triggers onChange and onUpdate', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const getHook = renderHookWithUseInput({ onChange, onUpdate });
    const hook = getHook();
    const event = {
      target: { value: 'test value' }
    } as ChangeEvent<HTMLInputElement>;
    hook.handlers.change(event);
    expect(onChange).toHaveBeenCalledWith(event);
    expect(onUpdate).toHaveBeenCalledWith('test value');
  });

  it('handles missing onChange and onUpdate', () => {
    const getHook = renderHookWithUseInput({});
    const hook = getHook();
    const event = {
      target: { value: 'test value' }
    } as ChangeEvent<HTMLInputElement>;
    expect(() => hook.handlers.change(event)).not.toThrow();
  });
});

describe('<Input />', () => {
  it('renders input element', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('applies error styling', () => {
    render(<Input error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('frui-tx-error', 'frui-bd-error');
  });

  it('passes through HTML attributes', () => {
    render(<Input placeholder="Enter text" type="email" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('calls onChange and onUpdate when value changes', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    render(<Input onChange={onChange} onUpdate={onUpdate} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith('test');
  });

  it('forwards ref to input element', () => {
    const ref = vi.fn();
    render(<Input passRef={ref} />);
    const input = screen.getByRole('textbox');
    expect(ref).toHaveBeenCalledWith(input);
  });
});