//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Loader from 'components/Loader.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/loader';
const title = 'Loader Component';
const description = 
  'Loaders are animated indicators to show that something is '
  + 'being processed.';

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
          {_('Loaders')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#size">{_('Size and Thickness')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#speed">{_('Speed')}</a>
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
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader info className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader info className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Warning Example */}
      <Preview 
        height={100}
        title="Warning Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader warning className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader warning className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Success Example */}
      <Preview 
        height={100}
        title="Success Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader success className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader success className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Error Example */}
      <Preview 
        height={100}
        title="Error Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader error className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader error className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Muted Example */}
      <Preview 
        height={100}
        title="Muted Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader muted className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader muted className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        height={100}
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader color="salmon" className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader color="salmon" className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Solid Shape Example */}
      <Preview 
        height={100}
        title="Solid Shape Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader solid info slice={1} className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader solid info slice={1} className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Dashed Shape Example */}
      <Preview 
        height={100}
        title="Dashed Shape Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader dashed warning className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader dashed warning className="m-2">Loading...</Loader>'}
        </Preview.Code>
      </Preview>
      {/* Dotted Shape Example */}
      <Preview 
        height={100}
        title="Dotted Shape Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Loader dotted success className="m-2">Loading...</Loader>
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Loader dotted success className="m-2">Loading...</Loader>'}
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
        {_('Loaders')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the loader component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Loader from 'frui/Loader';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of loaders.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="size" className="uppercase font-bold text-lg mt-8">
        {_('Size and Thickness')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Loaders can have custom sizes and thickness in pixels.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Thin Example" 
          className="border border-2 theme-bc-3 my-4"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Loader info size={30} thickness={3} className="m-2">Loading...</Loader>
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Loader info size={30} thickness={3} className="m-2">Loading...</Loader>'}
          </Preview.Code>
        </Preview>

        <Preview 
          height={100}
          title="Thick Example" 
          className="border border-2 theme-bc-3 my-4"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Loader warning size={50} thickness={8} className="m-2">Loading...</Loader>
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Loader warning size={50} thickness={8} className="m-2">Loading...</Loader>'}
          </Preview.Code>
        </Preview>

        <Preview 
          height={100}
          title="Thicker Example" 
          className="border border-2 theme-bc-3 my-4"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Loader success size={80} thickness={20} className="m-2">Loading...</Loader>
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Loader success size={80} thickness={20} className="m-2">Loading...</Loader>'}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="speed" className="uppercase font-bold text-lg mt-8">
        {_('Speed')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Loaders can have custom speeds in milliseconds. The 
            larger the number the slower the rotation.
          </Translate>
        </p>
        <Preview 
          height={100}
          title="Faster Example" 
          className="border border-2 theme-bc-3 my-4"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Loader info speed={500} className="m-2">Loading...</Loader>
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Loader info speed={500} className="m-2">Loading...</Loader>'}
          </Preview.Code>
        </Preview>

        <Preview 
          height={100}
          title="Fast Example" 
          className="border border-2 theme-bc-3 my-4"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Loader warning speed={1000} className="m-2">Loading...</Loader>
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Loader warning speed={1000} className="m-2">Loading...</Loader>'}
          </Preview.Code>
        </Preview>

        <Preview 
          height={100}
          title="Slow Example" 
          className="border border-2 theme-bc-3 my-4"
        >
          <Preview.Example center padding>
            <div className="text-center">
              <Loader success speed={5000} className="m-2">Loading...</Loader>
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Loader success speed={5000} className="m-2">Loading...</Loader>'}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use the <C value="frui-loader" />, <C value="frui-loader-solid" />, <C value="frui-loader-dashed" />, <C value="frui-loader-dotted" />, <C value="frui-loader-slice-1" />, <C value="frui-loader-slice-2" />, <C value="frui-loader-slice-3" />,
          and <C value="frui-loader-container" /> CSS classes to 
          globally theme loaders.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Loader>" /> component can be passed the 
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