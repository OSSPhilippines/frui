//--------------------------------------------------------------------//
// Imports

//modules
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import Select from 'components/field/Select.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const props = [
  //select props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'display', 'string|CSS Object|ClassStyleProps', 'No', 'Slot style to apply to the select display' ],
    [ 'dropdown', 'string|CSS Object|ClassStyleProps', 'No', 'Slot style to apply to the select dropdown' ],
    [ 'error', 'string|boolean', 'No', 'Any error message' ],
    [ 'multiple', 'boolean', 'No', 'Allow multiple selections' ],
    [ 'name', 'string', 'No', 'Used for react server components.' ],
    [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
    [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
    [ 'option', 'string|Function', 'No', 'Slot style to apply to the select options' ],
    [ 'options', 'string[]', 'No', 'List of select options.' ],
    [ 'placeholder', 'string', 'No', 'Display text when no value set' ]
  ],
  //select display props
  [
    [ 'bottom', 'boolean', 'No', 'Display the dropdown below the field' ],
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'left', 'boolean', 'No', 'Display the dropdown to the left' ],
    [ 'onOpen', 'Function', 'No', 'Dropdown open/close event handler' ],
    [ 'right', 'boolean', 'No', 'Display the dropdown to the right' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
    [ 'top', 'boolean', 'No', 'Display the dropdown above the field' ]
  ],
  //select placeholder props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS object' ]
  ],
  //select dropdown props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'position', '[number, number]', 'No', 'X/Y position of the dropdown' ],
    [ 'ref', 'Ref<HTMLDivElement>', 'No', 'Reference to the dropdown element' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS object' ]
  ],
  //select dropdown head props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS object' ]
  ],
  //select dropdown foot props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS object' ]
  ],
  //select option props
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
    [ 'value', 'string', 'Yes', 'Value of the option' ]
  ]
];

const examples = [
//0
`<Select>
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//1
`<Select options={[
  { label: 'Foo', value: 'foo', keyword: 'foo' },
  { label: 'Bar', value: 'bar', keyword: 'bar' }
]} />`,
//2
`<Select multiple>
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//3
`<Select multiple>
  <Select.Option 
    className={({ active }) => active 
      ? 'theme-bg-success px-p-2-8-2-8 px-mr-4 theme-white' 
      : 'px-p-2-8-2-8 px-m-4-8-4-8'
    } 
    value="foo"
  >
    {({ active }) => active ? 'Foo Active' : 'Foo'}
  </Select.Option>
  <Select.Option 
    className={({ active }) => active 
      ? 'theme-bg-success px-p-2-8-2-8 px-mr-4 theme-white' 
      : 'px-p-2-8-2-8 px-m-4-8-4-8'
    } 
    value="bar"
  >
    {({ active }) => active ? 'Bar Active' : 'Bar'}
  </Select.Option>
</Select>`,
//4
`<Select option="px-p-2-8-2-8">
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//5
`<Select 
  multiple
  option={({ active }) => active 
    ? 'theme-bg-3 px-p-2-8-2-8 px-mr-4 theme-white' 
    : 'px-p-2-8-2-8 px-m-4-8-4-8'
  } 
>
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//6
`<Select option="px-p-2-8-2-8" placeholder="Select an option!">
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//7
`<Select option="px-p-2-8-2-8">
  <Select.Placeholder className="theme-muted flex items-center">
    <i className="fas fa-circle-info mr-2"></i>
    <span>Select an option</span>
  </Select.Placeholder>
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//8
`<Select option="px-p-2-8-2-8">
  <Select.Head className="theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
    Header Content
  </Select.Head>
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
  <Select.Foot className="theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
    Footer Content
  </Select.Foot>
</Select>`,
//9
`const defaultOptions = [
  { label: 'Foo', value: 'foo', keyword: 'foo' },
  { label: 'Bar', value: 'bar', keyword: 'bar' }
];
const [ options, setOptions ] = useState(defaultOptions);
const filter = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const keyword = form.elements.namedItem('keyword') as HTMLInputElement;
  const filtered = defaultOptions.filter(option =>
    option.label.toLowerCase().includes(keyword.value.toLowerCase())
  );
  setOptions(filtered);
  return false;
};
return (
  <Select name="select-search" option="px-p-2-8-2-8" options={options}>
    <Select.Head className="px-px-8">
      <form 
        className="flex items-center border theme-bc-3"
        onSubmit={filter}
      >
        <input 
          className="border-0 flex-grow px-3 py-2 outline-none"
          type="text" 
          name="keyword"
          placeholder="Search..."  
        />
        <button className="px-3 py-2">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </Select.Head>
  </Select>
);`,
//10
`<Select top>
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//11
`<Select error value="foo" option="px-p-2-8-2-8">
  <Select.Option value="foo">Foo</Select.Option>
  <Select.Option value="bar">Bar</Select.Option>
</Select>`,
//12
`<Select option="px-p-2-8-2-8">
  <Select.Option value="US">🇺🇸 United States</Select.Option>
  <Select.Option value="PH">🇵🇭 Philippines</Select.Option>
</Select>`,
//13
`<Select option="px-p-2-8-2-8">
  <Select.Option value="product-1">
    <div className="flex items-start mb-3">
      <img width="70" src="https://m.media-amazon.com/images/I/81swjZCbdiL._AC_SL100_.jpg" />
      <div className="ml-3">
        <h3 className="font-semibold">
          KODAK PIXPRO FZ55-BK 16MP Digital Camera with 5X 
          Optical Zoom & 1080P Full HD Video
        </h3>
        <div className="mt-2">$299.99</div>
      </div>
    </div>
  </Select.Option>
  <Select.Option value="product-2">
    <div className="flex items-start">
      <img width="70" src="https://m.media-amazon.com/images/I/714hINuPoBL._AC_SL100_.jpg" />
      <div className="ml-3">
        <h3 className="font-semibold">
          Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | 
          Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ 
          Image Processor HD Videos
        </h3>
        <div className="mt-2">$999.99</div>
      </div>
    </div>
  </Select.Option>
</Select>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="rectangle-list" href="/field">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Select</Bread.Crumb>
    </Bread>
  );
};

