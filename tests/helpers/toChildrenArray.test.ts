//--------------------------------------------------------------------//
// Imports

//frui
import toChildrenArray from '../../src/helpers/toChildrenArray';
//modules
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('toChildrenArray', () => {
  it('should return empty array when children is null', () => {
    const result = toChildrenArray(null);
    expect(result).toEqual([]);
  });

  it('should return empty array when children is undefined', () => {
    const result = toChildrenArray(undefined);
    expect(result).toEqual([]);
  });

  it('should return empty array when children is false', () => {
    const result = toChildrenArray(false);
    expect(result).toEqual([]);
  });

  it('should return empty array when children is empty string', () => {
    const result = toChildrenArray('');
    expect(result).toEqual([]);
  });

  it('should return empty array when children is 0', () => {
    const result = toChildrenArray(0);
    expect(result).toEqual([]);
  });

  it('returns array as-is if already array', () => {
    const children = [ 'child1', 'child2', 'child3' ];
    const result = toChildrenArray(children);
    expect(result).toBe(children);
    expect(result).toEqual([ 'child1', 'child2', 'child3' ]);
  });

  it('returns empty array as-is if empty', () => {
    const children: ReactNode[] = [];
    const result = toChildrenArray(children);
    expect(result).toBe(children);
    expect(result).toEqual([]);
  });

  it('should convert iterable to array using Array.from', () => {
    const iterable = new Set([ 'child1', 'child2', 'child3' ]);
    const result = toChildrenArray(iterable as any);
    expect(result).toEqual([ 'child1', 'child2', 'child3' ]);
  });

  it('should convert Map iterable to array', () => {
    const mapIterable = new Map([
      [ 'key1', 'value1' ],
      [ 'key2', 'value2' ]
    ]);
    const result = toChildrenArray(mapIterable as any);
    expect(result).toEqual([
      [ 'key1', 'value1' ],
      [ 'key2', 'value2' ]
    ]);
  });

  it('converts string to array if iterable', () => {
    const result = toChildrenArray('hello');
    expect(result).toEqual([ 'h', 'e', 'l', 'l', 'o' ]);
  });

  it('should wrap single non-iterable child in nested array', () => {
    const child = { type: 'div', props: {} }  as unknown as ReactNode;
    const result = toChildrenArray(child);
    expect(result).toEqual([ [ child ] ]);
  });

  it('should wrap number child in nested array', () => {
    const result = toChildrenArray(42);
    expect(result).toEqual([ [ 42 ] ]);
  });

  it('should wrap boolean true in nested array', () => {
    const result = toChildrenArray(true);
    expect(result).toEqual([ [ true ] ]);
  });

  it('should wrap object without iterator in nested array', () => {
    const child: ReactNode = { foo: 'bar' } as unknown as ReactNode;
    const result = toChildrenArray(child);
    expect(result).toEqual([ [ child ] ]);
  });
});