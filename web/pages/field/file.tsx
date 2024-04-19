//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//components
import Link from 'next/link';
import { Translate } from 'r22n';
import File from 'frui/dist/fields/File';
import ImageField from 'frui/dist/fields/Image';
import Filelist from 'frui/dist/fields/Filelist';
import Imagelist from 'frui/dist/fields/Imagelist';
import { LayoutPanel } from 'modules/theme';
import Crumbs from 'modules/components/Crumbs';
import Props from 'modules/components/Props';
import Code, { InlineCode as C } from 'modules/components/Code';

const codeBasic = `
<File 
  className="bg-white w-full" 
  onUpload={(file, next) => {
    //just a mock call
    setTimeout(() => {
      next('https://images.wsj.net/im-580612/8SR')
    }, 5000)
  }} 
  onUpdate={value => alert(value)} 
/>`.trim();

const codeImage = `
<Image 
  className="bg-white w-full" 
  onUpload={(file, next) => {
    //just a mock call
    setTimeout(() => {
      next('https://images.wsj.net/im-580612/8SR')
    }, 5000)
  }} 
  onUpdate={value => alert(value)} 
/>`.trim();

const codeFilelist = `
<FieldFilelist
  className="w-full bg-white"
  defaultValue={['foo', 'bar']}
  onUpload={(files, next) => {
    //just a mock call
    setTimeout(() => {
      next(files.map((file, i) => 'https://images.wsj.net/im-580612/8SR'))
    }, 5000)
  }}
  onUpdate={console.log}
/>`.trim();

