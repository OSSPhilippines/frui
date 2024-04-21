//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Color from 'frui/dist/formats/Color';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'text-height', label: 'Formats', href: '/format' },
    { label: 'Color' }
  ];

  const props = [
    [ _('box'), _('boolean'), _('No'), _('Show color box') ],
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('lg'), _('boolean'), _('No'), _('Show large color box') ],
    [ _('md'), _('boolean'), _('No'), _('Show medium size color box') ],
    [ _('sm'), _('boolean'), _('No'), _('Show small color box') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('text'), _('boolean'), _('No'), _('Show color text') ],
    [ _('value'), _('string'), _('Yes'), _('Default value') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/format/color"
      title="Color Format"
      description="Color formats in FRUI, are ReactJS components that convert values to color displays."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Color')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <Link href="#props">
                  {_('Props')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#basic">
                  {_('Basics')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#customize">
                  {_('Customize')}
                </Link>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Color')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Color from 'frui/formats/Color';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Color value="salmon" />
              </div>
              <Code language="typescript">
                {`<Color value="salmon" />`}
              </Code>
            </div>

            <h2 id="customize" className="uppercase font-bold text-lg mt-8">
              {_('Customize')}
            </h2>
            <p className="py-4">
              <Translate>
                You can apply different sizes to the 
                <C l value="Color" /> format.
              </Translate>
            </p>

            <h3 className="font-semibold text-md mt-8">
              {_('Box')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="box" /> prop to hide the color box.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Color box={false} value="salmon" />
              </div>
              <Code language="typescript">
                {`<Color box={false} value="salmon" />`}
              </Code>
            </div>

            <h3 className="font-semibold text-md mt-8">
              {_('Sizes')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="sm" />, <C value="md" />, or <C value="lg" r /> 
                props to change the size of the color box.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Color lg value="salmon" />
              </div>
              <Code language="typescript">
                {`<Color lg value="salmon" />`}
              </Code>
            </div>

            <p className="py-4">
              <Translate>
                You can also add your own custom class to 
                <C l value="Color" /> format or use any combination of 
                <C l value="frui-format-color" />, and
                <C l value="frui-format-color-box" /> CSS classes.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/format">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Formats')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/format/country">
                {_('Country')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
