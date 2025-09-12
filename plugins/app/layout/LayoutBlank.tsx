//app
import { useTheme } from '../theme/hooks.js';
import LayoutToggle from './LayoutToggle.js';

export type LayoutBlankProps = {
  children?: React.ReactNode
};

export default function LayoutBlank({ children }: LayoutBlankProps) {
  const { theme, mode } = useTheme();
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