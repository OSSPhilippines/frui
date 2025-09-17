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

import Country from '../../../components/field/Country.js';

const crumbs: Crumb[] = [
  { icon: 'rectangle-list', label: 'Fields', href: '/field' },
  { label: 'Country' }
];

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
  [ 'onSelected', 'Function', 'No', 'Event handler when an option has been selected' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'options', 'string[]', 'No', 'List of select options.' ],
  [ 'placeholder', 'string', 'No', 'Display text when no value set' ],
  [ 'searchable', 'boolean', 'No', 'Add a search field' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Selected value from the options' ],
];

const examples = [
//0
`<Country className="w-full z-30 text-black" placeholder="Select Country" searchable />`,
//1
`<Country 
  className="w-full z-20 text-black" 
  onDropdown={open => console.log('dropdown', open)}
  onSelected={option => console.log('selected', option)}
  onUpdate={value => alert(JSON.stringify(value))}
/>`,
//2
`{
  label: 'United States',
  value: {
    countryCode: 'US',
    countryName: 'United States',
    currencyType: 'fiat',
    currencyCode: 'USD',
    currencyName: 'US Dollar',
    currencyPlural: 'US Dollars',
    currencySymbol: '$',
    language: 'en'
  }
}`,
//3
`{
  countryCode: 'US',
  countryName: 'United States',
  currencyType: 'fiat',
  currencyCode: 'USD',
  currencyName: 'US Dollar',
  currencyPlural: 'US Dollars',
  currencySymbol: '$',
  language: 'en'
}`,
//4
`<Country className="w-full z-10 text-black" error value="US" />`
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/field/country">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <a href="#top">{_('Country')}</a>
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
              {_('Country')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Country from 'frui/fields/Country';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p className="py-4">
              <Translate>
                The following props are accepted by <C value="Country" />.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <p className="py-4">
              <Translate>
                The following is a basic example of an 
                <C l value="Country" /> field.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Country className="w-full z-30 text-black" placeholder="Select Country" searchable value="US" />
              </div>
              <Code language="typescript">
                {examples[0]}
              </Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                The following example makes use of all the possible 
                events for <C value="Country" />.
              </Translate>
            </p>
            <div className="curved">
              <div className="relative flex items-center justify-center p-3 bg-b1">
                <Country 
                  className="w-full z-20 text-black" 
                  onDropdown={open => console.log('dropdown', open)}
                  onSelected={option => console.log('selected', option)}
                  onUpdate={value => alert(JSON.stringify(value))}
                />
              </div>
              <Code language="typescript">
                {examples[1]}
              </Code>
            </div>
            
            <h3 className="font-semibold text-md mt-8">
              {_('On Dropdown')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onDropdown" /> event is triggered when the 
                dropdown opens or closes. The following arguments are
                passed to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('open')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('boolean')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="true" />
                </Tcol>
              </Trow>
            </Table>

            <h3 className="font-semibold text-md mt-8">
              {_('On Selected')}
            </h3>
            <p className="py-4">
              <Translate>
                The <C value="onSelected" /> event is triggered when an
                option has been selected. The following arguments are
                passed to the event handler:
              </Translate>
            </p>
            <Table>
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('option')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('SelectOption')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <Code language="json" copy={false}>{examples[2]}</Code>
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
                  {_('CountryData')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <Code language="json" copy={false}>{examples[3]}</Code>
                </Tcol>
              </Trow>
            </Table>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C value="error" /> prop to highlight 
                the Country field red.
              </Translate>
            </p>
            <div className="curved">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Country className="w-full z-10 text-black" error value="US" />
              </div>
              <Code language="typescript">
                {examples[4]}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to selects
                or use any of the respective 
                <C l value="frui-field-select" />, 
                <C l value="frui-field-select-control" />, 
                <C l value="frui-field-select-placeholder" />, 
                <C l value="frui-field-select-dropdown" />,  
                <C l value="frui-field-select-search" />,  
                <C l value="frui-field-select-search-control" />,  
                <C l value="frui-field-select-search-icon" />,  
                <C l value="frui-field-select-options" />,  
                <C l value="frui-field-select-option" />, and 
                <C l value="frui-field-select-label" /> CSS classes. 
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <a className="text-t2 hover:text-link" href="/field/color-picker">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Color Picker')}
              </a>
              <div className="flex-grow"></div>
              <a className="text-t2 hover:text-link" href="/field/currency">
                {_('Currency')}
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
      uri="/field/country"
      title="Country Field"
      description="Country fields in FRUI, allow users select from a list of countries around the world."
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
