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
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red badge' ],
  [ 'info', 'boolean', 'No', 'Blue badge' ],
  [ 'muted', 'boolean', 'No', 'Gray badge' ],
  [ 'outline', 'boolean', 'No', 'Border and text with color' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'solid', 'boolean', 'No', 'Fills badge with color' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'success', 'boolean', 'No', 'Green badge' ],
  [ 'warning', 'boolean', 'No', 'Orange badge' ]
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
