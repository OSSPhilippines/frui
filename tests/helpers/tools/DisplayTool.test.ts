//--------------------------------------------------------------------//
// Imports

//frui
import DisplayTool from '../../../src/helpers/tools/DisplayTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('DisplayTool', () => {
  describe('Static properties', () => {
    it('should have correct keys array', () => {
      expect(DisplayTool.keys).toEqual([
        'block',
        'inline',
        'iblock',
        'flex',
        'iflex',
        'grid',
        'igrid',
        'hidden'
      ]);
    });
  });

  describe('Factory method', () => {
    it('should create instance using get method', () => {
      const tool = DisplayTool.get({ block: true });
      expect(tool).toBeInstanceOf(DisplayTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props', () => {
      const tool = new DisplayTool({ flex: true });
      expect(tool).toBeInstanceOf(DisplayTool);
    });

    it('should pass keys to parent PropTool', () => {
      const tool = new DisplayTool({ block: true });
      expect(tool.key).toBe('block');
    });
  });

  describe('getClassStyles', () => {
    it('should add block class when block prop is true', () => {
      const tool = new DisplayTool({ block: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-block' ]);
      expect(result.styles).toEqual({});
    });

    it('should add inline class when inline prop is true', () => {
      const tool = new DisplayTool({ inline: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-inline' ]);
    });

    it('should add iblock class when iblock prop is true', () => {
      const tool = new DisplayTool({ iblock: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-iblock' ]);
    });

    it('should add flex class when flex prop is true', () => {
      const tool = new DisplayTool({ flex: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-flex' ]);
    });

    it('should add iflex class when iflex prop is true', () => {
      const tool = new DisplayTool({ iflex: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-iflex' ]);
    });

    it('should add grid class when grid prop is true', () => {
      const tool = new DisplayTool({ grid: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-grid' ]);
    });

    it('should add igrid class when igrid prop is true', () => {
      const tool = new DisplayTool({ igrid: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-igrid' ]);
    });

    it('should add hidden class when hidden prop is true', () => {
      const tool = new DisplayTool({ hidden: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-hidden' ]);
    });

    it('should not add class when no matching key', () => {
      const tool = new DisplayTool({ display: 'custom' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
      expect(result.styles).toEqual({});
    });

    it('should preserve existing classes', () => {
      const tool = new DisplayTool({ flex: true });
      const result = tool.getClassStyles({
        classes: [ 'existing-class' ]
      });
      expect(
        result.classes
      ).toEqual([ 'existing-class', 'frui-flex' ]);
    });

    it('should preserve existing styles', () => {
      const tool = new DisplayTool({ block: true });
      const result = tool.getClassStyles({
        styles: { color: 'red' }
      });
      expect(result.classes).toEqual([ 'frui-block' ]);
      expect(result.styles).toEqual({ color: 'red' });
    });

    it('should handle empty options object', () => {
      const tool = new DisplayTool({ grid: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-grid' ]);
      expect(result.styles).toEqual({});
    });

    it('prioritizes first true key', () => {
      const tool = new DisplayTool({ block: true, flex: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-block' ]);
    });

    it('should handle props with no display properties', () => {
      const tool = new DisplayTool({ other: 'value' });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
    });

    it('should ignore false prop values', () => {
      const tool = new DisplayTool({ block: false, flex: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-flex' ]);
    });
  });
});