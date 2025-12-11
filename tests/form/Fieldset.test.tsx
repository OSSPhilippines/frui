//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import make, {
  useFieldset
} from '../../src/form/Fieldset.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
    type,
    className
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
  }) => (
    <button
      data-testid="mock-button"
      type={type ?? 'button'}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}));

const MockFields = ({
  index,
  set,
  name
}: {
  index: number;
  set: (values: (string | undefined)[]) => void;
  name?: string;
}) => (
  <div data-testid={`mock-field-${index}`}>
    <input
      data-testid={`mock-input-${index}`}
      value={name || ''}
      onChange={() => set([ 'updated' ])}
    />
  </div>
);

//--------------------------------------------------------------------//
// Hooks

describe('useFieldset()', () => {
  it('initializes with defaultValue', () => {
    const { result } = renderHook(() =>
      useFieldset({ defaultValue: [ 'a', 'b' ] })
    );
    expect(result.current.values).toEqual([ 'a', 'b' ]);
  });

  it('calls onChange and onUpdate when set is called with new values', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { result } = renderHook(() =>
      useFieldset({ defaultValue: [ 'a' ], onChange, onUpdate })
    );
    act(() => result.current.handlers.set([ 'a', 'b' ]));
    expect(onChange).toHaveBeenCalledWith([ 'a', 'b' ]);
    expect(onUpdate).toHaveBeenCalledWith([ 'a', 'b' ]);
  });

  it('adds emptyValue when add is called', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const { result } = renderHook(() =>
      useFieldset({
        defaultValue: [ 'a' ],
        emptyValue: '',
        onChange,
        onUpdate
      })
    );
    act(() => result.current.handlers.add());
    expect(onChange).toHaveBeenCalledWith([ 'a', '' ]);
    expect(onUpdate).toHaveBeenCalledWith([ 'a', '' ]);
  });
});

//--------------------------------------------------------------------//
// Tests

describe('make(Fieldset)', () => {
  const Fieldset = make(MockFields);

  it('renders provided fields correctly', () => {
    render(<Fieldset defaultValue={[ 'one', 'two' ]} />);
    expect(screen.getByTestId('mock-field-0')).toBeInTheDocument();
    expect(screen.getByTestId('mock-field-1')).toBeInTheDocument();
  });

  it('adds new field when add button is clicked', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    render(
      <Fieldset
        defaultValue={[ 'value' ]}
        emptyValue="new"
        onChange={onChange}
        onUpdate={onUpdate}
      />
    );

    const button = screen.getByTestId('mock-button');

    act(() => fireEvent.click(button));

    expect(onChange).toHaveBeenCalledWith([ 'value', 'new' ]);
    expect(onUpdate).toHaveBeenCalledWith([ 'value', 'new' ]);

    const addButtons = screen.getAllByText((content, node) => {
      return typeof node?.textContent === 'string' && node.textContent.includes('Add');
    });
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it('respects limit by not showing add button when size >= limit', () => {
    render(<Fieldset defaultValue={[ 'x', 'y' ]} emptyValue="z" limit={2} />);
    expect(screen.queryByTestId('mock-button')).not.toBeInTheDocument();
  });

  it('applies custom add text', () => {
    render(<Fieldset defaultValue={[ 'item' ]} add="Add Item" />);
    const button = screen.getByTestId('mock-button');
    expect(button).toHaveTextContent('Add Item');
  });
});