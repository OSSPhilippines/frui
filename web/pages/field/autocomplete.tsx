//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Autocomplete from 'frui/dist/fields/Autocomplete';
import Table, { Tcol, Thead, Trow } from 'frui/dist/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeBasic = `
<Autocomplete 
  className="w-full" 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`.trim();

const codeEvents = `
<Autocomplete 
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
/>`.trim();

const codeErrors = `
<Autocomplete 
  error
  className="w-full" 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Autocomplete' }
  ];
  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('defaultValue'), _('string'), _('No'), _('Alias to value') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('onChange'), _('Function'), _('No'), _('Event handler when value has changed') ],
    [ _('onDropdown'), _('Function'), _('No'), _('Event handler when dropdown opens/closes') ],
    [ _('onQuery'), _('Function'), _('No'), _('Event handler when something is searched') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('options'), _('string[]'), _('No'), _('List of select options.') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('value'), _('string'), _('No'), _('Selected value from the options') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/autocomplete"
      title="Autocomplete Field"
      description="Autocomplete fields in FRUI, suggests values as the user enters more information."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              <Link href="#top">Autocomplete</Link>
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
              {_('Autocomplete')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Autocomplete from 'frui/fields/Autocomplete';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Autocomplete" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The following is a basic example of an 
                <C l value="Autocomplete" /> field.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Autocomplete 
                  className="w-full" 
                  options={[ 'foo', 'bar' ]} 
                  placeholder="Enter foo or bar"
                />
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The following example makes use of all the possible 
                events for <C value="Autocomplete" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="relative flex items-center justify-center p-3 bg-b1">
                <Autocomplete 
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
                />
              </div>
              <Code language="typescript">
                {codeEvents}
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
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('open')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('boolean')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="true" />
                </Tcol>
              </Trow>
            </Table>

            <h3 className="font-semibold text-md mt-8">
              {_('On Query')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onQuery" /> event is triggered when the
                user searches for something. The following arguments
                are passed to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('query')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('string')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="foobar" quote />
                </Tcol>
              </Trow>
              <Trow>
                <Tcol className="bg-b2 text-left">
                  {_('setOptions')}
                </Tcol>
                <Tcol className="bg-b2 text-left">
                  {_('Function')}
                </Tcol>
                <Tcol className="bg-b2 text-left">
                  <Code language="json">{`set(['boo', 'bar', 'baz'])`}</Code>
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
                the Autocomplete field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Autocomplete 
                  error
                  className="w-full" 
                  options={[ 'foo', 'bar' ]} 
                  placeholder="Enter foo or bar"
                />
              </div>
              <Code language="typescript">
                {codeErrors}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to 
                <C l value="Autocomplete" /> components
                or use any combination of <C 
                  value="frui-field-autocomplete" 
                />, <C 
                  value="frui-field-autocomplete-dropdown" 
                />, <C 
                  value="frui-field-autocomplete-options" 
                />, and <C 
                  value="frui-field-autocomplete-option" 
                /> CSS classes.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Fields')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/checkbox">
                {_('Checkbox')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
