//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Button from 'components/Button.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/button';
const title = 'Button Component';
const description = 'Buttons allow users to trigger actions and events.';

const props = [
  [ 'align', 'string', 'No', 'Custom text align value to apply to the button' ],
  [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the button' ],
  [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the button' ],
  [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the button' ],
  [ 'bl', 'string | number', 'No', 'Border left size value to apply to the button' ],
  [ 'black', 'boolean', 'No', 'If true, applies the black color to the button' ],
  [ 'block', 'boolean', 'No', 'If true, sets display to block' ],
  [ 'br', 'string | number', 'No', 'Border right size value to apply to the button' ],
  [ 'bt', 'string | number', 'No', 'Border top size value to apply to the button' ],
  [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the button' ],
  [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the button' ],
  [ 'center', 'boolean', 'No', 'If true, centers text inside the button' ],
  [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the button' ],
  [ 'className', 'string', 'No', 'Additional class names to apply to the button' ],
  [ 'color', 'string', 'No', 'Custom color value to apply to the button' ],
  [ 'curved', 'boolean', 'No', 'If true, applies curved border radius to the button' ],
  [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the button' ],
  [ 'display', 'string', 'No', 'Custom display value to apply to the button' ],
  [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the button' ],
  [ 'error', 'boolean', 'No', 'If true, applies the error color to the button' ],
  [ 'fill', 'boolean', 'No', 'If true, makes the button take the full width of its container' ],
  [ 'flex', 'boolean', 'No', 'If true, sets display to flex' ],
  [ 'grid', 'boolean', 'No', 'If true, sets display to grid' ],
  [ 'h', 'string | number', 'No', 'Height value to apply to the button' ],
  [ 'hidden', 'boolean', 'No', 'If true, hides the button' ],
  [ 'href', 'string', 'No', 'If set, renders the button as an anchor link' ],
  [ 'iblock', 'boolean', 'No', 'If true, sets display to inline-block' ],
  [ 'iflex', 'boolean', 'No', 'If true, sets display to inline-flex' ],
  [ 'igrid', 'boolean', 'No', 'If true, sets display to inline-grid' ],
  [ 'info', 'boolean', 'No', 'If true, applies the info color to the button' ],
  [ 'inline', 'boolean', 'No', 'If true, sets display to inline' ],
  [ 'justify', 'boolean', 'No', 'If true, justifies text inside the button' ],
  [ 'left', 'boolean', 'No', 'If true, aligns text to the left inside the button' ],
  [ 'lg', 'boolean', 'No', 'If true, applies large size to the button' ],
  [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the button' ],
  [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the button' ],
  [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the button' ],
  [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the button' ],
  [ 'md', 'boolean', 'No', 'If true, applies medium size to the button' ],
  [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the button' ],
  [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the button' ],
  [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the button' ],
  [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the button' ],
  [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the button' ],
  [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the button' ],
  [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the button' ],
  [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the button' ],
  [ 'outline', 'boolean', 'No', 'If true, applies an outline style to the button' ],
  [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the button' ],
  [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the button' ],
  [ 'pill', 'boolean', 'No', 'If true, applies pill border radius to the button' ],
  [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the button' ],
  [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the button' ],
  [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the button' ],
  [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the button' ],
  [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the button' ],
  [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the button' ],
  [ 'radius', 'string | number', 'No', 'Custom border radius value to apply to the button' ],
  [ 'right', 'boolean', 'No', 'If true, aligns text to the right inside the button' ],
  [ 'rounded', 'boolean', 'No', 'If true, applies rounded border radius to the button' ],
  [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the button' ],
  [ 'sm', 'boolean', 'No', 'If true, applies small size to the button' ],
  [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the button' ],
  [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the button' ],
  [ 'success', 'boolean', 'No', 'If true, applies the success color to the button' ],
  [ 'target', 'string', 'No', 'Specifies where to open the linked document' ],
  [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the button' ],
  [ 'title', 'string', 'No', 'Specifies extra information about the button' ],
  [ 'txs', 'string | number', 'No', 'Text size value to apply to the button' ],
  [ 'w', 'string | number', 'No', 'Width value to apply to the button' ],
  [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the button' ],
  [ 'white', 'boolean', 'No', 'If true, applies the white color to the button' ],
  [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the button' ],
  [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the button' ],
  [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the button' ],
  [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the button' ],
  [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the button' ],
  [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the button' ]
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
          {_('Buttons')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styles">{_('Global Styles')}</a>
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
 * Examples component
 */
export function Examples() {
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Example */}
      <Preview 
        height={110}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info>Submit Info</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info>Submit Info</Button>`}
        </Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        height={110}
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button warning>Submit Warning</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button warning>Submit Warning</Button>`}
        </Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        height={110}
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button success>Submit Success</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button success>Submit Success</Button>`}
        </Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        height={110}
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button error>Submit Error</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button error>Submit Error</Button>`}
        </Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview 
        height={110}
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button muted>Submit Muted</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button muted>Submit Muted</Button>`}
        </Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        height={110}
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button color="salmon">Submit Custom</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button color="salmon">Submit Custom</Button>`}
        </Preview.Code>
      </Preview>
      {/* Info Outline Example */}
      <Preview 
        height={110}
        title="Info Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Button info outline>Submit Info</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info outline>Submit Info</Button>`}
        </Preview.Code>
      </Preview>
      {/* Warning Outline Example */}
      <Preview 
        height={110}
        title="Warning Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Button warning outline>Submit Warning</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button warning outline>Submit Warning</Button>`}
        </Preview.Code>
      </Preview>
      {/* Success Outline Example */}
      <Preview 
        height={110}
        title="Success Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Button success outline>Submit Success</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button success outline>Submit Success</Button>`}
        </Preview.Code>
      </Preview>
      {/* Error Outline Example */}
      <Preview 
        height={110}
        title="Error Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Button error outline>Submit Error</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button error outline>Submit Error</Button>`}
        </Preview.Code>
      </Preview>
      {/* Muted Outline Example */}
      <Preview 
        height={110}
        title="Muted Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Button muted outline>Submit Muted</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button muted outline>Submit Muted</Button>`}
        </Preview.Code>
      </Preview>
      {/* Custom Color Outline Example */}
      <Preview 
        height={110}
        title="Custom Color Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Button color="salmon" outline>Submit Custom</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button color="salmon" outline>Submit Custom</Button>`}
        </Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        height={110}
        title="Curved Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info curved>Submit Curved</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info curved>Submit Curved</Button>`}
        </Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        height={110}
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info rounded>Submit Rounded</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info rounded>Submit Rounded</Button>`}
        </Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        height={110}
        title="Pill Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill>Submit Pill</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill>Submit Pill</Button>`}
        </Preview.Code>
      </Preview>
      {/* Stretch Example */}
      <Preview 
        height={110}
        title="Stretch Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info block full pill>Submit Block</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info block full pill>Submit Block</Button>`}
        </Preview.Code>
      </Preview>
      {/* XS Example */}
      <Preview 
        height={110}
        title="XS Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xs>Submit XS</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xs>Submit XS</Button>`}
        </Preview.Code>
      </Preview>
      {/* SM Example */}
      <Preview 
        height={110}
        title="SM Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill sm>Submit SM</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill sm>Submit SM</Button>`}
        </Preview.Code>
      </Preview>
      {/* MD Example */}
      <Preview 
        height={110}
        title="MD Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill md>Submit MD</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill md>Submit MD</Button>`}
        </Preview.Code>
      </Preview>
      {/* LG Example */}
      <Preview 
        height={110}
        title="LG Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill lg>Submit LG</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill lg>Submit LG</Button>`}
        </Preview.Code>
      </Preview>
      {/* XL Example */}
      <Preview 
        height={110}
        title="XL Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl>Submit XL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl>Submit XL</Button>`}
        </Preview.Code>
      </Preview>
      {/* 2XL Example */}
      <Preview 
        height={110}
        title="2XL Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl2>Submit XXL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl2>Submit XXL</Button>`}
        </Preview.Code>
      </Preview>
      {/* 3XL Example */}
      <Preview 
        height={110}
        title="3XL Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl3>Submit XXXL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl3>Submit XXXL</Button>`}
        </Preview.Code>
      </Preview>
      {/* 4XL Example */}
      <Preview 
        height={110}
        title="4XL Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl4>Submit IVL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl4>Submit IVL</Button>`}
        </Preview.Code>
      </Preview>
      {/* 5XL Example */}
      <Preview 
        height={110}
        title="5XL Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl5>Submit VL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl5>Submit VL</Button>`}
        </Preview.Code>
      </Preview>
    </div>
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
        {_('Buttons')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Button>" /> component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Button from 'frui/Button';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of buttons.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use the <C value="frui-button" /> CSS class to 
          globally style buttons.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Button>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
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
