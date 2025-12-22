//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
//tests
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Metadata, {
  MetadataFields,
  useMetadata
} from '../../src/form/Metadata.js';

//--------------------------------------------------------------------//
// Mocks
vi.mock('../../src/base/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    className,
    onClick
  }: {
    children?: ReactNode,
    className?: string,
    onClick?: () => void
  }) => (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}));

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    defaultValue,
    onUpdate,
    placeholder,
    type
  }: {
    className?: string,
    defaultValue?: string | number,
    onUpdate?: (val: string) => void,
    placeholder?: string,
    type?: string,
    [key: string]: unknown
  }) => (
    <input
      className={className}
      data-testid="mock-input"
      defaultValue={defaultValue}
      onChange={(e) => onUpdate?.(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  )
}));

vi.mock('../../src/form/NumberInput.js', () => ({
  __esModule: true,
  default: ({
    className,
    defaultValue,
    max,
    min,
    onUpdate,
    placeholder,
    step
  }: {
    className?: string,
    defaultValue?: string | number,
    max?: number | string,
    min?: number | string,
    onUpdate?: (val: number) => void,
    placeholder?: string,
    step?: number | string,
    [key: string]: unknown
  }) => (
    <input
      className={className}
      data-testid="mock-number-input"
      defaultValue={defaultValue}
      max={max}
      min={min}
      onChange={(e) => onUpdate?.(Number(e.target.value))}
      placeholder={placeholder}
      step={step}
      type="number"
    />
  )
}));

vi.mock('../../src/form/DateInput.js', () => ({
  __esModule: true,
  default: Object.assign(
    ({
      className,
      defaultValue,
      onUpdate,
      placeholder
    }: {
      className?: string,
      defaultValue?: string | Date,
      onUpdate?: (val: Date | null) => void,
      placeholder?: string,
      [key: string]: unknown
    }) => (
      <input
        className={className}
        data-testid="mock-date-input"
        defaultValue={
          defaultValue instanceof Date
            ? defaultValue.toISOString().split('T')[0]
            : defaultValue
        }
        onChange={(e) => {
          const value = e.target.value;
          onUpdate?.(value ? new Date(value) : null);
        }}
        placeholder={placeholder}
        type="date"
      />
    ),
    {
      toDateString: (date: Date) => date.toISOString().split('T')[0]
    }
  )
}));

vi.mock('../../src/form/TimeInput.js', () => ({
  __esModule: true,
  default: Object.assign(
    ({
      className,
      defaultValue,
      onUpdate,
      placeholder
    }: {
      className?: string,
      defaultValue?: string | Date,
      onUpdate?: (val: Date | null) => void,
      placeholder?: string,
      [key: string]: unknown
    }) => (
      <input
        className={className}
        data-testid="mock-time-input"
        defaultValue={
          defaultValue instanceof Date
            ? defaultValue.toTimeString().split(' ')[0]
            : defaultValue
        }
        onChange={(e) => {
          const value = e.target.value;
          onUpdate?.(
            value ? new Date(`1970-01-01T${value}`) : null
          );
        }}
        placeholder={placeholder}
        type="time"
      />
    ),
    {
      toTimeString: (date: Date) =>
        date.toTimeString().split(' ')[0]
    }
  )
}));

vi.mock('../../src/form/DatetimeInput.js', () => ({
  __esModule: true,
  default: Object.assign(
    ({
      className,
      defaultValue,
      onUpdate,
      placeholder
    }: {
      className?: string,
      defaultValue?: string | Date,
      onUpdate?: (val: Date | null) => void,
      placeholder?: string,
      [key: string]: unknown
    }) => (
      <input
        className={className}
        data-testid="mock-datetime-input"
        defaultValue={
          defaultValue instanceof Date
            ? defaultValue.toISOString().slice(0, 16)
            : defaultValue
        }
        onChange={(e) => {
          const value = e.target.value;
          onUpdate?.(value ? new Date(value) : null);
        }}
        placeholder={placeholder}
        type="datetime-local"
      />
    ),
    {
      toDatetimeString: (date: Date) =>
        date.toISOString().slice(0, 16)
    }
  )
}));

