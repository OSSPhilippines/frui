//--------------------------------------------------------------------//
// Imports

import { useLanguage } from 'r22n';

//--------------------------------------------------------------------//
// Types

export type MenuItem = {
  icon?: string,
  label: string,
  search: string,
  href: string,
  children?: MenuItem[]
};

export type MenuLinkProps = MenuItem & { 
  pathname: string 
};

export type MenuSectionProps = MenuLinkProps;

export type MenuProps = {
  pathname: string, 
  open?: boolean,
  toggle: () => void
};

//--------------------------------------------------------------------//
// Constants

export const HOME = {
  icon: 'home',
  label: 'Home',
  search: '/',
  href: '/'
};

export const menu: MenuItem[] = [
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
        search: '/component/tabs  ',
        href: '/component/tabs'
      },
      {
        label: 'Tooltip',
        search: '/component/tooltip',
        href: '/component/tooltip'
      }
    ]
  },
  {
    icon: 'rectangle-list',
    label: 'Form',
    search: '/form',
    href: '/form',
    children: [
      {
        label: 'Checkbox',
        search: '/form/checkbox',
        href: '/form/checkbox'
      },
      {
        label: 'Code Editor',
        search: '/form/code-editor',
        href: '/form/code-editor'
      },
      {
        label: 'Color Input',
        search: '/form/color-input',
        href: '/form/color-input'
      },
      {
        label: 'Country Select',
        search: '/form/country-select',
        href: '/form/country-select'
      },
      {
        label: 'Currency Select',
        search: '/form/currency-select',
        href: '/form/currency-select'
      },
      {
        label: 'Date Input',
        search: '/form/date-input',
        href: '/form/date-input'
      },
      {
        label: 'Datetime Input',
        search: '/form/datetime-input',
        href: '/form/datetime-input'
      },
      {
        label: 'File Input',
        search: '/form/file-input',
        href: '/form/file-input'
      },
      {
        label: 'File List',
        search: '/form/file-list',
        href: '/form/file-list'
      },
      {
        label: 'Image Input',
        search: '/form/image-input',
        href: '/form/image-input'
      },
      {
        label: 'Image List',
        search: '/form/image-list',
        href: '/form/image-list'
      },
      {
        label: 'Input',
        search: '/form/input',
        href: '/form/input'
      },
      {
        label: 'Markdown Editor',
        search: '/form/markdown-editor',
        href: '/form/markdown-editor'
      },
      {
        label: 'Mask Input',
        search: '/form/mask-input',
        href: '/form/mask-input'
      },
      {
        label: 'Metadata',
        search: '/form/metadata',
        href: '/form/metadata'
      },
      {
        label: 'Number Input',
        search: '/form/number-input',
        href: '/form/number-input'
      },
      {
        label: 'Password Input',
        search: '/form/password-input',
        href: '/form/password-input'
      },
      {
        label: 'Radio',
        search: '/form/radio',
        href: '/form/radio'
      },
      {
        label: 'Rating',
        search: '/form/rating',
        href: '/form/rating'
      },
      {
        label: 'Select',
        search: '/form/select',
        href: '/form/select'
      },
      {
        label: 'Slider',
        search: '/form/slider',
        href: '/form/slider'
      },
      {
        label: 'Slug Input',
        search: '/form/slug-input',
        href: '/form/slug-input'
      },
      {
        label: 'Suggest Input',
        search: '/form/suggest-input',
        href: '/form/suggest-input'
      },
      {
        label: 'Switch',
        search: '/form/switch',
        href: '/form/switch'
      },
      {
        label: 'Tag List',
        search: '/form/tag-list',
        href: '/form/tag-list'
      },
      {
        label: 'Text Editor',
        search: '/form/text-editor',
        href: '/form/text-editor'
      },
      {
        label: 'Text List',
        search: '/form/text-list',
        href: '/form/text-list'
      },
      {
        label: 'Textarea',
        search: '/form/textarea',
        href: '/form/textarea'
      },
      {
        label: 'Time Input',
        search: '/form/time-input',
        href: '/form/time-input'
      }
    ]
  },
  {
    icon: 'text-height',
    label: 'View',
    search: '/view',
    href: '/view',
    children: [
      {
        label: 'Boolean Format',
        search: '/view/boolean-format',
        href: '/view/boolean-format'
      },      
      {
        label: 'Code Highlighter',
        search: '/view/code-highlighter',
        href: '/view/code-highlighter'
      },
      {
        label: 'Color Format',
        search: '/view/color-format',
        href: '/view/color-format'
      },
      {
        label: 'Country Format',
        search: '/view/country-format',
        href: '/view/country-format'
      },
      {
        label: 'Currency Format',
        search: '/view/currency-format',
        href: '/view/currency-format'
      },
      {
        label: 'Date Format',
        search: '/view/date-format',
        href: '/view/date-format'
      },
      {
        label: 'Email Link',
        search: '/view/email-link',
        href: '/view/email-link'
      },
      {
        label: 'Formula',
        search: '/view/formula',
        href: '/view/formula'
      },
      {
        label: 'HTML',
        search: '/view/html',
        href: '/view/html'
      },
      {
        label: 'Image Carousel',
        search: '/view/image-carousel',
        href: '/view/image-carousel'
      },
      {
        label: 'Image Format',
        search: '/view/image-format',
        href: '/view/image-format'
      },
      {
        label: 'Link Format',
        search: '/view/link-format',
        href: '/view/link-format'
      },
      {
        label: 'List',
        search: '/view/list',
        href: '/view/list'
      },
      {
        label: 'Markdown',
        search: '/view/markdown',
        href: '/view/markdown'
      },
      {
        label: 'Metadata Format',
        search: '/view/metadata-format',
        href: '/view/metadata-format'
      },
      {
        label: 'Number Format',
        search: '/view/number-format',
        href: '/view/number-format'
      },
      {
        label: 'Overflow',
        search: '/view/overflow',
        href: '/view/overflow'
      },
      {
        label: 'Phone Link',
        search: '/view/phone-link',
        href: '/view/phone-link'
      },
      {
        label: 'Rating Format',
        search: '/view/rating-format',
        href: '/view/rating-format'
      },
      {
        label: 'Separate',
        search: '/view/separate',
        href: '/view/separate'
      },
      {
        label: 'Table Format',
        search: '/view/table-format',
        href: '/view/table-format'
      },
      {
        label: 'Taglist Format',
        search: '/view/taglist-format',
        href: '/view/taglist-format'
      },
      {
        label: 'Text',
        search: '/view/text',
        href: '/view/text'
      },
    ]
  },
  {
    icon: 'cogs',
    label: 'Tools',
    search: '/tool',
    href: '/tool',
    children: [
      {
        label: 'When',
        search: '/tool/when',
        href: '/tool/when'
      }
    ]
  }
];

