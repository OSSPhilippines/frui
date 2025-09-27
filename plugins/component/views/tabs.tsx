//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Tabs from 'components/element/Tabs.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const props = [
  //tabs
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'activeClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to active tab' ],
    [ 'onChange', '(value: string) => void', 'No', 'Change value handler' ],
    [ 'contentClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to each content' ],
    [ 'defaultValue', 'string', 'No', 'Default active tab value (uncontrolled)' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
    [ 'tabClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to each tab' ],
    [ 'value', 'string', 'No', 'Controlled active tab value' ]
  ],
  //tab head
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'activeClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to active tab' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
    [ 'tabClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to each tab' ],
  ],
  //tab body
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
    [ 'contentClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply to each content' ],
  ],
  //tab label
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'activeClassStyle', 'string | React.CSSProperties', 'No', 'Class/style to apply if active' ],
    [ 'value', 'string', 'Yes', 'Unique name for the tab' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
  ],
  //tab content
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'value', 'string', 'Yes', 'Unique name for the tab' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
  ],
  //tab active
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
  ],
  //tab inactive
  [
    [ 'className', 'string', 'No', 'Standard HTML class names' ],
    [ 'style', 'React.CSSProperties', 'No', 'Standard HTML styles' ],
  ]
];

