//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
//frui
import Table, {
  Tcol,
  Tfoot,
  Tgroup,
  Thead,
  Trow
} from '../../frui/src/element/Table';

//--------------------------------------------------------------------//
// Tests

describe('Table Component', () => {
  describe('basic rendering', () => {
    it('renders table with children', () => {
      render(
        <Table>
          <Trow>
            <Tcol>Cell 1</Tcol>
          </Trow>
        </Table>
      );
      expect(screen.getByText('Cell 1')).toBeInTheDocument();
    });

    it('applies base classes', () => {
      const { container } = render(
        <Table>
          <Trow>
            <Tcol>Test</Tcol>
          </Trow>
        </Table>
      );
      expect(
        container.querySelector('.frui-tbl-overflow')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.frui-tbl')
      ).toBeInTheDocument();
    });

    it('applies custom className to wrapper', () => {
      const { container } = render(
        <Table className="custom-table">
          <Trow>
            <Tcol>Test</Tcol>
          </Trow>
        </Table>
      );
      const wrapper = 
        container.querySelector('.frui-tbl-overflow');
      expect(wrapper).toHaveClass('custom-table');
    });

    it('applies custom styles to wrapper', () => {
      const { container } = render(
        <Table style={{ width: '100%' }}>
          <Trow>
            <Tcol>Test</Tcol>
          </Trow>
        </Table>
      );
      const wrapper = 
        container.querySelector('.frui-tbl-overflow');
      expect(wrapper).toHaveStyle({ width: '100%' });
    });
  });

  describe('Thead component', () => {
    it('renders header cell', () => {
      render(
        <Table>
          <Thead>Header</Thead>
          <Trow>
            <Tcol>Data</Tcol>
          </Trow>
        </Table>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('applies base class', () => {
      render(
        <Table>
          <Thead>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass('frui-tbl-head');
    });

    it('applies custom className', () => {
      render(
        <Table>
          <Thead className="custom-head">Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass('frui-tbl-head', 'custom-head');
    });

    it('applies stickyTop class', () => {
      render(
        <Table>
          <Thead stickyTop>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-t',
        'frui-tbl-z1'
      );
    });

    it('applies stickyLeft class', () => {
      render(
        <Table>
          <Thead stickyLeft>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-l',
        'frui-tbl-z1'
      );
    });

    it('applies stickyRight class', () => {
      render(
        <Table>
          <Thead stickyRight>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-r',
        'frui-tbl-z1'
      );
    });

    it('applies z-index for combined sticky positions', () => {
      render(
        <Table>
          <Thead stickyTop stickyLeft stickyRight>
            Header
          </Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass('frui-tbl-z4');
    });

    it('applies noWrap class', () => {
      render(
        <Table>
          <Thead noWrap>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveClass('frui-tbl-nowrap');
    });

    it('applies rowSpan attribute', () => {
      render(
        <Table>
          <Thead rowSpan={2}>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveAttribute('rowspan', '2');
    });

    it('applies colSpan attribute', () => {
      render(
        <Table>
          <Thead colSpan={3}>Header</Thead>
        </Table>
      );
      const header = screen.getByText('Header');
      expect(header).toHaveAttribute('colspan', '3');
    });

    it('renders wrap rule for wrap1', () => {
      const { container } = render(
        <Table>
          <Thead wrap1>Header</Thead>
        </Table>
      );
      const hr = container.querySelector('hr');
      expect(hr).toBeInTheDocument();
      expect(hr).toHaveStyle({ width: '100px' });
    });

    it('renders wrap rule for wrap3', () => {
      const { container } = render(
        <Table>
          <Thead wrap3>Header</Thead>
        </Table>
      );
      const hr = container.querySelector('hr');
      expect(hr).toHaveStyle({ width: '300px' });
    });
  });

  describe('Tcol component', () => {
    it('renders column cell', () => {
      render(
        <Table>
          <Trow>
            <Tcol>Column</Tcol>
          </Trow>
        </Table>
      );
      expect(screen.getByText('Column')).toBeInTheDocument();
    });

    it('applies base class', () => {
      render(
        <Table>
          <Trow>
            <Tcol>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass('frui-tbl-col');
    });

    it('applies custom className', () => {
      render(
        <Table>
          <Trow>
            <Tcol className="custom-col">Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass('frui-tbl-col', 'custom-col');
    });

    it('applies stickyTop class', () => {
      render(
        <Table>
          <Trow>
            <Tcol stickyTop>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-t',
        'frui-tbl-z1'
      );
    });

    it('applies stickyBottom class', () => {
      render(
        <Table>
          <Trow>
            <Tcol stickyBottom>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-b',
        'frui-tbl-z1'
      );
    });

    it('applies stickyLeft class with z2', () => {
      render(
        <Table>
          <Trow>
            <Tcol stickyLeft>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-l',
        'frui-tbl-z2'
      );
    });

    it('applies stickyRight class with z2', () => {
      render(
        <Table>
          <Trow>
            <Tcol stickyRight>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-r',
        'frui-tbl-z2'
      );
    });

    it('applies noWrap class', () => {
      render(
        <Table>
          <Trow>
            <Tcol noWrap>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveClass('frui-tbl-nowrap');
    });

    it('renders with valign top attribute', () => {
      render(
        <Table>
          <Trow>
            <Tcol>Column</Tcol>
          </Trow>
        </Table>
      );
      const col = screen.getByText('Column');
      expect(col).toHaveAttribute('valign', 'top');
    });

    it('renders wrap rule for wrap2', () => {
      const { container } = render(
        <Table>
          <Trow>
            <Tcol wrap2>Column</Tcol>
          </Trow>
        </Table>
      );
      const hr = container.querySelector('hr');
      expect(hr).toHaveStyle({ width: '200px' });
    });
  });

  describe('Tfoot component', () => {
    it('renders footer cell', () => {
      render(
        <Table>
          <Trow>
            <Tcol>Data</Tcol>
          </Trow>
          <Tfoot>Footer</Tfoot>
        </Table>
      );
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('applies base class', () => {
      render(
        <Table>
          <Tfoot>Footer</Tfoot>
        </Table>
      );
      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass('frui-tbl-foot');
    });

    it('applies stickyBottom class', () => {
      render(
        <Table>
          <Tfoot stickyBottom>Footer</Tfoot>
        </Table>
      );
      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass(
        'frui-tbl-sticky',
        'frui-tbl-sticky-b',
        'frui-tbl-z1'
      );
    });

    it('applies custom className', () => {
      render(
        <Table>
          <Tfoot className="custom-foot">Footer</Tfoot>
        </Table>
      );
      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass('frui-tbl-foot', 'custom-foot');
    });
  });

  describe('Trow component', () => {
    it('renders row', () => {
      render(
        <Table>
          <Trow>
            <Tcol>Cell</Tcol>
          </Trow>
        </Table>
      );
      expect(screen.getByText('Cell')).toBeInTheDocument();
    });

    it('applies base class', () => {
      const { container } = render(
        <Table>
          <Trow>
            <Tcol>Cell</Tcol>
          </Trow>
        </Table>
      );
      const row = container.querySelector('tr.frui-tbl-row');
      expect(row).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(
        <Table>
          <Trow className="custom-row">
            <Tcol>Cell</Tcol>
          </Trow>
        </Table>
      );
      const row = container.querySelector('tr.frui-tbl-row');
      expect(row).toHaveClass('custom-row');
    });

    it('applies noWrap class', () => {
      const { container } = render(
        <Table>
          <Trow noWrap>
            <Tcol>Cell</Tcol>
          </Trow>
        </Table>
      );
      const row = container.querySelector('tr.frui-tbl-row');
      expect(row).toHaveClass('frui-tbl-nowrap');
    });
  });

  describe('Tgroup component', () => {
    it('renders grouped rows', () => {
      render(
        <Table>
          <Tgroup>
            <Trow>
              <Tcol>Row 1</Tcol>
            </Trow>
            <Trow>
              <Tcol>Row 2</Tcol>
            </Trow>
          </Tgroup>
        </Table>
      );
      expect(screen.getByText('Row 1')).toBeInTheDocument();
      expect(screen.getByText('Row 2')).toBeInTheDocument();
    });
  });

  describe('table structure', () => {
    it('organizes headers in thead', () => {
      const { container } = render(
        <Table>
          <Thead>Header</Thead>
          <Trow>
            <Tcol>Data</Tcol>
          </Trow>
        </Table>
      );
      const thead = container.querySelector('thead');
      expect(thead).toBeInTheDocument();
      expect(thead?.textContent).toBe('Header');
    });

    it('organizes rows in tbody', () => {
      const { container } = render(
        <Table>
          <Trow>
            <Tcol>Data</Tcol>
          </Trow>
        </Table>
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
      expect(tbody?.textContent).toBe('Data');
    });

    it('organizes footers in tfoot', () => {
      const { container } = render(
        <Table>
          <Trow>
            <Tcol>Data</Tcol>
          </Trow>
          <Tfoot>Footer</Tfoot>
        </Table>
      );
      const tfoot = container.querySelector('tfoot');
      expect(tfoot).toBeInTheDocument();
      expect(tfoot?.textContent).toBe('Footer');
    });

    it('handles complex table structure', () => {
      render(
        <Table>
          <Thead>Name</Thead>
          <Thead>Age</Thead>
          <Trow>
            <Tcol>John</Tcol>
            <Tcol>30</Tcol>
          </Trow>
          <Trow>
            <Tcol>Jane</Tcol>
            <Tcol>25</Tcol>
          </Trow>
          <Tfoot>Total</Tfoot>
        </Table>
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Total')).toBeInTheDocument();
    });
  });
});