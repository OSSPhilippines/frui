//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Table from 'components/Table.js';
import SuggestInput from 'components/form/SuggestInput.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/suggest-input';
const title = 'Suggest Input Field';
const description = 'Suggest Input is a text input field that provides a list of '
  + 'suggestions as the user types.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onChange', 'Function', 'No', 'Event handler when value has changed' ],
  [ 'onDropdown', 'Function', 'No', 'Event handler when dropdown opens/closes' ],
  [ 'onQuery', 'Function', 'No', 'Event handler when something is searched' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'options', 'string[]', 'No', 'List of select options.' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'value', 'string', 'No', 'Selected value from the options' ]
];

const examples = [
//0
`<SuggestInput 
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`,
//1
`<SuggestInput 
  chars={2}
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`,
//2
`const possible = ['foo', 'bar', 'food', 'fool', 'bard', 'bark', 'barge'];
const [ options, setOptions ] = useState(possible);
return (
  <SuggestInput 
    options={options} 
    placeholder="Enter foo or bar"
    onQuery={query => setOptions(
      possible.filter(item => item.includes(query))
    )}
  />
);`,
//3
`<SuggestInput 
  append="#dropdown-root"
  options={[ 'foo', 'bar' ]} 
  placeholder="Enter foo or bar"
/>`,
//4
`<SuggestInput placeholder="Enter product title">
  <SuggestInput.Option value="KODAK PIXPRO FZ55-BK">
    <div className="flex items-start mb-3">
      <img width="70" src="https://m.media-amazon.com/images/I/81swjZCbdiL._AC_SL100_.jpg" />
      <div className="ml-3">
        <h3 className="font-semibold">
          KODAK PIXPRO FZ55-BK 16MP Digital Camera with 5X 
          Optical Zoom & 1080P Full HD Video
        </h3>
        <div className="mt-2">$299.99</div>
      </div>
    </div>
  </SuggestInput.Option>
  <SuggestInput.Option value="Canon EOS Rebel T7">
    <div className="flex items-start">
      <img width="70" src="https://m.media-amazon.com/images/I/714hINuPoBL._AC_SL100_.jpg" />
      <div className="ml-3">
        <h3 className="font-semibold">
          Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | 
          Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ 
          Image Processor HD Videos
        </h3>
        <div className="mt-2">$999.99</div>
      </div>
    </div>
  </SuggestInput.Option>
</SuggestInput>`
];

//--------------------------------------------------------------------//
// Components

