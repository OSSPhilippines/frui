//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  renderHook
} from '@testing-library/react';
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
//types
import type { ChangeEvent } from 'react';
//frui
import Switch, { useSwitch } from '../../src/form/Switch.js';

//--------------------------------------------------------------------//
// Tests

describe('<Switch />', () => {
  it('renders checkbox input and label text', () => {
    render(<Switch label="Toggle me" />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeInTheDocument();
    expect(screen.getByText('Toggle me')).toBeInTheDocument();
  });

  it('applies style and className props', () => {
    const { container } = render(
      <Switch
        label="Styled"
        style={{ color: 'red' }}
        className="extra"
      />
    );
    const wrapper = container.querySelector('label')!;
    expect(wrapper).toHaveClass('extra');
    expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('adds all variant and color classes as expected', () => {
    const { container } = render(
      <Switch
        blue
        error
        label="variant"
        onoff
        ridge
        rounded
        className="custom"
      />
    );
    const wrapper = container.querySelector('label')!;
    const name = wrapper.className;
    expect(name).toContain('frui-form-switch-rounded');
    expect(name).toContain('frui-form-switch-onoff');
    expect(name).toContain('frui-form-switch-ridge');
    expect(name).toContain('frui-form-switch-blue');
    expect(name).toContain('frui-tx-error');
    expect(name).toContain('custom');
  });

  it('fires onUpdate when user toggles the checkbox', () => {
    const onUpdate = vi.fn();
    render(<Switch label="Click" onUpdate={onUpdate} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onUpdate).toHaveBeenCalledWith('on', true);
  });

  it('updates checked state when controlled prop changes', () => {
    const { rerender } = render(<Switch checked={false} label="X" />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);
    rerender(<Switch checked label="X" />);
    expect(input.checked).toBe(true);
  });
});

//--------------------------------------------------------------------//
// Hooks

describe('useSwitch()', () => {
  it('calls onChange and onUpdate when toggled', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { result } = renderHook(() =>
      useSwitch({
        onChange,
        onUpdate,
        defaultChecked: false
      })
    );
    act(() => {
      result.current.handlers.change({
        target: { checked: true, value: 'x' }
      } as unknown as ChangeEvent<HTMLInputElement>);
    });
    expect(onChange).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith('x', true);
  });

  it('syncs isChecked value when checked prop changes', () => {
    const { result, rerender } = renderHook(
      ({ checked }: { checked: boolean }) => useSwitch({ checked }),
      { initialProps: { checked: false } }
    );
    expect(result.current.isChecked).toBe(false);
    rerender({ checked: true });
    expect(result.current.isChecked).toBe(true);
  });
});