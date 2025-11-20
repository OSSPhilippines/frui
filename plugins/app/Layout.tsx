//--------------------------------------------------------------------//
// Imports

//modules
import type { MouseEventHandler } from 'react';
import { useState, useEffect } from 'react';
import { R22nProvider, useLanguage } from 'r22n';
//frui
import type { ChildrenProps } from 'components/types.js';
import Notifier, { unload } from 'components/Notifier.js';
import Dialog from 'components/Dialog.js';

//plugins
import { useThemeContext, ThemeProvider } from './Theme.js';

//--------------------------------------------------------------------//
// Types

export type LayoutHeadProps = {
  toggle: MouseEventHandler
};

export type LayoutLeftProps = ChildrenProps & { 
  open?: boolean,
  toggle: () => void
};

export type LayoutProviderProps = ChildrenProps;
export type LayoutPanelProps = ChildrenProps;
export type LayoutBlankProps = ChildrenProps;
export type LayoutHomeProps = ChildrenProps;

//--------------------------------------------------------------------//
// Hooks

/**
 * Toggle hook
 */
export function useLayoutToggle(ison = false) {
  const [ on, isOn ] = useState(ison);
  const toggle = () => isOn(on => !on);
  return [ on, toggle ] as [ boolean, () => void ];
};

//--------------------------------------------------------------------//
// Components

/**
 * Layout panel head theme and mode toggle component
 */
export function LayoutToggle() {
  const { mode, change } = useThemeContext();
  return (
    <div className="flex items-center">
      <div
        className="bg-[#528909] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'green' })}
      ></div>
      <div
        className="bg-[#095289] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'blue' })}
      ></div>
      <div
        className="bg-[#890934] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'red' })}
      ></div>
      <div
        className="bg-[#710989] w-5 h-5 rounded-full mr-1"
        onClick={() => change({ theme: 'purple' })}
      ></div>
      <div
        className="bg-[#893c09] w-5 h-5 rounded-full mr-3"
        onClick={() => change({ theme: 'orange' })}
      ></div>
      <div
        className="flex justify-center items-center w-7 h-7 rounded-full text-white theme-bg-3"
        onClick={() => change({ mode: mode === 'light' ? 'dark' : 'light' })}
      >
        <i className={`fas fa-${mode === 'dark' ? 'moon': 'sun'}`}></i>
      </div>
    </div>
  );
};

/**
 * Layout panel header component
 */