const { C, Code, Props, Preview } = Docs;

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
        <a className="block pb-1 font-bold" href="#top">
          {_('Suggest Input')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#events">{_('Events')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#errors">{_('Errors')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styles">{_('Global Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Examples component
 */
export function Examples() {
  const possible = [ 'foo', 'bar', 'food', 'fool', 'bard', 'bark', 'barge' ];
  const [ options, setOptions ] = useState(possible);
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Basic Example */}
      <Preview 
        title="Basic Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <SuggestInput 
            append="#dropdown-root"
            className="w-full" 
            option={({ selected }) => selected 
              ? 'theme-bg-3 theme-white px-mx-3'
              : 'px-mx-3'
            }
            options={[ 'foo', 'bar' ]} 
            placeholder="Enter foo or bar"
          />
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>
      {/* Minimum Characters Example */}
      <Preview 
        title="Minimum Characters Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <SuggestInput 
            append="#dropdown-root"
            className="w-full" 
            chars={2}
            option={({ selected }) => selected 
              ? 'theme-bg-3 theme-white px-mx-3'
              : 'px-mx-3'
            }
            options={[ 'foo', 'bar' ]} 
            placeholder="Enter foo or bar"
          />
        </Preview.Example>
        <Preview.Code>{examples[1]}</Preview.Code>
      </Preview>
      {/* On Query Example */}
      <Preview 
        title="On Query Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <SuggestInput 
            append="#dropdown-root"
            className="w-full" 
            option={({ selected }) => selected 
              ? 'theme-bg-3 theme-white px-mx-3'
              : 'px-mx-3'
            }
            options={options} 
            placeholder="Enter foo or bar"
            onQuery={query => setOptions(
              possible.filter(item => item.includes(query))
            )}
          />
        </Preview.Example>
        <Preview.Code>{examples[2]}</Preview.Code>
      </Preview>
      {/* Portaling Example */}
      <Preview 
        title="Portaling Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <SuggestInput 
            append="#dropdown-root"
            className="w-full" 
            option={({ selected }) => selected 
              ? 'theme-bg-3 theme-white px-mx-3'
              : 'px-mx-3'
            }
            placeholder="Enter foo or bar"
            onQuery={query => setOptions(
              possible.filter(item => item.includes(query))
            )}
          >
            {options.map(option => (
              <SuggestInput.Option key={option} value={option}>
                {option}
              </SuggestInput.Option>
            ))}
          </SuggestInput>
        </Preview.Example>
        <Preview.Code>{examples[3]}</Preview.Code>
      </Preview>
      {/* Designed Options Example */}
      <Preview 
        title="Products Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          <SuggestInput 
            append="#dropdown-root"
            className="w-full" 
            option={({ selected }) => selected 
              ? 'theme-bg-3 theme-white px-mx-3'
              : 'px-mx-3'
            }
            placeholder="Enter product title"
          >
            <SuggestInput.Option value="KODAK PIXPRO FZ55-BK">
              <div className="flex items-start mb-3">
                <img width="70" src="https://m.media-amazon.com/images/I/81swjZCbdiL._AC_SL100_.jpg" />
                <div className="ml-3">
                  <h3 className="font-semibold">
                    KODAK PIXPRO FZ55-BK 16MP Digital Camera with 5X 
                    Optical Zoom & 1080P Full HD Video
                  </h3>
                  <div className="mt-2">$299.99</div>
                </div>
              </div>
            </SuggestInput.Option>
            <SuggestInput.Option value="Canon EOS Rebel T7">
              <div className="flex items-start">
                <img width="70" src="https://m.media-amazon.com/images/I/714hINuPoBL._AC_SL100_.jpg" />
                <div className="ml-3">
                  <h3 className="font-semibold">
                    Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | 
                    Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ 
                    Image Processor HD Videos
                  </h3>
                  <div className="mt-2">$999.99</div>
                </div>
              </div>
            </SuggestInput.Option>
          </SuggestInput>
        </Preview.Example>
        <Preview.Code>{examples[4]}</Preview.Code>
      </Preview>
    </div>
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
        {_('Suggest Input')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the input field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import SuggestInput from 'frui/form/SuggestInput';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following is a basic example of an 
            <C l value="<SuggestInput>" /> field.
          </Translate>
        </p>
        <Examples />
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The following example makes use of all the possible 
            events for <C value="SuggestInput" />.
          </Translate>
        </p>
        <Preview 
          title="With Events" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <SuggestInput 
              className="w-full" 
              options={['foo', 'bar']}
              onQuery={(_query) => {}}
              onDropdown={open => console.log('dropdown', open)}
              onChange={e => console.log('change', e)}
              onUpdate={value => console.log('update', value)}
              placeholder="Enter 'b'"
            />
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>

        <h3 className="font-semibold text-md mt-8">
          {_('On Change')}
        </h3>
        <div>
          <p className="py-4">
            <Translate>
              The <C value="onChange" /> event is triggered when the
              value has changed. The following arguments are passed
              to the event handler:
            </Translate>
          </p>
          <Table>
            <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1 text-left">
                {_('event')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                {_('Event Object')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                see: <a 
                  href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event" 
                  target="_blank"
                >Change Event</a>
              </Table.Col>
            </Table.Row>
          </Table>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Dropdown')}
        </h3>
        <div>
          <p className="py-4">
            <Translate>
              The <C value="onDropdown" /> event is triggered when the 
              dropdown opens or closes. The following arguments are
              passed to the event handler:
            </Translate>
          </p>
          <Table>
            <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1 text-left">
                {_('open')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                {_('boolean')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                <C value="true" />
              </Table.Col>
            </Table.Row>
          </Table>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Query')}
        </h3>
        <div>
          <p className="py-4">
            <Translate>
              The <C value="onQuery" /> event is triggered when the
              user searches for something. The following arguments
              are passed to the event handler:
            </Translate>
          </p>
          <Table>
            <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1 text-left">
                {_('query')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                {_('string')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                <C value="foobar" quote />
              </Table.Col>
            </Table.Row>
            <Table.Row>
              <Table.Col className="theme-bg-2 text-left">
                {_('setOptions')}
              </Table.Col>
              <Table.Col className="theme-bg-2 text-left">
                {_('Function')}
              </Table.Col>
              <Table.Col className="theme-bg-2 text-left">
                <Code language="json">{`set(['boo', 'bar', 'baz'])`}</Code>
              </Table.Col>
            </Table.Row>
          </Table>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Update')}
        </h3>
        <div>
          <p className="py-4">
            <Translate>
              The <C value="onUpdate" /> event is triggered when the
              value has been updated. The following arguments are
              passed to the event handler:
            </Translate>
          </p>
          <Table>
            <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
            <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
            <Table.Row>
              <Table.Col className="theme-bg-1 text-left">
                {_('value')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                {_('string')}
              </Table.Col>
              <Table.Col className="theme-bg-1 text-left">
                <C value="foobar" quote />
              </Table.Col>
            </Table.Row>
          </Table>
        </div>
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can pass the <C value="error" /> prop to highlight 
            the SuggestInput field red.
          </Translate>
        </p>
        <Preview 
          title="Error Example"
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <SuggestInput 
              error
              className="w-full" 
              options={[ 'foo', 'bar' ]} 
              placeholder="Enter foo or bar"
              value="Not a hotdog."
            />
          </Preview.Example>
          <Preview.Code>{examples[2]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C value="SuggestInput" />, <C value="frui-form-suggest-input" />, <C value="frui-form-suggest-input-dropdown" />, <C value="frui-form-suggest-input-options" />,
          and <C value="frui-form-suggest-input-option" /> CSS classes to globally theme suggest input.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-2">
          <Translate>
            The <C value="<SuggestInput>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <Docs.Foot/>
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
