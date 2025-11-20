//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/Bread.js';
import Table from 'components/Table.js';
import FileList from 'components/form/FileList.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form/filelist';
const title = 'File List Field';
const description = 'File list is a field component that allows users to '
  + 'upload and manage multiple files.';

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'defaultValue', 'string[]', 'No', 'Alias to value' ],
  [ 'error', 'string|boolean', 'No', 'Any error message' ],
  [ 'name', 'string', 'No', 'Used for react server components.' ],
  [ 'onUpdate', 'Function', 'No', 'Update event handler' ],
  [ 'onUpload', 'Function', 'Yes', 'Called when file is loaded' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object' ],
  [ 'uploading', 'string', 'No', 'Phrased used when uploading files' ],
  [ 'value', 'string[]', 'No', 'Default value' ]
];

const examples = [
//0
`<FileList className="bg-white w-full" value={['https://images.wsj.net/im-580612/8SR']}  />`,
//1
`<FileList
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
`<FileList error={string|true} className="bg-white w-full" />`
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
      <Bread.Crumb icon="rectangle-list" href="/form">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>File List</Bread.Crumb>
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
          {_('File List')}
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
        {_('File List')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the file list field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import FileList from 'frui/form/FileList';`}
        </Code>
      </div>

      <h2 id="examples" className="uppercase font-bold text-lg mt-8">
        {_('Examples')}
      </h2>
      <Preview 
        title="Basic Example" 
        className="border border-2 theme-bc-3"
      >
        <Preview.Example center padding>
          <FileList className="bg-white w-full" value={['https://images.wsj.net/im-580612/8SR']}  />
        </Preview.Example>
        <Preview.Code>{examples[0]}</Preview.Code>
      </Preview>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            FileList have a prop called <C 
              value="onUpload" 
            />. This is where you 
            should add your logic for handling the file upload.
            Using this in combination with <C 
              value="onUpdate" 
            /> will allow you to pass values 
            from upload to form processing.
          </Translate>
        </p>
        <Preview 
          title="Event Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <FileList
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
          </Preview.Example>
          <Preview.Code>{examples[1]}</Preview.Code>
        </Preview>

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
              {_('files')}
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

        <Preview 
          title="Error Example" 
          className="border border-2 theme-bc-3"
        >
          <Preview.Example center padding>
            <FileList error className="bg-white w-full" />
          </Preview.Example>
          <Preview.Code>{examples[3]}</Preview.Code>
        </Preview>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          You can use
          the <C value="frui-form-filelist" />, <C value="frui-form-filelist-control" />, <C value="frui-form-filelist-file" />, <C value="frui-form-filelist-link" />,
          and <C value="frui-form-filelist-remove" /> CSS classes to globally theme the file list field.
        </Translate>
      </p>
      
      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="<FileList>" /> field accepts all props 
            of a standard HTML Input element. See <a 
              className="theme-2 underline"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
              target="_blank"
            >Moz</a> for standard input attributes.
          </Translate>
        </p>
        <Props props={props} />
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
