import type { FillProps, Hash } from '../../types.js';
import type { ClassStyleOptions } from './PropTool.js';
import PropTool from './PropTool.js';
import ColorTool from './ColorTool.js';

export class FillTool<P extends Hash>
  extends PropTool<P, FillProps>
{
  //list of fill prop keys
  public static keys = [ 'fill', 'outline' ];

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
    this._bdcolor = new ColorTool(props, 'bd');
    this._bgcolor = new ColorTool(props, 'bg');
    this._txcolor = new ColorTool(props, 'tx');
  }

  /**
   * Get class styles for fill prop
   */
  public getClassStyles(options: ClassStyleOptions) {
    //extract options
    const { classes = [], styles = {}, key: defaultKey } = options;
    //get key and value
    const key = this.key || defaultKey;
    //if there is a key
    if (key === 'outline') {
      classes.push('frui-solid', 'frui-thin');
      this._bdcolor.getClassStyles({ classes, styles });
      this._txcolor.getClassStyles({ classes, styles });
    //it's fill mode
    } else if (key === 'fill') {
      classes.push('frui-tx-white');
      this._bgcolor.getClassStyles({ classes, styles });
    }
    return { classes, styles };
  }
};

export default FillTool;