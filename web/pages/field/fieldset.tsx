//types
import type { FieldsProps, FieldsetProps } from 'frui/element/Fieldset';
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
import make from 'frui/element/Fieldset';

const codeBasic = `
//types
import type { FieldsProps, FieldsetProps } from 'frui/Fieldset';
//make fieldset
import make from 'frui/Fieldset';
//fields
export function InputFields(props: FieldsProps<string>) {
  const { values, index, error, set } = props;
  const handlers = {
    update: (value: string) => {
      const newValues = [ ...(values || []) ]
      newValues[index] = value;
      set(newValues);
    },
    remove: () => {
      const newValues = [ ...(values || []) ];
      newValues[index] = undefined;
      set(newValues);
    }
  };
  return (
    <div>
      <input 
        defaultValue={values ? values[index]: undefined} 
        onChange={e => handlers.update(e.target.value)} 
      />
      <button onClick={handlers.remove}>
        &times;
      </button>
    </div>
  );
};
//make fieldset
const Fieldset = make<string>(InputFields);
//ex. <InputList add="Add Input" value={['foo', 'bar']} />
export default function InputList(props: FieldsetProps<string>) {
  return (
    <Fieldset {...props} emptyValue="" />
  );
};`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Fieldset' }
  ];

  const props = [
    [ _('add'), _('string'), _('No'), _('Add button text') ],
    [ _('className'), _('string'), _('No'), _('Standard HTML class names applied to the add button') ],
    [ _('config'), _('Object'), _('No'), _('Object that is directly passed to custom fieldset') ],
    [ _('defaultValue'), _('string[]'), _('No'), _('Default value (uncontrolled)') ],
    [ _('emptyValue'), _('any'), _('No'), _('Value used when creating a new fieldset') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('placeholder'), _('string'), _('No'), _('Placeholders for input values.') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Event handler when value updates') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object applied to the add button') ],
    [ _('value'), _('string[]'), _('No'), _('Default value (controlled)') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/fieldset"
      title="Fieldets"
      description="Fieldsets in FRUI, are a set of fields grouped together to be copied and processed as one field. "
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('Fieldset')}</Link>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
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
                <Link href="#styles">
                  {_('Custom Styles')}
                </Link>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Fieldset')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Fieldset from 'frui/fields/Fieldset';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Fieldset" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                A <C l value="Fieldset" /> is a set of fields grouped 
                together to be copied and processed as one field. 
                Examples of fieldsets are <Link className="text-t2" href="/field/metadata">
                  Metadata
                </Link> and <Link className="text-t2" href="/field/textlist">
                  Textlist
                </Link>. The following shows how to create a basic fieldset:
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <div className="w-full">
                  <InputList add="Add Input" value={['foo', 'bar']} />
                </div>
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to selects
                or use the <C l value="frui-fieldset-add" /> CSS class. 
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/datetime">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Datetime')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/file">
                {_('File')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
};

export function InputFields(props: FieldsProps<string>) {
  // const { values, index, error, set } = props;
  const { values, index, set } = props;
  const handlers = {
    update: (value: string) => {
      const newValues = [ ...(values || []) ]
      newValues[index] = value;
      set(newValues);
    },
    remove: () => {
      const newValues = [ ...(values || []) ];
      newValues[index] = undefined;
      set(newValues);
    }
  };
  return (
    <div>
      <input 
        className="text-black"
        defaultValue={values ? values[index]: undefined} 
        onChange={e => handlers.update(e.target.value)} 
      />
      <button onClick={handlers.remove}>
        &times;
      </button>
    </div>
  );
};
//make fieldset
const Fieldset = make<string>(InputFields);
//custom fieldset
function InputList(props: FieldsetProps<string>) {
  return (
    <Fieldset {...props} emptyValue="" />
  );
};