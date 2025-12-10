//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage } from 'r22n';
//frui
import {
  Carousel,
  Code,
  Color,
  Country,
  Currency,
  DateFormat,
  EmailLink,
  Film,
  Formula,
  HTML,
  Image,
  Link,
  List,
  Markdown,
  Metadata,
  NumberFormat,
  PhoneLink,
  Rating,
  Spread,
  Tabular,
  Tags,
  TextOverflow,
  TextTransform,
  YesNo
} from 'src/view/index.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/view';
const title = 'View';
const description = 'Formats in FRUI, are ReactJS components designed '
  + 'to map with database data types and integrate easily with ORMs.';

//--------------------------------------------------------------------//
// Components

/**
 * Documentation body component
 */
export function Body() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 px-3 pt-3 '
        + 'pb-5 h-full overflow-auto'
    }>
      <h1 className="flex items-center uppercase font-bold text-xl">
        {_('Formats')}
      </h1>
      <div className="flex flex-wrap mt-4">
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/carousel')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Carousel className="flex" value={[
                'https://images.wsj.net/im-580612/8SR', 
                'https://images.wsj.net/im-580612/8SR'
              ]} width="50" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Carousel')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/code')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Code language='javascript'>{`console.log();`}</Code>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Code Highlighter')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/color')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Color lg value="salmon" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Color')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/country')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Country value="US" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Country')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/currency')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Currency value="USD" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Currency')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/date-format')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <DateFormat value="2024-02-03" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Date Format')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/email-link')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <EmailLink className="theme-2" value="john@doe.com" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Email Link')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/film')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Film className="flex" value={[
                'https://images.wsj.net/im-580612/8SR', 
                'https://images.wsj.net/im-580612/8SR'
              ]} width="50" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Film')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/formula')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              x + y + z = <Formula value="29" formula="{x} + {this} + {y}" data={{ x: 4, y: 5 }} />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Formula')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/html')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <HTML value='<h1><strong style="color: green">Hello</strong> World</h1>' />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('HTML')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/image')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Image value="https://images.wsj.net/im-580612/8SR" width="100" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Image')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/link')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div className="text-left">
                <Link className="theme-2" value="https://images.wsj.net/im-580612/8SR" />
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Link')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/list')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
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
          onClick={() => window.location.href = ('/view/markdown')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
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
          onClick={() => window.location.href = ('/view/metadata')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div className="text-left">
                <Metadata 
                  className="p-2 border-t theme-bc-0" 
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
          onClick={() => window.location.href = ('/view/number-format')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div className="text-left">
                <NumberFormat value="12345.67" separator="," decimal="." decimals={2} />
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Number Format')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/phone-link')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <PhoneLink className="theme-2" value="+1 (410) 555-2424" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Phone Link')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/rating')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
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
          onClick={() => window.location.href = ('/view/spread')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Spread value={['Foo', 'bar']} separator=" - " />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Spread')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/tabular')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div className="text-left text-black w-full">
                <Tabular value={[
                  { id: 1, name: 'John Doe' },
                ]} stripes={['#CCCCCC', '#EFEFEF', '#FCFCFC']} />
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Tabular')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/tags')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Tags className="rounded-full bg-orange-600 mr-1" value={[ 'electronics', 'laptop' ]} />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Tags')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/text-overflow')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div className="text-left">
                <TextOverflow value="Lorem Ipsum" length={8} hellip />
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('TextOverflow')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/view/text-transform')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <TextTransform format="capitalize" value="i am a title" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Text Transform')}
            </h2>
          </div>
        </div>
      </div>
      <div 
        className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
        onClick={() => window.location.href = ('/view/yesno')} 
      >
        <div className="m-2 border theme-bc-2 rounded overflow-hidden">
          <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
            <YesNo value={true} />
          </div>
          <h2 className="my-2 font-semibold text-center uppercase">
            {_('Yes/No')}
          </h2>
        </div>
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
      <Body />
    </Docs>
  );
};

//defaults to page
export default Page;
