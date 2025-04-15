//types
import type { Crumb } from 'modules/components/Crumbs';

//hooks
import { useLanguage } from 'r22n';

//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Breadcrumb from 'frui/element/Breadcrumb';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

//constants
const codeBasic = `
const items = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Category', href: '/category' },
  { label: 'Item' },
];
<Breadcrumb items={items} />
`.trim();

const codeWithIcons = `
<Breadcrumb
  items={[
    { label: 'Dashboard', href: '/dashboard', icon: 'tachometer-alt' },
    { label: 'Settings', href: '/settings', icon: 'cog' },
    { label: 'Profile', icon: 'user' },
  ]}
/>
`.trim();

const codeColors = `
<Breadcrumb items={items} info />
<Breadcrumb items={items} warning />
<Breadcrumb items={items} success />
<Breadcrumb items={items} error />
<Breadcrumb items={items} muted />
`.trim();

const codeCustomSeparator = `
<Breadcrumb
  items={[
    { label: 'Home', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Article' },
  ]}
  separator={<span>/</span>}
/>
`.trim();

const codeSizes = `
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xs />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} sm />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} md />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} lg />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl2 />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl3 />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl4 />
<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl5 />
`.trim();

const codeCustomStylingHover = `
<Breadcrumb
  items={[
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'About', href: '/about' },
    { label: 'Contact' },
  ]}
  lg
  error
  className="custom-breadcrumb"
  style={{ border: '2px solid #FF3232', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '0.5rem' }}
/>

// In your CSS file:
.frui-breadcrumb.custom-breadcrumb .frui-breadcrumb-link:hover {
  text-decoration: underline;
  font-weight: bold;
  color: var(--error-hover, #D91A1A);
}
`.trim();

const codeCustomStylingNoHover = `
<Breadcrumb
  items={[
    { label: 'Shop', href: '/shop', icon: 'cart-shopping' },
    { label: 'Products', href: '/products' },
    { label: 'Details' },
  ]}
  xl
  success
  className="custom-breadcrumb-no-hover"
  style={{ backgroundColor: '#E6F5ED', borderRadius: '8px', padding: '0.75rem' }}
/>

// In your CSS file:
.frui-breadcrumb.custom-breadcrumb-no-hover .frui-breadcrumb-link,
.frui-breadcrumb.custom-breadcrumb-no-hover .frui-breadcrumb-label {
  text-decoration: none;
  color: var(--success, #00CC66);
}
`.trim();

