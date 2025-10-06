//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';

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
  //bread props
  [
    [ 'className', 'string | Function', 'No', 'Standard HTML class names' ],
    [ 'crumb', 'string | CSSProperties | Function', 'No', 'Slot: class/style to apply to each crumb element' ],
    [ 'defaultValue', 'Crumb[]', 'No', 'Uncontrolled serializable bread trail array' ],
    [ 'onClick', 'Function', 'No', 'Click handler for each crumb' ],
    [ 'pop', 'boolean', 'No', 'Whether to remove last n crumbs from trail on click' ],
    [ 'style', 'CSSProperties | Function', 'No', 'Standard CSS input' ],
    [ 'value', 'Crumb[]', 'No', 'Controlled serializable bread trail array' ]
  ],
  //crumb props
  [
    [ 'className', 'string | Function', 'No', 'Standard HTML class names' ],
    [ 'href', 'string', 'No', 'Link for the crumb' ],
    [ 'icon', 'string', 'No', 'Icon class name for the crumb (only font awesome)' ],
    [ 'onClick', 'Function', 'No', 'Click handler for each crumb' ],
    [ 'style', 'CSSProperties | Function', 'No', 'Standard CSS input' ]
  ],
  //slicer props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'CSSProperties', 'No', 'Standard CSS input' ],
    [ 'value', 'string', 'No', 'String value for the slicer (default is /)' ]
  ]
];

