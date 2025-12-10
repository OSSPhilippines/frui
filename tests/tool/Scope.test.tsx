//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it
} from 'vitest';
//frui
import Scope, {
  ScopeContext,
  useScopeContext
} from '../../src/tool/Scope.js';

//--------------------------------------------------------------------//
// Helpers

function ScopeDisplay() {
  const { key, value } = useScopeContext<string, string | number>();
  return (
    <div data-testid={`scope-${key}`}>
      <span data-testid="key">{String(key)}</span>
      <span data-testid="value">{String(value)}</span>
    </div>
  );
}

//--------------------------------------------------------------------//
// Tests

describe('<Scope />', () => {
  describe('with list prop', () => {
    it('renders children for each item in the list', () => {
      const list = [ 'apple', 'banana', 'cherry' ];
      
      render(
        <Scope list={list}>
          <ScopeDisplay />
        </Scope>
      );
      
      expect(screen.getByTestId('scope-0')).toBeInTheDocument();
      expect(screen.getByTestId('scope-1')).toBeInTheDocument();
      expect(screen.getByTestId('scope-2')).toBeInTheDocument();
    });
    it('provides correct key and value for each list item', () => {
      const list = [ 'first', 'second' ];
      
      render(
        <Scope list={list}>
          <ScopeDisplay />
        </Scope>
      );
      
      const firstScope = screen.getByTestId('scope-0');
      const secondScope = screen.getByTestId('scope-1');
      
      expect(firstScope).toHaveTextContent('first');
      expect(secondScope).toHaveTextContent('second');
    });
    it('renders empty when list is empty', () => {
      const { container } = render(
        <Scope list={[]}>
          <ScopeDisplay />
        </Scope>
      );
      
      expect(container.querySelector('[data-testid^="scope-"]')).toBeNull();
    });
  });
  describe('with hash prop', () => {
    it('renders children for each entry in the hash', () => {
      const hash = {
        name: 'John',
        age: '30'
      };
      
      render(
        <Scope hash={hash}>
          <ScopeDisplay />
        </Scope>
      );
      
      expect(screen.getByTestId('scope-name')).toBeInTheDocument();
      expect(screen.getByTestId('scope-age')).toBeInTheDocument();
    });
    it('provides correct key and value for each hash entry', () => {
      const hash = {
        color: 'blue',
        size: 'large'
      };
      
      render(
        <Scope hash={hash}>
          <ScopeDisplay />
        </Scope>
      );
      
      const colorScope = screen.getByTestId('scope-color');
      const sizeScope = screen.getByTestId('scope-size');
      
      expect(colorScope).toHaveTextContent('blue');
      expect(sizeScope).toHaveTextContent('large');
    });
    it('renders empty when hash is empty', () => {
      const { container } = render(
        <Scope hash={{}}>
          <ScopeDisplay />
        </Scope>
      );
      
      expect(container.querySelector('[data-testid^="scope-"]')).toBeNull();
    });
  });
  describe('with value prop', () => {
    it('renders children with single value scope', () => {
      render(
        <Scope value="singleValue">
          <ScopeDisplay />
        </Scope>
      );
      
      expect(screen.getByTestId('scope-0')).toBeInTheDocument();
    });
    it('provides key as 0 and correct value for single value', () => {
      render(
        <Scope value="testValue">
          <ScopeDisplay />
        </Scope>
      );
      
      const scope = screen.getByTestId('scope-0');
      
      expect(scope).toHaveTextContent('0');
      expect(scope).toHaveTextContent('testValue');
    });
    it('does not render when value is undefined', () => {
      const { container } = render(
        <Scope value={undefined}>
          <ScopeDisplay />
        </Scope>
      );
      
      expect(container.querySelector('[data-testid^="scope-"]')).toBeNull();
    });
  });
  describe('with combined props', () => {
    it('renders children for list, hash, and value together', () => {
      const list = [ 'item1' ];
      const hash = { key1: 'value1' };
      const value = 'singleValue';
      
      render(
        <Scope list={list} hash={hash} value={value}>
          <ScopeDisplay />
        </Scope>
      );
      
      // List item (index 0)
      const listScopes = screen.getAllByTestId('scope-0');
      expect(listScopes[0]).toBeInTheDocument();
      expect(listScopes[0]).toHaveTextContent('item1');
      
      // Hash item
      expect(screen.getByTestId('scope-key1')).toBeInTheDocument();
      expect(screen.getByTestId('scope-key1')).toHaveTextContent('value1');
      
      // Value item (also key 0)
      expect(listScopes[1]).toBeInTheDocument();
      expect(listScopes[1]).toHaveTextContent('singleValue');
    });
  });
  describe('with no props', () => {
    it('renders nothing when no props are provided', () => {
      const { container } = render(
        <Scope>
          <ScopeDisplay />
        </Scope>
      );
      
      expect(container.querySelector('[data-testid^="scope-"]')).toBeNull();
    });
  });
});

//--------------------------------------------------------------------//
// Hooks

describe('useScopeContext()', () => {
  it('returns default context values when used outside provider', () => {
    function DefaultContextDisplay() {
      const { key, value } = useScopeContext();
      return (
        <div>
          <span data-testid="default-key">{String(key)}</span>
          <span data-testid="default-value">{String(value)}</span>
        </div>
      );
    }
    
    render(<DefaultContextDisplay />);
    
    expect(screen.getByTestId('default-key')).toHaveTextContent('-1');
    expect(screen.getByTestId('default-value')).toHaveTextContent('undefined');
  });
  it('returns correct context values when used inside provider', () => {
    function ContextDisplay() {
      const { key, value } = useScopeContext<string, string>();
      return (
        <div>
          <span data-testid="ctx-key">{key}</span>
          <span data-testid="ctx-value">{value}</span>
        </div>
      );
    }
    
    render(
      <ScopeContext.Provider value={{ key: 'testKey', value: 'testValue' }}>
        <ContextDisplay />
      </ScopeContext.Provider>
    );
    
    expect(screen.getByTestId('ctx-key')).toHaveTextContent('testKey');
    expect(screen.getByTestId('ctx-value')).toHaveTextContent('testValue');
  });
});
describe('Scope default export', () => {
  it('exposes useScopeContext as use', () => {
    expect(Scope.use).toBe(useScopeContext);
  });
  it('exposes useScopeContext as useContext', () => {
    expect(Scope.useContext).toBe(useScopeContext);
  });
  it('exposes useScopeContext as useScope', () => {
    expect(Scope.useScope).toBe(useScopeContext);
  });
  it('exposes ScopeContext as Context', () => {
    expect(Scope.Context).toBe(ScopeContext);
  });
});