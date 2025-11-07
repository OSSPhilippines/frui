//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Checkbox from 'components/field/Checkbox.js';
import Table from 'components/element/Table.js';

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
  [ 'blue', 'boolean', 'No', 'Show blue checkbox' ],
  [ 'check', 'boolean', 'No', 'Show check when checked' ],
  [ 'checked', 'boolean', 'No', 'Default checked state (Controlled)' ],
  [ 'circle', 'boolean', 'No', 'Show circle when checked' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultChecked', 'string', 'No', 'Default checked state (Uncontrolled)' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'label', 'string', 'No', 'Shows text to the right of checkbox' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'orange', 'string', 'No', 'Show orange checkbox' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'rounded', 'boolean', 'No', 'Make checkbox rounded' ],
  [ 'square', 'boolean', 'No', 'Show square when checked' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  defaultChecked 
/>`,
//1
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  rounded 
  defaultChecked 
/>`,
//2
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  orange 
  defaultChecked 
/>`,
//3
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  circle 
  defaultChecked 
/>`,
//4
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  square 
  defaultChecked 
/>`,
//5
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  circle 
  rounded 
  defaultChecked 
/>`,
//6
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  orange 
  square 
  defaultChecked 
/>`,
//7
`<Checkbox 
  name="name" 
  label="Active?" 
  value="yes" 
  rounded 
  square 
  defaultChecked 
/>`,
//8
`<Checkbox 
  label="Active?" 
  onUpdate={(value, checked) => alert(\`\${value} - \${checked}\`)} 
/>`,
//9
`<Checkbox 
  blue 
  label="Blue" 
  defaultChecked 
/>
<Checkbox 
  orange 
  label="Orange" 
  defaultChecked 
/>`,
//10
`<Checkbox 
  square 
  label="Blue" 
  defaultChecked 
/>`,
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
      <Bread.Crumb icon="rectangle-list" href="/field">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Checkbox</Bread.Crumb>
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
          {_('Checkbox')}
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
      {/* Basic Example */}
      <Preview 
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Rounded Example */}
      <Preview 
        title="Rounded Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" rounded defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Orange Example */}
      <Preview 
        title="Orange Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" orange defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Circle Shape Example */}
      <Preview 
        title="Circle Shape Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" circle defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
      </Preview>
      {/* Square Shape Example */}
      <Preview 
        title="Square Shape Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" square defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[4]}</Preview.Code>
      </Preview>
      {/* Looks Like Radio */}
      <Preview 
        title="Looks Like Radio" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" circle rounded defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[5]}</Preview.Code>
      </Preview>
      {/* Orange Square Example */}
      <Preview 
        title="Orange Square Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" orange square defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[6]}</Preview.Code>
      </Preview>
      {/* Round Square Example */}
      <Preview 
        title="Round Square Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Checkbox name="name" label="Active?" value="yes" rounded square defaultChecked />
          </div>
        </Preview.Example>
        <Preview.Code>{examples[7]}</Preview.Code>
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
        {_('Checkbox')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the checkbox field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Checkbox from 'frui/field/Checkbox';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Checkbox wraps the HTML standard <code 
              className="text-sm theme-2"
            >{'`<input />`'}</code> element. Therefore, you can 
            use any input attributes as props.
          </Translate>
        </p>
        <Examples />
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
        <Preview title="With Events" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="text-center">
              <Checkbox label="Active?" onUpdate={(value, checked) => alert(`${value} - ${checked}`)} />
            </div>
          </Preview.Example>
          <Preview.Code>
            {examples[8]}
          </Preview.Code>
        </Preview>

        <h3 className="font-semibold text-md mt-8">
          {_('On Change')}
        </h3>
        <div>
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
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Update')}
        </h3>
        <div>
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
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can pass the <C value="error" /> prop to highlight 
            the Checkbox field red.
          </Translate>
        </p>
        <Preview title="Error Example" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="text-center">
              <Checkbox error defaultChecked label="Active?" />
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Checkbox error defaultChecked label="Active?" />'}
          </Preview.Code>
        </Preview>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Rounded')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="rounded" /> prop to make the checkboxes
            circular.
          </Translate>
        </p>
        <Preview title="Rounded Checkbox" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="text-center">
              <Checkbox rounded defaultChecked />
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<Checkbox rounded defaultChecked />'}
          </Preview.Code>
        </Preview>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Colors')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="blue" /> or <C value="orange" /> prop to 
            change the color of checkboxes.
          </Translate>
        </p>
        <Preview title="Colors" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="text-center">
              <Checkbox blue label="Blue" defaultChecked />
              <Checkbox orange label="Orange" defaultChecked className="ml-4" />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[9]}</Preview.Code>
        </Preview>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Shapes')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="circle" />, <C value="square" /> or 
            <C value="check" /> prop to change the shape of 
            checkboxes.
          </Translate>
        </p>
        <Preview title="Shapes" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="text-center">
              <Checkbox circle label="Circle" defaultChecked />
              <Checkbox square label="Square" defaultChecked className="ml-4" />
              <Checkbox check label="Check" defaultChecked className="ml-4" />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[10]}</Preview.Code>
        </Preview>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Combinations')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Try different combinations to get the checkbox you want.
          </Translate>
        </p>
        <Preview title="Combinations" className="border border-2 theme-bc-3">
          <Preview.Example center padding>
            <div className="text-center">
              <Checkbox circle rounded blue label="Circle" defaultChecked />
              <Checkbox square orange label="Square" defaultChecked className="ml-4" />
              <Checkbox check rounded label="Check" defaultChecked className="ml-4" />
            </div>
          </Preview.Example>
          <Preview.Code>
            {examples[0]}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C value="frui-field-option" />, <C value="frui-field-option-control" />,
          and <C value="frui-field-option-label" /> CSS classes to globally theme checkboxes.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p>
          <Translate>
            The <C value="<Checkbox>" /> field accepts all props of 
            a standard HTML input element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Checkbox"
              target="_blank"
            >Moz</a> for standard input attributes.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/autocomplete">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Autocomplete')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/checklist">
          {_('Checklist')}
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
      uri="/field/checkbox"
      title="Checkbox Field"
      description={
        'Checkbox is a field component that wraps the standard HTML '
        + 'checkbox input element.'
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
      <LayoutPanel pathname="/field/checkbox">
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
