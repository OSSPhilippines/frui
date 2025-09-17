import { useLanguage, Translate } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';
import { Table, Thead, Trow, Tcol } from 'components/element/Table.js';

import CodeEditor from 'components/field/CodeEditor.js';
import Select from 'components/field/Select.js';
import { useState } from 'react';
import { languages } from '@codemirror/language-data';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Fields', href: '/field' },
  { label: 'Editor' }
];

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

export function Body() {
  const { _ } = useLanguage();

  const [ selectedLanguage, setSelectedLanguage ] = useState<string>('');
  const [ code, setCode ] = useState<string>('');

  return (
    <LayoutPanel pathname="/field/editor">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Code Editor')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import CodeEditor from 'frui/fields/CodeEditor';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="CodeEditor" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
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

            <h2 id="languages" className="uppercase font-bold text-lg mt-8">
              {_('Languages')}
            </h2>
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

            <h3 className="font-semibold text-md mt-8">
              {_('Unsupported Languages')}
            </h3>
            <p className="py-4">
              <Translate>
                Language support extensions can also be passed into the editor via the <C l value="extensions" /> prop.
              </Translate>
            </p>
            <Code language="typescript">
              {examples[1]}
            </Code>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
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
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">{_('event')}</Tcol>
                <Tcol className="theme-bg-1 text-left">{_('Event Object')}</Tcol>
                <Tcol className="theme-bg-1 text-left">
                  see: <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" target="_blank">Change Event</a>
                </Tcol>
              </Trow>
            </Table>

            <h3 className="font-semibold text-md mt-8">
              {_('On Update')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onUpdate" /> event is triggered when the value has been updated.
              </Translate>
            </p>
            <Table>
              <Thead className="theme-bg-3 text-left">{_('Name')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Type')}</Thead>
              <Thead className="theme-bg-3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="theme-bg-1 text-left">{_('value')}</Tcol>
                <Tcol className="theme-bg-1 text-left">{_('string')}</Tcol>
                <Tcol className="theme-bg-1 text-left">
                  <C value="foobar" quote />
                </Tcol>
              </Trow>
            </Table>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
};

export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/field/editor"
      title=""
      description=""
      styles={styles}
    />
  );
};

export default function Page() {
  return (
    <LayoutProvider>
      <Body />
    </LayoutProvider>
  );
};
