//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
//frui
import Slug, {
  camelfy,
  slugify,
  useSlug
} from '../../frui/src/field/Slug.js';

//--------------------------------------------------------------------//
// Helpers

function renderHookWithUseSlug(config: Parameters<typeof useSlug>[ 0 ]) {
  let hookResult: ReturnType<typeof useSlug> | undefined;
  function TestHook() {
    hookResult = useSlug(config);
    return <div data-testid="slug-hook" />;
  }
  render(<TestHook />);
  return () => hookResult!;
}

//--------------------------------------------------------------------//
// Tests

describe('slugify function', () => {
  it('converts string to slug with dashes', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('converts string to slug with underscores', () => {
    expect(slugify('Hello World', true)).toBe('hello_world');
  });
  it('handles special characters', () => {
    expect(slugify('Hello@World!')).toBe('hello-world');
  });
  it('trims whitespace', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });
  it('converts to lowercase', () => {
    expect(slugify('HELLO WORLD')).toBe('hello-world');
  });
});

describe('camelfy function', () => {
  it('converts string to camel case', () => {
    expect(camelfy('hello world')).toBe('helloWorld');
  });
  it('handles special characters', () => {
    expect(camelfy('hello@world-test')).toBe('helloWorldTest');
  });
  it('trims whitespace', () => {
    expect(camelfy('  hello world  ')).toBe('helloWorld');
  });
});

describe('useSlug Hook', () => {
  it('slugifies value correctly', () => {
    const getHook = renderHookWithUseSlug({
      value: 'Hello World',
      dash: true,
      line: false,
      camel: false,
      onChange: vi.fn()
    });
    const hook = getHook();
    expect(hook.value).toBe('hello-world');
  });
  it('camelifies value when camel prop is true', () => {
    const getHook = renderHookWithUseSlug({
      value: 'hello world test',
      dash: false,
      line: false,
      camel: true,
      onChange: vi.fn()
    });
    const hook = getHook();
    expect(hook.value).toBe('helloWorldTest');
  });
  it('slugifies defaultValue correctly', () => {
    const getHook = renderHookWithUseSlug({
      defaultValue: 'Hello World',
      dash: true,
      line: false,
      camel: false,
      onChange: vi.fn()
    });
    const hook = getHook();
    expect(hook.defaultValue).toBe('hello-world');
  });
  it('modifies event value on change', () => {
    const onChange = vi.fn();
    const getHook = renderHookWithUseSlug({
      value: '',
      dash: true,
      line: false,
      camel: false,
      onChange
    });
    const hook = getHook();
    
    const event = {
      target: { value: 'New Value' }
    } as ChangeEvent<HTMLInputElement>;
    
    hook.change(event);
    
    expect(event.target.value).toBe('new-value');
    expect(onChange).toHaveBeenCalledWith(event);
  });
});

describe('<Slug /> Component', () => {
  it('renders input element', () => {
    const { container } = render(<Slug />);
    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
  });
  it('slugifies value prop', () => {
    const { container } = render(<Slug value="Hello World" />);
    const input = container.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input).toHaveValue('hello-world');
  });
  it('slugifies defaultValue prop', () => {
    const { container } = render(
      <Slug defaultValue="Hello World" />
    );
    const input = container.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input).toHaveValue('hello-world');
  });
  it('camelifies value when camel prop is true', () => {
    const { container } = render(
      <Slug camel defaultValue="hello world test" />
    );
    const input = container.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input).toHaveValue('helloWorldTest');
  });
  it('uses underscores when line prop is true', () => {
    const { container } = render(
      <Slug line defaultValue="Hello World" />
    );
    const input = container.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input).toHaveValue('hello_world');
  });
  it('processes input changes through slugify', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Slug onChange={onChange} />
    );
    const input = container.querySelector('input');
    
    fireEvent.change(input!, { target: { value: 'New Value' } });
    
    expect(onChange).toHaveBeenCalled();
  });
});