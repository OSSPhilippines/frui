//modules
import { useLanguage } from 'r22n';
//app
import { useTheme } from '../theme/hooks.js';

export type MainMenuProps = { 
  pathname?: string,
  open?: boolean,
  toggle: () => void
};

export type MenuItem = {
  label: string,
  search: string,
  href: string
};

export type SectionItem = {
  icon: string,
  label: string,
  search: string,
  href: string,
  children: MenuItem[];
};

export const menu: SectionItem[] = [
  {
    icon: 'compass',
    label: 'Getting Started',
    search: '/start',
    href: '/start',
    children: []
  },
  {
    icon: 'icons',
    label: 'Components',
    search: '/component',
    href: '/component',
    children: [
      {
        label: 'Accordions',
        search: '/component/accordion',
        href: '/component/accordion'
      },
      {
        label: 'Alerts',
        search: '/component/alert',
        href: '/component/alert'
      },
      {
        label: 'Badges',
        search: '/component/badge',
        href: '/component/badge'
      },
      {
        label: 'Bread Crumbs',
        search: '/component/bread',
        href: '/component/bread'
      },
      {
        label: 'Buttons',
        search: '/component/button',
        href: '/component/button'
      },
      {
        label: 'Dialogs',
        search: '/component/dialog',
        href: '/component/dialog'
      },
      {
        label: 'Loaders',
        search: '/component/loader',
        href: '/component/loader'
      },
      {
        label: 'Notifiers',
        search: '/component/notifier',
        href: '/component/notifier'
      },
      {
        label: 'Pagers',
        search: '/component/pager',
        href: '/component/pager'
      },
      {
        label: 'Progress Bars',
        search: '/component/progress',
        href: '/component/progress'
      },
      {
        label: 'Tables',
        search: '/component/table',
        href: '/component/table'
      },
      {
        label: 'Tabs',
        search: '/component/tabs',
        href: '/component/tabs'
      },
      {
        label: 'Tooltips',
        search: '/component/tooltip',
        href: '/component/tooltip'
      }
    ]
  },
  {
    icon: 'rectangle-list',
    label: 'Fields',
    search: '/field',
    href: '/field',
    children: [
      {
        label: 'Checkbox',
        search: '/field/checkbox',
        href: '/field/checkbox'
      },
      {
        label: 'Code Editor',
        search: '/field/editor',
        href: '/field/editor'
      },
      {
        label: 'Color Picker',
        search: '/field/color',
        href: '/field/color'
      },
      {
        label: 'Country',
        search: '/field/country',
        href: '/field/country'
      },
      {
        label: 'Currency',
        search: '/field/currency',
        href: '/field/currency'
      },
      {
        label: 'Date',
        search: '/field/date',
        href: '/field/date'
      },
      {
        label: 'Datetime',
        search: '/field/datetime',
        href: '/field/datetime'
      },
      {
        label: 'File',
        search: '/field/file',
        href: '/field/file'
      },
      {
        label: 'Filelist',
        search: '/field/filelist',
        href: '/field/filelist'
      },
      {
        label: 'Image',
        search: '/field/image',
        href: '/field/image'
      },
      {
        label: 'Imagelist',
        search: '/field/imagelist',
        href: '/field/imagelist'
      },
      {
        label: 'Input',
        search: '/field/input',
        href: '/field/input'
      },
      {
        label: 'Markdown',
        search: '/field/markdown',
        href: '/field/markdown'
      },
      {
        label: 'Mask',
        search: '/field/mask',
        href: '/field/mask'
      },
      {
        label: 'Metadata',
        search: '/field/metadata',
        href: '/field/metadata'
      },
      {
        label: 'Number',
        search: '/field/number',
        href: '/field/number'
      },
      {
        label: 'Password',
        search: '/field/password',
        href: '/field/password'
      },
      {
        label: 'Radio',
        search: '/field/radio',
        href: '/field/radio'
      },
      {
        label: 'Rating',
        search: '/field/rating',
        href: '/field/rating'
      },
      {
        label: 'Select',
        search: '/field/select',
        href: '/field/select'
      },
      {
        label: 'Slider',
        search: '/field/slider',
        href: '/field/slider'
      },
      {
        label: 'Slug',
        search: '/field/slug',
        href: '/field/slug'
      },
      {
        label: 'Suggest',
        search: '/field/suggest',
        href: '/field/suggest'
      },
      {
        label: 'Switch',
        search: '/field/switch',
        href: '/field/switch'
      },
      {
        label: 'Taglist',
        search: '/field/taglist',
        href: '/field/taglist'
      },
      {
        label: 'Textarea',
        search: '/field/textarea',
        href: '/field/textarea'
      },
      {
        label: 'Textlist',
        search: '/field/textlist',
        href: '/field/textlist'
      },
      {
        label: 'Time',
        search: '/field/time',
        href: '/field/time'
      },
      {
        label: 'WYSIWYG',
        search: '/field/wysiwyg',
        href: '/field/wysiwyg'
      }
    ]
  },
  {
    icon: 'text-height',
    label: 'Formats',
    search: '/format',
    href: '/format',
    children: [
      {
        label: 'Code',
        search: '/format/code',
        href: '/format/code'
      },
      {
        label: 'Color',
        search: '/format/color',
        href: '/format/color'
      },
      {
        label: 'Country',
        search: '/format/country',
        href: '/format/country'
      },
      {
        label: 'Currency',
        search: '/format/currency',
        href: '/format/currency'
      },
      {
        label: 'Date',
        search: '/format/date',
        href: '/format/date'
      },
      {
        label: 'Email',
        search: '/format/email',
        href: '/format/email'
      },
      {
        label: 'Formula',
        search: '/format/formula',
        href: '/format/formula'
      },
      {
        label: 'HTML',
        search: '/format/html',
        href: '/format/html'
      },
      {
        label: 'Image',
        search: '/format/image',
        href: '/format/image'
      },
      {
        label: 'Imagelist',
        search: '/format/imagelist',
        href: '/format/imagelist'
      },
      {
        label: 'JSON',
        search: '/format/json',
        href: '/format/json'
      },
      {
        label: 'Link',
        search: '/format/link',
        href: '/format/link'
      },
      {
        label: 'List',
        search: '/format/list',
        href: '/format/list'
      },
      {
        label: 'Markdown',
        search: '/format/markdown',
        href: '/format/markdown'
      },
      {
        label: 'Metadata',
        search: '/format/metadata',
        href: '/format/metadata'
      },
      {
        label: 'Number',
        search: '/format/number',
        href: '/format/number'
      },
      {
        label: 'Overflow',
        search: '/format/overflow',
        href: '/format/overflow'
      },
      {
        label: 'Phone',
        search: '/format/phone',
        href: '/format/phone'
      },
      {
        label: 'Rating',
        search: '/format/rating',
        href: '/format/rating'
      },
      {
        label: 'Separated',
        search: '/format/separated',
        href: '/format/separated'
      },
      {
        label: 'Table',
        search: '/format/table',
        href: '/format/table'
      },
      {
        label: 'Taglist',
        search: '/format/taglist',
        href: '/format/taglist'
      },
      {
        label: 'Text',
        search: '/format/text',
        href: '/format/text'
      },
      {
        label: 'Yes/No',
        search: '/format/yesno',
        href: '/format/yesno'
      },
    ]
  }
];