//--------------------------------------------------------------------//
// Helpers

/**
 * Get next menu item by href
 */
export function getNextMenuItem(
  href: string, 
  children = menu
): MenuItem | null {
  //iterate through given children
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    //if item matches href
    if (item.href === href) {
      //return next item or null
      return children[i + 1] || null;
    }
    //if item has children
    if (item.children) {
      //search recursively
      const next = getNextMenuItem(href, item.children);
      //if found next item, return it
      if (next) return next;
      //if any of the children matches href
      if (hasMenuItem(href, item.children)) {
        //it means the item was found in the item children,
        // but there was no next item in the children
        // in this case, we want to return the next item 
        // in the current level (and so on)
        return children[i + 1] || null;
      }
    }
  }
  return null;
};

/**
 * Get previous menu item by href
 */
export function getPrevMenuItem(
  href: string, 
  children = menu
): MenuItem | null {
  //iterate through given children
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    //if item matches href
    if (item.href === href) {
      //return previous item or null
      return children[i - 1] || null;
    }
    //if item has children
    if (item.children) {
      //search recursively
      const prev = getPrevMenuItem(href, item.children);
      //if found previous item, return it
      if (prev) return prev;
      //if any of the children matches href
      if (hasMenuItem(href, item.children)) {
        //it means the item was found in the item children,
        // but there was no previous item in the children
        // in this case, we want to return the previous item
        // in the current level (and so on)
        return children[i - 1] || null;
      }
    }
  }
  return null;
};

export function getParentMenuItem(
  href: string,
  children = menu
): MenuItem | null {
  //iterate through given children
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    //if item has children
    if (item.children) {
      //if any of the children matches href
      if (hasMenuItem(href, item.children, false)) {
        return item;
      }
      const parent = getParentMenuItem(href, item.children);
      if (parent) {
        return parent;
      }
    }
  }
  return null;
};

export function getMenuItem(
  href: string,
  children = menu
): MenuItem | null {
  //iterate through given children
  for (let i = 0; i < children.length; i++) {
    const item = children[i];
    if (item.href === href) {
      return item;
    }
    //if item has children
    if (item.children) {
      const child = getMenuItem(href, item.children);
      if (child) {
        return child;
      }
    }
  }
  return null;
};

/**
 * Get menu item crumbs by href
 */
export function getMenuItemCrumbs(href: string, children = menu) {
  const crumbs: MenuItem[] = [];
  const item = getMenuItem(href, children);
  if (!item) return crumbs;
  let parent: MenuItem | null = null;
  do {
    parent = getParentMenuItem(href, children);
    if (parent) {
      crumbs.unshift(parent);
      href = parent ? parent.href : '';
    }
  } while (parent);
  crumbs.push(item);
  crumbs.unshift(HOME);
  return crumbs;
}

/**
 * Check if a menu item exists by href
 */
export function hasMenuItem(
  href: string, 
  children = menu,
  recursively = true
): boolean {
  return children.some(item => {
    //if item matches href
    if (item.href === href) return true;
    //if item has children
    if (recursively && item.children) {
      //search recursively
      return hasMenuItem(href, item.children);
    }
    return false;
  });
};

//--------------------------------------------------------------------//
// Components

/**
 * Menu link component
 */
export function MenuLink(props: MenuLinkProps) {
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

/**
 * Menu section component
 */
export function MenuSection(props: MenuSectionProps) {
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
          {children.map((item, i) => (<MenuLink key={i} {...item} pathname={pathname} />))}
        </div>
      ): null}
    </div>
  );
};

/**
 * Menu component
 */
export function Menu(props: MenuProps) {
  //props
  const { pathname = '/' } = props;
  //render
  return (
    <div>
      {menu.map((section, i) => (
        <MenuSection key={i} {...section} pathname={pathname} />
      ))}
    </div>
  );
};

export default Object.assign(Menu, {
  menu,
  getNextMenuItem,
  getPrevMenuItem,
  hasMenuItem,
  getMenuItemCrumbs,
  getParentMenuItem,
  Link: MenuLink,
  Section: MenuSection
});