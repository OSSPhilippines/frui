//types
import type { MouseEventHandler } from 'react';
//components
import Link from 'next/link';
import Image from 'next/image';
//hooks
import { usePathname } from "next/navigation";
import { useLanguage } from 'r22n';
import { useTheme } from '../../hooks';

const MainMenu: React.FC<{ 
  open?: boolean,
  toggle: MouseEventHandler 
}> = ({ toggle, open = false }) => {
  const pathname = usePathname();
  const { _ } = useLanguage();
  const { theme } = useTheme();
  return (
    <aside className={`${theme}-dark w-52 duration-200 absolute top-0 bottom-0 z-50 bg-b1 border-r border-b0 text-gray-400 text-sm overflow-auto md:left-0 ${open? 'left-0': '-left-64' }`}>
      <div className="px-3 flex items-center h-16 text-white">
        <Link href="/">
          <Image alt="logo" className="logo-img" src="/frui-icon.png" height="35" width="35" />
        </Link>
        <Link className="ml-2 uppercase flex-grow" href="/">
          <Image alt="text" className="logo-img relative top-0.5" src="/frui-text.png" height="25" width="67" />
        </Link>
        <button className="md:hidden ml-3" onClick={toggle}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      <Link href="/start" className={`${pathname.indexOf('/start') === 0 ? 'text-white' : ''} block px-3 py-2 border-t border-solid border-b0 cursor-pointer`}>
        <i className={`text-t2 fas fa-fw fa-compass`}></i>
        <span className="inline-block pl-2">{_('Getting Started')}</span>
      </Link>
      <Link href="/component" className={`${pathname.indexOf('/component') === 0 ? 'text-white' : ''} block px-3 py-2 cursor-pointer`}>
        <i className={`text-t2 fas fa-fw fa-icons`}></i>
        <span className="inline-block pl-2">{_('Components')}</span>
      </Link>
      <div className={pathname.indexOf('/component') === 0 ? 'block' : 'hidden'}>
        <Link href="/component/alert" className={`${pathname.indexOf('/component/alert') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Alert')}</span>
        </Link>
        <Link href="/component/badge" className={`${pathname.indexOf('/component/badge') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Badge')}</span>
        </Link>
        <Link href="/component/button" className={`${pathname.indexOf('/component/button') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Button')}</span>
        </Link>
        <Link href="/component/loader" className={`${pathname.indexOf('/component/loader') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Loader')}</span>
        </Link>
        <Link href="/component/modal" className={`${pathname.indexOf('/component/modal') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Modal')}</span>
        </Link>
        <Link href="/component/table" className={`${pathname.indexOf('/component/table') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Table')}</span>
        </Link>
        <Link href="/component/tabs" className={`${pathname.indexOf('/component/tabs') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Tabs')}</span>
        </Link>
        <Link href="/component/tooltip" className={`${pathname.indexOf('/component/tooltip') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Tooltip')}</span>
        </Link>
      </div>
      <Link href="/field" className={`${pathname.indexOf('/field') === 0 ? 'text-white' : ''} block px-3 py-2`}>
        <i className={`text-t2 fas fa-fw fa-rectangle-list`}></i>
        <span className="inline-block pl-2">{_('Fields')}</span>
      </Link>
      <div className={pathname.indexOf('/field') === 0 ? 'block' : 'hidden'}>
        <Link href="/field/autocomplete" className={`${pathname.indexOf('/field/autocomplete') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Autocomplete')}</span>
        </Link>
        <Link href="/field/checkbox" className={`${pathname.indexOf('/field/checkbox') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Checkbox')}</span>
        </Link>
        <Link href="/field/checklist" className={`${pathname.indexOf('/field/checklist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Checklist')}</span>
        </Link>
        <Link href="/field/code-editor" className={`${pathname.indexOf('/field/code-editor') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Code Editor')}</span>
        </Link>
        <Link href="/field/color-picker" className={`${pathname.indexOf('/field/color-picker') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Color Picker')}</span>
        </Link>
        <Link href="/field/country" className={`${pathname.indexOf('/field/country') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Country')}</span>
        </Link>
        <Link href="/field/currency" className={`${pathname.indexOf('/field/currency') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Currency')}</span>
        </Link>
        <Link href="/field/date" className={`${pathname === '/field/date' ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Date')}</span>
        </Link>
        <Link href="/field/datetime" className={`${pathname.indexOf('/field/datetime') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Datetime')}</span>
        </Link>
        <Link href="/field/fieldset" className={`${pathname.indexOf('/field/fieldset') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Fieldset')}</span>
        </Link>
        <Link href="/field/file" className={`${pathname === '/field/file' ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('File')}</span>
        </Link>
        <Link href="/field/filelist" className={`${pathname.indexOf('/field/filelist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Filelist')}</span>
        </Link>
        <Link href="/field/image" className={`${pathname === '/field/image' ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Image')}</span>
        </Link>
        <Link href="/field/imagelist" className={`${pathname.indexOf('/field/imagelist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Imagelist')}</span>
        </Link>
        <Link href="/field/input" className={`${pathname.indexOf('/field/input') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Input')}</span>
        </Link>
        <Link href="/field/knob" className={`${pathname.indexOf('/field/knob') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Knob')}</span>
        </Link>
        <Link href="/field/markdown" className={`${pathname.indexOf('/field/markdown') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Markdown')}</span>
        </Link>
        <Link href="/field/mask" className={`${pathname.indexOf('/field/mask') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Mask')}</span>
        </Link>
        <Link href="/field/metadata" className={`${pathname.indexOf('/field/metadata') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Metadata')}</span>
        </Link>
        <Link href="/field/multiselect" className={`${pathname.indexOf('/field/multiselect') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Multiselect')}</span>
        </Link>
        <Link href="/field/number" className={`${pathname.indexOf('/field/number') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Number')}</span>
        </Link>
        <Link href="/field/password" className={`${pathname.indexOf('/field/password') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Password')}</span>
        </Link>
        <Link href="/field/radio" className={`${pathname.indexOf('/field/radio') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Radio')}</span>
        </Link>
        <Link href="/field/rating" className={`${pathname.indexOf('/field/rating') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Rating')}</span>
        </Link>
        <Link href="/field/select" className={`${pathname.indexOf('/field/select') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Select')}</span>
        </Link>
        <Link href="/field/slug" className={`${pathname.indexOf('/field/slug') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Slug')}</span>
        </Link>
        <Link href="/field/switch" className={`${pathname.indexOf('/field/switch') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Switch')}</span>
        </Link>
        <Link href="/field/taglist" className={`${pathname.indexOf('/field/taglist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Taglist')}</span>
        </Link>
        <Link href="/field/textarea" className={`${pathname.indexOf('/field/textarea') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Textarea')}</span>
        </Link>
        <Link href="/field/textlist" className={`${pathname.indexOf('/field/textlist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Textlist')}</span>
        </Link>
        <Link href="/field/time" className={`${pathname.indexOf('/field/time') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Time')}</span>
        </Link>
      </div>
      <Link href="/format" className={`${pathname.indexOf('/format') === 0 ? 'text-white' : ''} block px-3 py-2`}>
        <i className={`text-t2 fas fa-fw fa-text-height`}></i>
        <span className="inline-block pl-2">{_('Formats')}</span>
      </Link>
      <div className={pathname.indexOf('/format') === 0 ? 'block' : 'hidden'}>
        <Link href="/format/code" className={`${pathname.indexOf('/format/code') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Code')}</span>
        </Link>
        <Link href="/format/color" className={`${pathname.indexOf('/format/color') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Color')}</span>
        </Link>
        <Link href="/format/country" className={`${pathname.indexOf('/format/country') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Country')}</span>
        </Link>
        <Link href="/format/date" className={`${pathname.indexOf('/format/date') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Date')}</span>
        </Link>
        <Link href="/format/email" className={`${pathname.indexOf('/format/email') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Email')}</span>
        </Link>
        <Link href="/format/formula" className={`${pathname.indexOf('/format/formula') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Formula')}</span>
        </Link>
        <Link href="/format/html" className={`${pathname.indexOf('/format/html') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('HTML')}</span>
        </Link>
        <Link href="/format/image" className={`${pathname === '/format/image' ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Image')}</span>
        </Link>
        <Link href="/format/imagelist" className={`${pathname.indexOf('/format/imagelist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Imagelist')}</span>
        </Link>
        <Link href="/format/json" className={`${pathname.indexOf('/format/json') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('JSON')}</span>
        </Link>
        <Link href="/format/link" className={`${pathname.indexOf('/format/link') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Link')}</span>
        </Link>
        <Link href="/format/list" className={`${pathname.indexOf('/format/list') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('List')}</span>
        </Link>
        <Link href="/format/markdown" className={`${pathname.indexOf('/format/markdown') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Markdown')}</span>
        </Link>
        <Link href="/format/metadata" className={`${pathname.indexOf('/format/metadata') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Metadata')}</span>
        </Link>
        <Link href="/format/number" className={`${pathname.indexOf('/format/number') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Number')}</span>
        </Link>
        <Link href="/format/overflow" className={`${pathname.indexOf('/format/overflow') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Overflow')}</span>
        </Link>
        <Link href="/format/phone" className={`${pathname.indexOf('/format/phone') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Phone')}</span>
        </Link>
        <Link href="/format/rating" className={`${pathname.indexOf('/format/rating') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Rating')}</span>
        </Link>
        <Link href="/format/separated" className={`${pathname.indexOf('/format/separated') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Separated')}</span>
        </Link>
        <Link href="/format/table" className={`${pathname.indexOf('/format/table') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Table')}</span>
        </Link>
        <Link href="/format/taglist" className={`${pathname.indexOf('/format/taglist') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Taglist')}</span>
        </Link>
        <Link href="/format/text" className={`${pathname.indexOf('/format/text') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Text')}</span>
        </Link>
        <Link href="/format/yesno" className={`${pathname.indexOf('/format/yesno') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Yes/No')}</span>
        </Link>
      </div>
    </aside>
  );
};

export default MainMenu;