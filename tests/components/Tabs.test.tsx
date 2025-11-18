import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Tabs from "../../components/Tabs"; // Adjust path if needed

// Helper render function
const setup = (props: any = {}) => (
  <Tabs defaultValue="tab1" {...props}>
    <Tabs.Head>
      <Tabs.Label value="tab1">Tab 1</Tabs.Label>
      <Tabs.Label value="tab2">Tab 2</Tabs.Label>
    </Tabs.Head>
    <Tabs.Body>
      <Tabs.Content value="tab1">Content 1</Tabs.Content>
      <Tabs.Content value="tab2">Content 2</Tabs.Content>
    </Tabs.Body>
  </Tabs>
);

describe("Tabs component", () => {
  it("renders correctly with default active tab", () => {
    render(setup());

    const root = document.querySelector(".frui-tabs");
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("frui-tabs");

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("changes active tab on click (uncontrolled)", () => {
    render(setup());

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 2"));

    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });

  it("calls onChange when a tab label is clicked", () => {
    const onChange = vi.fn();
    render(setup({ onChange }));

    fireEvent.click(screen.getByText("Tab 2"));
    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("respects value prop in controlled mode", () => {
    const { rerender } = render(setup({ value: "tab1", onChange: vi.fn() }));

    expect(screen.getByText("Content 1")).toBeInTheDocument();

    rerender(
      <Tabs value="tab2" onChange={vi.fn()}>
        <Tabs.Head>
          <Tabs.Label value="tab1">Tab 1</Tabs.Label>
          <Tabs.Label value="tab2">Tab 2</Tabs.Label>
        </Tabs.Head>
        <Tabs.Body>
          <Tabs.Content value="tab1">Content 1</Tabs.Content>
          <Tabs.Content value="tab2">Content 2</Tabs.Content>
        </Tabs.Body>
      </Tabs>
    );

    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("renders Tabs.Active and Tabs.Inactive properly", () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.Head>
          <Tabs.Label value="tab1">
            Tab 1
            <Tabs.Active data-testid="active1">Active</Tabs.Active>
            <Tabs.Inactive data-testid="inactive1">Inactive</Tabs.Inactive>
          </Tabs.Label>
          <Tabs.Label value="tab2">
            Tab 2
            <Tabs.Active data-testid="active2">Active</Tabs.Active>
            <Tabs.Inactive data-testid="inactive2">Inactive</Tabs.Inactive>
          </Tabs.Label>
        </Tabs.Head>
      </Tabs>
    );

    expect(screen.getByTestId("active1")).toBeInTheDocument();
    expect(screen.queryByTestId("active2")).not.toBeInTheDocument();

    expect(screen.queryByTestId("inactive1")).not.toBeInTheDocument();
    expect(screen.getByTestId("inactive2")).toBeInTheDocument();
  });
});