export function MenuNav(props: MenuItem & { pathname: string }) {
  //props
  const { pathname, label, search, href } = props;
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <a href={href} className={`${pathname.indexOf(search) === 0 ? 'text-white' : ''} block pl-7 pr-3 py-2 cursor-pointer`}>
      <span className="inline-block pl-2">{_(label)}</span>
    </a>
  );
};

export function MenuSection(props: SectionItem & { pathname: string }) {
  //props
  const { pathname, icon, label, search, href, children = [] } = props;
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <div>
      <a href={href} className={`${pathname.indexOf(search) === 0 ? 'theme-white' : ''} block px-3 py-2 border-t border-solid theme-bc-0 cursor-pointer`}>
        <i className={`theme-2 fas fa-fw fa-${icon}`}></i>
        <span className="inline-block pl-2">{_(label)}</span>
      </a>
      {children.length && pathname.indexOf(search) === 0 ? (
        <div>
          {children.map((item, i) => (<MenuNav key={i} {...item} pathname={pathname} />))}
        </div>
      ): null}
    </div>
  );
};

export default function MainMenu(props: MainMenuProps) {
  //props
  const { toggle, pathname = '/', open = false } = props;
  //hooks
  const { theme } = useTheme();
  //render
  return (
    <aside className={`${theme}-dark w-52 duration-200 absolute top-0 bottom-0 z-50 theme-bg-1 border-r theme-bc-0 text-gray-400 text-sm overflow-auto md:left-0 ${open? 'left-0': '-left-64' }`}>
      <div className="px-3 flex items-center h-16 text-white">
        <a href="/">
          <img alt="logo" className="logo-img" src="/images/frui-icon.png" height="35" width="35" />
        </a>
        <a className="ml-2 uppercase flex-grow" href="/">
          <img alt="text" className="logo-img relative top-0.5" src="/images/frui-text.png" height="25" width="67" />
        </a>
        <button className="md:hidden ml-3" onClick={toggle}>
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      {menu.map((section, i) => (
        <MenuSection key={i} {...section} pathname={pathname} />
      ))}
    </aside>
  );
};