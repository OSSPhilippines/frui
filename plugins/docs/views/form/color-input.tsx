//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/Bread.js';
import Table from 'components/Table.js';
import ColorInput from 'components/form/ColorInput.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constatnts

const uri = '/form/color';
const title = 'Color Picker Field';
const description = 'A field componnet allowing users to select colors via a '
  + 'popover palette, sliders, and inputs.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string|number|Date', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'input', 'string|CSS Object', 'No', 'Input slot styles' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'picker', 'string|CSS Object', 'No', 'Picker slot styles' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string|number|Date', 'No', 'Default value (Controlled)' ]
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="rectangle-list" href="/form">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Color Picker</Bread.Crumb>
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
          {_('Color Picker')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#managing">{_('Managing Styles')}</a>
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
      {/* Hex Example */}
      <Preview 
        title="Hex Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <ColorInput defaultValue="#006699" />
        </Preview.Example>
        <Preview.Code>
          {'<ColorInput defaultValue="#006699" />'}
        </Preview.Code>
      </Preview>
      {/* Name Example */}
      <Preview 
        title="Color Name Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <ColorInput defaultValue="salmon" />
        </Preview.Example>
        <Preview.Code>
          {'<ColorInput defaultValue="salmon" />'}
        </Preview.Code>
      </Preview>
      {/* RGBA Example */}
      <Preview 
        title="RGBA Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <ColorInput defaultValue="rgba(245, 166, 35, 1)" />
        </Preview.Example>
        <Preview.Code>
          {'<ColorInput defaultValue="rgba(245, 166, 35, 1)" />'}
        </Preview.Code>
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
          {_('Color Picker')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the color picker field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import ColorPicker from 'frui/form/ColorPicker';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic usages of color inputs.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="managing" className="uppercase font-bold text-lg mt-8">
        {_('Managing Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can manage the styles of the input color slots by passing 
            class names, or styles object to
            the <C value="input" /> slot, 
            and <C value="control" /> slot in 
            the <C value="<ColorInput>" /> component.
          </Translate>
        </p>
        <Preview 
          title="Slot Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div className="flex justify-center">
              <ColorInput className="inline-block" picker="p-2" input="theme-bg-muted theme-white!" />
            </div>
          </Preview.Example>
          <Preview.Code>
            {'<ColorInput className="inline-block" picker="p-2" input="theme-bg-muted theme-white!" />'}
          </Preview.Code>
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
          <Preview.Example center padding>
            <ColorInput onUpdate={value => alert(value)} />
          </Preview.Example>
          <Preview.Code>
            {'<ColorInput onUpdate={value => alert(value)} />'}
          </Preview.Code>
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
              <C value="2024-12-01T00:00:00.000Z" quote />
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
          title="Error Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <ColorInput error defaultValue="Invalid Color." />
          </Preview.Example>
          <Preview.Code>
            {'<ColorInput error defaultValue="Invalid Color." />'}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use 
          the <C value="frui-form-input-color" /> CSS class to globally theme the color field.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<ColorInput>" /> field accepts all props of 
            a standard HTML Input element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
              target="_blank"
            >Moz</a> for standard input attributes.
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
