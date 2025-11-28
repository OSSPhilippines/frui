//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import CodeHighlighter from 'components/view/CodeHighlighter.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view/code-highlighter';
const title = 'Code Highlighter Format';
const description = 'CodeHighlighter blocks with syntax highlighting and copy functionality.';

const props = [
  [ 'children', 'string', 'Yes', 'Get code from children' ],
  [ 'language', 'string', 'Yes', 'Set programming language' ],
  [ 'copy', 'boolean', 'No', 'Show copy button' ],
  [ 'copyFunction', 'function', 'No', 'Additional behavior for copy button' ],
  [ 'className', 'string', 'No', 'Additional classes to the code block' ],
  [ 'inline', 'boolean', 'No', 'Inline code block' ],
  [ 'numbers', 'boolean', 'No', 'Show line numbers' ],
  [ 'syntaxStyle', 'React Object', 'No', 'Custom syntax style' ],
  [ 'quote', 'boolean', 'No', 'Wrap inline code block in quotes' ]
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
          {_('Code Highlighter')}
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
        {_('Code Highlighter')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the <C value="CodeHighlighter" /> component as shown below.
          </Translate>
        </p>
        <CodeHighlighter language="typescript" className="mt-2">
          {`import CodeHighlighter from 'frui/view/CodeHighlighter';`}
        </CodeHighlighter>
      </div>

      <h2 id="basics" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <CodeHighlighter language="python">
              {'print("Hello, world!")'}
            </CodeHighlighter>
          </Preview.Example>
          <Preview.Code>
            {`<Code language="python">\n  print("Hello, world!")\n</Code>`}
          </Preview.Code>
        </Preview>

        <p className="py-4">
          <Translate>
            Defining a code block requires passing 
            a <C value="language" /> prop to the component.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <CodeHighlighter language="ts">{`attributes: [Object object]`}</CodeHighlighter>
          </Preview.Example>
          <Preview.Code>
            {`<CodeHighlighter>{\`attributes: [Object object]\`}</CodeHighlighter>`}
          </Preview.Code>
        </Preview>
        <p className="py-4">
          <Translate>
            Not supplying a <C value="language" /> prop will instead create
            an inline component.
          </Translate>
        </p>
      </div>

      <h2 id='customize' className='uppercase font-bold text-lg mt-8'>
        {_('Customize')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can use different languages for a code block.
          </Translate>
        </p>

        <h3 className="font-semibold text-md mt-8">{_('Line Numbers')}</h3>
        <p className="py-4">
          <Translate>
            Line numbers can be added to a code block by passing the{' '}
            <C value="numbers" /> prop.
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <CodeHighlighter language="typescript" numbers>
              {`console.log("Hello, world!");`}
            </CodeHighlighter>
          </Preview.Example>
          <Preview.Code>
            {`<Code language="typescript" numbers>\n  console.log("Hello, world!");\n</Code>`}
          </Preview.Code>
        </Preview>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<CodeHighlighter>" /> format can be passed the 
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
