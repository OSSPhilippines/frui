//--------------------------------------------------------------------//
// Imports

//frui
import FillTool from '../../../src/helpers/tools/FillTool.js';
//modules
import { describe, expect, it } from 'vitest';

//--------------------------------------------------------------------//
// Tests

describe('FillTool', () => {
  describe('Static properties', () => {
    it('should have correct keys array', () => {
      expect(FillTool.keys).toEqual([ 'fill', 'outline' ]);
    });

    it('should have textColorClasses array', () => {
      expect(FillTool.textColorClasses).toEqual([
        'frui-tx-white',
        'frui-tx-black',
        'frui-tx-primary',
        'frui-tx-secondary',
        'frui-tx-tertiary',
        'frui-tx-info',
        'frui-tx-warning',
        'frui-tx-success',
        'frui-tx-error',
        'frui-tx-muted'
      ]);
    });
  });

  describe('Factory method', () => {
    it('should create instance using get method', () => {
      const tool = FillTool.get({ fill: true });
      expect(tool).toBeInstanceOf(FillTool);
    });
  });

  describe('Constructor', () => {
    it('should initialize with props and color tools', () => {
      const tool = new FillTool({ fill: true });
      expect(tool).toBeInstanceOf(FillTool);
    });
  });

  describe('getClassStyles - outline mode', () => {
    it('adds solid border if none', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toContain('frui-solid');
    });

    it('skips solid if borderStyle set', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderStyle: 'dashed' }
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('should not add solid when borderLeftStyle exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderLeftStyle: 'dotted' }
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('should not add solid when borderRightStyle exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderRightStyle: 'dashed' }
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('should not add solid when borderTopStyle exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderTopStyle: 'solid' }
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('should not add solid when borderBottomStyle exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderBottomStyle: 'double' }
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('should not add solid when frui-solid class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-solid' ]
      });
      expect(
        result.classes.filter(c => c === 'frui-solid').length
      ).toBe(1);
    });

    it('should not add solid when frui-dashed class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-dashed' ]
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('should not add solid when frui-dotted class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-dotted' ]
      });
      expect(result.classes).not.toContain('frui-solid');
    });

    it('adds border width if none', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toContain('frui-bb-xs');
      expect(result.classes).toContain('frui-bl-xs');
      expect(result.classes).toContain('frui-br-xs');
      expect(result.classes).toContain('frui-bt-xs');
    });

    it('skips width if borderWidth set', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderWidth: '2px' }
      });
      expect(result.classes).not.toContain('frui-bb-xs');
    });

    it('should not add width when borderLeftWidth exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderLeftWidth: '1px' }
      });
      expect(result.classes).not.toContain('frui-bb-xs');
    });

    it('should not add width when borderRightWidth exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderRightWidth: '3px' }
      });
      expect(result.classes).not.toContain('frui-bb-xs');
    });

    it('should not add width when borderTopWidth exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderTopWidth: '2px' }
      });
      expect(result.classes).not.toContain('frui-bb-xs');
    });

    it('should not add width when borderBottomWidth exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { borderBottomWidth: '1px' }
      });
      expect(result.classes).not.toContain('frui-bb-xs');
    });

    it('should not add width when frui-bb- class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-bb-md' ]
      });
      expect(result.classes).not.toContain('frui-bb-xs');
    });

    it('should not add width when frui-bl- class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-bl-lg' ]
      });
      expect(result.classes).not.toContain('frui-bl-xs');
    });

    it('should not add width when frui-br- class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-br-sm' ]
      });
      expect(result.classes).not.toContain('frui-br-xs');
    });

    it('should not add width when frui-bt- class exists', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-bt-xl' ]
      });
      expect(result.classes).not.toContain('frui-bt-xs');
    });

    it('should apply border color from bdc prop', () => {
      const tool = new FillTool({ outline: true, bdc: 'primary' });
      const result = tool.getClassStyles({});
      expect(result.classes).toContain('frui-bd-primary');
    });

    it('should apply text color from txc prop', () => {
      const tool = 
        new FillTool({ outline: true, txc: 'secondary' });
      const result = tool.getClassStyles({});
      expect(result.classes).toContain('frui-tx-secondary');
    });
  });

  describe('getClassStyles - fill mode', () => {
    it('should add white text color class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({});
      expect(result.classes).toContain('frui-tx-white');
    });

    it('should remove existing text color classes', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-black', 'frui-tx-primary' ]
      });
      expect(result.classes).not.toContain('frui-tx-black');
      expect(result.classes).not.toContain('frui-tx-primary');
      expect(result.classes).toContain('frui-tx-white');
    });

    it('should remove frui-tx-secondary class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-secondary' ]
      });
      expect(result.classes).not.toContain('frui-tx-secondary');
    });

    it('should remove frui-tx-tertiary class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-tertiary' ]
      });
      expect(result.classes).not.toContain('frui-tx-tertiary');
    });

    it('should remove frui-tx-info class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-info' ]
      });
      expect(result.classes).not.toContain('frui-tx-info');
    });

    it('should remove frui-tx-warning class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-warning' ]
      });
      expect(result.classes).not.toContain('frui-tx-warning');
    });

    it('should remove frui-tx-success class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-success' ]
      });
      expect(result.classes).not.toContain('frui-tx-success');
    });

    it('should remove frui-tx-error class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-error' ]
      });
      expect(result.classes).not.toContain('frui-tx-error');
    });

    it('should remove frui-tx-muted class', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'frui-tx-muted' ]
      });
      expect(result.classes).not.toContain('frui-tx-muted');
    });

    it('should apply background color from bgc prop', () => {
      const tool = new FillTool({ fill: true, bgc: 'primary' });
      const result = tool.getClassStyles({});
      expect(result.classes).toContain('frui-bg-primary');
    });

    it('should preserve non-text-color classes', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        classes: [ 'custom-class', 'frui-tx-black' ]
      });
      expect(result.classes).toContain('custom-class');
      expect(result.classes).not.toContain('frui-tx-black');
    });
  });

  describe('getClassStyles - no key', () => {
    it('should return empty when no fill or outline prop', () => {
      const tool = new FillTool({});
      const result = tool.getClassStyles({});
      expect(result.classes).toEqual([]);
      expect(result.styles).toEqual({});
    });
  });

  describe('getClassStyles - preserve existing', () => {
    it('should preserve existing styles in outline mode', () => {
      const tool = new FillTool({ outline: true });
      const result = tool.getClassStyles({
        styles: { color: 'red' }
      });
      expect(result.styles).toHaveProperty('color', 'red');
    });

    it('should preserve existing styles in fill mode', () => {
      const tool = new FillTool({ fill: true });
      const result = tool.getClassStyles({
        styles: { margin: '10px' }
      });
      expect(result.styles).toHaveProperty('margin', '10px');
    });
  });
});