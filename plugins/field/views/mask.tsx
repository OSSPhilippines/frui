import { useLanguage, Translate } from 'r22n';

import type { PageProps } from '../../app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C 
} from '../../app/index.js';
import type { Crumb } from '../../../components/element/Crumbs.js';
import Crumbs from '../../../components/element/Crumbs.js';
import { Table, Thead, Trow, Tcol } from '../../../components/element/Table.js';

import Mask from '../../../components/field/Mask.js';

const crumbs: Crumb[] = [
  { icon: 'rectangle-list', label: 'Fields', href: '/field' },
  { label: 'Mask' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string|number', 'No', 'Default value (Uncontrolled)' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'mask', 'string', 'Yes', 'Mask format to validate input' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string|number', 'No', 'Default value (Controlled)' ]
];

const examples = [
//0
`<Mask mask="999-999-9999" placeholder="999-999-9999" />`,
//1
`<Mask mask="(99) 9999[9]-9999" placeholder="(99) 9999[9]-9999" />`,
//2
`<Mask mask="999-999-9999" onUpdate={value => alert(value)} />`,
//3
`<Mask error mask="999-999-9999" placeholder="999-999-9999" />`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/mask">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Mask')}</a>
            </h4>
            <ul className="list-disc py-3 pr-3 pl-6">
              <li className="pl-3 pb-1">
                <a href="#props">
                  {_('Props')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#basic">
                  {_('Basics')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#events">
                  {_('Events')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#errors">
                  {_('Errors')}
                </a>
              </li>
              <li className="pl-3 pb-1">
                <a href="#styles">
                  {_('Custom Styles')}
                </a>
              </li>
            </ul>
          </aside>
          <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Mask')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Mask from 'frui/fields/Mask';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                Masks accepts all props of a standard HTML Input 
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
                Masks are a wrapper for <a 
                  className="text-t2 underline"
                  href="https://robinherbots.github.io/Inputmask/#/documentation"
                  target="_blank"
                >inputmask</a>. This mask field extends Input with an 
                additional <C value="mask" /> prop.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Mask mask="999-999-9999" placeholder="999-999-9999" />
              </div>
              <Code language="typescript">
                {examples[0]}
              </Code>
            </div>
            <p className="py-4">
              <Translate>
                Masks uses a combination of the following masking 
                definitions to allow which characters to be entered 
                and in which order.
              </Translate>
            </p>
            <ul className="list-disc pl-3 ml-2">
              <li className="pb-1">9 : numeric</li>
              <li className="pb-1">a : alphabetical</li>
              <li className="pb-1">* : alphanumeric</li>
            </ul>
            <p className="py-4">
              <Translate>
                It is possible to define some parts in the mask as 
                optional. This is done by using <C value="[ ]" />.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Mask mask="(99) 9999[9]-9999" placeholder="(99) 9999[9]-9999" />
              </div>
              <Code language="typescript">
                {examples[1]}
              </Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                <C value="onUpdate" /> is like <C value="onChange" r /> 
                except the value is passed instead of the change event.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Mask mask="999-999-9999" onUpdate={value => alert(value)} />
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
                The <C value="onChange" /> event is triggered when the
                value has changed. The following arguments are passed
                to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('event')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('Event Object')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  see: <a 
                    href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" 
                    target="_blank"
                  >Change Event</a>
                </Tcol>
              </Trow>
            </Table>

            <h3 className="font-semibold text-md mt-8">
              {_('On Update')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onUpdate" /> event is triggered when the
                value has been updated. The following arguments are
                passed to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('value')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('string')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="foobar" quote />
                </Tcol>
              </Trow>
            </Table>

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
                <Mask error mask="999-999-9999" placeholder="999-999-9999" />
              </div>
              <Code language="typescript">
                {examples[3]}
              </Code>
            </div>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2" href="/field/markdown">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Markdown')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2" href="/field/metadata">
                {_('Metadata')}
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
      uri="/field/mask"
      title="Mask Field"
      description="Mask fields in FRUI, are ReactJS components that hint users an accepted value format."
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
