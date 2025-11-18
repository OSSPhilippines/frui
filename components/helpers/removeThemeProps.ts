import type { Hash } from '../types.js';
import BackgroundColorTool from '../helpers/tools/BackgroundColorTool.js';
import BorderColorTool from '../helpers/tools/BorderColorTool.js';
import BorderRadiusTool from '../helpers/tools/BorderRadiusTool.js';
import BorderStyleTool from './tools/BorderStyleTool.js';
import ColorTool from '../helpers/tools/ColorTool.js';
import DisplayTool from '../helpers/tools/DisplayTool.js';
import FillTool from '../helpers/tools/FillTool.js';
import TextAlignTool from '../helpers/tools/TextAlignTool.js';
import TextColorTool from '../helpers/tools/TextColorTool.js';
import TextSizeTool from '../helpers/tools/TextSizeTool.js';

/**
 * Remove all theme style props from config (non standard HTML props)
 */
export function removeThemeProps<P extends Hash>(config: P) {
  const remove1 = BackgroundColorTool.get(config);
  const remove2 = BorderColorTool.get(remove1.attributes);
  const remove3 = BorderRadiusTool.get(remove2.attributes);
  const remove4 = BorderStyleTool.get(remove3.attributes);
  const remove5 = ColorTool.get(remove4.attributes, 'tx');
  const remove6 = DisplayTool.get(remove5.attributes);
  const remove7 = FillTool.get(remove6.attributes);
  const remove8 = TextAlignTool.get(remove7.attributes);
  const remove9 = TextColorTool.get(remove8.attributes);
  const remove10 = TextSizeTool.get(remove9.attributes);
  return remove10.attributes;
};

export default removeThemeProps;