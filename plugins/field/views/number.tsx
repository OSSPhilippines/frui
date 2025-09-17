import { useLanguage, Translate } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import { Table, Thead, Trow, Tcol } from 'components/element/Table.js';

import Number from 'components/field/Number.js';

const crumbs: Crumb[] = [
  { icon: 'rectangle-list', label: 'Fields', href: '/field' },
  { label: 'Number' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
`<Number min="0" max="10000" step="0.01" defaultValue="12345.67" />`,
//1
`<Number min="0" max="10000" step="0.01" defaultValue="1234.56" onUpdate={value => alert(value)} />`,
//2
`<Input error={string|true} min="0" max="10000" step="0.01" value="1234.56" />`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/number">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 uppercase font-semibold">
              <a href="#top">{_('Number')}</a>
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
              {_('Number')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Number from 'frui/fields/Number';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Numbers accepts all props of a standard HTML Input 
                element. See <a 
                  className="text-t2 underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                >Moz</a> for standard input attributes.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="types" className="uppercase font-bold text-lg mt-8">
              {_('Basic')}
            </h2>
            <p className="py-4">
              <Translate>
                Number fields display commas and can limit decimal length.
                The value for numbers removes commas.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <div className="w-full">
                  <Number min="0" max="10000" step="0.01" defaultValue="12345.67" />
                </div>
              </div>
              <Code language="typescript">
                {examples[0]}
              </Code>
            </div>

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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Number min="0" max="10000" step="0.01" defaultValue="1234.56" onUpdate={value => alert(value)} />
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
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">
                  {_('event')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  {_('Event Object')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
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
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">
                  {_('value')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  {_('string')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  <C value="foobar" quote />
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Number error min="0" max="10000" step="0.01" value="1234.56" />
              </div>
              <Code language="typescript">
                {examples[2]}
              </Code>
            </div>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/field/metadata">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Metadata')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/password">
                {_('Password')}
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
      uri="/field/number"
      title="Number Field"
      description="Number fields in FRUI, are ReactJS components that automatically formats values into integers and floats."
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
