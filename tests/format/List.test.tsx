//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import List from '../../frui/src/format/List.js';

//--------------------------------------------------------------------//
// Helpers

const items = [ 'Apple', 'Banana', 'Cherry' ];

//--------------------------------------------------------------------//
// Tests

describe('List component', () => {
  it('renders an unordered list (<ul>) by default', () => {
    render(<List value={items} />);
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('UL');
    expect(list).toHaveClass('frui-format-list');
  });

  it('renders an ordered list (<ol>) when ordered=true', () => {
    render(<List value={items} ordered />);
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
  });

  it('renders correct number of list items', () => {
    render(<List value={items} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(items.length);
    listItems.forEach((item, index) => {
      expect(item).toHaveTextContent(items[ index ]);
    });
  });

  it('applies custom className correctly', () => {
    render(<List value={items} className="my-list" />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('frui-format-list');
    expect(list).toHaveClass('my-list');
  });

  it('applies style prop correctly', () => {
    const style = { color: 'rgb(0, 128, 0)', margin: '10px' };
    render(<List value={items} style={style} />);
    const list = screen.getByRole('list');
    expect(list).toHaveStyle(style);
  });

  it('renders empty list when value array is empty', () => {
    render(<List value={[]} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('renders numbers as list items', () => {
    const numericValues = [ 1, 2, 3 ];
    render(<List value={numericValues} />);
    const listItems = screen.getAllByRole('listitem');
    numericValues.forEach((num, index) => {
      expect(listItems[ index ]).toHaveTextContent(String(num));
    });
  });

  it('matches snapshot for unordered list', () => {
    const { container } = render(<List value={items} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot for ordered list', () => {
    const { container } = render(<List value={items} ordered />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot with custom class and style', () => {
    const { container } = render(
      <List
        value={items}
        ordered
        className="custom-list"
        style={{ fontSize: '14px' }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});