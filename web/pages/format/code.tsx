//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Code from 'frui/format/Code';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
//other
import notify from '../../modules/notify';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'text-height', label: 'Formats', href: '/format' },
    { label: 'Code' },
  ];

  const props = [
    [_('children'), _('string'), _('Yes'), _('Get code from children')],
    [_('language'), _('string'), _('Yes'), _('Set programming language')],
    [_('copy'), _('boolean'), _('No'), _('Show copy button')],
    [
      _('copyFunction'),
      _('function'),
      _('No'),
      _('Additional behavior for copy button'),
    ],
    [
      _('className'),
      _('string'),
      _('No'),
      _('Additional classes to the code block'),
    ],
    [_('inline'), _('boolean'), _('No'), _('Inline code block')],
    [_('numbers'), _('boolean'), _('No'), _('Show line numbers')],
    [_('syntaxStyle'), _('React Object'), _('No'), _('Custom syntax style')],
    [_('quote'), _('boolean'), _('No'), _('Wrap inline code block in quotes')],
  ];
  //render
  return (
    <LayoutPanel
      uri='/format/code'
      title='Code Block'
      description='Code blocks in FRUI are ReactJS components that contain code.'
    >
      <main className='flex flex-col h-full w-full'>
        <div className='p-3 bg-b2'>
          <Crumbs crumbs={crumbs} />
        </div>
        <div className='flex-grow relative h-full'>
          <aside className='hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm'>
            <h4 className='p-3 border-b border-b1 bg-b1 uppercase font-semibold'>
              <Link href='#top'>{_('Code')}</Link>
            </h4>
            <ul className='list-disc py-3 pr-3 pl-6'>
              <li className='pl-3 pb-1'>
                <Link href='#props'>{_('Props')}</Link>
              </li>
              <li className='pl-3 pb-1'>
                <Link href='#basic'>{_('Basics')}</Link>
              </li>
              <li className='pl-3 pb-1'>
                <Link href='#customize'>{_('Customize')}</Link>
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
                <Code>{`attributes: [Object object]`}</Code>
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
              <Link className='text-t2' href='/format'>
                <i className='fas fa-arrow-left mr-2'></i>
                {_('Formats')}
              </Link>
              <div className='flex-grow'></div>
              <Link className='text-t2' href='/format/currency'>
                {_('Color')}
                <i className='fas fa-arrow-right ml-2'></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
