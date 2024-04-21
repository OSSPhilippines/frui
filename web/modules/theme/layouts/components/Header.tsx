//types
import type { MouseEventHandler } from 'react';
//components
import Link from 'next/link';
import Toggle from '../../Toggle';

const Header: React.FC<{
  toggle: MouseEventHandler
}> = ({ toggle }) => {
  return (
    <header className="absolute top-0 left-0 right-0 md:left-52">
      <div className="px-3 flex items-center h-16 py-2">
        <button className="md:hidden text-xl mr-3" onClick={toggle}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="flex-grow"></div>
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
  );
};

export default Header;