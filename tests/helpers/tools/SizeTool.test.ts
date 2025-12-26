//--------------------------------------------------------------------//
// Imports

//frui
import SizeTool from '../../../src/helpers/tools/SizeTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('SizeTool', () => {
  describe('Static properties', () => {
    it('should have correct values array', () => {
      expect(SizeTool.values).toEqual([
        'xs', 'sm', 'md', 'lg', 'xl',
        'xl2', 'xl3', 'xl4', 'xl5',
        '2xl', '3xl', '4xl', '5xl',
        'fourth', 'third', 'half', 'full'
      ]);
    });

    it('should have classmap for aliases', () => {
      expect(SizeTool.classmap.ba).toEqual([
        'bbs', 'bls', 'brs', 'bts'
      ]);
      expect(SizeTool.classmap.px).toEqual([ 'pls', 'prs' ]);
    });

    it('should have stylemap for CSS properties', () => {
      expect(SizeTool.stylemap.txs).toBe('fontSize');
      expect(SizeTool.stylemap.w).toBe('width');
      expect(SizeTool.stylemap.mbs).toBe('marginBottom');
    });

    it('should have typeKey set to size', () => {
      expect(SizeTool.typeKey).toBe('size');
    });
  });

  describe('Factory method', () => {
    it('should create instance using get method', () => {
      const tool = SizeTool.get({ md: true }, 'txs');
      expect(tool).toBeInstanceOf(SizeTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props and type', () => {
      const tool = new SizeTool({ md: true }, 'txs');
      expect(tool).toBeInstanceOf(SizeTool);
    });
  });

  describe('getClassStyles - size with preset', () => {
    it('handles preset size for text', () => {
      const tool = new SizeTool({ size: 'md' }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-md' ]);
    });

    it('should handle size prop with custom value for text', () => {
      const tool = new SizeTool({ size: '16px' }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ fontSize: '16px' });
    });

    it('should handle size prop for border', () => {
      const tool = new SizeTool({ size: 'sm' }, 'bbs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bb-sm' ]);
    });
  });

  describe('getClassStyles - stylemap keys', () => {
    it('should handle txs with predefined value', () => {
      const tool = new SizeTool({ txs: 'lg' }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-lg' ]);
    });

    it('should handle txs with custom pixel value', () => {
      const tool = new SizeTool({ txs: '20px' }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ fontSize: '20px' });
    });

    it('should handle width with custom value', () => {
      const tool = new SizeTool({ w: '100px' }, 'w');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ width: '100px' });
    });

    it('should handle height with predefined value', () => {
      const tool = new SizeTool({ h: 'full' }, 'h');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-h-full' ]);
    });

    it('should convert number to pixel string', () => {
      const tool = new SizeTool({ txs: 16 }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ fontSize: '16px' });
    });
  });

  describe('getClassStyles - classmap keys', () => {
    it('should handle ba with predefined value', () => {
      const tool = new SizeTool({ ba: 'md' }, 'ba');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([
        'frui-bb-md',
        'frui-bl-md',
        'frui-br-md',
        'frui-bt-md'
      ]);
    });

    it('should handle px with custom value', () => {
      const tool = new SizeTool({ px: '10px' }, 'px');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({
        paddingLeft: '10px',
        paddingRight: '10px'
      });
    });

    it('should handle my with predefined value', () => {
      const tool = new SizeTool({ my: 'lg' }, 'my');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([
        'frui-mt-lg',
        'frui-mb-lg'
      ]);
    });
  });

  describe('getClassStyles - value flags', () => {
    it('should handle md flag for text size', () => {
      const tool = new SizeTool({ md: true }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-md' ]);
    });

    it('should handle sm flag for padding', () => {
      const tool = new SizeTool({ sm: true }, 'pbs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-pb-sm' ]);
    });

    it('should handle xl2 alias conversion to 2xl', () => {
      const tool = new SizeTool({ xl2: true }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-2xl' ]);
    });

    it('should handle xl3 alias conversion', () => {
      const tool = new SizeTool({ xl3: true }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-3xl' ]);
    });

    it('should handle flag for classmap type', () => {
      const tool = new SizeTool({ lg: true }, 'ba');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([
        'frui-bb-lg',
        'frui-bl-lg',
        'frui-br-lg',
        'frui-bt-lg'
      ]);
    });

    it('should ignore false flag values', () => {
      const tool = new SizeTool({ md: false }, 'txs');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
    });
  });

  describe('getClassStyles - deduplication', () => {
    it('should remove duplicate classes', () => {
      const tool = new SizeTool({ ba: 'md', bbs: 'md' }, 'ba');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([
        'frui-bb-md',
        'frui-bl-md',
        'frui-br-md',
        'frui-bt-md'
      ]);
    });
  });

  describe('getClassStyles - preserve existing', () => {
    it('should preserve existing classes', () => {
      const tool = new SizeTool({ md: true }, 'txs');
      const result = tool.getClassStyles({
        classes: [ 'existing' ]
      });
      expect(result.classes).toContain('existing');
      expect(result.classes).toContain('frui-tx-md');
    });

    it('should preserve existing styles', () => {
      const tool = new SizeTool({ txs: '16px' }, 'txs');
      const result = tool.getClassStyles({
        styles: { color: 'red' }
      });
      expect(result.styles).toEqual({
        color: 'red',
        fontSize: '16px'
      });
    });
  });

  describe('hasBorderProps', () => {
    it('should return true when border props exist', () => {
      const tool = new SizeTool({ ba: 'md' }, 'ba');
      expect(tool.hasBorderProps()).toBeTruthy();
    });

    it('should return false when no border props', () => {
      const tool = new SizeTool({ txs: 'md' }, 'txs');
      expect(tool.hasBorderProps()).toBeFalsy();
    });
  });

  describe('hasDimensionProps', () => {
    it('should return true when dimension props exist', () => {
      const tool = new SizeTool({ w: '100px' }, 'w');
      expect(tool.hasDimensionProps()).toBeTruthy();
    });

    it('should return false when no dimension props', () => {
      const tool = new SizeTool({ txs: 'md' }, 'txs');
      expect(tool.hasDimensionProps()).toBeFalsy();
    });
  });

  describe('hasMarginProps', () => {
    it('should return true when margin props exist', () => {
      const tool = new SizeTool({ ma: 'md' }, 'ma');
      expect(tool.hasMarginProps()).toBeTruthy();
    });

    it('should return false when no margin props', () => {
      const tool = new SizeTool({ txs: 'md' }, 'txs');
      expect(tool.hasMarginProps()).toBeFalsy();
    });
  });

  describe('hasPaddingProps', () => {
    it('should return true when padding props exist', () => {
      const tool = new SizeTool({ pa: 'md' }, 'pa');
      expect(tool.hasPaddingProps()).toBeTruthy();
    });

    it('should return false when no padding props', () => {
      const tool = new SizeTool({ txs: 'md' }, 'txs');
      expect(tool.hasPaddingProps()).toBeFalsy();
    });
  });

  describe('hasTextProps', () => {
    it('should return true when text props exist', () => {
      const tool = new SizeTool({ txs: 'md' }, 'txs');
      expect(tool.hasTextProps()).toBeTruthy();
    });

    it('should return false when no text props', () => {
      const tool = new SizeTool({ pa: 'md' }, 'pa');
      expect(tool.hasTextProps()).toBeFalsy();
    });
  });

  describe('setType', () => {
    it('should add class for predefined value', () => {
      const tool = new SizeTool({}, 'txs');
      const classes: string[] = [];
      const styles = {};
      tool.setType('txs', 'md', classes, styles);
      expect(classes).toEqual([ 'frui-tx-md' ]);
    });

    it('should add style for custom value', () => {
      const tool = new SizeTool({}, 'txs');
      const classes: string[] = [];
      const styles = {};
      tool.setType('txs', '18px', classes, styles);
      expect(styles).toEqual({ fontSize: '18px' });
    });

    it('should handle xl2 to 2xl conversion in setType', () => {
      const tool = new SizeTool({}, 'txs');
      const classes: string[] = [];
      const styles = {};
      tool.setType('txs', 'xl2', classes, styles);
      expect(classes).toEqual([ 'frui-tx-2xl' ]);
    });
  });
});