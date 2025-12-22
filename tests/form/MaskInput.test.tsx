//--------------------------------------------------------------------//
// Imports

//modules
import type { InputHTMLAttributes } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import MaskInput from '../../src/form/MaskInput.js';

//--------------------------------------------------------------------//
// Mocks

const mockMaskMethod = vi.fn();

function MockInputmask(
  this: unknown,
  _options?: Record<string, unknown>
) {
  return { mask: mockMaskMethod };
}

Object.defineProperty(globalThis, 'Inputmask', {
  value: MockInputmask,
  writable: true
});

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    type,
    ...props
  }: InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className={className}
      data-testid="mock-input"
      type={type ?? 'text'}
    />
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('<MaskInput />', () => {
  it('renders basic input element', () => {
    render(<MaskInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input.tagName.toLowerCase()).toBe('input');
  });

  it('creates a new Inputmask instance and calls mask()', () => {
    const onReady = vi.fn();
    render(
      <MaskInput
        alias="numeric"
        mask="9999"
        onReady={onReady}
      />
    );
    expect(mockMaskMethod).toHaveBeenCalled();
    expect(onReady).toHaveBeenCalledWith(
      expect.objectContaining({
        mask: expect.any(Function)
      })
    );
  });
});