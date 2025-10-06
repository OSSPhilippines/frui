//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import Select from 'components/field/Select.js';

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
  [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
  [ 'onSelected', 'Function', 'No', 'Event handler when an option has been selected' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'options', 'Option[]', 'Yes', 'List of select options.' ],
  [ 'placeholder', 'string', 'No', 'Display text when no value set' ],
  [ 'searchable', 'boolean', 'No', 'Add a search field' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Selected value from the options' ]
];

const examples = [
//0
`<Select 
  className="w-full z-20 text-black" 
  options={[
    { label: 'Foo', value: 'foo', keyword: 'foo' },
    { label: 'Bar', value: 'bar', keyword: 'bar' }
  ]}
/>`,
//1
`<Select 
  className="w-full z-30 text-black" 
  options={[
    { 
      label: (<strong className="font-bold">Foo</strong>), 
      value: 'foo', 
      keyword: 'foo' 
    },
    { 
      label: (<strong className="font-bold">Bar</strong>), 
      value: 'bar', 
      keyword: 'bar' 
    }
  ]}
/>`,
//2
`<Select 
  className="w-full z-30 text-black" 
  options={{ foo: 'Foo', bar: 'Bar' }}
  onDropdown={open => console.log('dropdown', open)}
  onSelected={option => console.log('selected', option)}
  onUpdate={value => alert(JSON.stringify(value))}
/>`,
//3
`{
  label: 'Foo',
  value: 'foo',
  keyword: 'foo'
}`,
//4
`<Select options={{ foo: 'Foo', bar: 'Bar' }} className="w-full z-10 text-black" error value="US" />`
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
      <Bread.Crumb>Select</Bread.Crumb>
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
          {_('Select')}
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
        {_('Select')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the select field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Select from 'frui/field/Select';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following is a basic example of a 
            <C l value="Select" /> field.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Select className="w-full z-40 text-black" options={{ foo: 'Foo', bar: 'Bar' }} placeholder="Select Option" searchable />
          </div>
          <Code language="typescript">
            {`<Select className="w-full z-40 text-black" options={{ foo: 'Foo', bar: 'Bar' }} placeholder="Select Option" searchable />`}
          </Code>
        </div>
        <p className="py-4">
          <Translate>
            You can also express options as an array of objects.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <Code language="typescript">{examples[0]}</Code>
        </div>
        <p className="py-4">
          <Translate>
            With array options, you can use React on labels.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Select 
              className="w-full z-30 text-black" 
              options={[
                { 
                  label: (<strong className="font-bold">Foo</strong>), 
                  value: 'foo', 
                  keyword: 'foo' 
                },
                { 
                  label: (<strong className="font-bold">Bar</strong>), 
                  value: 'bar', 
                  keyword: 'bar' 
                }
              ]}
            />
          </div>
          <Code language="typescript">{examples[1]}</Code>
        </div>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following example makes use of all the possible 
            events for <C value="Select" />.
          </Translate>
        </p>
        <div className="curved">
          <div className="relative flex items-center justify-center p-3 theme-bg-1">
            <Select 
              className="w-full z-20 text-black" 
              options={{ foo: 'Foo', bar: 'Bar' }}
              onDropdown={open => console.log('dropdown', open)}
              onSelected={option => console.log('selected', option)}
              onUpdate={value => alert(JSON.stringify(value))}
            />
          </div>
          <Code language="typescript">
            {examples[2]}
          </Code>
        </div>
        
        <h3 className="font-semibold text-md mt-8">
          {_('On Dropdown')}
        </h3>
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

        <h3 className="font-semibold text-md mt-8">
          {_('On Selected')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onSelected" /> event is triggered when an
            option has been selected. The following arguments are
            passed to the event handler:
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('option')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('SelectOption')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <Code language="json" copy={false}>{examples[3]}</Code>
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
              <C value="foo" quote />
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
            the Select field red.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Select options={{ foo: 'Foo', bar: 'Bar' }} className="w-full z-10 text-black" error value="US" />
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
          <C l value="frui-field-select" />, 
          <C l value="frui-field-select-control" />, 
          <C l value="frui-field-select-placeholder" />, 
          <C l value="frui-field-select-dropdown" />,  
          <C l value="frui-field-select-search" />,  
          <C l value="frui-field-select-search-control" />,  
          <C l value="frui-field-select-search-icon" />,  
          <C l value="frui-field-select-options" />,  
          <C l value="frui-field-select-option" />, and 
          <C l value="frui-field-select-label" /> CSS classes. 
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="<Select>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/radio">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Radio')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/slug">
          {_('Slug')}
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
      uri="/field/select"
      title="Select Field"
      description={
        'Select is a field component that wraps the standard '
        + 'HTML select element.'
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
      <LayoutPanel pathname="/field/select">
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
