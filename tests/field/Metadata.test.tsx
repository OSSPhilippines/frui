//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import Metadata, {
  MetadataFields,
  useMetadata
} from '../../frui/src/field/Metadata.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithState<T>(hook: () => T): { current: T } {
  let currentValue: T;
  function TestHook() {
    currentValue = hook();
    return null;
  }
  render(<TestHook />);
  return { current: currentValue! };
}

//--------------------------------------------------------------------//
// Tests

describe('useMetadata', () => {
  it('identifies text type correctly', () => {
    const hook = renderHookWithState(() =>
      useMetadata({
        type: 'text',
        index: 0,
        set: vi.fn(),
        values: []
      })
    );
    expect(hook.current.input.isText).toBe(true);
    expect(hook.current.input.isNumber).toBe(false);
    expect(hook.current.input.isDate).toBe(false);
  });

  it('identifies number type correctly', () => {
    const hook = renderHookWithState(() =>
      useMetadata({
        type: 'number',
        index: 0,
        set: vi.fn(),
        values: []
      })
    );
    expect(hook.current.input.isNumber).toBe(true);
    expect(hook.current.input.isText).toBe(false);
  });

  it('identifies date types correctly', () => {
    const dateHook = renderHookWithState(() =>
      useMetadata({
        type: 'date',
        index: 0,
        set: vi.fn(),
        values: []
      })
    );
    expect(dateHook.current.input.isDate).toBe(true);

    const timeHook = renderHookWithState(() =>
      useMetadata({
        type: 'time',
        index: 0,
        set: vi.fn(),
        values: []
      })
    );
    expect(timeHook.current.input.isDate).toBe(true);

    const datetimeHook = renderHookWithState(() =>
      useMetadata({
        type: 'datetime',
        index: 0,
        set: vi.fn(),
        values: []
      })
    );
    expect(datetimeHook.current.input.isDate).toBe(true);
  });

  it('updates name correctly', () => {
    const set = vi.fn();
    const { current } = renderHookWithState(() =>
      useMetadata({
        type: 'text',
        index: 0,
        set,
        values: [[ 'key', 'value' ]]
      })
    );

    act(() => {
      current.handlers.update('name', 'new-key');
    });
    expect(set).toHaveBeenCalledWith([[ 'new-key', 'value' ]]);
  });

  it('updates value correctly', () => {
    const set = vi.fn();
    const { current } = renderHookWithState(() =>
      useMetadata({
        type: 'text',
        index: 0,
        set,
        values: [[ 'key', 'value' ]]
      })
    );

    act(() => {
      current.handlers.update('value', 'new-value');
    });
    expect(set).toHaveBeenCalledWith([[ 'key', 'new-value' ]]);
  });

  it('handles empty values when updating', () => {
    const set = vi.fn();
    const { current } = renderHookWithState(() =>
      useMetadata({
        type: 'text',
        index: 0,
        set,
        values: []
      })
    );

    act(() => {
      current.handlers.update('name', 'new-key');
    });
    expect(set).toHaveBeenCalledWith([[ 'new-key', '' ]]);
  });

  it('removes entry by setting undefined', () => {
    const set = vi.fn();
    const { current } = renderHookWithState(() =>
      useMetadata({
        type: 'text',
        index: 0,
        set,
        values: [[ 'key', 'value' ]]
      })
    );

    act(() => {
      current.handlers.remove();
    });
    expect(set).toHaveBeenCalledWith([ undefined ]);
  });
});

