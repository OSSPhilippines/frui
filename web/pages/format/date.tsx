//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Date from 'frui/dist/formats/Date';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeFormat = `
<Date />                                  // 2024-04-21T15:27:42+08:00
<Date format="MMMM Do YYYY, h:mm:ss a" /> // April 21st 2024, 3:27:14 pm
<Date format="dddd" />                    // Sunday
<Date format="MMM Do YY" />               // Apr 21st 24
<Date format="YYYY [escaped] YYYY" />     // 2024 escaped 2024
<Date format="LT" />                      // 3:24 PM
<Date format="LTS" />                     // 3:24:21 PM
<Date format="L" />                       // 04/21/2024
<Date format="l" />                       // 4/21/2024
<Date format="LL" />                      // April 21, 2024
<Date format="ll" />                      // Apr 21, 2024
<Date format="LLL" />                     // April 21, 2024 3:24 PM
<Date format="lll" />                     // Apr 21, 2024 3:24 PM
<Date format="LLL" />                     // Sunday, April 21, 2024 3:24 PM
<Date format="llll" />                    // Sun, Apr 21, 2024 3:26 PM
<Date format="ago" />                     // 5 minutes ago
<Date format="a" />                       // 5m
`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'text-height', label: 'Formats', href: '/format' },
    { label: 'Date' }
  ];

  const props = [
    [ _('format'), _('string'), _('No'), _('Date format') ],
    [ _('locale'), _('string'), _('No'), _('Localized settings') ],
    [ _('value'), _('string|number|Date'), _('Yes'), _('Default value') ],
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Date')}</Link>
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
              {_('Date')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Date from 'frui/formats/Date';`}
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
                <Date value="2024-04-20" />
              </div>
              <Code language="typescript">
                {`<Date value="2024-04-20" />`}
              </Code>
            </div>

            <h2 id="customize" className="uppercase font-bold text-lg mt-8">
              {_('Customize')}
            </h2>
            <p className="py-4">
              <Translate>
                You can apply different locales and formats to the 
                <C l value="Date" /> format.
              </Translate>
            </p>

            <h3 className="font-semibold text-md mt-8">
              {_('Format')}
            </h3>
            <p className="py-4">
              <Translate>
                Use <C value="format" /> prop to format the date output.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Date format="MMMM Do YYYY, h:mm a" value="2024-04-20" />
              </div>
              <Code language="typescript">
                {codeFormat}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/format/currency">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Currency')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/format/email">
                {_('Email')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
