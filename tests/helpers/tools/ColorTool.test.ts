//--------------------------------------------------------------------//
// Imports

//frui
import ColorTool from '../../../src/helpers/tools/ColorTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('ColorTool', () => {
  describe('Static properties', () => {
    it('should have correct values array', () => {
      expect(ColorTool.values).toEqual([
        'info',
        'warning',
        'success',
        'error',
        'muted',
        'black',
        'white',
        'primary',
        'secondary',
        'tertiary'
      ]);
    });

    it('should have stylemap for CSS properties', () => {
      expect(ColorTool.stylemap).toEqual({
        bgc: 'backgroundColor',
        bdc: 'borderColor',
        txc: 'color'
      });
    });

    it('should have typeKey set to color', () => {
      expect(ColorTool.typeKey).toBe('color');
    });

    it('should have correct keys array', () => {
      expect(ColorTool.keys).toContain('info');
      expect(ColorTool.keys).toContain('bgc');
      expect(ColorTool.keys).toContain('color');
    });
  });

  describe('Factory method', () => {
    it('should create instance using get method', () => {
      const tool = ColorTool.get({ info: true }, 'txc');
      expect(tool).toBeInstanceOf(ColorTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props and type', () => {
      const tool = new ColorTool({ info: true }, 'txc');
      expect(tool).toBeInstanceOf(ColorTool);
    });
  });

  describe('getClassStyles - color with preset', () => {
    it('handles preset color for text', () => {
      const tool = new ColorTool({ color: 'info' }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-info' ]);
    });

    it('should handle color prop with custom hex value', () => {
      const tool = new ColorTool({ color: '#006699' }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ color: '#006699' });
    });

    it('should handle color prop with custom named color', () => {
      const tool = new ColorTool({ color: 'red' }, 'bgc');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ backgroundColor: 'red' });
    });

    it('should handle color prop for border color', () => {
      const tool = new ColorTool({ color: 'primary' }, 'bdc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bd-primary' ]);
    });
  });

  describe('getClassStyles - stylemap keys', () => {
    it('should handle txc with predefined value', () => {
      const tool = new ColorTool({ txc: 'warning' }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-warning' ]);
    });

    it('should handle txc with custom color', () => {
      const tool = new ColorTool({ txc: '#ff0000' }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ color: '#ff0000' });
    });

    it('should handle bgc with predefined value', () => {
      const tool = new ColorTool({ bgc: 'success' }, 'bgc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bg-success' ]);
    });

    it('should handle bgc with custom color', () => {
      const tool = new ColorTool({ bgc: 'blue' }, 'bgc');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ backgroundColor: 'blue' });
    });

    it('should handle bdc with predefined value', () => {
      const tool = new ColorTool({ bdc: 'error' }, 'bdc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bd-error' ]);
    });

    it('should handle bdc with custom color', () => {
      const tool = new ColorTool({ bdc: 'green' }, 'bdc');
      const result = tool.getClassStyles({});
      expect(result.styles).toEqual({ borderColor: 'green' });
    });
  });

  describe('getClassStyles - value flags', () => {
    it('should handle info flag for text color', () => {
      const tool = new ColorTool({ info: true }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-info' ]);
    });

    it('should handle warning flag for background', () => {
      const tool = new ColorTool({ warning: true }, 'bgc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bg-warning' ]);
    });

    it('should handle success flag for border', () => {
      const tool = new ColorTool({ success: true }, 'bdc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bd-success' ]);
    });

    it('should handle error flag', () => {
      const tool = new ColorTool({ error: true }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-error' ]);
    });

    it('should handle muted flag', () => {
      const tool = new ColorTool({ muted: true }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-muted' ]);
    });

    it('should handle black flag', () => {
      const tool = new ColorTool({ black: true }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-black' ]);
    });

    it('should handle white flag', () => {
      const tool = new ColorTool({ white: true }, 'bgc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bg-white' ]);
    });

    it('should handle primary flag', () => {
      const tool = new ColorTool({ primary: true }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-primary' ]);
    });

    it('should handle secondary flag', () => {
      const tool = new ColorTool({ secondary: true }, 'bgc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bg-secondary' ]);
    });

    it('should handle tertiary flag', () => {
      const tool = new ColorTool({ tertiary: true }, 'bdc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-bd-tertiary' ]);
    });

    it('should ignore false flag values', () => {
      const tool = 
        new ColorTool({ info: false, warning: true }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-warning' ]);
    });
  });

  describe('getClassStyles - deduplication', () => {
    it('should remove duplicate classes', () => {
      const tool = new ColorTool({ info: true, txc: 'info' }, 'txc');
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([ 'frui-tx-info' ]);
    });
  });

  describe('getClassStyles - preserve existing', () => {
    it('should preserve existing classes', () => {
      const tool = new ColorTool({ info: true }, 'txc');
      const result = tool.getClassStyles({
        classes: [ 'existing' ]
      });
      expect(result.classes).toContain('existing');
      expect(result.classes).toContain('frui-tx-info');
    });

    it('should preserve existing styles', () => {
      const tool = new ColorTool({ txc: '#ff0000' }, 'txc');
      const result = tool.getClassStyles({
        styles: { fontSize: '16px' }
      });
      expect(result.styles).toEqual({
        fontSize: '16px',
        color: '#ff0000'
      });
    });
  });

  describe('setType', () => {
    it('should add class for predefined value', () => {
      const tool = new ColorTool({}, 'txc');
      const classes: string[] = [];
      const styles = {};
      tool.setType('txc', 'info', classes, styles);
      expect(classes).toEqual([ 'frui-tx-info' ]);
    });

    it('should add style for custom value', () => {
      const tool = new ColorTool({}, 'txc');
      const classes: string[] = [];
      const styles = {};
      tool.setType('txc', '#006699', classes, styles);
      expect(styles).toEqual({ color: '#006699' });
    });

    it('should handle background color style', () => {
      const tool = new ColorTool({}, 'bgc');
      const classes: string[] = [];
      const styles = {};
      tool.setType('bgc', 'red', classes, styles);
      expect(styles).toEqual({ backgroundColor: 'red' });
    });

    it('should handle border color style', () => {
      const tool = new ColorTool({}, 'bdc');
      const classes: string[] = [];
      const styles = {};
      tool.setType('bdc', 'blue', classes, styles);
      expect(styles).toEqual({ borderColor: 'blue' });
    });

    it('should handle predefined value for background', () => {
      const tool = new ColorTool({}, 'bgc');
      const classes: string[] = [];
      const styles = {};
      tool.setType('bgc', 'primary', classes, styles);
      expect(classes).toEqual([ 'frui-bg-primary' ]);
    });
  });
});