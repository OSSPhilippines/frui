//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useRouter } from 'next/router';
//fields
import Crumbs from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import Input from 'frui/dist/fields/Input';
import Datetime from 'frui/dist/fields/Datetime';
import Mask from 'frui/dist/fields/Mask';
import Number from 'frui/dist/fields/Number';
import Password from 'frui/dist/fields/Password';
import Slug from 'frui/dist/fields/Slug';
import File from 'frui/dist/fields/File';
import Country from 'frui/dist/fields/Country';
import Taglist from 'frui/dist/fields/Taglist';
import Textarea from 'frui/dist/fields/Textarea';
import Textlist from 'frui/dist/fields/Textlist';

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
              onClick={() => router.push('/field/input')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Input placeholder="Basic Input" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Inputs')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/date')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Datetime />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Dates')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/input')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Mask mask="999-999-9999" placeholder="999-999-9999" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Masks')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/input')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Number placeholder="1,234.56" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Numbers')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/input')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Password className="w-full" placeholder="*******" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Passwords')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/input')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Slug value="I am a Title" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Slugs')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/file')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black">
                  <File className="bg-white" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Files')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/option')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black">
                  <Country className="!border-b1 text-black" value="US" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Options')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/tag')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black">
                  <Taglist defaultValue={['foo', 'bar']} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Tags')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/textarea')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Textarea placeholder="Morbi tincidunt, dolor at sodales auctor, magna eros sagittis enim, ut aliquet velit nulla vel metus." />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Textareas')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/textarea')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Textarea placeholder="Morbi tincidunt, dolor at sodales auctor, magna eros sagittis enim, ut aliquet velit nulla vel metus." />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Markdown')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/field/fieldset')} 
            >
              <div className="m-2 border border-b2 rounded overflow-auto">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <div className="text-left">
                    <Textlist value={['foobar']} add="Add More" />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Fieldsets')}
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
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 1,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Colors')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 3,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('WYSIWYG')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 5,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Checklists')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 7,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Radio Groups')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 9,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('JSON Inputs')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 12,000 downloads
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Range Sliders')}
                </h2>
              </div>
            </div>
            <div className="block basis-1/2 md:basis-1/3 text-center cursor-pointer">
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-b1 px-3">
                  Unlocks at 15,000 downloads
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