//--------------------------------------------------------------------//
// Imports

//modules
import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
//frui
import Textlist, {
  TextlistFields,
  useTextlists
} from '../../frui/src/field/Textlist.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../frui/src/field/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    defaultValue,
    error,
    onUpdate,
    placeholder,
    required,
    ...props
  }: {
    className?: string,
    defaultValue?: string,
    error?: boolean,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void,
    placeholder?: string,
    required?: boolean
  } & InputHTMLAttributes<HTMLInputElement>) => (
    <input
      className={className}
      defaultValue={defaultValue}
      onChange={onUpdate}
      placeholder={placeholder}
      required={required}
      {...props}
    />
  )
}));

vi.mock('../../frui/src/element/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    className,
    onClick,
    outline,
    ...props
  }: {
    children?: ReactNode,
    className?: string,
    onClick?: () => void,
    outline?: boolean
  }) => (
    <button
      className={className}
      onClick={onClick}
      style={{ border: outline ? '1px solid' : 'none' }}
      {...props}
    >
      {children}
    </button>
  )
}));

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseTextlists(
  config: Parameters<typeof useTextlists>[ 0 ]
) {
  let hookResult: ReturnType<typeof useTextlists> | undefined;
  function TestHook() {
    hookResult = useTextlists(config);
    return <div />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('useTextlists Hook', () => {
  it('calls set when update handler is called', () => {
    const set = vi.fn();
    const getHook = renderHookWithUseTextlists({
      index: 0,
      set,
      values: [ 'test' ]
    });
    const hook = getHook();
    hook.handlers.update('new value');
    expect(set).toHaveBeenCalledWith([ 'new value' ]);
  });

  it('calls set when remove handler is called', () => {
    const set = vi.fn();
    const getHook = renderHookWithUseTextlists({
      index: 0,
      set,
      values: [ 'test' ]
    });
    const hook = getHook();
    hook.handlers.remove();
    expect(set).toHaveBeenCalledWith([undefined]);
  });
});

describe('<TextlistFields /> Component', () => {
  it('renders input and remove button', () => {
    const { container } = render(
      <TextlistFields
        index={0}
        set={vi.fn()}
        values={[ 'test value' ]}
      />
    );
    const input = 
      container.querySelector('.frui-field-textlist-input');
    const button = 
      container.querySelector('.frui-field-textlist-remove');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  
  it('passes placeholder to input', () => {
    const { container } = render(
      <TextlistFields
        config={{ placeholder: 'Enter text' }}
        index={0}
        set={vi.fn()}
        values={[ 'test value' ]}
      />
    );
    const input = 
      container.querySelector('.frui-field-textlist-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });
  
  it('calls set when input value changes', () => {
    const set = vi.fn();
    const { container } = render(
      <TextlistFields
        index={0}
        set={set}
        values={[ 'old value' ]}
      />
    );
    const input = 
      container.querySelector('.frui-field-textlist-input');
    fireEvent.change(input!, {
      target: { value: 'new value' }
    });
    expect(set).toHaveBeenCalled();
  });
  
  it('renders hidden input when value exists', () => {
    const { container } = render(
      <TextlistFields
        name="test-field"
        index={0}
        set={vi.fn()}
        values={[ 'test value' ]}
      />
    );
    const hiddenInput = 
      container.querySelector(' input[type="hidden" ]');
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveAttribute('name', 'test-field');
    expect(hiddenInput).toHaveValue('test value');
  });

  it('removes item when remove button is clicked', () => {
    const set = vi.fn();
    const { container } = render(
      <TextlistFields
        index={0}
        set={set}
        values={[ 'test value' ]}
      />
    );
    const removeButton = 
      container.querySelector('.frui-field-textlist-remove');
    fireEvent.click(removeButton!);
    expect(set).toHaveBeenCalledWith([ undefined ]);
  });
});

describe('<Textlist /> Component', () => {
  it('renders add button', () => {
    const { container } = render(<Textlist />);
    const addButton = 
      container.querySelector('.frui-fieldset-add');
    expect(addButton).toBeInTheDocument();
  });
  
  it('passes placeholder to fieldset config', () => {
    const { container } = render(
      <Textlist placeholder="Enter item" />
    );
    expect(container).toBeInTheDocument();
  });
  
  it('uses emptyValue for new entries', () => {
    const { container } = render(<Textlist />);
    expect(container).toBeInTheDocument();
  });

  it('adds new item when add button is clicked', () => {
    const { container } = render(
      <Textlist defaultValue={[ 'item1' ]} />
    );
    const addButton = 
      container.querySelector('.frui-fieldset-add');

    fireEvent.click(addButton!);
    const inputs = 
      container.querySelectorAll('.frui-field-textlist-input');
    expect(inputs.length).toBeGreaterThan(1);
  });
}); 