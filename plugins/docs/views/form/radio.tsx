//--------------------------------------------------------------------//
// Imports

import { useState } from 'react';
//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/Bread.js';
import Table from 'components/Table.js';
import Radio from 'components/form/Radio.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/component/radio';
const title = 'Radio Field';
const description = 'Radio is a field component that wraps the standard '
  + 'HTML input element for radio values.';

const props = [
  [ 'blue', 'boolean', 'No', 'Show blue checkbox' ],
  [ 'check', 'boolean', 'No', 'Show check when checked' ],
  [ 'checked', 'boolean', 'No', 'Default checked state (Controlled)' ],
  [ 'circle', 'boolean', 'No', 'Show circle when checked' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultChecked', 'string', 'No', 'Default checked state (Uncontrolled)' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'label', 'string', 'No', 'Shows text to the right of checkbox' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'orange', 'string', 'No', 'Show orange checkbox' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'rounded', 'boolean', 'No', 'Make checkbox rounded' ],
  [ 'square', 'boolean', 'No', 'Show square when checked' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
`<Radio rounded name="name" label="Yes" value="yes" defaultChecked />`,
//1
`function Home() {
  const [ value, setValue ] = useState('yes');
  return (
    <span>
      <Radio 
        rounded 
        label="Yes" 
        value="yes" 
        checked={value === 'yes'} 
        onUpdate={value => setValue(value as string)}
      />
      <Radio 
        rounded 
        label="No" 
        value="no" 
        checked={value === 'no'} 
        onUpdate={value => setValue(value as string)}
        className="ml-4"
      />
    </span>
  )
}`,
//2
`<Radio error rounded label="Yes" defaultChecked />`,
//3
`<Radio rounded defaultChecked />`,
//4
`<Radio blue label="Blue" defaultChecked />`,
//5
`<Radio square label="Blue" defaultChecked />`
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
          {_('Radio')}
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
  const [ value, setValue ] = useState('yes');
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Radio')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the radio field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Radio from 'frui/form/Radio';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Radio wraps the HTML standard <code 
              className="text-sm theme-2"
            >{'`<input />`'}</code> element. Therefore, you can 
            use any input attributes as props.
          </Translate>
        </p>
        <Preview
          title="Basic Radio Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Radio rounded name="name" label="Yes" value="yes" defaultChecked />
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
          <Preview.Example center padding>
            <div className="flex items-center justify-center">
              <Radio
                rounded
                label="Yes"
                value="yes"
                checked={value === 'yes'}
                onUpdate={value => setValue(value as string)}
              />
              <Radio
                rounded
                label="No"
                value="no"
                checked={value === 'no'}
                onUpdate={value => setValue(value as string)}
                className="ml-4"
              />
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
            the Radio field red.
          </Translate>
        </p>
        <Preview
          title="Error State Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <div className="flex items-center justify-center">
              <Radio error rounded label="Yes" defaultChecked />
              <Radio error rounded label="No" className="ml-4" />
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
          the <C value="frui-field-radio" />, <C value="frui-field-radio-rounded" />, <C value="frui-field-radio-check" />, <C value="frui-field-radio-square" />, <C value="frui-field-radio-circle" />, <C value="frui-field-radio-blue" />, <C value="frui-field-radio-orange" />, 
          and <C value="frui-field-radio-default" /> CSS classes to globally theme radio.
        </Translate>
      </p>

      <h3 className="font-semibold text-md mt-8">
        {_('Rounded')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="rounded" /> prop to make the radios
            circular.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Radio rounded defaultChecked />
          </div>
          <Code language="typescript">
            {examples[3]}
          </Code>
        </div>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Colors')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="blue" /> or <C value="orange" /> prop to 
            change the color of radios.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Radio blue label="Blue" defaultChecked />
            <Radio orange label="Orange" defaultChecked className="ml-4" />
          </div>
          <Code language="typescript">
            {examples[4]}
          </Code>
        </div>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Shapes')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="circle" />, <C value="checked" /> or 
            <C l value="checked" /> prop to change the color of 
            radios.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Radio circle label="Circle" defaultChecked />
            <Radio square label="Square" defaultChecked className="ml-4" />
            <Radio check label="Check" defaultChecked className="ml-4" />
          </div>
          <Code language="typescript">
            {examples[5]}
          </Code>
        </div>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Combinations')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Try different combinations to get the radios you want.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Radio circle rounded blue label="Circle" defaultChecked />
            <Radio square orange label="Square" defaultChecked className="ml-4" />
            <Radio check rounded label="Check" defaultChecked className="ml-4" />
          </div>
        </div>

        <p className="py-4">
          <Translate>
            You can use
            the <C value="frui-form-option" />, <C value="frui-form-option-control" />,
            and <C value="frui-form-option-label" /> CSS classes to globally theme the radio field.
          </Translate>
        </p>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p>
          <Translate>
            The <C value="<Radio>" /> field accepts all props of a 
            standard HTML input element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Radio"
              target="_blank"
            >Moz</a> for standard input attributes.
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
