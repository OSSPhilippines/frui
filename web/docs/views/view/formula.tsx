//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Formula from 'src/view/Formula.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/formula';
const title = 'Formula';
const description = 'Formula computes values using formula templates.';

const props = [
  [ 'data', 'string', 'No', 'Variables of the formula' ],
  [ 'formula', 'string', 'Yes', 'Formula template' ],
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
          {_('Formula')}
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
        {_('Formula')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Formula>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Formula from 'frui/view/Formula';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Formula value="29" formula="{x} + {this} + {y}" data={{ x: 4, y: 5 }} />
        </div>
        <Code language="typescript">
          {`<Formula value="29" formula="{x} + {this} + {y}" data={{ x: 4, y: 5 }} />`}
        </Code>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Formula>" /> format can be passed the 
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
