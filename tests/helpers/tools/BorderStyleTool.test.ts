//--------------------------------------------------------------------//
// Imports

//frui
import BorderStyleTool from '../../../src/helpers/tools/BorderStyleTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('BorderStyleTool', () => {
  describe('Static properties', () => {
    it('should have correct keys array', () => {
      expect(BorderStyleTool.keys).toEqual([
        'solid',
        'dashed',
        'dotted'
      ]);
    });
  });

  describe('Factory method', () => {
    it('should create instance using get method', () => {
      const tool = BorderStyleTool.get({ solid: true });
      expect(tool).toBeInstanceOf(BorderStyleTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props', () => {
      const tool = new BorderStyleTool({ dashed: true });
      expect(tool).toBeInstanceOf(BorderStyleTool);
    });

    it('should pass keys to parent PropTool', () => {
      const tool = new BorderStyleTool({ solid: true });
      expect(tool.key).toBe('solid');
    });
  });

  describe('getClassStyles', () => {
    it('should add solid class when solid prop is true', () => {
      const tool = new BorderStyleTool({ solid: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-solid' ]);
      expect(result.styles).toEqual({});
    });

    it('should add dashed class when dashed prop is true', () => {
      const tool = new BorderStyleTool({ dashed: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-dashed' ]);
    });

    it('should add dotted class when dotted prop is true', () => {
      const tool = new BorderStyleTool({ dotted: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-dotted' ]);
    });

    it('should not add class when no matching key', () => {
      const tool = new BorderStyleTool({ bdStyle: 'custom' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
      expect(result.styles).toEqual({});
    });

    it('should preserve existing classes', () => {
      const tool = new BorderStyleTool({ solid: true });
      const result = tool.getClassStyles({
        classes: [ 'existing-class' ]
      });
      expect(result.classes).toEqual([
        'existing-class',
        'frui-solid'
      ]);
    });

    it('should preserve existing styles', () => {
      const tool = new BorderStyleTool({ dashed: true });
      const result = tool.getClassStyles({
        styles: { color: 'red' }
      });
      expect(result.classes).toEqual([ 'frui-dashed' ]);
      expect(result.styles).toEqual({ color: 'red' });
    });

    it('should handle empty options object', () => {
      const tool = new BorderStyleTool({ dotted: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-dotted' ]);
      expect(result.styles).toEqual({});
    });

    it('prioritizes first true key', () => {
      const tool = new BorderStyleTool({ solid: true, dashed: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-solid' ]);
    });

    it('should handle props with no border style properties', () => {
      const tool = new BorderStyleTool({ other: 'value' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
    });

    it('should ignore false prop values', () => {
      const tool = 
        new BorderStyleTool({ solid: false, dashed: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-dashed' ]);
    });
  });
});