const examples = [
//0
`<Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
  <Bread.Slicer />
  <Bread.Crumb>Crumb 1</Bread.Crumb>
  <Bread.Crumb>Crumb 2</Bread.Crumb>
  <Bread.Crumb>Crumb 3</Bread.Crumb>
</Bread>`,
//1
`<Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
  <Bread.Slicer />
  <Bread.Crumb icon="home">Crumb 1</Bread.Crumb>
  <Bread.Crumb icon="folder">Crumb 2</Bread.Crumb>
  <Bread.Crumb icon="file">Crumb 3</Bread.Crumb>
</Bread>`,
//2
`<Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
  <Bread.Slicer value="›" />
  <Bread.Crumb>Crumb 1</Bread.Crumb>
  <Bread.Crumb>Crumb 2</Bread.Crumb>
  <Bread.Crumb>Crumb 3</Bread.Crumb>
</Bread>`,
//3
`<Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
  <Bread.Crumb>Crumb 1</Bread.Crumb>
  <Bread.Slicer value="+" />
  <Bread.Crumb>Crumb 2</Bread.Crumb>
  <Bread.Slicer value="=" />
  <Bread.Crumb>Crumb 3</Bread.Crumb>
</Bread>`,
//4
`<Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
  <Bread.Slicer />
  <Bread.Crumb>Crumb 1</Bread.Crumb>
  <Bread.Crumb>Crumb 2</Bread.Crumb>
  <Bread.Crumb>Crumb 3</Bread.Crumb>
</Bread>`,
//5
`<Bread>
  <Bread.Slicer />
  <Bread.Crumb className={({ active }) => active ? 'font-bold' : 'font-normal'}>Crumb 1</Bread.Crumb>
  <Bread.Crumb className={({ active }) => active ? 'font-bold' : 'font-normal'}>Crumb 2</Bread.Crumb>
  <Bread.Crumb className={({ active }) => active ? 'font-bold' : 'font-normal'}>Crumb 3</Bread.Crumb>
</Bread>`,
//6
`<Bread.Slicer>
  <i className="fas fa-fw fa-chevron-right"></i>
</Bread.Slicer>`
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
      <Bread.Crumb>Bread Crumbs</Bread.Crumb>
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
          {_('Bread Crumbs')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#managing">{_('Managing Styles')}</a>
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
      {/* Basic Example */}
      <Preview 
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
            <Bread.Slicer />
            <Bread.Crumb>Crumb 1</Bread.Crumb>
            <Bread.Crumb>Crumb 2</Bread.Crumb>
            <Bread.Crumb>Crumb 3</Bread.Crumb>
          </Bread>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Font Awesome Example */}
      <Preview 
        title="Font Awesome Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
            <Bread.Slicer />
            <Bread.Crumb icon="home">Crumb 1</Bread.Crumb>
            <Bread.Crumb icon="folder">Crumb 2</Bread.Crumb>
            <Bread.Crumb icon="file">Crumb 3</Bread.Crumb>
          </Bread>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Custom Separator Example */}
      <Preview 
        title="Custom Separator Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
            <Bread.Slicer value="›" />
            <Bread.Crumb>Crumb 1</Bread.Crumb>
            <Bread.Crumb>Crumb 2</Bread.Crumb>
            <Bread.Crumb>Crumb 3</Bread.Crumb>
          </Bread>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Custom Separator Example 2 */}
      <Preview 
        title="Custom Separator Example 2" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
            <Bread.Crumb>Crumb 1</Bread.Crumb>
            <Bread.Slicer value="+" />
            <Bread.Crumb>Crumb 2</Bread.Crumb>
            <Bread.Slicer value="=" />
            <Bread.Crumb>Crumb 3</Bread.Crumb>
          </Bread>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
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
        {_('Bread Crumbs')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the bread crumbs component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Bread from 'frui/Bread';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of bread.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="managing" className="uppercase font-bold text-lg mt-8">
        {_('Managing Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can manage the styles of the crumbs by passing class names to
            the <C value="crumb" /> slot in 
            the <C value="<Bread>" /> component.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[4]}</Code>
        <p className="py-2">
          <Translate>
            Or you can pass the class names to the individual 
            <C value="<Bread.Crumbs>" /> components. Classes here have 
            the highest priority.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[5]}</Code>
      </div>

      <h2 id="slicers" className="uppercase font-bold text-lg mt-8">
        {_('Bread Slicers')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can use the <C value="<Bread.Slicer>" /> component to
            add a separator between crumbs. By default it is a slash (/).
            You can customize it by passing a string to the <C value="value" />
            prop or by passing a custom component as children.
          </Translate>
        </p>
        <Preview 
          title="Basic Slicer" 
          className="border border-2 theme-bc-3 mt-4"
        >
          <Preview.Example center padding>
            <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
              <Bread.Slicer />
              <Bread.Crumb>Crumb 1</Bread.Crumb>
              <Bread.Crumb>Crumb 2</Bread.Crumb>
              <Bread.Crumb>Crumb 3</Bread.Crumb>
            </Bread>
          </Preview.Example>
          <Preview.Code>{`<Bread.Slicer />`}</Preview.Code>
        </Preview>

        <Preview 
          title="Custom Separator" 
          className="border border-2 theme-bc-3 mt-4"
        >
          <Preview.Example center padding>
            <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
              <Bread.Slicer value="+"/>
              <Bread.Crumb>Crumb 1</Bread.Crumb>
              <Bread.Crumb>Crumb 2</Bread.Crumb>
              <Bread.Crumb>Crumb 3</Bread.Crumb>
            </Bread>
          </Preview.Example>
          <Preview.Code>{`<Bread.Slicer value="+" />`}</Preview.Code>
        </Preview>

        <Preview 
          title="Custom Separator Component" 
          className="border border-2 theme-bc-3 mt-4"
        >
          <Preview.Example center padding>
            <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
              <Bread.Slicer>
                <i className="fas fa-fw fa-chevron-right text-sm relative px-t--2"></i>
              </Bread.Slicer>
              <Bread.Crumb>Crumb 1</Bread.Crumb>
              <Bread.Crumb>Crumb 2</Bread.Crumb>
              <Bread.Crumb>Crumb 3</Bread.Crumb>
            </Bread>
          </Preview.Example>
          <Preview.Code>{examples[6]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-2">
        <Translate>
          You can use
          the <C value="frui-bread" />, <C value="frui-bread-crumb" />, <C value="frui-bread-slicer" />, <C value="frui-bread-crumb-icon" />,
          and <C value="frui-bread-crumb-active" /> CSS classes to
          globally theme bread.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each bread 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Bread>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Crumb')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Bread.Crumb>" /> component can be passed 
            the following props.
          </Translate>
        </p>
        <Props props={props[1]} />

        <h3 className="font-semibold mt-4">{_('Slicer')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Bread.Slicer>" /> component can be passed 
            the following props.
          </Translate>
        </p>
        <Props props={props[2]} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/badge">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Badges')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/button">
          {_('Buttons')}
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
      uri="/component/bread"
      title="Bread Component"
      description={
        'Bread allows users to see their current location within a '
        + 'websites hierarchy.'
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
      <LayoutPanel pathname="/component/bread">
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
