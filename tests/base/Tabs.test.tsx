//--------------------------------------------------------------------//
// Imports

//frui
import Tabs from '../../src/base/Tabs.js';
//modules
import type { TabsProps } from '../../src/base/Tabs.js';
//tests
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

//--------------------------------------------------------------------//
// Helpers

const setup = (props: Partial<TabsProps> = {}) => (
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

//--------------------------------------------------------------------//
// Tests

describe('<Tabs />', () => {
  it('renders correctly with default active tab', () => {
    render(setup());
    const root = document.querySelector('.frui-tabs');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass('frui-tabs');
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('changes active tab on click in uncontrolled mode', () => {
    render(setup());
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('calls onChange when a tab label is clicked', () => {
    const onChange = vi.fn();
    render(setup({ onChange }));
    fireEvent.click(screen.getByText('Tab 2'));
    expect(onChange).toHaveBeenCalledWith('tab2');
  });

  it('respects value prop in controlled mode', () => {
    const { rerender } = render(
      setup({ value: 'tab1', onChange: vi.fn() })
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
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
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('renders Tabs.Active and Tabs.Inactive properly', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.Head>
          <Tabs.Label value="tab1">
            Tab 1
            <Tabs.Active data-testid="active1">Active</Tabs.Active>
            <Tabs.Inactive data-testid="inactive1">
              Inactive
            </Tabs.Inactive>
          </Tabs.Label>
          <Tabs.Label value="tab2">
            Tab 2
            <Tabs.Active data-testid="active2">Active</Tabs.Active>
            <Tabs.Inactive data-testid="inactive2">
              Inactive
            </Tabs.Inactive>
          </Tabs.Label>
        </Tabs.Head>
      </Tabs>
    );
    expect(screen.getByTestId('active1')).toBeInTheDocument();
    expect(screen.queryByTestId('active2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('inactive1')).not.toBeInTheDocument();
    expect(screen.getByTestId('inactive2')).toBeInTheDocument();
  });

  it('applies custom className to root element', () => {
    render(setup({ className: 'custom-tabs' }));
    const root = document.querySelector('.frui-tabs');
    expect(root).toHaveClass('frui-tabs');
    expect(root).toHaveClass('custom-tabs');
  });

  it('applies custom styles to root element', () => {
    render(
      <Tabs defaultValue="tab1" style={{ backgroundColor: 'blue' }}>
        <Tabs.Head>
          <Tabs.Label value="tab1">Tab 1</Tabs.Label>
        </Tabs.Head>
      </Tabs>
    );
    const root = document.querySelector('.frui-tabs');
    expect(root).toHaveAttribute('style');
  });

  it('renders TabsHead with correct class', () => {
    render(setup());
    const head = document.querySelector('.frui-tabs-head');
    expect(head).toBeInTheDocument();
    expect(head?.tagName).toBe('HEADER');
  });

  it('renders TabsBody with correct class', () => {
    render(setup());
    const body = document.querySelector('.frui-tabs-body');
    expect(body).toBeInTheDocument();
    expect(body?.tagName).toBe('MAIN');
  });

  it('applies data-active attribute to active tab label', () => {
    render(setup());
    const tab1 = 
      screen.getByText('Tab 1').closest('[ data-active ]');
    const tab2 = 
      screen.getByText('Tab 2').closest('[ data-active ]');
    expect(tab1).toHaveAttribute('data-active', 'true');
    expect(tab2).toHaveAttribute('data-active', 'false');
  });

  it('updates data-active attribute when tab changes', () => {
    render(setup());
    const tab2 = screen.getByText('Tab 2').closest('[ data-active ]');
    expect(tab2).toHaveAttribute('data-active', 'false');
    fireEvent.click(screen.getByText('Tab 2'));
    expect(tab2).toHaveAttribute('data-active', 'true');
  });

  it('applies frui-tabs-label-active class to active tab', () => {
    render(setup());
    const tab1 = 
      screen.getByText('Tab 1').closest('.frui-tabs-label');
    const tab2 = 
      screen.getByText('Tab 2').closest('.frui-tabs-label');
    expect(tab1).toHaveClass('frui-tabs-label-active');
    expect(tab2).not.toHaveClass('frui-tabs-label-active');
  });

  it('children fn gets active state in Label', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.Head>
          <Tabs.Label value="tab1">
            {({ active }) => (
              <span data-testid="tab1-state">
                {active ? 'Active' : 'Inactive'}
              </span>
            )}
          </Tabs.Label>
        </Tabs.Head>
      </Tabs>
    );
    expect(screen.getByTestId('tab1-state')).toHaveTextContent(
      'Active'
    );
  });

  it('does not render content when value does not match', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.Body>
          <Tabs.Content value="tab3">Content 3</Tabs.Content>
        </Tabs.Body>
      </Tabs>
    );
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });

  it('handles undefined value in TabsLabel', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.Head>
          <Tabs.Label>No Value Label</Tabs.Label>
        </Tabs.Head>
      </Tabs>
    );
    const label = screen.getByText('No Value Label');
    expect(label).toBeInTheDocument();
    fireEvent.click(label);
  });

  it('handles undefined value in TabsContent', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.Body>
          <Tabs.Content>No Value Content</Tabs.Content>
        </Tabs.Body>
      </Tabs>
    );
    expect(
      screen.queryByText('No Value Content')
    ).not.toBeInTheDocument();
  });
});