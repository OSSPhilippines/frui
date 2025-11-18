import { useLanguage } from 'r22n';

import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead
} from 'plugins/app/index.js';
import Bread from 'components/Bread.js';

import {
  Autocomplete,
  Checkbox,
  Checklist,
  ChecklistItem,
  CodeEditor,
  //ColorPicker,
  Country,
  Currency,
  Date,
  Datetime,
  File,
  Filelist,
  Image as ImageField,
  Imagelist,
  Input,
  Knob,
  Markdown,
  Mask,
  Metadata,
  Number,
  Password,
  Radio,
  //Rating,
  Select,
  Slug,
  Switch,
  Taglist,
  Textarea,
  Textlist,
  Time,
  //WYSIWYG
} from 'components/form/index.js';

const crumbs: Crumb[] = [
  { icon: 'icons', label: 'Components', href: '/component' },
  { label: 'Crumbs' }
];

export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <LayoutPanel pathname="/form">
      <main className="flex flex-col h-full w-full">
        <div className="p-3 theme-bg-2">
          <Crumbs crumbs={crumbs} />
        </div>
        <section className="flex-grow relative h-full">
          <h1 className="px-3 flex items-center uppercase font-bold text-xl">
            {_('Fields')}
          </h1>
          <p className="px-3 pt-3">
            Thanks to our sponsors, contributors, and users. The 
            following fields have been unlocked and are free to use.
          </p>
          <div className="flex flex-wrap mt-4">
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/autocomplete')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Autocomplete options={[ 'foo', 'bar' ]} value="bar" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Autocomplete')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/checkbox')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Checkbox checked label="Enable" className="text-white" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Checkbox')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/checklist')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                <Checklist name="Options">
                  <ChecklistItem label="Option 1" value="option1" />
                  <ChecklistItem label="Option 2" value="option2" />
                  <ChecklistItem label="Option 3" value="option3" />
                </Checklist>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Checklist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/code-editor')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <CodeEditor setup='basic' className="w-[60%] h-[50%] bg-white" value='console.log("Hello, World!");' language='ts'/>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Code Editor')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/country')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Country className="w-full" value="US" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Country')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/currency')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Currency className="w-full" value="USD" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Currency')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/date')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Date />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Date')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/datetime')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Datetime />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Datetime')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/formset')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <div className="text-left">
                    <Textlist value={['foobar']} add="Add More" />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Fieldset')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/file')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <File className="bg-white w-[150px]" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('File')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/filelist')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Filelist className="bg-white w-[150px]" defaultValue={[
                    'https://images.wsj.net/8SR.pdf'
                  ]} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Filelist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/image')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] theme-bg-1 px-3">
                  <ImageField className="bg-white w-[150px]" value="https://images.wsj.net/im-580612/8SR" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Image')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/imagelist')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Imagelist className="bg-white w-[150px]" defaultValue={[
                    'https://images.wsj.net/im-580612/8SR'
                  ]} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Imagelist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/input')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Input placeholder="Basic Input" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Input')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/json')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('JSON')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/knob')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Knob defaultValue={30} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Knob')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/markdown')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Markdown rows={2} defaultValue="# FRUI" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Markdown')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/mask')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Mask mask="999-999-9999" placeholder="999-999-9999" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Mask')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/metadata')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <div className="text-left">
                    <Metadata add="Add More" value={Object.entries({ foo: 'bar' })} />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Metadata')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/number')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Number defaultValue="1234.56" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Number')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/password')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Password value="1234567890" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Password')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/radio')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Radio rounded checked className="text-white" label="Yes" />
                  <Radio rounded checked={false} className="text-white ml-2" label="No" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Radio')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/radiogroup')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Radio Group')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/range')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Range Slider')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/rating')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Rating')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/select')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Select className="w-full" options={[]} value={{
                    label: (
                      <div className="flex items-center w-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="foobar" height="30" width="30" src="https://e7.pngegg.com/pngimages/971/854/png-clipart-white-and-gray-illustration-angle-symbol-snout-fictional-character-black-metroui-apps-foobar-angle-logo-thumbnail.png" />
                          <div className="ml-2 text-left flex-grow">Foobar</div>
                          <i className="fas fa-chevron-down"></i>
                      </div>
                    ),
                    value: 'bar'
                  }} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Select')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/slug')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Slug value="I am a Title" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Slug')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/switch')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Switch ridge checked rounded />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Switch')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/taglist')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Taglist value={['foo', 'bar']} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Taglist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/textarea')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Textarea placeholder="Morbi tincidunt, dolor at sodales auctor, magna eros sagittis enim, ut aliquet velit nulla vel metus." />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Textarea')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/textlist')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <div className="text-left">
                    <Textlist value={['foobar']} add="Add More" />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Textlist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/time')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  <Time />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Time')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => window.location.href = ('/form/wysiwyg')} 
            >
              <div className="m-2 border theme-bc-2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
                  TODO
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('WYSIWYG')}
                </h2>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LayoutPanel>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/form"
      title="Fields"
      description="Choose from over 25 ReactJS field components to use in your application."
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
