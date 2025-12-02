//--------------------------------------------------------------------//
// Imports

import type { Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';
import ColorTool from './ColorTool.js';

//--------------------------------------------------------------------//
// Types

export type FillProps = {
  fill?: boolean,
  outline?: boolean
};

//--------------------------------------------------------------------//
// Classes

export class FillTool<P extends Hash>
  extends PropTool<P, FillProps>
{
  //list of fill prop keys
  public static readonly keys = [ 'fill', 'outline' ];

  public static readonly textColorClasses = [
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
  ];

  /**
   * Factory
   */
  public static get<P extends Hash>(props: P) {
    return new this(props);
  }

  protected _bdcolor: ColorTool<P>;
  protected _bgcolor: ColorTool<P>;
  protected _txcolor: ColorTool<P>;

  /**
   * Sets up prop tools
   */
  public constructor(props: P) {
    super(props, FillTool.keys);
    this._bdcolor = new ColorTool(props, 'bdc');
    this._bgcolor = new ColorTool(props, 'bgc');
    this._txcolor = new ColorTool(props, 'txc');
  }

  /**
   * Get class styles for fill prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {} } = options;
    //compute key (once)
    const key = this.key;
    //if there is a key
    if (key === 'outline') {
      if (!styles.borderStyle
        && !styles.borderLeftStyle
        && !styles.borderRightStyle
        && !styles.borderTopStyle
        && !styles.borderBottomStyle
        && !classes.find(className => className === 'frui-solid')
        && !classes.find(className => className === 'frui-dashed')
        && !classes.find(className => className === 'frui-dotted')
      ) {
        classes.push('frui-solid');
      }
      if (!styles.borderWidth
        && !styles.borderLeftWidth
        && !styles.borderRightWidth
        && !styles.borderTopWidth
        && !styles.borderBottomWidth
        && !classes.find(className => className.includes('frui-bb-'))
        && !classes.find(className => className.includes('frui-bl-'))
        && !classes.find(className => className.includes('frui-br-'))
        && !classes.find(className => className.includes('frui-bt-'))
      ) {
        classes.push('frui-bb-xs');
        classes.push('frui-bl-xs');
        classes.push('frui-br-xs');
        classes.push('frui-bt-xs');
      }
      this._bdcolor.getClassStyles({ classes, styles });
      this._txcolor.getClassStyles({ classes, styles });
    //it's fill mode
    } else if (key === 'fill') {
      //remove any text color classes
      FillTool.textColorClasses.forEach(className => {
        const index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
        }
      });
      classes.push('frui-tx-white');
      this._bgcolor.getClassStyles({ classes, styles });
    }
    return { classes, styles };
  }
};

export default FillTool;