export default function BreadcrumbPage() {
  //hooks
  const { _ } = useLanguage();

  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Breadcrumb' },
  ];

  const props = [
    [_('items'), 'Array<{ label: ReactNode, href?: string, icon?: string }>', 'Yes', 'Array of breadcrumb items with label (required), optional href for links, and Font Awesome icon name'],
    [_('separator'), 'ReactNode', 'No', 'Custom separator between items (defaults to chevron-right)'],
    [_('xs'), 'boolean', 'No', '12px text size'],
    [_('sm'), 'boolean', 'No', '14px text size'],
    [_('md'), 'boolean', 'No', '16px text size (default)'],
    [_('lg'), 'boolean', 'No', '18px text size'],
    [_('xl'), 'boolean', 'No', '20px text size'],
    [_('xl2'), 'boolean', 'No', '24px text size'],
    [_('xl3'), 'boolean', 'No', '30px text size'],
    [_('xl4'), 'boolean', 'No', '36px text size'],
    [_('xl5'), 'boolean', 'No', '48px text size'],
    [_('info'), 'boolean', 'No', 'Blue text color'],
    [_('warning'), 'boolean', 'No', 'Orange text color'],
    [_('success'), 'boolean', 'No', 'Green text color'],
    [_('error'), 'boolean', 'No', 'Red text color'],
    [_('muted'), 'boolean', 'No', 'Gray text color'],
    [_('className'), 'string', 'No', 'Additional CSS classes'],
    [_('style'), 'CSSProperties', 'No', 'Inline CSS styles'],
  ];

  const basicItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'Category', href: '/category' },
    { label: 'Item' },
  ];

  //render
  return (
    <LayoutPanel
      uri="/component/breadcrumb"
      title="Breadcrumb Component"
      description="Breadcrumb component in FRUI for navigation trails with interactive hover effects."
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
              <Link className="block pb-1" href="#top">Breadcrumb</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1"><Link href="#props">{_('Props')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#basic">{_('Basic Usage')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#with-icons">{_('With Icons')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#colors">{_('Colors')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#custom-separator">{_('Custom Separator')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#sizes">{_('Sizes')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#custom-styling-hover">{_('Custom Styling (With Hover)')}</Link></li>
                <li className="pl-3 pb-1"><Link href="#custom-styling-no-hover">{_('Custom Styling (No Hover)')}</Link></li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Breadcrumb')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Breadcrumb from 'frui/Breadcrumb';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basic Usage')}
            </h2>
            <p className="py-4">
              <Translate>A simple breadcrumb with links and the default separator.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <Breadcrumb items={basicItems} />
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="with-icons" className="uppercase font-bold text-lg mt-8">
              {_('With Icons')}
            </h2>
            <p className="py-4">
              <Translate>Breadcrumb with Font Awesome icons for each item.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <Breadcrumb
                  items={[
                    { label: 'Dashboard', href: '/dashboard', icon: 'tachometer-alt' },
                    { label: 'Settings', href: '/settings', icon: 'cog' },
                    { label: 'Profile', icon: 'user' },
                  ]}
                />
              </div>
              <Code language="typescript">
                {codeWithIcons}
              </Code>
            </div>

            <h2 id="colors" className="uppercase font-bold text-lg mt-8">
              {_('Colors')}
            </h2>
            <p className="py-4">
              <Translate>Color variants: info, warning, success, error, and muted.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1 flex flex-col gap-2">
                <Breadcrumb items={basicItems} info />
                <Breadcrumb items={basicItems} warning />
                <Breadcrumb items={basicItems} success />
                <Breadcrumb items={basicItems} error />
                <Breadcrumb items={basicItems} muted />
              </div>
              <Code language="typescript">
                {codeColors}
              </Code>
            </div>

            <h2 id="custom-separator" className="uppercase font-bold text-lg mt-8">
              {_('Custom Separator')}
            </h2>
            <p className="py-4">
              <Translate>Custom separators replace the default chevron-right.</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '#' },
                    { label: 'Blog', href: '#' },
                    { label: 'Article' },
                  ]}
                  separator={<span>/</span>}
                />
              </div>
              <Code language="typescript">
                {codeCustomSeparator}
              </Code>
            </div>

            <h2 id="sizes" className="uppercase font-bold text-lg mt-8">
              {_('Sizes')}
            </h2>
            <p className="py-4">
              <Translate>Size variants from xs (12px) to xl5 (48px).</Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1 flex flex-col gap-2">
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xs />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} sm />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} md />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} lg />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl2 />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl3 />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl4 />
                <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Item' }]} xl5 />
              </div>
              <Code language="typescript">
                {codeSizes}
              </Code>
            </div>

            <h2 id="custom-styling-hover" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styling (With Hover)')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the breadcrumb component or use any combination of the following CSS classes: <C value="frui-breadcrumb" />, <C value="frui-breadcrumb-link" />, <C value="frui-breadcrumb-label" />, <C value="frui-breadcrumb-separator" /> with hover effects.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <Breadcrumb
                  items={[
                    { label: 'Home', href: '/', icon: 'home' },
                    { label: 'About', href: '/about' },
                    { label: 'Contact' },
                  ]}
                  lg
                  error
                  className="custom-breadcrumb"
                  style={{ border: '2px solid #FF3232', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '0.5rem' }}
                />
              </div>
              <Code language="typescript">
                {codeCustomStylingHover}
              </Code>
            </div>

            <h2 id="custom-styling-no-hover" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styling (No Hover)')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to the breadcrumb component or use any combination of the following CSS classes: <C value="frui-breadcrumb" />, <C value="frui-breadcrumb-link" />, <C value="frui-breadcrumb-label" />, <C value="frui-breadcrumb-separator" /> without hover effects.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="p-3 bg-b1">
                <Breadcrumb
                  items={[
                    { label: 'Shop', href: '/shop', icon: 'cart-shopping' },
                    { label: 'Products', href: '/products' },
                    { label: 'Details' },
                  ]}
                  xl
                  success
                  className="custom-breadcrumb-no-hover"
                  style={{ backgroundColor: '#E6F5ED', borderRadius: '8px', padding: '0.75rem' }}
                />
              </div>
              <Code language="typescript">
                {codeCustomStylingNoHover}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component/button">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Button')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/pagination">
                {_('Pagination')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}