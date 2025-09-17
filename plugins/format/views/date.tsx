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
import Date from 'components/format/Date.js';

const crumbs: Crumb[] = [
  { icon: 'text-height', label: 'Formats', href: '/format' },
  { label: 'Date' }
];

const props = [
  [ 'format', 'string', 'No', 'Date format' ],
  [ 'locale', 'string', 'No', 'Localized settings' ],
  [ 'value', 'string|number|Date', 'Yes', 'Default value' ]
];

const examples = [
`<Date />                                  // 2024-04-21T15:27:42+08:00
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
<Date format="a" />                       // 5m`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/date">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 uppercase font-semibold">
              <a href="#top">{_('Date')}</a>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <a href="#props">
                  {_('Props')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#basic">
                  {_('Basics')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#customize">
                  {_('Customize')}
                </a>
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
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
              <div className="flex items-center justify-center p-3 theme-bg-1">
                <Date format="MMMM Do YYYY, h:mm a" value="2024-04-20" />
              </div>
              <Code language="typescript">
                {examples[0]}
              </Code>
            </div>

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/format/currency">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Currency')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/format/email">
                {_('Email')}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/format/date"
      title="Date Format"
      description="Date formats in FRUI, are ReactJS components that convert values to date displays."
      styles={styles}
    />
  );
}

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
}
