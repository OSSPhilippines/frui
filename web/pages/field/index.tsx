//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useRouter } from 'next/router';
//fields
import Image from 'next/image';
import Crumbs from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import Autocomplete from 'frui/dist/fields/Autocomplete';
import Checkbox from 'frui/dist/fields/Checkbox';
import Country from 'frui/dist/fields/Country';
import Currency from 'frui/dist/fields/Currency';
import Date from 'frui/dist/fields/Date';
import Datetime from 'frui/dist/fields/Datetime';
import Fieldset from 'frui/dist/Fieldset';
import File from 'frui/dist/fields/File';
import Filelist from 'frui/dist/fields/Filelist';
import ImageField from 'frui/dist/fields/Image';
import Imagelist from 'frui/dist/fields/Imagelist';
import Input from 'frui/dist/fields/Input';
import Markdown from 'frui/dist/fields/Markdown';
import Mask from 'frui/dist/fields/Mask';
import Metadata from 'frui/dist/fields/Metadata';
import Number from 'frui/dist/fields/Number';
import Password from 'frui/dist/fields/Password';
import Radio from 'frui/dist/fields/Radio';
import Select from 'frui/dist/fields/Select';
import Slug from 'frui/dist/fields/Slug';
import Switch from 'frui/dist/fields/Switch';
import Taglist from 'frui/dist/fields/Taglist';
import Textarea from 'frui/dist/fields/Textarea';
import Textlist from 'frui/dist/fields/Textlist';
import Time from 'frui/dist/fields/Time';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  const router = useRouter();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'rectangle-list', label: 'Fields' }
  ];
  //render
  return (
    <LayoutPanel>
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow pt-3 pb-5 overflow-auto">
          <h1 className="px-3 flex items-center uppercase font-bold text-xl">
            {_('Fields')}
          </h1>
          <p className="px-3 pt-3">
            Thanks to our sponsors, contributors, and users. The 
            following fields have been unlocked and are free to use.
          </p>
          <div className="flex flex-wrap mt-4">
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/autocomplete')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Autocomplete options={[ 'foo', 'bar' ]} value="bar" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Autocomplete')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/checkbox')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Checkbox checked label="Enable" className="text-white" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Checkbox')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/country')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Country className="w-full" value="US" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Country')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/currency')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Currency className="w-full" value="USD" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Currency')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/date')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Date />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Date')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/datetime')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Datetime />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Datetime')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/fieldset')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Input placeholder="Basic Input" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Fieldset')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/file')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <File className="bg-white" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('File')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/filelist')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Filelist className="bg-white" defaultValue={[
                    'https://images.wsj.net/8SR.pdf'
                  ]} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Filelist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/image')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <ImageField className="bg-white" value="https://images.wsj.net/im-580612/8SR" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Image')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/imagelist')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Imagelist className="bg-white" defaultValue={[
                    'https://images.wsj.net/im-580612/8SR'
                  ]} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Imagelist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/input')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Input placeholder="Basic Input" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Input')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/markdown')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Markdown rows={2} defaultValue="# FRUI" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Markdown')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/mask')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Mask mask="999-999-9999" placeholder="999-999-9999" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Mask')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/metadata')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
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
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/number')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Number defaultValue="1234.56" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Number')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/password')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Password value="1234567890" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Password')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/radio')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Radio rounded checked className="text-white" label="Yes" />
                  <Radio rounded checked={false} className="text-white ml-2" label="No" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Radio')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/select')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
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
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/slug')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Slug value="I am a Title" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Slug')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/switch')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Switch ridge checked rounded />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Switch')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/taglist')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Taglist value={['foo', 'bar']} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Taglist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/textarea')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Textarea placeholder="Morbi tincidunt, dolor at sodales auctor, magna eros sagittis enim, ut aliquet velit nulla vel metus." />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Textarea')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/textlist')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
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
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/time')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-black px-3">
                  <Time />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Time')}
                </h2>
              </div>
            </div>
          </div>
          <h2 className="px-3 flex items-center uppercase font-bold text-xl mt-4">
            <i className="fas fa-lock mr-2" />
            {_('Locked')}
          </h2>
          <p className="px-3 pt-3">
            The following fields have are locked until enough there are 
            enough users and demand for such fields.
          </p>
          <div className="flex flex-wrap mt-4">
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 1,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Color')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 3,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('WYSIWYG')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 5,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Checklist')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 7,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Radio Group')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 9,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Multi Select')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 12,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('JSON')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 15,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Range Slider')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  Unlocks at 18,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Code Editor')}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}