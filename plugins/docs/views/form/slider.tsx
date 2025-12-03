//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Table from 'components/Table.js';
import Slider from 'components/form/Slider.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/slider';
const title = 'Slider Component';
const description = 'Slider is a field component that wraps the standard HTML '
  + 'range input element.';

const props = [
  //[ 'angle', 'string|number', 'No', 'Angle arc of the slider in degrees' ],
  [ 'asc', 'boolean', 'No', 'Ensures lower handle is always less than or equal to higher handle' ],
  [ 'bgblack', 'boolean', 'No', 'Black background color (track color)' ],
  [ 'bgcolor', 'string', 'No', 'Custom background color (track color)' ],
  [ 'bgerror', 'boolean', 'No', 'Error background color (track color)' ],
  [ 'bginfo', 'boolean', 'No', 'Info background color (track color)' ],
  [ 'bgmuted', 'boolean', 'No', 'Muted background color (track color)' ],
  [ 'bgprimary', 'boolean', 'No', 'Primary background color (track color)' ],
  [ 'bgsecondary', 'boolean', 'No', 'Secondary background color (track color)' ],
  [ 'bgsuccess', 'boolean', 'No', 'Success background color (track color)' ],
  [ 'bgtertiary', 'boolean', 'No', 'Tertiary background color (track color)' ],
  [ 'bgwarning', 'boolean', 'No', 'Warning background color (track color)' ],
  [ 'bgwhite', 'boolean', 'No', 'White background color (track color)' ],
  [ 'black', 'boolean', 'No', 'Black color (handle color)' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom color (handle color)' ],
  [ 'connect', 'boolean', 'No', 'Adds a connecting line between handles' ],
  [ 'defaultValue', 'string|number|[number,number]', 'No', 'Uncontrolled initial value' ],
  [ 'desc', 'boolean', 'No', 'Ensures lower handle is always more than or equal to higher handle' ],
  [ 'error', 'boolean', 'No', 'Error color (handle color)' ],
  [ 'handles', 'CSS Object | string', 'No', 'Styles for handles' ],
  [ 'info', 'boolean', 'No', 'Info color (handle color)' ],
  [ 'inputs', 'CSS Object | string', 'No', 'Styles for inputs' ],
  [ 'max', 'string|number', 'No', 'Maximum value' ],
  [ 'min', 'string|number', 'No', 'Minimum value' ],
  [ 'muted', 'boolean', 'No', 'Muted color (handle color)' ],
  [ 'name', 'string', 'No', 'Name of the slider input for HTML forms' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'primary', 'boolean', 'No', 'Primary color (handle color)' ],
  [ 'range', 'boolean', 'No', 'Whether to use 1 or 2 handles' ],
  [ 'secondary', 'boolean', 'No', 'Secondary color (handle color)' ],
  [ 'success', 'boolean', 'No', 'Success color (handle color)' ],
  [ 'step', 'string|number', 'No', 'Increment step value' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'tertiary', 'boolean', 'No', 'Tertiary color (handle color)' ],
  [ 'track', 'CSS Object | string', 'No', 'Styles for track' ],
  [ 'value', 'string|number|[number,number]', 'No', 'Controlled value' ],
  [ 'warning', 'boolean', 'No', 'Warning color (handle color)' ],
  [ 'white', 'boolean', 'No', 'White color (handle color)' ]
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
          {_('Slider')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
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
      {/* Basic Example */}
      <Preview 
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider />'}
        </Preview.Code>
      </Preview>
      {/* With Connection Example */}
      <Preview 
        title="With Connection Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider connect />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider connect />'}
        </Preview.Code>
      </Preview>
      {/* Info Color Example */}
      <Preview 
        title="Info Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider info connect />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider info connect />'}
        </Preview.Code>
      </Preview>
      {/* Warning Color Example */}
      <Preview 
        title="Warning Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider warning connect />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider warning connect />'}
        </Preview.Code>
      </Preview>
      {/* Success Color Example */}
      <Preview 
        title="Success Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider success connect />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider success connect />'}
        </Preview.Code>
      </Preview>
      {/* Custom Color Example */}
      <Preview 
        title="Custom Color Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider color="salmon" connect />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider color="salmon" connect />'}
        </Preview.Code>
      </Preview>
      {/* With Number Props Example */}
      <Preview 
        title="With Number Props Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider inputs="px-w-60!" min="-100" max="100" step="5" />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider min="-100" max="100" step="5" />'}
        </Preview.Code>
      </Preview>
      {/* Range Slider Example */}
      <Preview 
        title="Range Slider Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider range min="-10" />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider range min="-10" />'}
        </Preview.Code>
      </Preview>
      {/* Range With Connection Example */}
      <Preview 
        title="Range With Connection Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider range connect info min="-10" />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider range connect info min="-10" />'}
        </Preview.Code>
      </Preview>
      {/* Range Ascending Example */}
      <Preview 
        title="Range Ascending Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider range connect success asc min="-10" value={[-2, 2]} />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider range connect success asc min="-10" value={[-2,2]} />'}
        </Preview.Code>
      </Preview>
      {/* Range Descending Example */}
      <Preview 
        title="Range Descending Example" 
        className="border border-2 theme-bc-3 px-w-33-7 r2xl-px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <div className="text-center">
            <Slider range connect warning desc min="-10" value={[4,-4]} />
          </div>
        </Preview.Example>
        <Preview.Code>
          {'<Slider range connect warning desc min="-10" value={[4,-4]} />'}
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
        {_('Slider')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Slider>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Slider from 'frui/form/Slider';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following are some basic examples of <C value="Slider" /> component.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following example makes use of all the possible 
            events for <C value="<Slider>" />.
          </Translate>
        </p>
        <Preview 
          title="Event Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Slider onUpdate={console.log} />
          </Preview.Example>
          <Preview.Code>
            {`<Slider onUpdate={console.log} />`}
          </Preview.Code>
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
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('values')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('number | [ number, number ]')}
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
            You can pass 
            the <C value="error" /> prop to highlight 
            the <C value="<Slider>" /> field red.
          </Translate>
        </p>
        <Preview 
          title="Error Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Slider error />
          </Preview.Example>
          <Preview.Code>
            {'<Slider error />'}
          </Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can add your own custom class to files or use any of 
          the respective <C value="frui-form-file" />, <C value="frui-form-file-control" />, <C value="frui-form-file-reset" />, <C value="frui-form-file-file" />, 
          and <C value="frui-form-file-link" /> CSS classes. 
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="<Slider>" /> component can be passed the 
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