vi.mock('../../src/form/Fieldset.js', () => ({
  __esModule: true,
  default: <T,>(Component: any) => {
    return ({
      config,
      emptyValue,
      name
    }: {
      config?: Record<string, any>,
      emptyValue?: T,
      name?: string
    }) => {
      const values = [ emptyValue ];
      const set = vi.fn();
      return (
        <div data-testid="mock-fieldset">
          <Component
            config={config}
            error={false}
            index={0}
            name={name}
            set={set}
            values={values}
          />
        </div>
      );
    };
  }
}));

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
describe('useMetadata Hook', () => {
  it('should identify input types correctly', () => {
    const mockSet = vi.fn();
    
    const textHook = renderHookWithState(() =>
      useMetadata({ index: 0, set: mockSet, type: 'text', values: [] })
    );
    expect(textHook.current.input.isText).toBe(true);
    expect(textHook.current.input.isNumber).toBe(false);
    expect(textHook.current.input.isDate).toBe(false);

    const numberHook = renderHookWithState(() =>
      useMetadata({
        index: 0,
        set: mockSet,
        type: 'number',
        values: []
      })
    );
    expect(numberHook.current.input.isNumber).toBe(true);
    expect(numberHook.current.input.isText).toBe(false);

    const dateHook = renderHookWithState(() =>
      useMetadata({ index: 0, set: mockSet, type: 'date', values: [] })
    );
    expect(dateHook.current.input.isDate).toBe(true);
    expect(dateHook.current.input.isText).toBe(false);
  });

  it('should default to text when no type specified', () => {
    const mockSet = vi.fn();
    const { current } = renderHookWithState(() =>
      useMetadata({ index: 0, set: mockSet, values: [] })
    );

    expect(current.input.isText).toBe(true);
    expect(current.input.isNumber).toBe(false);
    expect(current.input.isDate).toBe(false);
  });

  it('should update name and value correctly', () => {
    const mockSet = vi.fn();
    const values = [ [ 'key', 'value' ] as [string, string] ];
    const { current } = renderHookWithState(() =>
      useMetadata({ index: 0, set: mockSet, values })
    );

    current.handlers.update('name', 'newKey');
    expect(mockSet).toHaveBeenCalledWith([ [ 'newKey', 'value' ] ]);

    current.handlers.update('value', 'newValue');
    expect(mockSet).toHaveBeenCalledWith([ [ 'key', 'newValue' ] ]);
  });

  it('should create new entry if index does not exist', () => {
    const mockSet = vi.fn();
    const values: ([ string, string ] | undefined)[] = [];
    const { current } = renderHookWithState(() =>
      useMetadata({ index: 0, set: mockSet, values })
    );

    current.handlers.update('name', 'newKey');
    expect(mockSet).toHaveBeenCalledWith([ [ 'newKey', '' ] ]);
  });

  it('should remove entry by setting to undefined', () => {
    const mockSet = vi.fn();
    const values = [
      [ 'key1', 'value1' ] as [string, string],
      [ 'key2', 'value2' ] as [string, string]
    ];
    const { current } = renderHookWithState(() =>
      useMetadata({ index: 0, set: mockSet, values })
    );

    current.handlers.remove();
    expect(mockSet).toHaveBeenCalledWith([
      undefined,
      [ 'key2', 'value2' ]
    ]);
  });
});

