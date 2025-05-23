//types
import type { Crumb } from 'modules/components/Crumbs';
import type { FieldsProps, FieldsetProps } from 'frui/form/Fieldset';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
//import { Translate } from 'r22n';
import make from 'frui/form/Fieldset';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Code from 'modules/components/Code';

export type ContactType = { name: string };
export type ContactsProps = FieldsetProps<ContactType> & {};

function ContactFields(props: FieldsProps<ContactType>) {
  const { 
    //name,
    //config,
    values, 
    index, 
    //error,
    //set
  } = props;

  const value = values ? values[index]: undefined;

  return (
    <div>
      Row {index} {JSON.stringify(value)}:
    </div>
  );
}

const Fieldset1 = make<ContactType>(ContactFields);

function Contacts(props: ContactsProps) {
  //this gets rawly passed to the Fields
  const config = {};
  return (
    <Fieldset1 {...props} config={config} emptyValue={{ name: '' }} />
  )
}

export default function Page() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'icons', label: 'Components', href: '/component' },
    { label: 'Fieldset' }
  ];
  //render
  return (
    <LayoutPanel 
      uri="/component/fieldset"
      title="Fieldset Component"
      description=""
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Alert</Link>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <Link href="#props">
                    {_('Props')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#types">
                    {_('Types')}
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Fieldset')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import fieldset from 'frui/form/Fieldset';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>

            <h2 id="types" className="uppercase font-bold text-lg mt-8">
              {_('Examples')}
            </h2>
            <div className="mb-4">
              <Contacts limit={1} defaultValue={[{ name: 'hello' }]} />
            </div>
            <div className="mb-4">
              <Contacts limit={0} />
            </div>
            <div className="mb-4">
              <Contacts limit={1} />
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/component">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Components')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/component/badge">
                {_('Badges')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
}
