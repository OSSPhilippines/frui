//modules
import { useEffect } from 'react';
//app
import { useTheme } from '../theme/hooks.js';
import { ToastContainer, unload } from '../notify';
import LayoutHead from './LayoutHead.js';
import LayoutMenu from './LayoutMenu.js';
import { useToggle } from './hooks.js';

export type LayoutPanelProps = {
  children?: React.ReactNode
};

export default function LayoutPanel({ children }: LayoutPanelProps) {
  //hooks
  const [ opened, toggle ] = useToggle();
  const { theme, mode } = useTheme();
  //unload flash message
  useEffect(unload, []);
  return (
    <section className={`${theme}-${mode} bg-b0 text-t1 relative w-full h-full overflow-hidden`}>
      <LayoutHead toggle={toggle} />
      <LayoutMenu open={opened} toggle={toggle} />
      <section className="absolute top-16 bottom-0 left-0 md:left-52 right-0">
        {children}
      </section>
      <ToastContainer />
    </section>
  );
};