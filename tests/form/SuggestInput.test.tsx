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
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import type {
  FocusEvent,
  ReactNode
} from 'react';
import SuggestInput, { SuggestInputControl } from '../../src/form/SuggestInput.js';

//--------------------------------------------------------------------//
// Mocks

const mockOpen = vi.fn();
const mockSelect = vi.fn();
const mockSelected = [ '' ];

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    value,
    onUpdate,
    onBlur
  }: {
    value?: string;
    onUpdate?: (v: string) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  }) => (
    <input
      data-testid="mock-input"
      value={value || ''}
      onChange={(e) => onUpdate?.((e.target as HTMLInputElement).value)}
      onBlur={(e) => onBlur?.(e as FocusEvent<HTMLInputElement>)}
    />
  )
}));
vi.mock('../../src/base/Dropdown.js', () => {
  const DropdownMock = ({
    children,
    container
  }: {
    children?: ReactNode;
    container?: { className?: string; style?: object };
  }) => (
    <div className={container?.className} style={container?.style}>
      {children}
    </div>
  );

  DropdownMock.useContext = () => ({
    open: mockOpen,
    select: mockSelect,
    selected: mockSelected
  });

  DropdownMock.Control = ({ children }: { children?: ReactNode }) => (
    <div data-testid="dropdown-control">{children}</div>
  );

  DropdownMock.Option = () => null;
  DropdownMock.Head = () => null;
  DropdownMock.Foot = () => null;
  DropdownMock.Context = {};
  DropdownMock.useDropdown = vi.fn();
  DropdownMock.useDropdownContext = () => ({
    open: mockOpen,
    select: mockSelect,
    selected: mockSelected
  });
  DropdownMock.getAbsolutePosition = vi.fn();
  DropdownMock.getComponent = vi.fn();
  DropdownMock.getComponents = vi.fn();
  DropdownMock.getControl = vi.fn();
  DropdownMock.getFooter = vi.fn();
  DropdownMock.getHeader = vi.fn();
  DropdownMock.getOptions = vi.fn();
  DropdownMock.getRelativePosition = vi.fn();
  DropdownMock.makeOptions = vi.fn();
  DropdownMock.buildOptions = vi.fn();

  return {
    __esModule: true,
    default: DropdownMock
  };
});
vi.mock('../../src/helpers/getSlotStyles.js', () => ({
  __esModule: true,
  default: () => ({ className: '', style: {} })
}));

//--------------------------------------------------------------------//
// Tests

describe('<SuggestInputControl />', () => {
  beforeEach(() => {
    mockOpen.mockClear();
    mockSelect.mockClear();
  });

  it('renders input and calls onQuery when value length matches chars', async () => {
    const onQuery = vi.fn();
    render(
      <SuggestInputControl
        chars={3}
        onQuery={onQuery}
      />
    );
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: 'abc' } });
    });

    expect(mockSelect).toHaveBeenCalledWith('abc', false);
    expect(mockOpen).toHaveBeenCalledWith(true);
    expect(onQuery).toHaveBeenCalledWith('abc');
  });

  it('closes dropdown when input shorter than chars', async () => {
    render(<SuggestInputControl chars={4} />);
    const input = screen.getByTestId('mock-input');

    act(() => {
      fireEvent.change(input, { target: { value: 'ab' } });
    });

    expect(mockOpen).toHaveBeenCalledWith(false);
  });

  it('triggers hide handler on blur', async () => {
    render(<SuggestInputControl />);
    const input = screen.getByTestId('mock-input');

    await act(async () => {
      fireEvent.blur(input);
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(mockOpen).toHaveBeenCalledWith(false);
  });
});
describe('<SuggestInput />', () => {
  beforeEach(() => {
    mockOpen.mockClear();
    mockSelect.mockClear();
  });

  it('renders Dropdown and SuggestInputControl structure', () => {
    render(<SuggestInput />);
    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
  });

  it('applies error class properly', () => {
    const { container } = render(<SuggestInput error className="extra" />);
    const wrapper = container.querySelector('.frui-form-suggest-input');
    expect(wrapper).toHaveClass('frui-form-suggest-input-error');
    expect(wrapper).toHaveClass('extra');
  });

  it('passes correct dropdown props internally', () => {
    const onDropdown = vi.fn();
    const onUpdate = vi.fn();
    render(
      <SuggestInput
        options={[{ value: 'a', label: 'A' }]}
        onDropdown={onDropdown}
        onUpdate={onUpdate}
        control={{}}
        dropdown={{}}
      />
    );
    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
  });
});