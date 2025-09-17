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

import Button from 'components/form/Button.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Button' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'block', 'boolean', 'No', 'button display block' ],
  [ 'color', 'string', 'No', 'Custom CSS hex or name' ],
  [ 'curved', 'boolean', 'No', 'Slight curved corners' ],
  [ 'error', 'boolean', 'No', 'Red badge' ],
  [ 'full', 'boolean', 'No', 'button width 100%' ],
  [ 'info', 'boolean', 'No', 'Blue badge' ],
  [ 'muted', 'boolean', 'No', 'Gray badge' ],
  [ 'outline', 'boolean', 'No', 'Border and text with color' ],
  [ 'pill', 'boolean', 'No', 'Max rounded corners' ],
  [ 'solid', 'boolean', 'No', 'Fills badge with color' ],
  [ 'success', 'boolean', 'No', 'Green badge' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS input' ],
  [ 'warning', 'boolean', 'No', 'Orange badge' ],
  [ 'rounded', 'boolean', 'No', 'Rounded corners' ],
  [ 'xs', 'boolean', 'No', 'Extra small button' ],
  [ 'sm', 'boolean', 'No', 'Small button' ],
  [ 'md', 'boolean', 'No', 'Medium button' ],
  [ 'lg', 'boolean', 'No', 'Large button' ],
  [ 'xl', 'boolean', 'No', 'Extra large button' ],
  [ 'xl2', 'boolean', 'No', 'XXL button' ],
  [ 'xl3', 'boolean', 'No', 'XXXL button' ],
  [ 'xl4', 'boolean', 'No', 'XXXXL button' ],
  [ 'xl5', 'boolean', 'No', 'XXXXXL button' ]
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/component/button">
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
              <a className="block pb-1" href="#top">Button</a>
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
                  <a href="#stretch">
                    {_('Stretch')}
                  </a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#size">
                    {_('Sizes')}
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button info>Submit Info</Button>
              </div>
              <Code language="typescript">
                {`<Button info>Submit Info</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button warning>Submit Warning</Button>
              </div>
              <Code language="typescript">
                {`<Button warning>Submit Warning</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button success>Submit Success</Button>
              </div>
              <Code language="typescript">
                {`<Button success>Submit Success</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button error>Submit Error</Button>
              </div>
              <Code language="typescript">
                {`<Button error>Submit Error</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button info curved>Submit Curved</Button>
              </div>
              <Code language="typescript">
                {`<Button info curved>Submit Curved</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button warning rounded>Submit Rounded</Button>
              </div>
              <Code language="typescript">
                {`<Button warning rounded>Submit Rounded</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button info xs pill className="text-xs">Submit Extra Small</Button>
              </div>
              <Code language="typescript">
                {`<Button info xs pill className="text-xs">Submit Extra Small</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button warning sm pill className="text-sm">Submit Small</Button>
              </div>
              <Code language="typescript">
                {`<Button warning sm pill className="text-sm">Submit Small</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button success md pill className="text-md">Submit Medium</Button>
              </div>
              <Code language="typescript">
                {`<Button success md pill className="text-md">Submit Medium</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button error lg pill className="text-lg">Submit Large</Button>
              </div>
              <Code language="typescript">
                {`<Button error lg pill className="text-lg">Submit Large</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button muted xl pill className="text-xl">Submit Extra Large</Button>
              </div>
              <Code language="typescript">
                {`<Button muted xl pill className="text-xl">Submit Extra Large</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button info xl2 pill className="text-2xl">Submit XXL</Button>
              </div>
              <Code language="typescript">
                {`<Button info xl2 pill className="text-2xl">Submit XXL</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button warning xl3 pill className="text-3xl">Submit XXXL</Button>
              </div>
              <Code language="typescript">
                {`<Button warning xl3 pill className="text-3xl">Submit XXXL</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Button success xl4 pill className="text-4xl">Submit IVL</Button>
              </div>
              <Code language="typescript">
                {`<Button success xl4 pill className="text-4xl">Submit IVL</Button>`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-5">
              <div className="flex items-center justify-center p-3 theme-bg-1">
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

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/component/badge">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Badges')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/component/loader">
                {_('Loaders')}
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
      uri="/component/button"
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
