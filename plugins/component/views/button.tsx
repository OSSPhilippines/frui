//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Button from 'components/form/Button.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'block', 'boolean', 'No', 'button display block' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red badge' ],
  [ 'full', 'boolean', 'No', 'button width 100%' ],
  [ 'info', 'boolean', 'No', 'Blue badge' ],
  [ 'muted', 'boolean', 'No', 'Gray badge' ],
  [ 'outline', 'boolean', 'No', 'Border and text with color' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'solid', 'boolean', 'No', 'Fills badge with color' ],
  [ 'success', 'boolean', 'No', 'Green badge' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'warning', 'boolean', 'No', 'Orange badge' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'xs', 'boolean', 'No', 'Extra small button' ],
  [ 'sm', 'boolean', 'No', 'Small button' ],
  [ 'md', 'boolean', 'No', 'Medium button' ],
  [ 'lg', 'boolean', 'No', 'Large button' ],
  [ 'xl', 'boolean', 'No', 'Extra large button' ],
  [ 'xl2', 'boolean', 'No', 'XXL button' ],
  [ 'xl3', 'boolean', 'No', 'XXXL button' ],
  [ 'xl4', 'boolean', 'No', 'XXXXL button' ],
  [ 'xl5', 'boolean', 'No', 'XXXXXL button' ]
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Buttons</Bread.Crumb>
    </Bread>
  );
};

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
            <Button info pill xs className="text-xs">Submit XS</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xs className="text-xs">Submit XS</Button>`}
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
            <Button info pill sm className="text-sm">Submit SM</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill sm className="text-sm">Submit SM</Button>`}
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
            <Button info pill md className="text-md">Submit MD</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill md className="text-md">Submit MD</Button>`}
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
            <Button info pill lg className="text-lg">Submit LG</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill lg className="text-lg">Submit LG</Button>`}
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
            <Button info pill xl className="text-xl">Submit XL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl className="text-xl">Submit XL</Button>`}
        </Preview.Code>
      </Preview>
      {/* XL2 Example */}
      <Preview 
        height={110}
        title="XL2 Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl2 className="text-2xl">Submit XXL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl2 className="text-2xl">Submit XXL</Button>`}
        </Preview.Code>
      </Preview>
      {/* XL3 Example */}
      <Preview 
        height={110}
        title="XL3 Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl3 className="text-3xl">Submit XXXL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl3 className="text-3xl">Submit XXXL</Button>`}
        </Preview.Code>
      </Preview>
      {/* XL4 Example */}
      <Preview 
        height={110}
        title="XL4 Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl4 className="text-4xl">Submit IVL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl4 className="text-4xl">Submit IVL</Button>`}
        </Preview.Code>
      </Preview>
      {/* XL5 Example */}
      <Preview 
        height={110}
        title="XL5 Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Button info pill xl5 className="text-5xl">Submit VL</Button>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Button info pill xl5 className="text-5xl">Submit VL</Button>`}
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
            Import the button component like the following.
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

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/badge">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Buttons')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/dialog">
          {_('Dialogs')}
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/button"
      title="Button Component"
      description="Buttons allow users to trigger actions and events."
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/component/button">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
