// types
import type { Crumb } from 'modules/components/Crumbs';
// hooks
import { useLanguage } from 'r22n';
// components
import Link from 'next/link';
import { Translate } from 'r22n';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';
import TabsComponent from 'frui/element/Tabs';
import type { TabsProps } from 'frui/element/Tabs';



const Tabs = TabsComponent as React.FC<TabsProps>;

const codeBasicExample = `
const tabData = [
  { label: 'Tab 1' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2</p>,
  <p>Content 3</p>,
];
<Tabs tabs={tabData} panels={panelData} />
`.trim();

const codeScrollableExample = `
const tabData = [
  { label: 'Tab 1' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
  { label: 'Tab 4' },
  { label: 'Tab 5' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2</p>,
  <p>Content 3</p>,
  <p>Content 4</p>,
  <p>Content 5</p>,
];
<Tabs tabs={tabData} panels={panelData} scrollable={true} />
`.trim();

const codeDisabledExample = `
const tabData = [
  { label: 'Tab 1' },
  { label: 'Tab 2', disabled: true },
  { label: 'Tab 3' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2 (disabled)</p>,
  <p>Content 3</p>,
];
<Tabs tabs={tabData} panels={panelData} />
`.trim();

const codeIconExample = `
const tabData = [
  { label: 'Home', icon: <i className="fas fa-home"></i> },
  { label: 'User', icon: <i className="fas fa-user"></i> },
  { label: 'Settings', icon: <i className="fas fa-cog"></i> },
];
const panelData = [
  <p>Home Content</p>,
  <p>User Content</p>,
  <p>Settings Content</p>,
];
<Tabs tabs={tabData} panels={panelData} />
`.trim();

const codeVerticalExample = `
const tabData = [
  { label: 'Tab 1' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2</p>,
  <p>Content 3</p>,
];
<Tabs tabs={tabData} panels={panelData} vertical={true} />
`.trim();

const codeCenteredExample = `
const tabData = [
  { label: 'Tab 1' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2</p>,
  <p>Content 3</p>,
];
<Tabs tabs={tabData} panels={panelData} centered={true} />
`.trim();

const codeFullWidthExample = `
const tabData = [
  { label: 'Tab 1' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2</p>,
  <p>Content 3</p>,
];
<Tabs tabs={tabData} panels={panelData} fullWidth={true} />
`.trim();

const codeWrapExample = `
const tabData = [
  { label: 'Tab with a Very Long Label That Needs Wrapping' },
  { label: 'Tab 2' },
  { label: 'Tab 3' },
];
const panelData = [
  <p>Content 1</p>,
  <p>Content 2</p>,
  <p>Content 3</p>,
];
<Tabs tabs={tabData} panels={panelData} wrap={true} />
`.trim();

