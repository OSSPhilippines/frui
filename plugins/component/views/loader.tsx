//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import Loader from 'components/element/Loader.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead,
  Props,
  Code,
  C
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Loader' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'dashed', 'boolean', 'No', 'Dashed style. Default: true' ],
  [ 'dotted', 'boolean', 'No', 'Dotted style' ],
  [ 'error', 'boolean', 'No', 'Red alert' ],
  [ 'info', 'boolean', 'No', 'Blue alert' ],
  [ 'muted', 'boolean', 'No', 'Gray alert' ],
  [ 'show', 'boolean', 'No', 'Show loader. Explicitly set this to false to hide it.' ],
  [ 'size', 'number', 'No', 'Size in pixels. Default: 20' ],
  [ 'slice', 'number', 'No', 'Number of slices (0-3). Default: 0' ],
  [ 'speed', 'number', 'No', 'Animation speed in milliseconds. Default: 1000' ],
  [ 'solid', 'boolean', 'No', 'Solid style. Default: false' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'success', 'boolean', 'No', 'Green alert' ],
  [ 'warning', 'boolean', 'No', 'Orange alert' ]
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
        <a className="block pb-1" href="#top">
          {_('Loader')}
        </a>
        <ul className="list-disc pl-3">
          <li className="pl-3 pb-1">
            <a href="#props">{_('Props')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#types">{_('Types')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#custom">{_('Custom Color')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#shapes">{_('Shapes')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#size">{_('Size and Thickness')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#speed">{_('Speed')}</a>
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
        {_('Loader')}
      </h1>
      <Code language="typescript" className="mt-2">
        {`import Loader from 'frui/Loader';`}
      </Code>

      <h2 id="props" className="uppercase font-bold text-lg mt-8">
        {_('Props')}
      </h2>
      <Props props={props} />

      <h2 id="types" className="uppercase font-bold text-lg mt-8">
        {_('Types')}
      </h2>
      <p className="py-4">
        <Translate>
          Loaders have the following types: <C value="info" />, 
          <C l value="warning" />, <C value="success" />, 
          <C l value="error" />, and <C value="muted" />.
        </Translate>
      </p>
      <div>
        <Loader info className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader info className="m-2">Loading...</Loader>'}
        </Code>
        <Loader warning className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader warning className="m-2">Loading...</Loader>'}
        </Code>
        <Loader success className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader success className="m-2">Loading...</Loader>'}
        </Code>
        <Loader error className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader error className="m-2">Loading...</Loader>'}
        </Code>
        <Loader muted className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader muted className="m-2">Loading...</Loader>'}
        </Code>
      </div>

      <h2 id="custom" className="uppercase font-bold text-lg mt-8">
        {_('Custom Color')}
      </h2>
      <p className="py-4">
        <Translate>
          Loaders can have custom CSS compatible colors which
          includes hex and color names.
        </Translate>
      </p>
      <div>
        <Loader color="salmon" className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader color="salmon" className="mt-2">Loading...</Loader>'}
        </Code>
      </div>

      <h2 id="shapes" className="uppercase font-bold text-lg mt-8">
        {_('Shapes')}
      </h2>
      <p className="py-4">
        <Translate>
          Loaders can have custom shapes which 
          includes <C value="solid" />, <C l value="dashed" />, and <C value="dotted" />.
        </Translate>
      </p>
      <div>
        <Loader solid info slice={1} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader solid className="m-2">Loading...</Loader>'}
        </Code>
        <Loader dashed warning className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader dashed className="m-2">Loading...</Loader>'}
        </Code>
        <Loader dotted success className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader dotted className="m-2">Loading...</Loader>'}
        </Code>
      </div>

      <h2 id="size" className="uppercase font-bold text-lg mt-8">
        {_('Size and Thickness')}
      </h2>
      <p className="py-4">
        <Translate>
          Loaders can have custom sizes and thickness in pixels.
        </Translate>
      </p>
      <div>
        <Loader info size={30} thickness={3} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader size={30} thickness={3} className="m-2">Loading...</Loader>'}
        </Code>
        <Loader warning size={50} thickness={8} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader size={50} thickness={8} className="m-2">Loading...</Loader>'}
        </Code>
        <Loader success size={80} thickness={20} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader size={80} thickness={20} className="m-2">Loading...</Loader>'}
        </Code>
      </div>

      <h2 id="speed" className="uppercase font-bold text-lg mt-8">
        {_('Speed')}
      </h2>
      <p className="py-4">
        <Translate>
          Loaders can have custom speeds in milliseconds. The 
          larger the number the slower the rotation.
        </Translate>
      </p>
      <div>
        <Loader info speed={500} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader speed={500} className="m-2">Loading...</Loader>'}
        </Code>
        <Loader warning speed={1000} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader speed={1000} className="m-2">Loading...</Loader>'}
        </Code>
        <Loader success speed={5000} className="m-2">Loading...</Loader>
        <Code language="typescript" className="mt-2">
          {'<Loader speed={5000} className="m-2">Loading...</Loader>'}
        </Code>
      </div>
      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Custom Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can add your own custom class to the alert component
          or use the <C value="frui-loader" />, <C value="frui-loader-solid" />, <C value="frui-loader-dashed" />, <C value="frui-loader-dotted" />, <C value="frui-loader-slice-1" />, <C value="frui-loader-slice-2" />, <C value="frui-loader-slice-3" />,
          and <C value="frui-loader-container" /> CSS class.
        </Translate>
      </p>
      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/crumbs">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Crumbs')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/modal">
          {_('Modal')}
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
      uri="/component/loader"
      title="Loader Component"
      description={
        'Loaders are animated indicators to show that something is '
        + 'being processed.'
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
      <LayoutPanel pathname="/component/loader">
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