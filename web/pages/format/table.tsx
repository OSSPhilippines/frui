//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { Translate, useLanguage } from 'r22n';
//components
import Link from 'next/link';
import Table from 'frui/dist/formats/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code from 'modules/components/Code';

const codeBasic = `
<Table 
  value={[
    { id: 1, name: 'John Doe', age: 30, created: '2021-01-01' },
    { id: 2, name: 'Jane Doe', age: 25, created: '2021-01-02' }
  ]} 
  stripes={['#999999', '#EFEFEF', '#CCCCCC']} 
/>`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'text-height', label: 'Formats', href: '/format' },
    { label: 'Table' }
  ];

  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names applied to all cells') ],
    [ _('stripe'), _('[string, string, string]'), _('No'), _('Background color settings for head and rows') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object applied to all cells') ],
    [ _('value'), _('string'), _('Yes'), _('Default value') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/format/table"
      title="Table Format"
      description="Table formats in FRUI, are ReactJS components that format values into a table."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Table')}</Link>
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
              {_('Table')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Table from 'frui/formats/Table';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p>
              <Translate>
                The header values are based on the keys of the first row.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="text-left text-black w-full">
                  <Table 
                    value={[
                      { id: 1, name: 'John Doe', age: 30, created: '2021-01-01' },
                      { id: 2, name: 'Jane Doe', age: 25, created: '2021-01-02' }
                    ]} 
                    stripes={['#999999', '#EFEFEF', '#CCCCCC']} 
                  />
                </div>
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/format/separated">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Separated')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/format/taglist">
                {_('Taglist')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
