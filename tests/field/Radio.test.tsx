//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, MouseEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
//frui
import Radio, { useRadio } from '../../frui/src/field/Radio.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseRadio(
  config: Parameters<typeof useRadio>[ 0 ]
) {
  let hookResult: ReturnType<typeof useRadio> | undefined;
  function TestHook() {
    hookResult = useRadio(config);
    return <div data-testid="radio-hook" />;
  }
  const { rerender } = render(<TestHook />);
  return {
    getHook: () => hookResult!,
    rerender: () => rerender(<TestHook />)
  };
}

//--------------------------------------------------------------------//
// Tests

describe('useRadio Hook', () => {
  it('initializes with defaultChecked value', () => {
    const { getHook } = renderHookWithUseRadio({
      defaultChecked: true
    });
    const hook = getHook();
    expect(hook.isChecked).toBe(true);
  });

  it('initializes with false when no default', () => {
    const { getHook } = renderHookWithUseRadio({});
    const hook = getHook();
    expect(hook.isChecked).toBe(false);
  });

  it('updates isChecked state when change handler is called', () => {
    const { getHook, rerender } = renderHookWithUseRadio({});
    let hook = getHook();

    const event = {
      target: { checked: true }
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.change(event);
    });

    rerender();
    hook = getHook();
    expect(hook.isChecked).toBe(true);
  });

  it('triggers onChange and onUpdate', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { getHook } = renderHookWithUseRadio(
      { onChange, onUpdate }
    );
    const hook = getHook();

    const event = {
      target: {
        checked: true,
        value: 'test-value'
      }
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.change(event);
    });

    expect(onChange).toHaveBeenCalledWith(event);
    expect(onUpdate).toHaveBeenCalledWith('test-value', true);
  });

  it('sets and clears hover state', () => {
    const { getHook, rerender } = renderHookWithUseRadio({});
    let hook = getHook();

    const mouseEvent = {} as MouseEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.over(mouseEvent);
    });

    rerender();
    hook = getHook();
    expect(hook.isHovering).toBe(true);

    act(() => {
      hook.handlers.out(mouseEvent);
    });

    rerender();
    hook = getHook();
    expect(hook.isHovering).toBe(false);
  });
});

describe('<Radio /> Component', () => {
  it('renders radio input and label', () => {
    render(<Radio label="Test Radio" />);
    const input = screen.getByRole('radio');
    const label = screen.getByText('Test Radio');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Radio className="custom-class" />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('custom-class');
  });

  it('shows as checked when defaultChecked is true', () => {
    render(<Radio defaultChecked />);
    const input = screen.getByRole('radio') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('shows as checked when checked prop is true', () => {
    render(<Radio checked />);
    const input = screen.getByRole('radio') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('applies error styling', () => {
    render(<Radio error />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-tx-error');
  });

  it('applies rounded styling', () => {
    render(<Radio rounded />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-rounded');
  });

  it('applies check styling', () => {
    render(<Radio check />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-check');
  });

  it('applies square styling', () => {
    render(<Radio square />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-square');
  });

  it('applies circle styling by default', () => {
    render(<Radio />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-circle');
  });

  it('applies blue styling', () => {
    render(<Radio blue />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-blue');
  });

  it('applies orange styling', () => {
    render(<Radio orange />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-orange');
  });

  it('applies default styling by default', () => {
    render(<Radio />);
    const radioElement = screen.getByRole('radio').closest('label');
    expect(radioElement).toHaveClass('frui-field-option-default');
  });

  it('calls onChange when radio is clicked', () => {
    const onChange = vi.fn();
    render(<Radio onChange={onChange} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onUpdate when radio is clicked', () => {
    const onUpdate = vi.fn();
    render(<Radio onUpdate={onUpdate} />);
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onUpdate).toHaveBeenCalled();
  });
});