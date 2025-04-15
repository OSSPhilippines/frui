//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Checkbox from 'frui/field/Checkbox';
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
    { label: 'Checkbox' }
  ];
  const props = [
    [ _('blue'), _('boolean'), _('No'), _('Show blue checkbox') ],
    [ _('check'), _('boolean'), _('No'), _('Show check when checked') ],
    [ _('checked'), _('boolean'), _('No'), _('Default checked state (Controlled)') ],
    [ _('circle'), _('boolean'), _('No'), _('Show circle when checked') ],
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('defaultChecked'), _('string'), _('No'), _('Default checked state (Uncontrolled)') ],
    [ _('defaultValue'), _('string'), _('No'), _('Default value (Uncontrolled)') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('label'), _('string'), _('No'), _('Shows text to the right of checkbox') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('onChange'), _('Function'), _('No'), _('Event handler when value has changed') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('orange'), _('string'), _('No'), _('Show orange checkbox') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Passes ref to html input') ],
    [ _('rounded'), _('boolean'), _('No'), _('Make checkbox rounded') ],
    [ _('square'), _('boolean'), _('No'), _('Show square when checked') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('value'), _('string'), _('No'), _('Default value (Controlled)') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/autocomplete"
      title="Checkbox Field"
      description="Checkbox fields in FRUI, allow users to click and enable/disable actions."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Checkbox')}</Link>
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
              {_('Checkbox')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Checkbox from 'frui/fields/Checkbox';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Checkbox accepts all props of a standard HTML input 
                element. See <a 
                  className="text-t2 underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Checkbox"
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
                Checkbox wraps the HTML standard <code 
                  className="text-sm text-t2"
                >{'`<input />`'}</code> element. Therefore, you can 
                use any input attributes as props.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checkbox name="name" label="Active?" value="yes" defaultChecked />
              </div>
              <Code language="typescript">
                {`<Checkbox name="name" label="Active?" value="yes" defaultChecked />`}
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
                <Checkbox label="Active?" onUpdate={(value, checked) => alert(`${value} - ${checked}`)} />
              </div>
              <Code language="typescript">
                {'<Checkbox label="Active?" onUpdate={(value, checked) => alert(`${value} - ${checked}`)} />'}
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
                the Checkbox field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checkbox error defaultChecked label="Active?" />
              </div>
              <Code language="typescript">
                {`<Checkbox error defaultChecked label="Active?" />`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can apply rounded, colors and shapes to the 
                <C l value="Checkbox" /> component.
              </Translate>
            </p>

            <h3 className="font-semibold text-md mt-8">
              {_('Rounded')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="rounded" /> prop to make the checkboxes
                circular.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checkbox rounded defaultChecked />
              </div>
              <Code language="typescript">
                {`<Checkbox rounded defaultChecked />`}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Colors')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="blue" /> or <C value="orange" /> prop to 
                change the color of checkboxes.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checkbox blue label="Blue" defaultChecked />
                <Checkbox orange label="Orange" defaultChecked className="ml-4" />
              </div>
              <Code language="typescript">
                {`<Checkbox blue label="Blue" defaultChecked />`}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Shapes')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="circle" />, <C value="checked" /> or 
                <C l value="checked" /> prop to change the color of 
                checkboxes.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checkbox circle label="Circle" defaultChecked />
                <Checkbox square label="Square" defaultChecked className="ml-4" />
                <Checkbox check label="Check" defaultChecked className="ml-4" />
              </div>
              <Code language="typescript">
                {`<Checkbox square label="Blue" defaultChecked />`}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Combniations')}
            </h3>
            <p className="py-4">
              <Translate>
                Try different combinations to get the checkbox you want.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checkbox circle rounded blue label="Circle" defaultChecked />
                <Checkbox square orange label="Square" defaultChecked className="ml-4" />
                <Checkbox check rounded label="Check" defaultChecked className="ml-4" />
              </div>
            </div>

            <p className="py-4">
              <Translate>
                You can also add your own custom class to 
                <C l value="Checkbox" /> components
                or use any combination of 
                <C l value="frui-field-option" />, 
                <C l value="frui-field-option-control" />, and
                <C l value="frui-field-option-label" /> CSS classes.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/autocomplete">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Autocomplete')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/code-editor">
                {_('Code Editor')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
