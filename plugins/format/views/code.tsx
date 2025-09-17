import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';

import Code from '../../../components/format/Code.js';
import { notify } from '../../../components/element/Notify.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Formats', href: '/format' },
  { label: 'Code' }
];
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

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/format/code">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className='hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm'>
            <h4 className='p-3 border-b border-b1 bg-b1 uppercase font-semibold'>
              <a href='#top'>{_('Code')}</a>
            </h4>
            <ul className='list-disc py-3 pr-3 pl-6'>
              <li className='pl-3 pb-1'>
                <a href='#props'>{_('Props')}</a>
              </li>
              <li className='pl-3 pb-1'>
                <a href='#basic'>{_('Basics')}</a>
              </li>
              <li className='pl-3 pb-1'>
                <a href='#customize'>{_('Customize')}</a>
              </li>
            </ul>
          </aside>
          <div className='absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto'>
            <h1
              id='top'
              className='flex items-center uppercase font-bold text-xl'
            >
              {_('Code')}
            </h1>
            <Code
              copy
              language='ts'
              className='mt-2'
              onCopy={() => {
                notify('success', _('Copied to clipboard'));
              }}
            >
              {`import Code from 'frui/dist/formats/Code';`}
            </Code>

            <h2 id='props' className='uppercase font-bold text-lg mt-8'>
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id='basic' className='uppercase font-bold text-lg mt-8'>
              {_('Basics')}
            </h2>
            <div className='curved overflow-hidden'>
              <div className='flex items-center justify-center p-3 bg-b1'>
                <Code language='python'>{`print("Hello, world!")`}</Code>
              </div>
              <Code
                copy
                numbers
                language='ts'
                onCopy={() => {
                  notify('success', _('Copied to clipboard'));
                }}
              >
                {`<Code language="python">\n  print("Hello, world!")\n</Code>`}
              </Code>

              <p className='py-4'>
                <Translate>
                  Defining a code block requires passing a <Code>language</Code>{' '}
                  prop to the component.
                </Translate>
              </p>

              <div className='flex items-center justify-center p-3 bg-b1'>
                <Code language='ts'>{`attributes: [Object object]`}</Code>
              </div>
              <Code
                copy
                numbers
                language='ts'
                onCopy={() => {
                  notify('success', _('Copied to clipboard'));
                }}
              >
                {`<Code>{\`attributes: [Object object]\`}</Code>`}
              </Code>

              <p className='py-4'>
                <Translate>
                  Not supplying a <Code>language</Code> prop will instead create
                  an inline component.
                </Translate>
              </p>
            </div>

            <h2 id='customize' className='uppercase font-bold text-lg mt-8'>
              {_('Customize')}
            </h2>
            <p className='py-4'>
              <Translate>
                You can use different languages for a code block.
              </Translate>
            </p>

            <h3 className='font-semibold text-md mt-8'>{_('Line Numbers')}</h3>
            <p className='py-4'>
              <Translate>
                Line numbers can be added to a code block by passing the{' '}
                <Code>numbers</Code> prop.
              </Translate>
            </p>
            <div className='curved overflow-hidden'>
              <div className='flex items-center justify-center p-3 bg-b1'>
                <Code language='typescript' numbers>
                  {`console.log("Hello, world!");`}
                </Code>
              </div>
              <Code
                copy
                numbers
                language='ts'
                onCopy={() => {
                  notify('success', _('Copied to clipboard'));
                }}
              >
                {`<Code language="typescript" numbers>\n  console.log("Hello, world!");\n</Code>`}
              </Code>
            </div>

            <h3 className='font-semibold text-md mt-8'>{_('Copy Button')}</h3>
            <p className='py-4'>
              <Translate>
                A copy button can be added to a code block by passing the{' '}
                <Code>copy</Code> prop. To customize the behavior of the copy
                button, you can pass a function to the <Code>onCopy</Code> prop.
              </Translate>
            </p>
            <div className='curved overflow-hidden'>
              <div className='flex items-center justify-center p-3 bg-b1'>
                <Code
                  language='typescript'
                  copy
                  onCopy={() => alert('Code copied!')}
                >
                  {'console.log("Hello, world!");'}
                </Code>
              </div>
              <Code
                copy
                numbers
                language='ts'
                onCopy={() => {
                  notify('success', _('Copied to clipboard'));
                }}
              >
                {`<Code language="typescript"\n  copy onCopy={() => alert("Code copied!")}\n>\n  console.log("Hello, world!");\n</Code>`}
              </Code>
            </div>

            <div className='flex items-center border-t border-b2 mt-8 pt-4'>
              <a className='text-t2' href='/format'>
                <i className='fas fa-arrow-left mr-2'></i>
                {_('Formats')}
              </a>
              <div className='flex-grow'></div>
              <a className='text-t2' href='/format/color'>
                {_('Color')}
                <i className='fas fa-arrow-right ml-2'></i>
              </a>
            </div>
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
      uri="/format/code"
      title="Code Block"
      description="Code blocks in FRUI are ReactJS components that contain code."
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
