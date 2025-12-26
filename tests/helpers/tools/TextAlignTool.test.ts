//--------------------------------------------------------------------//
// Imports

//frui
import TextAlignTool from '../../../src/helpers/tools/TextAlignTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('TextAlignTool', () => {
  describe('Static properties', () => {
    it('should have correct keys array', () => {
      expect(TextAlignTool.keys).toEqual([
        'left',
        'center',
        'right',
        'justify'
      ]);
    });
  });

  describe('Static factory method', () => {
    it('should create instance using get method', () => {
      const props = { left: true };
      const tool = TextAlignTool.get(props);
      expect(tool).toBeInstanceOf(TextAlignTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props', () => {
      const props = { left: true };
      const tool = new TextAlignTool(props);
      expect(tool).toBeInstanceOf(TextAlignTool);
    });

    it('should pass keys to parent PropTool', () => {
      const props = { center: true };
      const tool = new TextAlignTool(props);
      expect(tool.key).toBe('center');
    });
  });

  describe('getClassStyles', () => {
    it('should add text align class when key exists', () => {
      const tool = new TextAlignTool({ left: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-left' ]);
      expect(result.styles).toEqual({});
    });

    it('should add center align class', () => {
      const tool = new TextAlignTool({ center: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-center' ]);
    });

    it('should add right align class', () => {
      const tool = new TextAlignTool({ right: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-right' ]);
    });

    it('should add justify align class', () => {
      const tool = new TextAlignTool({ justify: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-justify' ]);
    });

    it('should not add class when no matching key', () => {
      const tool = new TextAlignTool({ align: 'custom' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
      expect(result.styles).toEqual({});
    });

    it('should preserve existing classes', () => {
      const tool = new TextAlignTool({ left: true });
      const result = tool.getClassStyles({
        classes: [ 'existing-class' ]
      });
      expect(
        result.classes
      ).toEqual([ 'existing-class', 'frui-tx-left' ]);
    });

    it('should preserve existing styles', () => {
      const tool = new TextAlignTool({ center: true });
      const result = tool.getClassStyles({
        styles: { color: 'red' }
      });
      expect(result.classes).toEqual([ 'frui-tx-center' ]);
      expect(result.styles).toEqual({ color: 'red' });
    });

    it('should handle empty options object', () => {
      const tool = new TextAlignTool({ right: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-right' ]);
      expect(result.styles).toEqual({});
    });

    it('prioritizes first true key', () => {
      const tool = 
        new TextAlignTool({ left: true, center: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-left' ]);
    });

    it('should handle props with no align properties', () => {
      const tool = new TextAlignTool({ other: 'value' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
    });
  });
});