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
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Tags' }
  ];
  const props = [
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
              <Link className="block pb-1" href="#top">Tags</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="lg:absolute top-0 bottom-0 left-0 right-52 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 className="flex items-center uppercase font-bold text-xl">
              {_('Tags')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Taglist from 'frui/field/Taglist';`}
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

            <div className="flex items-center border-t border-b1 my-8 pt-8">
              <Link className="text-t2" href="/field/option">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Options')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/textarea">
                {_('Textareas')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
