//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Date from 'components/format/Date.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

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

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="text-height" href="/format">
        Formats
      </Bread.Crumb>
      <Bread.Crumb>Date</Bread.Crumb>
    </Bread>
  );
};

/**
 * Aside right menu component
 */
export function Menu() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <aside className={
      'hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 '
      + 'border-l theme-bc-1 text-sm'
    }>
      <h4 className={
        'p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase '
        + 'font-semibold'
      }>
        {_('Contents')}
      </h4>
      <div className="p-3">
        <a className="block pb-1 font-bold" href="#top">
          {_('Date')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styles">{_('Global Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Examples component
 */
export function Examples() {
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Example */}
      <Preview 
        height={100}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          TODO
        </Preview.Example>
        <Preview.Code>{''}</Preview.Code>
      </Preview>
    </div>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Date')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the date format like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Date from 'frui/format/Date';`}
        </Code>
      </div>

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
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Date>" /> format can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
        <a className="theme-2" href="/format/currency">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Currency')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/format/email">
          {_('Email')}
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
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
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/format/date">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
