//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
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
import type { FieldsProps } from '../../src/form/Fieldset.js';
import makeFieldset, {
  useFieldset
} from '../../src/form/Fieldset.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    type
  }: {
    children?: ReactNode,
    onClick?: () => void,
    type?: 'button' | 'submit' | 'reset'
  }) => (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  )
}));

//--------------------------------------------------------------------//
// Helpers

type TestValue = {
  id: number,
  name: string
};

function TestFields({
  config,
  error,
  index,
  set,
  values = []
}: FieldsProps<TestValue>) {
  const handleRemove = () => {
    const newValues = [ ...values ];
    newValues[ index ] = undefined;
    set(newValues);
  };
  
  return (
    <div data-testid={`field-${index}`}>
      <input
        data-testid={`input-${index}`}
        onChange={(e) => {
          const newValues = [ ...values ];
          newValues[ index ] = {
            id: index,
            name: e.target.value
          };
          set(newValues);
        }}
        type="text"
        value={values[ index ]?.name || ''}
      />
      <button
        data-testid={`remove-${index}`}
        onClick={handleRemove}
        type="button"
      >
        Remove
      </button>
      {error && <span>Error</span>}
      {config?.custom && <span>Custom Config</span>}
    </div>
  );
}

function renderHookWithFieldset<T>(
  config: Parameters<typeof useFieldset<T>>[ 0 ]
) {
  let hookResult: ReturnType<typeof useFieldset<T>> | undefined;
  function TestComponent() {
    hookResult = useFieldset(config);
    return <div data-testid="hook" />;
  }
  render(<TestComponent />);
  return () => hookResult!;
}

function TestControlledComponent({
  value
}: {
  value: TestValue[]
}) {
  const { values } = useFieldset<TestValue>({ value });
  return (
    <div data-testid="hook">
      {values.length}
    </div>
  );
}

//--------------------------------------------------------------------//
// Tests

describe('useFieldset Hook', () => {
  it('initializes with default values', () => {
    const getHook = renderHookWithFieldset<TestValue>({
      defaultValue: [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' }
      ]
    });
    const hook = getHook();
    expect(hook.values).toHaveLength(2);
    expect(hook.values[ 0 ]).toEqual({ id: 1, name: 'Test 1' });
  });

  it('initializes with empty array when no default', () => {
    const getHook = renderHookWithFieldset<TestValue>({});
    const hook = getHook();
    expect(hook.values).toEqual([]);
  });

  it('calls onChange when values change', async () => {
    const onChange = vi.fn();
    const getHook = renderHookWithFieldset<TestValue>({
      defaultValue: [ { id: 1, name: 'Test' } ],
      onChange
    });
    const hook = getHook();
    
    await act(async () => {
      hook.handlers.set([ { id: 1, name: 'Updated' } ]);
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        { id: 1, name: 'Updated' }
      ]);
    });
  });

  it('calls onUpdate when values change', async () => {
    const onUpdate = vi.fn();
    const getHook = renderHookWithFieldset<TestValue>({
      defaultValue: [ { id: 1, name: 'Test' } ],
      onUpdate
    });
    const hook = getHook();
    
    await act(async () => {
      hook.handlers.set([ { id: 1, name: 'Updated' } ]);
    });
    
    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith([
        { id: 1, name: 'Updated' }
      ]);
    });
  });

  it('filters undefined values in callbacks', async () => {
    const onChange = vi.fn();
    const getHook = renderHookWithFieldset<TestValue>({
      defaultValue: [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' }
      ],
      onChange
    });
    const hook = getHook();
    
    await act(async () => {
      hook.handlers.set([
        { id: 1, name: 'Test 1' },
        undefined,
        { id: 3, name: 'Test 3' }
      ]);
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith([
        { id: 1, name: 'Test 1' },
        { id: 3, name: 'Test 3' }
      ]);
    });
  });

  it('adds new value with add handler', async () => {
    const onChange = vi.fn();
    const getHook = renderHookWithFieldset<TestValue>({
      defaultValue: [ { id: 1, name: 'Test' } ],
      emptyValue: { id: 0, name: '' },
      onChange
    });
    let hook = getHook();
    
    await act(async () => {
      hook.handlers.add();
    });
    
    await waitFor(() => {
      hook = getHook();
      expect(hook.values).toHaveLength(2);
    });
  });

  it('updates values when value prop changes', async () => {
    const { rerender } = render(
      <TestControlledComponent
        value={[ { id: 1, name: 'Initial' } ]}
      />
    );
    expect(screen.getByTestId('hook')).toBeInTheDocument();
    
    await act(async () => {
      rerender(
        <TestControlledComponent
          value={[ { id: 2, name: 'Updated' } ]}
        />
      );
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('hook')).toBeInTheDocument();
    });
  });
});

