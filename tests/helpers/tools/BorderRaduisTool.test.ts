//--------------------------------------------------------------------//
// Imports

//frui
import BorderRadiusTool from '../../../src/helpers/tools/BorderRadiusTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('BorderRadiusTool', () => {
  describe('Static properties', () => {
    it('should have correct keys array', () => {
      expect(BorderRadiusTool.keys).toEqual([
        'curved',
        'rounded',
        'pill'
      ]);
    });
  });

  describe('Factory method', () => {
    it('should create instance using get method', () => {
      const tool = BorderRadiusTool.get({ curved: true });
      expect(tool).toBeInstanceOf(BorderRadiusTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props', () => {
      const tool = new BorderRadiusTool({ rounded: true });
      expect(tool).toBeInstanceOf(BorderRadiusTool);
    });

    it('should pass keys to parent PropTool', () => {
      const tool = new BorderRadiusTool({ curved: true });
      expect(tool.key).toBe('curved');
    });
  });

  describe('getClassStyles', () => {
    it('should add curved class when curved prop is true', () => {
      const tool = new BorderRadiusTool({ curved: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-curved' ]);
      expect(result.styles).toEqual({});
    });

    it('should add rounded class when rounded prop is true', () => {
      const tool = new BorderRadiusTool({ rounded: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-rounded' ]);
    });

    it('should add pill class when pill prop is true', () => {
      const tool = new BorderRadiusTool({ pill: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-pill' ]);
    });

    it('should not add class when no matching key', () => {
      const tool = new BorderRadiusTool({ radius: '5px' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
      expect(result.styles).toEqual({});
    });

    it('should preserve existing classes', () => {
      const tool = new BorderRadiusTool({ curved: true });
      const result = tool.getClassStyles({
        classes: [ 'existing-class' ]
      });
      expect(result.classes).toEqual([
        'existing-class',
        'frui-curved'
      ]);
    });

    it('should preserve existing styles', () => {
      const tool = new BorderRadiusTool({ rounded: true });
      const result = tool.getClassStyles({
        styles: { color: 'red' }
      });
      expect(result.classes).toEqual([ 'frui-rounded' ]);
      expect(result.styles).toEqual({ color: 'red' });
    });

    it('should handle empty options object', () => {
      const tool = new BorderRadiusTool({ pill: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-pill' ]);
      expect(result.styles).toEqual({});
    });

    it('prioritizes first true key', () => {
      const tool = new BorderRadiusTool({
        curved: true,
        rounded: true
      });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-curved' ]);
    });

    it('should handle props with no border radius properties', () => {
      const tool = new BorderRadiusTool({ other: 'value' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
    });

    it('should ignore false prop values', () => {
      const tool = new BorderRadiusTool({
        curved: false,
        pill: true
      });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-pill' ]);
    });

    it('should ignore radius prop with number value', () => {
      const tool = new BorderRadiusTool({ radius: 10 });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
    });
  });
});