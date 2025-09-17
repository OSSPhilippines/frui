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

import Checkbox from 'components/field/Checkbox.js';
import { Table, Thead, Trow, Tcol } from 'components/element/Table.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Fields', href: '/field' },
  { label: 'Checkbox' }
];

const props = [
  [ 'blue', 'boolean', 'No', 'Show blue checkbox' ],
  [ 'check', 'boolean', 'No', 'Show check when checked' ],
  [ 'checked', 'boolean', 'No', 'Default checked state (Controlled)' ],
  [ 'circle', 'boolean', 'No', 'Show circle when checked' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultChecked', 'string', 'No', 'Default checked state (Uncontrolled)' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'label', 'string', 'No', 'Shows text to the right of checkbox' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'orange', 'string', 'No', 'Show orange checkbox' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'rounded', 'boolean', 'No', 'Make checkbox rounded' ],
  [ 'square', 'boolean', 'No', 'Show square when checked' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/checkbox">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 uppercase font-semibold">
              <a href="#top">{_('Checkbox')}</a>
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
                the Checkbox field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/field/autocomplete">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Autocomplete')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/checklist">
                {_('Checklist')}
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
      uri="/field/checkbox"
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
