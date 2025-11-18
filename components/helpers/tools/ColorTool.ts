import type { ColorProps, ColorPropType, Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

export class ColorTool<P extends Hash> 
  extends PropTool<P, ColorProps> 
{
  //list of color prop keys
  public static keys = [
    'color',
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

  /**
   * Factory
   */
  public static get<P extends Hash>(props: P, type: ColorPropType) {
    return new this(props, type);
  }

  //type of color prop
  protected _type: ColorPropType;

  /**
   * Sets up prop tools
   */
  public constructor(props: P, type: ColorPropType) {
    super(props, ColorTool.keys);
    this._type = type;
  }

  /**
   * Get class styles for color prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {}, key: defaultKey } = options;
    //get key and value
    const key = this.key || defaultKey;
    const value = this.value;
    //if there is a key
    if (typeof key === 'string') {
      //if key is explicitly 'color'
      if (key === 'color') {
        //if props color is a string
        if (typeof value === 'string') {
          //manually set the color style
          switch (this._type) {
            case 'bg':
              styles.backgroundColor = value;
              break;
            case 'bd':
              styles.borderColor = value;
              break;
            case 'tx':
              styles.color = value;
              break;
          }
        }
        //props color is not a string, do nothing
      //key is not explicitly 'color', so it's a predefined color
      } else {
        //form the class name
        classes.push(`frui-${this._type}-${key}`);
      }
    }
    return { classes, styles };
  }
};

export default ColorTool;