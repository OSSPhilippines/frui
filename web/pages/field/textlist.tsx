//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Textlist from 'frui/field/Textlist';
import Table, { Tcol, Thead, Trow } from 'frui/element/Table';
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
    { label: 'Textlist' }
  ];

  const props = [
    [ _('add'), _('string'), _('No'), _('Add button text') ],
    [ _('className'), _('string'), _('No'), _('Standard HTML class names applied to the add button') ],
    [ _('defaultValue'), _('string[]'), _('No'), _('Default value (uncontrolled)') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('placeholder'), _('string'), _('No'), _('Placeholders for input values.') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Event handler when value updates') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object applied to the add button') ],
    [ _('value'), _('string[]'), _('No'), _('Default value (controlled)') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/textlist"
      title="Textlist Field"
      description="Textlist fields in FRUI, are ReactJS components that allow users to enter multiple values in a fieldset."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Textlist')}</Link>
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
              {_('Textlist')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Textlist from 'frui/fields/Textlist';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Textlist" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The following is a basic example of a 
                <C l value="Textlist" /> field.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Textlist 
                    add="Add Value" 
                    placeholder="Enter Value"
                    value={['foo', 'bar']} 
                  />
                </div>
              </div>
              <Code language="typescript">
                {`<Textlist add="Add Value" placeholder="Enter Value" value={['foo', 'bar']} />`}
              </Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The following example makes use of all the possible 
                events for <C value="Textlist" />.
              </Translate>
            </p>
            <div className="curved">
              <div className="relative flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Textlist add="Add Value" onUpdate={value => alert(JSON.stringify(value))} />
                </div>
              </div>
              <Code language="typescript">
                {`<Textlist add="Add Value" onUpdate={value => alert(JSON.stringify(value))} />`}
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
                  {_('string[]')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="['foo', 'bar']" quote />
                </Tcol>
              </Trow>
            </Table>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the Textlist field red.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Textlist error value={['foo', 'bar']} />
                </div>
              </div>
              <Code language="typescript">
                {`<Textlist error value={['foo', 'bar']} />`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to selects
                or use any of the respective 
                <C l value="frui-field-textlist-row" />, 
                <C l value="frui-field-textlist-remove" />, 
                <C l value="frui-field-textlist-value" />, and
                <C l value="frui-fieldset-add" /> CSS classes. 
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/textarea">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Textarea')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/time">
                {_('Time')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
