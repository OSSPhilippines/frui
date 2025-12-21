//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Table from 'src/base/Table.js';
import CurrencySelect from 'src/form/CurrencySelect.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/currency-select';
const title = 'CurrencySelect Field';
const description = 'CurrencySelect fields in FRUI, allow users select from a list of '
  + 'count riesaround the world.';

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
            Import the <C value="<CurrencySelect>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import CurrencySelect from 'frui/form/CurrencySelect';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div className="relative z-[100]">
        <p className="py-4">
          <Translate>
            The following is a basic example of 
            a <C value="CurrencySelect" /> field.
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
            the <C value="searchable" /> prop to 
            the <C value="CurrencySelect" /> component.
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
            You can enable multiple selection by passing 
            the <C value="multiple" /> prop to 
            the <C value="CurrencySelect" /> component.
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
            events for <C value="CurrencySelect" />.
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
            the <C value="<CurrencySelect>" /> field red.
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
          the <C value="frui-form-currency-select" />, <C value="frui-form-select-control" />, <C value="frui-form-select-placeholder" />, <C value="frui-form-select-dropdown" />, <C value="frui-form-select-search" />, <C value="frui-form-select-search-control" />, <C value="frui-form-select-search-icon" />, <C value="frui-form-select-options" />, <C value="frui-form-select-option" />,
          and <C value="frui-form-select-label" /> CSS classes to globally theme the currency select field.
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
