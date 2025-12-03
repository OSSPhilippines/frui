//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Button from 'components/Button.js';
import Card from 'components/Card.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/tool/card';
const title = 'Card';
const description = 'The Card component is a flexible container for '
  + 'displaying content in a card layout.';

const props = [
  //card props
  [
    [ 'align', 'string', 'No', 'Custom text align value to apply to the card' ],
    [ 'applyColor', 'ColorTypeProp', 'No', 'Specifies which color type to apply (txc, bgc, bdc). Default is txc' ],
    [ 'applySize', 'SizeTypeProp', 'No', 'Specifies which size type to apply (txs, pa, ma, ba). Default is txs' ],
    [ 'asChild', 'boolean', 'No', 'If true, applies styles to the child element directly' ],
    [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the card' ],
    [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the card' ],
    [ 'bdc', 'string', 'No', 'Border color value to apply to the card' ],
    [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the card' ],
    [ 'bgc', 'string', 'No', 'Background color value to apply to the card' ],
    [ 'bl', 'string | number', 'No', 'Border left size value to apply to the card' ],
    [ 'black', 'boolean', 'No', 'If true, applies the black color to the card' ],
    [ 'block', 'boolean', 'No', 'If true, sets display to block' ],
    [ 'br', 'string | number', 'No', 'Border right size value to apply to the card' ],
    [ 'bt', 'string | number', 'No', 'Border top size value to apply to the card' ],
    [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the card' ],
    [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the card' ],
    [ 'center', 'boolean', 'No', 'If true, centers text inside the card' ],
    [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the card' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the card' ],
    [ 'color', 'string', 'No', 'Custom color value to apply to the card' ],
    [ 'curved', 'boolean', 'No', 'If true, applies curved border radius to the card' ],
    [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the card' ],
    [ 'display', 'string', 'No', 'Custom display value to apply to the card' ],
    [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the card' ],
    [ 'error', 'boolean', 'No', 'If true, applies the error color to the card' ],
    [ 'fill', 'boolean', 'No', 'If true, makes the card take the full width of its container' ],
    [ 'flex', 'boolean', 'No', 'If true, sets display to flex' ],
    [ 'grid', 'boolean', 'No', 'If true, sets display to grid' ],
    [ 'h', 'string | number', 'No', 'Height value to apply to the card' ],
    [ 'hidden', 'boolean', 'No', 'If true, hides the card' ],
    [ 'horizontal', 'boolean', 'No', 'Display card in horizontal layout' ],
    [ 'iblock', 'boolean', 'No', 'If true, sets display to inline-block' ],
    [ 'iflex', 'boolean', 'No', 'If true, sets display to inline-flex' ],
    [ 'igrid', 'boolean', 'No', 'If true, sets display to inline-grid' ],
    [ 'info', 'boolean', 'No', 'If true, applies the info color to the card' ],
    [ 'inline', 'boolean', 'No', 'If true, sets display to inline' ],
    [ 'justify', 'boolean', 'No', 'If true, justifies text inside the card' ],
    [ 'left', 'boolean', 'No', 'If true, aligns text to the left inside the card' ],
    [ 'lg', 'boolean', 'No', 'If true, applies large size to the card' ],
    [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the card' ],
    [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the card' ],
    [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the card' ],
    [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the card' ],
    [ 'md', 'boolean', 'No', 'If true, applies medium size to the card' ],
    [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the card' ],
    [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the card' ],
    [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the card' ],
    [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the card' ],
    [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the card' ],
    [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the card' ],
    [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the card' ],
    [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the card' ],
    [ 'outline', 'boolean', 'No', 'If true, applies an outline style to the card' ],
    [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the card' ],
    [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the card' ],
    [ 'pill', 'boolean', 'No', 'If true, applies pill border radius to the card' ],
    [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the card' ],
    [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the card' ],
    [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the card' ],
    [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the card' ],
    [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the card' ],
    [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the card' ],
    [ 'radius', 'string | number', 'No', 'Custom border radius value to apply to the card' ],
    [ 'right', 'boolean', 'No', 'If true, aligns text to the right inside the card' ],
    [ 'rounded', 'boolean', 'No', 'If true, applies rounded border radius to the card' ],
    [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the card' ],
    [ 'sm', 'boolean', 'No', 'If true, applies small size to the card' ],
    [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the card' ],
    [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the card' ],
    [ 'success', 'boolean', 'No', 'If true, applies the success color to the card' ],
    [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the card' ],
    [ 'txc', 'string', 'No', 'Text color value to apply to the card' ],
    [ 'txs', 'string | number', 'No', 'Text size value to apply to the card' ],
    [ 'w', 'string | number', 'No', 'Width value to apply to the card' ],
    [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the card' ],
    [ 'white', 'boolean', 'No', 'If true, applies the white color to the card' ],
    [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the card' ],
    [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the card' ],
    [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the card' ],
    [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the card' ],
    [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the card' ],
    [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the card' ]
  ],
  //card head props
  [
    [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the head' ],
    [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the head' ],
    [ 'bdc', 'string', 'No', 'Border color value to apply to the head' ],
    [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the head' ],
    [ 'bgc', 'string', 'No', 'Background color value to apply to the head' ],
    [ 'bl', 'string | number', 'No', 'Border left size value to apply to the head' ],
    [ 'black', 'boolean', 'No', 'If true, applies the black color to the head' ],
    [ 'br', 'string | number', 'No', 'Border right size value to apply to the head' ],
    [ 'bt', 'string | number', 'No', 'Border top size value to apply to the head' ],
    [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the head' ],
    [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the head' ],
    [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the head' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the head' ],
    [ 'color', 'string', 'No', 'Custom color value to apply to the head' ],
    [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the head' ],
    [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the head' ],
    [ 'error', 'boolean', 'No', 'If true, applies the error color to the head' ],
    [ 'h', 'string | number', 'No', 'Height value to apply to the head' ],
    [ 'lg', 'boolean', 'No', 'If true, applies large size to the head' ],
    [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the head' ],
    [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the head' ],
    [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the head' ],
    [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the head' ],
    [ 'md', 'boolean', 'No', 'If true, applies medium size to the head' ],
    [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the head' ],
    [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the head' ],
    [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the head' ],
    [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the head' ],
    [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the head' ],
    [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the head' ],
    [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the head' ],
    [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the head' ],
    [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the head' ],
    [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the head' ],
    [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the head' ],
    [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the head' ],
    [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the head' ],
    [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the head' ],
    [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the head' ],
    [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the head' ],
    [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the head' ],
    [ 'sm', 'boolean', 'No', 'If true, applies small size to the head' ],
    [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the head' ],
    [ 'stretch', 'boolean', 'No', 'If true, makes the head stretch to fill available space' ],
    [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the head' ],
    [ 'success', 'boolean', 'No', 'If true, applies the success color to the head' ],
    [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the head' ],
    [ 'txc', 'string', 'No', 'Text color value to apply to the head' ],
    [ 'txs', 'string | number', 'No', 'Text size value to apply to the head' ],
    [ 'w', 'string | number', 'No', 'Width value to apply to the head' ],
    [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the head' ],
    [ 'white', 'boolean', 'No', 'If true, applies the white color to the head' ],
    [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the head' ],
    [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the head' ],
    [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the head' ],
    [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the head' ],
    [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the head' ],
    [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the head' ]
  ],
  //card body props
  [
    [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the body' ],
    [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the body' ],
    [ 'bdc', 'string', 'No', 'Border color value to apply to the body' ],
    [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the body' ],
    [ 'bgc', 'string', 'No', 'Background color value to apply to the body' ],
    [ 'bl', 'string | number', 'No', 'Border left size value to apply to the body' ],
    [ 'black', 'boolean', 'No', 'If true, applies the black color to the body' ],
    [ 'br', 'string | number', 'No', 'Border right size value to apply to the body' ],
    [ 'bt', 'string | number', 'No', 'Border top size value to apply to the body' ],
    [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the body' ],
    [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the body' ],
    [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the body' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the body' ],
    [ 'color', 'string', 'No', 'Custom color value to apply to the body' ],
    [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the body' ],
    [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the body' ],
    [ 'error', 'boolean', 'No', 'If true, applies the error color to the body' ],
    [ 'h', 'string | number', 'No', 'Height value to apply to the body' ],
    [ 'lg', 'boolean', 'No', 'If true, applies large size to the body' ],
    [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the body' ],
    [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the body' ],
    [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the body' ],
    [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the body' ],
    [ 'md', 'boolean', 'No', 'If true, applies medium size to the body' ],
    [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the body' ],
    [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the body' ],
    [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the body' ],
    [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the body' ],
    [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the body' ],
    [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the body' ],
    [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the body' ],
    [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the body' ],
    [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the body' ],
    [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the body' ],
    [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the body' ],
    [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the body' ],
    [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the body' ],
    [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the body' ],
    [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the body' ],
    [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the body' ],
    [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the body' ],
    [ 'sm', 'boolean', 'No', 'If true, applies small size to the body' ],
    [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the body' ],
    [ 'stretch', 'boolean', 'No', 'If true, makes the head stretch to fill available space' ],
    [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the body' ],
    [ 'success', 'boolean', 'No', 'If true, applies the success color to the body' ],
    [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the body' ],
    [ 'txc', 'string', 'No', 'Text color value to apply to the body' ],
    [ 'txs', 'string | number', 'No', 'Text size value to apply to the body' ],
    [ 'w', 'string | number', 'No', 'Width value to apply to the body' ],
    [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the body' ],
    [ 'white', 'boolean', 'No', 'If true, applies the white color to the body' ],
    [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the body' ],
    [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the body' ],
    [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the body' ],
    [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the body' ],
    [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the body' ],
    [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the body' ]
  ],
  //card foot props
  [
    [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the foot' ],
    [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the foot' ],
    [ 'bdc', 'string', 'No', 'Border color value to apply to the foot' ],
    [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the foot' ],
    [ 'bgc', 'string', 'No', 'Background color value to apply to the foot' ],
    [ 'bl', 'string | number', 'No', 'Border left size value to apply to the foot' ],
    [ 'black', 'boolean', 'No', 'If true, applies the black color to the foot' ],
    [ 'br', 'string | number', 'No', 'Border right size value to apply to the foot' ],
    [ 'bt', 'string | number', 'No', 'Border top size value to apply to the foot' ],
    [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the foot' ],
    [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the foot' ],
    [ 'center', 'boolean', 'No', 'If true, centers text inside the foot' ],
    [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the foot' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the foot' ],
    [ 'color', 'string', 'No', 'Custom color value to apply to the foot' ],
    [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the foot' ],
    [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the foot' ],
    [ 'error', 'boolean', 'No', 'If true, applies the error color to the foot' ],
    [ 'h', 'string | number', 'No', 'Height value to apply to the foot' ],
    [ 'left', 'boolean', 'No', 'If true, aligns text to the left inside the foot' ],
    [ 'lg', 'boolean', 'No', 'If true, applies large size to the foot' ],
    [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the foot' ],
    [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the foot' ],
    [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the foot' ],
    [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the foot' ],
    [ 'md', 'boolean', 'No', 'If true, applies medium size to the foot' ],
    [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the foot' ],
    [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the foot' ],
    [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the foot' ],
    [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the foot' ],
    [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the foot' ],
    [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the foot' ],
    [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the foot' ],
    [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the foot' ],
    [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the foot' ],
    [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the foot' ],
    [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the foot' ],
    [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the foot' ],
    [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the foot' ],
    [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the foot' ],
    [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the foot' ],
    [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the foot' ],
    [ 'right', 'boolean', 'No', 'If true, aligns text to the right inside the foot' ],
    [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the foot' ],
    [ 'sm', 'boolean', 'No', 'If true, applies small size to the foot' ],
    [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the foot' ],
    [ 'stretch', 'boolean', 'No', 'If true, makes the head stretch to fill available space' ],
    [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the foot' ],
    [ 'success', 'boolean', 'No', 'If true, applies the success color to the foot' ],
    [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the foot' ],
    [ 'txc', 'string', 'No', 'Text color value to apply to the foot' ],
    [ 'txs', 'string | number', 'No', 'Text size value to apply to the foot' ],
    [ 'w', 'string | number', 'No', 'Width value to apply to the foot' ],
    [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the foot' ],
    [ 'white', 'boolean', 'No', 'If true, applies the white color to the foot' ],
    [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the foot' ],
    [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the foot' ],
    [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the foot' ],
    [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the foot' ],
    [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the foot' ],
    [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the foot' ]
  ],
  //card title props
  [
    [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the title' ],
    [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the title' ],
    [ 'bdc', 'string', 'No', 'Border color value to apply to the title' ],
    [ 'bgc', 'string', 'No', 'Background color value to apply to the title' ],
    [ 'bl', 'string | number', 'No', 'Border left size value to apply to the title' ],
    [ 'black', 'boolean', 'No', 'If true, applies the black color to the title' ],
    [ 'bold', 'boolean', 'No', 'Apply bold text style' ],
    [ 'br', 'string | number', 'No', 'Border right size value to apply to the title' ],
    [ 'bt', 'string | number', 'No', 'Border top size value to apply to the title' ],
    [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the title' ],
    [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the title' ],
    [ 'capital', 'boolean', 'No', 'Apply capitalize text transform' ],
    [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the title' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the title' ],
    [ 'color', 'string', 'No', 'Custom color value to apply to the title' ],
    [ 'error', 'boolean', 'No', 'If true, applies the error color to the title' ],
    [ 'h', 'string | number', 'No', 'Height value to apply to the title' ],
    [ 'h1', 'boolean', 'No', 'Render as h1 element' ],
    [ 'h2', 'boolean', 'No', 'Render as h2 element' ],
    [ 'h3', 'boolean', 'No', 'Render as h3 element' ],
    [ 'h4', 'boolean', 'No', 'Render as h4 element' ],
    [ 'h5', 'boolean', 'No', 'Render as h5 element' ],
    [ 'h6', 'boolean', 'No', 'Render as h6 element' ],
    [ 'italic', 'boolean', 'No', 'Apply italic text style' ],
    [ 'lg', 'boolean', 'No', 'If true, applies large size to the title' ],
    [ 'lower', 'boolean', 'No', 'Apply lowercase text transform' ],
    [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the title' ],
    [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the title' ],
    [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the title' ],
    [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the title' ],
    [ 'md', 'boolean', 'No', 'If true, applies medium size to the title' ],
    [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the title' ],
    [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the title' ],
    [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the title' ],
    [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the title' ],
    [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the title' ],
    [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the title' ],
    [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the title' ],
    [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the title' ],
    [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the title' ],
    [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the title' ],
    [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the title' ],
    [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the title' ],
    [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the title' ],
    [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the title' ],
    [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the title' ],
    [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the title' ],
    [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the title' ],
    [ 'semi', 'boolean', 'No', 'Apply semi-bold text style' ],
    [ 'sm', 'boolean', 'No', 'If true, applies small size to the title' ],
    [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the title' ],
    [ 'success', 'boolean', 'No', 'If true, applies the success color to the title' ],
    [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the title' ],
    [ 'txc', 'string', 'No', 'Text color value to apply to the title' ],
    [ 'txs', 'string | number', 'No', 'Text size value to apply to the title' ],
    [ 'upper', 'boolean', 'No', 'Apply uppercase text transform' ],
    [ 'w', 'string | number', 'No', 'Width value to apply to the title' ],
    [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the title' ],
    [ 'white', 'boolean', 'No', 'If true, applies the white color to the title' ],
    [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the title' ],
    [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the title' ],
    [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the title' ],
    [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the title' ],
    [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the title' ],
    [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the title' ]
  ],
  //card description props
  [
    [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the description' ],
    [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the description' ],
    [ 'bdc', 'string', 'No', 'Border color value to apply to the description' ],
    [ 'bgc', 'string', 'No', 'Background color value to apply to the description' ],
    [ 'bl', 'string | number', 'No', 'Border left size value to apply to the description' ],
    [ 'black', 'boolean', 'No', 'If true, applies the black color to the description' ],
    [ 'bold', 'boolean', 'No', 'Apply bold text style' ],
    [ 'br', 'string | number', 'No', 'Border right size value to apply to the description' ],
    [ 'bt', 'string | number', 'No', 'Border top size value to apply to the description' ],
    [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the description' ],
    [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the description' ],
    [ 'capital', 'boolean', 'No', 'Apply capitalize text transform' ],
    [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the description' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the description' ],
    [ 'color', 'string', 'No', 'Custom color value to apply to the description' ],
    [ 'error', 'boolean', 'No', 'If true, applies the error color to the description' ],
    [ 'h', 'string | number', 'No', 'Height value to apply to the description' ],
    [ 'italic', 'boolean', 'No', 'Apply italic text style' ],
    [ 'lg', 'boolean', 'No', 'If true, applies large size to the description' ],
    [ 'lower', 'boolean', 'No', 'Apply lowercase text transform' ],
    [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the description' ],
    [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the description' ],
    [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the description' ],
    [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the description' ],
    [ 'md', 'boolean', 'No', 'If true, applies medium size to the description' ],
    [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the description' ],
    [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the description' ],
    [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the description' ],
    [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the description' ],
    [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the description' ],
    [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the description' ],
    [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the description' ],
    [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the description' ],
    [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the description' ],
    [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the description' ],
    [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the description' ],
    [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the description' ],
    [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the description' ],
    [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the description' ],
    [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the description' ],
    [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the description' ],
    [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the description' ],
    [ 'semi', 'boolean', 'No', 'Apply semi-bold text style' ],
    [ 'sm', 'boolean', 'No', 'If true, applies small size to the description' ],
    [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the description' ],
    [ 'success', 'boolean', 'No', 'If true, applies the success color to the description' ],
    [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the description' ],
    [ 'txc', 'string', 'No', 'Text color value to apply to the description' ],
    [ 'txs', 'string | number', 'No', 'Text size value to apply to the description' ],
    [ 'upper', 'boolean', 'No', 'Apply uppercase text transform' ],
    [ 'w', 'string | number', 'No', 'Width value to apply to the description' ],
    [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the description' ],
    [ 'white', 'boolean', 'No', 'If true, applies the white color to the description' ],
    [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the description' ],
    [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the description' ],
    [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the description' ],
    [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the description' ],
    [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the description' ],
    [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the description' ]
  ]
];

const examples = [
//0
`<Card ba="xs" solid bdc="black" curved pa="2xl">
  <Card.Title h2 bold>Card Title</Card.Title>
  <Card.Description py="2xl">
    This is a description of the card. It provides additional
    information about the content of the card.
  </Card.Description>
  <Button info>Action</Button>
</Card>`,
//1
`<Card ba="xs" solid bdc="black" curved>
  <Card.Head h="5xl">
    <img width="100%" src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
  </Card.Head>
  <Card.Body pa="2xl">
    <Card.Title h2 bold upper>The perfect latte</Card.Title>
    <Card.Description>
      Caffè latte is a coffee beverage of Italian origin 
      made with espresso and steamed milk.
    </Card.Description>
  </Card.Body>
  <Card.Foot pa="2xl" bdc="primary" bl="xs" dotted right>
    <Button error>
      <i className="fa fa-trash" /> Cancel
    </Button>
    &nbsp;
    <Button success>
      <i className="fa fa-check-circle" /> Choose
    </Button>
  </Card.Foot>
</Card>`,
//2
`<Card ba="xs" solid bdc="black">
  <Card.Head pa="2xl" primary>
    <Card.Title h2 bold upper white>Card Title</Card.Title>
  </Card.Head>
  <Card.Body pa="2xl">
    <Card.Description lower>
      This is a description of the card. It provides additional
      information about the content of the card.
    </Card.Description>
  </Card.Body>
  <Card.Foot pa="2xl" bdc="primary" bt="xs" dotted right>
    <Button info>Action</Button>
  </Card.Foot>
</Card>`,
//3
`<Card ba="xs" solid bdc="black" horizontal>
  <Card.Head>
    <img width="300" src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
  </Card.Head>
  <Card.Body pa="2xl">
    <Card.Title h2 bold upper>The perfect latte</Card.Title>
    <Card.Description>
      Caffè latte is a coffee beverage of Italian origin 
      made with espresso and steamed milk.
    </Card.Description>
  </Card.Body>
  <Card.Foot pa="2xl" bdc="primary" bl="xs" dotted right>
    <Button error>
      <i className="fa fa-trash" /> 
      Cancel
    </Button>
    &nbsp;
    <Button success>
      <i className="fa fa-check-circle" /> 
      Choose
    </Button>
  </Card.Foot>
</Card>`
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

/**
 * Aside right menu component
 */
export function Menu() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <aside className={
      'hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 '
      + 'border-l theme-bc-1 text-sm'
    }>
      <h4 className={
        'p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase '
        + 'font-semibold'
      }>
        {_('Contents')}
      </h4>
      <div className="p-3">
        <a className="block pb-1 font-bold" href="#top">
          {_('Card')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#structure">{_('Head Body Foot')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styling">{_('Styling Cards')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#horizontal">{_('Horizontal Cards')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Card')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the when tool like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Card from 'frui/Card';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Card>" /> tool is a low-level component used 
            to group related content and actions.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Card ba="xs" solid bdc="black" curved pa="2xl">
              <Card.Title h2 bold>Card Title</Card.Title>
              <Card.Description py="2xl">
                This is a description of the card. It provides additional
                information about the content of the card.
              </Card.Description>
              <Button info>Action</Button>
            </Card>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="structure" className="uppercase font-bold text-lg mt-8">
        {_('Head Body Foot')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Cards can be structured using the
            <C l value="<Card.Head>" />, <C value="<Card.Body>" /> and 
            <C l value="<Card.Foot>" /> components to define the header, body 
            and footer sections of the card respectively.
          </Translate>
        </p>

        <Preview 
          title="Image Card Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Card ba="xs" solid bdc="black" curved>
              <Card.Head h="5xl">
                <img width="100%" src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
              </Card.Head>
              <Card.Body pa="2xl">
                <Card.Title h2 bold upper>The perfect latte</Card.Title>
                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin 
                  made with espresso and steamed milk.
                </Card.Description>
              </Card.Body>
              <Card.Foot pa="2xl" bdc="primary" bl="xs" dotted right>
                <Button error>
                  <i className="fa fa-trash" /> Cancel
                </Button>
                &nbsp;
                <Button success>
                  <i className="fa fa-check-circle" /> Choose
                </Button>
              </Card.Foot>
            </Card>
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>
      
      <h2 id="styling" className="uppercase font-bold text-lg mt-8">
        {_('Styling Cards')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Cards can be styled using various props to adjust their
            appearance, such as borders, colors, and spacing.
          </Translate>
        </p>
        <Preview 
          title="Modal Style Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Card ba="xs" solid bdc="black">
              <Card.Head pa="2xl" primary>
                <Card.Title h2 bold upper white>Card Title</Card.Title>
              </Card.Head>
              <Card.Body pa="2xl">
                <Card.Description lower>
                  This is a description of the card. It provides additional
                  information about the content of the card.
                </Card.Description>
              </Card.Body>
              <Card.Foot pa="2xl" bdc="primary" bt="xs" dotted right>
                <Button info>Action</Button>
              </Card.Foot>
            </Card>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>
      
      <h2 id="horizontal" className="uppercase font-bold text-lg mt-8">
        {_('Horizontal Cards')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Cards can be displayed in a horizontal layout by using the 
            <C l value="horizontal" /> prop. This is useful for showcasing
            content side by side.
          </Translate>
        </p>
        <Preview 
          title="Horizontal Card Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Card ba="xs" solid bdc="black" horizontal>
              <Card.Head>
                <img width="300" src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
              </Card.Head>
              <Card.Body pa="2xl">
                <Card.Title h2 bold upper>The perfect latte</Card.Title>
                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin 
                  made with espresso and steamed milk.
                </Card.Description>
              </Card.Body>
              <Card.Foot pa="2xl" bdc="primary" bl="xs" dotted right>
                <Button error>
                  <i className="fa fa-trash" /> 
                  Cancel
                </Button>
                &nbsp;
                <Button success>
                  <i className="fa fa-check-circle" /> 
                  Choose
                </Button>
              </Card.Foot>
            </Card>
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each card 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Card>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Head')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Card.Head>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[1]} />

        <h3 className="font-semibold mt-4">{_('Body')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Card.Body>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[2]} />

        <h3 className="font-semibold mt-4">{_('Foot')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Card.Foot>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[3]} />

        <h3 className="font-semibold mt-4">{_('Title')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Card.Title>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[4]} />

        <h3 className="font-semibold mt-4">{_('Description')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Card.Description>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[5]} />
      </div>

      <Docs.Foot />
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <Docs.Head
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <Docs pathname={uri}>
      <Menu />
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;
