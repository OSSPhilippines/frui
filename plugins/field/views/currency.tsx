//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import CurrencySelect from 'components/field/CurrencySelect.js';

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
  [ 'display', 'SlotStyleProp', 'No', 'Style to apply to the select display' ],
  [ 'dropdown', 'SlotStyleProp', 'No', 'Style to apply to the select drop down' ],
  [ 'error', 'boolean', 'No', 'Whether the select is in an error state' ],
  [ 'name', 'string', 'No', 'Name used by forms' ],
  [ 'onDropdown', '(show: boolean) => void', 'No', 'Dropdown handler' ],
  [ 'onUpdate', '(currency: CurrencyData | CurrencyData[]) => void', 'No', 'Update handler for currency data' ],
  [ 'option', 'CallableSlotStyleProp<SelectStates>', 'No', 'Style to apply to the select option' ],
  [ 'placeholder', 'string', 'No', 'Placeholder text when no option is selected' ],
  [ 'searchable', 'boolean | string', 'No', 'Whether the currency select is searchable' ],
  [ 'style', 'CSSProperties', 'No', 'Standard HTML styles' ]
];

const examples = [
//0
`<CurrencySelect />`,
//1
`<CurrencySelect searchable />`,
//2
`<CurrencySelect searchable multiple />`,
//3
`<CurrencySelect 
  onDropdown={open => console.log('dropdown', open)}
  onUpdate={value => alert(JSON.stringify(value))}
/>`,
//4
`<CurrencySelect error value="USD" />`
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
      <Bread.Crumb>Currency</Bread.Crumb>
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
          {_('Currency Select')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#searchable">{_('Searchable')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#multiple">{_('Multiple')}</a>
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
        {_('Currency Select')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the currency field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import CurrencySelect from 'frui/field/CurrencySelect';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div className="relative z-[100]">
        <p className="py-4">
          <Translate>
            The following is a basic example of 
            a <C l value="CurrencySelect" /> field.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <CurrencySelect />
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="searchable" className="uppercase font-bold text-lg mt-8">
        {_('Searchable')}
      </h2>
      <div className="relative z-[99]">
        <p className="py-4">
          <Translate>
            You can add a search field to the dropdown by passing
            the <C value="searchable" /> prop to the 
            <C l value="CurrencySelect" /> component.
          </Translate>
        </p>
        <Preview 
          title="Search Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <CurrencySelect searchable />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="multiple" className="uppercase font-bold text-lg mt-8">
        {_('Multiple')}
      </h2>
      <div className="relative z-[98]">
        <p className="py-4">
          <Translate>
            You can enable multiple selection by passing the
            <C value="multiple" /> prop to the
            <C l value="CurrencySelect" /> component.
          </Translate>
        </p>
        <Preview
          title="Multiple Example"
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <CurrencySelect searchable multiple />
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div className="relative z-[97]">
        <p className="py-4">
          <Translate>
            The following example makes use of all the possible 
            events for <C value="Currency" />.
          </Translate>
        </p>
        <Preview
          title="With Events"
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <CurrencySelect 
              onDropdown={open => console.log('dropdown', open)}
              onUpdate={value => alert(JSON.stringify(value))}
            />
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
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
              {_('CurrencyData')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <Code language="json" copy={false}>{examples[3]}</Code>
            </Table.Col>
          </Table.Row>
        </Table>
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div className="relative z-[96]">
        <p className="py-4">
          <Translate>
            You can pass the <C value="error" /> prop to highlight 
            the Currency field red.
          </Translate>
        </p>
        <Preview
          title="Error Example"
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <CurrencySelect name="error" error value="USD" />
          </Preview.Example>
          <Preview.Code>
            {`<CurrencySelect error value="USD" />`}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C value="frui-field-currency-select" />, <C value="frui-field-select-control" />, <C value="frui-field-select-placeholder" />, <C value="frui-field-select-dropdown" />, <C value="frui-field-select-search" />, <C value="frui-field-select-search-control" />, <C value="frui-field-select-search-icon" />, <C value="frui-field-select-options" />, <C value="frui-field-select-option" />,
          and <C value="frui-field-select-label" /> CSS classes to globally theme the currency field.
        </Translate>
      </p>
                  
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<CurrencySelect>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2 hover:text-link" href="/field/color-picker">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Color Picker')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2 hover:text-link" href="/field/currency">
          {_('Currency')}
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
      uri="/field/currency"
      title="Currency Field"
      description={
        'Currency fields in FRUI, allow users select from a list of '
        + 'countries around the world.'
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
      <LayoutPanel pathname="/field/currency">
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