const codeImagelist = `
<FieldImagelist
  className="w-full bg-white"
  defaultValue={[
    'https://images.wsj.net/im-580612/8SR',
    'https://images.wsj.net/im-580612/8SR'
  ]}
  onUpload={(files, next) => {
    //just a mock call
    setTimeout(() => {
      next(files.map((file, i) => 'https://images.wsj.net/im-580612/8SR'))
    }, 5000)
  }}
  onUpdate={console.log}
/>`.trim();

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields', href: '/field' },
    { label: 'Files' }
  ];
  const props = [
    [ _('error'), _('string'), _('No'), _('Standard error input') ],
    [ _('uploading'), _('string'), _('No'), _('Phrased used when uploading files') ],
    [ _('onUpload'), _('Function'), _('Yes'), _('Called when file is loaded') ],
    [ _('onUpdate'), _('Function'), _('No'), _('Update event handler') ],
    [ _('passRef'), _('LegacyRef'), _('No'), _('Standard ref input') ],
    [ _('style'), _('CSS Object'), _('No'), _('Standard CSS input') ],
    [ _('className'), _('string'), _('No'), _('Standard class name input') ],
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow relative h-full">
          <aside className="hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-52 border-l border-b1">
            <h4 className="p-3 border-b border-b1 bg-b1 text-sm uppercase font-semibold">
              {_('Contents')}
            </h4>
            <div className="p-3">
              <Link className="block pb-1" href="#top">Files</Link>
              <ul className="list-disc pl-3">
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
                  <Link href="#update">
                    {_('On Update')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#errors">
                    {_('Errors')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#image">
                    {_('Image')}
                  </Link>
                </li>
                <li className="pl-3 pb-1">
                  <Link href="#styles">
                    {_('Custom Styles')}
                  </Link>
                </li>
              </ul>

              <Link className="block pb-1" href="#files">Multiple Files</Link>
              <Link className="block pb-1" href="#images">Multiple Images</Link>
            </div>
          </aside>
          <div className="lg:absolute top-0 bottom-0 left-0 right-52 px-3 pt-3 pb-5 h-full overflow-auto">
            <h1 id="top" className="flex items-center uppercase font-bold text-xl">
              {_('Files')}
            </h1>
            <Code language="typescript" className="mt-2">
              {`import File from 'frui/fields/File';`}
            </Code>
            
            <h2 id="props" className="uppercase font-bold text-lg mt-8">
              {_('Props')}
            </h2>
            <p>
              <Translate>
                File accepts all props of a standard HTML File 
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
            <p className="py-4">
              <Translate>
                Files have an extra prop called <C 
                  value="onUpload" 
                />. This is where you 
                should add your logic for handling the file upload.
                Using this in combination with <C 
                  value="onUpload" 
                /> will allow you to pass values 
                from upload to to form processing.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <File className="bg-white w-full" onUpload={(file, next) => {
                  //just a mock call
                  setTimeout(() => {
                    next('https://images.wsj.net/im-580612/8SR')
                  }, 5000)
                }} onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {codeBasic}
              </Code>
            </div>

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
                <File error className="bg-white w-full" />
              </div>
              <Code language="typescript">
                {`<File error={string|true} className="bg-white w-full" />`}
              </Code>
            </div>

            <h2 id="image" className="uppercase font-bold text-lg mt-8">
              {_('Image')}
            </h2>
            <Code language="typescript" className="mt-2">
              {`import Image from 'frui/fields/Image';`}
            </Code>
            <p className="py-4">
              <Translate>
                Images is the same as File, except shows the image 
                instead.
              </Translate>
            </p>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
                <ImageField className="bg-white w-full" onUpload={(file, next) => {
                  //just a mock call
                  setTimeout(() => {
                    next('https://images.wsj.net/im-580612/8SR')
                  }, 5000)
                }} onUpdate={value => alert(value)} />
              </div>
              <Code language="typescript">
                {codeImage}
              </Code>
            </div>

            <h2 id="files" className="uppercase font-bold text-lg mt-8">
              {_('Multiple Files')}
            </h2>
            <Code language="typescript" className="mt-2">
              {`import Filelist from 'frui/fields/Filelist';`}
            </Code>
            <p className="py-4">
              <Translate>
                Filelist processes files the same as File and excepts 
                multiple files.
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
                  }, 5000)
                }}
              />
              </div>
              <Code language="typescript">
                {codeFilelist}
              </Code>
            </div>

            <h2 id="images" className="uppercase font-bold text-lg mt-8">
              {_('Multiple Images')}
            </h2>
            <Code language="typescript" className="mt-2">
              {`import Imagelist from 'frui/fields/Imagelist';`}
            </Code>
            <div className="curved overflow-hidden">
              <div className="flex items-center justify-center p-3 bg-b1">
              <Imagelist
                className="w-full bg-white"
                defaultValue={[
                  'https://images.wsj.net/im-580612/8SR', 
                  'https://images.wsj.net/im-580612/8SR'
                ]}
                onUpload={(files, next) => {
                  //just a mock call
                  setTimeout(() => {
                    next(files.map((file, i) => 'https://images.wsj.net/im-580612/8SR'))
                  }, 5000)
                }}
              />
              </div>
              <Code language="typescript">
                {codeImagelist}
              </Code>
            </div>

            <h2 id="styles" className="uppercase font-bold text-lg mt-8">
              {_('Custom Styles')}
            </h2>
            <p className="py-4">
              <Translate>
                You can add your own custom class to files and images
                or use any of the respective 
                <C l value="frui-field-file" />, 
                <C l value="frui-field-file-control" />, 
                <C l value="frui-field-file-reset" />, 
                <C l value="frui-field-file-file" />, and 
                <C l value="frui-field-file-link" /> CSS classes for 
                files. 
              </Translate>
            </p>
            <p className="py-2">
              <Translate>
                For images <C value="frui-field-image" />, 
                <C l value="frui-field-image-control" />, 
                <C l value="frui-field-image-reset" />, 
                <C l value="frui-field-image-file" />, 
                <C l value="frui-field-image-link" />, 
                <C l value="frui-field-image-image" /> CSS classes can 
                be used. 
              </Translate>
            </p>
            <p className="py-2">
              <Translate>
                For file list <C value="frui-field-filelist" />, 
                <C l value="frui-field-filelist-control" />, 
                <C l value="frui-field-filelist-file" />, 
                <C l value="frui-field-filelist-link" />, and 
                <C l value="frui-field-filelist-remove" /> CSS classes 
                can be used. 
              </Translate>
            </p>
            <p className="py-2">
              <Translate>
                And for image list <C value="frui-field-imagelist" />, 
                <C l value="frui-field-imagelist-control" />, 
                <C l value="frui-field-imagelist-file" />, 
                <C l value="frui-field-imagelist-link" />, 
                <C l value="frui-field-imagelist-remove" />, and 
                <C l value="frui-field-imagelist-preview" /> CSS classes 
                can be used.
              </Translate>
            </p>

            <div className="flex items-center border-t border-b1 my-8 pt-8">
              <Link className="text-t2" href="/field">
                <i className="fas fa-arrow-left mr-2"></i>
                {_('Fields')}
              </Link>
              <div className="flex-grow"></div>
              <Link className="text-t2" href="/field/date">
                {_('Dates')}
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}
