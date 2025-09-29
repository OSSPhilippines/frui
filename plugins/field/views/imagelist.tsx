//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import Table from 'components/element/Table.js';
import Imagelist from 'components/field/Imagelist.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string[]', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'onUpload', 'Function', 'Yes', 'Called when file is loaded' ],
  [ 'passRef', 'LegacyRef', 'No', 'Passes ref to html input' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'uploading', 'string', 'No', 'Phrased used when uploading files' ],
  [ 'value', 'string[]', 'No', 'Default value' ]
];

const examples = [
//0
`<Imagelist className="bg-white w-full" value={['https://images.wsj.net/im-580612/8SR']}  />`,
//1
`<Imagelist
  className="w-full bg-white"
  defaultValue={[
    'https://images.wsj.net/im-580612/8SR', 
    'https://images.wsj.net/im-580612/8SR'
  ]}
  onUpload={(files, next) => {
    //just a mock call
    setTimeout(() => {
      next(files.map((_file, _i) => 'https://images.wsj.net/im-580612/8SR'))
    }, 1000)
  }}
  onUpdate={console.log}
/>`,
//2
`next(['//cdn.ex.com/img.jpg'])`,
//3
`<Imagelist error={string|true} className="bg-white w-full" />`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="rectangle-list" href="/field">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>Image List</Bread.Crumb>
    </Bread>
  );
};

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
          {_('Image List')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
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
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Example */}
      <Preview 
        height={100}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          TODO
        </Preview.Example>
        <Preview.Code>{''}</Preview.Code>
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
        {_('Imagelist')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the image list field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import Imagelist from 'frui/field/Imagelist';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div className="curved overflow-hidden">
        <div className="flex items-center justify-center p-3 theme-bg-1">
          <Imagelist className="bg-white w-full" value={['https://images.wsj.net/im-580612/8SR']}  />
        </div>
        <Code language="typescript">
          {examples[0]}
        </Code>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Imagelist have a prop called <C 
              value="onUpload" 
            />. This is where you 
            should add your logic for handling the file upload.
            Using this in combination with <C 
              value="onUpdate" 
            /> will allow you to pass values 
            from upload to form processing.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
          <Imagelist
            className="w-full bg-white"
            defaultValue={[
              'https://images.wsj.net/im-580612/8SR', 
              'https://images.wsj.net/im-580612/8SR'
            ]}
            onUpload={(files, next) => {
              //just a mock call
              setTimeout(() => {
                next(files.map((_file, _i) => 'https://images.wsj.net/im-580612/8SR'))
              }, 1000)
            }}
            onUpdate={console.log}
          />
          </div>
          <Code language="typescript">
            {examples[1]}
          </Code>
        </div>

        <h3 className="font-semibold text-md mt-8">
          {_('On Upload')}
        </h3>
        <p className="py-4">
          <Translate>
            The <C value="onUpload" /> event is triggered when a
            file has been selected. The following arguments are
            passed to the event handler:
          </Translate>
        </p>
        <Table>
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('images')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('File[]')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              see: <a 
                href="https://developer.mozilla.org/en-US/docs/Web/API/File" 
                target="_blank"
              >File Object</a>
            </Table.Col>
          </Table.Row>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('next')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('(urls: string[]) => void')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <Code language="javascript" copy={false}>
                {examples[2]}
              </Code>
            </Table.Col>
          </Table.Row>
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
          <Table.Head className="theme-bg-3 text-left">{_('Name')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Type')}</Table.Head>
          <Table.Head className="theme-bg-3 text-left">{_('Sample')}</Table.Head>
          <Table.Row>
            <Table.Col className="theme-bg-1 text-left">
              {_('value')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              {_('string[]')}
            </Table.Col>
            <Table.Col className="theme-bg-1 text-left">
              <C value="['foobar']" quote />
            </Table.Col>
          </Table.Row>
        </Table>
      </div>

      <h2 id="errors" className="uppercase font-bold text-lg mt-8">
        {_('Errors')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            You can pass the <C 
              value="error" 
            /> prop to highlight the input field 
            red.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <Imagelist error className="bg-white w-full" />
          </div>
          <Code language="typescript">
            {examples[3]}
          </Code>
        </div>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can add your own custom class to imagelist
          or use any of the respective 
          <C l value="frui-field-imagelist" />, 
          <C l value="frui-field-imagelist-control" />, 
          <C l value="frui-field-imagelist-file" />, 
          <C l value="frui-field-imagelist-link" />,  
          <C l value="frui-field-imagelist-image" />, and 
          <C l value="frui-field-imagelist-remove" /> CSS classes. 
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p>
          <Translate>
            Image list accepts all props of a standard HTML Input 
            element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
              target="_blank"
            >Moz</a> for standard input attributes.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 pt-4">
        <a className="theme-2" href="/field/image">
          <i className="fas fa-arrow-left mr-2"></i>
          {_('Image')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/field/input">
          {_('Input')}
          <i className="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/field/imagelist"
      title="Image List Field"
      description="Image list fields in FRUI, helps users upload a list of images to the server."
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/field/imagelist">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
