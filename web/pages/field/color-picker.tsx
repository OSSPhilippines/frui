import type { Crumb } from 'modules/components/Crumbs';
import { useState } from 'react';
import { useLanguage } from 'r22n';
import Link from 'next/link';
import { Translate } from 'r22n';
import ColorPicker from 'frui/field/ColorPicker';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const examples = [
//0-------------------------------------------------------------------//
`<ColorPicker
  value={color}
  onChange={newRgbaColor => setColor(newRgbaColor)}
/>`,
//1-------------------------------------------------------------------//
`<ColorPicker
  defaultValue="rgba(245, 166, 35, 1)"
  onChange={newColor => console.log(newColor)}
/>`,
//2-------------------------------------------------------------------//
`<ColorPicker value={color} onChange={setColor} showAlpha={false} />

<ColorPicker value={color} onChange={setColor} showInputs={false} />

<ColorPicker
  value={color}
  onChange={setColor}
  swatches={['#FF6B6B', '#4ECDC4', 'rgba(69, 183, 209, 0.7)', '#F7B801', '#5F4B8B']}
/>

const defaultSwatches = ['#D0021B'];
<ColorPicker value={color} onChange={setColor} swatches={defaultSwatches} />
`,
//3-------------------------------------------------------------------//
`<ColorPicker value={color} onChange={setColor} lg text={false} />

<ColorPicker value={color} onChange={setColor} sm box={false} />

<ColorPicker value={color} onChange={setColor} pickerClassName="custom-popover" />

<ColorPicker
  value={color}
  onChange={setColor}
  pickerStyle={{ background: '#f0f0f0', width: '280px' }}
/>`,
//4-------------------------------------------------------------------//
`<form onSubmit={handleSubmit}>
  <ColorPicker 
    name="themeColor" 
    defaultValue="rgba(74, 144, 226, 1)"
    onUpdate={color => console.log('Color changed:', color)}
  />
  <button type="submit">Submit</button>
</form>

// Using with ref for imperative access
const colorRef = useRef<HTMLInputElement>(null);

<ColorPicker
  name="backgroundColor"
  passRef={colorRef}
  onUpdate={setSelectedColor}
/>`,
//5-------------------------------------------------------------------//
];

