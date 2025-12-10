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
import Rating from '../../src/form/Rating';

//--------------------------------------------------------------------//
// Tests

describe('<Rating />', () => {
  it('renders five default icons', () => {
    render(<Rating />);
    const icons = screen.getAllByRole('radio');
    expect(icons).toHaveLength(5);
  });

  it('applies size and custom class/style props', () => {
    const { container } = render(
      <Rating
        size="large"
        className="extra"
        style={{ color: 'red' }}
      />
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('frui-rating-large');
    expect(root).toHaveClass('extra');
    expect(root).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('renders highlightSelectedOnly correctly', () => {
    render(<Rating defaultValue={3} highlightSelectedOnly />);
    const filled = document.querySelectorAll('.frui-rating-icon-filled');
    expect(filled.length).toBe(1);
  });

  it('calls onChange when a star is clicked', () => {
    const onChange = vi.fn();
    render(<Rating onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[2]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][1]).toBe(3);
  });

  it('calls onChangeActive on hover and mouseleave', () => {
    const onChangeActive = vi.fn();
    render(<Rating onChangeActive={onChangeActive} />);
    const label = screen.getAllByLabelText('3 Stars')[0];
    fireEvent.mouseEnter(label);
    expect(onChangeActive).toHaveBeenCalledWith(expect.any(Object), 3);
    fireEvent.mouseLeave(label);
    expect(onChangeActive).toHaveBeenCalledWith(expect.any(Object), null);
  });

  it('adds disabled and readonly classes and prevents change', () => {
    const onChange = vi.fn();
    render(<Rating disabled readOnly onChange={onChange} />);
    const root = document.querySelector('.frui-rating-root')!;
    expect(root.className).toContain('frui-rating-disabled');
    expect(root.className).toContain('frui-rating-readonly');
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows correct filled icons when value prop provided', () => {
    const { rerender } = render(<Rating value={2} />);
    expect(document.querySelectorAll('.frui-rating-icon-filled')).toHaveLength(2);
    rerender(<Rating value={4} />);
    expect(document.querySelectorAll('.frui-rating-icon-filled')).toHaveLength(4);
  });
});