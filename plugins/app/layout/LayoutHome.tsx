//modules
import { useEffect } from 'react';
import { useLanguage } from 'r22n';
//frui
import { unload } from 'components/element/Notify.js';
//app
import { useTheme } from '../theme/hooks.js';
import LayoutToggle from './LayoutToggle.js';
import { useToggle } from './hooks.js';

export type LayoutHomeProps = {
  children?: React.ReactNode
};

export default function LayoutHome({ children }: LayoutHomeProps) {
  //hooks
  const { _ } = useLanguage();
  const [ _opened, _toggle ] = useToggle();
  const { ready, theme, mode } = useTheme();
  //unload flash message
  useEffect(unload, []);
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