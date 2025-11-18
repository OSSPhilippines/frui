import type { 
  BackgroundColorProps, 
  ColorProps, 
  Hash 
} from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';


export class BackgroundColorTool<P extends Hash> 
  extends PropTool<P, BackgroundColorProps> 
{
  //list of background color prop keys
  public static keys = [
    'bgcolor',
    'bginfo',
    'bgwarning',
    'bgsuccess',
    'bgerror',
    'bgmuted',
    'bgblack',
    'bgwhite',
    'bgprimary',
    'bgsecondary',
    'bgtertiary'
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
    super(props, BackgroundColorTool.keys);
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
      if (key === 'bgcolor') {
        //if props color is a string
        if (typeof value === 'string') {
          //manually set the color style
          styles.backgroundColor = value;
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
    //map background color keys to color keys
    for (const key of BackgroundColorTool.keys) {
      //if prop is undefined, skip
      if (typeof this.props[key] === 'undefined') continue;
      //make the corresponding color key
      const colorKey = key.substring(2) as keyof ColorProps;
      //set color prop
      colorProps[colorKey] = this.props[key];
    }
    return colorProps;
  }
}

export default BackgroundColorTool;