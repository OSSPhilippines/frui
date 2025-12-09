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

export type SizeStyleKey = 'fontSize' 
  | 'borderWidth' 
  | 'borderBottomWidth' 
  | 'borderLeftWidth' 
  | 'borderRightWidth' 
  | 'borderTopWidth' 
  | 'margin' 
  | 'marginBottom' 
  | 'marginLeft' 
  | 'marginRight' 
  | 'marginTop' 
  | 'padding' 
  | 'paddingBottom' 
  | 'paddingLeft' 
  | 'paddingRight' 
  | 'paddingTop';

export type SizeTypeProp = 'bds'
  | 'ba' | 'bx' | 'by' | 'bb' | 'bl' | 'br' | 'bt'
  | 'ma' | 'mx' | 'my' | 'mb' | 'ml' | 'mr' | 'mt'
  | 'pa' | 'px' | 'py' | 'pb' | 'pl' | 'pr' | 'pt'
  | 'bas' | 'bxs' | 'bys' | 'bbs' | 'bls' | 'brs' | 'bts'
  | 'mas' | 'mxs' | 'mys' | 'mbs' | 'mls' | 'mrs' | 'mts'
  | 'pas' | 'pxs' | 'pys' | 'pbs' | 'pls' | 'prs' | 'pts'
  | 'txs' | 'w' | 'h' | 'minw' | 'minh' | 'maxw' | 'maxh'; 

export type SizeValueProp = 'xs' 
  | 'sm' | 'md' | 'lg' | 'xl' 
  | '2xl' | '3xl' | '4xl' | '5xl'
  | 'xl2' | 'xl3' | 'xl4' | 'xl5'
  | 'fourth' | 'third' | 'half' | 'full';

export type SizeValueProps = {
  xs?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  xl?: boolean,
  xl2?: boolean,
  xl3?: boolean,
  xl4?: boolean,
  xl5?: boolean,
  fourth?: boolean,
  third?: boolean,
  half?: boolean,
  full?: boolean,
  size?: string | number
};

export type BorderSizeProps = {
  ba?: string | number,
  bas?: string | number,
  bb?: string | number,
  bbs?: string | number,
  bds?: string | number,
  bl?: string | number,
  bls?: string | number,
  br?: string | number,
  brs?: string | number,
  bt?: string | number,
  bts?: string | number,
  bx?: string | number,
  bxs?: string | number,
  by?: string | number,
  bys?: string | number
};

export type DimensionSizeProps = {
  h?: string | number,
  w?: string | number,
  minh?: string | number,
  minw?: string | number,
  maxh?: string | number,
  maxw?: string | number
};

export type MarginSizeProps = {
  ma?: string | number,
  mas?: string | number,
  mb?: string | number,
  mbs?: string | number,
  ml?: string | number,
  mls?: string | number,
  mr?: string | number,
  mrs?: string | number,
  mt?: string | number,
  mts?: string | number,
  mx?: string | number,
  mxs?: string | number,
  my?: string | number,
  mys?: string | number
};

export type PaddingSizeProps = {
  pa?: string | number,
  pas?: string | number,
  pb?: string | number,
  pbs?: string | number,
  pl?: string | number,
  pls?: string | number,
  pr?: string | number,
  prs?: string | number,
  pt?: string | number,
  pts?: string | number,
  px?: string | number,
  pxs?: string | number,
  py?: string | number,
  pys?: string | number
};

export type TextSizeProps = {
  txs?: string | number
};

export type SizeProps = SizeValueProps
  & BorderSizeProps
  & DimensionSizeProps
  & MarginSizeProps
  & PaddingSizeProps
  & TextSizeProps;

//--------------------------------------------------------------------//
// Classes

export class SizeTool<P extends Hash> extends PropTool<P, SizeProps> {
  //both prop names and values
  public static readonly values = [ 
    'xs', 'sm', 'md', 'lg', 'xl', 
    'xl2', 'xl3', 'xl4', 'xl5', 
    '2xl', '3xl', '4xl', '5xl', 
    'fourth', 'third', 'half', 'full'
  ];

