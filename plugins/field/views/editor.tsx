//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';
import { languages } from '@codemirror/language-data';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import CodeEditor from 'components/field/CodeEditor.js';
import Select from 'components/field/Select.js';

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
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Default value (uncontrolled)' ],
  [ 'extensions', 'Object[]', 'No', 'Set of CodeMirror extensions that can be added' ],
  [ 'language', 'string', 'No', 'Language to use' ],
  [ 'name', 'string', 'No', 'Used for React Server Components.' ],
  [ 'numbers', 'boolean', 'No', 'Toggle line numbers (defaults to false; ineffective when using basic setup).' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Event handler when value updates' ],
  [ 'setup', 'string', 'No', "CodeMirror setup options ('minimal' | 'basic' | 'custom')" ],
  [ 'value', 'string', 'No', 'Default value (controlled)' ]
];

const examples = [
//0
`<CodeEditor
  value='console.log("Hello world!");'
  name={'code-editor'}
  setup={'basic'}
  language='javascript'
  className='w-[50%] min-h-40 bg-white'
/>`,
//1
`import { cpp } from '@codemirror/lang-cpp';

function CPPCodeEditor () {
  return <CodeEditor extensions={[ cpp() ]} setup='basic'/>
}`,
//2
`<CodeEditor
  className='w-[50%] min-h-40 bg-white'
  onUpdate={(value) => alert(value)}
  value='<div>Hello World</div>'
  setup={'basic'}
  language='html'
/>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="rectangle-list" href="/field">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Code Editor</Bread.Crumb>
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
          {_('Code Editor')}
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
  const { _ } = useLanguage();

  const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');
  const [ code, setCode ] = useState<string>('');

  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1 id="top" className="flex items-center uppercase font-bold text-xl">
        {_('Code Editor')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the code editor field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import CodeEditor from 'frui/field/CodeEditor';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            A <C l value="CodeEditor" /> is not a standard input field but a
            specialized component for editing code that wraps around the
            CodeMirror component. A hidden <C l value="Input" /> component is used to store the value.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <CodeEditor
                value='console.log("Hello world!");'
                name={'code-editor'}
                setup={'basic'}
                language='javascript'
                className='w-[50%] min-h-40 bg-white'
              />
            </div>
          </div>
          <Code language="typescript">
            {examples[0]}
          </Code>
        </div>
      </div>

      <h2 id="languages" className="uppercase font-bold text-lg mt-8">
        {_('Languages')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            <C l value="CodeEditor" /> supports a variety of languages out of the box.
          </Translate>
        </p>
        <div className="curved">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <Select
                className="w-[50%] z-40 text-black"
                options={languages.map((lang) => ({
                  value: lang.name,
                  label: lang.name,
                }))}
                onSelected={(value) => {
                  setSelectedLanguage(value.value);
                }}
                value={selectedLanguage}
              />

              <CodeEditor
                setup={'basic'}
                language={selectedLanguage}
                className="w-[50%] min-h-40 bg-white"
                onUpdate={(value) => setCode(value)}
                value={code}
              />
            </div>
          </div>
          <Code language="typescript">
            {`<CodeEditor setup={'basic'} language="${selectedLanguage}" className='w-[50%] min-h-40 bg-white'/>`}
          </Code>
        </div>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Unsupported Languages')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Language support extensions can also be passed into the editor via the <C l value="extensions" /> prop.
          </Translate>
        </p>
        <Code language="typescript">
          {examples[1]}
        </Code>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            <C value="onUpdate" /> is like <C value="onChange" r /> except the value is passed instead of the change event.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <div className="w-full">
              <CodeEditor
                className="w-[50%] min-h-40 bg-white"
                onUpdate={(value) => alert(value)}
                value="<div>Hello World</div>"
                setup={'basic'}
                language="html"
              />
            </div>
          </div>
          <Code language="typescript">
            {examples[2]}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Change')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onChange" /> event is triggered when the value has changed.
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">{_('event')}</Table.Col>
            <Table.Col className="theme-bg-1 text-left">{_('Event Object')}</Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              see: <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" target="_blank">Change Event</a>
            </Table.Col>
          </Table.Row>
        </Table>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('On Update')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="onUpdate" /> event is triggered when the value has been updated.
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">{_('value')}</Table.Col>
            <Table.Col className="theme-bg-1 text-left">{_('string')}</Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="foobar" quote />
            </Table.Col>
          </Table.Row>
        </Table>
      </div>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
         <p className="py-2">
          <Translate>
            The <C value="<CodeEditor>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/datetime">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Datetime')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/file">
          {_('File')}
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
      uri="/field/editor"
      title="Code Editor Field"
      description={
        'Code Editor is a field component that provides a code '
        + 'editing interface with syntax highlighting and other '
        + 'features.'
      }
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
      <LayoutPanel pathname="/field/editor">
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
