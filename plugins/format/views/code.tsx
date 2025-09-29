//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Code from 'components/format/Code.js';
import { notify } from 'components/element/Notifier.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props,
  C,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

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
      <Bread.Crumb>Code</Bread.Crumb>
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
          {_('Code')}
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
        {_('Code')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the code format like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Code from 'frui/format/Code';`}
        </Code>
      </div>

      <h2 id="basics" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Code language="python">{'print("Hello, world!")'}</Code>
        </div>
        <Code
          copy
          numbers
          language="ts"
          onCopy={() => {
            notify('success', _('Copied to clipboard'));
          }}
        >
          {`<Code language="python">\n  print("Hello, world!")\n</Code>`}
        </Code>

        <p className="py-4">
          <Translate>
            Defining a code block requires passing a <Code>language</Code>{' '}
            prop to the component.
          </Translate>
        </p>

        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Code language="ts">{`attributes: [Object object]`}</Code>
        </div>
        <Code
          copy
          numbers
          language="ts"
          onCopy={() => {
            notify('success', _('Copied to clipboard'));
          }}
        >
          {`<Code>{\`attributes: [Object object]\`}</Code>`}
        </Code>

        <p className="py-4">
          <Translate>
            Not supplying a <Code>language</Code> prop will instead create
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
            <Code>numbers</Code> prop.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Code language="typescript" numbers>
              {`console.log("Hello, world!");`}
            </Code>
          </div>
          <Code
            copy
            numbers
            language="ts"
            onCopy={() => {
              notify('success', _('Copied to clipboard'));
            }}
          >
            {`<Code language="typescript" numbers>\n  console.log("Hello, world!");\n</Code>`}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">{_('Copy Button')}</h3>
        <p className="py-4">
          <Translate>
            A copy button can be added to a code block by passing the{' '}
            <Code>copy</Code> prop. To customize the behavior of the copy
            button, you can pass a function to the <Code>onCopy</Code> prop.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Code
              language="typescript"
              copy
              onCopy={() => alert('Code copied!')}
            >
              {'console.log("Hello, world!");'}
            </Code>
          </div>
          <Code
            copy
            numbers
            language="ts"
            onCopy={() => {
              notify('success', _('Copied to clipboard'));
            }}
          >
            {`<Code language="typescript"\n  copy onCopy={() => alert("Code copied!")}\n>\n  console.log("Hello, world!");\n</Code>`}
          </Code>
        </div>
      </div>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<Code>" /> component can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
        <a className="theme-2" href="/format">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Formats')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/format/color">
          {_('Color')}
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
      uri="/format/code"
      title="Code Block"
      description="Code blocks in FRUI are ReactJS components that contain code."
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
      <LayoutPanel pathname="/format/code">
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
