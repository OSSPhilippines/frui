//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Select from 'frui/field/Select';
import Table, { Tcol, Thead, Trow } from 'frui/element/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeBasic = `
<Select 
  className="w-full z-20 text-black" 
  options={[
    { label: 'Foo', value: 'foo', keyword: 'foo' },
    { label: 'Bar', value: 'bar', keyword: 'bar' }
  ]}
/>`.trim();

const codeStyle = `
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
/>`.trim();

const codeEvents = `
<Select 
  className="w-full z-30 text-black" 
  options={{ foo: 'Foo', bar: 'Bar' }}
  onDropdown={open => console.log('dropdown', open)}
  onSelected={option => console.log('selected', option)}
  onUpdate={value => alert(JSON.stringify(value))}
/>`.trim();

const codeOption = `{
  label: 'Foo',
  value: 'foo',
  keyword: 'foo'
}`;

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Select' }
  ];

  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('defaultValue'), _('string'), _('No'), _('Alias to value') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('onDropdown'), _('Function'), _('No'), _('Event handler when dropdown opens/closes') ],
    [ _('onSelected'), _('Function'), _('No'), _('Event handler when an option has been selected') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('options'), _('Option[]'), _('Yes'), _('List of select options.') ],
    [ _('placeholder'), _('string'), _('No'), _('Display text when no value set') ],
    [ _('searchable'), _('boolean'), _('No'), _('Add a search field') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('value'), _('string'), _('No'), _('Selected value from the options') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/select"
      title="Select Field"
      description="Select fields in FRUI, are ReactJS components that allow users to select from a dropdown of values."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Select')}</Link>
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
              <div className="flex items-center justify-center p-3 bg-b1">
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
              <Code language="typescript">{codeBasic}</Code>
            </div>
            <p className="py-4">
              <Translate>
                With array options, you can use React on labels.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
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
              <Code language="typescript">{codeStyle}</Code>
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
              <div className="relative flex items-center justify-center p-3 bg-b1">
                <Select 
                  className="w-full z-20 text-black" 
                  options={{ foo: 'Foo', bar: 'Bar' }}
                  onDropdown={open => console.log('dropdown', open)}
                  onSelected={option => console.log('selected', option)}
                  onUpdate={value => alert(JSON.stringify(value))}
                />
              </div>
              <Code language="typescript">
                {codeEvents}
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
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('option')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('SelectOption')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <Code language="json" copy={false}>{codeOption}</Code>
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
              <div className="flex items-center justify-center p-3 bg-b1">
                <Select options={{ foo: 'Foo', bar: 'Bar' }} className="w-full z-10 text-black" error value="US" />
              </div>
              <Code language="typescript">
                {`<Select options={{ foo: 'Foo', bar: 'Bar' }} className="w-full z-10 text-black" error={string|true} value="US" />`}
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

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/radiogroup">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Radio Group')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/slug">
                {_('Slug')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