  //aliases that map to multiple class names
  public static readonly classmap: Record<string, string[]> = {
    'ba': [ 'bbs', 'bls', 'brs', 'bts' ],
    'bas': [ 'bbs', 'bls', 'brs', 'bts' ],
    'bds': [ 'bbs', 'bls', 'brs', 'bts' ],
    'bb': [ 'bbs' ],
    'bl': [ 'bls' ],
    'br': [ 'brs' ],
    'bt': [ 'bts' ],
    'bx': [ 'bls', 'brs' ],
    'bxs': [ 'bls', 'brs' ],
    'by': [ 'bts', 'bbs' ],
    'bys': [ 'bts', 'bbs' ],
    'ma': [ 'mbs', 'mls', 'mrs', 'mts' ],
    'mas': [ 'mbs', 'mls', 'mrs', 'mts' ],
    'mb': [ 'mbs' ],
    'ml': [ 'mls' ],
    'mr': [ 'mrs' ],
    'mt': [ 'mts' ],
    'mx': [ 'mls', 'mrs' ],
    'mxs': [ 'mls', 'mrs' ],
    'my': [ 'mts', 'mbs' ],
    'mys': [ 'mts', 'mbs' ],
    'pa': [ 'pbs', 'pls', 'prs', 'pts' ],
    'pas': [ 'pbs', 'pls', 'prs', 'pts' ],
    'pb': [ 'pbs' ],
    'pl': [ 'pls' ],
    'pr': [ 'prs' ],
    'pt': [ 'pts' ],
    'px': [ 'pls', 'prs' ],
    'py': [ 'pts', 'pbs' ],
    'pxs': [ 'pls', 'prs' ],
    'pys': [ 'pts', 'pbs' ]
  };

  public static readonly stylemap: Record<string, string> = {
    'txs': 'fontSize',
    'bbs': 'borderBottomWidth',
    'bls': 'borderLeftWidth',
    'brs': 'borderRightWidth',
    'bts': 'borderTopWidth',
    'mbs': 'marginBottom',
    'mls': 'marginLeft',
    'mrs': 'marginRight',
    'mts': 'marginTop',
    'pbs': 'paddingBottom',
    'pls': 'paddingLeft',
    'prs': 'paddingRight',
    'pts': 'paddingTop',
    'w': 'width',
    'h': 'height',
    'minw': 'minWidth',
    'minh': 'minHeight',
    'maxw': 'maxWidth',
    'maxh': 'maxHeight'
  };

  //prop name if provided, will use the type defined in constructor
  public static readonly typeKey = 'size';

  //list of size prop keys
  public static readonly keys = [ 
    ...SizeTool.values,
    ...Object.keys(SizeTool.classmap),
    ...Object.keys(SizeTool.stylemap),
    SizeTool.typeKey
  ];
  
  //type of size prop
  protected _type: SizeTypeProp;

  /**
   * Factory
   */
  public static get<P extends Hash>(props: P, type: SizeTypeProp) {
    return new this(props, type);
  }

  /**
   * Sets up prop tools
   */
  public constructor(props: P, type: SizeTypeProp) {
    super(props, SizeTool.keys);
    this._type = type;
  }

