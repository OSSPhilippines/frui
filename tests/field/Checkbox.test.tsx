//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Checkbox, { useCheckbox } from '../../frui/src/field/Checkbox.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithCheckbox(
  config: Parameters<typeof useCheckbox>[ 0 ]
) {
  let hookResult: ReturnType<typeof useCheckbox> | undefined;
  function TestHook() {
    hookResult = useCheckbox(config);
    return <div data-testid="checkbox-hook" />;
  }
  const utils = render(<TestHook />);
  return {
    getHook: () => hookResult!,
    rerender: () => utils.rerender(<TestHook />)
  };
}

function TestControlledComponent({ checked }: { checked: boolean }) {
  const { isChecked } = useCheckbox({ checked });
  return <div data-testid="controlled">{isChecked.toString()}</div>;
}

//--------------------------------------------------------------------//
// Tests

describe('useCheckbox Hook', () => {
  it('initializes with defaultChecked value', () => {
    const { getHook } = renderHookWithCheckbox({
      defaultChecked: true
    });
    expect(getHook().isChecked).toBe(true);
  });

  it('initializes with false when no default', () => {
    const { getHook } = renderHookWithCheckbox({});
    expect(getHook().isChecked).toBe(false);
  });

  it('calls onChange when change handler is triggered', () => {
    const onChange = vi.fn();
    const { getHook } = renderHookWithCheckbox({ onChange });
    const hook = getHook();
    const event = {
      target: { checked: true, value: 'test' }
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.change(event);
    });

    expect(onChange).toHaveBeenCalledWith(event);
  });

  it('calls onUpdate when change handler is triggered', () => {
    const onUpdate = vi.fn();
    const { getHook } = renderHookWithCheckbox({ onUpdate });
    const hook = getHook();
    const event = {
      target: { checked: true, value: 'test-value' }
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.change(event);
    });

    expect(onUpdate).toHaveBeenCalledWith('test-value', true);
  });

  it('updates isChecked state when changed', async () => {
    const { getHook, rerender } = renderHookWithCheckbox({});
    let hook = getHook();
    const event = {
      target: { checked: true, value: 'test' }
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.change(event);
    });
    rerender();

    await waitFor(() => {
      hook = getHook();
      expect(hook.isChecked).toBe(true);
    });
  });

  it('respects controlled checked prop', () => {
    const { rerender } = render(
      <TestControlledComponent checked={false} />
    );
    let text = screen.getByTestId('controlled');
    expect(text).toHaveTextContent('false');

    rerender(<TestControlledComponent checked={true} />);
    text = screen.getByTestId('controlled');
    expect(text).toHaveTextContent('true');
  });
});

describe('<Checkbox /> Component', () => {
  describe('Basic Rendering', () => {
    it('renders checkbox input', () => {
      render(<Checkbox />);
      const input = screen.getByRole('checkbox');
      expect(input).toBeInTheDocument();
    });

    it('renders label when provided', () => {
      render(<Checkbox label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('does not render label when not provided', () => {
      render(<Checkbox />);
      expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('respects defaultChecked prop', () => {
      render(<Checkbox defaultChecked />);
      const input = screen.getByRole('checkbox') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('respects checked prop', () => {
      render(<Checkbox checked />);
      const input = screen.getByRole('checkbox') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('updates when clicked', () => {
      render(<Checkbox />);
      const input = screen.getByRole('checkbox');
      fireEvent.click(input);
      expect((input as HTMLInputElement).checked).toBe(true);
    });
  });

  describe('Styling', () => {
    it('applies base frui-field-option class', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option');
    });

    it('applies custom className', () => {
      render(<Checkbox className="custom-class" />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('custom-class');
    });

    it('applies rounded style', () => {
      render(<Checkbox rounded />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-rounded');
    });

    it('applies circle style', () => {
      render(<Checkbox circle />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-circle');
    });

    it('applies square style', () => {
      render(<Checkbox square />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-square');
    });

    it('applies check style by default', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-check');
    });

    it('applies blue color style', () => {
      render(<Checkbox blue />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-blue');
    });

    it('applies orange color style', () => {
      render(<Checkbox orange />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-orange');
    });

    it('applies default color style', () => {
      render(<Checkbox />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-field-option-default');
    });

    it('applies error styles when error prop is provided', () => {
      render(<Checkbox error="Error message" />);
      const checkbox = screen.getByRole('checkbox').closest('label');
      expect(checkbox).toHaveClass('frui-tx-error', 'frui-bd-error');
    });
  });

  describe('Event Handling', () => {
    it('calls onUpdate when checkbox is changed', () => {
      const onUpdate = vi.fn();
      render(<Checkbox onUpdate={onUpdate} value="test-value" />);
      const input = screen.getByRole('checkbox');
      fireEvent.click(input);
      expect(onUpdate).toHaveBeenCalledWith('test-value', true);
    });

    it('calls onChange when checkbox is changed', () => {
      const onChange = vi.fn();
      render(<Checkbox onChange={onChange} />);
      const input = screen.getByRole('checkbox');
      fireEvent.click(input);
      expect(onChange).toHaveBeenCalled();
    });
  });
});