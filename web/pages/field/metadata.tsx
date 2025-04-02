//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Metadata from 'frui/field/Metadata';
import Table, { Tcol, Thead, Trow } from 'frui/element/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeBasic = `
<Metadata 
  add="Add Reference" 
  placeholder={['Enter Key', 'Enter Value']} 
  value={Object.entries({ foo: 'Foo', bar: 'Bar' })} 
/>`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Metadata' }
  ];

  const props = [
    [ _('add'), _('string'), _('No'), _('Add button text') ],
    [ _('className'), _('string'), _('No'), _('Standard HTML class names applied to the add button') ],
    [ _('defaultValue'), _('Object entries'), _('No'), _('Default value (uncontrolled)') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('min'), _('string|number'), _('No'), _('Used to set minimum number if type is number') ],
    [ _('max'), _('string|number'), _('No'), _('Used to set maximum number if type is number') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('placeholder'), _('string|string[]'), _('No'), _('Placeholders for input values.') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Event handler when value updates') ],
    [ _('step'), _('string|number'), _('No'), _('Used to set step number if type is number') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object applied to the add button') ],
    [ _('type'), _('string'), _('No'), _('Sets the type of value input') ],
    [ _('value'), _('Object entries'), _('No'), _('Default value (controlled)') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/metadata"
      title="Metadata Field"
      description="Metadata fields in FRUI, are ReactJS components that allow users to input a set of key values."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Metadata')}</Link>
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
              {_('Metadata')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Metadata from 'frui/fields/Metadata';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Metadata" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The following is a basic example of a 
                <C l value="Metadata" /> field.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Metadata 
                    add="Add Reference" 
                    placeholder={['Enter Key', 'Enter Value']} 
                    value={Object.entries({ foo: 'Foo', bar: 'Bar' })} 
                  />
                </div>
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>
            <p className="py-4">
              <Translate>
                You can set different value types using the
                <C l value="type" /> prop. Its value can be one of 
                <C l value='type="text"' quote />,
                <C l value='type="number"' quote />,
                <C l value='type="date"' quote />,
                <C l value='type="time"' quote />, or
                <C l value='type="datetime"' quote />. 
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Metadata type="date" add="Add Date" />
                </div>
              </div>
              <Code language="typescript">
                {`<Metadata type="date" add="Add Date" />`}
              </Code>
            </div>
            <p className="py-4">
              <Translate>
                For <C value='type="number"' quote />, you can also
                set the <C value="min" />, <C value="max" />, and
                <C l value="step" /> props.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Metadata type="number" min="0" max="100000" step="0.01" add="Add Number" />
                </div>
              </div>
              <Code language="typescript">
                {`<Metadata type="number" min="0" max="100000" step="0.01" add="Add Number" />`}
              </Code>
            </div>


            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The following example makes use of all the possible 
                events for <C value="Metadata" />.
              </Translate>
            </p>
            <div className="curved">
              <div className="relative flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Metadata add="Add Reference" onUpdate={value => alert(JSON.stringify(value))} />
                </div>
              </div>
              <Code language="typescript">
                {`<Metadata add="Add Reference" onUpdate={value => alert(JSON.stringify(value))} />`}
              </Code>
            </div>

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
                  {_('Object Entries')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="[['foo', 'Foo'], ['bar', 'Bar']]" quote />
                </Tcol>
              </Trow>
            </Table>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the Metadata field red.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Metadata error value={Object.entries({ foo: 'Foo', bar: 'Bar' })} />
                </div>
              </div>
              <Code language="typescript">
                {`<Metadata error value={Object.entries({ foo: 'Foo', bar: 'Bar' })} />`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to selects
                or use any of the respective 
                <C l value="frui-field-metadata-row" />, 
                <C l value="frui-field-metadata-remove" />, 
                <C l value="frui-field-metadata-name" />, 
                <C l value="frui-field-metadata-value" />, and
                <C l value="frui-fieldset-add" /> CSS classes. 
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/mask">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Mask')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/number">
                {_('Number')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
