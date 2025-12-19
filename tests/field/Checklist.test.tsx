//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Checklist, {
  ChecklistItem,
  useChecklistItem
} from '../../frui/src/field/Checklist.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithChecklistItem(
  config: Parameters<typeof useChecklistItem>[ 0 ]
) {
  let hookResult: ReturnType<typeof useChecklistItem> | undefined;
  function TestHook() {
    hookResult = useChecklistItem(config);
    return <div data-testid="hook" />;
  }
  const { rerender } = render(<TestHook />);
  return {
    getHook: () => hookResult!,
    rerender: () => rerender(<TestHook />)
  };
}

//--------------------------------------------------------------------//
// Tests

describe('useChecklistItem Hook', () => {
  it('initializes with defaultChecked', () => {
    const { getHook } = renderHookWithChecklistItem({
      defaultChecked: true,
      value: 'test'
    });
    const hook = getHook();
    expect(hook.isChecked).toBe(true);
  });

  it('calls onChange and onUpdate on change', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { getHook } = renderHookWithChecklistItem({
      onChange,
      onUpdate,
      value: 'test'
    });
    const hook = getHook();

    const event = {
      target: { checked: true }
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      hook.handlers.change(event);
    });

    expect(onChange).toHaveBeenCalledWith(event);
    expect(onUpdate).toHaveBeenCalledWith('test', true);
  });
});

describe('<ChecklistItem />', () => {
  it('renders with label', () => {
    render(<ChecklistItem label="Test" value="test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies checked state', () => {
    render(<ChecklistItem checked label="Test" value="test" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('handles click event', () => {
    const onChange = vi.fn();
    render(
      <ChecklistItem label="Test" onChange={onChange} value="test" />
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith('test', true);
  });

  it('applies error styling', () => {
    render(<ChecklistItem error label="Test" value="test" />);
    const input = screen.getByRole('checkbox');
    expect(input).toHaveStyle({ accentColor: 'red' });
  });

  it('applies disabled state', () => {
    render(<ChecklistItem disabled label="Test" value="test" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});

describe('<Checklist />', () => {
  it('renders items', () => {
    render(
      <Checklist name="test">
        <ChecklistItem label="Item 1" value="1" />
        <ChecklistItem label="Item 2" value="2" />
      </Checklist>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('handles selection', async () => {
    const onChange = vi.fn();
    render(
      <Checklist name="test" onChange={onChange}>
        <ChecklistItem label="Item" value="1" />
      </Checklist>
    );
    fireEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([ '1' ]);
    });
  });

  it('applies default values', () => {
    render(
      <Checklist defaultValue={[ '1' ]} name="test">
        <ChecklistItem label="Item 1" value="1" />
        <ChecklistItem label="Item 2" value="2" />
      </Checklist>
    );
    const items = screen.getAllByRole('checkbox');
    expect(items[ 0 ]).toBeChecked();
    expect(items[ 1 ]).not.toBeChecked();
  });

  it('applies defaultChecked from items', () => {
    render(
      <Checklist name="test">
        <ChecklistItem defaultChecked label="Item 1" value="1" />
        <ChecklistItem label="Item 2" value="2" />
      </Checklist>
    );
    const items = screen.getAllByRole('checkbox');
    expect(items[ 0 ]).toBeChecked();
    expect(items[ 1 ]).not.toBeChecked();
  });

  it('applies orientation', () => {
    const { container } = render(
      <Checklist name="test" orientation="column">
        <ChecklistItem label="Item" value="1" />
      </Checklist>
    );
    const wrapper = container.querySelector('.checklist');
    expect(wrapper).toHaveStyle({ flexDirection: 'column' });
  });

  it('applies error state to all items', () => {
    render(
      <Checklist error name="test">
        <ChecklistItem label="Item" value="1" />
      </Checklist>
    );
    expect(screen.getByRole('checkbox')).toHaveStyle({
      accentColor: 'red'
    });
  });

  it('applies disabled state', () => {
    render(
      <Checklist disabled name="test">
        <ChecklistItem label="Item" value="1" />
      </Checklist>
    );
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('calls onUpdate when item is selected', async () => {
    const onUpdate = vi.fn();
    render(
      <Checklist name="test" onUpdate={onUpdate}>
        <ChecklistItem label="Item" value="1" />
      </Checklist>
    );
    fireEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith('1', true);
    });
  });
});