/**
 * Aside right menu component
 */
export function Menu() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <aside className={
      'hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 '
      + 'border-l theme-bc-1 text-sm'
    }>
      <h4 className={
        'p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase '
        + 'font-semibold'
      }>
        {_('Contents')}
      </h4>
      <div className="p-3">
        <a className="block pb-1 font-bold" href="#top">
          {_('Select')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basics">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#multiple">{_('Multiple Selection')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#active">{_('Active States')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#option">{_('Option Slot')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#placeholder">{_('Dropdown Placeholder')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#header">{_('Dropdown Header/Footer')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#direction">{_('Dropdown Direction')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#events">{_('Events')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#errors">{_('Errors')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styles">{_('Global Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Examples component
 */
export function Examples() {
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Basic Example */}
      <Preview 
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Select>
            <Select.Option className="px-p-2-8-2-8" value="foo">Foo</Select.Option>
            <Select.Option className="px-p-2-8-2-8" value="bar">Bar</Select.Option>
          </Select>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Country Example */}
      <Preview 
        title="Country Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Select option="px-p-2-8-2-8">
            <Select.Option value="US">🇺🇸 United States</Select.Option>
            <Select.Option value="PH">🇵🇭 Philippines</Select.Option>
          </Select>
        </Preview.Example>
        <Preview.Code>{examples[12]}</Preview.Code>
      </Preview>
      {/* Products Example */}
      <Preview 
        title="Products Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Select option="px-p-2-8-2-8">
            <Select.Option value="product-1">
              <div className="flex items-start mb-3">
                <img width="70" src="https://m.media-amazon.com/images/I/81swjZCbdiL._AC_SL100_.jpg" />
                <div className="ml-3">
                  <h3 className="font-semibold">
                    KODAK PIXPRO FZ55-BK 16MP Digital Camera with 5X 
                    Optical Zoom & 1080P Full HD Video
                  </h3>
                  <div className="mt-2">$299.99</div>
                </div>
              </div>
            </Select.Option>
            <Select.Option value="product-2">
              <div className="flex items-start">
                <img width="70" src="https://m.media-amazon.com/images/I/714hINuPoBL._AC_SL100_.jpg" />
                <div className="ml-3">
                  <h3 className="font-semibold">
                    Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | 
                    Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ 
                    Image Processor HD Videos
                  </h3>
                  <div className="mt-2">$999.99</div>
                </div>
              </div>
            </Select.Option>
          </Select>
        </Preview.Example>
        <Preview.Code>{examples[13]}</Preview.Code>
      </Preview>
    </div>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  const defaultOptions = [
    { label: 'Foo', value: 'foo', keyword: 'foo' },
    { label: 'Bar', value: 'bar', keyword: 'bar' }
  ];
  const [ options, setOptions ] = useState(defaultOptions);
  const filter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const keyword = form.elements.namedItem('keyword') as HTMLInputElement;
    const filtered = defaultOptions.filter(option =>
      option.label.toLowerCase().includes(keyword.value.toLowerCase())
    );
    setOptions(filtered);
    return false;
  };
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Select')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the select field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Select from 'frui/field/Select';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div className="relative z-[101]">
        <Examples />
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="relative z-[100]">
        <p className="py-4">
          <Translate>
            The following is a basic example of a 
            <C l value="Select" /> field.
          </Translate>
        </p>

        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <Select>
              <Select.Option className="px-p-2-8-2-8" value="foo">Foo</Select.Option>
              <Select.Option className="px-p-2-8-2-8" value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            You can also express options as an array of objects like 
            the following example.
          </Translate>
        </p>
        <Preview 
          title="Using Data Options" 
          className="border border-2 theme-bc-3 relative z-[99]"
        >
          <Preview.Example center padding>
            <Select options={[
              { label: 'Foo', value: 'foo' },
              { label: 'Bar', value: 'bar' }
            ]} />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="multiple" className="uppercase font-bold text-lg mt-8">
        {_('Multiple Selection')}
      </h2>
      <div className="relative z-[99]">
        <p className="py-4">
          <Translate>
            You can use the <C value="multiple" /> prop to allow
            multiple selections.
          </Translate>
        </p>
        <Preview 
          title="Multiple Selections" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Select 
              multiple
              option={({ active }) => active 
                ? 'theme-bg-3 px-p-2-8-2-8 px-mr-4 theme-white' 
                : 'px-p-2-8-2-8 px-m-4-8-4-8'
              } 
            >
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="states" className="uppercase font-bold text-lg mt-8">
        {_('Active States')}
      </h2>
      <div className="relative z-[98]">
        <p className="py-4">
          <Translate>
            You can pass a function to the <C value="className" />, 
            and <C value="style" /> prop that passes the active state 
            per option. Children can also be a function that
            receives the active state.
          </Translate>
        </p>
        <Preview 
          title="Active State Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Select 
              name="active-state"
              multiple
              option={({ active }) => active 
                ? 'theme-bg-success px-p-2-8-2-8 px-mr-4 theme-white' 
                : 'px-p-2-8-2-8 px-m-4-8-4-8'
              } 
            >
              <Select.Option value="foo">
                {({ active }) => active ? 'Foo Active' : 'Foo'}
              </Select.Option>
              <Select.Option value="bar">
                {({ active }) => active ? 'Bar Active' : 'Bar'}
              </Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="option" className="uppercase font-bold text-lg mt-8">
        {_('Option Slot')}
      </h2>
      <div className="relative z-[97]">
        <p className="py-4">
          <Translate>
            You can pass a custom class/style or both to each option 
            using the <C value="option" /> prop.
          </Translate>
        </p>
        <Preview 
          title="Option Styles" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <Select option="px-p-2-8-2-8">
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[4]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            Option slots can also be a function that receives the 
            active state.
          </Translate>
        </p>
        <Preview 
          title="Active State Option Prop" 
          className="border border-2 theme-bc-3 relative z-[99]"
        >
          <Preview.Example center padding>
            <Select 
              multiple
              option={({ active }) => active 
                ? 'theme-bg-3 px-p-2-8-2-8 px-mr-4 theme-white' 
                : 'px-p-2-8-2-8 px-m-4-8-4-8'
              } 
            >
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[5]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="placeholder" className="uppercase font-bold text-lg mt-8">
        {_('Dropdown Placeholder')}
      </h2>
      <div className="relative z-[96]">
        <p className="py-4">
          <Translate>
            You can use the <C value="placeholder" /> prop to set
            the display text when no value has been selected.
          </Translate>
        </p>
        <Preview 
          title="Placeholder Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <Select option="px-p-2-8-2-8" placeholder="Select an option!">
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[6]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            Alternatively you can use 
            the <C value="<Select.Placeholder>" /> component to set
            the display text when no value has been selected.
          </Translate>
        </p>
        <Preview 
          title="Placeholder Component" 
          className="border border-2 theme-bc-3 relative z-[99]"
        >
          <Preview.Example center padding>
            <Select option="px-p-2-8-2-8">
              <Select.Placeholder className="theme-muted flex items-center">
                <i className="fas fa-circle-info mr-2"></i>
                <span>Select an option</span>
              </Select.Placeholder>
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[7]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="header" className="uppercase font-bold text-lg mt-8">
        {_('Dropdown Header/Footer')}
      </h2>
      <div className="relative z-[95]">
        <p className="py-4">
          <Translate>
            You can use the <C value="<Select.Head>" />, 
            and <C value="<Select.Foot>" /> components to add a header
            or footer to the dropdown.
          </Translate>
        </p>
        <Preview 
          title="Header/Footer Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <Select option="px-p-2-8-2-8">
              <Select.Head className="theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
                Header Content
              </Select.Head>
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
              <Select.Foot className="theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
                Footer Content
              </Select.Foot>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[8]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            The following example shows how to use the header to 
            manage a search form.
          </Translate>
        </p>
        <Preview 
          title="Dropdown Search Example" 
          className="border border-2 theme-bc-3 relative z-[99]"
        >
          <Preview.Example center padding>
            <Select name="select-search" option="px-p-2-8-2-8" options={options}>
              <Select.Head className="px-px-8 px-pt-8">
                <form 
                  className="flex items-center border theme-bc-3"
                  onSubmit={filter}
                >
                  <input 
                    className="border-0 flex-grow px-3 py-2 outline-none"
                    type="text" 
                    name="keyword"
                    placeholder="Search..."  
                  />
                  <button className="px-3 py-2">
                    <i className="fas fa-search"></i>
                  </button>
                </form>
              </Select.Head>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[9]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="direction" className="uppercase font-bold text-lg mt-8">
        {_('Dropdown Direction')}
      </h2>
      <div className="relative z-[94]">
        <p className="py-4">
          <Translate>
            You can use 
            the <C value="bottom" />, <C value="left" />, <C value="right" />,
            and <C value="top" /> props to control the direction
            of the dropdown.
          </Translate>
        </p>
        <Preview 
          title="Dropup Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <Select top>
              <Select.Option className="px-p-2-8-2-8" value="foo">Foo</Select.Option>
              <Select.Option className="px-p-2-8-2-8" value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[10]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following example makes use of all the possible 
            events for <C value="Select" />.
          </Translate>
        </p>
        <div className="curved">
          <div className="relative flex items-center justify-center p-3 theme-bg-1">
            
          </div>
          <Code language="typescript">
            {examples[2]}
          </Code>
        </div>
        
        <h3 className="font-semibold text-md mt-8">
          {_('On Dropdown')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onDropdown" /> event is triggered when the 
            dropdown opens or closes. The following arguments are
            passed to the event handler:
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('open')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('boolean')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="true" />
            </Table.Col>
          </Table.Row>
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
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('value')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('string')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="foo" quote />
            </Table.Col>
          </Table.Row>
        </Table>
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can pass the <C value="error" /> prop to highlight 
            the Select field red.
          </Translate>
        </p>
        <Preview 
          title="Error Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
        >
          <Preview.Example center padding>
            <Select error value="foo" option="px-p-2-8-2-8">
              <Select.Option value="foo">Foo</Select.Option>
              <Select.Option value="bar">Bar</Select.Option>
            </Select>
          </Preview.Example>
          <Preview.Code>{examples[11]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C l value="frui-field-select" />, <C l value="frui-field-select-error" />, <C l value="frui-field-select-display" />, <C l value="frui-field-select-selected" />, <C l value="frui-field-select-controls" />, <C l value="frui-field-select-clear" />, <C l value="frui-field-select-toggle" />, <C l value="frui-field-select-dropdown" />, <C l value="frui-field-select-bottom" />, <C l value="frui-field-select-left" />, <C l value="frui-field-select-right" />, <C l value="frui-field-select-top" />, <C l value="frui-field-select-option" />, 
          and <C l value="frui-field-select-selected" /> CSS classes to globally theme the select field.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each select 
            component.
          </Translate>
        </p>
        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />
        <h3 className="font-semibold mt-4">{_('Item')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select.Display>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[1]} />
        <h3 className="font-semibold mt-4">{_('Placeholder')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select.Placeholder>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[2]} />
        <h3 className="font-semibold mt-4">{_('Dropdown')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select.Dropdown>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[3]} />
        <h3 className="font-semibold mt-4">{_('Dropdown Head')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select.Head>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[4]} />
        <h3 className="font-semibold mt-4">{_('Dropdown Foot')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select.Foot>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[5]} />
        <h3 className="font-semibold mt-4">{_('Option')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Select.Option>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[6]} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/radio">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Radio')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/slug">
          {_('Slug')}
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/field/select"
      title="Select Field"
      description={
        'Select is a field component that wraps the standard '
        + 'HTML select element.'
      }
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/field/select">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