export function LayoutHead({ toggle }: LayoutHeadProps) {
  return (
    <header className="absolute top-0 left-0 right-0 md:left-52">
      <div className="px-3 flex items-center h-16 py-2">
        <button className="md:hidden text-xl mr-3" onClick={toggle}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="flex-grow"></div>
        <LayoutToggle />
        <div className="ml-2 flex items-center">
          <a 
            className="flex items-center justify-center h-7 w-7 rounded-full mr-2" 
            href="https://github.com/ossPhilippines/frui" 
            target="_blank"
          >
            <i className="text-[28px] fab fa-github"></i>
          </a>
          <a 
            className="hidden md:flex items-center justify-center h-7 w-7 rounded-full bg-red-700 mr-2" 
            href="https://www.npmjs.com/package/frui"
            target="_blank"
          >
            <i className="fab fa-npm text-white"></i>
          </a>
          <a 
            className="flex items-center justify-center h-7 w-7 rounded-full theme-bg-lue-700" 
            href="https://discord.gg/open-source-software-ph-905496362982981723"
            target="_blank"
          >
            <i className="fab fa-discord text-white"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

/**
 * Layout menu (left) component
 */
export function LayoutLeft(props: LayoutLeftProps) {
  //props
  const { toggle, children, open = false } = props;
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
      {children}
    </aside>
  );
};

/**
 * Layout provider component. An aggregator for all providers
 */
export function LayoutProvider(props: LayoutProviderProps) {
  const { children } = props;
  //TODO: add r22n locale provider
  return (
    <ThemeProvider>
      <R22nProvider>
        <Notifier.Provider>
          {children}
        </Notifier.Provider>
      </R22nProvider>
    </ThemeProvider>
  );
};

/**
 * Layouts with no header and asides
 */
export function LayoutBlank({ children }: LayoutBlankProps) {
  const { ready, theme, mode } = useThemeContext();
  //unload flash message
  useEffect(() => { unload() }, []);
  if (!ready) return null;
  return (
    <section className={`${theme}-${mode} theme-bg-1 theme-1 relative w-full h-full overflow-hidden`}>
      <header className="flex items-center p-2">
        <div className="flex-grow flex items-center">
          {mode === 'dark' ? (
            <img alt="frui" src="/logo-white.png" height="35" width="35" />
          ) : (
            <img alt="frui" src="/logo.png" height="35" width="35" />
          )}
          <div className="ml-2 uppercase flex-grow">
            <img alt="text" className="relative top-0.5" src="/frui-text.png" height="25" width="67" />
          </div>
        </div>
        <div className="inline-block">
          <LayoutToggle />
        </div>
      </header>
      <section className="absolute top-12 bottom-0 left-0 right-0 w-full">
        {children}
      </section>
    </section>
  );
};

/**
 * Layout panel component
 */
export function LayoutPanel({ children }: LayoutPanelProps) {
  //hooks
  const [ opened, toggle ] = useLayoutToggle();
  const { ready, theme, mode } = useThemeContext();
  //effects
  // unload flash message
  useEffect(() => { unload() }, []);
  //render
  if (!ready) return null;
  //render
  return (
    <section className={`${theme}-${mode} theme-bg-0 theme-1 relative w-full h-full overflow-hidden`}>
      <LayoutHead toggle={toggle} />
      <LayoutLeft open={opened} toggle={toggle} />
      <section className="absolute top-16 bottom-0 left-0 md:left-52 right-0">
        {children}
      </section>
    </section>
  );
};

/**
 * Layout specifically for home page
 */
export function LayoutHome({ children }: LayoutHomeProps) {
  //hooks
  const { _ } = useLanguage();
  const { ready, theme, mode } = useThemeContext();
  //unload flash message
  useEffect(() => { unload() }, []);
  if (!ready) return null;
  return (
    <section className={`${theme}-${mode} theme-bg-0 theme-1 relative w-full h-full overflow-hidden`}>
      <header className="absolute top-0 left-0 right-0">
        <div className="px-3 flex items-center h-16 py-2">
          <div className="pr-3 md:pr-8 flex items-center h-16 text-white">
            <a href="/">
              <img alt="logo" className="logo-img" src="/images/frui-icon.png" height="35" width="35" />
            </a>
            <a className="ml-2 uppercase flex-grow hidden md:block" href="/">
              <img alt="text" className="logo-img relative top-0.5" src="/images/frui-text.png" height="25" width="67" />
            </a>
          </div>
          <div className="flex-grow">
            <a className="mr-4" href="/start">{_('Docs')}</a>
            <a 
              className="hidden md:inline-block" 
              href="https://ossph.org/"
              target="_blank"
            >{_('About Us')}</a>
          </div>
          <LayoutToggle />
          <div className="ml-2 flex items-center">
            <a 
              className="flex items-center justify-center h-7 w-7 rounded-full mr-2" 
              href="https://github.com/ossPhilippines/frui" 
              target="_blank"
            >
              <i className="text-[28px] fab fa-github"></i>
            </a>
            <a 
              className="hidden md:flex items-center justify-center h-7 w-7 rounded-full bg-red-700 mr-2" 
              href="https://www.npmjs.com/package/frui"
              target="_blank"
            >
              <i className="fab fa-npm text-white"></i>
            </a>
            <a 
              className="flex items-center justify-center h-7 w-7 rounded-full theme-bg-lue-700" 
              href="https://discord.gg/open-source-software-ph-905496362982981723"
              target="_blank"
            >
              <i className="fab fa-discord text-white"></i>
            </a>
          </div>
        </div>
      </header>
      <section className="absolute top-16 bottom-0 left-0 right-0">
        {children}
      </section>
    </section>
  );
};