//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Badge from 'frui/dist/Badge';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Badges' }
  ];
  const props = [
    [ _('color'), _('string'), _('No'), _('Custom CSS hex or name') ],
    [ _('info'), _('boolean'), _('No'), _('Blue badge') ],
    [ _('warning'), _('boolean'), _('No'), _('Orange badge') ],
    [ _('error'), _('boolean'), _('No'), _('Red badge') ],
    [ _('success'), _('boolean'), _('No'), _('Green badge') ],
    [ _('muted'), _('boolean'), _('No'), _('Gray badge') ],
    [ _('solid'), _('boolean'), _('No'), _('Fills badge with color') ],
    [ _('outline'), _('boolean'), _('No'), _('Border and text with color') ],
    [ _('curved'), _('boolean'), _('No'), _('Slight curved corners') ],
    [ _('rounded'), _('boolean'), _('No'), _('Rounded corners') ],
    [ _('pill'), _('boolean'), _('No'), _('Max rounded corners') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('className'), _('string'), _('No'), _('Standard class name input') ],
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-52 border-l border-b1">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Badges</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#types">
                    {_('Types')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#custom">
                    {_('Custom Color')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#rounded">
                    {_('Rounded')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#styles">
                    {_('Custom Styles')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="lg:absolute top-0 bottom-0 left-0 right-52 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 className="flex items-center uppercase font-bold text-xl">
              {_('Badges')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Alert from 'frui/Alert';`}
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
              <div className="flex items-center justify-center p-3 bg-b1">
                <Badge info className="text-xs">123</Badge>
              </div>
              <Code language="typescript">
                {`<Badge info className="text-xs">123</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Badge warning className="text-xs">234</Badge>
              </div>
              <Code language="typescript">
                {`<Badge warning className="text-xs">234</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Badge success className="text-xs">345</Badge>
              </div>
              <Code language="typescript">
                {`<Badge success className="text-xs">345</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Badge error className="text-xs">456</Badge>
              </div>
              <Code language="typescript">
                {`<Badge error className="text-xs">456</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
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
              <div className="flex items-center justify-center p-3 bg-b1">
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
              <div className="flex items-center justify-center p-3 bg-b1">
                <Badge info curved className="text-xs">789</Badge>
              </div>
              <Code language="typescript">
                {`<Badge info curved className="text-xs">789</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Badge warning rounded className="text-xs">890</Badge>
              </div>
              <Code language="typescript">
                {`<Badge warning rounded className="text-xs">890</Badge>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
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

            <div className="flex items-center border-t border-b1 my-8 pt-8">
              <Link className="text-t2" href="/component/alert">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Alerts')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/button">
                {_('Buttons')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
