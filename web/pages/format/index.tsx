//types
import type { Crumb } from 'modules/components/Crumbs';
//hooks
import { useLanguage } from 'r22n';
import { useRouter } from 'next/router';
//fields
import Crumbs from 'modules/components/Crumbs';
import { LayoutPanel } from 'modules/theme';
import Code from 'frui/format/Code';
import Color from 'frui/format/Color';
import Country from 'frui/format/Country';
import Currency from 'frui/format/Currency';
import Date from 'frui/format/Date';
import Email from 'frui/format/Email';
import Formula from 'frui/format/Formula';
import HTML from 'frui/format/HTML';
import ImageFormat from 'frui/format/Image';
import Imagelist from 'frui/format/Imagelist';
import JSON from 'frui/format/JSON';
import Link from 'frui/format/Link';
import List from 'frui/format/List';
import Markdown from 'frui/format/Markdown';
import Metadata from 'frui/format/Metadata';
import Number from 'frui/format/Number';
import Overflow from 'frui/format/Overflow';
import Phone from 'frui/format/Phone';
import Rating from 'frui/format/Rating';
import Separated from 'frui/format/Separated';
import Table from 'frui/format/Table';
import Taglist from 'frui/format/Taglist';
import Text from 'frui/format/Text';
import Yesno from 'frui/format/Yesno';

export default function Home() {
  //hooks
  const { _ } = useLanguage();
  const router = useRouter();
  //variables
  const crumbs: Crumb[] = [
    { icon: 'text-height', label: 'Formats' }
  ];
  //render
  return (
    <LayoutPanel 
      uri="/format"
      title="Formats"
      description="Formats in FRUI, are ReactJS components designed to map with database data types and integrate easily with ORMs."
    >
      <main className="flex flex-col h-full w-full">
        <div className="p-3 bg-b2">
          <Crumbs crumbs={crumbs} />
        </div>
        <div className="flex-grow pt-3 pb-5 overflow-auto">
          <h1 className="px-3 flex items-center uppercase font-bold text-xl">
            {_('Formats')}
          </h1>
          <p className="px-3 pt-3">
            Thanks to our sponsors, contributors, and users. The 
            following formats have been unlocked and are free to use.
          </p>
          <div className="flex flex-wrap mt-4">
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/code')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Code language='javascript'>{`console.log("Hello, World!");`}</Code>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Code')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/color')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Color lg value="salmon" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Color')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/country')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Country value="US" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Country')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/currency')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Currency value="USD" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Currency')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/date')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Date value="2024-02-03" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Date')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/email')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Email className="text-t2" value="john@doe.com" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Email')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/formula')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  x + y + z = <Formula value="29" formula="{x} + {this} + {y}" data={{ x: 4, y: 5 }} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Formula')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/html')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <HTML value='<h1><strong style="color: green">Hello</strong> World</h1>' />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('HTML')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/image')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <ImageFormat value="https://images.wsj.net/im-580612/8SR" width="100" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Image')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/imagelist')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Imagelist className="flex" value={[
                    'https://images.wsj.net/im-580612/8SR', 
                    'https://images.wsj.net/im-580612/8SR'
                  ]} width="50" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Imagelist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/json')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <JSON value={{foo: 'foo', bar: 'bar'}} />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('JSON')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/json')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Link className="text-t2" value="https://images.wsj.net/im-580612/8SR" />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Link')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/list')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <List value={['electronics', 'laptops']} />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('List')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/markdown')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Markdown value="# Hello **World**" />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Markdown')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/metadata')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Metadata 
                      className="p-2 border-t border-b0" 
                      value={{ id: '12345', upc: '67890' }} 
                    />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Metadata')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/number')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Number value="12345.67" separator="," decimal="." decimals={2} />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Number')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/overflow')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left">
                    <Overflow value="Lorem Ipsum" length={8} hellip />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Overflow')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/phone')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Phone className="text-t2" value="+1 (410) 555-2424" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Phone')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/rating')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-t-warning">
                    <Rating value="3.5" max={5} remainder round="floor" />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Rating')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/separated')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Separated value={['Foo', 'bar']} separator=" - " />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Separated')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/table')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <div className="text-left text-black w-full">
                    <Table value={[
                      { id: 1, name: 'John Doe' },
                    ]} stripes={['#CCCCCC', '#EFEFEF', '#FCFCFC']} />
                  </div>
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Table')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/taglist')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Taglist className="rounded-full bg-orange-600 mr-1" value={[ 'electronics', 'laptop' ]} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Taglist')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/text')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Text format="capitalize" value="i am a title" />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Text')}
                </h2>
              </div>
            </div>
            <div 
              className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
              onClick={() => router.push('/format/yesno')} 
            >
              <div className="m-2 border border-b2 rounded overflow-hidden">
                <div className="flex items-center justify-center h-[130px] w-full bg-b1 px-3">
                  <Yesno value={true} />
                </div>
                <h2 className="my-2 font-semibold text-center uppercase">
                  {_('Yesno')}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutPanel>
  );
}