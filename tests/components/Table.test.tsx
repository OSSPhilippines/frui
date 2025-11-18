import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Table from "../../components/Table"; // adjust if needed

// --------------------------------------------------------------------
// Helper renderer
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// Component Tests
// --------------------------------------------------------------------
describe("Table component", () => {
  it("renders base structure", () => {
    renderTable();
    const wrapper = document.querySelector(".frui-table-overflow");
    expect(wrapper).toBeInTheDocument();

    const table = wrapper?.querySelector("table");
    expect(table).toHaveClass("frui-table");
    expect(table?.querySelector("thead")).toBeInTheDocument();
    expect(table?.querySelector("tbody")).toBeInTheDocument();
    expect(table?.querySelector("tfoot")).toBeInTheDocument();
  });

  it("renders headers, rows, and content correctly", () => {
    renderTable();

    expect(screen.getByText(/Header\s*1/i)).toBeInTheDocument();
    expect(screen.getByText(/Header\s*2/i)).toBeInTheDocument();
    expect(screen.getByText(/R1\s*C1/i)).toBeInTheDocument();
    expect(screen.getByText(/R2\s*C2/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer\s*1/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer\s*2/i)).toBeInTheDocument();
  });

  it("assigns correct base classes to elements", () => {
    renderTable();

    // Header
    const ths = Array.from(document.querySelectorAll("th"));
    expect(ths.some(th => th.classList.contains("frui-table-head"))).toBe(true);
    expect(ths.some(th => th.classList.contains("frui-table-foot"))).toBe(true);

    // Row
    document.querySelectorAll("tbody tr").forEach(tr =>
      expect(tr).toHaveClass("frui-table-row")
    );

    // Columns/Cells
    document.querySelectorAll("td").forEach(td =>
      expect(td).toHaveClass("frui-table-col")
    );
  });

  it("applies custom className and inline style to root div", () => {
    renderTable({ className: "extra-class", style: { border: "1px solid red" } });
    const root = document.querySelector(".frui-table-overflow");
    expect(root).toHaveClass("extra-class");
    expect(root?.getAttribute("style") || "").toContain("border");
  });

  it("adds sticky & nowrap classes to a column when relevant props are set", () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col stickyLeft stickyTop noWrap>
            Cell
          </Table.Col>
        </Table.Row>
      </Table>
    );
    const cell = screen.getByText("Cell");
    expect(cell).toHaveClass("frui-table-sticky");
    expect(cell).toHaveClass("frui-table-sticky-l");
    expect(cell).toHaveClass("frui-table-sticky-t");
    expect(cell).toHaveClass("frui-table-nowrap");
  });

  it("renders invisible width rule element for wrap props", () => {
    render(
      <Table>
        <Table.Row>
          <Table.Col wrap3>WidthCell</Table.Col>
        </Table.Row>
      </Table>
    );
    const rule = screen.getByRole("separator");
    expect(rule).toHaveStyle({ width: "300px" });
  });
});