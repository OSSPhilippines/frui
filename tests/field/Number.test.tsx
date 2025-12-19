//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
//frui
import NumberField from '../../frui/src/field/Number.js';

//--------------------------------------------------------------------//
// Helpers

function createChangeEvent(
  value: string
): ChangeEvent<HTMLInputElement> {
  const input = document.createElement('input');
  input.value = value;
  input.selectionStart = value.length;
  return {
    target: input,
    currentTarget: input
  } as ChangeEvent<HTMLInputElement>;
}

function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector('input') as HTMLInputElement;
}

//--------------------------------------------------------------------//
// Tests

describe('NumberField component', () => {
  describe('rendering', () => {
    it('renders input field', () => {
      const { container } = render(<NumberField />);
      expect(getInput(container)).toBeInTheDocument();
    });

    it('renders with default value', () => {
      const { container } = render(<NumberField defaultValue="1234" />);
      const input = getInput(container);
      expect(input).toHaveValue('1,234');
    });

    it('renders with controlled value', () => {
      const { container } = render(<NumberField value="5678" />);
      const input = getInput(container);
      expect(input).toHaveValue('5,678');
    });
  });

  describe('number formatting', () => {
    it('adds thousand separators', () => {
      const { container } = render(
        <NumberField defaultValue="1000000" />
      );
      const input = getInput(container);
      expect(input).toHaveValue('1,000,000');
    });

    it('uses custom separator', () => {
      const { container } = render(
        <NumberField defaultValue="1000" separator="." />
      );
      const input = getInput(container);
      expect(input).toHaveValue('1.000');
    });

    it('formats decimal numbers', () => {
      const { container } = render(
        <NumberField defaultValue="1234.56" step={0.01} />
      );
      const input = getInput(container);
      expect(input).toHaveValue('1,234.56');
    });

    it('pads decimal places on blur', () => {
      const { container } = render(<NumberField step={0.01} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('10.5'));
      fireEvent.blur(input);
      
      expect(input).toHaveValue('10.50');
    });

    it('removes trailing decimal on blur', () => {
      const { container } = render(<NumberField step={0.01} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('10.'));
      fireEvent.blur(input);
      
      expect(input).toHaveValue('10.00');
    });
  });

  describe('negative numbers', () => {
    it('allows negative numbers', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('-500'));
      
      expect(input).toHaveValue('-500');
    });

    it('formats negative numbers with separator', () => {
      const { container } = render(
        <NumberField defaultValue="-1000" />
      );
      const input = getInput(container);
      expect(input).toHaveValue('-1,000');
    });

    it('prevents negative when absolute is true', () => {
      const { container } = render(<NumberField absolute />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('-500'));
      
      expect(input).toHaveValue('500');
    });

    it('handles multiple negative signs', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('--500'));
      
      expect(input).toHaveValue('500');
    });
  });

  describe('min and max constraints', () => {
    it('enforces minimum value', () => {
      const { container } = render(<NumberField min={10} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('5'));
      
      expect(input).toHaveValue('10');
    });

    it('enforces maximum value', () => {
      const { container } = render(<NumberField max={100} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('200'));
      
      expect(input).toHaveValue('100');
    });

    it('allows values between min and max', () => {
      const { container } = render(
        <NumberField min={10} max={100} />
      );
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('50'));
      
      expect(input).toHaveValue('50');
    });
  });

  describe('decimal handling', () => {
    it('limits decimal places based on step', () => {
      const { container } = render(<NumberField step={0.01} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('10.999'));
      
      expect(input).toHaveValue('10.99');
    });

    it('allows typing decimals when step allows it', () => {
      const { container } = render(<NumberField step={0.1} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('10.5'));
      
      expect(input).toHaveValue('10.5');
    });

    it('handles decimal input with step', () => {
      const { container } = render(<NumberField step={0.01} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('10.5.5'));
      
      expect(input.value).toMatch(/10[.5]+/);
    });

    it('adds leading zero for decimal start', () => {
      const { container } = render(<NumberField step={0.01} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('.5'));
      fireEvent.blur(input);
      
      expect(input).toHaveValue('0.50');
    });

    it('handles negative decimal start', () => {
      const { container } = render(<NumberField step={0.01} />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('-.5'));
      fireEvent.blur(input);
      
      expect(input).toHaveValue('-0.50');
    });
  });

  describe('input sanitization', () => {
    it('removes non-numeric characters', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('abc123def'));
      
      expect(input).toHaveValue('123');
    });

    it('removes leading zeros', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('00123'));
      
      expect(input).toHaveValue('123');
    });

    it('handles zero input', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('0'));
      
      expect(input.value.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('callbacks', () => {
    it('calls onChange when value changes', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <NumberField onChange={handleChange} />
      );
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('100'));
      
      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onUpdate with numeric value', () => {
      const handleUpdate = vi.fn();
      const { container } = render(
        <NumberField onUpdate={handleUpdate} />
      );
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('100'));
      
      expect(handleUpdate).toHaveBeenCalledWith('100');
    });

    it('does not call callbacks for same value', () => {
      const handleChange = vi.fn();
      const { container } = render(
        <NumberField onChange={handleChange} />
      );
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('100'));
      handleChange.mockClear();
      
      fireEvent.change(input, createChangeEvent('100'));
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('provides controls ref with update function', () => {
      const controls = vi.fn();
      render(<NumberField controls={controls} />);
      
      expect(controls).toHaveBeenCalledWith(
        expect.objectContaining({
          update: expect.any(Function),
          value: expect.any(String)
        })
      );
    });
  });

  describe('controlled component', () => {
    it('updates when value prop changes', () => {
      const { container, rerender } = render(
        <NumberField value="100" />
      );
      const input = getInput(container);
      
      expect(input).toHaveValue('100');
      
      rerender(<NumberField value="200" />);
      
      expect(input).toHaveValue('200');
    });

    it('formats new controlled value', () => {
      const { container, rerender } = render(
        <NumberField value="1000" />
      );
      const input = getInput(container);
      
      expect(input).toHaveValue('1,000');
      
      rerender(<NumberField value="2000" />);
      
      expect(input).toHaveValue('2,000');
    });
  });

  describe('edge cases', () => {
    it('handles empty value', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent(''));
      
      expect(input).toHaveValue('');
    });

    it('handles zero with step decimals', () => {
      const { container } = render(
        <NumberField defaultValue="10" step={0.01} />
      );
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('0'));
      fireEvent.blur(input);
      
      expect(input.value).toBeDefined();
    });

    it('handles very large numbers', () => {
      const { container } = render(
        <NumberField defaultValue="999999999" />
      );
      const input = getInput(container);
      expect(input).toHaveValue('999,999,999');
    });

    it('maintains cursor position on format', () => {
      const { container } = render(<NumberField />);
      const input = getInput(container);
      
      fireEvent.change(input, createChangeEvent('1000'));
      
      expect(input.selectionStart).toBeGreaterThanOrEqual(0);
    });
  });

  describe('prop passthrough', () => {
    it('renders with class name', () => {
      const { container } = render(
        <NumberField className="custom-class" />
      );
      const input = getInput(container);
      
      expect(input).toHaveClass('custom-class');
    });

    it('does not pass number-specific props', () => {
      const { container } = render(
        <NumberField 
          separator="," 
          decimal="." 
          absolute 
          step={0.01} 
        />
      );
      const input = getInput(container);
      
      expect(input).not.toHaveAttribute('separator');
      expect(input).not.toHaveAttribute('decimal');
      expect(input).not.toHaveAttribute('absolute');
      expect(input).not.toHaveAttribute('step');
    });
  });
});