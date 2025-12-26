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
    it('returns children, empty classes/styles if none', () => {
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

    it('should use provided classes and styles arrays', () => {
      const existingClasses = [ 'existing-class' ];
      const existingStyles = { color: 'red' };
      const options: GetClassStylesOptions<TestState> = {
        props: { children: null },
        state: mockState,
        classes: existingClasses,
        styles: existingStyles
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([ 'existing-class' ]);
      expect(result.styles).toEqual({ color: 'red' });
    });
  });

  describe('String className', () => {
    it('should add string className to classes array', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { className: 'my-class', children: null },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([ 'my-class' ]);
    });

    it('should filter out empty string className', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { className: '', children: null },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([]);
    });

    it('should combine existing classes with new className', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: { className: 'new-class', children: null },
        state: mockState,
        classes: [ 'existing-class' ]
      };
      const result = getClassStyles(options);
      expect(
        result.classes
      ).toEqual([ 'existing-class', 'new-class' ]);
    });
  });

  describe('Function className', () => {
    it('should execute function className returning string', () => {
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

    it('skips class if function not string', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: (state) => state.count as any,
          children: null
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([]);
    });

    it('should filter empty string from function className', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: () => '',
          children: null
        },
        state: mockState
      };
      const result = getClassStyles(options);
      expect(result.classes).toEqual([]);
    });
  });

  describe('Object style', () => {
    it('should merge object style into styles', () => {
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

    it('should merge object style with existing styles', () => {
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

    it('should override existing styles with same property', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          style: { color: 'blue' },
          children: null
        },
        state: mockState,
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({ color: 'blue' });
    });
  });

  describe('Function style', () => {
    it('should execute function style returning object', () => {
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
          style: (state) => state.count as any,
          children: null
        },
        state: mockState,
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({ color: 'red' });
    });

    it('should merge function style with existing styles', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          style: () => ({ fontSize: '20px' }),
          children: null
        },
        state: mockState,
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result.styles).toEqual({
        color: 'red',
        fontSize: '20px'
      });
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
          style: (state) => ({
              fontWeight: state.isActive ? 'bold' : 'normal' 
            }),
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

    it('handles all with existing classes/styles', () => {
      const options: GetClassStylesOptions<TestState> = {
        props: {
          className: 'new-class',
          style: { fontSize: '18px' },
          children: 'test'
        },
        state: mockState,
        classes: [ 'existing-class' ],
        styles: { color: 'red' }
      };
      const result = getClassStyles(options);
      expect(result).toEqual({
        children: 'test',
        classes: [ 'existing-class', 'new-class' ],
        styles: { color: 'red', fontSize: '18px' }
      });
    });
  });
});