export default function Page() {
  const { _ } = useLanguage();
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Tabs' }
  ];
  const props = [
    [ _('vertical'), _('boolean'), _('No'), _('Displays tabs vertically (default: false)') ],
    [ _('scrollable'), _('boolean'), _('No'), _('Enables horizontal scrolling (default: false)') ],
    [ _('centered'), _('boolean'), _('No'), _('Centers tabs horizontally (default: false)') ],
    [ _('fullWidth'), _('boolean'), _('No'), _('Makes tabs full-width (default: false)') ],
    [ _('wrap'), _('boolean'), _('No'), _('Allows tab labels to wrap instead of truncate (default: false)') ],
  ];
  const tabProps = [
    [ _('label'), _('string'), _('Yes'), _('The label displayed on the tab') ],
    [ _('icon'), _('ReactNode'), _('No'), _('Icon for the tab (optional)') ],
    [ _('disabled'), _('boolean'), _('No'), _('Disables the tab (default: false)') ],
    [ _('style'), _('CSS Object'), _('No'), _('Custom CSS styles for the tab') ],
    [ _('className'), _('string'), _('No'), _('Custom class names for the tab') ],
  ];

  // Data for each example
  const basicTabs = [
    { label: 'Tab 1' }, 
    { label: 'Tab 2' }, 
    { label: 'Tab 3' }
  ];

  const basicPanels = [
    <p key="basic-1">Content 1</p>, 
    <p key="basic-2">Content 2</p>, 
    <p key="basic-3">Content 3</p>
  ];

  const scrollableTabs = [
    { label: 'Tab 1' }, 
    { label: 'Tab 2' }, 
    { label: 'Tab 3' }, 
    { label: 'Tab 4' }, 
    { label: 'Tab 5' }
  ];

  const scrollablePanels = [
    <p key="scrollable-1">Content 1</p>, 
    <p key="scrollable-2">Content 2</p>, 
    <p key="scrollable-3">Content 3</p>, 
    <p key="scrollable-4">Content 4</p>, 
    <p key="scrollable-5">Content 5</p>
  ];

  const disabledTabs = [
    { label: 'Tab 1' }, 
    { label: 'Tab 2', disabled: true }, 
    { label: 'Tab 3' },
  ];

  const disabledPanels = [
    <p key="disabled-1">Content 1</p>, 
    <p key="disabled-2">Content 2 (disabled)</p>, 
    <p key="disabled-3">Content 3</p>,
  ];

  const iconTabs = [
    { label: 'Home', icon: <i className="fas fa-home"></i> },
    { label: 'User', icon: <i className="fas fa-user"></i> },
    { label: 'Settings', icon: <i className="fas fa-cog"></i> },
  ];
  const iconPanels = [
    <p key="icon-1">Home Content</p>, 
    <p key="icon-2">User Content</p>, 
    <p key="icon-3">Settings Content</p>,
  ];

  const verticalTabs = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];
  const verticalPanels = [
    <p key="vertical-1">Content 1</p>,
    <p key="vertical-2">Content 2</p>,
    <p key="vertical-3">Content 3</p>,
  ];

  const centeredTabs = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];

  const centeredPanels = [
    <p key="centered-1">Content 1</p>,
    <p key="centered-2">Content 2</p>,
    <p key="centered-3">Content 3</p>,
  ];

  const fullWidthTabs = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];
  const fullWidthPanels = [
    <p key="fullWidth-1">Content 1</p>,
    <p key="fullWidth-2">Content 2</p>,
    <p key="fullWidth-3">Content 3</p>,
  ];

  const wrapTabs = [
    { label: 'Tab with a Very Long Label That Needs Wrapping' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];

  const wrapPanels = [
    <p key="wrap-1">Content 1</p>,
    <p key="wrap-2">Content 2</p>,
    <p key="wrap-3">Content 3</p>,
  ];

  return (
    <LayoutPanel 
      uri="/component/tabs"
      title="Tabs Component"
      description="Tabs in FRUI are React components that allow users to navigate between different content panels with internal state management."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Tabs</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#basic">
                    {_('Basic')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#scrollable">
                    {_('Scrollable')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#disabled">
                    {_('Disabled')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#vertical">
                    {_('Vertical')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#centered">
                    {_('Centered')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#fullWidth">
                    {_('FullWidth')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#wrap">
                    {_('Wrap')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#custom">
                    {_('Custom Styles')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
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

            {/* Basic Example */}
            <h2 id="basic" className="uppercase font-bold text-lg mt-8">Basic</h2>
            <p className="py-2">
              <Translate>
                A simple example of the Tabs component with three tabs.
              </Translate>
            </p>
            <div className="border border-gray-300 p-4 bg-transparent rounded-lg">
              <Tabs tabs={basicTabs} panels={basicPanels} />
            </div>
            <div>  
              <Code language="typescript" className="mt-2">
                {codeBasicExample}
              </Code>
            </div>

            {/* Scrollable Example */}
            <h2 id="scrollable" className="uppercase font-bold text-lg mt-8">Scrollable</h2>
            <p className="py-2">
              <Translate>
                Enables horizontal scrolling when there are more tabs than fit in the container.
              </Translate>
            </p>
            <div className="border border-gray-300 p-4 bg-transparent rounded-lg">
            <div className="flex justify-center">
              <div className="w-[300px] overflow-x-auto">
                <Tabs tabs={scrollableTabs} panels={scrollablePanels} scrollable={true} />
              </div>
            </div>
            </div>
            <div>  
              <Code language="typescript" className="mt-2">
                {codeScrollableExample}
              </Code>
            </div>

            {/* Disabled Example */}
            <h2 id="disabled" className="uppercase font-bold text-lg mt-8">Disabled</h2>
            <p className="py-2">
              <Translate>
                Disables a tab, making it unclickable and visually distinct.
              </Translate>
            </p>
            <div>
              <Tabs tabs={disabledTabs} panels={disabledPanels} />
              <Code language="typescript" className="mt-2">
                {codeDisabledExample}
              </Code>
            </div>

            {/* Icon Example */}
            <h2 id="icon" className="uppercase font-bold text-lg mt-8">Icons</h2>
            <p className="py-2">
              <Translate>
                Adds icons to tabs using the icon prop.
              </Translate>
            </p>
            <div>
              <Tabs tabs={iconTabs} panels={iconPanels} />
              <Code language="typescript" className="mt-2">
                {codeIconExample}
              </Code>
            </div>

            {/* Vertical Example */}
            <h2 id="vertical" className="uppercase font-bold text-lg mt-8">Vertical</h2>
            <p className="py-2">
              <Translate>
                Displays tabs vertically instead of horizontally.
              </Translate>
            </p>
            <div>
              <Tabs tabs={verticalTabs} panels={verticalPanels} vertical={true} />
              <Code language="typescript" className="mt-2">
                {codeVerticalExample}
              </Code>
            </div>

            {/* Centered Example */}
            <h2 id="centered" className="uppercase font-bold text-lg mt-8">Centered</h2>
            <p className="py-2">
              <Translate>
                Centers the tabs horizontally within the container.
              </Translate>
            </p>
            <div>
              <Tabs tabs={centeredTabs} panels={centeredPanels} centered={true} />
              <Code language="typescript" className="mt-2">
                {codeCenteredExample}
              </Code>
            </div>

            {/* FullWidth Example */}
            <h2 id="fullWidth"className="uppercase font-bold text-lg mt-8">FullWidth</h2>
            <p className="py-2">
              <Translate>
                Makes each tab take the full width of the container.
              </Translate>
            </p>
            <div>
              <Tabs tabs={fullWidthTabs} panels={fullWidthPanels} fullWidth={true} />
              <Code language="typescript" className="mt-2">
                {codeFullWidthExample}
              </Code>
            </div>

            {/* Wrap Example */}
            <h2 id="wrap" className="uppercase font-bold text-lg mt-8">Wrap</h2>
            <p className="py-2">
              <Translate>
                Allows long tab labels to wrap instead of being truncated.
              </Translate>
            </p>
            <div>
              <Tabs tabs={wrapTabs} panels={wrapPanels} wrap={true} />
              <Code language="typescript" className="mt-2">
                {codeWrapExample}
              </Code>
            </div>

            <h2 id="custom" className="uppercase font-bold text-lg mt-8">Custom Styles</h2>
            <p className="py-2">
              <Translate>
                You can add your own custom class to the alert component or use the
                <C value="frui-tab" r /> <C value="frui-tab-active" r /> 
                <C value="frui-tab-disabled" /> <C value="frui-tab-panels" /> CSS class.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component/table">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Table')}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}