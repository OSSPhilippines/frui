import type { Crumb } from 'modules/components/Crumbs';
import { useState } from 'react';
import { useLanguage } from 'r22n';
import Link from 'next/link';
import { Translate } from 'r22n';
import RangeSlider from 'frui/field/RangeSlider';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const examples = [
//0-------------------------------------------------------------------//
`<RangeSlider
  name="volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
  tooltip
/>`,
//1-------------------------------------------------------------------//
`<RangeSlider
  name="priceRange"
  value={priceRange}
  onChange={setPriceRange}
  min={0}
  max={1000}
  step={10}
  range
  tooltip
  tooltipFormatter={(val) => \`$\${val}\`}
/>`,
//2-------------------------------------------------------------------//
`<RangeSlider
  name="temperature"
  defaultValue={50}
  min={0}
  max={100}
  vertical
  tooltip
  tooltipFormatter={(val) => \`\${val}°C\`}
  marks={{
    0: 'Cold',
    25: 'Cool',
    50: 'Warm',
    75: 'Hot',
    100: 'Very Hot'
  }}
/>`,
//3-------------------------------------------------------------------//
`<RangeSlider
  name="brightness"
  value={brightness}
  onChange={setBrightness}
  min={0}
  max={100}
  trackColor="#ff6b6b"
  railColor="#e9ecef"
  handleColor="#ffffff"
  tooltip
  marks={{ 0: '🌑', 50: '🌗', 100: '🌕' }}
/>`,
];

