//--------------------------------------------------------------------//
// Imports

//frui
import {
  getChildComponent,
  getChildComponents
} from '../../src/helpers/getChildComponent.js';
//modules
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Helpers

function TestComponent() {
  return null;
}

function OtherComponent() {
  return null;
}

const createChild = (
  type: Function,
  props: Record<string, any> = {}
): ReactElement => ({
  type,
  props,
  key: null,
  ref: null
} as any);

//--------------------------------------------------------------------//
// Tests

describe('getChildComponent', () => {
  it('should return first matching component', () => {
    const child = createChild(TestComponent);
    const result = getChildComponent(
      TestComponent,
      'testProp',
      child
    );
    expect(result).toBe(child);
  });

  it('should return null when no children provided', () => {
    const result = getChildComponent(
      TestComponent,
      'testProp',
      undefined
    );
    expect(result).toBeNull();
  });

  it('should return null when no matching component found', () => {
    const child = createChild(OtherComponent);
    const result = getChildComponent(
      TestComponent,
      'testProp',
      child
    );
    expect(result).toBeNull();
  });

  it('should return first component from multiple matches', () => {
    const child1 = createChild(TestComponent);
    const child2 = createChild(TestComponent);
    const result = getChildComponent(
      TestComponent,
      'testProp',
      [ child1, child2 ]
    );
    expect(result).toBe(child1);
  });

  it('should respect recursive parameter', () => {
    const nested = createChild(TestComponent);
    const children = [ [ nested ] ];
    const result = getChildComponent(
      TestComponent,
      'testProp',
      children,
      false
    );
    expect(result).toBeNull();
  });
});

describe('getChildComponents', () => {
  describe('Basic functionality', () => {
    it('should return empty array when no children', () => {
      const result = getChildComponents(
        TestComponent,
        'testProp',
        undefined
      );
      expect(result).toEqual([]);
    });

    it('should return empty array when children is null', () => {
      const result = getChildComponents(
        TestComponent,
        'testProp',
        null
      );
      expect(result).toEqual([]);
    });

    it('should handle single non-array child', () => {
      const child = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        child
      );
      expect(result).toEqual([ child ]);
    });

    it('should handle array of children', () => {
      const child1 = createChild(TestComponent);
      const child2 = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ child1, child2 ]
      );
      expect(result).toEqual([ child1, child2 ]);
    });
  });

  describe('Component matching by type', () => {
    it('should match component by type', () => {
      const child = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        child
      );
      expect(result).toEqual([ child ]);
    });

    it('should not match different component type', () => {
      const child = createChild(OtherComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        child
      );
      expect(result).toEqual([]);
    });

    it('should match multiple components of same type', () => {
      const child1 = createChild(TestComponent);
      const child2 = createChild(OtherComponent);
      const child3 = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ child1, child2, child3 ]
      );
      expect(result).toEqual([ child1, child3 ]);
    });
  });

  describe('Component matching by prop', () => {
    it('should match component by prop in props object', () => {
      const child = createChild(OtherComponent, { testProp: true });
      const result = getChildComponents(
        TestComponent,
        'testProp',
        child
      );
      expect(result).toEqual([ child ]);
    });

    it('should match component by prop on child object', () => {
      const child = createChild(OtherComponent);
      (child as any).testProp = true;
      const result = getChildComponents(
        TestComponent,
        'testProp',
        child
      );
      expect(result).toEqual([ child ]);
    });

    it('should not match when prop is falsy', () => {
      const child = createChild(OtherComponent, { testProp: false });
      const result = getChildComponents(
        TestComponent,
        'testProp',
        child
      );
      expect(result).toEqual([]);
    });
  });

  describe('Null and undefined handling', () => {
    it('should skip null children in array', () => {
      const child = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ null, child, null ]
      );
      expect(result).toEqual([ child ]);
    });

    it('should skip undefined children in array', () => {
      const child = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ undefined, child, undefined ]
      );
      expect(result).toEqual([ child ]);
    });

    it('should skip false children in array', () => {
      const child = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ false, child, false ] as any
      );
      expect(result).toEqual([ child ]);
    });
  });

  describe('Recursive nested arrays', () => {
    it('finds in nested arrays if recursive', () => {
      const nested = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ [ nested ] ],
        true
      );
      expect(result).toEqual([ nested ]);
    });

    it('skips nested if not recursive', () => {
      const nested = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ [ nested ] ],
        false
      );
      expect(result).toEqual([]);
    });

    it('should find components in deeply nested arrays', () => {
      const nested1 = createChild(TestComponent);
      const nested2 = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ [ [ nested1 ] ], [ nested2 ] ],
        true
      );
      expect(result).toEqual([ nested1, nested2 ]);
    });

    it('should handle mixed nested and non-nested children', () => {
      const child1 = createChild(TestComponent);
      const nested = createChild(TestComponent);
      const child2 = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ child1, [ nested ], child2 ],
        true
      );
      expect(result).toEqual([ child1, nested, child2 ]);
    });

    it('should skip null in nested arrays', () => {
      const nested = createChild(TestComponent);
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ [ null, nested, null ] ],
        true
      );
      expect(result).toEqual([ nested ]);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty array', () => {
      const result = getChildComponents(
        TestComponent,
        'testProp',
        []
      );
      expect(result).toEqual([]);
    });

    it('should handle array with only null values', () => {
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ null, null, null ]
      );
      expect(result).toEqual([]);
    });

    it('should handle deeply nested empty arrays', () => {
      const result = getChildComponents(
        TestComponent,
        'testProp',
        [ [ [] ] ],
        true
      );
      expect(result).toEqual([]);
    });
  });
});