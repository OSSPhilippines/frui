//--------------------------------------------------------------------//
// Imports

//modules
import { useState, FormEvent } from 'react';
import { useLanguage, Translate } from 'r22n';
//frui
import Alert from 'src/base/Alert.js';
import Table from 'src/base/Table.js';
import Dropdown from 'src/base/Dropdown.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/tool/dropdown';
const title = 'Dropdown';
const description = 'The Dropdown component is a toggleable menu for '
  + 'displaying a list of options.';

const props = [
  //dropdown props
  [
    [ 'append', 'string', 'No', 'Selector used to get the element to which the dropdown will be appended to when activated' ],
    [ 'bottom', 'boolean', 'No', 'Whether to position the dropdown below the control' ],
    [ 'container', 'SlotStyleProp', 'No', 'Class/style to apply to the dropdown container' ],
    [ 'className', 'string', 'No', 'Additional class names to apply to the card' ],
    [ 'defaultOpened', 'boolean', 'No', 'Uncontrolled open state of the dropdown' ],
    [ 'defaultValue', 'string | string[]', 'No', 'Uncontrolled serializable select value' ],
    [ 'error', 'boolean', 'No', 'Whether the dropdown is in an error state' ],
    [ 'left', 'boolean', 'No', 'Whether to position the dropdown to the left of the control' ],
    [ 'multiple', 'boolean', 'No', 'Whether to accept multiple selections' ],
    [ 'onDropdown', '(show: boolean) => void', 'No', 'Drop down handler called when the dropdown is opened/closed' ],
    [ 'onUpdate', '(value: string | string[]) => void', 'No', 'Update handler called when the selected value changes' ],
    [ 'opened', 'boolean', 'No', 'Controlled open state of the dropdown' ],
    [ 'option', 'CallableSlotStyleProp<DropdownStates>', 'No', 'Class/style to apply to each dropdown option' ],
    [ 'options', 'string[] | DropdownData[] | Record<string, string>', 'No', 'Serialized list of options as array or object'],
    [ 'right', 'boolean', 'No', 'Whether to position the dropdown to the right of the control' ],
    [ 'style', 'CSS Object', 'No', 'Additional styles to apply to the card' ],
    [ 'top', 'boolean', 'No', 'Whether to position the dropdown above the control' ],
    [ 'value', 'string | string[]', 'No', 'Controlled select value' ]
  ],
  //dropdown option props
  [
    [ 'className', 'string', 'No', 'Additional class names to apply to the card' ],
    [ 'style', 'CSS Object', 'No', 'Additional styles to apply to the card' ],
    [ 'value', 'string', 'Yes', 'The serializable value of the option' ]
  ],
  //dropdown foot props
  [
    [ 'className', 'string', 'No', 'Additional class names to apply to the card' ],
    [ 'style', 'CSS Object', 'No', 'Additional styles to apply to the card' ]
  ],
  //dropdown head props
  [
    [ 'className', 'string', 'No', 'Additional class names to apply to the card' ],
    [ 'style', 'CSS Object', 'No', 'Additional styles to apply to the card' ]
  ],
  //dropdown control props
  [
    [ 'className', 'string', 'No', 'Additional class names to apply to the card' ],
    [ 'style', 'CSS Object', 'No', 'Additional styles to apply to the card' ]
  ]
];

