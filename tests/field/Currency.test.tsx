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
    expect(list).toBeInTheDocument();
    expect(list.tagName).toBe('UL');
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
  });
  
  it('applies custom className correctly', () => {
    render(<List value={items} className="custom-list" />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('custom-list');
  });
  
  it('applies style prop correctly', () => {
    render(
      <List 
        value={items} 
        style={{ color: 'green', margin: '10px' }} 
      />
    );
    const list = screen.getByRole('list');
    expect(list).toHaveStyle({ color: 'rgb(0, 128, 0)' });
    expect(list).toHaveStyle({ margin: '10px' });
  });
  
  it('renders empty list when value array is empty', () => {
    render(<List value={[]} />);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
  
  it('renders numbers as list items', () => {
    const numberItems = [ 1, 2, 3 ];
    render(<List value={numberItems} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems[ 0 ]).toHaveTextContent('1');
    expect(listItems[ 1 ]).toHaveTextContent('2');
    expect(listItems[ 2 ]).toHaveTextContent('3');
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
        className="styled-list" 
        style={{ padding: '20px' }} 
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});