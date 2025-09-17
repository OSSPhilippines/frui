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

import Autocomplete from 'components/field/Autocomplete.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Fields', href: '/field' },
  { label: 'Autocomplete' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
  [ 'onQuery', 'Function', 'No', 'Event handler when something is searched' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'options', 'string[]', 'No', 'List of select options.' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Selected value from the options' ]
];

const examples = [
//0
`<Autocomplete 
  className="w-full" 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`,
//1
`<Autocomplete 
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
/>`,
//2
`<Autocomplete 
  error
  className="w-full" 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/autocomplete">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase font-semibold">
              <a href="#top">Autocomplete</a>
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Autocomplete 
                  className="w-full" 
                  options={[ 'foo', 'bar' ]} 
                  placeholder="Enter foo or bar"
                />
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
                The following example makes use of all the possible 
                events for <C value="Autocomplete" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="relative flex items-center justify-center p-3 theme-bg-1">
                <Autocomplete 
                  className="w-full" 
                  options={['foo', 'bar']}
                  onQuery={(_query, set) => setTimeout(
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
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">
                  {_('open')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  {_('boolean')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
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
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">
                  {_('query')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  {_('string')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  <C value="foobar" quote />
                </Tcol>
              </Trow>
              <Trow>
                <Tcol className="theme-bg-2 text-left">
                  {_('setOptions')}
                </Tcol>
                <Tcol className="theme-bg-2 text-left">
                  {_('Function')}
                </Tcol>
                <Tcol className="theme-bg-2 text-left">
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
                the Autocomplete field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Autocomplete 
                  error
                  className="w-full" 
                  options={[ 'foo', 'bar' ]} 
                  placeholder="Enter foo or bar"
                />
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

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/field">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Fields')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/checkbox">
                {_('Checkbox')}
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
      uri="/field/autocomplete"
      title=""
      description=""
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
