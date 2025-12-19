//--------------------------------------------------------------------//
// Imports

//modules
import type { MouseEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
//frui
import Rating, {
  Star,
  defaultGetLabelText,
  useRating
} from '../../frui/src/field/Rating.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithState<T>(
  hook: () => T
): { current: T, rerender: () => void } {
  let currentValue: T;
  function TestHook() {
    currentValue = hook();
    return null;
  }
  const { rerender: rerenderComponent } = render(<TestHook />);
  return { 
    get current() {
      return currentValue!;
    },
    rerender: () => rerenderComponent(<TestHook />)
  };
}

//--------------------------------------------------------------------//
// Tests

describe('Star', () => {
  it('renders svg element', () => {
    const { container } = render(<Star />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
  it('applies custom style', () => {
    const { container } = render(<Star style={{ color: 'red' }} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});

describe('defaultGetLabelText', () => {
  it('returns singular label for 1 star', () => {
    expect(defaultGetLabelText(1)).toBe('1 Star');
  });
  it('returns plural label for multiple stars', () => {
    expect(defaultGetLabelText(3)).toBe('3 Stars');
    expect(defaultGetLabelText(5)).toBe('5 Stars');
  });
});

describe('useRating', () => {
  it('uses provided name', () => {
    const { current } = renderHookWithState(() =>
      useRating({ name: 'test-rating' })
    );
    expect(current.name).toBe('test-rating');
  });
  it('generates name when not provided', () => {
    const { current } = renderHookWithState(() => useRating({}));
    expect(current.name).toBeDefined();
    expect(typeof current.name).toBe('string');
  });
  it('uses controlled value', () => {
    const { current } = renderHookWithState(() =>
      useRating({ value: 3 })
    );
    expect(current.value).toBe(3);
    expect(current.displayValue).toBe(3);
  });
  it('uses uncontrolled value with defaultValue', () => {
    const { current } = renderHookWithState(() =>
      useRating({ defaultValue: 4 })
    );
    expect(current.value).toBe(4);
  });
  it('starts with null value when no default', () => {
    const { current } = renderHookWithState(() => useRating({}));
    expect(current.value).toBeNull();
  });
  it('updates hover value', () => {
    let hookResult: ReturnType<typeof useRating>;
    function TestComponent() {
      hookResult = useRating({});
      return null;
    }
    const { rerender } = render(<TestComponent />);
    
    const mockEvent = {} as MouseEvent;
    act(() => {
      hookResult!.handlers.mouseEnter(mockEvent, 3);
    });
    rerender(<TestComponent />);
    expect(hookResult!.hoverValue).toBe(3);
    
    act(() => {
      hookResult!.handlers.mouseLeave(mockEvent);
    });
    rerender(<TestComponent />);
    expect(hookResult!.hoverValue).toBeNull();
  });
  it('does not update hover when readOnly', () => {
    let hookResult: ReturnType<typeof useRating>;
    function TestComponent() {
      hookResult = useRating({ readOnly: true });
      return null;
    }
    const { rerender } = render(<TestComponent />);
    
    const mockEvent = {} as MouseEvent;
    hookResult!.handlers.mouseEnter(mockEvent, 3);
    rerender(<TestComponent />);
    expect(hookResult!.hoverValue).toBeNull();
  });
  it('does not update hover when disabled', () => {
    let hookResult: ReturnType<typeof useRating>;
    function TestComponent() {
      hookResult = useRating({ disabled: true });
      return null;
    }
    const { rerender } = render(<TestComponent />);
    
    const mockEvent = {} as MouseEvent;
    hookResult!.handlers.mouseEnter(mockEvent, 3);
    rerender(<TestComponent />);
    expect(hookResult!.hoverValue).toBeNull();
  });
});

describe('Rating', () => {
  it('renders with default props', () => {
    render(<Rating />);
    const inputs = screen.getAllByRole('radio');
    expect(inputs).toHaveLength(5);
  });
  it('renders custom max number of stars', () => {
    render(<Rating max={10} />);
    const inputs = screen.getAllByRole('radio');
    expect(inputs).toHaveLength(10);
  });
  it('applies size classes', () => {
    const { container, rerender } = render(<Rating size="small" />);
    expect(
      container.querySelector('.frui-rating-small')
    ).toBeInTheDocument();
    
    rerender(<Rating size="medium" />);
    expect(
      container.querySelector('.frui-rating-medium')
    ).toBeInTheDocument();
    
    rerender(<Rating size="large" />);
    expect(
      container.querySelector('.frui-rating-large')
    ).toBeInTheDocument();
  });
  it('applies disabled class', () => {
    const { container } = render(<Rating disabled />);
    expect(container.querySelector('.frui-rating-disabled'))
      .toBeInTheDocument();
  });
  it('applies readonly class', () => {
    const { container } = render(<Rating readOnly />);
    expect(container.querySelector('.frui-rating-readonly'))
      .toBeInTheDocument();
  });
  it('applies custom className', () => {
    const { container } = render(<Rating className="custom-class" />);
    expect(
      container.querySelector('.custom-class')
    ).toBeInTheDocument();
  });
  it('applies custom style', () => {
    const { container } = render(
      <Rating style={{ margin: '10px' }} />
    );
    const root = container.querySelector(
      '.frui-rating-root'
    );
    expect(root).toHaveStyle({ margin: '10px' });
  });
  it('handles controlled value', () => {
    const { rerender } = render(<Rating value={3} />);
    const inputs = screen.getAllByRole(
      'radio'
    ) as HTMLInputElement[];
    expect(inputs[ 2 ].checked).toBe(true);
    
    rerender(<Rating value={5} />);
    expect(inputs[4].checked).toBe(true);
  });
  it('handles uncontrolled value with defaultValue', () => {
    render(<Rating defaultValue={4} />);
    const inputs = screen.getAllByRole(
      'radio'
    ) as HTMLInputElement[];
    expect(inputs[ 3 ].checked).toBe(true);
  });
  it('calls onChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Rating onChange={handleChange} />);
    
    const inputs = screen.getAllByRole('radio');
    fireEvent.click(inputs[ 2 ]);
    
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.any(Object),
      3
    );
  });
  it('does not call onChange when readOnly', () => {
    const handleChange = vi.fn();
    render(<Rating onChange={handleChange} readOnly />);
    
    const inputs = screen.getAllByRole('radio');
    fireEvent.click(inputs[ 2 ]);
    
    expect(handleChange).not.toHaveBeenCalled();
  });
  it('disables inputs when disabled prop is true', () => {
    render(<Rating disabled />);
    const inputs = screen.getAllByRole(
      'radio'
    ) as HTMLInputElement[];
    inputs.forEach((input) => {
      expect(input.disabled).toBe(true);
    });
  });
  it('highlights stars up to value', () => {
    const { container } = render(<Rating value={3} />);
    const filledIcons = container.querySelectorAll(
      '.frui-rating-icon-filled'
    );
    expect(filledIcons).toHaveLength(3);
  });
  it('highlights only selected star', () => {
    const { container } = render(
      <Rating value={3} highlightSelectedOnly />
    );
    const filledIcons = container.querySelectorAll(
      '.frui-rating-icon-filled'
    );
    expect(filledIcons).toHaveLength(1);
  });
  it('calls onChangeActive on mouse enter', () => {
    const handleChangeActive = vi.fn();
    render(<Rating onChangeActive={handleChangeActive} />);
    
    const labels = screen.getAllByRole('radio').map((input) =>
      input.closest('label')
    );
    
    fireEvent.mouseEnter(labels[ 2 ]!);
    expect(handleChangeActive).toHaveBeenCalledWith(
      expect.any(Object),
      3
    );
  });
  it('calls onChangeActive on mouse leave', () => {
    const handleChangeActive = vi.fn();
    const { container } = render(
      <Rating onChangeActive={handleChangeActive} />
    );
    
    const root = container.querySelector('.frui-rating-root');
    fireEvent.mouseLeave(root!);
    
    expect(handleChangeActive).toHaveBeenCalledWith(
      expect.any(Object),
      null
    );
  });
  it('does not call onChangeActive when disabled', () => {
    const handleChangeActive = vi.fn();
    render(<Rating onChangeActive={handleChangeActive} disabled />);
    
    const labels = screen.getAllByRole('radio').map((input) =>
      input.closest('label')
    );
    
    fireEvent.mouseEnter(labels[ 2 ]!);
    expect(handleChangeActive).not.toHaveBeenCalled();
  });
  it('uses custom emptyIcon', () => {
    const CustomEmptyIcon = () =>
      <span data-testid="custom-empty">☆</span>;
    render(<Rating emptyIcon={<CustomEmptyIcon />} />);
    const emptyIcons = screen.getAllByTestId('custom-empty');
    expect(emptyIcons.length).toBeGreaterThan(0);
  });
  it('uses custom getLabelText', () => {
    const customGetLabel = (value: number) => `Rating: ${value}`;
    render(<Rating getLabelText={customGetLabel} />);
    
    const label = screen.getByLabelText('Rating: 1');
    expect(label).toBeInTheDocument();
  });
  it('generates unique name for each rating instance', () => {
    const { container: container1 } = render(<Rating />);
    const { container: container2 } = render(<Rating />);
    
    const name1 = (
      container1.querySelector(
        'input[ type="radio" ]'
      ) as HTMLInputElement
    ).name;
    const name2 = (
      container2.querySelector(
        'input[ type="radio" ]'
      ) as HTMLInputElement
    ).name;
    
    expect(name1).not.toBe(name2);
  });
  it('uses provided name for all radio inputs', () => {
    render(<Rating name="custom-rating" />);
    const inputs = screen.getAllByRole(
      'radio'
    ) as HTMLInputElement[];
    
    inputs.forEach((input) => {
      expect(input.name).toBe('custom-rating');
    });
  });
  it('updates display on hover', () => {
    const { container } = render(<Rating value={2} />);
    
    const labels = screen.getAllByRole('radio').map((input) =>
      input.closest('label')
    );
    
    fireEvent.mouseEnter(labels[ 3 ]!);
    
    const filledIcons = container.querySelectorAll(
      '.frui-rating-icon-filled'
    );
    expect(filledIcons).toHaveLength(4);
  });
  it('restores value display on mouse leave', () => {
    const { container } = render(<Rating value={2} />);
    
    const labels = screen.getAllByRole('radio').map((input) =>
      input.closest('label')
    );
    const root = container.querySelector('.frui-rating-root');
    
    fireEvent.mouseEnter(labels[ 3 ]!);
    fireEvent.mouseLeave(root!);
    
    const filledIcons = container.querySelectorAll(
      '.frui-rating-icon-filled'
    );
    expect(filledIcons).toHaveLength(2);
  });
  it('adds hover class to hovered icon', () => {
    const { container } = render(<Rating />);
    
    const labels = screen.getAllByRole('radio').map((input) =>
      input.closest('label')
    );
    
    fireEvent.mouseEnter(labels[ 2 ]!);
    
    const hoverIcon = container.querySelector(
      '.frui-rating-icon-hover'
    );
    expect(hoverIcon).toBeInTheDocument();
  });
  it('adds active class to selected icon', () => {
    const { container } = render(<Rating value={3} />);
    
    const activeIcons = container.querySelectorAll(
      '.frui-rating-icon-active'
    );
    expect(activeIcons).toHaveLength(1);
  });
});