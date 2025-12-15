//--------------------------------------------------------------------//
// Imports

//modules
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
//frui
import type { ExtendsType, SlotStyleProp } from '../types.js';
import type { InputProps } from './Input.js';
import colors from '../data/colors.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import getClassStyles from '../helpers/getClassStyles.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type RgbaColor = {
  r: number,
  g: number,
  b: number,
  a: number
};

export type ColorInputConfig = {
  //uncontrolled default value
  defaultValue?: string,
  //handler when value changes
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  //handler when value updates
  onUpdate?: (color: string) => void,
  //controlled value
  value?: string
};

export type ColorInputProps = ExtendsType<InputProps, ColorInputConfig> & {
  //slot: color input styles
  input?: SlotStyleProp,
  //slot: color input styles
  picker?: SlotStyleProp
};

//--------------------------------------------------------------------//
// Constants

export const DEFAULT_HEX_COLOR = '#000000';
export const RGBA_PATTERN = /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([\d.]+))?\)$/i;
export const HEX_PATTERN = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
export const SHORT_HEX_PATTERN = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

//--------------------------------------------------------------------//
// Helpers

/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
};

/**
 * Convert a color component (0-255) to a two-digit hexadecimal string.
 */
export function componentToHex(value: number) {
  const hex = clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0');
  return hex;
};

/**
 * Convert an RGBA color to a hexadecimal color string.
 */
export function rgbaToHex(color: RgbaColor) {
  return `#${componentToHex(color.r)}${componentToHex(color.g)}${componentToHex(color.b)}`;
};

/**
 * Parse a color string (hex or rgba) into an RgbaColor object.
 */
export function toRGBA(color?: string | null): RgbaColor | null {
  if (!color) {
    return null;
  }

  const rgbaMatch = color.match(RGBA_PATTERN);
  if (rgbaMatch) {
    const r = clamp(parseInt(rgbaMatch[1], 10), 0, 255);
    const g = clamp(parseInt(rgbaMatch[2], 10), 0, 255);
    const b = clamp(parseInt(rgbaMatch[3], 10), 0, 255);
    const a = rgbaMatch[4] !== undefined ? clamp(parseFloat(rgbaMatch[4]), 0, 1) : 1;
    if ([ r, g, b ].some(Number.isNaN) || Number.isNaN(a)) {
      return null;
    }
    return { r, g, b, a };
  }

  const hexMatch = color.match(HEX_PATTERN);
  if (hexMatch) {
    const r = parseInt(hexMatch[1], 16);
    const g = parseInt(hexMatch[2], 16);
    const b = parseInt(hexMatch[3], 16);
    if ([ r, g, b ].some(Number.isNaN)) {
      return null;
    }
    return { r, g, b, a: 1 };
  }

  const shortHexMatch = color.match(SHORT_HEX_PATTERN);
  if (shortHexMatch) {
    const r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16);
    const g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16);
    const b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16);
    if ([ r, g, b ].some(Number.isNaN)) {
      return null;
    }
    return { r, g, b, a: 1 };
  }

  return null;
};

/**
 * Convert a color string to a hexadecimal color string.
 */
export function toHex(color?: string) {
  if (colors[color?.toLowerCase() || '']) {
    return colors[color?.toLowerCase() || ''];
  }
  const rgba = toRGBA(color);
  return rgba ? rgbaToHex(rgba) : DEFAULT_HEX_COLOR;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Hook to manage color state and updates.
 */
export function useColorInput(config: ColorInputConfig) {
  //config
  const {
    //uncontrolled default value
    defaultValue, //?: string
    //handler when value changes
    onChange, //?: (e: ChangeEvent<HTMLInputElement>) => void
    //handler when value updates
    onUpdate, //?: (color: string) => void
    //controlled value
    value //?: string
  } = config;
  //hooks
  const [ color, setColor ] = useState(defaultValue);
  //handlers
  const handlers = {
    change: (event: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event);
      handlers.update(event.target.value);
    },
    update: (color: string) => {
      setColor(color);
      onUpdate && onUpdate(color);
    }
  };
  //effects
  //when value changes from outside, update color
  useEffect(() => {
    if (value !== undefined) {
      setColor(value);
    }
  }, [ value ]);
  return { color, handlers };
};

//--------------------------------------------------------------------//
// Components

/**
 * ColorInput Component (Main)
 */
export function ColorInput(props: ColorInputProps) {
  //props
  const { 
    className,
    defaultValue, 
    input,
    onUpdate, 
    picker,
    style,
    value, 
    ...attributes 
  } = props;
  //hooks
  const { color, handlers } = useColorInput({
    defaultValue,
    onUpdate,
    value
  });
  //variables
  const hex = color ? toHex(color): '';
  //configure classes
  const classes = [ 'frui-form-color-input' ];
  if (className) classes.push(className);
  //get slot styles
  const slots = {
    input: input ? getSlotStyles(input, {}): {},
    picker: picker ? getSlotStyles(picker, {}): {}
  };
  const styles = {
    input: getClassStyles({
      //default classes to apply
      classes: [ 'frui-form-color-input-control' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.input.className,
        //prefer direct props over slot props
        style: slots.input.style
      },
      //state to pass to callable props
      state: {}
    }),
    picker: getClassStyles({
      //default classes to apply
      classes: [ 'frui-form-color-input-picker' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.picker.className,
        //prefer direct props over slot props
        style: slots.picker.style
      },
      //state to pass to callable props
      state: {}
    })
  };
  //render
  return (
    <div className={classes.join(' ')} style={style}>
      <input
        className={styles.picker.classes.join(' ')}
        style={styles.picker.styles}
        type="color"
        value={hex}
        onChange={handlers.change}
      />
      <Input
        {...attributes}
        className={styles.input.classes.join(' ')}
        onChange={handlers.change}
        style={styles.input.styles}
        type="text"
        value={color || ''}
      />
    </div>
  );
};

//defaults to color input
export default Object.assign(ColorInput, {
  DEFAULT_HEX_COLOR,
  RGBA_PATTERN,
  HEX_PATTERN,
  SHORT_HEX_PATTERN,
  clamp,
  componentToHex,
  rgbaToHex,
  toHex,
  toRGBA,
  useColorInput,
  use: useColorInput
});
