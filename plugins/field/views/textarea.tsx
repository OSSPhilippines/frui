//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import Textarea from 'components/field/Textarea.js';

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
`<Textarea name="name" placeholder="Enter name..">Hello World</Textarea>`,
//1
`<Textarea onUpdate={value => alert(value)}>Hello World</Textarea>`,
//2
`<Textarea error onUpdate={value => alert(value)}>Not a hotdog.</Textarea>`
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
      <Bread.Crumb>Textarea</Bread.Crumb>
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
          {_('Textarea')}
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
        {_('Textarea')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the textarea field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Textarea from 'frui/field/Textarea';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Textarea wraps the HTML standard <code 
              className="text-sm theme-2"
            >{'`<textarea />`'}</code> element. Therefore, you can 
            use any textarea attributes as props.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Textarea name="name" placeholder="Enter name..">Hello World</Textarea>
          </div>
          <Code language="typescript">
            {examples[0]}
          </Code>
        </div>
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
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Textarea onUpdate={value => alert(value)}>Hello World</Textarea>
          </div>
          <Code language="typescript">
            {examples[1]}
          </Code>
        </div>

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
            the textarea field red.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Textarea error onUpdate={value => alert(value)}>Not a hotdog.</Textarea>
          </div>
          <Code language="typescript">
            {examples[2]}
          </Code>
        </div>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p>
          <Translate>
            The <C value="<Textarea>" /> field accepts all props of a 
            standard HTML Textarea element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea"
              target="_blank"
            >Moz</a> for standard textarea attributes.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/taglist">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Taglist')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/textlist">
          {_('Textlist')}
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
      uri="/field/textarea"
      title="Textarea Field"
      description={
        'Textarea is a field component that wraps the standard '
        + 'HTML textarea element for multi-line text input.'
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
      <LayoutPanel pathname="/field/textarea">
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
