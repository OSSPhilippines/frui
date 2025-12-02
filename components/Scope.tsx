//--------------------------------------------------------------------//
// Imports

//modules
import { createContext, useContext } from 'react';
//frui
import type { ChildrenProps } from './types.js';

//--------------------------------------------------------------------//
// Types

export type ScopeContext = {
  key: string | number,
  value: unknown
};

export type ScopeProps = ChildrenProps & {
  value?: unknown,
  list?: unknown[],
  hash?: Record<string, unknown>
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Hook to access the current scope context.
 */
export function useScopeContext<V = unknown, K = string | number>() {
  return useContext(ScopeContext) as {
    key: K,
    value: V
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Context to provide scope values.
 */
export const ScopeContext = createContext<ScopeContext>({
  key: -1,
  value: undefined
});

/**
 * Component to create a scope for its children.
 */
export function Scope(props: ScopeProps) {
  const { children, hash, list, value } = props;
  return [
    ...list ? list.map((value, key) => (
      <ScopeContext.Provider key={key} value={{ key, value }}>
        {children}
      </ScopeContext.Provider>
    )) : [],
    ...hash ? Object.entries(hash).map(([key, value]) => (
      <ScopeContext.Provider key={key} value={{ key, value }}>
        {children}
      </ScopeContext.Provider>
    )): [],
    value !== undefined ? (
      <ScopeContext.Provider key="-1000" value={{ key: 0, value }}>
        {children}
      </ScopeContext.Provider>
    ) : null
  ];
};

export default Object.assign(Scope, {
  useScopeContext,
  Context: ScopeContext,
  useContext: useScopeContext,
  useScope: useScopeContext,
  use: useScopeContext
});