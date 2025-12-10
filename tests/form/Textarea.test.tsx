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
import type {
  ChangeEvent
} from 'react';
//frui
import Textarea, {
  useTextarea
} from '../../src/form/Textarea';


//--------------------------------------------------------------------//
// Hooks

describe('useTextarea()', () => {
  it('calls onChange and onUpdate with correct value', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();

    const { result } = renderHook(() =>
      useTextarea({ onChange, onUpdate })
    );

    const mockEvent =
      { target: { value: 'hello world' } } as unknown as ChangeEvent<HTMLTextAreaElement>;

    act(() => {
      result.current.handlers.change(mockEvent);
    });

    expect(onChange).toHaveBeenCalledWith(mockEvent);
    expect(onUpdate).toHaveBeenCalledWith('hello world');
  });

  it('handles missing callbacks without errors', () => {
    const { result } = renderHook(() => useTextarea({}));
    const mockEvent =
      { target: { value: 'noop' } } as unknown as ChangeEvent<HTMLTextAreaElement>;

    expect(() => {
      act(() => {
        result.current.handlers.change(mockEvent);
      });
    }).not.toThrow();
  });
});


//--------------------------------------------------------------------//
// Tests

describe('<Textarea />', () => {
  it('renders with base class', () => {
    render(<Textarea />);
    const element = screen.getByRole('textbox');

    expect(element).toHaveClass('frui-form-textarea');
  });

  it('renders with a custom className', () => {
    render(<Textarea className="custom-textarea" />);
    const element = screen.getByRole('textbox');

    expect(element).toHaveClass('custom-textarea');
  });

  it('applies error classes when error prop provided', () => {
    render(<Textarea error />);
    const element = screen.getByRole('textbox');

    expect(element).toHaveClass('frui-tx-error', 'frui-bd-error');
  });

  it('calls onUpdate when user types', () => {
    const onUpdate = vi.fn();

    render(<Textarea onUpdate={onUpdate} />);
    const element = screen.getByRole('textbox') as HTMLTextAreaElement;

    fireEvent.change(element, { target: { value: 'updated text' } });
    expect(onUpdate).toHaveBeenCalledWith('updated text');
  });

  it('calls onChange with the event', () => {
    const onChange = vi.fn();

    render(<Textarea onChange={onChange} />);
    const element = screen.getByRole('textbox');

    fireEvent.change(element, { target: { value: 'test event' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards ref when passRef prop provided', () => {
    const ref = { current: null } as { current: HTMLTextAreaElement | null };
    render(<Textarea passRef={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});