//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Taglist from 'frui/dist/fields/Taglist';
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
    { label: 'Taglist' }
  ];

  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('color'), _('string'), _('No'), _('Custom background color for tags') ],
    [ _('danger'), _('boolean'), _('No'), _('Red background color for tags') ],
    [ _('info'), _('boolean'), _('No'), _('Blue background color for tags') ],
    [ _('defaultValue'), _('string[]'), _('No'), _('Default value (uncontrolled)') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('muted'), _('boolean'), _('No'), _('Gray background color for tags') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('placeholder'), _('string'), _('No'), _('Placeholders for input values.') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Event handler when value updates') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('success'), _('boolean'), _('No'), _('Green background color for tags') ],
    [ _('value'), _('string[]'), _('No'), _('Default value (controlled)') ],
    [ _('warning'), _('boolean'), _('No'), _('Orange background color for tags') ],
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
              <Link href="#top">{_('Taglist')}</Link>
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
              {_('Taglist')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Taglist from 'frui/fields/Taglist';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Taglist" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The following is a basic example of a 
                <C l value="Taglist" /> field.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Taglist placeholder="Enter Value" value={['foo', 'bar']} />
                </div>
              </div>
              <Code language="typescript">
                {`<Taglist placeholder="Enter Value" value={['foo', 'bar']} />`}
              </Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The following example makes use of all the possible 
                events for <C value="Taglist" />.
              </Translate>
            </p>
            <div className="curved">
              <div className="relative flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Taglist onUpdate={console.log} />
                </div>
              </div>
              <Code language="typescript">
                {`<Taglist onUpdate={console.log} />`}
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
                the Taglist field red.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <Taglist error value={['foo', 'bar']} />
                </div>
              </div>
              <Code language="typescript">
                {`<Taglist error value={['foo', 'bar']} />`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to selects
                or use any of the respective 
                <C l value="frui-field-taglist" />, 
                <C l value="frui-field-taglist-tag" />, 
                <C l value="frui-field-taglist-remove" />, and
                <C l value="frui-field-taglist-input" /> CSS classes. 
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/switch">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Switch')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/textarea">
                {_('Textarea')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
