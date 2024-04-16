//types
import type { MouseEventHandler } from 'react';
//components
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
      </div>
    </header>
  );
};

export default Header;