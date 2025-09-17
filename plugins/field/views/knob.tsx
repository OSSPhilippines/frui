import { useLanguage, Translate } from 'r22n';
import { useState } from 'react';

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

import Knob from 'components/field/Knob.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Knob' }
];

const props = [
  [ 'defaultValue', 'number', 'No', 'Initial value for uncontrolled usage.' ],
  [ 'value', 'number', 'No', 'Controlled value of the knob.' ],
  [ 'onChange', 'function', 'No', 'Callback when value changes.' ],
  [ 'name', 'string', 'No', 'Name for hidden input (for form submissions).' ],
  [ 'min', 'number', 'No', 'Minimum value. Default is 0.' ],
  [ 'max', 'number', 'No', 'Maximum value. Default is 100.' ],
  [ 'step', 'number', 'No', 'Step size when adjusting. Default is 1.' ],
  [ 'size', 'number', 'No', 'Size of the knob in pixels.' ],
  ['stroke', 'number', 'No', 'Thickness of the knob stroke.' ],
  [ 'valueColor', 'string', 'No', 'Color of the active stroke.' ],
  [ 'rangeColor', 'string', 'No', 'Color of the background track.' ],
  [ 'textColor', 'string', 'No', 'Color of the label text.' ],
  [ 'valueTemplate', 'string', 'No', 'Template for displaying the value.' ]
];

const examples = [
//0
`<Knob defaultValue={35} />`,
//1
`<Knob 
  value={min} 
  onChange={setMin} 
  min={10} 
  max={80} 
/>`,
//2
`<Knob 
  value={stepped} 
  onChange={setStepped} 
  step={10} 
/>`,
//3
`<Knob 
  value={customSize} 
  onChange={setCustomSize} 
  size={150} 
/>`,
//4
`<Knob 
  value={thickStroke} 
  onChange={setThickStroke} 
  stroke={15} 
/>`,
//5
`<Knob 
  value={colorful} 
  onChange={setColorful} 
  valueColor="#e91e63" 
  textColor="#e91e63" 
/>`,
//6
`<Knob 
  value={tracked} 
  onChange={setTracked} 
  rangeColor="#ccc" 
  valueColor="#4caf50" 
/>`,
//7
`<Knob 
  value={value} 
  onChange={setValue} 
  valueTemplate="{}%" 
  textColor="#333" 
/>`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  const [ value, setValue ] = useState(35);
  const [ min, setMin ] = useState(10);
  const [ stepped, setStepped ] = useState(40);
  const [ customSize, setCustomSize ] = useState(45);
  const [ thickStroke, setThickStroke ] = useState(60);
  const [ colorful, setColorful ] = useState(55);
  const [ tracked, setTracked ] = useState(35);
  //render
  return (
    <LayoutPanel pathname="/field/knob">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase font-semibold">
              <a href="#top">{_('Contents')}</a>
            </h4>
            <div className="p-3">
              <a className="block pb-1" href="#top">Knob</a>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1"><a href="#props">{_('Props')}</a></li>
                <li className="pl-3 pb-1"><a href="#basic">{_('Basic')}</a></li>
                <li className="pl-3 pb-1"><a href="#events">{_('Events')}</a></li>
                <li className="pl-3 pb-1"><a href="#minmax">{_('Min/Max')}</a></li>
                <li className="pl-3 pb-1"><a href="#step">{_('Step')}</a></li>
                <li className="pl-3 pb-1"><a href="#size">{_('Size')}</a></li>
                <li className="pl-3 pb-1"><a href="#stroke">{_('Stroke')}</a></li>
                <li className="pl-3 pb-1"><a href="#color">{_('Color')}</a></li>
                <li className="pl-3 pb-1"><a href="#track">{_('Track')}</a></li>
                <li className="pl-3 pb-1"><a href="#value">{_('Value')}</a></li>
                <li className="pl-3 pb-1"><a href="#styles">{_('Custom Styles')}</a></li>
              </ul>
            </div>
          </aside>

          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Knob')}
            </h1>

            <Code language="typescript" className="mt-2">
              {`import Knob from 'frui/field/Knob';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basic')}
            </h2>
            <p className="py-4">
              <Translate>
                To use the knob, pass a <C value="value" r /> and an <C value="onChange" r /> callback.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
                <Knob defaultValue={35} />
              </div>
              <Code language="tsx">{examples[0]}</Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
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

            <h2 id="minmax" className="uppercase font-bold text-lg mt-8">
              {_('Min/Max')}
            </h2>
            <p className="py-4">
              <Translate>
                To use the min/max, pass a value for <C value="min" r /> and an <C value="max" r />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
              <Knob value={min} onChange={setMin} min={10} max={80} />
              </div>
              <Code language="tsx">{examples[1]}</Code>
            </div>

            <h2 id="step" className="uppercase font-bold text-lg mt-8">
              {_('Step')}
            </h2>
            <p className="py-4">
              <Translate>
                The size of the step is defined by the <C value="step" r /> property.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
              <Knob value={stepped} onChange={setStepped} step={10} />
              </div>
              <Code language="tsx">{examples[2]}</Code>
            </div>

            <h2 id="size" className="uppercase font-bold text-lg mt-8">
              {_('Size')}
            </h2>
            <p className="py-4">
              <Translate>
                To change the size of the knob component,
                pass a value for <C value="step" r />
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
               <Knob value={customSize} onChange={setCustomSize} size={150} />
              </div>
              <Code language="tsx">{examples[3]}</Code>
            </div>

            <h2 id="stroke" className="uppercase font-bold text-lg mt-8">
              {_('Stroke')}
            </h2>
            <p className="py-4">
              <Translate>
                To change thickness of stroke, pass a value for <C value="stroke" r />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
                <Knob value={thickStroke} onChange={setThickStroke} stroke={15} />
              </div>
              <Code language="tsx">{examples[4]}</Code>
            </div>

            <h2 id="color" className="uppercase font-bold text-lg mt-8">
              {_('Color')}
            </h2>
            <p className="py-4">
              <Translate>
                To change color of the value, pass a value for <C value="valueColor" r />.
                For the text color, pass a value to <C value="textColor" r />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
                  <Knob
                    value={colorful}
                    onChange={setColorful}
                    valueColor="#e91e63"
                    textColor="#e91e63"
                  />
              </div>
              <Code language="tsx">{examples[5]}</Code>
            </div>

            <h2 id="track" className="uppercase font-bold text-lg mt-8">
              {_('Track')}
            </h2>
            <p className="py-4">
              <Translate>
                To change color for the range, pass a value for <C value="rangeColor" r />.
                For the value, pass a value for <C value="valueColor" r />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
                <Knob
                  value={tracked}
                  onChange={setTracked}
                  rangeColor="#ccc"
                  valueColor="#4caf50"
                />
              </div>
              <Code language="tsx">{examples[6]}</Code>
            </div>

            <h2 id="value" className="uppercase font-bold text-lg mt-8">
              {_('Value')}
            </h2>
            <p className="py-4">
              <Translate>
                To change the label, pass a value for <C value="valueTemplate" r />
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 theme-bg-1">
                <Knob
                  value={value}
                  onChange={setValue}
                  valueTemplate="{}%"
                  textColor="#333"
                />
              </div>
              <Code language="tsx">{examples[7]}</Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to knob
                or use the <C l value="frui-field-knob" /> CSS class. 
              </Translate>
            </p>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/field/input">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Input')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/markdown">
                {_('Markdown')}
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
      uri="/field/knob"
      title="Knob Component"
      description="Knobs are circular input controls for numeric values."
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
