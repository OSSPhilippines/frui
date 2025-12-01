//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import DateFormat from 'components/view/DateFormat.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/date-format';
const title = 'Date Format';
const description = 'DateFormat formats convert values to date displays.';

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

const { C, Code, Props, Preview } = Docs;

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
          {_('Date Format')}
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
        {_('Date Format')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<DateFormat>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import DateFormat from 'frui/view/DateFormat';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <DateFormat value="2024-04-20" />
        </div>
        <Code language="typescript">
          {`<DateFormat value="2024-04-20" />`}
        </Code>
      </div>

      <h2 id="customize" className="uppercase font-bold text-lg mt-8">
        {_('Customize')}
      </h2>
      <p className="py-4">
        <Translate>
          You can apply different locales and formats to the 
          <C  value="DateFormat" /> format.
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
          <DateFormat format="MMMM Do YYYY, h:mm a" value="2024-04-20" />
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
            The <C value="<DateFormat>" /> format can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <Docs.Foot/>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <Docs.Head
      uri={uri}
      title={title}
      description={description}
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <Docs pathname={uri}>
      <Menu />
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;
