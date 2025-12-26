//--------------------------------------------------------------------//
// Imports

//frui
import type {
  ClassStyleOptions
} from '../../../src/helpers/tools/PropTool.js';
import PropTool from '../../../src/helpers/tools/PropTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Helpers

type TestProps = {
  color?: string,
  size?: string,
  variant?: string,
  disabled?: boolean,
  onClick?: () => void
}

class TestPropTool extends PropTool<TestProps, TestProps> {
  public getClassStyles(options: ClassStyleOptions = {}) {
    const { classes = [], styles = {} } = options;
    const key = this.key;
    if (key) {
      classes.push(`test-${key}`);
    }
    return { classes, styles };
  }
}

//--------------------------------------------------------------------//
// Tests

describe('PropTool', () => {
  describe('Constructor', () => {
    it('should initialize with props and keys', () => {
      const props = { color: 'red', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool).toBeInstanceOf(PropTool);
    });
  });

  describe('active getter', () => {
    it('should return keys that are defined in props', () => {
      const props = { color: 'red', size: 'md', disabled: false };
      const tool = new TestPropTool(
        props,
        [ 'color', 'size', 'variant' ]
      );
      expect(tool.active).toEqual([ 'color', 'size' ]);
    });

    it('should return empty array when no keys are defined', () => {
      const props = { onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.active).toEqual([]);
    });

    it('should include keys with falsy but defined values', () => {
      const props = { color: '', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.active).toEqual([ 'color', 'size' ]);
    });

    it('should exclude undefined keys', () => {
      const props = { color: 'red', size: undefined };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.active).toEqual([ 'color' ]);
    });
  });

  describe('attributes getter', () => {
    it('should return props excluding special keys', () => {
      const props = { color: 'red', size: 'md', onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      const attrs = tool.attributes;
      expect(attrs).toHaveProperty('onClick');
      expect(attrs).not.toHaveProperty('color');
      expect(attrs).not.toHaveProperty('size');
    });

    it('should return all props when no keys match', () => {
      const onClick = () => {};
      const props = { onClick, disabled: true };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.attributes).toEqual({ onClick, disabled: true });
    });

    it('returns empty if all are special', () => {
      const props = { color: 'red', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.attributes).toEqual({});
    });

    it('returns new object, original safe', () => {
      const props = { color: 'red', onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color' ]);
      const attrs = tool.attributes;
      expect(props).toHaveProperty('color');
      expect(attrs).not.toHaveProperty('color');
    });
  });

  describe('config getter', () => {
    it('should return only special key props', () => {
      const props = { color: 'red', size: 'md', onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.config).toEqual({ color: 'red', size: 'md' });
    });

    it('returns empty if no special keys', () => {
      const props = { onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(
        tool.config
      ).toEqual({ color: undefined, size: undefined });
    });

    it('should include undefined values for unset keys', () => {
      const props = { color: 'red' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(
        tool.config
      ).toEqual({ color: 'red', size: undefined });
    });
  });

  describe('key getter', () => {
    it('should return first truthy key', () => {
      const props = { color: 'red', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.key).toBe('color');
    });

    it('should return undefined when no truthy keys', () => {
      const props = { onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.key).toBeUndefined();
    });

    it('should skip falsy values', () => {
      const props = { color: '', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.key).toBe('size');
    });

    it('should skip false boolean values', () => {
      const props = { disabled: false, variant: 'primary' };
      const tool = new TestPropTool(
        props,
        [ 'disabled', 'variant' ]
      );
      expect(tool.key).toBe('variant');
    });
  });

  describe('keys getter', () => {
    it('should return copy of keys array', () => {
      const keys = [ 'color', 'size' ];
      const tool = new TestPropTool({}, keys);
      expect(tool.keys).toEqual(keys);
      expect(tool.keys).not.toBe(keys);
    });

    it('should not affect original when modified', () => {
      const keys = [ 'color', 'size' ];
      const tool = new TestPropTool({}, keys);
      const copy = tool.keys;
      copy.push('variant');
      expect(tool.keys).toEqual([ 'color', 'size' ]);
    });
  });

  describe('props getter', () => {
    it('should return copy of props object', () => {
      const props = { color: 'red', size: 'md' };
      const tool = new TestPropTool(props, [ 'color' ]);
      expect(tool.props).toEqual(props);
      expect(tool.props).not.toBe(props);
    });

    it('should not affect original when modified', () => {
      const props = { color: 'red' };
      const tool = new TestPropTool(props, [ 'color' ]);
      const copy = tool.props;
      copy.size = 'lg';
      expect(tool.props).toEqual({ color: 'red' });
    });
  });

  describe('value getter', () => {
    it('should return value of first truthy key', () => {
      const props = { color: 'red', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.value).toBe('red');
    });

    it('should return undefined when no truthy keys', () => {
      const props = { onClick: () => {} };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.value).toBeUndefined();
    });

    it('should skip falsy values and return next truthy', () => {
      const props = { color: '', size: 'md' };
      const tool = new TestPropTool(props, [ 'color', 'size' ]);
      expect(tool.value).toBe('md');
    });
  });

  describe('getClassStyles abstract method', () => {
    it('should be implemented by subclass', () => {
      const tool = new TestPropTool({ color: 'red' }, [ 'color' ]);
      const result = tool.getClassStyles();
      expect(result).toHaveProperty('classes');
      expect(result).toHaveProperty('styles');
    });

    it('should use key in implementation', () => {
      const tool = new TestPropTool({ color: 'red' }, [ 'color' ]);
      const result = tool.getClassStyles();
      expect(result.classes).toEqual([ 'test-color' ]);
    });

    it('should accept options parameter', () => {
      const tool = new TestPropTool({ size: 'md' }, [ 'size' ]);
      const result = tool.getClassStyles({
        classes: [ 'existing' ],
        styles: { color: 'blue' }
      });
      expect(result.classes).toContain('existing');
      expect(result.classes).toContain('test-size');
      expect(result.styles).toEqual({ color: 'blue' });
    });
  });
});