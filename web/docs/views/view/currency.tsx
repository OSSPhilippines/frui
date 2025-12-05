//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Currency from 'src/view/Currency.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/currency';
const title = 'Currency';
const description = 'Currency converts string values to currency displays.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'flag', 'boolean', 'No', 'Show flag' ],
  [ 'lg', 'boolean', 'No', 'Show large currency flag' ],
  [ 'md', 'boolean', 'No', 'Show medium size currency flag' ],
  [ 'sm', 'boolean', 'No', 'Show small currency flag' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'text', 'boolean', 'No', 'Show currency text' ],
  [ 'value', 'string', 'Yes', 'Default value' ]
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props } = Docs;

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
          {_('Currency Format')}
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
        {_('Currency Format')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Currency>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Currency from 'frui/view/Currency';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Currency value="USD" />
        </div>
        <Code language="typescript">
          {`<Currency value="USD" />`}
        </Code>
      </div>

      <h2 id="customize" className="uppercase font-bold text-lg mt-8">
        {_('Customize')}
      </h2>
      <p className="py-4">
        <Translate>
          You can apply different sizes to 
          the <C value="Currency" /> format.
        </Translate>
      </p>

      <h3 className="font-semibold text-md mt-8">
        {_('Flag')}
      </h3>
      <p className="py-4">
        <Translate>
          Use <C value="flag" /> prop to hide the currency flag.
        </Translate>
      </p>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Currency flag={false} value="USD" />
        </div>
        <Code language="typescript">
          {`<Currency flag={false} value="USD" />`}
        </Code>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Sizes')}
      </h3>
      <p className="py-4">
        <Translate>
          Use <C value="sm" />, <C value="md" />, or <C value="lg" r /> 
          props to change the size of the currency flag.
        </Translate>
      </p>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Currency lg value="USD" />
        </div>
        <Code language="typescript">
          {`<Currency lg value="USD" />`}
        </Code>
      </div>

      <p className="py-4">
        <Translate>
          You can also add your own custom class 
          to <C value="Currency" /> format or use any combination 
          of <C value="frui-format-country" />, 
          and <C value="frui-format-country-flag" /> CSS classes.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Currency>" /> format can be passed the 
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
