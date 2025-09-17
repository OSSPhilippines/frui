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

import Select from 'components/field/Select.js';

const crumbs: Crumb[] = [
  { icon: 'rectangle-list', label: 'Fields', href: '/field' },
  { label: 'Select' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
  [ 'onSelected', 'Function', 'No', 'Event handler when an option has been selected' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'options', 'Option[]', 'Yes', 'List of select options.' ],
  [ 'placeholder', 'string', 'No', 'Display text when no value set' ],
  [ 'searchable', 'boolean', 'No', 'Add a search field' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Selected value from the options' ]
];

const examples = [
//0
`<Select 
  className="w-full z-20 text-black" 
  options={[
    { label: 'Foo', value: 'foo', keyword: 'foo' },
    { label: 'Bar', value: 'bar', keyword: 'bar' }
  ]}
/>`,
//1
`<Select 
  className="w-full z-30 text-black" 
  options={[
    { 
      label: (<strong className="font-bold">Foo</strong>), 
      value: 'foo', 
      keyword: 'foo' 
    },
    { 
      label: (<strong className="font-bold">Bar</strong>), 
      value: 'bar', 
      keyword: 'bar' 
    }
  ]}
/>`,
//2
`<Select 
  className="w-full z-30 text-black" 
  options={{ foo: 'Foo', bar: 'Bar' }}
  onDropdown={open => console.log('dropdown', open)}
  onSelected={option => console.log('selected', option)}
  onUpdate={value => alert(JSON.stringify(value))}
/>`,
//3
`{
  label: 'Foo',
  value: 'foo',
  keyword: 'foo'
}`,
//4
`<Select options={{ foo: 'Foo', bar: 'Bar' }} className="w-full z-10 text-black" error value="US" />`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/select">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 uppercase font-semibold">
              <a href="#top">{_('Select')}</a>
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
              {_('Select')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Select from 'frui/fields/Select';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Select" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The following is a basic example of a 
                <C l value="Select" /> field.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Select className="w-full z-40 text-black" options={{ foo: 'Foo', bar: 'Bar' }} placeholder="Select Option" searchable />
              </div>
              <Code language="typescript">
                {`<Select className="w-full z-40 text-black" options={{ foo: 'Foo', bar: 'Bar' }} placeholder="Select Option" searchable />`}
              </Code>
            </div>
            <p className="py-4">
              <Translate>
                You can also express options as an array of objects.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <Code language="typescript">{examples[0]}</Code>
            </div>
            <p className="py-4">
              <Translate>
                With array options, you can use React on labels.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Select 
                  className="w-full z-30 text-black" 
                  options={[
                    { 
                      label: (<strong className="font-bold">Foo</strong>), 
                      value: 'foo', 
                      keyword: 'foo' 
                    },
                    { 
                      label: (<strong className="font-bold">Bar</strong>), 
                      value: 'bar', 
                      keyword: 'bar' 
                    }
                  ]}
                />
              </div>
              <Code language="typescript">{examples[1]}</Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The following example makes use of all the possible 
                events for <C value="Select" />.
              </Translate>
            </p>
            <div className="curved">
              <div className="relative flex items-center justify-center p-3 theme-bg-1">
                <Select 
                  className="w-full z-20 text-black" 
                  options={{ foo: 'Foo', bar: 'Bar' }}
                  onDropdown={open => console.log('dropdown', open)}
                  onSelected={option => console.log('selected', option)}
                  onUpdate={value => alert(JSON.stringify(value))}
                />
              </div>
              <Code language="typescript">
                {examples[2]}
              </Code>
            </div>
            
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
              {_('On Selected')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onSelected" /> event is triggered when an
                option has been selected. The following arguments are
                passed to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">
                  {_('option')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  {_('SelectOption')}
                </Tcol>
                <Tcol className="theme-bg-1 text-left">
                  <Code language="json" copy={false}>{examples[3]}</Code>
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
                  <C value="foo" quote />
                </Tcol>
              </Trow>
            </Table>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the Select field red.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Select options={{ foo: 'Foo', bar: 'Bar' }} className="w-full z-10 text-black" error value="US" />
              </div>
              <Code language="typescript">
                {examples[4]}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to selects
                or use any of the respective 
                <C l value="frui-field-select" />, 
                <C l value="frui-field-select-control" />, 
                <C l value="frui-field-select-placeholder" />, 
                <C l value="frui-field-select-dropdown" />,  
                <C l value="frui-field-select-search" />,  
                <C l value="frui-field-select-search-control" />,  
                <C l value="frui-field-select-search-icon" />,  
                <C l value="frui-field-select-options" />,  
                <C l value="frui-field-select-option" />, and 
                <C l value="frui-field-select-label" /> CSS classes. 
              </Translate>
            </p>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/field/radio">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Radio')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/slug">
                {_('Slug')}
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
      uri="/field/select"
      title="Select Field"
      description="Select fields in FRUI, are ReactJS components that allow users to select from a dropdown of values."
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
