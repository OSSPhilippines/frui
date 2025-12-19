//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, MouseEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

//frui
import Switch, { useSwitch } from '../../frui/src/field/Switch.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseSwitch(
  config: Parameters<typeof useSwitch>[ 0 ]
) {
  let hookResult: ReturnType<typeof useSwitch> | undefined;
  function TestHook() {
    hookResult = useSwitch(config);
    return <div data-testid="switch-hook" />;
  }
  const { rerender } = render(<TestHook />);
  return {
    getHook: () => hookResult!,
    rerender: () => rerender(<TestHook />)
  };
}

//--------------------------------------------------------------------//
// Tests

describe('useSwitch Hook', () => {
  it('initializes with defaultChecked value', () => {
    const { getHook } = renderHookWithUseSwitch({
      defaultChecked: true
    });
    const hook = getHook();
    expect(hook.isChecked).toBe(true);
  });

  it('initializes with false when no default', () => {
    const { getHook } = renderHookWithUseSwitch({});
    const hook = getHook();
    expect(hook.isChecked).toBe(false);
  });

  it('updates isChecked state when change handler is called', () => {
    const { getHook, rerender } = renderHookWithUseSwitch({});
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
    const { getHook } = 
      renderHookWithUseSwitch({ onChange, onUpdate });
      
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
    const { getHook, rerender } = renderHookWithUseSwitch({});
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

describe('<Switch /> Component', () => {
  it('renders checkbox input and label', () => {
    render(<Switch label="Test Switch" />);
    const input = screen.getByRole('checkbox');
    const label = screen.getByText('Test Switch');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('custom-class');
  });

  it('shows as checked when defaultChecked is true', () => {
    render(<Switch defaultChecked />);
    const input = 
      screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('shows as checked when checked prop is true', () => {
    render(<Switch checked />);
    const input = 
      screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('applies error styling', () => {
    render(<Switch error />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-tx-error');
  });

  it('applies rounded styling', () => {
    render(<Switch rounded />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-rounded');
  });

  it('applies onoff styling', () => {
    render(<Switch onoff />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-onoff');
  });

  it('applies yesno styling', () => {
    render(<Switch yesno />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-yesno');
  });

  it('applies sunmoon styling', () => {
    render(<Switch sunmoon />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-sunmoon');
  });

  it('applies checkex styling by default', () => {
    render(<Switch />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-checkex');
  });

  it('applies ridge styling', () => {
    render(<Switch ridge />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-ridge');
  });

  it('applies smooth styling by default', () => {
    render(<Switch />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-smooth');
  });

  it('applies blue styling', () => {
    render(<Switch blue />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-blue');
  });

  it('applies orange styling', () => {
    render(<Switch orange />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-orange');
  });

  it('applies green styling', () => {
    render(<Switch green />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-green');
  });

  it('applies default styling by default', () => {
    render(<Switch />);
    const switchElement = 
      screen.getByRole('checkbox').closest('label');
    expect(switchElement).toHaveClass('frui-field-switch-default');
  });

  it('calls onChange when checkbox is clicked', () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onUpdate when checkbox is clicked', () => {
    const onUpdate = vi.fn();
    render(<Switch onUpdate={onUpdate} />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(onUpdate).toHaveBeenCalled();
  });
});