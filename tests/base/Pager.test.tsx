//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import {
  flatClass,
  Pager
} from '../../src/base/Pager.js';

//--------------------------------------------------------------------//
// Tests

describe('flatClass()', () => {
  it('ignores falsy values', () => {
    const result = flatClass('', [ 'x', '' ], 'y');
    expect(result).toBe('x y');
  });

  it('joins string and array class names cleanly', () => {
    const result = flatClass('a', [ 'b', 'c' ], 'd');
    expect(result).toBe('a b c d');
  });
});

describe('<Pager />', () => {
  it('applies active class to current page', () => {
    const { container } = render(
      <Pager className="custom" skip={50} take={50} total={100} />
    );
    const active = container.querySelector('.frui-pager-active');
    expect(active).toBeInTheDocument();
    expect(active?.textContent).toBe('2');
  });

  it('onUpdate for prev/next/end', async () => {
    const onUpdate = vi.fn();
    render(
      <Pager
        end
        next
        onUpdate={onUpdate}
        prev
        radius={1}
        skip={50}
        take={50}
        total={200}
      />
    );
    await userEvent.click(screen.getByText('‹'));
    expect(onUpdate).toHaveBeenCalledWith(0);
    await userEvent.click(screen.getByText('›'));
    expect(onUpdate).toHaveBeenCalledWith(100);
    await userEvent.click(screen.getByText('≫'));
    expect(onUpdate).toHaveBeenCalledWith(150);
  });

  it('calls onUpdate when clicking a page number', async () => {
    const onUpdate = vi.fn();
    render(<Pager onUpdate={onUpdate} take={50} total={150} />);
    await userEvent.click(screen.getByText('2'));
    expect(onUpdate).toHaveBeenCalledWith(50);
  });

  it('renders correct number of pages when no radius provided', () => {
    render(<Pager take={50} total={200} />);
    const pages = screen.getAllByText(/\d+/);
    expect(pages).toHaveLength(4);
  });

  it('returns null if total <= take', () => {
    const { container } = render(<Pager take={20} total={10} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows only next control on first page', () => {
    render(<Pager next prev take={50} total={300} />);
    expect(screen.queryByText('‹')).not.toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
  });

  it('shows start/end controls with radius', () => {
    render(
      <Pager 
        end 
        radius={1} 
        skip={100} 
        start take={50} 
        total={500} 
      />
    );
    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('≫')).toBeInTheDocument();
  });
});