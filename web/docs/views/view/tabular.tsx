//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';
//frui
import Tabular from 'src/view/Tabular.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/tabular';
const title = 'Tabular';
const description = 'Tabular converts an array of objects '
  + 'into a table display.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names applied to all cells' ],
  [ 'stripe', '[string, string, string]', 'No', 'Background color settings for head and rows' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object applied to all cells' ],
  [ 'value', 'string', 'Yes', 'Default value' ],
];

const examples = [
`<Table 
  value={[
    { id: 1, name: 'John Doe', age: 30, created: '2021-01-01' },
    { id: 2, name: 'Jane Doe', age: 25, created: '2021-01-02' }
  ]} 
  stripes={['#999999', '#EFEFEF', '#CCCCCC']} 
/>`
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
          {_('Table Format')}
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
        {_('Table Format')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="<Tabular>" /> component as shown below.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Tabular from 'frui/view/Tabular';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <p>
        <Translate>
          The header values are based on the keys of the first row.
        </Translate>
      </p>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <div className="text-left text-black w-full">
            <Tabular 
              value={[
                { id: 1, name: 'John Doe', age: 30, created: '2021-01-01' },
                { id: 2, name: 'Jane Doe', age: 25, created: '2021-01-02' }
              ]} 
              stripes={['#999999', '#EFEFEF', '#CCCCCC']} 
            />
          </div>
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
            The <C value="<Tabular>" /> format can be passed the 
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