export default function ColorPickerDemoPage() {
  const { _ } = useLanguage();
  const [ pickerColor, setPickerColor ] = useState('rgba(74, 144, 226, 1)');
  const [ pickerColor2, setPickerColor2 ] = useState('rgba(255, 107, 107, 0.8)');

  const crumbs: Crumb[] = [
    { icon: 'palette', label: 'Fields', href: '/fields' },
    { label: 'Color Picker' }
  ];

  const propsData = [
    [ _('value'), _('string'), _('No'), _('Current color (hex, rgba). If undefined, component is uncontrolled.') ],
    [ _('defaultValue'), _('string'), _('No'), _('Initial color if `value` is undefined (uncontrolled).') ],
    [ _('onChange'), _('function'), _('No'), _('Callback `(color: string) => void` returning rgba string.') ],
    [ _('onUpdate'), _('function'), _('No'), _('Update callback `(color: string) => void` - like onChange but passes value directly.') ],
    [ _('name'), _('string'), _('No'), _('Used for form integration and react server components.') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Passes ref to the hidden input element for form integration.') ],
    [ _('showAlpha'), _('boolean'), _('No (true)'), _('Show alpha slider and input.') ],
    [ _('showInputs'), _('boolean'), _('No (true)'), _('Show RGBA input fields.') ],
    [ _('swatches'), _('string[]'), _('No'), _('Array of hex/rgba colors for swatches.') ],
    [ _('pickerStyle'), _('CSS Object'), _('No'), _('Custom CSS for the picker popover element.') ],
    [ _('pickerClassName'), _('string'), _('No'), _('Custom class name for the picker popover element.') ],
    [ _('className'), _('string'), _('No'), _('Class names for the main wrapper div.') ],
    [ _('style'), _('CSS Object'), _('No'), _('Inline styles for the main wrapper div.') ],
    [ _('box'), _('boolean'), _('No (true)'), _('Show color preview box in display.') ],
    [ _('text'), _('boolean'), _('No (true)'), _('Show color text value in display.') ],
    [ _('lg'), _('boolean'), _('No'), _('Use large size for display.') ],
    [ _('md'), _('boolean'), _('No'), _('Use medium size for display.') ],
    [ _('sm'), _('boolean'), _('No'), _('Use small size for display.') ],
  ];

  const defaultSwatches = [
    '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
    '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
    '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
    'rgba(0, 0, 255, 0.5)'
  ];

  return (
    <LayoutPanel
      uri="/fields/colorpicker"
      title="Color Picker Field"
      description="A field component allowing users to select colors via a popover palette, sliders, and inputs."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Color Picker')}</Link>
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
                <Link href="#uncontrolled" className="block pb-1 hover:text-link">
                  {_('Uncontrolled')}
                </Link>
              </li>
              <li>
                <Link href="#customization" className="block pb-1 hover:text-link">
                  {_('Customization')}
                </Link>
              </li>
              <li>
                <Link href="#layout" className="block pb-1 hover:text-link">
                  {_('Layout & Style')}
                </Link>
              </li>
              <li>
                <Link href="#form" className="block pb-1 hover:text-link">
                  {_('Form Integration')}
                </Link>
              </li>
            </ul>
          </aside>

          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
               <i className="fas fa-palette mr-2"></i> {_('Color Picker')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import ColorPicker from 'frui/field/ColorPicker';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Props')}
            </h2>
            <Props props={propsData} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Basic Usage (Controlled)')}
            </h2>
            <p className="py-2">
              <Translate>
                Provide <C value="value"/> and <C value="onChange"/> props 
                for a controlled component. The component expects hex or 
                rgba strings as input and outputs an rgba string.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <ColorPicker
                  value={pickerColor}
                  onChange={setPickerColor}
                />
                <span className='ml-4 text-sm'>
                  Selected: <C value={pickerColor} />
                </span>
              </div>
              <Code language="typescript">{examples[0]}</Code>
            </div>

            <h2 id="uncontrolled" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Uncontrolled Usage')}
            </h2>
            <p className="py-2">
              <Translate>
                Omit the <C value="value"/> prop to use the component in 
                uncontrolled mode. You can set an initial color 
                with <C value="defaultValue"/>. Use a <C value="ref"/> or 
                form submission to get the final value if needed, or 
                use <C value="onChange"/> just to react to changes.
              </Translate>
            </p>
            <div className="curved">
               <div className="flex items-center justify-center p-3 bg-b1">
                <ColorPicker
                  defaultValue="rgba(245, 166, 35, 1)"
                  onChange={(c) => console.log('Uncontrolled changed:', c)}
                />
                <span className='ml-4 text-sm'>
                  Default: <C value="rgba(245, 166, 35, 1)"/>
                </span>
              </div>
              <Code language="typescript">{examples[1]}</Code>
            </div>


            <h2 id="customization" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Customization')}
            </h2>
            <p className="py-2">
              <Translate>
                Customize the picker&apos;s features like alpha, inputs, 
                and swatches.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex flex-wrap items-center justify-center p-3 bg-b1 gap-4">
                <div>
                  <div className="text-xs text-center mb-1">No Alpha</div>
                  <ColorPicker
                    value={pickerColor2}
                    onChange={setPickerColor2}
                    showAlpha={false}
                  />
                </div>
                <div>
                  <div className="text-xs text-center mb-1">No Inputs</div>
                  <ColorPicker
                    value={pickerColor2}
                    onChange={setPickerColor2}
                    showInputs={false}
                  />
                </div>
                <div>
                  <div className="text-xs text-center mb-1">Custom Swatches</div>
                   <ColorPicker
                    value={pickerColor2}
                    onChange={setPickerColor2}
                    swatches={[
                      '#FF6B6B', 
                      '#4ECDC4', 
                      'rgba(69, 183, 209, 0.7)', 
                      '#F7B801', 
                      '#5F4B8B'
                    ]}
                  />
                </div>
                <div>
                  <div className="text-xs text-center mb-1">Default Swatches</div>
                   <ColorPicker
                    value={pickerColor}
                    onChange={setPickerColor}
                    swatches={defaultSwatches}
                  />
                </div>
              </div>
              <Code language="typescript">{examples[2]}</Code>
            </div>

            <h2 id="layout" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Layout & Style')}
            </h2>
            <p className="py-2">
              <Translate>
                Adjust the trigger display using <C value="sm"/>, <C value="md"/>, <C value="lg"/>, <C value="box={false}"/>, 
                or <C value="text={false}"/>.
                Use <C value="className"/> or <C value="style"/> for the 
                wrapper, and <C value="pickerClassName"/>, 
                or <C value="pickerStyle"/> for the popover.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex flex-wrap items-center justify-center p-3 bg-b1 gap-4">
                <div>
                  <div className="text-xs text-center mb-1">Large / No Text</div>
                  <ColorPicker value={pickerColor} onChange={setPickerColor} lg text={false} />
                </div>
                <div>
                   <div className="text-xs text-center mb-1">Small / No Box</div>
                  <ColorPicker value={pickerColor} onChange={setPickerColor} sm box={false} />
                </div>
                <div>
                  <div className="text-xs text-center mb-1">Custom Popover Class</div>
                  <ColorPicker
                    value={pickerColor}
                    onChange={setPickerColor}
                    pickerClassName="custom-popover-border"
                  />
                </div>
                <div>
                  <div className="text-xs text-center mb-1">Custom Popover Style</div>
                  <ColorPicker
                    value={pickerColor}
                    onChange={setPickerColor}
                    pickerStyle={{ background: '#f0f0f0', width: '280px' }}
                  />
                </div>
              </div>
              <Code language="typescript">{examples[3]}</Code>
            </div>

            <h2 id="form" className="uppercase font-bold text-lg mt-8 mb-2">
              {_('Form Integration')}
            </h2>
            <p className="py-2">
              <Translate>
                Use <C value="name"/> prop for form submission, <C value="onUpdate"/> 
                for value-based callbacks, and <C value="passRef"/> for imperative access.
                The component includes a hidden input that automatically gets the current color value.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex flex-wrap items-center justify-center p-3 bg-b1 gap-4">
                <div>
                  <div className="text-xs text-center mb-1">Form Field</div>
                  <ColorPicker 
                    name="formColor" 
                    defaultValue="rgba(74, 144, 226, 1)"
                    onUpdate={color => console.log('Form color:', color)}
                  />
                </div>
                <div>
                  <div className="text-xs text-center mb-1">With onUpdate</div>
                  <ColorPicker
                    defaultValue="rgba(255, 107, 107, 0.8)"
                    onUpdate={color => alert(`Selected: ${color}`)}
                  />
                </div>
              </div>
              <Code language="typescript">{examples[4]}</Code>
            </div>
            
            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2 hover:text-link" href="/fields/code-editor">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Code Editor')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2 hover:text-link" href="/fields/country">
                {_('Country')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}