const examples = [
//0
`<Tabs 
  defaultValue="tab1"
  tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
  activeClassStyle="border border-b-0 p-2 theme-bc-3 theme-bg-3 text-white"
  contentClassStyle="border theme-bc-3 p-4"
>
  <Tabs.Head className="flex">
    <Tabs.Label value="tab1">Tab 1</Tabs.Label>
    <Tabs.Label value="tab2">Tab 2</Tabs.Label>
  </Tabs.Head>
  <Tabs.Body>
    <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
    <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
  </Tabs.Body>
</Tabs>`,
//1
`<Tabs 
  className="flex"
  defaultValue="tab1"
  tabClassStyle="border border-r-0 p-2 theme-bc-3 cursor-pointer" 
  activeClassStyle="border border-r-0 p-2 theme-bc-3 theme-bg-3 text-white"
>
  <Tabs.Head className="w-32">
    <Tabs.Label value="tab1">Tab 1</Tabs.Label>
    <Tabs.Label value="tab2">Tab 2</Tabs.Label>
  </Tabs.Head>
  <Tabs.Body className="flex-grow border theme-bc-3 p-4">
    <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
    <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
  </Tabs.Body>
</Tabs>`,
//2
`<Tabs 
  className="flex"
  defaultValue="tab1"
  tabClassStyle="border border-l-0 p-2 theme-bc-3 cursor-pointer" 
  activeClassStyle="border border-l-0 p-2 theme-bc-3 theme-bg-3 text-white"
>
  <Tabs.Body className="flex-grow border theme-bc-3 p-4">
    <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
    <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
  </Tabs.Body>
  <Tabs.Head className="w-32">
    <Tabs.Label value="tab1">Tab 1</Tabs.Label>
    <Tabs.Label value="tab2">Tab 2</Tabs.Label>
  </Tabs.Head>
</Tabs>`,
//3
`<Tabs 
  defaultValue="tab1"
  tabClassStyle="border border-t-0 p-2 theme-bc-3 cursor-pointer" 
  activeClassStyle="border border-t-0 p-2 theme-bg-3 text-white"
  contentClassStyle="border theme-bc-3 p-4"
>
  <Tabs.Body>
    <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
    <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
  </Tabs.Body>
  <Tabs.Head className="flex">
    <Tabs.Label value="tab1">Tab 1</Tabs.Label>
    <Tabs.Label value="tab2">Tab 2</Tabs.Label>
  </Tabs.Head>
</Tabs>`,
//4
`<Tabs defaultValue="tab1">
  <Tabs.Head 
    className="flex"
    tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
    activeClassStyle="border border-b-0 p-2 theme-bg-3 text-white"
  >
    <Tabs.Label value="tab1">Tab 1</Tabs.Label>
    <Tabs.Label value="tab2">Tab 2</Tabs.Label>
  </Tabs.Head>
  <Tabs.Body contentClassStyle="border theme-bc-3 p-4">
    <Tabs.Content value="tab1">
      Content for Tab 1
    </Tabs.Content>
    <Tabs.Content value="tab2">
      Content for Tab 2
    </Tabs.Content>
  </Tabs.Body>
</Tabs>`,
//5
`<Tabs defaultValue="tab1">
  <Tabs.Head className="flex">
    <Tabs.Label 
      className="border border-b-0 p-2 theme-bc-3 cursor-pointer"
      activeClassStyle="border border-b-0 p-2 theme-bg-3 text-white" 
      value="tab1"
    >
      Tab 1
    </Tabs.Label>
    <Tabs.Label 
      className="border border-b-0 p-2 theme-bc-3 cursor-pointer"
      activeClassStyle="border border-b-0 p-2 theme-bg-3 text-white" 
      value="tab2"
    >
      Tab 2
    </Tabs.Label>
  </Tabs.Head>
  <Tabs.Body>
    <Tabs.Content className="border theme-bc-3 p-4" value="tab1">
      Content for Tab 1
    </Tabs.Content>
    <Tabs.Content className="border theme-bc-3 p-4" value="tab2">
      Content for Tab 2
    </Tabs.Content>
  </Tabs.Body>
</Tabs>`,
//6
`//hooks
const tabs = [ 'tab1', 'tab2', 'tab3' ];
const [ tab, setTab ] = useState(0);
//handlers
const next = () => setTab(tab => (tab + 1) % tabs.length);
const prev = () => setTab(tab => (tab - 1 + tabs.length) % tabs.length);

return (
  <div>
    <Tabs 
      value={tabs[tab]}
      tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
      activeClassStyle="border border-b-0 p-2 theme-bc-3 theme-bg-3 text-white"
      contentClassStyle="border theme-bc-3 p-4"
    >
      <Tabs.Head className="flex">
        <Tabs.Label value="tab1">Tab 1</Tabs.Label>
        <Tabs.Label value="tab2">Tab 2</Tabs.Label>
        <Tabs.Label value="tab3">Tab 3</Tabs.Label>
      </Tabs.Head>
      <Tabs.Body>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
        <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
        <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
      </Tabs.Body>
    </Tabs>
    <div className="flex items-center mt-4">
      <button
        className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
        onClick={prev}
      >
        <i className="fas fa-arrow-left mr-2"></i>
        Previous
      </button>
      <div className="flex-grow text-center">
        Current tab is <strong>{tabs[tab]}</strong>.
      </div>
      </div>
      <button
        className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
        onClick={next}
      >
        Next
        <i className="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  </div>
);`,
//7
`<Tabs 
  defaultValue="tab1"
  tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
  activeClassStyle="border border-b-0 p-2 theme-bc-3 theme-bg-3 text-white"
  contentClassStyle="border theme-bc-3 p-4"
>
  <Tabs.Head className="flex">
    <Tabs.Label value="tab1">
      Tab 1 (
        <Tabs.Active className="inline">Showing</Tabs.Active>
        <Tabs.Inactive className="inline">Hidding</Tabs.Inactive>
      )
    </Tabs.Label>
    <Tabs.Label value="tab2">
      Tab 2 (
        <Tabs.Active className="inline">Showing</Tabs.Active>
        <Tabs.Inactive className="inline">Hidding</Tabs.Inactive>
      )
    </Tabs.Label>
  </Tabs.Head>
  <Tabs.Body>
    <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
    <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
  </Tabs.Body>
</Tabs>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Tabs</Bread.Crumb>
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
        <a className="block pb-1 font-bold" href="#top">{_('Tabs')}</a>
        <ul className="list-disc pl-3">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#managing">{_('Managing Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#controls">{_('Controlling Tabs')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#in-active">{_('In/Active Components')}</a>
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
        height={150}
        title="Basic Tabs Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Tabs 
            defaultValue="tab1"
            tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
            activeClassStyle="border border-b-0 p-2 theme-bc-3 theme-bg-3 text-white"
            contentClassStyle="border theme-bc-3 p-4"
          >
            <Tabs.Head className="flex">
              <Tabs.Label value="tab1">Tab 1</Tabs.Label>
              <Tabs.Label value="tab2">Tab 2</Tabs.Label>
            </Tabs.Head>
            <Tabs.Body>
              <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
              <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
            </Tabs.Body>
          </Tabs>
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Left Tabs Example */}
      <Preview 
        height={150}
        title="Left Tabs Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Tabs 
            className="flex"
            defaultValue="tab1"
            tabClassStyle="border border-r-0 p-2 theme-bc-3 cursor-pointer" 
            activeClassStyle="border border-r-0 p-2 theme-bc-3 theme-bg-3 text-white"
          >
            <Tabs.Head className="w-32">
              <Tabs.Label value="tab1">Tab 1</Tabs.Label>
              <Tabs.Label value="tab2">Tab 2</Tabs.Label>
            </Tabs.Head>
            <Tabs.Body className="flex-grow border theme-bc-3 p-4">
              <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
              <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
            </Tabs.Body>
          </Tabs>
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* Right Tabs Example */}
      <Preview 
        height={150}
        title="Right Tabs Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Tabs 
            className="flex"
            defaultValue="tab1"
            tabClassStyle="border border-l-0 p-2 theme-bc-3 cursor-pointer" 
            activeClassStyle="border border-l-0 p-2 theme-bc-3 theme-bg-3 text-white"
          >
            <Tabs.Body className="flex-grow border theme-bc-3 p-4">
              <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
              <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
            </Tabs.Body>
            <Tabs.Head className="w-32">
              <Tabs.Label value="tab1">Tab 1</Tabs.Label>
              <Tabs.Label value="tab2">Tab 2</Tabs.Label>
            </Tabs.Head>
          </Tabs>
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Bottom Tabs Example */}
      <Preview 
        height={150}
        title="Bottoms Tabs Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <Tabs 
            defaultValue="tab1"
            tabClassStyle="border border-t-0 p-2 theme-bc-3 cursor-pointer" 
            activeClassStyle="border border-t-0 p-2 theme-bg-3 text-white"
            contentClassStyle="border theme-bc-3 p-4"
          >
            <Tabs.Body>
              <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
              <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
            </Tabs.Body>
            <Tabs.Head className="flex">
              <Tabs.Label value="tab1">Tab 1</Tabs.Label>
              <Tabs.Label value="tab2">Tab 2</Tabs.Label>
            </Tabs.Head>
          </Tabs>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
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
  const tabs = [ 'tab1', 'tab2', 'tab3' ];
  const [ tab, setTab ] = useState(0);
  //handlers
  const next = () => setTab(tab => (tab + 1) % tabs.length);
  const prev = () => setTab(tab => (tab - 1 + tabs.length) % tabs.length);
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Tabs')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the tab group component like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Tabs from 'frui/Tabs';`}
        </Code>
      </div>
      
      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following are some basic examples of tabs.
          </Translate>
        </p>
        <Examples />
      </div>
      
      <h2 id="managing" className="uppercase font-bold text-lg mt-8">
        {_('Managing Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can manage the styles of the tabs by passing class names to
            the <C value="tabClassStyle" />, <C value="activeClassStyle" />, 
            and <C value="contentClassStyle" /> props in 
            the <C value="Tabs" /> component.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[0]}</Code>
        <p className="py-2">
          <Translate>
            You can also pass the class names to 
            the <C value="Tabs.Head" />, and <C value="Tabs.Body" /> components.
            Classes here have a higher priority than the classes set to 
            the <C value="Tabs" /> component.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[4]}</Code>
        <p className="py-2">
          <Translate>
            Or you can pass the class names to the individual 
            <C value="Tabs.Label" /> and <C value="Tabs.Content" /> components.
            Classes here have the highest priority.
          </Translate>
        </p>
        <Code className="my-4" language="typescript">{examples[5]}</Code>
      </div>

      <h2 id="controls" className="uppercase font-bold text-lg mt-8">
        {_('Controlling Tab State')}
      </h2>
      <div>
        <p className="py-2 mt-2">
          <Translate>
            You can control the tabs by setting the 
            <C value="value" /> prop to a state in 
            the <C value="Tabs" /> component.
          </Translate>
        </p>
        <Preview 
          title="Tab Controls Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Tabs 
              value={tabs[tab]}
              tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
              activeClassStyle="border border-b-0 p-2 theme-bc-3 theme-bg-3 text-white"
              contentClassStyle="border theme-bc-3 p-4"
            >
              <Tabs.Head className="flex">
                <Tabs.Label value="tab1">Tab 1</Tabs.Label>
                <Tabs.Label value="tab2">Tab 2</Tabs.Label>
                <Tabs.Label value="tab3">Tab 3</Tabs.Label>
              </Tabs.Head>
              <Tabs.Body>
                <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
                <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
                <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
              </Tabs.Body>
            </Tabs>
            <div className="flex items-center mt-4">
              <button
                className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
                onClick={prev}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Previous')}
              </button>
              <div className="flex-grow text-center">
                <Translate>
                  Current tab is <strong>{tabs[tab]}</strong>.
                </Translate>
              </div>
              <button
                className="px-3 py-1 border theme-bc-3 theme-bg-3 text-white"
                onClick={next}
              >
                {_('Next')}
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </Preview.Example>
          <Preview.Code>{examples[6]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="in-active" className="uppercase font-bold text-lg mt-8">
        {_('In/Active Components')}
      </h2>
      <div>
        <p className="py-2 mt-2">
          <Translate>
            You can use the <C value="<Tabs.Active>" />, 
            and <C value="<Tabs.Inactive>" /> components to show 
            different content depending if the tab is active 
            or not.
          </Translate>
        </p>
        <Preview 
          title="Active and Inactive Component Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <Tabs 
              defaultValue="tab1"
              tabClassStyle="border border-b-0 p-2 theme-bc-3 cursor-pointer" 
              activeClassStyle="border border-b-0 p-2 theme-bc-3 theme-bg-3 text-white"
              contentClassStyle="border theme-bc-3 p-4"
            >
              <Tabs.Head className="flex">
                <Tabs.Label value="tab1">
                  Tab 1 (
                    <Tabs.Active className="inline">Showing</Tabs.Active>
                    <Tabs.Inactive className="inline">Hidding</Tabs.Inactive>
                  )
                </Tabs.Label>
                <Tabs.Label value="tab2">
                  Tab 2 (
                    <Tabs.Active className="inline">Showing</Tabs.Active>
                    <Tabs.Inactive className="inline">Hidding</Tabs.Inactive>
                  )
                </Tabs.Label>
              </Tabs.Head>
              <Tabs.Body>
                <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
                <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
              </Tabs.Body>
            </Tabs>
          </Preview.Example>
          <Preview.Code>{examples[7]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            You can use 
            the <C value="frui-tabs" />, <C value="frui-tabs-head" />, <C value="frui-tabs-body" />, <C value="frui-tabs-label" />, <C value="frui-tabs-label-active" />, 
            and <C value="frui-tabs-content" /> CSS classes to globally theme tabs.
          </Translate>
        </p>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The following section describes the props for each tabs 
            component.
          </Translate>
        </p>

        <h3 className="font-semibold mt-4">{_('Root')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[0]} />

        <h3 className="font-semibold mt-4">{_('Head')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs.Head>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[1]} />

        <h3 className="font-semibold mt-4">{_('Body')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs.Body>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[2]} />

        <h3 className="font-semibold mt-4">{_('Label')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs.Label>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[3]} />

        <h3 className="font-semibold mt-4">{_('Content')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs.Content>" /> component can be passed 
            the following props.
          </Translate>
        </p>
        <Props props={props[4]} />

        <h3 className="font-semibold mt-4">{_('Active')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs.Active>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props[5]} />

        <h3 className="font-semibold mt-4">{_('Inactive')}</h3>
        <p className="py-2">
          <Translate>
            The <C value="<Tabs.Inactive>" /> component can be passed 
            the following props.
          </Translate>
        </p>
        <Props props={props[6]} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="text-t2" href="/component/table">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Table')}
        </a>
        <div className="flex-grow"></div>
        <a className="text-t2" href="/component/tooltip">
          {_('Tooltip')}
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
      uri="/component/tabs"
      title="Tabs Component"
      description={
        'Tabs in FRUI are React components that allow users to '
        + 'navigate between different content panels with internal '
        + 'state management.'
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
      <LayoutPanel pathname="/component/tabs">
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