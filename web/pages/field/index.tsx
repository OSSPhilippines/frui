//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
//fields
import Link from 'next/link';
import Crumbs from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import Mask from 'frui/dist/fields/Mask';
import File from 'frui/dist/fields/File';
import Country from 'frui/dist/fields/Country';
import Taglist from 'frui/dist/fields/Taglist';
import Textarea from 'frui/dist/fields/Textarea';
import Metadata from 'frui/dist/fields/Metadata';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
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
        <div className="flex-grow px-3 pt-3 pb-5 overflow-auto">
          <h1 className="flex items-center uppercase font-bold text-xl">
            {_('Fields')}
          </h1>
          <div className="flex flex-wrap mt-4">
            <Link 
              className="block basis-1/2 md:basis-1/3 text-center" 
              href="/field/input"
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Mask mask="999-999-9999" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Inputs')}
                </h2>
              </div>
            </Link>
            <Link 
              className="block basis-1/2 md:basis-1/3 text-center" 
              href="/field/file"
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black">
                  <File />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Files')}
                </h2>
              </div>
            </Link>
            <Link 
              className="block basis-1/2 md:basis-1/3 text-center" 
              href="/field/option"
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black">
                  <Country className="!border-b1 text-black" value="US" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Options')}
                </h2>
              </div>
            </Link>
            <Link 
              className="block basis-1/2 md:basis-1/3 text-center" 
              href="/field/tag"
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black">
                  <Taglist defaultValue={['foo', 'bar']} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Tags')}
                </h2>
              </div>
            </Link>
            <Link 
              className="block basis-1/2 md:basis-1/3 text-center" 
              href="/field/textarea"
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Textarea />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Textareas')}
                </h2>
              </div>
            </Link>
            <Link 
              className="block basis-1/2 md:basis-1/3 text-center" 
              href="/field/fieldset"
            >
              <div className="m-2 border border-b2 rounded overflow-auto">
                <div className="flex items-center justify-center h-[100px] w-full bg-black px-3">
                  <Metadata />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Fieldsets')}
                </h2>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}