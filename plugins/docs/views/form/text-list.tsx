//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Table from 'components/Table.js';
import TextList from 'components/form/TextList.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/text-list';
const title = 'TextList Field';
const description = 'TextList is a field component that allows users to input '
  + 'a list of tags or values.';

const props = [
  [ 'add', 'string', 'No', 'Add button text' ],
  [ 'className', 'string', 'No', 'Standard HTML class names applied to the add button' ],
  [ 'defaultValue', 'string[]', 'No', 'Default value (uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'placeholder', 'string', 'No', 'Placeholders for input values.' ],
  [ 'onUpdate', 'Function', 'No', 'Event handler when value updates' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to the add button' ],
  [ 'value', 'string[]', 'No', 'Default value (controlled)' ]
];

const examples = [
//0
`<TextList 
  add="Add Value" 
  placeholder="Enter Value"
  value={['foo', 'bar']} 
/>`,
//1
`<TextList add="Add Value" onUpdate={value => alert(JSON.stringify(value))} />`,
//2
`<TextList error value={['foo', 'bar']} />`
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
          {_('Text List')}
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
        {_('TextList')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<TextList>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import TextList from 'frui/form/TextList';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following is a basic example of a 
            <C value="TextList" /> field.
          </Translate>
        </p>
        <Preview
          title="Basic TextList Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <TextList 
                add="Add Value" 
                placeholder="Enter Value"
                value={['foo', 'bar']} 
              />
            </div>
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
            The following example makes use of all the possible 
            events for <C value="TextList" />.
          </Translate>
        </p>
        <Preview
          title="With Events"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <TextList add="Add Value" onUpdate={value => alert(JSON.stringify(value))} />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
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
              {_('string[]')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="['foo', 'bar']" quote />
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
            the input field red.
          </Translate>
        </p>
        <Preview
          title="Error State Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <TextList error value={['foo', 'bar']} />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C value="frui-form-textlist-row" />, <C value="frui-form-textlist-remove" />, <C value="frui-form-textlist-value" />,
          and <C value="frui-fieldset-add" /> CSS classes to globally theme the textlist field.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="<TextList>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <Docs.Foot/>
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
