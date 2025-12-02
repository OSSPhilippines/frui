//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Badge from 'components/Badge.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/badge';
const title = 'Badge Component';
const description = 'Badges are used to display status or information.';

const props = [
  [ 'align', 'string', 'No', 'Custom text align value to apply to the badge' ],
  [ 'ba', 'string | number', 'No', 'Border all sides size value to apply to the badge' ],
  [ 'bb', 'string | number', 'No', 'Border bottom size value to apply to the badge' ],
  [ 'bdStyle', 'string', 'No', 'Custom border style value to apply to the badge' ],
  [ 'bl', 'string | number', 'No', 'Border left size value to apply to the badge' ],
  [ 'black', 'boolean', 'No', 'If true, applies the black color to the badge' ],
  [ 'block', 'boolean', 'No', 'If true, sets display to block' ],
  [ 'br', 'string | number', 'No', 'Border right size value to apply to the badge' ],
  [ 'bt', 'string | number', 'No', 'Border top size value to apply to the badge' ],
  [ 'bx', 'string | number', 'No', 'Border horizontal size value to apply to the badge' ],
  [ 'by', 'string | number', 'No', 'Border vertical size value to apply to the badge' ],
  [ 'center', 'boolean', 'No', 'If true, centers text inside the badge' ],
  [ 'children', 'ReactNode', 'No', 'Child elements to be rendered inside the badge' ],
  [ 'className', 'string', 'No', 'Additional class names to apply to the badge' ],
  [ 'color', 'string', 'No', 'Custom color value to apply to the badge' ],
  [ 'curved', 'boolean', 'No', 'If true, applies curved border radius to the badge' ],
  [ 'dashed', 'boolean', 'No', 'If true, applies dashed border style to the badge' ],
  [ 'display', 'string', 'No', 'Custom display value to apply to the badge' ],
  [ 'dotted', 'boolean', 'No', 'If true, applies dotted border style to the badge' ],
  [ 'error', 'boolean', 'No', 'If true, applies the error color to the badge' ],
  [ 'fill', 'boolean', 'No', 'If true, makes the badge take the full width of its container' ],
  [ 'flex', 'boolean', 'No', 'If true, sets display to flex' ],
  [ 'grid', 'boolean', 'No', 'If true, sets display to grid' ],
  [ 'h', 'string | number', 'No', 'Height value to apply to the badge' ],
  [ 'hidden', 'boolean', 'No', 'If true, hides the badge' ],
  [ 'iblock', 'boolean', 'No', 'If true, sets display to inline-block' ],
  [ 'iflex', 'boolean', 'No', 'If true, sets display to inline-flex' ],
  [ 'igrid', 'boolean', 'No', 'If true, sets display to inline-grid' ],
  [ 'info', 'boolean', 'No', 'If true, applies the info color to the badge' ],
  [ 'inline', 'boolean', 'No', 'If true, sets display to inline' ],
  [ 'justify', 'boolean', 'No', 'If true, justifies text inside the badge' ],
  [ 'left', 'boolean', 'No', 'If true, aligns text to the left inside the badge' ],
  [ 'lg', 'boolean', 'No', 'If true, applies large size to the badge' ],
  [ 'ma', 'string | number', 'No', 'Margin all sides size value to apply to the badge' ],
  [ 'maxh', 'string | number', 'No', 'Maximum height value to apply to the badge' ],
  [ 'maxw', 'string | number', 'No', 'Maximum width value to apply to the badge' ],
  [ 'mb', 'string | number', 'No', 'Margin bottom size value to apply to the badge' ],
  [ 'md', 'boolean', 'No', 'If true, applies medium size to the badge' ],
  [ 'minh', 'string | number', 'No', 'Minimum height value to apply to the badge' ],
  [ 'minw', 'string | number', 'No', 'Minimum width value to apply to the badge' ],
  [ 'ml', 'string | number', 'No', 'Margin left size value to apply to the badge' ],
  [ 'mr', 'string | number', 'No', 'Margin right size value to apply to the badge' ],
  [ 'mt', 'string | number', 'No', 'Margin top size value to apply to the badge' ],
  [ 'muted', 'boolean', 'No', 'If true, applies the muted color to the badge' ],
  [ 'mx', 'string | number', 'No', 'Margin horizontal size value to apply to the badge' ],
  [ 'my', 'string | number', 'No', 'Margin vertical size value to apply to the badge' ],
  [ 'outline', 'boolean', 'No', 'If true, applies an outline style to the badge' ],
  [ 'pa', 'string | number', 'No', 'Padding all sides size value to apply to the badge' ],
  [ 'pb', 'string | number', 'No', 'Padding bottom size value to apply to the badge' ],
  [ 'pill', 'boolean', 'No', 'If true, applies pill border radius to the badge' ],
  [ 'pl', 'string | number', 'No', 'Padding left size value to apply to the badge' ],
  [ 'pr', 'string | number', 'No', 'Padding right size value to apply to the badge' ],
  [ 'primary', 'boolean', 'No', 'If true, applies the primary color to the badge' ],
  [ 'pt', 'string | number', 'No', 'Padding top size value to apply to the badge' ],
  [ 'px', 'string | number', 'No', 'Padding horizontal size value to apply to the badge' ],
  [ 'py', 'string | number', 'No', 'Padding vertical size value to apply to the badge' ],
  [ 'radius', 'string | number', 'No', 'Custom border radius value to apply to the badge' ],
  [ 'right', 'boolean', 'No', 'If true, aligns text to the right inside the badge' ],
  [ 'rounded', 'boolean', 'No', 'If true, applies rounded border radius to the badge' ],
  [ 'secondary', 'boolean', 'No', 'If true, applies the secondary color to the badge' ],
  [ 'sm', 'boolean', 'No', 'If true, applies small size to the badge' ],
  [ 'solid', 'boolean', 'No', 'If true, applies solid border style to the badge' ],
  [ 'style', 'CSSProperties', 'No', 'Inline styles to apply to the badge' ],
  [ 'success', 'boolean', 'No', 'If true, applies the success color to the badge' ],
  [ 'tertiary', 'boolean', 'No', 'If true, applies the tertiary color to the badge' ],
  [ 'txs', 'string | number', 'No', 'Text size value to apply to the badge' ],
  [ 'w', 'string | number', 'No', 'Width value to apply to the badge' ],
  [ 'warning', 'boolean', 'No', 'If true, applies the warning color to the badge' ],
  [ 'white', 'boolean', 'No', 'If true, applies the white color to the badge' ],
  [ 'xl', 'boolean', 'No', 'If true, applies extra large size to the badge' ],
  [ 'xl2', 'boolean', 'No', 'If true, applies 2x extra large size to the badge' ],
  [ 'xl3', 'boolean', 'No', 'If true, applies 3x extra large size to the badge' ],
  [ 'xl4', 'boolean', 'No', 'If true, applies 4x extra large size to the badge' ],
  [ 'xl5', 'boolean', 'No', 'If true, applies 5x extra large size to the badge' ],
  [ 'xs', 'boolean', 'No', 'If true, applies extra small size to the badge' ]
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
          {_('Badges')}
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
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge info>123</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge info>123</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge warning>234</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge warning>234</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge success>345</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge success>345</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge error>456</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge error>456</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview 
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge muted>456</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge muted>456</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge color="salmon">567</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge color="salmon">567</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Info Outline Example */}
      <Preview 
        title="Info Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge info outline>123</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge info outline>123</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Warning Outline Example */}
      <Preview 
        title="Warning Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge warning outline>234</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge warning outline>234</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Success Outline Example */}
      <Preview 
        title="Success Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge success outline>345</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge success outline>345</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Error Outline Example */}
      <Preview 
        title="Error Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge error outline>456</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge error outline>456</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Muted Outline Example */}
      <Preview 
        title="Muted Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge muted outline>567</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge muted outline>567</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Custom Color Outline Example */}
      <Preview 
        title="Custom Color Outline Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge color="salmon" outline>678</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge color="salmon" outline>678</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        title="Curved Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge info curved>123</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge info curved>123</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Badge warning rounded>234</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge warning rounded>234</Badge>`}
        </Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        title="Pill Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <div className="text-center">
            <Badge success pill outline>345</Badge>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Badge success pill outline>345</Badge>`}
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
        {_('Badges')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the badge component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Badge from 'frui/Badge';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of badges.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use the <C value="frui-badge" /> CSS class to 
          globally theme badges.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Badge>" /> component can be passed the 
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
