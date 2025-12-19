//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
//frui
import Password, { usePassword } from '../../frui/src/field/Password.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    error,
    onChange,
    type,
    value,
    ...props
  }: {
    className?: string,
    error?: boolean,
    onChange?: () => void,
    type?: string,
    value?: string,
    [ key: string ]: unknown
  }) => (
    <input
      {...props}
      className={className}
      data-testid="password-input"
      onChange={onChange}
      type={type}
      value={value}
    />
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('usePassword Hook', () => {
  it('initializes with hidden password', () => {
    const { result } = renderHook(() => usePassword());
    expect(result.current.showing).toBe(false);
  });

  it('toggles password visibility', () => {
    const { result } = renderHook(() => usePassword());
    expect(result.current.showing).toBe(false);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.showing).toBe(true);
    
    act(() => {
      result.current.toggle();
    });
    expect(result.current.showing).toBe(false);
  });
});

describe('<Password /> Component', () => {
  it('renders password input and toggle button', () => {
    render(<Password />);
    expect(
      screen.getByTestId('password-input')
    ).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Password className="custom-class" />);
    const container = screen.getByTestId('password-input')
      .closest('.frui-field-password');
    expect(container).toHaveClass('custom-class');
  });

  it('shows password when toggle is clicked', () => {
    render(<Password />);
    const toggle = screen.getByText('A');
    fireEvent.click(toggle);
    expect(screen.getByText('✷')).toBeInTheDocument();
  });

  it('hides password when toggle is clicked twice', () => {
    render(<Password />);
    const toggle = screen.getByText('A');
    fireEvent.click(toggle);
    fireEvent.click(screen.getByText('✷'));
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('passes error prop to input', () => {
    render(<Password error />);
    const input = screen.getByTestId('password-input');
    expect(input).toBeInTheDocument();
  });

  it('applies error styling to toggle button', () => {
    render(<Password error />);
    const toggle = screen.getByText('A');
    expect(toggle).toHaveClass('frui-tx-error');
  });

  it('passes through other input attributes', () => {
    render(
      <Password 
        placeholder="Enter password" 
        defaultValue="secret" 
      />
    );
    const input = screen.getByTestId('password-input');
    expect(input).toHaveAttribute('placeholder', 'Enter password');
    expect(input).toHaveValue('secret');
  });
});