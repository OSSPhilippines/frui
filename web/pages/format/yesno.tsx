//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import Yesno from 'frui/format/Yesno';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'text-height', label: 'Formats', href: '/format' },
    { label: 'Yesno' }
  ];

  const props = [
    [ _('no'), _('string'), _('No'), _('Text for no') ],
    [ _('value'), _('string'), _('Yes'), _('Default value') ],
    [ _('yes'), _('string'), _('No'), _('Text for yes') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/format/yesno"
      title="Yesno Format"
      description="Yesno formats in FRUI, are ReactJS components that convert values to yes or no."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Yesno')}</Link>
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
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Yesno')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Yesno from 'frui/formats/Yesno';`}
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
                <Yesno value={true} yes="Yep" no="Nope" />
              </div>
              <Code language="typescript">
                {`<Yesno value={true} yes="Yep" no="Nope" />`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/format/text">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Text')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