const examples = [
//0
`<Dropdown opened={true} container="w-full">
  <Dropdown.Option className="px-3" value="1">
    Option 1
  </Dropdown.Option>
  <Dropdown.Option className="px-3" value="2">
    Option 2
  </Dropdown.Option>
</Dropdown>`,
//1
`const [ opened, open ] = useState(false);
return (
  <menu>
    <a href="#">Item 1</a>
    <Dropdown opened={opened} onDropdown={open} container="inline-block mx-3">
      <Dropdown.Control>
        <a href="#" className="underline" onClick={() => open(!opened)}>
          Item 2
        </a>
      </Dropdown.Control>
      <Dropdown.Option className="w-[100px] px-3" value="1">
        Option 1
      </Dropdown.Option>
      <Dropdown.Option className="w-[100px] px-3" value="2">
        Option 2
      </Dropdown.Option>
    </Dropdown>
    <a href="#">Item 3</a>
  </menu>
);`,
//2
`<Dropdown opened={true} option="px-p-2-8-2-8">
  <Dropdown.Option value="foo">Foo</Dropdown.Option>
  <Dropdown.Option value="bar">Bar</Dropdown.Option>
</Dropdown>`,
//3
`<Dropdown 
  multiple
  opened={true}
  option={({ selected, target }) => selected && target === 'control'
    ? 'inline-block theme-bg-success px-p-2-8-2-8 px-mr-4 theme-white'
    : selected && target === 'dropdown'
    ? 'theme-bg-3 theme-white px-p-2-8-2-8 px-m-4-8-4-8'
    : 'px-p-2-8-2-8 px-m-4-8-4-8'
  } 
>
  <Dropdown.Option value="foo">Foo</Dropdown.Option>
  <Dropdown.Option value="bar">Bar</Dropdown.Option>
</Dropdown>`,
//4
`<Dropdown opened={true} multiple option="px-p-2-8-2-8">
  <Dropdown.Head className="here theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
    Header Content
  </Dropdown.Head>
  <Dropdown.Option value="foo">Foo</Dropdown.Option>
  <Dropdown.Option value="bar">Bar</Dropdown.Option>
  <Dropdown.Foot className="here theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
    Footer Content
  </Dropdown.Foot>
</Dropdown>`,
//5
`<Dropdown opened={true} multiple option="px-p-2-8-2-8" options={options}>
  <Dropdown.Head className="found px-px-8 px-pt-8">
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
  </Dropdown.Head>
</Dropdown>`,
//6
`<menu className="mt-16">
  <a href="#">Item 1</a>
  <Dropdown opened={opened} onDropdown={open} top container="inline-block mx-3">
    <Dropdown.Control>
      <a className="underline" onClick={() => open(!opened)}>
        Item 2
      </a>
    </Dropdown.Control>
    <Dropdown.Option className="w-[100px] px-3" value="1">
      Option 1
    </Dropdown.Option>
    <Dropdown.Option className="w-[100px] px-3" value="2">
      Option 2
    </Dropdown.Option>
  </Dropdown>
  <a href="#">Item 3</a>
</menu>`,
//7
`<Dropdown opened={true} option="px-p-2-8-2-8" append="#dropdown-root">
  <Dropdown.Option value="foo">Foo</Dropdown.Option>
  <Dropdown.Option value="bar">Bar</Dropdown.Option>
</Dropdown>`,
//8
`<Dropdown opened={true} onDropdown={console.log}>
  <Dropdown.Option value="foo">Foo</Dropdown.Option>
  <Dropdown.Option value="bar">Bar</Dropdown.Option>
</Dropdown>`
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

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
          {_('Card')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#basic">{_('Basics')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#control">{_('Control')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#option">{_('Option Slot')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#header">{_('Header/Footer')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#direction">{_('Direction')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#portal">{_('Portaling')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#events">{_('Events')}</a>
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
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  const [ opened, open ] = useState(false);

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
        {_('Dropdown')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Dropdown>" /> tool is a low-level component used 
            to create toggleable dropdown menus for selecting options from a 
            list. It provides flexibility in positioning, styling, and 
            behavior, making it suitable for various use cases where a 
            dropdown selection is needed.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Dropdown from 'frui/Dropdown';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following example shows how to setup a 
            basic <C value="<Dropdown>" />.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          height={100}
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Dropdown opened={true} container="w-full px-mt--30">
              <Dropdown.Option className="px-3" value="1">
                Option 1
              </Dropdown.Option>
              <Dropdown.Option className="px-3" value="2">
                Option 2
              </Dropdown.Option>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="control" className="uppercase font-bold text-lg mt-8">
        {_('Control')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            Dropdown comes with a control component that can be used to 
            control and coordinate with the dropdown itself.
          </Translate>
        </p>
        <Preview 
          title="Menu Example" 
          height={100}
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <menu>
              <a href="#">Item 1</a>
              <Dropdown opened={opened} onDropdown={open} container="inline-block mx-3">
                <Dropdown.Control>
                  <a className="underline" onClick={() => open(!opened)}>
                    Item 2
                  </a>
                </Dropdown.Control>
                <Dropdown.Option className="w-[100px] px-3" value="1">
                  Option 1
                </Dropdown.Option>
                <Dropdown.Option className="w-[100px] px-3" value="2">
                  Option 2
                </Dropdown.Option>
              </Dropdown>
              <a href="#">Item 3</a>
            </menu>
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
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
          height={100}
        >
          <Preview.Example padding>
            <Dropdown opened={true} option="px-p-2-8-2-8">
              <Dropdown.Option value="foo">Foo</Dropdown.Option>
              <Dropdown.Option value="bar">Bar</Dropdown.Option>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
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
          height={100}
        >
          <Preview.Example padding>
            <Dropdown 
              multiple
              opened={true}
              option={({ selected, target }) => selected && target === 'control'
                ? 'inline-block theme-bg-success px-p-2-8-2-8 px-mr-4 theme-white'
                : selected && target === 'dropdown'
                ? 'theme-bg-3 theme-white px-p-2-8-2-8 px-m-4-8-4-8'
                : 'px-p-2-8-2-8 px-m-4-8-4-8'
              } 
            >
              <Dropdown.Option value="foo">Foo</Dropdown.Option>
              <Dropdown.Option value="bar">Bar</Dropdown.Option>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="header" className="uppercase font-bold text-lg mt-8">
        {_('Header/Footer')}
      </h2>
      <div className="relative z-[95]">
        <p className="py-4">
          <Translate>
            You can use the <C value="<Dropdown.Head>" />, 
            and <C value="<Dropdown.Foot>" /> components to add a header
            or footer to the dropdown.
          </Translate>
        </p>
        <Preview 
          title="Header/Footer Example" 
          className="border border-2 theme-bc-3 relative z-[100]"
          height={160}
        >
          <Preview.Example padding>
            <Dropdown opened={true} multiple option="px-p-2-8-2-8">
              <Dropdown.Head className="here theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
                Header Content
              </Dropdown.Head>
              <Dropdown.Option value="foo">Foo</Dropdown.Option>
              <Dropdown.Option value="bar">Bar</Dropdown.Option>
              <Dropdown.Foot className="here theme-bg-2 theme-bc-2 px-3 py-2 border-b font-bold">
                Footer Content
              </Dropdown.Foot>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[4]}</Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            The following example shows how to use the header to 
            manage a search form.
          </Translate>
        </p>
        <Preview 
          title="Search Example" 
          className="border border-2 theme-bc-3 relative z-[99]"
          height={140}
        >
          <Preview.Example padding>
            <Dropdown opened={true} multiple option="px-p-2-8-2-8" options={options}>
              <Dropdown.Head className="found px-px-8 px-pt-8">
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
              </Dropdown.Head>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[5]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="direction" className="uppercase font-bold text-lg mt-8">
        {_('Direction')}
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
          title="Footer Menu Example" 
          height={100}
          className="border border-2 theme-bc-3"
        >
          <Preview.Example padding>
            <menu className="mt-16">
              <a href="#">Item 1</a>
              <Dropdown opened={opened} onDropdown={open} top container="inline-block mx-3">
                <Dropdown.Control>
                  <a className="underline" onClick={() => open(!opened)}>
                    Item 2
                  </a>
                </Dropdown.Control>
                <Dropdown.Option className="w-[100px] px-3" value="1">
                  Option 1
                </Dropdown.Option>
                <Dropdown.Option className="w-[100px] px-3" value="2">
                  Option 2
                </Dropdown.Option>
              </Dropdown>
              <a href="#">Item 3</a>
            </menu>
          </Preview.Example>
          <Preview.Code>{examples[6]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="portal" className="uppercase font-bold text-lg mt-8">
        {_('Portaling')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can portal the dropdown to a specific DOM node by passing a 
            CSS selector to the <C value="append" /> prop. 
          </Translate>
        </p>
        <Preview 
          title="Portal to Dropdown Root Example" 
          className="border border-2 theme-bc-3"
          height={100}
        >
          <Preview.Example padding>
            <Dropdown opened={true} multiple option="px-p-2-8-2-8" append="#dropdown-root">
              <Dropdown.Option value="foo">Foo</Dropdown.Option>
              <Dropdown.Option value="bar">Bar</Dropdown.Option>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[7]}</Preview.Code>
        </Preview>
        <Alert info className="mt-4">
          <i className="fas fa-info-circle mr-2"></i>
          <Translate>
            <strong>TIP:</strong> Make sure the target container element exists in the DOM.
          </Translate>
        </Alert>
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
        <Preview 
          title="Emitting Event Example" 
          className="border border-2 theme-bc-3"
          height={100}
        >
          <Preview.Example padding>
            <Dropdown opened={true} multiple onDropdown={console.log} option="px-p-2-8-2-8">
              <Dropdown.Option value="foo">Foo</Dropdown.Option>
              <Dropdown.Option value="bar">Bar</Dropdown.Option>
            </Dropdown>
          </Preview.Example>
          <Preview.Code>{examples[8]}</Preview.Code>
        </Preview>
        
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
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each card 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dropdown>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Option')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dropdown.Option>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[1]} />

        <h3 className="font-semibold mt-4">{_('Foot')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dropdown.Body>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[2]} />

        <h3 className="font-semibold mt-4">{_('Head')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dropdown.Head>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[3]} />

        <h3 className="font-semibold mt-4">{_('Control')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Dropdown.Control>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[4]} />
      </div>

      <Docs.Foot />
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <Docs.Head
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <Docs pathname={uri}>
      <Menu />
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;
