//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Checkbox from '../../src/form/Checkbox.js';

//--------------------------------------------------------------------//
// Tests

describe('<Checkbox /> component', () => {
  it('applies error classes when error prop is provided', () => {
    render(<Checkbox error label="Error field" />);
    const wrapper = screen.getByText('Error field').closest('label')!;
    expect(wrapper).toHaveClass('frui-tx-error', 'frui-bd-error');
  });

  it('applies shape and color class combinations', () => {
    render(<Checkbox blue circle className="own" label="Styled" rounded />);
    const wrapper = screen.getByText('Styled').closest('label')!;
    expect(wrapper).toHaveClass('frui-form-option');
    expect(wrapper).toHaveClass('frui-form-option-circle');
    expect(wrapper).toHaveClass('frui-form-option-rounded');
    expect(wrapper).toHaveClass('frui-form-option-blue');
    expect(wrapper).toHaveClass('own');
  });

  it('calls onChange and onUpdate when toggled', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    render(
      <Checkbox 
        label="Notify" 
        onChange={onChange} 
        onUpdate={onUpdate} 
        value="newsletter" 
      />
    );
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith('newsletter', true);
    fireEvent.click(input);
    expect(onUpdate).toHaveBeenLastCalledWith(undefined, false);
  });

  it('falls back to square/check shape and default color when none specified', () => {
    render(<Checkbox label="Plain" />);
    const wrapper = screen.getByText('Plain').closest('label')!;
    expect(wrapper).toHaveClass('frui-form-option-check');
    expect(wrapper).toHaveClass('frui-form-option-default');
  });

  it('passes through additional props to input element', () => {
    render(
      <Checkbox 
        data-testid="checkbox"
        label="Spread" 
        name="user-consent" 
      />
    );
    const input = screen.getByTestId('checkbox');
    expect(input).toHaveAttribute('name', 'user-consent');
    expect(input).toHaveAttribute('type', 'checkbox');
  });

  it('renders label text and basic classes', () => {
    render(<Checkbox label="Accept Terms" />);
    const wrapper = screen.getByText('Accept Terms').closest('label');
    expect(wrapper).toHaveClass('frui-form-option');
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
    expect(screen.getByRole('checkbox'))
      .toHaveClass('frui-form-option-control');
  });

  it('respects controlled checked prop updates', () => {
    const { rerender } = render(
      <Checkbox checked={false} label="Controlled" />
    );
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);
    rerender(<Checkbox checked label="Controlled" />);
    expect(input.checked).toBe(true);
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox defaultChecked label="Default" />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.defaultChecked).toBe(true);
    expect(input.checked).toBe(true);
  });
});