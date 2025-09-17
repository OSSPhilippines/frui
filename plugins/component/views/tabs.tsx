import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  C, 
  Props
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';

import Tabs from '../../../components/element/Tabs.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Tabs' }
];

const props = [
  [ 'vertical', 'boolean', 'No', 'Displays tabs vertically (default: false)' ],
  [ 'scrollable', 'boolean', 'No', 'Enables horizontal scrolling (default: false)' ],
  [ 'centered', 'boolean', 'No', 'Centers tabs horizontally (default: false)' ],
  [ 'fullWidth', 'boolean', 'No', 'Makes tabs full-width (default: false)' ],
  [ 'wrap', 'boolean', 'No', 'Allows tab labels to wrap instead of truncate (default: false)' ]
];

const tabProps = [
  [ 'label', 'string', 'Yes', 'The label displayed on the tab' ],
  [ 'icon', 'ReactNode', 'No', 'Icon for the tab (optional)' ],
  [ 'disabled', 'boolean', 'No', 'Disables the tab (default: false)' ],
  [ 'style', 'CSS Object', 'No', 'Custom CSS styles for the tab' ],
  [ 'className', 'string', 'No', 'Custom class names for the tab' ]
];

const examples = [
//0
`<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' }
  ]}
  panels={[
    <div key="1">Content for Tab 1</div>,
    <div key="2">Content for Tab 2</div>,
    <div key="3">Content for Tab 3</div>
  ]}
/>`,
//1
`<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
    { label: 'Tab 4' },
    { label: 'Tab 5' }
  ]}
  panels={[
    <p key="1">Content 1</p>,
    <p key="2">Content 2</p>,
    <p key="3">Content 3</p>,
    <p key="4">Content 4</p>,
    <p key="5">Content 5</p>
  ]}
  scrollable
/>`,
//2
`<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2', disabled: true },
    { label: 'Tab 3' },
  ]}
  panels={[
    <p key="1">Content 1</p>,
    <p key="2">Content 2 (disabled)</p>,
    <p key="3">Content 3</p>,
  ]}
/>`,
//3
`<Tabs
  tabs={[
    { label: 'Home', icon: <i className="fas fa-home"></i> },
    { label: 'User', icon: <i className="fas fa-user"></i> },
    { label: 'Settings', icon: <i className="fas fa-cog"></i> },
  ]}
  panels={[
    <p key="1">Home Content</p>,
    <p key="2">User Content</p>,
    <p key="3">Settings Content</p>,
  ]}
/>`,
//4
`<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ]}
  panels={[
    <p key="1">Content 1</p>,
    <p key="2">Content 2</p>,
    <p key="3">Content 3</p>,
  ]}
  vertical
/>`,
//5
`<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ]}
  panels={[
    <p key="1">Content 1</p>,
    <p key="2">Content 2</p>,
    <p key="3">Content 3</p>,
  ]}
  centered
/>`,
//6
`<Tabs
  tabs={[
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ]}
  panels={[
    <p key="1">Content 1</p>,
    <p key="2">Content 2</p>,
    <p key="3">Content 3</p>,
  ]}
  fullWidth
/>`,
//7
`<Tabs
  tabs={[
    { label: 'Tab with a Very Long Label That Needs Wrapping' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ]}
  panels={[
    <p key="1">Content 1</p>,
    <p key="2">Content 2</p>,
    <p key="3">Content 3</p>,
  ]}
  wrap
/>`
];

