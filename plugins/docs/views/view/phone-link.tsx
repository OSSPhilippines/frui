//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import PhoneLink from 'components/view/PhoneLink.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/phone-link';
const title = 'Phone Link Format';
const description = 'PhoneLink formats convert values to clickable phone displays.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
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
          {_('Phone Link')}
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
        {_('Phone Link')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="PhoneLink" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import PhoneLink from 'frui/view/PhoneLink';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <PhoneLink className="theme-2" value="+1 (410) 555-2424" />
        </div>
        <Code language="typescript">
          {`<PhoneLink className="theme-2" value="+1 (410) 555-2424" />`}
        </Code>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<PhoneLink>" /> format can be passed the 
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
