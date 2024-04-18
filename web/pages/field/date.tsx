//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Date from 'frui/dist/fields/Date';
import Datetime from 'frui/dist/fields/Datetime';
import Time from 'frui/dist/fields/Time';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Dates' }
  ];
  const props = [
    [ _('error'), _('string'), _('No'), _('Standard error input') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Standard ref input') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('className'), _('string'), _('No'), _('Standard class name input') ],
  ];

  //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-52 border-l border-b1">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Dates</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#basic">
                    {_('Basics')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#errors">
                    {_('Errors')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="lg:absolute top-0 bottom-0 left-0 right-52 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Dates')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Date from 'frui/fields/Date';`}
            </Code>
            <Code language="typescript" className="mt-2">
              {`import Time from 'frui/fields/Time';`}
            </Code>
            <Code language="typescript" className="mt-2">
              {`import Datetime from 'frui/fields/Datetime';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Dates accepts all props of a standard HTML Input 
                element. See <a 
                  className="text-t2 underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                >Moz</a> for standard input attributes.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                Date fields use the default <code 
                  className="text-sm text-t2"
                >{'`<input type="date">`'}</code> element, but normalizes 
                values to ISO strings using <code 
                  className="text-sm text-t2"
                >{'`toISOString()`'}</code>. <code 
                  className="text-sm text-t2"
                >{'`onUpdate`'}</code> is like <code 
                  className="text-sm text-t2"
                >{'`onChange`'}</code> except the value is passed instead of 
                the change event.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Date onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {`<Date onUpdate={value => alert(value)} />`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-3">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Time onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {`<Time onUpdate={value => alert(value)} />`}
              </Code>
            </div>
            <div className="curved overflow-hidden mt-3">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Datetime onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {`<Datetime onUpdate={value => alert(value)} />`}
              </Code>
            </div>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <code 
                  className="text-sm text-t2"
                >{'`error`'}</code> prop to highlight the input field 
                red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Date error value="Invalid Date." />
              </div>
              <Code language="typescript">
                {`<Date error={string|true} value="Invalid Date." />`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b1 my-8 pt-8">
              <Link className="text-t2" href="/field/input">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Inputs')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/mask">
                {_('Masks')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
