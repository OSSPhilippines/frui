//hooks
import { useState } from 'react';
import { useLanguage } from 'r22n';
import { useTheme } from '../../theme';
//components
import Link from 'next/link';
import Image from 'next/image';
import Toggle from '../Toggle';
import Head from './components/Head';
import Header from './components/Header';

export function useToggle(ison = false) {
  const [ on, isOn ] = useState(ison);
  const toggle = () => isOn(on => !on);
  return [ on, toggle ] as [ boolean, () => void ];
};

const LayoutHome: React.FC<{
  uri?: string,
  title?: string,
  description?: string,
  children?: React.ReactNode
}> = props => {
  //props
  const { uri, title, description, children } = props;
  //hooks
  const { _ } = useLanguage();
  const [ opened, toggle ] = useToggle();
  const { theme, mode } = useTheme();
  return (
    <section className={`${theme}-${mode} bg-b0 text-t1 relative w-full h-full overflow-hidden`}>
      <Head uri={uri} title={title} description={description} />
      <header className="absolute top-0 left-0 right-0">
        <div className="px-3 flex items-center h-16 py-2">
          <div className="pr-3 md:pr-8 flex items-center h-16 text-white">
            <Link href="/">
              <Image alt="logo" className="logo-img" src="/frui-icon.png" height="35" width="35" />
            </Link>
            <Link className="ml-2 uppercase flex-grow hidden md:block" href="/">
              <Image alt="text" className="logo-img relative top-0.5" src="/frui-text.png" height="25" width="67" />
            </Link>
          </div>
          <div className="flex-grow">
            <Link className="mr-4" href="/start">{_('Docs')}</Link>
            <a 
              className="hidden md:inline-block" 
              href="https://ossph.org/"
              target="_blank"
            >{_('About Us')}</a>
          </div>
          <Toggle />
          <div className="ml-2 flex items-center">
            <a 
              className="flex items-center justify-center h-7 w-7 rounded-full mr-2" 
              href="https://github.com/ossPhilippines/frui" 
              target="_blank"
            >
              <i className="text-[28px] fab fa-github"></i>
            </a>
            <Link 
              className="hidden md:flex items-center justify-center h-7 w-7 rounded-full bg-red-700 mr-2" 
              href="https://www.npmjs.com/package/frui"
              target="_blank"
            >
              <i className="fab fa-npm text-white"></i>
            </Link>
            <Link 
              className="flex items-center justify-center h-7 w-7 rounded-full bg-blue-700" 
              href="https://discord.gg/open-source-software-ph-905496362982981723"
              target="_blank"
            >
              <i className="fab fa-discord text-white"></i>
            </Link>
          </div>
        </div>
      </header>
      <section className="absolute top-16 bottom-0 left-0 right-0">
        {children}
      </section>
    </section>
  );
};

export { Header };

export default LayoutHome;