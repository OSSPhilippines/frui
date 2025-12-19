//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties, ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
//frui
import TableFormat from '../../frui/src/format/Table.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/element/Table.js', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <table data-testid="mock-table">{children}</table>
  ),
  Table: ({ children }: { children: ReactNode }) => (
    <table data-testid="mock-table">{children}</table>
  ),
  Thead: ({
    children,
    className,
    style
  }: {
    children: ReactNode,
    className?: string,
    style?: CSSProperties
  }) => (
    <th
      data-testid="mock-thead"
      className={className}
      style={style}
    >
      {children}
    </th>
  ),
  Trow: ({ children }: { children: ReactNode }) => (
    <tr data-testid="mock-trow">{children}</tr>
  ),
  Tcol: ({
    children,
    className,
    style
  }: {
    children: ReactNode,
    className?: string,
    style?: CSSProperties
  }) => (
    <td
      data-testid="mock-tcol"
      className={className}
      style={style}
    >
      {children}
    </td>
  )
}));

//--------------------------------------------------------------------//
// Helpers

const sampleData = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

//--------------------------------------------------------------------//
// Tests

describe('TableFormat', () => {
  it('renders nothing when value is empty', () => {
    const { container } = render(<TableFormat value={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders table with headers and data', () => {
    render(<TableFormat value={sampleData} />);
    
    const headers = screen.getAllByTestId('mock-thead');
    expect(headers).toHaveLength(2);
    expect(headers[ 0 ]).toHaveTextContent('name');
    expect(headers[ 1 ]).toHaveTextContent('age');
    
    const rows = screen.getAllByTestId('mock-trow');
    expect(rows).toHaveLength(2);
    
    const cols = screen.getAllByTestId('mock-tcol');
    expect(cols).toHaveLength(4);
    expect(cols[ 0 ]).toHaveTextContent('Alice');
    expect(cols[ 1 ]).toHaveTextContent('30');
  });

  it('applies stripe styles', () => {
    const stripes: [ string, string, string ] =
      [ '#aaa', '#bbb', '#ccc' ];
    render(<TableFormat value={sampleData} stripes={stripes} />);
    
    const heads = screen.getAllByTestId('mock-thead');
    expect(heads[ 0 ]).toHaveStyle({ backgroundColor: '#aaa' });
    
    const cols = screen.getAllByTestId('mock-tcol');
    expect(cols[ 0 ]).toHaveStyle({ backgroundColor: '#bbb' });
    expect(cols[ 2 ]).toHaveStyle({ backgroundColor: '#ccc' });
  });

  it('applies className and style props', () => {
    render(
      <TableFormat
        value={sampleData}
        className="info-table"
        style={{ color: 'rgb(0, 0, 255)' }}
      />
    );
    
    const headers = screen.getAllByTestId('mock-thead');
    expect(headers[ 0 ]).toHaveClass('info-table');
    expect(headers[ 0 ]).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('renders correct structure within table', () => {
    render(<TableFormat value={sampleData} />);
    
    const table = screen.getByTestId('mock-table');
    const rows = within(table).getAllByTestId('mock-trow');
    const cols = within(table).getAllByTestId('mock-tcol');
    
    expect(rows.length).toBe(2);
    expect(cols.length).toBe(4);
  });
});