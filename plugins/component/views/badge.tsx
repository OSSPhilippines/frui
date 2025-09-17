import { useLanguage, Translate } from 'r22n';

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

import Badge from 'components/element/Badge.js';

//variables
const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Badge' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red badge' ],
  [ 'info', 'boolean', 'No', 'Blue badge' ],
  [ 'muted', 'boolean', 'No', 'Gray badge' ],
  [ 'outline', 'boolean', 'No', 'Border and text with color' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'solid', 'boolean', 'No', 'Fills badge with color' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'success', 'boolean', 'No', 'Green badge' ],
  [ 'warning', 'boolean', 'No', 'Orange badge' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/component/badge">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <a className="block pb-1" href="#top">Badge</a>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <a href="#props">
                    {_('Props')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#types">
                    {_('Types')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#custom">
                    {_('Custom Color')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#rounded">
                    {_('Rounded')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#styles">
                    {_('Custom Styles')}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 className="flex items-center uppercase font-bold text-xl">
              {_('Badge')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Badge from 'frui/Badge';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="types" className="uppercase font-bold text-lg mt-8">
              {_('Types')}
            </h2>
            <p className="py-4">
              <Translate>
                Badges have the following types: <C value="info" />, 
                <C l value="warning" />, <C value="success" />, 
                <C l value="error" />, and <C value="muted" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge info className="text-xs">123</Badge>
              </div>
              <Code language="typescript">
                {`<Badge info className="text-xs">123</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge warning className="text-xs">234</Badge>
              </div>
              <Code language="typescript">
                {`<Badge warning className="text-xs">234</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge success className="text-xs">345</Badge>
              </div>
              <Code language="typescript">
                {`<Badge success className="text-xs">345</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge error className="text-xs">456</Badge>
              </div>
              <Code language="typescript">
                {`<Badge error className="text-xs">456</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge muted className="text-xs">567</Badge>
              </div>
              <Code language="typescript">
                {`<Badge muted className="text-xs">567</Badge>`}
              </Code>
            </div>

            <h2 id="custom" className="uppercase font-bold text-lg mt-8">
              {_('Custom Color')}
            </h2>
            <p className="py-4">
              <Translate>
                Badges can have custom CSS compatible colors which 
                includes hex and color names.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge color="salmon" className="text-xs">678</Badge>
              </div>
              <Code language="typescript">
                {`<Badge color="salmon" className="text-xs">678</Badge>`}
              </Code>
            </div>

            <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
              {_('Rounded')}
            </h2>
            <p className="py-4">
              <Translate>
                Badges can be rounded in three ways: <C value="curved" />, <C 
                  value="rounded" 
                />, and <C value="pill" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge info curved className="text-xs">789</Badge>
              </div>
              <Code language="typescript">
                {`<Badge info curved className="text-xs">789</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge warning rounded className="text-xs">890</Badge>
              </div>
              <Code language="typescript">
                {`<Badge warning rounded className="text-xs">890</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Badge success pill className="text-xs">901</Badge>
              </div>
              <Code language="typescript">
                {`<Badge success pill className="text-xs">901</Badge>`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the badge component 
                or use the <C value="frui-badge" /> CSS class.
              </Translate>
            </p>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/component/alert">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Alerts')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/component/button">
                {_('Buttons')}
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
      uri="/component/badge"
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
