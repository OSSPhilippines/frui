//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage } from 'r22n';

//frui
import type { FieldsProps, FieldsetProps } from 'components/form/Fieldset.js';
import Bread from 'components/Bread.js';
import make from 'components/form/Fieldset.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Types

export type ContactType = { name: string };
export type ContactsProps = FieldsetProps<ContactType> & {};

//--------------------------------------------------------------------//
// Constants

const uri = '/component/fieldset';
const title = 'Fieldset Component';
const description = 
  'Fieldset in FRUI allows grouping of fields with repeatable '
  + 'sets of inputs.';

const props = [
  [ 'limit', 'number', 'No', 'Maximum number of fieldsets' ],
  [ 'defaultValue', 'array', 'No', 'Default values for the fieldset' ],
  [ 'emptyValue', 'object', 'No', 'Default empty value for new rows' ],
  [ 'config', 'object', 'No', 'Configuration passed to fields' ]
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      <Bread.Crumb icon="icons" href="/component">
        Components
      </Bread.Crumb>
      <Bread.Crumb>Fieldset</Bread.Crumb>
    </Bread>
  );
};

/**
 * Example fields component
 */
export function ContactFields(props: FieldsProps<ContactType>) {
  const { values, index } = props;
  const value = values ? values[index] : undefined;
  return (
    <div>
      Row {index} {JSON.stringify(value)}:
    </div>
  );
}

/**
 * Contacts fieldset component
 */
export const Fieldset1 = make<ContactType>(ContactFields);
export function Contacts(props: ContactsProps) {
  const config = {};
  return (
    <Fieldset1 {...props} config={config} emptyValue={{ name: '' }} />
  );
}

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
        <a className="block pb-1" href="#top">
          {_('Fieldset')}
        </a>
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
  );
};

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
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
