//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Table from 'src/base/Table.js';
import Metadata from 'src/form/Metadata.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/metadata';
const title = 'Metadata Field';
const description = 'Metadata is a field component that allows users to '
  + 'input a set of key-value pairs.';

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
          {_('Metadata')}
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
            Import the <C value="<Metadata>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Metadata from 'frui/form/Metadata';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following is a basic example of
            a <C value="Metadata" /> field.
          </Translate>
        </p>
        <Preview
          title="Basic Metadata Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <Metadata type="number" min="0" max="100000" step="0.01" add="Add Number" />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            You can set different value types using 
            the <C value="type" /> prop. Its value can be one 
            of <C value='type="text"' quote />, <C value='type="number"' quote />, <C value='type="date"' quote />, <C value='type="time"' quote />, 
            or <C value='type="datetime"' quote />. 
          </Translate>
        </p>
        <Preview
          title="Date Type Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <Metadata type="date" add="Add Date" />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            For <C value='type="number"' quote />, you can also set 
            the <C value="min" />, <C value="max" />, 
            and <C value="step" /> props.
          </Translate>
        </p>
        <Preview
          title="Number Type with Constraints"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <Metadata
                type="number"
                min="0"
                max="100000"
                step="0.01"
                add="Add Number"
              />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
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
        <Preview
          title="Metadata Events"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <Metadata add="Add Reference" onUpdate={value => alert(JSON.stringify(value))} />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>

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
            the <C value="<Metadata>" /> field red.
          </Translate>
        </p>
        <Preview
          title="Error State Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <Metadata error value={Object.entries({ foo: 'Foo', bar: 'Bar' })} />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[4]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C value="frui-form-metadata-row" />, <C value="frui-form-metadata-remove" />, <C value="frui-form-metadata-name" />, <C value="frui-form-metadata-value" />,
          and <C value="frui-fieldset-add" /> CSS classes to globally theme the metadata field.
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
