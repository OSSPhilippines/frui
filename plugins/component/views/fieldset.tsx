import { useLanguage } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Code, 
  Props 
} from 'plugins/app/index.js';
import type { Crumb } from 'components/element/Crumbs.js';
import Crumbs from 'components/element/Crumbs.js';

import make, { type FieldsProps, type FieldsetProps } from 'components/form/Fieldset.js';

export type ContactType = { name: string };
export type ContactsProps = FieldsetProps<ContactType> & {};

function ContactFields(props: FieldsProps<ContactType>) {
  const { values, index } = props;
  const value = values ? values[index] : undefined;
  return (
    <div>
      Row {index} {JSON.stringify(value)}:
    </div>
  );
}

const Fieldset1 = make<ContactType>(ContactFields);

function Contacts(props: ContactsProps) {
  const config = {};
  return (
    <Fieldset1 {...props} config={config} emptyValue={{ name: '' }} />
  );
}

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Fieldset' }
];

const props = [
  [ 'limit', 'number', 'No', 'Maximum number of fieldsets' ],
  [ 'defaultValue', 'array', 'No', 'Default values for the fieldset' ],
  [ 'emptyValue', 'object', 'No', 'Default empty value for new rows' ],
  [ 'config', 'object', 'No', 'Configuration passed to fields' ]
];

export function Body() {
  const { _ } = useLanguage();
  return (
    <LayoutPanel pathname="/component/fieldset">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l theme-bc-1 text-sm">
            <h4 className="p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <a className="block pb-1" href="#top">Fieldset</a>
              <ul className="list-disc pl-3">
                <li className="pl-3 pb-1">
                  <a href="#props">{_('Props')}</a>
                </li>
                <li className="pl-3 pb-1">
                  <a href="#examples">{_('Examples')}</a>
                </li>
              </ul>
            </div>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Fieldset')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Fieldset from 'frui/form/Fieldset';`}
            </Code>

            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <Props props={props} />

            <h2 id="examples" className="uppercase font-bold text-lg mt-8">
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

            <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
              <a className="text-t2" href="/component">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Components')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/component/table">
                {_('Table')}
                <i className="fas fa-arrow-right ml-2"></i>
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
      uri="/component/fieldset"
      title="Fieldset Component"
      description="Fieldset in FRUI allows grouping of fields with repeatable sets of inputs."
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
