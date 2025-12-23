//--------------------------------------------------------------------//
// Imports

//frui
import SlugInput, {
  camelfy,
  slugify,
  useSlugInput
} from '../../src/form/SlugInput.js';
//modules
import type { ChangeEvent, FocusEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { 
  describe, 
  expect, 
  it, 
  vi 
} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

//--------------------------------------------------------------------//
// Mocks

vi.mock('../../src/form/Input.js', () => ({
  __esModule: true,
  default: ({
    onBlur,
    onChange,
    value
  }: {
    value?: string,
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  }) => (
    <input
      data-testid="mock-input"
      onBlur={onBlur}
      onChange={onChange}
      value={value || ''}
    />
  )
}));

//--------------------------------------------------------------------//
// Helpers

function renderUseSlugInput(
  config: Parameters<typeof useSlugInput>[ 0 ]
) {
  let hookValue: ReturnType<typeof useSlugInput> | undefined;
  const TestComponent = () => {
    hookValue = useSlugInput(config);
    return (
      <input data-testid="mock" readOnly value={hookValue?.slug} />
    );
  };
  render(<TestComponent />);
  return () => hookValue!;
}

//--------------------------------------------------------------------//
// Tests

describe('slugify()', () => {
  it('converts string to slug with default options', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('uses underscores when dashes are disabled', () => {
    expect(
      slugify('my slug text', true, false)
    ).toBe('my_slug_text');
  });

  it('trims extra dashes and underscores', () => {
    expect(slugify('-abc--def-')).toBe('abc-def');
  });
});

describe('camelfy()', () => {
  it('converts string to camelCase', () => {
    expect(camelfy('hello world')).toBe('helloWorld');
  });

  it('removes special characters and spaces', () => {
    expect(camelfy(' test---slug_case')).toBe('testSlugCase');
  });
});

describe('<SlugInput />', () => {
  it('renders input with initial slugified value', () => {
    render(<SlugInput defaultValue="Hello World" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('hello-world');
  });

  it('updates slug when user types', () => {
    render(<SlugInput defaultValue="Hello" />);
    const input = screen.getByTestId('mock-input');
    fireEvent.change(input, { target: { value: 'Test Value' } });
    expect(input).toHaveValue('test-value');
  });

  it('calls onBlur and slugifies the value', () => {
    const onBlur = vi.fn();
    render(<SlugInput defaultValue="test" onBlur={onBlur} />);
    const input = screen.getByTestId('mock-input');
    fireEvent.change(input, { target: { value: 'New Test' } });
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
    expect(input).toHaveValue('new-test');
  });

  it('handles camel case mode properly', () => {
    render(<SlugInput camel defaultValue="camel case value" />);
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveValue('camelCaseValue');
  });

  it('renders controlled value and reacts to change', () => {
    const onChange = vi.fn();
    render(
      <SlugInput onChange={onChange} value="Controlled Slug" />
    );
    const input = screen.getByTestId('mock-input');
    expect(input).toHaveValue('controlled-slug');
    fireEvent.change(input, { target: { value: 'Another' } });
    expect(onChange).toHaveBeenCalled();
  });
});

describe('useSlugInput()', () => {
  it('initializes slug from defaultValue', () => {
    const getHook = renderUseSlugInput({
      defaultValue: 'Hello World',
      value: undefined
    });
    const hook = getHook();
    expect(hook.slug).toBe('hello-world');
  });

  it('updates slug when value changes', () => {
    const getHook = renderUseSlugInput({ value: 'Updated Slug' });
    const hook = getHook();
    expect(hook.slug).toBe('updated-slug');
  });

  it('applies camel case transformation when camel=true', () => {
    const getHook = renderUseSlugInput({
      value: 'camel case test',
      camel: true
    });
    const hook = getHook();
    expect(hook.slug).toBe('camelCaseTest');
  });
});