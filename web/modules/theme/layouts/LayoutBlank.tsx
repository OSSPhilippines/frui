//hooks
import { useTheme } from '../hooks';
//components
import Image from 'next/image';
import Toggle from '../Toggle';
import Head from './components/Head';

const LayoutBlank: React.FC<{
  uri?: string,
  title?: string,
  description?: string,
  permit?: string[],
  redirect?: string,
  children?: React.ReactNode
}> = props => {
  const { uri, title, description, children } = props;
  const { theme, mode } = useTheme();
  return (
    <section className={`${theme}-${mode} bg-b1 text-t1 relative w-full h-full overflow-hidden`}>
      <Head uri={uri} title={title} description={description} />
      <header className="flex items-center p-2">
        <div className="flex-grow flex items-center">
          {mode === 'dark' ? (
            <Image alt="frui" src="/logo-white.png" height="35" width="35" />
          ) : (
            <Image alt="frui" src="/logo.png" height="35" width="35" />
          )}
          <div className="ml-2 uppercase flex-grow">
            <Image alt="text" className="relative top-0.5" src="/frui-text.png" height="25" width="67" />
          </div>
        </div>
        <div className="inline-block">
          <Toggle />
        </div>
      </header>
      <section className="absolute top-12 bottom-0 left-0 right-0 w-full">
        {children}
      </section>
    </section>
  );
};

export default LayoutBlank;