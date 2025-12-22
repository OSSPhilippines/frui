//--------------------------------------------------------------------//
// Imports

import type { Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

//--------------------------------------------------------------------//
// Types

export type TextAlignProps = {
  left?: boolean,
  center?: boolean,
  right?: boolean,
  justify?: boolean
  align?: string
};

//--------------------------------------------------------------------//
// Classes

export class TextAlignTool<P extends Hash>
  extends PropTool<P, TextAlignProps>
{
  //list of text align prop keys
  public static keys = [ 'left', 'center', 'right', 'justify' ];

  /**
   * Factory
   */
  public static get<P extends Hash>(props: P) {
    return new this(props);
  }

  /**
   * Sets up prop tools
   */
  public constructor(props: P) {
    super(props, TextAlignTool.keys);
  }

  /**
   * Get class styles for text align prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {} } = options;
    //compute key (once)
    const key = this.key;
    //if there is a key
    if (typeof key === 'string') {
      //form the class name
      classes.push(`frui-tx-${key}`);
    }
    return { classes, styles };
  }
};

export default TextAlignTool;