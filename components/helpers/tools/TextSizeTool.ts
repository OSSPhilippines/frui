import type { TextSizeProps, Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

export class TextSizeTool<P extends Hash>
  extends PropTool<P, TextSizeProps>
{
  //list of size prop keys
  public static keys = [ 
    'xs', 'sm', 'md', 
    'lg', 'xl', 'xl2', 
    'xl3', 'xl4', 'xl5' 
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
    super(props, TextSizeTool.keys);
  }

  /**
   * Get class styles for size prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {}, key: defaultKey } = options;
    //get key and value
    const key = this.key || defaultKey;
    //if there is a key
    if (typeof key === 'string') {
      //form the class name
      classes.push(`frui-tx-${key}`);
    }
    return { classes, styles };
  }
};

export default TextSizeTool;