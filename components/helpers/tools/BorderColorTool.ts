import type { 
  ColorProps, 
  BorderColorProps, 
  Hash 
} from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';

export class BorderColorTool<P extends Hash> 
  extends PropTool<P, BorderColorProps> 
{
  //list of background color prop keys
  public static keys = [
    'bdcolor',
    'bdinfo',
    'bdwarning',
    'bdsuccess',
    'bderror',
    'bdmuted',
    'bdblack',
    'bdwhite',
    'bdprimary',
    'bdsecondary',
    'bdtertiary'
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
    super(props, BorderColorTool.keys);
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
      if (key === 'bdcolor') {
        //if props color is a string
        if (typeof value === 'string') {
          //manually set the color style
          styles.borderColor = value;
        }
        //props color is not a string, do nothing
      //key is not explicitly 'color', so it's a predefined color
      } else {
        //form the class name
        classes.push(`frui-bg-${key}`);
      }
    }
    return { classes, styles };
  }

  /**
   * Renames keys to color keys
   */
  public toColorProps() {
    const colorProps: ColorProps = {};
    //map border color keys to color keys
    for (const key of BorderColorTool.keys) {
      //if prop is undefined, skip
      if (typeof this.props[key] === 'undefined') continue;
      //make the corresponding color key
      const colorKey = key.substring(2) as keyof ColorProps;
      //set color prop
      colorProps[colorKey] = this.props[key];
    }
    return colorProps;
  }
};

export default BorderColorTool;