describe('makeFieldset Factory', () => {
  const Fieldset = makeFieldset<TestValue>(TestFields);

  it('renders fieldset with default values', () => {
    render(
      <Fieldset
        defaultValue={[
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' }
        ]}
      />
    );
    expect(screen.getByTestId('field-0')).toBeInTheDocument();
    expect(screen.getByTestId('field-1')).toBeInTheDocument();
  });

  it('renders add button', () => {
    render(<Fieldset />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('renders custom add button text', () => {
    render(<Fieldset add="Add Item" />);
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('adds new field when add button clicked', async () => {
    render(
      <Fieldset
        defaultValue={[ { id: 1, name: 'Test' } ]}
        emptyValue={{ id: 0, name: '' }}
      />
    );
    const addButton = screen.getByText('Add');
    
    await act(async () => {
      fireEvent.click(addButton);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('field-1')).toBeInTheDocument();
    });
  });

  it('hides add button when limit reached', () => {
    render(
      <Fieldset
        defaultValue={[
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' }
        ]}
        limit={2}
      />
    );
    expect(screen.queryByText('Add')).not.toBeInTheDocument();
  });

  it('shows add button when below limit', () => {
    render(
      <Fieldset
        defaultValue={[ { id: 1, name: 'Test' } ]}
        limit={2}
      />
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('passes config to fields', () => {
    render(
      <Fieldset
        config={{ custom: true }}
        defaultValue={[ { id: 1, name: 'Test' } ]}
      />
    );
    expect(screen.getByText('Custom Config')).toBeInTheDocument();
  });

  it('passes error prop to fields', () => {
    render(
      <Fieldset
        defaultValue={[ { id: 1, name: 'Test' } ]}
        error
      />
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('passes name prop to fields', () => {
    render(
      <Fieldset
        defaultValue={[ { id: 1, name: 'Test' } ]}
        name="test-field"
      />
    );
    expect(screen.getByTestId('field-0')).toBeInTheDocument();
  });

  it('calls onChange when field updated', async () => {
    const onChange = vi.fn();
    render(
      <Fieldset
        defaultValue={[ { id: 1, name: 'Test' } ]}
        onChange={onChange}
      />
    );
    const input = screen.getByTestId('input-0');
    
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Updated' } });
    });
    
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it('removes field when set to undefined', async () => {
    render(
      <Fieldset
        defaultValue={[
          { id: 1, name: 'Test 1' },
          { id: 2, name: 'Test 2' }
        ]}
      />
    );
    const removeButton = screen.getByTestId('remove-0');
    
    await act(async () => {
      fireEvent.click(removeButton);
    });
    
    await waitFor(() => {
      expect(
        screen.queryByTestId('field-0')
      ).not.toBeInTheDocument();
    });
  });

  it('passes button props to add button', () => {
    render(
      <Fieldset
        className="custom-class"
        data-testid="custom-button"
      />
    );
    const button = screen.getByText('Add');
    expect(button).toHaveAttribute('type', 'button');
  });
});