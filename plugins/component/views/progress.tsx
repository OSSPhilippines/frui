//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Progress from 'components/element/Progress.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'bgcolor', 'string', 'No', 'Custom CSS hex or name for background' ],
  [ 'bgerror', 'boolean', 'No', 'Red background' ],
  [ 'bginfo', 'boolean', 'No', 'Blue background' ],
  [ 'bgmuted', 'boolean', 'No', 'Gray background' ],
  [ 'bgsuccess', 'boolean', 'No', 'Green background' ],
  [ 'bgwarning', 'boolean', 'No', 'Orange background' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red color bar' ],
  [ 'height', 'number | string', 'No', 'Height of the progress bar, in px or string (e.g. 2em, 20px)' ],
  [ 'info', 'boolean', 'No', 'Blue color bar' ],
  [ 'muted', 'boolean', 'No', 'Gray color bar' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'success', 'boolean', 'No', 'Green color bar' ],
  [ 'warning', 'boolean', 'No', 'Orange color bar' ],
  [ 'width', 'number', 'No', 'Width of the progress bar in percentage (0-100)' ]
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Progress Bar</Bread.Crumb>
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
          {_('Progress Bar')}
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
            <Progress width={10} info className="theme-white">10%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={10} info className="theme-white">10%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={15} warning className="theme-white">15%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={15} warning className="theme-white">15%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={20} success className="theme-white">20%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={20} success className="theme-white">20%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={25} error className="theme-white">25%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={25} error className="theme-white">25%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={30} muted className="theme-white">30%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={30} muted className="theme-white">30%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={35} color="salmon" className="theme-white">35%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={35} color="salmon" className="theme-white">35%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Info Background Example */}
      <Preview 
        title="Info Background Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={40} muted bginfo className="theme-white">40%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={40} muted bginfo className="theme-white">40%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Warning Background Example */}
      <Preview
        title="Warning Background Example"
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={45} muted bgwarning className="theme-white">45%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={45} muted bgwarning className="theme-white">45%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Success Background Example */}
      <Preview 
        title="Success Background Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={50} muted bgsuccess className="theme-white">50%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={50} muted bgsuccess className="theme-white">50%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Error Background Example */}
      <Preview 
        title="Error Background Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={55} muted bgerror className="theme-white">55%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={55} muted bgerror className="theme-white">55%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Muted Background Example */}
      <Preview 
        title="Muted Background Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={60} muted bgmuted className="theme-white">60%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={60} muted bgmuted className="theme-white">60%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Custom Background Example */}
      <Preview 
        title="Custom Background Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={65} muted bgcolor="salmon" className="theme-white">65%</Progress>
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={65} muted bgcolor="salmon" className="theme-white">65%</Progress>`}
        </Preview.Code>
      </Preview>
      {/* Curved Example */}
      <Preview 
        title="Curved Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={70} height={20} warning bgmuted curved />
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={70} height={20} warning bgmuted curved></Progress>`}
        </Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={75} height={20} success bgmuted rounded />
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={75} height={20} success bgmuted rounded></Progress>`}
        </Preview.Code>
      </Preview>
      {/* Pill Example */}
      <Preview 
        title="Pill Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Progress width={80} height={20} info bgmuted pill />
          </div>
        </Preview.Example>
        <Preview.Code>
          {`<Progress width={80} height={20} info bgmuted pill></Progress>`}
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
        {_('Progress Bar')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the progress bar component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Progress from 'frui/Progress';`}
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
      <p className="py-2">
        <Translate>
          You can use 
          the <C value="frui-progress" />, 
          and <C value="frui-progress-container" /> CSS classes to 
          globally theme progress bars.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="Progress" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/pager">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Pager')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/table">
          {_('Table')}
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
      uri="/component/progress"
      title="Progress Bar Component"
      description={
        'Progress bar visually represents the completion status '
        + 'of a task.'
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
      <LayoutPanel pathname="/component/progress">
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
