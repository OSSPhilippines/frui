//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Number from 'frui/dist/fields/Number';
import Table, { Tcol, Thead, Trow } from 'frui/dist/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Number' }
  ];
  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('defaultValue'), _('string'), _('No'), _('Default value (Uncontrolled)') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('onChange'), _('Function'), _('No'), _('Event handler when value has changed') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Passes ref to html input') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('value'), _('string'), _('No'), _('Default value (Controlled)') ],
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Number')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <Link href="#props">
                  {_('Props')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#basic">
                  {_('Basics')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#events">
                  {_('Events')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#errors">
                  {_('Errors')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#styles">
                  {_('Custom Styles')}
                </Link>
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
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Number min="0" max="10000" step="0.01" defaultValue="12345.67" />
                </div>
              </div>
              <Code language="typescript">
                {`<Number min="0" max="10000" step="0.01" defaultValue="12345.67" />`}
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
              <div className="flex items-center justify-center p-3 bg-b1">
                <Number min="0" max="10000" step="0.01" defaultValue="1234.56" onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {`<Number min="0" max="10000" step="0.01" defaultValue="1234.56" onUpdate={value => alert(value)} />`}
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
              <div className="flex items-center justify-center p-3 bg-b1">
                <Number error min="0" max="10000" step="0.01" value="1234.56" />
              </div>
              <Code language="typescript">
                {`<Input error={string|true} min="0" max="10000" step="0.01" value="1234.56" />`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/metadata">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Metadata')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/password">
                {_('Password')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
