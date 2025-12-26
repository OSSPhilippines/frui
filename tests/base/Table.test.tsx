//--------------------------------------------------------------------//
// Imports

//frui
import Table from '../../src/base/Table.js';
//tests
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Helpers

const renderTable = (props: Record<string, unknown> = {}) =>
  render(
    <Table {...props}>
      <Table.Head>Header 1</Table.Head>
      <Table.Head>Header 2</Table.Head>
      <Table.Row>
        <Table.Col>R1 C1</Table.Col>
        <Table.Col>R1 C2</Table.Col>
      </Table.Row>
      <Table.Row>
        <Table.Col>R2 C1</Table.Col>
        <Table.Col>R2 C2</Table.Col>
      </Table.Row>
      <Table.Foot>Footer 1</Table.Foot>
      <Table.Foot>Footer 2</Table.Foot>
    </Table>
  );

//--------------------------------------------------------------------//
// Tests

describe('Table', () => {
  it('renders base structure with thead, tbody, tfoot', () => {
    renderTable();
    const wrapper = document.querySelector('.frui-table-overflow');
    expect(wrapper).toBeInTheDocument();
    const table = wrapper?.querySelector('table');
    expect(table).toHaveClass('frui-table');
    expect(table?.querySelector('thead')).toBeInTheDocument();
    expect(table?.querySelector('tbody')).toBeInTheDocument();
    expect(table?.querySelector('tfoot')).toBeInTheDocument();
  });

  it('renders headers, rows, and content correctly', () => {
    renderTable();
    expect(screen.getByText(/Header\s*1/i)).toBeInTheDocument();
    expect(screen.getByText(/Header\s*2/i)).toBeInTheDocument();
    expect(screen.getByText(/R1\s*C1/i)).toBeInTheDocument();
    expect(screen.getByText(/R2\s*C2/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer\s*1/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer\s*2/i)).toBeInTheDocument();
  });

  it('assigns correct base classes to elements', () => {
    renderTable();
    const ths = Array.from(document.querySelectorAll('th'));
    expect(
      ths.some(th => th.classList.contains('frui-table-head'))
    ).toBe(true);
    expect(
      ths.some(th => th.classList.contains('frui-table-foot'))
    ).toBe(true);
    document.querySelectorAll('tbody tr').forEach(tr =>
      expect(tr).toHaveClass('frui-table-row')
    );
    document.querySelectorAll('td').forEach(td =>
      expect(td).toHaveClass('frui-table-col')
    );
  });

  it('applies custom className and style to root', () => {
    renderTable({
      className: 'extra-class',
      style: { border: '1px solid red' }
    });
    const root = document.querySelector('.frui-table-overflow');
    expect(root).toHaveClass('extra-class');
    expect(root?.getAttribute('style') || '').toContain('border');
  });

  it('applies sticky and nowrap classes to columns', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col noWrap stickyLeft stickyTop>
            Cell
          </Table.Col>
        </Table.Row>
      </Table>
    );
    const cell = screen.getByText('Cell');
    expect(cell).toHaveClass('frui-table-sticky');
    expect(cell).toHaveClass('frui-table-sticky-l');
    expect(cell).toHaveClass('frui-table-sticky-t');
    expect(cell).toHaveClass('frui-table-nowrap');
  });

  it('applies correct z-index for sticky positioning', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col stickyTop>Top</Table.Col>
          <Table.Col stickyLeft>Left</Table.Col>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('Top')).toHaveClass('frui-table-z1');
    expect(screen.getByText('Left')).toHaveClass('frui-table-z2');
  });

  it('renders invisible width rules for wrap props', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col wrap3>WidthCell</Table.Col>
        </Table.Row>
      </Table>
    );
    const rule = screen.getByRole('separator');
    expect(rule).toHaveStyle({ width: '300px' });
  });

  it('applies colSpan and rowSpan attributes', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col colSpan={2} rowSpan={3}>Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    const cell = screen.getByText('Cell');
    expect(cell).toHaveAttribute('colspan', '2');
    expect(cell).toHaveAttribute('rowspan', '3');
  });

  it('applies context column slot as className', () => {
    render(
      <Table column="custom-col">
        <Table.Row>
          <Table.Col>Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('Cell')).toHaveClass('custom-col');
  });

  it('applies column slot from array for striping', () => {
    render(
      <Table column={[ 'stripe-0', 'stripe-1' ]}>
        <Table.Row index={0}>
          <Table.Col>C0</Table.Col>
        </Table.Row>
        <Table.Row index={1}>
          <Table.Col>C1</Table.Col>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('C0')).toHaveClass('stripe-0');
    expect(screen.getByText('C1')).toHaveClass('stripe-1');
  });

  it('overrides table column with row column prop', () => {
    render(
      <Table column="table-col">
        <Table.Row column="row-col">
          <Table.Col>Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    const cell = screen.getByText('Cell');
    expect(cell).toHaveClass('row-col');
    expect(cell).not.toHaveClass('table-col');
  });

  it('applies head slot as className', () => {
    render(
      <Table head="custom-head">
        <Table.Head>Header</Table.Head>
      </Table>
    );
    expect(screen.getByText('Header')).toHaveClass('custom-head');
  });

  it('applies foot slot as className', () => {
    render(
      <Table foot="custom-foot">
        <Table.Foot>Footer</Table.Foot>
      </Table>
    );
    expect(screen.getByText('Footer')).toHaveClass('custom-foot');
  });

  it('applies addClassName and addStyle to columns', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col
            addClassName="extra"
            addStyle={{ padding: '10px' }}
          >
            Cell
          </Table.Col>
        </Table.Row>
      </Table>
    );
    const cell = screen.getByText('Cell');
    expect(cell).toHaveClass('extra');
    expect(cell).toHaveStyle({ padding: '10px' });
  });

  it('applies addClassName and addStyle to heads', () => {
    render(
      <Table>
        <Table.Head
          addClassName="extra"
          addStyle={{ fontWeight: 'bold' }}
        >
          Header
        </Table.Head>
      </Table>
    );
    const head = screen.getByText('Header');
    expect(head).toHaveClass('extra');
    expect(head).toHaveStyle({ fontWeight: 'bold' });
  });

  it('applies addClassName and addStyle to foots', () => {
    render(
      <Table>
        <Table.Foot
          addClassName="extra"
          addStyle={{ fontStyle: 'italic' }}
        >
          Footer
        </Table.Foot>
      </Table>
    );
    const foot = screen.getByText('Footer');
    expect(foot).toHaveClass('extra');
    expect(foot).toHaveStyle({ fontStyle: 'italic' });
  });

  it('handles TableGroup with multiple rows', () => {
    render(
      <Table>
        <Table.Group>
          <Table.Row>
            <Table.Col>G1</Table.Col>
          </Table.Row>
          <Table.Row>
            <Table.Col>G2</Table.Col>
          </Table.Row>
        </Table.Group>
      </Table>
    );
    expect(screen.getByText('G1')).toBeInTheDocument();
    expect(screen.getByText('G2')).toBeInTheDocument();
  });

  it('applies all sticky classes to TableHead', () => {
    render(
      <Table>
        <Table.Head stickyTop stickyLeft stickyRight>
          Sticky
        </Table.Head>
      </Table>
    );
    const head = screen.getByText('Sticky');
    expect(head).toHaveClass('frui-table-sticky');
    expect(head).toHaveClass('frui-table-sticky-t');
    expect(head).toHaveClass('frui-table-sticky-l');
    expect(head).toHaveClass('frui-table-sticky-r');
    expect(head).toHaveClass('frui-table-z4');
  });

  it('applies z3 to sticky top with left/right on head', () => {
    render(
      <Table>
        <Table.Head stickyTop stickyLeft>Header</Table.Head>
      </Table>
    );
    expect(screen.getByText('Header')).toHaveClass('frui-table-z3');
  });

  it('applies all sticky classes to TableFoot', () => {
    render(
      <Table>
        <Table.Foot stickyBottom stickyLeft stickyRight>
          Sticky
        </Table.Foot>
      </Table>
    );
    const foot = screen.getByText('Sticky');
    expect(foot).toHaveClass('frui-table-sticky');
    expect(foot).toHaveClass('frui-table-sticky-b');
    expect(foot).toHaveClass('frui-table-sticky-l');
    expect(foot).toHaveClass('frui-table-sticky-r');
    expect(foot).toHaveClass('frui-table-z4');
  });

  it('applies z3 to sticky bottom with left/right on foot', () => {
    render(
      <Table>
        <Table.Foot stickyBottom stickyLeft>Footer</Table.Foot>
      </Table>
    );
    expect(screen.getByText('Footer')).toHaveClass('frui-table-z3');
  });

  it('applies colSpan to TableHead', () => {
    render(
      <Table>
        <Table.Head colSpan={3}>Header</Table.Head>
      </Table>
    );
    expect(screen.getByText('Header')).toHaveAttribute(
      'colspan',
      '3'
    );
  });

  it('applies colSpan to TableFoot', () => {
    render(
      <Table>
        <Table.Foot colSpan={2}>Footer</Table.Foot>
      </Table>
    );
    expect(screen.getByText('Footer')).toHaveAttribute(
      'colspan',
      '2'
    );
  });

  it('renders wrap rule in TableHead', () => {
    const { container } = render(
      <Table>
        <Table.Head wrap2>Header</Table.Head>
      </Table>
    );
    const rule = container.querySelector('th hr');
    expect(rule).toHaveStyle({ width: '200px' });
  });

  it('renders wrap rule in TableFoot', () => {
    const { container } = render(
      <Table>
        <Table.Foot wrap1>Footer</Table.Foot>
      </Table>
    );
    const rule = container.querySelector('th hr');
    expect(rule).toHaveStyle({ width: '100px' });
  });

  it('applies noWrap to TableHead', () => {
    render(
      <Table>
        <Table.Head noWrap>Header</Table.Head>
      </Table>
    );
    expect(screen.getByText('Header')).toHaveClass(
      'frui-table-nowrap'
    );
  });

  it('applies noWrap to TableFoot', () => {
    render(
      <Table>
        <Table.Foot noWrap>Footer</Table.Foot>
      </Table>
    );
    expect(screen.getByText('Footer')).toHaveClass(
      'frui-table-nowrap'
    );
  });

  it('applies direct className over context for TableHead', () => {
    render(
      <Table head="context-head">
        <Table.Head className="direct-head">Header</Table.Head>
      </Table>
    );
    const head = screen.getByText('Header');
    expect(head).toHaveClass('direct-head');
    expect(head).not.toHaveClass('context-head');
  });

  it('applies direct className over context for TableFoot', () => {
    render(
      <Table foot="context-foot">
        <Table.Foot className="direct-foot">Footer</Table.Foot>
      </Table>
    );
    const foot = screen.getByText('Footer');
    expect(foot).toHaveClass('direct-foot');
    expect(foot).not.toHaveClass('context-foot');
  });

  it('passes through HTML attributes to TableCol', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col data-testid="col" title="tip">
            Cell
          </Table.Col>
        </Table.Row>
      </Table>
    );
    const col = screen.getByTestId('col');
    expect(col).toHaveAttribute('title', 'tip');
  });

  it('handles empty Table', () => {
    const { container } = render(<Table />);
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
  });

  it('handles nested arrays in children', () => {
    const rows = [
      [
        <Table.Row key="1">
          <Table.Col>R1</Table.Col>
        </Table.Row>,
        <Table.Row key="2">
          <Table.Col>R2</Table.Col>
        </Table.Row>
      ]
    ];
    render(<Table>{rows}</Table>);
    expect(screen.getByText('R1')).toBeInTheDocument();
    expect(screen.getByText('R2')).toBeInTheDocument();
  });

  it('applies style prop to TableRow', () => {
    render(
      <Table>
        <Table.Row style={{ opacity: 0.5 }}>
          <Table.Col>Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    const row = screen.getByText('Cell').closest('tr');
    expect(row).toHaveStyle({ opacity: '0.5' });
  });

  it('applies className prop to TableRow', () => {
    render(
      <Table>
        <Table.Row className="custom-row">
          <Table.Col>Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    const row = screen.getByText('Cell').closest('tr');
    expect(row).toHaveClass('custom-row');
  });

  it('applies direct className to TableCol', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col className="custom">Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('Cell')).toHaveClass('custom');
  });

  it('applies direct style to TableCol', () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col style={{ margin: '5px' }}>Cell</Table.Col>
        </Table.Row>
      </Table>
    );
    expect(screen.getByText('Cell')).toHaveStyle({ margin: '5px' });
  });
});