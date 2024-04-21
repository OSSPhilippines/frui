//hooks
import { useState, useEffect } from 'react';
import { useTheme } from '../../theme';
//components
import { ToastContainer, unload } from '../../notify';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import UserMenu from './components/UserMenu';

export function useToggle(ison = false) {
  const [ on, isOn ] = useState(ison);
  const toggle = () => isOn(on => !on);
  return [ on, toggle ] as [ boolean, () => void ];
};

const LayoutPanel: React.FC<{
  head?: React.FC,
  children?: React.ReactNode
}> = props => {
  //props
  const { head: Head, children } = props;
  //hooks
  const [ opened, toggle ] = useToggle();
  const { theme, mode } = useTheme();
  //unload flash message
  useEffect(unload, []);
  return (
    <section className={`${theme}-${mode} bg-b0 text-t1 relative w-full h-full overflow-hidden`}>
      <>{Head && <Head />}</>
      <Header 
        toggle={toggle} 
      />
      <MainMenu open={opened} toggle={toggle} />
      <section className="absolute top-16 bottom-0 left-0 md:left-52 right-0">
        {children}
      </section>
      <ToastContainer />
    </section>
  );
};

export { Header, MainMenu, UserMenu };

export default LayoutPanel;