  /**
   * Get class styles for size prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {} } = options;
    this.active.forEach(key => {
      //get value
      const value = typeof this._props[key] === 'number'
        ? `${this._props[key]}px`
        : this._props[key];
      //if value is a string (2px, md, etc.)
      if (typeof value === 'string') {
        //if key is explicitly 'size'
        // ex. size="2px"
        // ex. size="md"
        if (key === SizeTool.typeKey) {
          this.setType(this._type, value, classes, styles);
        //key is not 'size'...
        //if key maps to a style property
        // ex. txs="2px"
        // ex. bbs="md"
        } else if (typeof SizeTool.stylemap[key] === 'string') {
          this.setType(key, value, classes, styles);
        //if key maps to a set of class names
        // ex. ba="md"
        } else if (Array.isArray(SizeTool.classmap[key]) ) {
          //for example, 'ba' maps to ['bbs', 'bls', 'brs', 'bts']
          SizeTool.classmap[key].forEach(classKey => {
            this.setType(classKey, value, classes, styles);
          });
        }
        //key is not 'size' or a style map, or a class map, then ignore?
      //if key is valid value (like a flag prop) and the value is truthy
      // ex. sm={true}
      // ex. md={false}
      } else if (Boolean(value) && SizeTool.values.includes(key)) {
        //...then key is actually the value, and we should get the key 
        // from the instantiated type...
        //handle xl2, xl3, xl4, xl5 aliases
        key = key
          .replace('xl2', '2xl')
          .replace('xl3', '3xl')
          .replace('xl4', '4xl')
          .replace('xl5', '5xl');
        //from txs, bas, bbs, ... to tx, ba, bb, ...
        const type = this._type.substring(0, 2); 
        //if type maps to a set of class names
        // ex. this._type = 'ba'
        if (Array.isArray(SizeTool.classmap[this._type]) ) {
          //for example, 'ba' maps to ['bbs', 'bls', 'brs', 'bts']
          SizeTool.classmap[this._type].forEach(type => {
            //ex. frui-bb-sm
            classes.push(`frui-${type.substring(0, 2)}-${key}`);
          });
        } else {
          //form the class name
          // ex. frui-tx-info
          classes.push(`frui-${type}-${key}`);
        }
      }
    });
    return { classes: Array.from(new Set(classes)), styles };
  }

  /**
   * Returns true if any border props are active
   */
  public hasBorderProps() {
    //determine the active key
    return this.active.find(key => [
      'ba', 'bas', 
      'bb', 'bbs', 
      'bl', 'bls', 
      'br', 'brs',
      'bt', 'bts', 
      'bx', 'bxs', 
      'by', 'bys',
      'bds'
    ].includes(key));
  }

  /**
   * Returns true if any dimension props are active
   */
  public hasDimensionProps() {
    //determine the active key
    return this.active.find(key => [
      'w', 'h', 
      'minw', 'minh', 
      'maxw', 'maxh'
    ].includes(key));
  }

  /**
   * Returns true if any margin props are active
   */
  public hasMarginProps() {
    //determine the active key
    return this.active.find(key => [
      'ma', 'mas', 
      'mb', 'mbs', 
      'ml', 'mls', 
      'mr', 'mrs',
      'mt', 'mts', 
      'mx', 'mxs', 
      'my', 'mys'
    ].includes(key));
  }

  /**
   * Returns true if any padding props are active
   */
  public hasPaddingProps() {
    //determine the active key
    return this.active.find(key => [
      'pa', 'pas', 
      'pb', 'pbs', 
      'pl', 'pls', 
      'pr', 'prs',
      'pt', 'pts', 
      'px', 'pxs', 
      'py', 'pys'
    ].includes(key));
  }

  /**
   * Returns true if any text size props are active
   */
  public hasTextProps() {
    //determine the active key
    return this.active.find(key => [
      'txs'
    ].includes(key));
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
    //if the value is a predefined size
    // ex. size="md"
    if (SizeTool.values.includes(value)) {
      //handle xl2, xl3, xl4, xl5 aliases
      value = value
        .replace('xl2', '2xl')
        .replace('xl3', '3xl')
        .replace('xl4', '4xl')
        .replace('xl5', '5xl');
      //form the class name
      // ex. frui-tx-md
      classes.push(`frui-${classType}-${value}`);
    //value is not a predefined size
    // ex. size="2px"
    //if the type maps to a style property
    // ex. txs: fontSize
    } else if (typeof SizeTool.stylemap[type] === 'string') {
      styles[SizeTool.stylemap[type] as SizeStyleKey] = value;
    }
  }
};

export default SizeTool;