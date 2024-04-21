//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import Filelist from 'frui/dist/fields/Filelist';
import Table, { Tcol, Thead, Trow } from 'frui/dist/Table';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeEvent = `
<Filelist
  className="w-full bg-white"
  defaultValue={[
    'https://images.wsj.net/im-580612/8SR', 
    'https://images.wsj.net/im-580612/8SR'
  ]}
  onUpload={(files, next) => {
    //just a mock call
    setTimeout(() => {
      next(files.map((file, i) => 'https://images.wsj.net/im-580612/8SR'))
    }, 1000)
  }}
  onUpdate={console.log}
/>`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Filelist' }
  ];
  const props = [
    [ _('className'), _('string'), _('No'), _('Standard HTML class names') ],
    [ _('defaultValue'), _('string[]'), _('No'), _('Alias to value') ],
    [ _('error'), _('string|boolean'), _('No'), _('Any error message') ],
    [ _('name'), _('string'), _('No'), _('Used for react server components.') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('onUpload'), _('Function'), _('Yes'), _('Called when file is loaded') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Passes ref to html input') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS object') ],
    [ _('uploading'), _('string'), _('No'), _('Phrased used when uploading files') ],
    [ _('value'), _('string[]'), _('No'), _('Default value') ],
  ];
  //render
  return (
    <LayoutPanel 
      uri="/field/filelist"
      title="File List Field"
      description="File list fields in FRUI, helps users upload a list of files to the server."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 border-l border-b1 text-sm">
            <h4 className="p-3 border-b border-b1 bg-b1 uppercase font-semibold">
              <Link href="#top">{_('File')}</Link>
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
                <Link href="#events">
                  {_('Events')}
                </Link>
              </li>
              <li className="pl-3 pb-1">
                <Link href="#errors">
                  {_('Errors')}
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
              {_('Filelist')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import Filelist from 'frui/fields/Filelist';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                File accepts all props of a standard HTML Input 
                element. See <a 
                  className="text-t2 underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
                  target="_blank"
                >Moz</a> for standard input attributes.
              </Translate>
            </p>
            <Props props={props} />

            <h2 id="basic" className="uppercase font-bold text-lg mt-8">
              {_('Basics')}
            </h2>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Filelist className="bg-white w-full" value={['https://images.wsj.net/im-580612/8SR']}  />
              </div>
              <Code language="typescript">
                {`<Filelist className="bg-white w-full" value={['https://images.wsj.net/im-580612/8SR']}  />`}
              </Code>
            </div>

            <h2 id="events" className="uppercase font-bold text-lg mt-8">
              {_('Events')}
            </h2>
            <p className="py-4">
              <Translate>
                Filelist have a prop called <C 
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
              <div className="flex items-center justify-center p-3 bg-b1">
              <Filelist
                className="w-full bg-white"
                defaultValue={[
                  'https://images.wsj.net/im-580612/8SR', 
                  'https://images.wsj.net/im-580612/8SR'
                ]}
                onUpload={(files, next) => {
                  //just a mock call
                  setTimeout(() => {
                    next(files.map((file, i) => 'https://images.wsj.net/im-580612/8SR'))
                  }, 1000)
                }}
                onUpdate={console.log}
              />
              </div>
              <Code language="typescript">
                {codeEvent}
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
              <Thead className="bg-b3 text-left">{_('Name')}</Thead>
              <Thead className="bg-b3 text-left">{_('Type')}</Thead>
              <Thead className="bg-b3 text-left">{_('Sample')}</Thead>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('files')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('File[]')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  see: <a 
                    href="https://developer.mozilla.org/en-US/docs/Web/API/File" 
                    target="_blank"
                  >File Object</a>
                </Tcol>
              </Trow>
              <Trow>
                <Tcol className="bg-b1 text-left">
                  {_('next')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  {_('(urls: string[]) => void')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <Code language="javascript" copy={false}>
                    {`next(['//cdn.ex.com/img.jpg'])`}
                  </Code>
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
                  {_('string[]')}
                </Tcol>
                <Tcol className="bg-b1 text-left">
                  <C value="['foobar']" quote />
                </Tcol>
              </Trow>
            </Table>

            <h2 id="errors" className="uppercase font-bold text-lg mt-8">
              {_('Errors')}
            </h2>
            <p className="py-4">
              <Translate>
                You can pass the <C 
                  value="error" 
                /> prop to highlight the input field 
                red.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <Filelist error className="bg-white w-full" />
              </div>
              <Code language="typescript">
                {`<Filelist error={string|true} className="bg-white w-full" />`}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to filelist
                or use any of the respective 
                <C l value="frui-field-filelist" />, 
                <C l value="frui-field-filelist-control" />, 
                <C l value="frui-field-filelist-file" />, 
                <C l value="frui-field-filelist-link" />, and 
                <C l value="frui-field-filelist-remove" /> CSS classes. 
              </Translate>
            </p>

            <div className="flex items-center border-t border-b2 mt-8 pt-4">
              <Link className="text-t2" href="/field/file">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('File')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/image">
                {_('Image')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
