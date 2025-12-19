//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

function getMetadataElements(container: HTMLElement) {
  return {
    row: container.querySelector('.frui-field-metadata-row'),
    nameInput: container.querySelector(
      '.frui-field-metadata-name'
    ) as HTMLInputElement,
    valueInput: container.querySelector(
      '.frui-field-metadata-value'
    ) as HTMLInputElement,
    removeButton: container.querySelector('.frui-field-metadata-remove'),
    hiddenInput: container.querySelector(
      'input[ type="hidden" ]'
    ) as HTMLInputElement
  };
}

//--------------------------------------------------------------------//
// Tests

describe('useMetadata', () => {
  it('identifies input types correctly', () => {
    const textHook = renderHookWithState(() =>
      useMetadata({ type: 'text', index: 0, set: vi.fn(), values: [] })
    );
    expect(textHook.current.input.isText).toBe(true);
    expect(textHook.current.input.isNumber).toBe(false);

    const numberHook = renderHookWithState(() =>
      useMetadata({
        type: 'number',
        index: 0,
        set: vi.fn(),
        values: []
      })
    );
    expect(numberHook.current.input.isNumber).toBe(true);
  });

  it('calls set when updating name or value', () => {
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

    set.mockClear();
    act(() => {
      current.handlers.update('value', 'new-value');
    });
    expect(set).toHaveBeenCalledWith([[ 'key', 'new-value' ]]);
  });

  it('calls set when removing entry', () => {
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
  it('renders metadata row with inputs and remove button', () => {
    const { container } = render(
      <MetadataFields
        index={0}
        set={vi.fn()}
        values={[[ 'key', 'value' ]]}
      />
    );
    const { row, nameInput, valueInput, removeButton } =
      getMetadataElements(container);

    expect(row).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('required');
    expect(valueInput).toHaveAttribute('required');
    expect(removeButton).toHaveTextContent('×');
  });

  it('applies placeholders from array', () => {
    const { container } = render(
      <MetadataFields
        config={{ placeholder: [ 'Key', 'Value' ] }}
        index={0}
        set={vi.fn()}
        values={[[ '', '' ]]}
      />
    );
    const { nameInput, valueInput } = getMetadataElements(container);
    expect(nameInput).toHaveAttribute('placeholder', 'Key');
    expect(valueInput).toHaveAttribute('placeholder', 'Value');
  });

  it('displays initial values', () => {
    const { container } = render(
      <MetadataFields
        index={0}
        set={vi.fn()}
        values={[[ 'mykey', 'myvalue' ]]}
      />
    );
    const { nameInput, valueInput } = getMetadataElements(container);
    expect(nameInput).toHaveValue('mykey');
    expect(valueInput).toHaveValue('myvalue');
  });

  it('calls set when inputs change', () => {
    const set = vi.fn();
    const { container } = render(
      <MetadataFields 
        index={0} 
        set={set} 
        values={[[ 'key', 'value' ]]} 
      />
    );
    const { nameInput, valueInput } = getMetadataElements(container);

    fireEvent.change(nameInput, { target: { value: 'newkey' } });
    expect(set).toHaveBeenCalled();

    set.mockClear();
    fireEvent.change(valueInput, { target: { value: 'newval' } });
    expect(set).toHaveBeenCalled();
  });

  it('calls set when remove button is clicked', () => {
    const set = vi.fn();
    const { container } = render(
      <MetadataFields index={0} set={set} values={[[ 'key', 'value' ]]} />
    );
    const { removeButton } = getMetadataElements(container);

    fireEvent.click(removeButton!);
    expect(set).toHaveBeenCalledWith([ undefined ]);
  });

  it('renders hidden input with correct name and value', () => {
    const { container } = render(
      <MetadataFields
        name="metadata"
        index={0}
        set={vi.fn()}
        values={[[ 'mykey', 'myvalue' ]]}
      />
    );
    const { hiddenInput } = getMetadataElements(container);

    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput.name).toBe('metadata[mykey]');
    expect(hiddenInput.value).toBe('myvalue');
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
    const { hiddenInput } = getMetadataElements(container);
    expect(hiddenInput).not.toBeInTheDocument();
  });

  it('passes error prop to inputs', () => {
    const { container } = render(
      <MetadataFields
        index={0}
        set={vi.fn()}
        values={[[ 'key', 'value' ]]}
        error
      />
    );
    const { nameInput, valueInput } = getMetadataElements(container);
    expect(nameInput).toHaveClass('frui-tx-error');
    expect(valueInput).toHaveClass('frui-tx-error');
  });
});

describe('Metadata', () => {
  it('renders add button', () => {
    render(<Metadata />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('handles type and config props', () => {
    render(<Metadata type="number" min={0} max={100} step={5} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('handles array placeholders', () => {
    render(<Metadata placeholder={[ 'Key', 'Value' ]} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});