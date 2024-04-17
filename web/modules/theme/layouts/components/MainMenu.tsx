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
          <Image alt="logo" className="logo-img" src="/frui/frui-icon.png" height="35" width="35" />
        </Link>
        <Link className="ml-2 uppercase flex-grow" href="/">
          <Image alt="text" className="logo-img relative top-0.5" src="/frui/frui-text.png" height="25" width="67" />
        </Link>
        <button className="md:hidden ml-3" onClick={toggle}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      <Link href="/start" className={`${pathname.indexOf('/start') === 0 ? 'text-white' : ''} block px-3 py-2 border-t border-solid border-b0 cursor-pointer`}>
        <i className={`text-t2 fas fa-fw fa-compass`}></i>
        <span className="inline-block pl-2">{_('Getting Started')}</span>
      </Link>
      <Link href="/component" className={`${pathname.indexOf('/component') === 0 ? 'text-white' : ''} block px-3 py-2 border-t border-solid border-b0 cursor-pointer`}>
        <i className={`text-t2 fas fa-fw fa-icons`}></i>
        <span className="inline-block pl-2">{_('Components')}</span>
      </Link>
      <div>
        <Link href="/component/alert" className={`${pathname.indexOf('/component/alert') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Alerts')}</span>
        </Link>
        <Link href="/component/badge" className={`${pathname.indexOf('/component/badge') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Badges')}</span>
        </Link>
        <Link href="/component/button" className={`${pathname.indexOf('/component/button') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Buttons')}</span>
        </Link>
        <Link href="/component/loader" className={`${pathname.indexOf('/component/loader') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Loaders')}</span>
        </Link>
        <Link href="/component/modal" className={`${pathname.indexOf('/component/modal') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Modals')}</span>
        </Link>
        <Link href="/component/table" className={`${pathname.indexOf('/component/table') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Tables')}</span>
        </Link>
      </div>
      <Link href="/field" className={`${pathname.indexOf('/field') === 0 ? 'text-white' : ''} block px-3 py-2 border-t border-solid border-b0 cursor-pointer`}>
        <i className={`text-t2 fas fa-fw fa-rectangle-list`}></i>
        <span className="inline-block pl-2">{_('Fields')}</span>
      </Link>
      <div>
        <Link href="/field/fieldset" className={`${pathname.indexOf('/field/fieldset') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Fieldsets')}</span>
        </Link>
        <Link href="/field/file" className={`${pathname.indexOf('/field/file') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Files')}</span>
        </Link>
        <Link href="/field/input" className={`${pathname.indexOf('/field/input') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Inputs')}</span>
        </Link>
        <Link href="/field/options" className={`${pathname.indexOf('/field/options') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Options')}</span>
        </Link>
        <Link href="/field/tags" className={`${pathname.indexOf('/field/tags') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Tags')}</span>
        </Link>
        <Link href="/field/textarea" className={`${pathname.indexOf('/field/textarea') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Textarea')}</span>
        </Link>
      </div>
      <Link href="/format" className={`${pathname.indexOf('/format') === 0 ? 'text-white' : ''} block px-3 py-2 border-t border-solid border-b0 cursor-pointer`}>
        <i className={`text-t2 fas fa-fw fa-text-height`}></i>
        <span className="inline-block pl-2">{_('Formats')}</span>
      </Link>
      <div>
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
          <span className="inline-block pl-2">{_('Formulas')}</span>
        </Link>
        <Link href="/format/html" className={`${pathname.indexOf('/format/html') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('HTML')}</span>
        </Link>
        <Link href="/format/image" className={`${pathname.indexOf('/format/image') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Images')}</span>
        </Link>
        <Link href="/format/json" className={`${pathname.indexOf('/format/json') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('JSON')}</span>
        </Link>
        <Link href="/format/link" className={`${pathname.indexOf('/format/link') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Links')}</span>
        </Link>
        <Link href="/format/list" className={`${pathname.indexOf('/format/list') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Lists')}</span>
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
          <span className="inline-block pl-2">{_('Tables')}</span>
        </Link>
        <Link href="/format/tags" className={`${pathname.indexOf('/format/tags') === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
          <span className="inline-block pl-2">{_('Tags')}</span>
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