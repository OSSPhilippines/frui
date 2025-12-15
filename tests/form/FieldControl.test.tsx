//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it
} from 'vitest';
//frui
import FieldControl from '../../src/form/FieldControl.js';

//--------------------------------------------------------------------//
// Tests

describe('<FieldControl />', () => {
  it('renders with default class', () => {
    render(<FieldControl />);
    const container = document.querySelector(
      '.frui-form-field-control'
    );
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('frui-form-field-control');
  });

  it('renders label when provided', () => {
    render(<FieldControl label="Username" />);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('frui-form-field-control-label');
  });

  it('renders error message when provided', () => {
    render(<FieldControl error="Required field" />);
    const error = screen.getByText('Required field');
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('frui-form-field-control-error');
  });

  it('renders children inside field container', () => {
    render(
      <FieldControl>
        <input data-testid="child-input" />
      </FieldControl>
    );
    const child = screen.getByTestId('child-input');
    const fieldContainer = document.querySelector(
      '.frui-form-field-control-field'
    );
    expect(child).toBeInTheDocument();
    expect(fieldContainer).toBeInTheDocument();
  });

  it('applies custom className when passed', () => {
    render(<FieldControl className="custom-class" />);
    const container = document.querySelector(
      '.frui-form-field-control'
    );
    expect(container).toHaveClass(
      'frui-form-field-control',
      'custom-class'
    );
  });
});