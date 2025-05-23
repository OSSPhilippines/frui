//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';
import CodeEditor from 'frui/field/CodeEditor';
import Table, { Tcol, Thead, Trow } from 'frui/element/Table';
import Select from 'frui/field/Select';
import { useState } from 'react';
import { languages } from '@codemirror/language-data';

const multilineCode1 = `
<CodeEditor
  value='console.log("Hello world!");'
  name={'code-editor'}
  setup={'basic'}
  language='javascript'
  className='w-[50%] min-h-40 bg-white'
/>
`.trim();
const multilineCode2 = `
import { cpp } from '@codemirror/lang-cpp';

function CPPCodeEditor () {
  return <CodeEditor extensions={[ cpp() ]} setup='basic'/>
}
`

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Code Editor' },
  ];

  //state variable for language and code for sample editor
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const props = [
    [_('className'), _('string'), _('No'), _('Standard HTML class names')],
    [
      _('defaultValue'),
      _('string'),
      _('No'),
      _('Default value (uncontrolled)'),
    ],
    [
      _('extensions'),
      _('Object[]'),
      _('No'),
      _('Set of CodeMirror extensions that can be added'),
    ],
    [_('language'), _('string'), _('No'), _('Language to use')],
    [_('name'), _('string'), _('No'), _('Used for React Server Components.')],
    [
      _('numbers'),
      _('boolean'),
      _('No'),
      _(
        'Toggle line numbers (defaults to false; ineffective when using basic setup).'
      ),
    ],
    [
      _('onChange'),
      _('Function'),
      _('No'),
      _('Event handler when value has changed'),
    ],
    [
      _('onUpdate'),
      _('Function'),
      _('No'),
      _('Event handler when value updates'),
    ],
    [
      _('setup'),
      _('string'),
      _('No'),
      _("CodeMirror setup options ('minimal' | 'basic' | 'custom')"),
    ],
    [_('value'), _('string'), _('No'), _('Default value (controlled)')],
  ];
  //render
  return (
    <LayoutPanel
      uri='/field/code-editor'
      title='Code Editor'
      description='A code editor for FRUI, using CodeMirror v6.'
    >
      <main className='flex flex-col h-full w-full'>
        <div className='p-3 bg-b2'>
          <Crumbs crumbs={crumbs} />
        </div>
        <div className='flex-grow relative h-full'>
          <aside className='hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm'>
            <h4 className='p-3 border-b border-b1 bg-b1 uppercase font-semibold'>
              <Link href='#top'>{_('Code Editor')}</Link>
            </h4>
            <ul className='list-disc py-3 pr-3 pl-6'>
              <li className='pl-3 pb-1'>
                <Link href='#props'>{_('Props')}</Link>
              </li>
              <li className='pl-3 pb-1'>
                <Link href='#basic'>{_('Basics')}</Link>
              </li>
              <li className='pl-3 pb-1'>
                <Link href='#events'>{_('Events')}</Link>
              </li>
              <li className='pl-3 pb-1'>
                <Link href='#languages'>{_('Languages')}</Link>
              </li>
            </ul>
          </aside>
          <div className='absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto'>
            <h1
              id='top'
              className='flex items-center uppercase font-bold text-xl'
            >
              {_('Code Editor')}
            </h1>
            <Code language='typescript' className='mt-2'>
              {`import CodeEditor from 'frui/fields/CodeEditor';`}
            </Code>

            <h2 id='props' className='uppercase font-bold text-lg mt-8'>
              {_('Props')}
            </h2>
            <p className='py-4'>
              <Translate>
                The following props are accepted by <C value='CodeEditor' />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id='basic' className='uppercase font-bold text-lg mt-8'>
              {_('Basics')}
            </h2>
            <p className='py-4'>
              <Translate>
                A <C l value='CodeEditor' /> is not a standard input field but a
                specialized component for editing code that wraps around the
                CodeMirror component. A hidden
                <C l value='Input' /> component is used to store the value.
              </Translate>
              <br></br>
              <br></br>
              <Translate>
                The following is a basic example of a <C l value='CodeEditor' />
                .
              </Translate>
            </p>
            <div className='curved'>
              <div className='flex items-center justify-center p-3 bg-b1'>
                <div className='w-full'>
                  <CodeEditor
                    value='console.log("Hello world!");'
                    name={'code-editor'}
                    setup={'basic'}
                    language='javascript'
                    className='w-[50%] min-h-40 bg-white'
                  />
                </div>
              </div>
              <Code language='typescript'>{multilineCode1}</Code>
            </div>

            <h2 id='languages' className='uppercase font-bold text-lg mt-8'>
              {_('Languages')}
            </h2>
            <p className='py-4'>
              <Translate>
                <C l value='CodeEditor' /> supports a variety of languages out
                of the box.
              </Translate>
            </p>
            <div className='curved'>
              <div className='flex items-center justify-center p-3 bg-b1'>
                <div className='w-full'>
                  <Select
                    className='w-[50%] z-40 text-black'
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
                    className='w-[50%] min-h-40 bg-white'
                    onUpdate={(value) => setCode(value)}
                    value={code}
                  />
                </div>
              </div>
              <Code language='typescript'>
                {`<CodeEditor setup={'basic'} language="${selectedLanguage}" className='w-[50%] min-h-40 bg-white'/>`}
              </Code>
            </div>

            <h3 className='font-semibold text-md mt-8'>
              {_('Unsupported Languages')}
            </h3>
            <p className='py-4'>
              <Translate>
                Language support extensions can also be passed into the editor
                via the <C l value='extensions' /> prop.
              </Translate>
            </p>
            <Code language='typescript'>{multilineCode2}</Code>
            <p className='py-4'>
              <Translate>
                Other languages might not have language support provided by
                CodeMirror. Refer to{' '}
                <a
                  className='text-t2 underline'
                  href='https://codemirror.net/examples/lang-package/'
                  target='_blank'
                >
                  CodeMirror documentation
                </a>{' '}
                for details on providing language support.
              </Translate>
            </p>

            <h2 id='events' className='uppercase font-bold text-lg mt-8'>
              {_('Events')}
            </h2>
            <p className='py-4'>
              <Translate>
                <C value='onUpdate' /> is like <C value='onChange' r />
                except the value is passed instead of the change event.
              </Translate>
            </p>
            <div className='curved overflow-hidden'>
              <div className='flex items-center justify-center p-3 bg-b1'>
                <div className='w-full'>
                  <CodeEditor
                    className='w-[50%] min-h-40 bg-white'
                    onUpdate={(value) => alert(value)}
                    value='<div>Hello World</div>'
                    setup={'basic'}
                    language='html'
                  />
                </div>
              </div>
              <Code language='typescript'>
                {`<CodeEditor onUpdate={(value) => alert(value)} setup={'basic'} value='<div>Hello World</div>' language='html' />`}
              </Code>
            </div>

            <h3 className='font-semibold text-md mt-8'>{_('On Change')}</h3>
            <p className='py-4'>
              <Translate>
                The <C value='onChange' /> event is triggered when the value has
                changed. The following arguments are passed to the event
                handler:
              </Translate>
            </p>
            <Table>
              <Thead className='bg-b3 text-left'>{_('Name')}</Thead>
              <Thead className='bg-b3 text-left'>{_('Type')}</Thead>
              <Thead className='bg-b3 text-left'>{_('Sample')}</Thead>
              <Trow>
                <Tcol className='bg-b1 text-left'>{_('event')}</Tcol>
                <Tcol className='bg-b1 text-left'>{_('Event Object')}</Tcol>
                <Tcol className='bg-b1 text-left'>
                  see:{' '}
                  <a
                    href='https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event'
                    target='_blank'
                  >
                    Change Event
                  </a>
                </Tcol>
              </Trow>
            </Table>

            <h3 className='font-semibold text-md mt-8'>{_('On Update')}</h3>
            <p className='py-4'>
              <Translate>
                The <C value='onUpdate' /> event is triggered when the value has
                been updated. The following arguments are passed to the event
                handler:
              </Translate>
            </p>
            <Table>
              <Thead className='bg-b3 text-left'>{_('Name')}</Thead>
              <Thead className='bg-b3 text-left'>{_('Type')}</Thead>
              <Thead className='bg-b3 text-left'>{_('Sample')}</Thead>
              <Trow>
                <Tcol className='bg-b1 text-left'>{_('value')}</Tcol>
                <Tcol className='bg-b1 text-left'>{_('string')}</Tcol>
                <Tcol className='bg-b1 text-left'>
                  <C value='foobar' quote />
                </Tcol>
              </Trow>
            </Table>

            <div className='flex items-center border-t border-b2 mt-8 pt-4'>
              <Link className='text-t2' href='/field/checklist'>
                <i className='fas fa-arrow-left mr-2'></i>
                {_('Checklist')}
              </Link>
              <div className='flex-grow'></div>
              <Link className='text-t2' href='/field/color-picker'>
                {_('Color Picker')}
                <i className='fas fa-arrow-right ml-2'></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