export function Body() {
  const { _ } = useLanguage();
  return (
    <LayoutPanel pathname="/component/tabs">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <h1 id="top" className="flex items-center uppercase font-bold text-xl">
            {_('Tabs')}
          </h1>
          <Code language="typescript" className="mt-2">
            {`import Tabs from 'frui/Tabs';`}
          </Code>

          <h2 id="props" className="uppercase font-bold text-lg mt-8">
            {_('Props')}
          </h2>
          <h2 className="font-semibold mt-4">Tabs Props</h2>
          <Props props={props} />
          <h2 className="font-semibold mt-4">TabProps (for each tab in tabs array)</h2>
          <Props props={tabProps} />

          <h2 id="basic" className="uppercase font-bold text-lg mt-8">Basic</h2>
          <Tabs tabs={[{label:'Tab 1'},{label:'Tab 2'},{label:'Tab 3'}]} panels={[
            <div key="1">{_('Content for Tab 1')}</div>,
            <div key="2">{_('Content for Tab 2')}</div>,
            <div key="3">{_('Content for Tab 3')}</div>
          ]}/>
          <Code language="typescript">{examples[0]}</Code>

          <h2 id="scrollable" className="uppercase font-bold text-lg mt-8">Scrollable</h2>
          <Tabs tabs={[{label:'Tab 1'},{label:'Tab 2'},{label:'Tab 3'},{label:'Tab 4'},{label:'Tab 5'}]} panels={[
            <p key="1">{_('Content 1')}</p>,
            <p key="2">{_('Content 2')}</p>,
            <p key="3">{_('Content 3')}</p>,
            <p key="4">{_('Content 4')}</p>,
            <p key="5">{_('Content 5')}</p>
          ]} scrollable/>
          <Code language="typescript">{examples[1]}</Code>

          <h2 id="disabled" className="uppercase font-bold text-lg mt-8">Disabled</h2>
          <Tabs tabs={[{label:'Tab 1'},{label:'Tab 2',disabled:true},{label:'Tab 3'}]} panels={[
            <p key="1">{_('Content 1')}</p>,
            <p key="2">{_('Content 2 (disabled)')}</p>,
            <p key="3">{_('Content 3')}</p>
          ]}/>
          <Code language="typescript">{examples[2]}</Code>

          <h2 id="icon" className="uppercase font-bold text-lg mt-8">Icons</h2>
          <Tabs tabs={[
            {label:'Home',icon:<i className="fas fa-home"></i>},
            {label:'User',icon:<i className="fas fa-user"></i>},
            {label:'Settings',icon:<i className="fas fa-cog"></i>}
          ]} panels={[
            <p key="1">{_('Home Content')}</p>,
            <p key="2">{_('User Content')}</p>,
            <p key="3">{_('Settings Content')}</p>
          ]}/>
          <Code language="typescript">{examples[3]}</Code>

          <h2 id="vertical" className="uppercase font-bold text-lg mt-8">Vertical</h2>
          <Tabs tabs={[{label:'Tab 1'},{label:'Tab 2'},{label:'Tab 3'}]} panels={[
            <p key="1">{_('Content 1')}</p>,
            <p key="2">{_('Content 2')}</p>,
            <p key="3">{_('Content 3')}</p>
          ]} vertical/>
          <Code language="typescript">{examples[4]}</Code>

          <h2 id="centered" className="uppercase font-bold text-lg mt-8">Centered</h2>
          <Tabs tabs={[{label:'Tab 1'},{label:'Tab 2'},{label:'Tab 3'}]} panels={[
            <p key="1">{_('Content 1')}</p>,
            <p key="2">{_('Content 2')}</p>,
            <p key="3">{_('Content 3')}</p>
          ]} centered/>
          <Code language="typescript">{examples[5]}</Code>

          <h2 id="fullWidth" className="uppercase font-bold text-lg mt-8">FullWidth</h2>
          <Tabs tabs={[{label:'Tab 1'},{label:'Tab 2'},{label:'Tab 3'}]} panels={[
            <p key="1">{_('Content 1')}</p>,
            <p key="2">{_('Content 2')}</p>,
            <p key="3">{_('Content 3')}</p>
          ]} fullWidth/>
          <Code language="typescript">{examples[6]}</Code>

          <h2 id="wrap" className="uppercase font-bold text-lg mt-8">Wrap</h2>
          <Tabs tabs={[{label:'Tab with a Very Long Label That Needs Wrapping'},{label:'Tab 2'},{label:'Tab 3'}]} panels={[
            <p key="1">{_('Content 1')}</p>,
            <p key="2">{_('Content 2')}</p>,
            <p key="3">{_('Content 3')}</p>
          ]} wrap/>
          <Code language="typescript">{examples[7]}</Code>

          <h2 id="custom" className="uppercase font-bold text-lg mt-8">Custom Styles</h2>
          <p className="py-2">
            <Translate>
              You can add your own custom class to the tabs component or use the
              <C value="frui-tab" /> <C value="frui-tab-active" /> 
              <C value="frui-tab-disabled" /> <C value="frui-tab-panels" /> CSS classes.
            </Translate>
          </p>

          <div className="flex items-center border-t border-b2 mt-8 pt-4">
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
        </section>
      </main>
    </LayoutPanel>
  );
};

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/component/tabs"
      title="Tabs Component"
      description="Tabs in FRUI are React components that allow users to navigate between different content panels with internal state management."
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
