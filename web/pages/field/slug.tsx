//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Input from 'frui/dist/fields/Input';
import Date from 'frui/dist/fields/Date';
import Datetime from 'frui/dist/fields/Datetime';
import Time from 'frui/dist/fields/Time';
import Mask from 'frui/dist/fields/Mask';
import Number from 'frui/dist/fields/Number';
import Password from 'frui/dist/fields/Password';
import Slug from 'frui/dist/fields/Slug';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Slugs' }
  ];
  const props = [
    [ _('error'), _('string'), _('No'), _('Standard error input') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Standard ref input') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('className'), _('string'), _('No'), _('Standard class name input') ],
  ];
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
              <Link className="block pb-1" href="#top">Slugs</Link>
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
                  <Link href="#update">
                    {_('On Update')}
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
              {_('Slugs')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Slug from 'frui/fields/Slug';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Slugs accepts all props of a standard HTML Input 
                element. See <a 
                  className="text-t2 underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                >Moz</a> for standard input attributes.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="types" className="uppercase font-bold text-lg mt-8">
              {_('Basic')}
            </h2>
            <p className="py-4">
              <Translate>
                Number fields display commas and can limit decimal length.
                The value for numbers removes commas.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Slug defaultValue="I am a Title" />
              </div>
              <Code language="typescript">
                {`<Slug value="I am a Title" />`}
              </Code>
            </div>

            <h2 id="update" className="uppercase font-bold text-lg mt-8">
              {_('On Update')}
            </h2>
            <p className="py-4">
              <Translate>
                <C value="onUpdate" /> is like <C value="onChange" r /> 
                except the value is passed instead of the change event.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Slug defaultValue="I am a Title" onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {`<Slug defaultValue="I am a Title" onUpdate={value => alert(value)} />`}
              </Code>
            </div>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the input field red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Slug defaultValue="I am not a Title" error />
              </div>
              <Code language="typescript">
                {`<Input error={string|true} defaultValue="I am not a Title" />`}
              </Code>
            </div>

            <div className="flex items-center border-t border-b1 my-8 pt-8">
              <Link className="text-t2" href="/field/password">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Passwords')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/file">
                {_('Files')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
