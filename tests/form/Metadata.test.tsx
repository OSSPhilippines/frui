//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent, ReactNode } from 'react';
//tests
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import {
  MetadataFields,
  useMetadata
} from '../../src/form/Metadata.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/base/Button.js', () => ({
  __esModule: true,
  default: ({
    children,
    onClick
  }: {
    children?: ReactNode,
    onClick?: () => void
  }) => (
    <button data-testid="mock-button" onClick={onClick}>
      {children}
    </button>
  )
}));

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate
  }: {
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      className={className}
      data-testid="mock-input"
      onChange={onUpdate}
    />
  )
}));

vi.mock('../../src/form/NumberInput.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate
  }: {
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      className={className}
      data-testid="mock-number"
      onChange={onUpdate}
    />
  )
}));

vi.mock('../../src/form/DateInput.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate
  }: {
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      className={className}
      data-testid="mock-date"
      onChange={onUpdate}
    />
  )
}));

vi.mock('../../src/form/TimeInput.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate
  }: {
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      className={className}
      data-testid="mock-time"
      onChange={onUpdate}
    />
  )
}));

vi.mock('../../src/form/DatetimeInput.js', () => ({
  __esModule: true,
  default: ({
    className,
    onUpdate
  }: {
    className?: string,
    onUpdate?: (e: ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      className={className}
      data-testid="mock-datetime"
      onChange={onUpdate}
    />
  )
}));

//--------------------------------------------------------------------//
// Tests

describe('useMetadata()', () => {
  const values: ([ string, string | number | Date ] | undefined)[] = [
    [ 'key', 'val' ]
  ];

  it('removes entry', () => {
    const setMock = vi.fn();
    const { handlers } = useMetadata({
      index: 0,
      set: setMock,
      type: 'text',
      values
    });
    handlers.remove();
    expect(setMock).toHaveBeenCalledWith([ undefined ]);
  });

  it('updates name/value', () => {
    const setMock = vi.fn();
    const { handlers } = useMetadata({
      index: 0,
      set: setMock,
      type: 'text',
      values
    });
    handlers.update('name', 'new');
    handlers.update('value', 'val');
    expect(setMock).toHaveBeenCalledTimes(2);
  });
});

describe('<MetadataFields />', () => {
  const values = [ [ 'name', 'val' ] ] as unknown as (
    | [ string, string ]
    | undefined
  )[];

  const renderField = (type: string, set = vi.fn()) => {
    render(
      <MetadataFields
        config={{ type }}
        index={0}
        name="meta"
        set={set}
        values={values}
      />
    );
  };

  it.each([ 'number', 'date', 'time', 'datetime' ])(
    'renders correct input for type=%s',
    (type) => {
      renderField(type);
      expect(
        screen.getByTestId(`mock-${type}`)
      ).toBeInTheDocument();
    }
  );

  it('renders hidden input with filled value', () => {
    renderField('text');
    const hidden = document.querySelector(
      'input[ type="hidden" ]'
    ) as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden.name).toContain('meta');
    expect(hidden.value).toBe('val');
  });

  it('renders text inputs when type=text', () => {
    renderField('text');
    expect(screen.getAllByTestId('mock-input')).toHaveLength(2);
  });

  it('removes entry on button click', () => {
    const setMock = vi.fn();
    renderField('text', setMock);
    const button = screen.getByTestId('mock-button');
    fireEvent.click(button);
    expect(setMock).toHaveBeenCalled();
  });

  it('updates value on input change', () => {
    const setMock = vi.fn();
    renderField('text', setMock);
    screen.getAllByTestId('mock-input').forEach((el) => {
      fireEvent.change(el, { target: { value: 'x' } });
    });
    expect(setMock).toHaveBeenCalled();
  });
});