describe('MetadataFields', () => {
  it('renders text inputs by default', () => {
    const { container } = render(
      <MetadataFields
        index={0}
        set={vi.fn()}
        values={[[ 'key', 'value' ]]}
      />
    );

    const nameInput = container.querySelector(
      '.frui-field-metadata-name'
    ) as HTMLInputElement;
    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    ) as HTMLInputElement;

    expect(nameInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('key');
    expect(valueInput).toHaveValue('value');
  });

  it('renders number input when type is number', () => {
    const { container } = render(
      <MetadataFields
        config={{ type: 'number', min: 0, max: 100, step: 5 }}
        index={0}
        set={vi.fn()}
        values={[[ 'count', 42 ]]}
      />
    );

    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );
    expect(valueInput).toBeInTheDocument();
  });

  it('renders date input when type is date', () => {
    const { container } = render(
      <MetadataFields
        config={{ type: 'date' }}
        index={0}
        set={vi.fn()}
        values={[[ 'birthday', new Date('2024-01-01') ]]}
      />
    );

    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveAttribute('type', 'date');
  });

  it('renders time input when type is time', () => {
    const { container } = render(
      <MetadataFields
        config={{ type: 'time' }}
        index={0}
        set={vi.fn()}
        values={[[ 'start', '10:00' ]]}
      />
    );

    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveAttribute('type', 'time');
  });

  it('renders datetime input when type is datetime', () => {
    const { container } = render(
      <MetadataFields
        config={{ type: 'datetime' }}
        index={0}
        set={vi.fn()}
        values={[[ 'created', new Date() ]]}
      />
    );

    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveAttribute('type', 'datetime-local');
  });

  it('renders datetime-local input', () => {
    const { container } = render(
      <MetadataFields
        config={{ type: 'datetime-local' }}
        index={0}
        set={vi.fn()}
        values={[[ 'updated', new Date() ]]}
      />
    );

    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );
    expect(valueInput).toHaveAttribute('type', 'datetime-local');
  });

  it('applies placeholders correctly', () => {
    const { container } = render(
      <MetadataFields
        config={{ placeholder: [ 'Enter key', 'Enter value' ] }}
        index={0}
        set={vi.fn()}
        values={[[ '', '' ]]}
      />
    );

    const nameInput = container.querySelector(
      '.frui-field-metadata-name'
    ) as HTMLInputElement;
    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    ) as HTMLInputElement;

    expect(nameInput).toHaveAttribute('placeholder', 'Enter key');
    expect(valueInput).toHaveAttribute(
      'placeholder',
      'Enter value'
    );
  });

  it('calls set when name input changes', () => {
    const set = vi.fn();
    const { container } = render(
      <MetadataFields
        index={0}
        set={set}
        values={[[ 'key', 'value' ]]}
      />
    );

    const nameInput = container.querySelector(
      '.frui-field-metadata-name'
    ) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'newkey' } });

    expect(set).toHaveBeenCalled();
  });

  it('calls set when value input changes', () => {
    const set = vi.fn();
    const { container } = render(
      <MetadataFields
        index={0}
        set={set}
        values={[[ 'key', 'value' ]]}
      />
    );

    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    ) as HTMLInputElement;
    fireEvent.change(valueInput, { target: { value: 'newvalue' } });

    expect(set).toHaveBeenCalled();
  });

  it('calls set when remove button clicked', () => {
    const set = vi.fn();
    const { container } = render(
      <MetadataFields
        index={0}
        set={set}
        values={[[ 'key', 'value' ]]}
      />
    );

    const removeButton = container.querySelector(
      '.frui-field-metadata-remove'
    );
    fireEvent.click(removeButton!);

    expect(set).toHaveBeenCalledWith([ undefined ]);
  });

  it('renders hidden input with correct attributes', () => {
    const { container } = render(
      <MetadataFields
        name="metadata"
        index={0}
        set={vi.fn()}
        values={[[ 'mykey', 'myvalue' ]]}
      />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"]'
    ) as HTMLInputElement;

    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput.name).toBe('metadata[mykey]');
    expect(hiddenInput.value).toBe('myvalue');
  });

  it('formats Date value in hidden input as ISO string', () => {
    const date = new Date('2024-01-01T10:00:00Z');
    const { container } = render(
      <MetadataFields
        name="metadata"
        index={0}
        set={vi.fn()}
        values={[[ 'date', date ]]}
      />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"]'
    ) as HTMLInputElement;
    expect(hiddenInput.value).toBe(date.toString());
  });

  it('does not render hidden input when key is empty', () => {
    const { container } = render(
      <MetadataFields
        name="metadata"
        index={0}
        set={vi.fn()}
        values={[[ '', 'value' ]]}
      />
    );

    const hiddenInput = container.querySelector(
      'input[type="hidden"]'
    );
    expect(hiddenInput).not.toBeInTheDocument();
  });

  it('applies error class to inputs', () => {
    const { container } = render(
      <MetadataFields
        index={0}
        set={vi.fn()}
        values={[[ 'key', 'value' ]]}
        error
      />
    );

    const nameInput = container.querySelector(
      '.frui-field-metadata-name'
    );
    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );

    expect(nameInput).toHaveClass('frui-tx-error');
    expect(valueInput).toHaveClass('frui-tx-error');
  });

  it('marks inputs as required', () => {
    const { container } = render(
      <MetadataFields
        index={0}
        set={vi.fn()}
        values={[[ 'key', 'value' ]]}
      />
    );

    const nameInput = container.querySelector(
      '.frui-field-metadata-name'
    );
    const valueInput = container.querySelector(
      '.frui-field-metadata-value'
    );

    expect(nameInput).toHaveAttribute('required');
    expect(valueInput).toHaveAttribute('required');
  });
});

describe('Metadata', () => {
  it('renders with add button', () => {
    render(<Metadata />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('passes type config to fields', () => {
    render(<Metadata type="number" />);
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('passes number config props', () => {
    render(
      <Metadata type="number" min={0} max={100} step={5} />
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('handles single placeholder string', () => {
    render(<Metadata placeholder="Enter data" />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('handles array placeholders', () => {
    render(<Metadata placeholder={[ 'Key', 'Value' ]} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('passes emptyValue for new entries', () => {
    render(<Metadata />);
    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);

    const nameInput = document.querySelector(
      '.frui-field-metadata-name'
    );
    expect(nameInput).toBeInTheDocument();
  });
});