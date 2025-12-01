//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';
import { languages } from '@codemirror/language-data';

//frui
import Table from 'components/Table.js';
import CodeEditor from 'components/form/CodeEditor.js';
import Select from 'components/form/Select.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/code-editor';
const title = 'Code Editor Field';
const description = 'CodeEditor is a field component that provides a code '
  + 'editing interface with syntax highlighting and other '
  + 'features powered by CodeMirror.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Default value (uncontrolled)' ],
  [ 'extensions', 'Object[]', 'No', 'Set of CodeMirror extensions that can be added' ],
  [ 'language', 'string', 'No', 'Language to use' ],
  [ 'name', 'string', 'No', 'Used for React Server Components.' ],
  [ 'numbers', 'boolean', 'No', 'Toggle line numbers (defaults to false; ineffective when using basic setup).' ],
  [ 'onUpdate', 'Function', 'No', 'Event handler when value updates' ],
  [ 'setup', 'string', 'No', "CodeMirror setup options ('minimal' | 'basic' | 'custom')" ],
  [ 'value', 'string', 'No', 'Default value (controlled)' ]
];

const examples = [
//0
`<CodeEditor
  value="console.log('Hello world!');"
  name="code-editor"
  setup="basic"
  language="javascript"
  className="bg-white max-h-[200px] overflow-auto"
/>`,
//1
`<Select
  className="w-[50%] z-40 text-black"
  options={languages.map((lang) => ({
    value: lang.name,
    label: lang.name,
  }))}
  onUpdate={(value) => setSelectedLanguage(value as string)}
  value={selectedLanguage}
/>

<CodeEditor
  setup="basic"
  language={selectedLanguage}
  className="bg-white max-h-[200px] overflow-auto"
  onUpdate={(value) => value && setCode(value)}
  value={code}
/>`,
//2
`import { cpp } from '@codemirror/lang-cpp';

function CPPCodeEditor () {
  return <CodeEditor extensions={[ cpp() ]} setup='basic'/>
}`,
//3
`<CodeEditor
  className="bg-white max-h-[200px] overflow-auto"
  onUpdate={value => alert(value)}
  value="<div>Hello World</div>"
  setup="basic"
  language="html"
/>`
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
          {_('Code Editor')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#languages">{_('Languages')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#events">{_('Events')}</a>
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
            Import the <C value="<CodeEditor>" /> field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import CodeEditor from 'frui/form/CodeEditor';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Example')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            A <C value="CodeEditor" /> is not a standard input field 
            but a specialized component for editing code that wraps 
            around the CodeMirror component. 
          </Translate>
        </p>
        <Preview 
          title="Basic Example" 
          className="border border-2"
        >
          <Preview.Example center padding>
            <CodeEditor
              value="console.log('Hello world!');"
              name="code-editor"
              setup="basic"
              language="javascript"
              className="bg-white max-h-[200px] overflow-auto"
            />
          </Preview.Example>
          <Preview.Code>{examples[0]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="languages" className="uppercase font-bold text-lg mt-8">
        {_('Languages')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            <C value="CodeEditor" /> supports a variety of languages out of the box.
          </Translate>
        </p>
        <Preview 
          title="Change Languages" 
          className="border border-2"
        >
          <Preview.Example center padding>
            <Select
              className="relative z-[10000]"
              dropdown="max-h-[100px] overflow-auto"
              options={languages.map((lang) => ({
                value: lang.name,
                label: lang.name,
              }))}
              onUpdate={(value) => setSelectedLanguage(value as string)}
              value={selectedLanguage}
            />

            <CodeEditor
              setup="basic"
              language={selectedLanguage}
              className="bg-white max-h-[200px] overflow-auto"
              onUpdate={(value) => value && setCode(value)}
              value={code}
            />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>
      </div>

      <h3 className="font-semibold text-md mt-8">
        {_('Unsupported Languages')}
      </h3>
      <div>
        <p className="py-4">
          <Translate>
            Language support extensions can also be passed into the 
            editor via the <C value="extensions" /> prop.
          </Translate>
        </p>
        <Code language="typescript">
          {examples[2]}
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
        <Preview 
          title="With Events" 
          className="border border-2"
        >
          <Preview.Example center padding>
            <CodeEditor
              className="bg-white max-h-[200px] overflow-auto"
              onUpdate={value => alert(value)}
              value="<div>Hello World</div>"
              setup="basic"
              language="html"
            />
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>

        <h3 className="font-semibold text-md mt-8">
          {_('On Update')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onUpdate" /> event is triggered when the 
            value has been updated.
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

      <Docs.Foot />
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
