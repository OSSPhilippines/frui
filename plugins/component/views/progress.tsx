//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import Progress from 'components/element/Progress.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Progress Bar' }
];

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
        <a className="block pb-1" href="#top">{_('Progress Bar')}</a>
        <ul className="list-disc pl-3">
          <li className="pl-3 pb-1">
            <a href="#props">{_('Props')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#colors">{_('Progress Bar Colors')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#background">{_('Background Colors')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#rounded">{_('Rounded')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#styles">{_('Custom Styles')}</a>
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
        {_('Progress Bar')}
      </h1>
      <p className="py-2">
        <Translate>
          Import the progress bar component like the following.
        </Translate>
      </p>
      <Code language="typescript" className="mt-2">
        {`import Progress from 'frui/Progress';`}
      </Code>

      <h2 id="props" className="uppercase font-bold text-lg mt-8">
        {_('Props')}
      </h2>
      <p className="py-2">
        <Translate>
          The <C value="Progress" /> component can be passed the 
          following props.
        </Translate>
      </p>
      <Props props={props} />

      <h2 id="colors" className="uppercase font-bold text-lg mt-8">
        {_('Progress Bar Colors')}
      </h2>
      <p className="py-2">
        <Translate>
          The progress bar supports the standard FRUI color props.
        </Translate>
      </p>
      <div>
        <Progress width={25} info className="theme-white">25%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={20} info>20%</Progress>`}
        </Code>

        <Progress width={40} warning className="theme-white">40%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={40} warning>40%</Progress>`}
        </Code>

        <Progress width={60} error className="theme-white">60%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={60} error>60%</Progress>`}
        </Code>

        <Progress width={75} success className="theme-white">75%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={75} success>75%</Progress>`}
        </Code>

        <Progress width={90} muted className="theme-white">90%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={90} muted>90%</Progress>`}
        </Code>

        <Progress width={95} color="salmon" className="theme-white">95%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={95} color="salmon">95%</Progress>`}
        </Code>
      </div>

      <h2 id="background" className="uppercase font-bold text-lg mt-8">
        {_('Background Colors')}
      </h2>
      <p className="py-2">
        <Translate>
          The progress bar supports the standard FRUI color props.
        </Translate>
      </p>
      <div>
        <Progress width={25} info bgmuted className="theme-white">25%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={20} info bgmuted>20%</Progress>`}
        </Code>

        <Progress width={40} muted bgwarning className="theme-white">40%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={40} muted bgwarning>40%</Progress>`}
        </Code>

        <Progress width={60} muted bgerror className="theme-white">60%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={60} muted bgerror>60%</Progress>`}
        </Code>

        <Progress width={75} muted bgsuccess className="theme-white">75%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={75} muted bgsuccess>75%</Progress>`}
        </Code>

        <Progress width={90} muted bginfo className="theme-white">90%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={90} muted bginfo>90%</Progress>`}
        </Code>

        <Progress width={95} muted bgcolor="salmon" className="theme-white">95%</Progress>
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={95} muted bgcolor="salmon">95%</Progress>`}
        </Code>
      </div>

      <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
        {_('Rounded')}
      </h2>
      <p className="py-4">
        <Translate>
          Progress bars can be rounded in three ways: <C value="curved" />, 
          <C l value="rounded" />, and <C value="pill" />.
        </Translate>
      </p>
      <div>
        <Progress width={25} height={20} info bgmuted curved />
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={25} height={20} info bgmuted curved></Progress>`}
        </Code>

        <Progress width={50} height={20} warning bgmuted rounded />
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={50} height={20} warning bgmuted rounded></Progress>`}
        </Code>

        <Progress width={75} height={20} success bgmuted pill />
        <Code className="mt-2 mb-8" language="typescript">
          {`<Progress width={75} height={20} success bgmuted pill></Progress>`}
        </Code>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Custom Styles')}
      </h2>
      <p className="py-2">
        <Translate>
          You can add your own custom class to the tabs component or use 
          the <C value="frui-progress" />, and <C value="frui-progress-container" /> CSS 
          class.
        </Translate>
      </p>

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
        'Progress bar in FRUI is a React component that visually '
        + 'represents the completion status of a task.'
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
            <Crumbs crumbs={crumbs} />
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
