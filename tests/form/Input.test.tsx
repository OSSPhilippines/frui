//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
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
//frui
import Input from '../../src/form/Input.js';

//--------------------------------------------------------------------//
// Tests

describe('<Input />', () => {
  it('renders a basic input with default class', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('frui-form-input');
  });

  it('appends custom className when provided', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'frui-form-input',
      'custom-class'
    );
  });

  it('applies error styling when error prop is truthy', () => {
    render(<Input error />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'frui-form-input',
      'frui-tx-error',
      'frui-bd-error'
    );
  });

  it('calls onChange and onUpdate handlers when user types', () => {
    const handleChange = vi.fn();
    const handleUpdate = vi.fn();
    render(
      <Input onChange={handleChange} onUpdate={handleUpdate} />
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleUpdate).toHaveBeenCalledWith('hello');
  });

  it('passes through arbitrary attributes (e.g. placeholder)', () => {
    render(<Input placeholder="Type here" />);
    expect(
      screen.getByPlaceholderText('Type here')
    ).toBeInTheDocument();
  });
});