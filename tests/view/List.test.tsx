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
import List from '../../src/view/List.js';

//--------------------------------------------------------------------//
// Tests

describe('<List />', () => {
  it('renders an unordered list by default', () => {
    const { container } = render(<List value={[ 'Item 1', 'Item 2' ]} />);
    const list = container.querySelector('ul');
    expect(list).toBeInTheDocument();
    expect(list?.tagName).toBe('UL');
  });
  it('applies frui-view-list class to list element', () => {
    const { container } = render(<List value={[ 'Item 1' ]} />);
    const list = container.querySelector('.frui-view-list');
    expect(list).toHaveClass('frui-view-list');
  });
  it('renders all list items from value array', () => {
    render(<List value={[ 'First', 'Second', 'Third' ]} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });
  it('renders list items with string values', () => {
    const { container } = render(<List value={[ 'Apple', 'Banana', 'Cherry' ]} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
    expect(items[ 0 ]).toHaveTextContent('Apple');
    expect(items[ 1 ]).toHaveTextContent('Banana');
    expect(items[ 2 ]).toHaveTextContent('Cherry');
  });
  it('renders list items with number values', () => {
    const { container } = render(<List value={[ 1, 2, 3 ]} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
    expect(items[ 0 ]).toHaveTextContent('1');
    expect(items[ 1 ]).toHaveTextContent('2');
    expect(items[ 2 ]).toHaveTextContent('3');
  });
  it('renders list items with mixed string and number values', () => {
    const { container } = render(<List value={[ 'One', 2, 'Three', 4 ]} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(4);
    expect(items[ 0 ]).toHaveTextContent('One');
    expect(items[ 1 ]).toHaveTextContent('2');
    expect(items[ 2 ]).toHaveTextContent('Three');
    expect(items[ 3 ]).toHaveTextContent('4');
  });
  it('renders an ordered list when ordered prop is true', () => {
    const { container } = render(<List value={[ 'First', 'Second' ]} ordered />);
    const list = container.querySelector('ol');
    expect(list).toBeInTheDocument();
    expect(list?.tagName).toBe('OL');
  });
  it('applies frui-view-list class to ordered list', () => {
    const { container } = render(<List value={[ 'Item' ]} ordered />);
    const list = container.querySelector('ol');
    expect(list).toHaveClass('frui-view-list');
  });
  it('applies custom className to unordered list', () => {
    const { container } = render(<List value={[ 'Item' ]} className="custom-list" />);
    const list = container.querySelector('ul');
    expect(list).toHaveClass('frui-view-list');
    expect(list).toHaveClass('custom-list');
  });
  it('applies custom className to ordered list', () => {
    const { container } = render(<List value={[ 'Item' ]} ordered className="custom-ordered" />);
    const list = container.querySelector('ol');
    expect(list).toHaveClass('frui-view-list');
    expect(list).toHaveClass('custom-ordered');
  });
  it('applies custom inline styles to unordered list', () => {
    const { container } = render(
      <List value={[ 'Item' ]} style={{ color: 'red', padding: '10px' }} />
    );
    const list = container.querySelector('ul');
    expect(list).toHaveAttribute('style');
    expect(list).toHaveStyle({ padding: '10px' });
  });
  it('applies custom inline styles to ordered list', () => {
    const { container } = render(
      <List value={[ 'Item' ]} ordered style={{ fontSize: '16px' }} />
    );
    const list = container.querySelector('ol');
    expect(list).toHaveAttribute('style');
    expect(list).toHaveStyle({ fontSize: '16px' });
  });
  it('renders empty list when value array is empty', () => {
    const { container } = render(<List value={[]} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(0);
  });
  it('renders single item list', () => {
    const { container } = render(<List value={[ 'Only Item' ]} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(1);
    expect(items[ 0 ]).toHaveTextContent('Only Item');
  });
  it('renders large list with many items', () => {
    const values = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
    const { container } = render(<List value={values} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(100);
    expect(items[ 0 ]).toHaveTextContent('Item 1');
    expect(items[ 99 ]).toHaveTextContent('Item 100');
  });
  it('assigns unique keys to list items based on index', () => {
    const { container } = render(<List value={[ 'A', 'B', 'C' ]} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
  });
  it('renders list items with special characters', () => {
    render(<List value={[ 'Item & Special', 'Item < > "', "Item's Quote" ]} />);
    expect(screen.getByText('Item & Special')).toBeInTheDocument();
    expect(screen.getByText('Item < > "')).toBeInTheDocument();
    expect(screen.getByText("Item's Quote")).toBeInTheDocument();
  });
  it('combines multiple props correctly', () => {
    const { container } = render(
      <List 
        value={[ 1, 2, 3 ]} 
        ordered 
        className="numbered-list" 
        style={{ marginLeft: '20px' }}
      />
    );
    const list = container.querySelector('ol');
    expect(list?.tagName).toBe('OL');
    expect(list).toHaveClass('frui-view-list', 'numbered-list');
    expect(list).toHaveStyle({ marginLeft: '20px' });
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
  });
});