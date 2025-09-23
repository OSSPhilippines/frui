//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';

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
  { label: 'Crumbs' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'crumbs', 'Crumb[]', 'Yes', 'An array of crumb objects to display' ],
  [ 'separator', 'string | JSX.Element', 'No', 'Custom separator between crumbs' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ]
];

const crumbProps = [
  [ 'href', 'string', 'No', 'Optional link for the crumb' ],
  [ 'icon', 'string', 'No', 'Optional icon class name for the crumb' ],
  [ 'label', 'string | JSX.Element', 'Yes', 'Label text or element for the crumb' ]
];

const examples = [
//0
`<Crumbs 
  crumbs={[
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Crumbs' }
  ]} 
/>`,
//1
`<Crumbs 
  crumbs={[
    { 
      label: (<span>🙀 Components</span>), 
      href: '/component' 
    },
    { label: 'Crumbs' }
  ]}
  separator={<span className="mx-3">+</span>}
/>`
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
        <a className="block pb-1" href="#top">{_('Crumbs')}</a>
        <ul className="list-disc pl-3">
          <li className="pl-3 pb-1">
            <a href="#props">{_('Props')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#basic">{_('Basic Example')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#customize">{_('Customizing')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#styles">{_('Custom Styles')}</a>
          </li>
          <li className="pl-3 pb-1">
            <a href="#ungrouped">{_('Ungrouped Tabs')}</a>
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
        {_('Crumbs')}
      </h1>
      <p className="py-2">
        <Translate>
          Import the crumbs component like the following.
        </Translate>
      </p>
      <Code language="typescript" className="mt-2">
        {`import Crumbs from 'frui/Crumbs';`}
      </Code>

      <h2 id="props" className="uppercase font-bold text-lg mt-8">
        {_('Props')}
      </h2>
      <p className="py-2">
        <Translate>
          The <C value="Crumbs" /> component can be passed the following props.
        </Translate>
      </p>
      <Props props={props} />

      <h3 className="font-semibold mt-4">{_('Crumb')}</h3>
      <p className="py-2">
        <Translate>
          The <C value="crumbs" /> prop is an array of objects, each 
          representing a crumb. Each object can have the following 
          properties.
        </Translate>
      </p>
      <Props props={crumbProps} />

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basic Example')}
      </h2>
      <p className="py-2">
        <Translate>
          A simple example of <C value="crumbs" />.
        </Translate>
      </p>
      <Crumbs 
        crumbs={[
          { icon: 'icons', label: 'Components', href: '/component' },
          { label: 'Crumbs' }
        ]} 
      />
      <Code className="mt-2" language="typescript">{examples[0]}</Code>

      <h2 id="customize" className="uppercase font-bold text-lg mt-8">
        {_('Customizing')}
      </h2>
      <p className="py-2">
        <Translate>
          The <C value="icon" /> property uses font awesome icons.
          You can use any icon library you want by simply adding 
          it to the <C value="label" /> instead.
        </Translate>
      </p>
      <Crumbs 
        crumbs={[
          { 
            label: (<span>🙀 Components</span>), 
            href: '/component' 
          },
          { label: 'Crumbs' }
        ]} 
        separator={<span className="mx-3">+</span>}
      />
      <Code className="mt-2" language="typescript">{examples[1]}</Code>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Custom Styles')}
      </h2>
      <p className="py-2">
        <Translate>
          You can add your own custom class to the tabs component or use
          the <C value="frui-crumbs" />, <C value="frui-crumbs-item" />, <C value="frui-crumbs-separator" />, 
          and <C value="frui-crumbs-icon" /> CSS class.
        </Translate>
      </p>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/button">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Buttons')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/loader">
          {_('Loaders')}
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
      uri="/component/crumbs"
      title="Crumbs Component"
      description={
        'Crumbs in FRUI allows users to see their current location '
        + 'within a websites hierarchy.'
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
      <LayoutPanel pathname="/component/crumbs">
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
