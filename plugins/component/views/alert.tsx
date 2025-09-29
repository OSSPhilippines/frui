//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Alert from 'components/element/Alert.js';

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
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red alert' ],
  [ 'info', 'boolean', 'No', 'Blue alert' ],
  [ 'muted', 'boolean', 'No', 'Gray alert' ],
  [ 'outline', 'boolean', 'No', 'Border and text with color' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'solid', 'boolean', 'No', 'Fills alert with color' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'success', 'boolean', 'No', 'Green alert' ],
  [ 'warning', 'boolean', 'No', 'Orange alert' ]
];

const examples = [ 
//0
`<Alert info className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Something interesting happened!
</Alert>`,
//1
`<Alert warning className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//2
`<Alert success className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`,
//3
`<Alert error className="flex items-center">
  <i className="fas fa-exclamation-circle mr-2"></i>
  Could not save
</Alert>`,
//4
`<Alert muted className="flex items-center">
  I am disabled
</Alert>`,
//5
`<Alert color="salmon" className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Who likes salmon?
</Alert>`,
//6
`<Alert info outline className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Something interesting happened!
</Alert>`,
//7
`<Alert warning outline className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//8
`<Alert success outline className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`,
//9
`<Alert error outline className="flex items-center">
  <i className="fas fa-exclamation-circle mr-2"></i>
  Could not save
</Alert>`,
//10
`<Alert muted outline className="flex items-center">
  I am disabled
</Alert>`,
//11
`<Alert color="salmon" outline className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  Who likes salmon?
</Alert>`,
//12
`<Alert info curved className="flex items-center">
  <i className="fas fa-info-circle mr-2"></i>
  No results found
</Alert>`,
//13
`<Alert warning rounded className="flex items-center">
  <i className="fas fa-exclamation-triangle mr-2"></i>
  Are you sure ?
</Alert>`,
//14
`<Alert success pill outline className="flex items-center">
  <i className="fas fa-check-circle mr-2"></i>
  Successfully saved !
</Alert>`
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
      <Bread.Crumb>Alerts</Bread.Crumb>
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
          {_('Alerts')}
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
        height={100}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert info className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Something interesting happened!
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        height={100}
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert warning className="flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Are you sure ?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        height={100}
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert success className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Successfully saved !
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        height={100}
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert error className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Could not save
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview 
        height={100}
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert muted className="flex items-center">
            I am disabled
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[4]}</Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        height={100}
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert color="salmon" className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Who likes salmon?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[5]}</Preview.Code>
      </Preview>
      {/* Info Outline Example */}
      <Preview 
        height={100}
        title="Info Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert info outline className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Something interesting happened!
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[6]}</Preview.Code>
      </Preview>
      {/* Warning Outline Example */}
      <Preview 
        height={100}
        title="Warning Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert warning outline className="flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Are you sure ?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[7]}</Preview.Code>
      </Preview>
      {/* Success Outline Example */}
      <Preview 
        height={100}
        title="Success Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert success outline className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Successfully saved !
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[8]}</Preview.Code>
      </Preview>
      {/* Error Outline Example */}
      <Preview 
        height={100}
        title="Error Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert error outline className="flex items-center">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Could not save
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[9]}</Preview.Code>
      </Preview>
      {/* Muted Outline Example */}
      <Preview 
        height={100}
        title="Muted Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert muted outline className="flex items-center">
            I am disabled
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[10]}</Preview.Code>
      </Preview>
      {/* Custom Color Outline Example */}
      <Preview 
        height={100}
        title="Custom Color Outline Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert color="salmon" outline className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            Who likes salmon?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[11]}</Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        height={100}
        title="Curved Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert info curved className="flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            No results found
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[12]}</Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        height={100}
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Alert warning rounded className="flex items-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            Are you sure ?
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[7]}</Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        height={100}
        title="Pill Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding background="#222222">
          <Alert success pill outline className="flex items-center">
            <i className="fas fa-check-circle mr-2"></i>
            Successfully saved !
          </Alert>
        </Preview.Example>
        <Preview.Code>{examples[14]}</Preview.Code>
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
        {_('Alerts')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the alert component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Alert from 'frui/Alert';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of alerts.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use the <C value="frui-alert" /> CSS class to 
          globally theme alerts.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Alert>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Components')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/badge">
          {_('Badges')}
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
      uri="/component/alert"
      title="Alert Component"
      description={
        'Alerts convey important information, warnings, or '
        + 'notifications to users.'
      }
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
      <LayoutPanel pathname="/component/alert">
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
