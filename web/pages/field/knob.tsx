//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useState } from 'react';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import { LayoutPanel } from 'modules/theme';
import Table, { Tcol, Thead, Trow } from 'frui/element/Table';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';
import Knob from 'frui/field/Knob';

export default function Page() {
  const { _ } = useLanguage();
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Knob' },
  ];

  const [value, setValue] = useState(35);
  const [min, setMin] = useState(10);
  const [stepped, setStepped] = useState(40);
  const [customSize, setCustomSize] = useState(45);
  const [thickStroke, setThickStroke] = useState(60);
  const [colorful, setColorful] = useState(55);
  const [tracked, setTracked] = useState(35);

  const props = [
    [_('defaultValue'), _('number'), _('No'), _('Initial value for uncontrolled usage.')],
    [_('value'), _('number'), _('No'), _('Controlled value of the knob.')],
    [_('onChange'), _('function'), _('No'), _('Callback when value changes.')],
    [_('name'), _('string'), _('No'), _('Name for hidden input (for form submissions).')],
    [_('min'), _('number'), _('No'), _('Minimum value. Default is 0.')],
    [_('max'), _('number'), _('No'), _('Maximum value. Default is 100.')],
    [_('step'), _('number'), _('No'), _('Step size when adjusting. Default is 1.')],
    [_('size'), _('number'), _('No'), _('Size of the knob in pixels.')],
    [_('stroke'), _('number'), _('No'), _('Thickness of the knob stroke.')],
    [_('valueColor'), _('string'), _('No'), _('Color of the active stroke.')],
    [_('rangeColor'), _('string'), _('No'), _('Color of the background track.')],
    [_('textColor'), _('string'), _('No'), _('Color of the label text.')],
    [_('valueTemplate'), _('string'), _('No'), _('Template for displaying the value.')],
  ];

const codeBasic = `
  <Knob defaultValue={35} />
`.trim();

const codeMinMax = `
<Knob 
  value={min} 
  onChange={setMin} 
  min={10} 
  max={80} 
/>
`.trim();

const codeStep = `
<Knob 
  value={stepped} 
  onChange={setStepped} 
  step={10} 
/>
`.trim();

const codeSize = `
<Knob 
  value={customSize} 
  onChange={setCustomSize} 
  size={150} 
/>`.trim();

const codeStroke = `
<Knob 
  value={thickStroke} 
  onChange={setThickStroke} 
  stroke={15} 
/>`.trim();

const codeColor = `
<Knob 
  value={colorful} 
  onChange={setColorful} 
  valueColor="#e91e63" 
  textColor="#e91e63" 
/>`.trim();

const codeTrack = `
<Knob 
  value={tracked} 
  onChange={setTracked} 
  rangeColor="#ccc" 
  valueColor="#4caf50" 
/>`.trim();

const codeValue = `
<Knob 
  value={value} 
  onChange={setValue} 
  valueTemplate="{}%" 
  textColor="#333" 
/>`.trim();

  return (
    <LayoutPanel
      uri="/field/knob"
      title="Knob Component"
      description="Knobs are circular input controls for numeric values."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Knob</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1"><Link href="#props">{_('Props')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#basic">{_('Basic')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#events">{_('Events')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#minmax">{_('Min/Max')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#step">{_('Step')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#size">{_('Size')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#stroke">{_('Stroke')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#color">{_('Color')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#track">{_('Track')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#value">{_('Value')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#styles">{_('Custom Styles')}</Link></li>
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
              <div className="flex items-center justify-center p-6 bg-b1">
                <Knob defaultValue={35} />
              </div>
              <Code language="tsx">{codeBasic}</Code>
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

            <h2 id="minmax" className="uppercase font-bold text-lg mt-8">
              {_('Min/Max')}
            </h2>
            <p className="py-4">
              <Translate>
                To use the min/max, pass a value for <C value="min" r /> and an <C value="max" r />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-6 bg-b1">
              <Knob value={min} onChange={setMin} min={10} max={80} />
              </div>
              <Code language="tsx">{codeMinMax}</Code>
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
              <div className="flex items-center justify-center p-6 bg-b1">
              <Knob value={stepped} onChange={setStepped} step={10} />
              </div>
              <Code language="tsx">{codeStep}</Code>
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
              <div className="flex items-center justify-center p-6 bg-b1">
               <Knob value={customSize} onChange={setCustomSize} size={150} />
              </div>
              <Code language="tsx">{codeSize}</Code>
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
              <div className="flex items-center justify-center p-6 bg-b1">
                <Knob value={thickStroke} onChange={setThickStroke} stroke={15} />
              </div>
              <Code language="tsx">{codeStroke}</Code>
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
              <div className="flex items-center justify-center p-6 bg-b1">
                  <Knob
                    value={colorful}
                    onChange={setColorful}
                    valueColor="#e91e63"
                    textColor="#e91e63"
                  />
              </div>
              <Code language="tsx">{codeColor}</Code>
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
              <div className="flex items-center justify-center p-6 bg-b1">
                <Knob
                  value={tracked}
                  onChange={setTracked}
                  rangeColor="#ccc"
                  valueColor="#4caf50"
                />
              </div>
              <Code language="tsx">{codeTrack}</Code>
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
              <div className="flex items-center justify-center p-6 bg-b1">
                <Knob
                  value={value}
                  onChange={setValue}
                  valueTemplate="{}%"
                  textColor="#333"
                />
              </div>
              <Code language="tsx">{codeValue}</Code>
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

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/input">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Input')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/markdown">
                {_('Markdown')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}

