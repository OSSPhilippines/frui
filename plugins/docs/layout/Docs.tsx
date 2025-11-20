//--------------------------------------------------------------------//
// Imports

//modules
import { createContext, useContext, useEffect } from 'react';

//frui
import type { ChildrenProps } from 'components/types.js';
import { unload } from 'components/Notifier.js';
import Bread from 'components/Bread.js';

//plugins
import type { MenuItem } from './Menu.js';
import { useThemeContext, ThemeHead } from '../../app/Theme.js';
import Menu from './Menu.js';
import { 
  useLayoutToggle, 
  LayoutHead,
  LayoutLeft,
  LayoutProvider 
} from '../../app/Layout.js';
import Code, { InlineCode } from '../components/Code.js';
import Props from '../components/Props.js';
import Preview from '../components/Preview.js';

//--------------------------------------------------------------------//
// Types

export type DocsContextProps = {
  pathname: string,
  prev: () => MenuItem | null,
  next: () => MenuItem | null
};

export type DocsMenuProps = {
  pathname: string,
  open?: boolean,
  toggle: () => void
};

export type DocsBodyProps = ChildrenProps;

export type DocsPageProps = ChildrenProps & {
  pathname: string
};

//--------------------------------------------------------------------//
// Hooks

export function useDocsContext() {
  return useContext(DocsContext);
};

//--------------------------------------------------------------------//
// Components

export const DocsContext = createContext<DocsContextProps>({
  pathname: '',
  prev: () => null,
  next: () => null
});


/**
 * Docs menu (left) component
 */
export function DocsMenu(props: DocsMenuProps) {
  //props
  const { toggle, pathname = '/', open = false } = props;
  //hooks
  const { theme } = useThemeContext();
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
      <Menu open={open} pathname={pathname} toggle={toggle} />
    </aside>
  );
};

/**
 * Builds breadcrumb component based on current pathname
 */
export function DocsCrumbs() {
  const { pathname } = useDocsContext();
  const crumbs = Menu.getMenuItemCrumbs(pathname);
  if (crumbs.length === 0) return null;
  return (
    <Bread crumb={({ active }) => active ? 'font-bold' : 'font-normal'}>
      <Bread.Slicer />
      {crumbs.map((item, i) => i < (crumbs.length - 1) ? (
        <Bread.Crumb key={i} icon={item.icon} href={item.href}>
          {item.label}
        </Bread.Crumb>
      ): (
        <Bread.Crumb key={i}>{item.label}</Bread.Crumb>
      ))}
    </Bread>
  );
};

/**
 * Layout panel footer component
 */
export function DocsFoot() {
  const { pathname } = useDocsContext();
  //find pathname in menu
  const prev = Menu.getPrevMenuItem(pathname);
  const next = Menu.getNextMenuItem(pathname);
  //render
  return (
    <footer className="flex items-center border-t theme-bg-2 mt-8 p-4">
      {!!prev && (
        <a className="theme-2" href={prev.href}>
          <i className="fas fa-arrow-left mr-2"></i>
          {prev.label}
        </a>
      )}
      {!!next && (
        <>
          <div className="flex-grow"></div>
          <a className="theme-2" href={next.href}>
            {next.label}
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </>
      )}
    </footer>
  );
};

/**
 * Docs body component
 */
export function DocsBody(props: DocsBodyProps) {
  //props
  const { children } = props;
  //hooks
  const [ opened, toggle ] = useLayoutToggle();
  const { ready, theme, mode } = useThemeContext();
  const { pathname } = useDocsContext();
  //effects
  // unload flash message
  useEffect(() => { unload() }, []);
  //render
  if (!ready) return null;
  return (
    <section className={`${theme}-${mode} theme-bg-0 theme-1 relative w-full h-full overflow-hidden`}>
      <LayoutHead toggle={toggle} />
      <LayoutLeft open={opened} toggle={toggle}>
        <DocsMenu pathname={pathname || '/'} open={opened} toggle={toggle} />
      </LayoutLeft>
      <section className="absolute top-16 bottom-0 left-0 md:left-52 right-0">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <DocsCrumbs />
          </div>
          <section className="flex-grow relative h-full">
            {children}
          </section>
        </main>
      </section>
      <div id="dialog-root"></div>
      <div id="dropdown-root"></div>
    </section>
  );
};

/**
 * Docs page component
 */
export function Docs(props: DocsPageProps) {
  //props
  const { children, pathname } = props;
  //variables
  const provider = {
    pathname: pathname || '',
    prev: () => null,
    next: () => null
  };
  //render
  return (
    <LayoutProvider>
      <DocsContext.Provider value={provider}>
        <DocsBody>
          {children}
        </DocsBody>
      </DocsContext.Provider>
    </LayoutProvider>
  );
};

export default Object.assign(Docs, {
  useDocsContext,
  Context: DocsContext,
  Head: ThemeHead,
  Menu: DocsMenu,
  Body: DocsBody,
  Crumbs: DocsCrumbs,
  Foot: DocsFoot,
  use: useDocsContext,
  Code,
  C: InlineCode,
  Props,
  Preview
});