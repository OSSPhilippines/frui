import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';

import Checklist, { ChecklistItem } from '../../../components/field/Checklist.js';
import { Table, Thead, Trow, Tcol } from '../../../components/element/Table.js';
import { useState } from 'react';

//variables
const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Fields', href: '/field' },
  { label: 'Checklist' }
];

const props = [
  [ 'checked', 'boolean', 'No', 'Default checked state (Controlled)' ],
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Changes the color of the checklist' ],
  [ 'defaultChecked', 'string', 'No', 'Default checked state (Uncontrolled)' ],
  [ 'defaultValue', 'string', 'No', 'Default value (Uncontrolled)' ],
  [ 'disabled', 'boolean', 'No', 'Disables the radio group' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'label', 'string', 'No', 'Shows text to the right of checkbox' ],
  [ 'name', 'string', 'Yes', 'Used for react server components' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'orientation', 'string', 'No', 'Set checklist layout (row or column)' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
  `<Checklist name="Options">
  <ChecklistItem label="Option 1" value="option1" />
  <ChecklistItem label="Option 2" value="option2" />
  <ChecklistItem label="Option 3" value="option3" />
</Checklist>`,
//1
`<Checklist name="Defaults" defaultValue={["default1", "default2"]}>
  <ChecklistItem label="Default 1" value="default1" />
  <ChecklistItem label="Default 2" value="default2" />
  <ChecklistItem label="Default 3" value="default3" />
</Checklist>`,
//2
`<Checklist name="Checked">
  <ChecklistItem label="Checked 1" value="checked1" defaultChecked />
  <ChecklistItem label="Checked 2" value="checked2" />
  <ChecklistItem label="Checked 3" value="checked3" />
</Checklist>`,
//3
`<RadioGroup name="Rows" orientation="row">
  <RadioGroupItem label="Row 1" value="row1" />
  <RadioGroupItem label="Row 2" value="row2" />
  <RadioGroupItem label="Row 3" value="row3" />
</RadioGroup>`,
//4
`<RadioGroup name="Columns" orientation="column">
  <RadioGroupItem label="Column 1" value="column1" />
  <RadioGroupItem label="Column 2" value="column2" />
  <RadioGroupItem label="Column 3" value="column3" />
</RadioGroup>`,
//5
`<Checklist name="Update" onUpdate={(value, checked) => alert(\`${'${value} - ${checked}'}\`)}>
  <ChecklistItem label="Update 1" value="update1" />
  <ChecklistItem label="Update 2" value="update2" />
  <ChecklistItem label="Update 3" value="update3" />
</Checklist>`,
//6
`function Home() {
  const [selected, setSelected] = useState<(string | number)[] | undefined>([]);
  return (
    <div>
      <Checklist name="Events" onChange={setSelected}>
        <ChecklistItem label="Event 1" value="event1" />
        <ChecklistItem label="Event 2" value="event2" />
        <ChecklistItem label="Event 3" value="event3" />
      </Checklist>
    </div>
    <p>Selected: {selected?.join(", ") || "None"}</p>
  )
}`,
//7
`<Checklist name="Disabled" disabled>
  <ChecklistItem label="Disabled 1" value="disabled1" />
  <ChecklistItem label="Disabled 2" value="disabled2" />
  <ChecklistItem label="Disabled 3" value="disabled3" />
</Checklist>`,
//8
`<Checklist name="Errors" defaultValue={["error1"]} error>
  <ChecklistItem label="Error 1" value="error1" />
  <ChecklistItem label="Error 2" value="error2" />
  <ChecklistItem label="Error 3" value="error3" />
</Checklist>`,
//9
`<Checklist name="Colors" defaultValue={["color1"]} color="green">
  <ChecklistItem label="Color 1" value="color1" />
  <ChecklistItem label="Color 2" value="color2" />
  <ChecklistItem label="Color 3" value="color3" />
</Checklist>`,
//10
`<Checklist name="check-color" defaultValue={["gray", "green", "purple"]} >
  <ChecklistItem label="Gray" value="gray" color="#333" />
  <ChecklistItem label="Green" value="green" color="green" />
  <ChecklistItem label="Purple" value="purple" color="purple" />
</Checklist>`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  const [ selected, setSelected ] = useState<(string | number)[] | undefined>([]);
  //render
  return (
    <LayoutPanel pathname="/field/checklist">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Checklist')}</a>
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
                <a href="#default">
                  {_('Default Value')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#orientation">
                  {_('Orientation')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#events">
                  {_('Events')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#disabled">
                  {_('Disabled')}
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
              {_('Checklist')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Checklist, { ChecklistItem } from 'frui/fields/Checklist';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Checklist accepts all props of a standard HTML input 
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
                Checklist wraps the HTML standard <code 
                  className="text-sm text-t2"
                >{'`<input />`'}</code> element. Therefore, you can 
                use any input attributes as props.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
              <Checklist name="Options" >
                <ChecklistItem label="Option 1" value="option1" />
                <ChecklistItem label="Option 2" value="option2" />
                <ChecklistItem label="Option 3" value="option3" />
              </Checklist>
              </div>
              <Code language="typescript">
                {examples[0]}
              </Code>
            </div>

            <h2 id="default" className="uppercase font-bold text-lg mt-8">
              {_('Default Value')}
            </h2>
            <p className="py-4">
              <Translate>
                You can set the default selected value, using: <C value="defaultValue={['default1', 'default2']}" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Defaults" defaultValue={["default1", "default2"]}>
                  <ChecklistItem label="Default 1" value="default1" />
                  <ChecklistItem label="Default 2" value="default2" />
                  <ChecklistItem label="Default 3" value="default3" />
                </Checklist>
              </div>
              <Code language="typescript">
              {examples[1]}
              </Code>
            </div>

            <p className="py-4">
              <Translate>
              You can set a checkbox as the default selected value: <C value="defaultChecked" />.
              </Translate>
            </p>

            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Checked">
                  <ChecklistItem label="Checked 1" value="checked1" defaultChecked />
                  <ChecklistItem label="Checked 2" value="checked2" />
                  <ChecklistItem label="Checked 3" value="checked3" />
                </Checklist>
              </div>
              <Code language="typescript">
              {examples[2]}
              </Code>
            </div>

            <h2 id="orientation" className="uppercase font-bold text-lg mt-8">
              {_('Orientation')}
            </h2>

            <h3 className="font-semibold text-md mt-8">
              {_('Row')}
            </h3>
            <p className="py-4">
              <Translate>
                To change the checklist layout to horizontal (default), use: <C value="orientation='row'" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Rows" orientation="row">
                  <ChecklistItem label="Row 1" value="row1" />
                  <ChecklistItem label="Row 2" value="row2" />
                  <ChecklistItem label="Row 3" value="row3" />
                </Checklist>
              </div>
              <Code language="typescript">
              {examples[3]}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Column')}
            </h3>
            <p className="py-4">
              <Translate>
              To change the checklist layout to vertical, use: <C value="orientation='column'" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Columns" orientation="column">
                  <ChecklistItem label="Column 1" value="column1" />
                  <ChecklistItem label="Column 2" value="column2" />
                  <ChecklistItem label="Column 3" value="column3" />
                </Checklist>
              </div>
              <Code language="typescript">
              {examples[4]}
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
                <Checklist name="Update" onUpdate={(value, checked) => alert(`${value} - ${checked}`)}>
                  <ChecklistItem label="Update 1" value="update1" />
                  <ChecklistItem label="Update 2" value="update2" />
                  <ChecklistItem label="Update 3" value="update3" />
                </Checklist>
              </div>
              <Code language="typescript">
                {examples[5]}
              </Code>
            </div>
            <p className="py-4">
              <Translate>
                <C value="onChange" r /> 
                handles changes whenever a user selects or unselects an item.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Events" onChange={setSelected}>
                  <ChecklistItem label="Event 1" value="event1" />
                  <ChecklistItem label="Event 2" value="event2" />
                  <ChecklistItem label="Event 3" value="event3" />
                </Checklist>
              </div>
              <div className="flex items-center justify-center p-1 bg-b1">
              <p className="text-sm">Selected: {selected?.join(", ") || "None"}</p>
              </div>
              <Code language="typescript">
                {examples[6]}
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

            <h2 id="disabled" className="uppercase font-bold text-lg mt-8">
              {_('Disabled')}
            </h2>
            <p className="py-4">
              <Translate>
                You can disable the checklist, preventing them from being selected: <C value="disabled" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Disabled" disabled>
                  <ChecklistItem label="Disabled 1" value="disabled1" />
                  <ChecklistItem label="Disabled 2" value="disabled2" />
                  <ChecklistItem label="Disabled 3" value="disabled3" />
                </Checklist>
              </div>
              <Code language="typescript">
                {examples[7]}
              </Code>
            </div>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the Checklist field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Errors" defaultValue={["error1"]} error>
                  <ChecklistItem label="Error 1" value="error1" />
                  <ChecklistItem label="Error 2" value="error2" />
                  <ChecklistItem label="Error 3" value="error3" />
                </Checklist>
              </div>
              <Code language="typescript">
                {examples[8]}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>

            <h3 className="font-semibold text-md mt-8">
              {_('Colors')}
            </h3>

            <p className="py-4">
              <Translate>
                You can change the color of the checklist using: <C value="color='green'" /> or <C value="color='#00FF00'" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="Colors" defaultValue={["color1"]} color="green">
                  <ChecklistItem label="Color 1" value="color1" />
                  <ChecklistItem label="Color 2" value="color2" />
                  <ChecklistItem label="Color 3" value="color3" />
                </Checklist>
              </div>
              <Code language="typescript">
                {examples[9]}
              </Code>
            </div>

            <p className="py-4">
              <Translate>
                You may also change the individual color of the checkboxes:
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Checklist name="check-color" defaultValue={["gray", "green", "purple"]} >
                  <ChecklistItem label="Gray" value="gray" color="#333" />
                  <ChecklistItem label="Green" value="green" color="green" />
                  <ChecklistItem label="Purple" value="purple" color="purple" />
                </Checklist>
              </div>
              <Code language="typescript">
                {examples[10]}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/field/checkbox">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Checkbox')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/code-editor">
                {_('Code Editor')}
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
      uri="/field/checklist"
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
