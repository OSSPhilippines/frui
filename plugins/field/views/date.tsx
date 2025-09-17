import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';
import { Table, Thead, Trow, Tcol } from '../../../components/element/Table.js';
import Alert from '../../../components/element/Alert.js';

import DateField from '../../../components/field/Date.js';

const crumbs: Crumb[] = [
  { icon: 'rectangle-list', label: 'Fields', href: '/field' },
  { label: 'Date' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string|number|Date', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string|number|Date', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
`<DateField defaultValue={'2024-02-03 12:00:00'} />
<DateField defaultValue={new Date()} />
<DateField defaultValue={(new Date()).getTime()} />`,
//1
`<Date onUpdate={value => alert(value)} />`,
//2
`<Date error={string|true} value="Invalid Date." />`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/date">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Date')}</a>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <a href="#props">
                  {_('Props')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#basic">
                  {_('Basics')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#events">
                  {_('Events')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#errors">
                  {_('Errors')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#styles">
                  {_('Custom Styles')}
                </a>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Date')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Date from 'frui/fields/Date';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Dates accepts all props of a standard HTML Input 
                element. See <a 
                  className="text-t2 underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                >Moz</a> for standard input attributes.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                Date fields use the default <C 
                  quote={true}
                  value={`<input type="date" />`}
                /> element, but normalizes 
                values to ISO strings using <C value="toISOString()" />. 
                <C l value="onUpdate" /> is like <C value="onChange" r /> 
                except the value is passed instead of the change event.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <DateField defaultValue={'2024-02-03 12:00:00'} />
                </div>
              </div>
              <Code language="typescript">
                {examples[0]}
              </Code>
            </div>
            <Alert info className="my-4">
              <i className="fas fa-info-circle mr-2"></i>
              When using the native <C value="Date" /> object, change 
              import to <C value="import DateField from 'frui/fields/Date'" r />
              or whatever name you like.
            </Alert>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                <C value="onUpdate" /> is like <C value="onChange" r /> 
                except the value is passed instead of the change event.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <DateField onUpdate={value => alert(value)} />
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
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('event')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('Event Object')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  see: <a 
                    href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" 
                    target="_blank"
                  >Change Event</a>
                </Tcol>
              </Trow>
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
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('value')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('string')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="2024-12-01T00:00:00.000Z" quote />
                </Tcol>
              </Trow>
            </Table>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the input field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <DateField error value="Invalid Date." />
              </div>
              <Code language="typescript">
                {examples[2]}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to date or use 
                the <C value="frui-field-time" /> CSS class.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/field/currency">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Currency')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/datetime">
                {_('Datetime')}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
};

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/field/date"
      title="Date Field"
      description="Date fields in FRUI, helps users format date based inputs."
      styles={styles}
    />
  );
};

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
};
