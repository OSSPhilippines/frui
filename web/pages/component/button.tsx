//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Button from 'frui/element/Button';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Page() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Button' }
  ];
  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('block'), _('boolean'), _('No'), _('button display block') ],
    [ _('color'), _('string'), _('No'), _('Custom CSS hex or name') ],
    [ _('curved'), _('boolean'), _('No'), _('Slight curved corners') ],
    [ _('error'), _('boolean'), _('No'), _('Red badge') ],
    [ _('full'), _('boolean'), _('No'), _('button width 100%') ],
    [ _('info'), _('boolean'), _('No'), _('Blue badge') ],
    [ _('muted'), _('boolean'), _('No'), _('Gray badge') ],
    [ _('outline'), _('boolean'), _('No'), _('Border and text with color') ],
    [ _('pill'), _('boolean'), _('No'), _('Max rounded corners') ],
    [ _('solid'), _('boolean'), _('No'), _('Fills badge with color') ],
    [ _('success'), _('boolean'), _('No'), _('Green badge') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('warning'), _('boolean'), _('No'), _('Orange badge') ],
    [ _('rounded'), _('boolean'), _('No'), _('Rounded corners') ],
    [ _('xs'), _('boolean'), _('No'), _('Extra small button') ],
    [ _('sm'), _('boolean'), _('No'), _('Small button') ],
    [ _('md'), _('boolean'), _('No'), _('Medium button') ],
    [ _('lg'), _('boolean'), _('No'), _('Large button') ],
    [ _('xl'), _('boolean'), _('No'), _('Extra large button') ],
    [ _('xl2'), _('boolean'), _('No'), _('XXL button') ],
    [ _('xl3'), _('boolean'), _('No'), _('XXXL button') ],
    [ _('xl4'), _('boolean'), _('No'), _('XXXXL button') ],
    [ _('xl5'), _('boolean'), _('No'), _('XXXXXL button') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/component/button"
      title="Button Component"
      description="Buttons in FRUI, are ReactJS components used to submit forms and start call-to-actions."
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
              <Link className="block pb-1" href="#top">Button</Link>
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
                  <Link href="#stretch">
                    {_('Stretch')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#size">
                    {_('Sizes')}
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
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 className="flex items-center uppercase font-bold text-xl">
              {_('Button')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Button from 'frui/Button';`}
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
                Buttons have the following types: <C value="info" />, 
                <C l value="warning" />, <C value="success" />, 
                <C l value="error" />, and <C value="muted" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button info>Submit Info</Button>
              </div>
              <Code language="typescript">
                {`<Button info>Submit Info</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button warning>Submit Warning</Button>
              </div>
              <Code language="typescript">
                {`<Button warning>Submit Warning</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button success>Submit Success</Button>
              </div>
              <Code language="typescript">
                {`<Button success>Submit Success</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button error>Submit Error</Button>
              </div>
              <Code language="typescript">
                {`<Button error>Submit Error</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button muted>Submit Muted</Button>
              </div>
              <Code language="typescript">
                {`<Button muted>Submit Muted</Button>`}
              </Code>
            </div>

            <h2 id="custom" className="uppercase font-bold text-lg mt-8">
              {_('Custom Color')}
            </h2>
            <p className="py-4">
              <Translate>
                Buttons can have custom CSS compatible colors which 
                includes hex and color names.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button color="salmon">Submit Custom</Button>
              </div>
              <Code language="typescript">
                {`<Button color="salmon">Submit Custom</Button>`}
              </Code>
            </div>
            
            <h2 id="rounded" className="uppercase font-bold text-lg mt-8">
              {_('Rounded')}
            </h2>
            <p className="py-4">
              <Translate>
                Buttons can be rounded in three ways: <C value="curved" />, 
                <C l value="rounded" />, and <C value="pill" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button info curved>Submit Curved</Button>
              </div>
              <Code language="typescript">
                {`<Button info curved>Submit Curved</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button warning rounded>Submit Rounded</Button>
              </div>
              <Code language="typescript">
                {`<Button warning rounded>Submit Rounded</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button success pill>Submit Pill</Button>
              </div>
              <Code language="typescript">
                {`<Button success pill>Submit Pill</Button>`}
              </Code>
            </div>

            <h2 id="stretch" className="uppercase font-bold text-lg mt-8">
              {_('Stretch')}
            </h2>
            <p className="py-4">
              <Translate>
                Buttons have two stretching options: Turning it into a 
                <C l value="block" />, and/or stretch the width to 
                <C l value="full" />. 
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button info block full pill>Submit Block</Button>
              </div>
              <Code language="typescript">
                {`<Button info block full pill>Submit Block</Button>`}
              </Code>
            </div>

            <h2 id="size" className="uppercase font-bold text-lg mt-8">
              {_('Sizes')}
            </h2>
            <p className="py-4">
              <Translate>
                Buttons have sizes including: <C value="xs" />, 
                <C l value="sm" />, <C value="md" />, <C value="lg" />, 
                <C l value="xl" />, <C value="xl2" />, <C value="xl3" />, 
                <C l value="xl4" />, and <C value="xl5" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button info xs pill className="text-xs">Submit Extra Small</Button>
              </div>
              <Code language="typescript">
                {`<Button info xs pill className="text-xs">Submit Extra Small</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button warning sm pill className="text-sm">Submit Small</Button>
              </div>
              <Code language="typescript">
                {`<Button warning sm pill className="text-sm">Submit Small</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button success md pill className="text-md">Submit Medium</Button>
              </div>
              <Code language="typescript">
                {`<Button success md pill className="text-md">Submit Medium</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button error lg pill className="text-lg">Submit Large</Button>
              </div>
              <Code language="typescript">
                {`<Button error lg pill className="text-lg">Submit Large</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button muted xl pill className="text-xl">Submit Extra Large</Button>
              </div>
              <Code language="typescript">
                {`<Button muted xl pill className="text-xl">Submit Extra Large</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button info xl2 pill className="text-2xl">Submit XXL</Button>
              </div>
              <Code language="typescript">
                {`<Button info xl2 pill className="text-2xl">Submit XXL</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button warning xl3 pill className="text-3xl">Submit XXXL</Button>
              </div>
              <Code language="typescript">
                {`<Button warning xl3 pill className="text-3xl">Submit XXXL</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button success xl4 pill className="text-4xl">Submit IVL</Button>
              </div>
              <Code language="typescript">
                {`<Button success xl4 pill className="text-4xl">Submit IVL</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Button error xl5 pill className="text-5xl">Submit VL</Button>
              </div>
              <Code language="typescript">
                {`<Button error xl5 pill className="text-5xl">Submit VL</Button>`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the button component 
                or use the <C value="frui-btn" /> CSS class.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component/badge">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Badges')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/loader">
                {_('Loaders')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
