//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import Autocomplete from 'components/field/Autocomplete.js';

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
  [ 'defaultValue', 'string', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
  [ 'onQuery', 'Function', 'No', 'Event handler when something is searched' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'options', 'string[]', 'No', 'List of select options.' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Selected value from the options' ]
];

const examples = [
//0
`<Autocomplete 
  className="w-full" 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`,
//1
`<Autocomplete 
  className="w-full" 
  options={['foo', 'bar']}
  onQuery={(query, set) => setTimeout(
    () => set(['boo', 'bar', 'baz']), 
    1000
  )}
  onDropdown={open => console.log('dropdown', open)}
  onChange={e => console.log('change', e)}
  onUpdate={value => console.log('update', value)}
  placeholder="Enter 'b'"
/>`,
//2
`<Autocomplete 
  error
  className="w-full" 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`
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
      <Bread.Crumb>Autocomplete</Bread.Crumb>
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
          {_('Autocomplete')}
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
        {_('Autocomplete')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the autocomplete field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Autocomplete from 'frui/field/Autocomplete';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following is a basic example of an 
            <C l value="Autocomplete" /> field.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Autocomplete 
              className="w-full" 
              options={[ 'foo', 'bar' ]} 
              placeholder="Enter foo or bar"
            />
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
            events for <C value="Autocomplete" />.
          </Translate>
        </p>
        <Preview
          title="With Events"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Autocomplete
              className="w-full"
              options={['foo', 'bar']}
              onQuery={(_query, set) => setTimeout(
                () => set(['boo', 'bar', 'baz']),
                1000
              )}
              onDropdown={open => console.log('dropdown', open)}
              onChange={e => console.log('change', e)}
              onUpdate={value => console.log('update', value)}
              placeholder="Enter 'b'"
            />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
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
          {_('On Dropdown')}
        </h3>
        <div>
          <p className="py-4">
            <Translate>
              The <C value="onDropdown" /> event is triggered when the
              dropdown opens or closes. The following arguments are
              passed to the event handler:
            </Translate>
          </p>
          <Table>
            <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1 text-left">
                {_('open')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                {_('boolean')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                <C value="true" />
              </Table.Col>
            </Table.Row>
          </Table>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Query')}
        </h3>
        <div>
          <p className="py-4">
            <Translate>
              The <C value="onQuery" /> event is triggered when the
              user searches for something. The following arguments
              are passed to the event handler:
            </Translate>
          </p>
          <Table>
            <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1 text-left">
                {_('query')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                {_('string')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                <C value="foobar" quote />
              </Table.Col>
            </Table.Row>
            <Table.Row>
              <Table.Col className="theme-bg-2 text-left">
                {_('setOptions')}
              </Table.Col>
              <Table.Col className="theme-bg-2 text-left">
                {_('Function')}
              </Table.Col>
              <Table.Col className="theme-bg-2 text-left">
                <Code language="json">{`set(['boo', 'bar', 'baz'])`}</Code>
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
            the Autocomplete field red.
          </Translate>
        </p>
        <Preview
          title="Error Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Autocomplete
              error
              className="w-full"
              options={[ 'foo', 'bar' ]} 
              placeholder="Enter foo or bar"
              value="Not a hotdog."
            />
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
          the <C value="Autocomplete" />, <C value="frui-field-autocomplete" />, <C value="frui-field-autocomplete-dropdown" />, <C value="frui-field-autocomplete-options" />,
          and <C value="frui-field-autocomplete-option" /> CSS classes to globally theme autocomplete.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Autocomplete>" /> field can be passed the
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Fields')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/checkbox">
          {_('Checkbox')}
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
      uri="/field/autocomplete"
      title="Autocomplete Field"
      description={
        'Autocomplete is a text input field that provides a list of '
        + 'suggestions as the user types.'
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
      <LayoutPanel pathname="/field/autocomplete">
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
