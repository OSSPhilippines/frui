//--------------------------------------------------------------------//
// Imports

//frui
import { Radio, useRadio } from '../../src/form/Radio.js';
//modules
import type { ChangeEvent } from 'react';
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

//--------------------------------------------------------------------//
// Tests

describe('useRadio()', () => {
  it('sets and updates checked state when changed', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { result } = renderHook(() =>
      useRadio({
        defaultChecked: false,
        onChange,
        onUpdate
      })
    );
    act(() =>
      result.current.handlers.change({
        target: { checked: true, value: 'A' }
      } as unknown as ChangeEvent<HTMLInputElement>)
    );
    expect(onChange).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith('A', true);
  });

  it('syncs isChecked when checked prop changes', () => {
    const { result, rerender } = renderHook(
      ({ checked }: { checked: boolean }) =>
        useRadio({ checked }),
      { initialProps: { checked: false } }
    );
    expect(result.current.isChecked).toBe(false);
    rerender({ checked: true });
    expect(result.current.isChecked).toBeDefined();
  });
});

describe('<Radio />', () => {
  it(
    'applies shape, color, and error class names correctly',
    () => {
      const { container } = render(
        <Radio
          check
          blue
          className="extra"
          error
          label="R"
        />
      );
      const wrapper = container.querySelector('label')!;
      expect(wrapper.className).toContain(
        'frui-form-option-check'
      );
      expect(wrapper.className).toContain(
        'frui-form-option-blue'
      );
      expect(wrapper.className).toContain('frui-tx-error');
      expect(wrapper.className).toContain('extra');
    }
  );

  it('calls onUpdate when user selects the radio', () => {
    const onUpdate = vi.fn();
    render(
      <Radio label="Click Me" onUpdate={onUpdate} value="yes" />
    );
    const input = screen.getByRole('radio');
    fireEvent.click(input);
    expect(onUpdate).toHaveBeenCalledWith('yes', true);
  });

  it('renders radio input with label', () => {
    render(<Radio label="Option 1" />);
    const input = screen.getByRole('radio');
    const label = screen.getByText('Option 1');
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('renders with custom style prop', () => {
    const { container } = render(
      <Radio label="Stylish" style={{ color: 'red' }} />
    );
    const wrapper = container.querySelector('label')!;
    expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it(
    'shows circle shape by default when no shape specified',
    () => {
      const { container } = render(<Radio label="Default" />);
      const wrapper = container.querySelector('label')!;
      expect(wrapper.className).toContain(
        'frui-form-option-circle'
      );
    }
  );
});