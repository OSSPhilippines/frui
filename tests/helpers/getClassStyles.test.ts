//--------------------------------------------------------------------//
// Imports

//frui
import type { 
  GetClassStylesOptions 
} from '../../src/helpers/getClassStyles.js';
import getClassStyles from '../../src/helpers/getClassStyles.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Helpers

type TestState = {
  isActive: boolean,
  count: number
}

const mockState: TestState = {
  isActive: true,
  count: 5
};

//--------------------------------------------------------------------//
// Tests

describe('getClassStyles', () => {
  describe('Basic functionality', () => {
    it('should return children with empty classes and styles', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { children: 'test content' },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result).toEqual({
        children: 'test content',
        classes: [],
        styles: {}
      });
    });

    it('should use provided classes and styles', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { children: null },
        state: mockState,
        classes: [ 'existing' ],
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([ 'existing' ]);
      expect(result.styles).toEqual({ color: 'red' });
    });
  });

  describe('String className', () => {
    it('should add string className to classes', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { className: 'my-class', children: null },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([ 'my-class' ]);
    });

    it('should filter empty string className', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { className: '', children: null },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([]);
    });
  });

  describe('Function className', () => {
    it('should execute function returning string', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: (state) => state.isActive ? 'active' : 'inactive',
          children: null
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([ 'active' ]);
    });

    it('should not add when function returns non-string', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: () => null as any,
          children: null
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([]);
    });
  });

  describe('Object style', () => {
    it('should merge object style', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          style: { color: 'blue', fontSize: '16px' },
          children: null
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({
        color: 'blue',
        fontSize: '16px'
      });
    });

    it('should merge with existing styles', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          style: { fontSize: '16px' },
          children: null
        },
        state: mockState,
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({
        color: 'red',
        fontSize: '16px'
      });
    });
  });

  describe('Function style', () => {
    it('should execute function returning object', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          style: (state) => ({
            color: state.isActive ? 'green' : 'gray',
            opacity: 1
          }),
          children: null
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({
        color: 'green',
        opacity: 1
      });
    });

    it('should not merge when function returns non-object', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          style: () => null as any,
          children: null
        },
        state: mockState,
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({ color: 'red' });
    });
  });

  describe('Combined className and style', () => {
    it('should handle both string className and object style', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: 'my-class',
          style: { color: 'blue' },
          children: 'content'
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result).toEqual({
        children: 'content',
        classes: [ 'my-class' ],
        styles: { color: 'blue' }
      });
    });

    it('should handle function className and function style', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: (state) => `count-${state.count}`,
          style: (state) => ({ fontWeight: 'bold' }),
          children: 'content'
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result).toEqual({
        children: 'content',
        classes: [ 'count-5' ],
        styles: { fontWeight: 'bold' }
      });
    });
  });
});