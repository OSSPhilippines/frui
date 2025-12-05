//--------------------------------------------------------------------//
// Imports

//modules
import { CSSProperties } from 'react';
//frui
import type { Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

//--------------------------------------------------------------------//
// Types

export type ColorStyleKey = 'backgroundColor' | 'borderColor' | 'color';

export type ColorTypeProp = 'txc' | 'bgc' | 'bdc'; 

export type ColorValueProp = 'info' 
  | 'warning' | 'success' | 'error' 
  | 'muted' | 'black' | 'white' 
  | 'primary' | 'secondary' | 'tertiary';

export type ColorValueProps = {
  info?: boolean, 
  warning?: boolean, 
  success?: boolean, 
  error?: boolean, 
  muted?: boolean,
  black?: boolean, 
  white?: boolean,
  primary?: boolean, 
  secondary?: boolean,
  tertiary?: boolean, 
  color?: string
};

export type BackgroundColorProps = {
  bgc?: string
};

export type BorderColorProps = {
  bdc?: string,
};

export type TextColorProps = {
  txc?: string,
};

export type ColorProps = ColorValueProps
  & BackgroundColorProps
  & BorderColorProps
  & TextColorProps;

//--------------------------------------------------------------------//
// Classes
export class ColorTool<P extends Hash> extends PropTool<P, ColorProps> {
  //both prop names and values
  public static readonly values = [
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
  ];

  //maps certain prop names to style properties
  public static readonly stylemap: Record<string, string> = {
    'bgc': 'backgroundColor', 
    'bdc': 'borderColor', 
    'txc': 'color'
  };

  //prop name if provided, will use the type defined in constructor
  public static readonly typeKey = 'color';

  //list of color prop keys
  public static readonly keys = [
    ...ColorTool.values,
    ...Object.keys(ColorTool.stylemap),
    ColorTool.typeKey
  ];

  /**
   * Factory
   */
  public static get<P extends Hash>(props: P, type: ColorTypeProp) {
    return new this(props, type);
  }

  //type of color prop
  protected _type: ColorTypeProp;

  /**
   * Sets up prop tools
   */
  public constructor(props: P, type: ColorTypeProp) {
    super(props, ColorTool.keys);
    this._type = type;
  }

  /**
   * Get class styles for color prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {} } = options;
    //active will be keys that are string or boolean
    this.active.forEach(key => {
      //get value
      const value = this._props[key];
      //if value is a string (#006699, red, info, etc.)
      if (typeof value === 'string') {
        //if key is explicitly 'color'
        // ex. color="#006699"
        // ex. color="red"
        // ex. color="info"
        if (key === ColorTool.typeKey) {
          this.setType(this._type, value, classes, styles);
        //key is not 'color'...
        //if key maps to a style property
        // ex. bdc="red"
        // ex. bgc="#006699"
        // ex. txc="info"
        } else if (typeof ColorTool.stylemap[key] === 'string') {
          this.setType(key, value, classes, styles);
        }
        //key is not 'color' or a style map, then ignore?
      //if key is valid value (like a flag prop) and the value is truthy
      // ex. info={true}
      // ex. warning={false}
      } else if (Boolean(value) && ColorTool.values.includes(key)) {
        //...then key is actually the value, and we should get the key 
        // from the instantiated type...
        //from txc, bgc, bdc to tx, bg, bd
        const type = this._type.substring(0, 2); 
        //form the class name
        // ex. frui-tx-info
        classes.push(`frui-${type}-${key}`);
      }
    });
    return { classes: Array.from(new Set(classes)), styles };
  }

  /**
   * Defines class styles based on type and value
   */
  public setType(
    type: string, 
    value: string, 
    classes: string[], 
    styles: CSSProperties
  ) {
    //from txc, bgc, bdc to tx, bg, bd
    const classType = type.substring(0, 2); 
    //if the value is a predefined color
    // ex. color="info"
    if (ColorTool.values.includes(value)) {
      //form the class name
      // ex. frui-tx-info
      classes.push(`frui-${classType}-${value}`);
    //value is not a predefined color
    // ex. color="#006699"
    // ex. color="red"
    //if the type maps to a style property
    // ex. bdc: borderColor
    } else if (typeof ColorTool.stylemap[type] === 'string') {
      styles[ColorTool.stylemap[type] as ColorStyleKey] = value;
    }
  }
};

export default ColorTool;