export default function RangeSliderDemoPage() {
  const { _ } = useLanguage();
  const [volume, setVolume] = useState(25);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 600]);
  const [brightness, setBrightness] = useState(60);

  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Range Slider' }
  ];

  const propsData = [
    [ _('name'), _('string'), _('No'), _('Form field name for submission.') ],
    [ _('value'), _('number | [number, number]'), _('No'), _('Current value(s). If undefined, component is uncontrolled.') ],
    [ _('defaultValue'), _('number | [number, number]'), _('No'), _('Initial value(s) if \`value\` is undefined (uncontrolled).') ],
    [ _('onChange'), _('function'), _('No'), _('Callback \`(value: number | [number, number]) => void\`.') ],
    [ _('min'), _('number'), _('No (0)'), _('Minimum value.') ],
    [ _('max'), _('number'), _('No (100)'), _('Maximum value.') ],
    [ _('step'), _('number'), _('No (1)'), _('Step increment for values.') ],
    [ _('range'), _('boolean'), _('No (false)'), _('Enable dual-handle range selection.') ],
    [ _('vertical'), _('boolean'), _('No (false)'), _('Vertical orientation.') ],
    [ _('disabled'), _('boolean'), _('No (false)'), _('Disable interaction.') ],
    [ _('tooltip'), _('boolean'), _('No (false)'), _('Show value tooltips on hover/drag.') ],
    [ _('tooltipFormatter'), _('function'), _('No'), _('Custom tooltip format function.') ],
    [ _('marks'), _('object'), _('No'), _('Object with value:label pairs for marks.') ],
    [ _('trackColor'), _('string'), _('No (#1890ff)'), _('Color of the filled track.') ],
    [ _('railColor'), _('string'), _('No (#f5f5f5)'), _('Color of the background rail.') ],
    [ _('handleColor'), _('string'), _('No (#fff)'), _('Color of the drag handles.') ],
    [ _('className'), _('string'), _('No'), _('CSS class names.') ],
    [ _('style'), _('CSS Object'), _('No'), _('Inline styles.') ],
  ];

  return (
    <LayoutPanel
      uri="/field/range-slider"
      title="Range Slider Field"
      description="A field component for selecting single values or ranges with smooth drag interaction."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Range Slider')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li>
                <Link href="#props" className="block pb-1 hover:text-link">
                  {_('Props')}
                </Link>
              </li>
              <li>
                <Link href="#basic" className="block pb-1 hover:text-link">
                  {_('Basic Usage')}
                </Link>
              </li>
              <li>
                <Link href="#range" className="block pb-1 hover:text-link">
                  {_('Range Selection')}
                </Link>
              </li>
              <li>
                <Link href="#vertical" className="block pb-1 hover:text-link">
                  {_('Vertical')}
                </Link>
              </li>
              <li>
                <Link href="#custom" className="block pb-1 hover:text-link">
                  {_('Customization')}
                </Link>
              </li>
            </ul>
          </aside>

          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
               <i className="fas fa-sliders-h mr-2"></i> {_('Range Slider')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import RangeSlider from 'frui/field/RangeSlider';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Props')}
            </h2>
            <Props props={propsData} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Basic Usage (Single Value)')}
            </h2>
            <p className="py-2">
              <Translate>
                Use a single-value slider for simple numeric input with 
                visual feedback. The <C value="tooltip"/> prop shows the 
                current value on hover.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-md">
                  <RangeSlider
                    name="volume"
                    value={volume}
                    onChange={(val) => setVolume(val as number)}
                    min={0}
                    max={100}
                    tooltip
                  />
                  <div className="mt-2 text-center">
                    Volume: <strong>{volume}</strong>
                  </div>
                </div>
              </div>
              <Code language="typescript">{examples[0]}</Code>
            </div>

            <h2 id="range" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Range Selection')}
            </h2>
            <p className="py-2">
              <Translate>
                Enable dual-handle range selection with <C value="range={true}"/>. 
                Perfect for price ranges, date ranges, or any min/max selection.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-md">
                  <RangeSlider
                    name="priceRange"
                    value={priceRange}
                    onChange={(val) => setPriceRange(val as [number, number])}
                    min={0}
                    max={1000}
                    step={1}
                    range
                    tooltip
                    tooltipFormatter={(val) => `$${val}`}
                  />
                  <div className="mt-2 text-center">
                    Price Range: <strong>${priceRange[0]} - ${priceRange[1]}</strong>
                  </div>
                </div>
              </div>
              <Code language="typescript">{examples[1]}</Code>
            </div>

            <h2 id="vertical" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Vertical Orientation')}
            </h2>
            <p className="py-2">
              <Translate>
                Use <C value="vertical={true}"/> for vertical sliders. 
                Great for volume controls, temperature gauges, or space-constrained layouts.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div style={{ height: '250px' }} className="flex items-center justify-center">
                  <RangeSlider
                    name="temperature"
                    defaultValue={50}
                    min={0}
                    max={100}
                    vertical
                    tooltip
                    tooltipFormatter={(val) => `${val}°C`}
                    marks={{
                      0: 'Cold',
                      25: 'Cool',
                      50: 'Warm',
                      75: 'Hot',
                      100: 'Very Hot'
                    }}
                  />
                </div>
              </div>
              <Code language="typescript">{examples[2]}</Code>
            </div>

            <h2 id="custom" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Customization')}
            </h2>
            <p className="py-2">
              <Translate>
                Customize colors, add marks, and format tooltips to match your design.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-6 bg-b1">
                <div className="w-full max-w-md">
                  <RangeSlider
                    name="brightness"
                    value={brightness}
                    onChange={(val) => setBrightness(val as number)}
                    min={0}
                    max={100}
                    trackColor="#ff6b6b"
                    railColor="#e9ecef"
                    handleColor="#ffffff"
                    tooltip
                    marks={{ 0: '🌑', 50: '🌗', 100: '🌕' }}
                  />
                  <div className="mt-2 text-center">
                    Brightness: <strong>{brightness}%</strong>
                  </div>
                </div>
              </div>
              <Code language="typescript">{examples[3]}</Code>
            </div>

            <h2 className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Form Integration')}
            </h2>
            <p className="py-2">
              <Translate>
                RangeSlider works seamlessly with HTML forms using hidden inputs 
                when the <C value="name"/> prop is provided.
              </Translate>
            </p>
            <div className="curved">
              <div className="p-6 bg-b1">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target as HTMLFormElement);
                  alert(`Form Data: ${JSON.stringify(Object.fromEntries(data.entries()))}`);
                }}>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Volume Control:</label>
                    <RangeSlider
                      name="formVolume"
                      defaultValue={75}
                      min={0}
                      max={100}
                      tooltip
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold">Budget Range:</label>
                    <RangeSlider
                      name="formBudget"
                      defaultValue={[200, 800]}
                      min={0}
                      max={1000}
                      step={50}
                      range
                      tooltip
                      tooltipFormatter={(val) => `$${val}`}
                    />
                  </div>
                  
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Submit Form
                  </button>
                </form>
              </div>
              <Code language="typescript">
{`<form onSubmit={handleSubmit}>
  <RangeSlider 
    name="volume" 
    defaultValue={75} 
    tooltip 
  />
  <RangeSlider 
    name="budget" 
    defaultValue={[200, 800]} 
    range 
    tooltip 
  />
  <button type="submit">Submit</button>
</form>`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2 hover:text-link" href="/field/rating">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Rating')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2 hover:text-link" href="/field/select">
                {_('Select')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