describe('MetadataFields Component', () => {
  it('should render text inputs by default', () => {
    const mockSet = vi.fn();
    const values = [ [ 'key', 'value' ] as [string, string] ];

    render(
      <MetadataFields
        config={{}}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const inputs = screen.getAllByTestId('mock-input');
    expect(inputs).toHaveLength(2);
    expect(inputs[0]).toHaveClass('frui-form-metadata-name');
    expect(inputs[1]).toHaveClass('frui-form-metadata-value');
  });

  it('should render number input with constraints', () => {
    const mockSet = vi.fn();
    const values = [ [ 'age', 25 ] as [string, number] ];

    render(
      <MetadataFields
        config={{ type: 'number', min: 0, max: 100, step: 1 }}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const numberInput = screen.getByTestId('mock-number-input');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveAttribute('min', '0');
    expect(numberInput).toHaveAttribute('max', '100');
    expect(numberInput).toHaveAttribute('step', '1');
  });

  it('should render date/time inputs based on type', () => {
    const mockSet = vi.fn();
    const testDate = new Date('2024-01-15T14:30:00');

    const { rerender } = render(
      <MetadataFields
        config={{ type: 'date' }}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={[ [ 'birthday', testDate ] ]}
      />
    );
    expect(screen.getByTestId('mock-date-input')).toBeInTheDocument();

    rerender(
      <MetadataFields
        config={{ type: 'time' }}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={[ [ 'startTime', testDate ] ]}
      />
    );
    expect(screen.getByTestId('mock-time-input')).toBeInTheDocument();

    rerender(
      <MetadataFields
        config={{ type: 'datetime' }}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={[ [ 'appointment', testDate ] ]}
      />
    );
    expect(
      screen.getByTestId('mock-datetime-input')
    ).toBeInTheDocument();
  });

  it('should handle placeholders correctly', () => {
    const mockSet = vi.fn();
    const values = [ [ '', '' ] as [string, string] ];

    render(
      <MetadataFields
        config={{ placeholder: [ 'Key', 'Value' ] }}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const inputs = screen.getAllByTestId('mock-input');
    expect(inputs[0]).toHaveAttribute('placeholder', 'Key');
    expect(inputs[1]).toHaveAttribute('placeholder', 'Value');
  });

  it('should call remove handler when button clicked', () => {
    const mockSet = vi.fn();
    const values = [ [ 'key', 'value' ] as [string, string] ];

    render(
      <MetadataFields
        config={{}}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(mockSet).toHaveBeenCalledWith([ undefined ]);
  });

  it('should render hidden input when value has valid key', () => {
    const mockSet = vi.fn();
    const values = [ [ 'testKey', 'testValue' ] as [string, string] ];

    render(
      <MetadataFields
        config={{}}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="hidden"]'
    );
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute(
      'name',
      'metadata[testKey]'
    );
    expect(hiddenInput).toHaveAttribute('value', 'testValue');
  });

  it('should not render hidden input when key is empty', () => {
    const mockSet = vi.fn();
    const values = [ [ '', 'value' ] as [string, string] ];

    render(
      <MetadataFields
        config={{}}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="hidden"]'
    );
    expect(hiddenInput).not.toBeInTheDocument();
  });

  it('should convert Date to ISO string in hidden input', () => {
    const mockSet = vi.fn();
    const testDate = new Date('2024-01-15T14:30:00.000Z');
    const values = [ [ 'date', testDate ] as [string, Date] ];

    render(
      <MetadataFields
        config={{ type: 'date' }}
        error={false}
        index={0}
                name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="hidden"]'
    );
    expect(hiddenInput).toHaveAttribute(
      'value',
      testDate.toISOString()
    );
  });

  it('should update handlers when inputs change', () => {
    const mockSet = vi.fn();
    const values = [ [ 'key', 'value' ] as [string, string] ];

    render(
      <MetadataFields
        config={{}}
        error={false}
        index={0}
        name="metadata"
        set={mockSet}
        values={values}
      />
    );

    const inputs = screen.getAllByTestId('mock-input');
    
    fireEvent.change(inputs[0], { target: { value: 'newKey' } });
    expect(mockSet).toHaveBeenCalledWith([ [ 'newKey', 'value' ] ]);

    fireEvent.change(inputs[1], { target: { value: 'newValue' } });
    expect(mockSet).toHaveBeenCalledWith([ [ 'key', 'newValue' ] ]);
  });
});

describe('Metadata Component', () => {
  it('should render fieldset with config', () => {
    render(
      <Metadata
        max={100}
        min={0}
        name="test"
        placeholder={[ 'Name', 'Value' ]}
        step={1}
        type="number"
      />
    );

    expect(screen.getByTestId('mock-fieldset')).toBeInTheDocument();
  });

  it('should convert string placeholder to array', () => {
    render(<Metadata name="test" placeholder="Placeholder" />);

    const inputs = screen.getAllByTestId('mock-input');
    expect(inputs[0]).toHaveAttribute('placeholder', 'Placeholder');
    expect(inputs[1]).toHaveAttribute('placeholder', 'Placeholder');
  });

  it('should pass emptyValue as tuple', () => {
    render(<Metadata name="test" />);

    const inputs = screen.getAllByTestId('mock-input');
    expect(inputs[0]).toHaveValue('');
    expect(inputs[1]).toHaveValue('');
  });
});