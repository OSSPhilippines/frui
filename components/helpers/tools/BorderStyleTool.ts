import type { BorderStyleProps, Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

export class BorderStyleTool<P extends Hash>
  extends PropTool<P, BorderStyleProps>
{
  //list of border radius prop keys
  public static keys = [ 'solid', 'dashed', 'dotted' ];

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
    super(props, BorderStyleTool.keys);
  }

  /**
   * Get class styles for border radius prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {}, key: defaultKey } = options;
    //get key and value
    const key = this.key || defaultKey;
    //if there is a key
    if (typeof key === 'string') {
      //form the class name
      classes.push(`frui-${key}`);
    }
    return { classes, styles };
  }
};

export default BorderStyleTool;