import type { DisplayProps, Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

export class DisplayTool<P extends Hash>
  extends PropTool<P, DisplayProps>
{
  //list of display prop keys
  public static keys = [ 
    'block', 
    'inline', 
    'iblock', 
    'flex', 
    'iflex', 
    'grid', 
    'igrid', 
    'hidden' 
  ];

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
    super(props, DisplayTool.keys);
  }

  /**
   * Get class styles for display prop
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

export default DisplayTool;