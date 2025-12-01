//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import CountryFormat from 'components/view/CountryFormat.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/country-format';
const title = 'Country Format';
const description = 'CountryFormat formats convert values to country displays.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'flag', 'boolean', 'No', 'Show flag' ],
  [ 'lg', 'boolean', 'No', 'Show large country flag' ],
  [ 'md', 'boolean', 'No', 'Show medium size country flag' ],
  [ 'sm', 'boolean', 'No', 'Show small country flag' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'text', 'boolean', 'No', 'Show country text' ],
  [ 'value', 'string', 'Yes', 'Default value' ]
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
          {_('Country Format')}
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
        {_('Country Format')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<CountryFormat>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import CountryFormat from 'frui/view/CountryFormat';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <CountryFormat value="US" />
        </div>
        <Code language="typescript">
          {`<CountryFormat value="US" />`}
        </Code>
      </div>

      <h2 id="customize" className="uppercase font-bold text-lg mt-8">
        {_('Customize')}
      </h2>
      <p className="py-4">
        <Translate>
          You can apply different sizes to the 
          <C value="CountryFormat" /> format.
        </Translate>
      </p>

      <h3 className="font-semibold text-md mt-8">
        {_('Flag')}
      </h3>
      <p className="py-4">
        <Translate>
          Use <C value="flag" /> prop to hide the country flag.
        </Translate>
      </p>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <CountryFormat flag={false} value="US" />
        </div>
        <Code language="typescript">
          {`<CountryFormat flag={false} value="US" />`}
        </Code>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Sizes')}
      </h3>
      <p className="py-4">
        <Translate>
          Use <C value="sm" />, <C value="md" />, or <C value="lg" r /> 
          props to change the size of the country flag.
        </Translate>
      </p>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <CountryFormat lg value="US" />
        </div>
        <Code language="typescript">
          {`<CountryFormat lg value="US" />`}
        </Code>
      </div>

      <p className="py-4">
        <Translate>
          You can also add your own custom class to 
          <C value="Country" /> format or use any combination of 
          <C value="frui-format-country" />, and
          <C value="frui-format-country-flag" /> CSS classes.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<CountryFormat>" /> format can be passed the 
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
