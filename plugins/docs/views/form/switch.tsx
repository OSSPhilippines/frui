//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/Bread.js';
import Table from 'components/Table.js';
import Switch from 'components/form/Switch.js';

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
// Components

const props = [
  [ 'blue', 'boolean', 'No', 'Show blue switch' ],
  [ 'check', 'boolean', 'No', 'Show check when checked' ],
  [ 'checked', 'boolean', 'No', 'Default checked state (Controlled)' ],
  [ 'checkex', 'boolean', 'No', 'Use check/ex switch' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultChecked', 'string', 'No', 'Default checked state (Uncontrolled)' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'green', 'boolean', 'No', 'Show green/red switch' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'label', 'string', 'No', 'Shows text to the right of switch' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onoff', 'boolean', 'No', 'Use on/off switch' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'orange', 'boolean', 'No', 'Show orange switch' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'ridge', 'boolean', 'No', 'Adds ridges to knobs' ],
  [ 'rounded', 'boolean', 'No', 'Make switch rounded' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'sunmoon', 'boolean', 'No', 'Use sun/moon switch' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ],
  [ 'yesno', 'boolean', 'No', 'Use yes/no switch' ]
];

const examples = [
//0
`<Switch name="name" value="yes" defaultChecked />`,
//1
`<Switch onUpdate={(value, checked) => alert(\`\${value} - \${checked}\`)} />`,
//2
`<Switch error label="Active?" defaultChecked />`,
//3
`<Switch ridge defaultChecked />`,
//4
`<Switch rounded defaultChecked />`,
//5
`<Switch blue label="Blue" defaultChecked />`,
//6
`<Switch onoff defaultChecked />`
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
      <Bread.Crumb icon="rectangle-list" href="/form">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Switch</Bread.Crumb>
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
          {_('Switch')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#events">{_('Events')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#errors">{_('Errors')}</a>
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
          TODO
        </Preview.Example>
        <Preview.Code>{''}</Preview.Code>
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
        {_('Switch')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the switch field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Switch from 'frui/form/Switch';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Switch wraps the HTML standard <code 
              className="text-sm theme-2"
            >{'`<input />`'}</code> element. Therefore, you can 
            use any input attributes as props.
          </Translate>
        </p>
        <Preview
          title="Basic Switch Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Switch name="name" value="yes" defaultChecked />
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            <C value="onUpdate" /> is like <C value="onChange" r /> 
            except the value is passed instead of the change event.
          </Translate>
        </p>
        <Preview
          title="With Events"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Switch onUpdate={(value, checked) => alert(`${value} - ${checked}`)} />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>

        <h3 className="font-semibold text-md mt-8">
          {_('On Change')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onChange" /> event is triggered when the
            value has changed. The following arguments are passed
            to the event handler:
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('event')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('Event Object')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              see: <a 
                href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" 
                target="_blank"
              >Change Event</a>
            </Table.Col>
          </Table.Row>
        </Table>

        <h3 className="font-semibold text-md mt-8">
          {_('On Update')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onUpdate" /> event is triggered when the
            value has been updated. The following arguments are
            passed to the event handler:
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('value')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('string')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="foobar" quote />
            </Table.Col>
          </Table.Row>
        </Table>
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can pass the <C value="error" /> prop to highlight 
            the Switch field red.
          </Translate>
        </p>
        <Preview
          title="Error State Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Switch error label="Active?" defaultChecked />
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can use
            the <C value="frui-form-switch" />, <C value="frui-form-switch-rounded" />, 
            <C value="frui-form-switch-onoff" />, <C value="frui-form-switch-yesno" />, 
            <C value="frui-form-switch-sunmoon" />, <C value="frui-form-switch-checkex" />, 
            <C value="frui-form-switch-ridge" />, <C value="frui-form-switch-smooth" />, 
            <C value="frui-form-switch-blue" />, <C value="frui-form-switch-orange" />, 
            and <C value="frui-form-switch-green" /> CSS classes to globally theme the switch field.
          </Translate>
        </p>

        <h3 className="font-semibold text-md mt-8">
          {_('Ridge')}
        </h3>
        <p className="py-4">
          <Translate>
            Use <C value="ridge" /> prop to add ridges to the 
            knobs.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Switch ridge defaultChecked />
          </div>
          <Code language="typescript">
            {examples[3]}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('Rounded')}
        </h3>
        <p className="py-4">
          <Translate>
            Use <C value="rounded" /> prop to make the switches
            circular.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Switch rounded defaultChecked />
          </div>
          <Code language="typescript">
            {examples[4]}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('Colors')}
        </h3>
        <p className="py-4">
          <Translate>
            Use <C value="blue" />, <C value="orange" /> or 
            <C l value="green" /> prop to change the color of 
            switches.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Switch blue label="Blue" defaultChecked />
            <Switch orange label="Orange" defaultChecked className="ml-4" />
            <Switch green label="Green" defaultChecked className="ml-4" />
          </div>
          <Code language="typescript">
            {examples[5]}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('Shapes')}
        </h3>
        <p className="py-4">
          <Translate>
            Use <C value="onoff" />, <C value="yesno" />, 
            <C l value="checkex" /> or <C value="sunmoon" /> prop 
            to change the color of switches.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Switch onoff defaultChecked />
            <Switch yesno defaultChecked className="ml-4" />
            <Switch checkex defaultChecked className="ml-4" />
            <Switch sunmoon defaultChecked className="ml-4" />
          </div>
          <Code language="typescript">
            {examples[6]}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('Combinations')}
        </h3>
        <p className="py-4">
          <Translate>
            Try different combinations to get the switch you want.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Switch onoff rounded blue defaultChecked />
            <Switch yesno orange ridge defaultChecked className="ml-4" />
            <Switch checkex rounded green ridge defaultChecked className="ml-4" />
            <Switch sunmoon rounded defaultChecked className="ml-4" />
          </div>
        </div>
        <p className="py-4">
          <Translate>
            You can use
            the <C l value="frui-form-option" />, <C l value="frui-form-option-control" />,
            and <C l value="frui-form-option-label" />  CSS classes to globally theme the switch field.
          </Translate>
        </p>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p>
          <Translate>
            The <C value="<Switch>" /> field accepts all props of a 
            standard HTML input element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Switch"
              target="_blank"
            >Moz</a> for standard input attributes.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/form/slug">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Slug')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/form/taglist">
          {_('Taglist')}
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
      uri="/form/switch"
      title="Switch Field"
      description={
        'Switch is a field component that wraps the standard '
        + 'HTML input element for boolean values.'
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
      <LayoutPanel pathname="/form/switch">
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
