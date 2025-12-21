//--------------------------------------------------------------------//
// Imports

//modules
import { useLanguage } from 'r22n';
//frui
import Checkbox from 'src/form/Checkbox.js';
import CountrySelect from 'src/form/CountrySelect.js';
import CurrencySelect from 'src/form/CurrencySelect.js';
import DateInput from 'src/form/DateInput.js';
import DatetimeInput from 'src/form/DatetimeInput.js';
import FileInput from 'src/form/FileInput.js';
import FileList from 'src/form/FileList.js';
import ImageInput from 'src/form/ImageInput.js';
import ImageList from 'src/form/ImageList.js';
import Input from 'src/form/Input.js';
import MarkdownEditor from 'src/form/MarkdownEditor.js';
import MaskInput from 'src/form/MaskInput.js';
import Metadata from 'src/form/Metadata.js';
import NumberInput from 'src/form/NumberInput.js';
import PasswordInput from 'src/form/PasswordInput.js';
import Radio from 'src/form/Radio.js';
import Rating from 'src/form/Rating.js';
import Select from 'src/form/Select.js';
import Slider from 'src/form/Slider.js';
import SlugInput from 'src/form/SlugInput.js';
import SuggestInput from 'src/form/SuggestInput.js';
import Switch from 'src/form/Switch.js';
import TagList from 'src/form/TagList.js';
import Textarea from 'src/form/Textarea.js';
import TextList from 'src/form/TextList.js';
import TimeInput from 'src/form/TimeInput.js';
//web
import type { PageProps } from '../../../app/types.js';
import Docs from '../../layout/Docs.js';

//--------------------------------------------------------------------//
// Constants

const uri = '/form';
const title = 'Form';
const description = 'Choose from over 25 ReactJS field components '
  + 'to use in your application.';

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
        {_('Form Components')}
      </h1>
      <div className="flex flex-wrap mt-4">
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
          onClick={() => window.location.href = ('/form/country-select')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <CountrySelect className="w-full" value="US" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Country Select')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/currency-select')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <CurrencySelect className="w-full" value="USD" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Currency Select')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/date-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <DateInput />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Date Input')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/datetime-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <DatetimeInput />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Datetime Input')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/file-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <FileInput className="bg-white w-[150px]" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('File Input')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/file-list')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <FileList className="bg-white w-[150px]" defaultValue={[
                'https://images.wsj.net/8SR.pdf'
              ]} />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('File List')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/image-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] theme-bg-1 px-3">
              <ImageInput className="bg-white w-[150px]" value="https://images.wsj.net/im-580612/8SR" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Image Input')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/image-list')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <ImageList className="bg-white w-[150px]" defaultValue={[
                'https://images.wsj.net/im-580612/8SR'
              ]} />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Image List')}
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
          onClick={() => window.location.href = ('/form/markdown-editor')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <MarkdownEditor rows={2} defaultValue="# FRUI" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Markdown Editor')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/mask-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <MaskInput mask="999-999-9999" placeholder="999-999-9999" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Mask Input')}
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
          onClick={() => window.location.href = ('/form/number-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <NumberInput defaultValue="1234.56" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Number Input')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/password-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <PasswordInput value="1234567890" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Password Input')}
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
          onClick={() => window.location.href = ('/form/rating')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Rating value={3.5} max={5} />
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
              <Select className="w-full" options={[]} />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Select')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/range')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <Slider min={0} max={100} step={1} value={50} className='w-full'/>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Slider')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/slug-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <SlugInput value="I am a Title" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Slug Input')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/suggest-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <SuggestInput options={[ 'foo', 'bar' ]} value="bar" />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Suggest Input')}
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
          onClick={() => window.location.href = ('/form/tag-list')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <TagList value={['foo', 'bar']} />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Tag List')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/text-editor')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              TODO
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Text Editor')}
            </h2>
          </div>
        </div>
        <div 
          className="block basis-full sm:basis-1/2 md:basis-1/3 text-center cursor-pointer"
          onClick={() => window.location.href = ('/form/TextList')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <div className="text-left">
                <TextList value={['foobar']} add="Add More" />
              </div>
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('TextList')}
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
          onClick={() => window.location.href = ('/form/time-input')} 
        >
          <div className="m-2 border theme-bc-2 rounded overflow-hidden">
            <div className="flex items-center justify-center h-[130px] w-full theme-bg-1 px-3">
              <TimeInput />
            </div>
            <h2 className="my-2 font-semibold text-center uppercase">
              {_('Time Input')}
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
