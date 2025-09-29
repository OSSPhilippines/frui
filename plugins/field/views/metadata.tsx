//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import Metadata from 'components/field/Metadata.js';

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
  [ 'add', 'string', 'No', 'Add button text' ],
  [ 'className', 'string', 'No', 'Standard HTML class names applied to the add button' ],
  [ 'defaultValue', 'Object entries', 'No', 'Default value (uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'min', 'string|number', 'No', 'Used to set minimum number if type is number' ],
  [ 'max', 'string|number', 'No', 'Used to set maximum number if type is number' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'placeholder', 'string|string[]', 'No', 'Placeholders for input values.' ],
  [ 'onUpdate', 'Function', 'No', 'Event handler when value updates' ],
  [ 'step', 'string|number', 'No', 'Used to set step number if type is number' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to the add button' ],
  [ 'type', 'string', 'No', 'Sets the type of value input' ],
  [ 'value', 'Object entries', 'No', 'Default value (controlled)' ]
];

const examples = [
//0
`<Metadata 
  add="Add Reference" 
  placeholder={['Enter Key', 'Enter Value']} 
  value={Object.entries({ foo: 'Foo', bar: 'Bar' })} 
/>`,
//1
`<Metadata type="date" add="Add Date" />`,
//2
`<Metadata type="number" min="0" max="100000" step="0.01" add="Add Number" />`,
//3
`<Metadata add="Add Reference" onUpdate={value => alert(JSON.stringify(value))} />`,
//4
`<Metadata error value={Object.entries({ foo: 'Foo', bar: 'Bar' })} />`
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
      <Bread.Crumb icon="rectangle-list" href="/field">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Metadata</Bread.Crumb>
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
          {_('Metadata')}
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
        {_('Metadata')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the metadata field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Metadata from 'frui/field/Metadata';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following is a basic example of a 
            <C l value="Metadata" /> field.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <Metadata 
                add="Add Reference" 
                placeholder={['Enter Key', 'Enter Value']} 
                value={Object.entries({ foo: 'Foo', bar: 'Bar' })} 
              />
            </div>
          </div>
          <Code language="typescript">
            {examples[0]}
          </Code>
        </div>
        <p className="py-4">
          <Translate>
            You can set different value types using the
            <C l value="type" /> prop. Its value can be one of 
            <C l value='type="text"' quote />,
            <C l value='type="number"' quote />,
            <C l value='type="date"' quote />,
            <C l value='type="time"' quote />, or
            <C l value='type="datetime"' quote />. 
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <Metadata type="date" add="Add Date" />
            </div>
          </div>
          <Code language="typescript">
            {examples[1]}
          </Code>
        </div>
        <p className="py-4">
          <Translate>
            For <C value='type="number"' quote />, you can also
            set the <C value="min" />, <C value="max" />, and
            <C l value="step" /> props.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <Metadata type="number" min="0" max="100000" step="0.01" add="Add Number" />
            </div>
          </div>
          <Code language="typescript">
            {examples[2]}
          </Code>
        </div>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following example makes use of all the possible 
            events for <C value="Metadata" />.
          </Translate>
        </p>
        <div className="curved">
          <div className="relative flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <Metadata add="Add Reference" onUpdate={value => alert(JSON.stringify(value))} />
            </div>
          </div>
          <Code language="typescript">
            {examples[3]}
          </Code>
        </div>

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
              {_('Object Entries')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="[['foo', 'Foo'], ['bar', 'Bar']]" quote />
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
            the Metadata field red.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <Metadata error value={Object.entries({ foo: 'Foo', bar: 'Bar' })} />
            </div>
          </div>
          <Code language="typescript">
            {examples[4]}
          </Code>
        </div>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can add your own custom class to selects
          or use any of the respective 
          <C l value="frui-field-metadata-row" />, 
          <C l value="frui-field-metadata-remove" />, 
          <C l value="frui-field-metadata-name" />, 
          <C l value="frui-field-metadata-value" />, and
          <C l value="frui-fieldset-add" /> CSS classes. 
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="<Metadata>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/mask">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Mask')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/number">
          {_('Number')}
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
      uri="/field/metadata"
      title="Metadata Field"
      description={
        'Metadata is a field component that allows users to '
        + 'input a set of key-value pairs.'
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
      <LayoutPanel pathname="/field/metadata">
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
