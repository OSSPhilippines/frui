//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Table from 'src/base/Table.js';
import MarkdownEditor from 'src/form/MarkdownEditor.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/markdown-editor';
const title = 'MarkdownEditor Field';
const description = 'MarkdownEditor is a field component that provides a markdown '
  + 'editing interface with live preview.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html textarea' ],
  [ 'rows', 'number', 'No', 'Number of visible rows' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
`<MarkdownEditor name="name" placeholder="Enter name.." defaultValue="# Hello World" />`,
//1
`<MarkdownEditor onUpdate={value => alert(value)} value="# Hello World" />`,
//2
`<MarkdownEditor error onUpdate={value => alert(value)} value="# Not a hotdog." />`
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
          {_('Markdown Editor')}
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
        {_('Markdown Editor')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<MarkdownEditor>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import MarkdownEditor from 'frui/form/MarkdownEditor';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            <C value="MarkdownEditor" /> wraps the HTML standard <code 
              className="text-sm theme-2"
            >{'`<textarea />`'}</code> element. Therefore, you can 
            use any textarea attributes as props.
          </Translate>
        </p>
        <Preview
          title="Basic Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <MarkdownEditor
                name="name"
                placeholder="Enter markdown here..."
                defaultValue="# Hello World"
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
            <C value="onUpdate" /> is like <C value="onChange" r /> 
            except the value is passed instead of the change event.
          </Translate>
        </p>
        <Preview
          title="With Events"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <MarkdownEditor error onUpdate={value => alert(value)} value="# Not a hotdog." />
            </div>
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
            the <C value="<MarkdownEditor>" /> field red.
          </Translate>
        </p>
        <Preview
          title="Error State Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <div className="w-full">
              <MarkdownEditor
                error
                onUpdate={value => alert(value)}
                value="# Not a hotdog."
              />
            </div>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p>
          <Translate>
            The <C value="<MarkdownEditor>" /> field accepts all props of a standard HTML Textarea 
            element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"
              target="_blank"
            >Moz</a> for standard textarea attributes.
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
