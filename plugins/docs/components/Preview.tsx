//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
import { 
  createContext,  
  useContext,
  useEffect,
  useState
} from 'react';
import { useLanguage } from 'r22n';
import ShikiHighlighter from 'react-shiki';

//frui
import type { ClassStyleProps, ChildrenProps } from 'components/types.js';
import { notify } from 'components/Notifier.js';

//--------------------------------------------------------------------//
// Types

export type PreviewContextProps = {
  active: 'example' | 'code',
  clip: (code: string) => void,
  height?: number
};

export type PreviewExampleProps = ChildrenProps & {
  background?: string,
  center?: boolean,
  padding?: boolean
};

export type PreviewCodeProps = ChildrenProps & {};

export type PreviewProps = ClassStyleProps & ChildrenProps & {
  height?: number,
  title?: string,
  noCode?: boolean,
  noExample?: boolean
};

//--------------------------------------------------------------------//
// Components

export const PreviewContext = createContext<PreviewContextProps>({
  active: 'example',
  clip: () => {}
});

export function PreviewExample(props: PreviewExampleProps) {
  const { background, center, children, padding } = props;
  const { active, height } = useContext(PreviewContext);
  const classes: string[] = [ 'border', 'theme-bc-3' ];
  if (center) classes.push('flex items-center justify-center');
  if (padding) classes.push('p-3');
  const styles: CSSProperties = {};
  if (background) styles.backgroundColor = background;
  if (height) {
    styles.height = `${height}px`;
    styles.overflow = 'auto';
  }
  return active === 'example' ? (
    <div className={classes.join(' ')} style={styles}>
      <div className="w-full">
        {children}
      </div>
    </div>
  ) : null;
};

export function PreviewCode(props: PreviewCodeProps) {
  const { active, clip } = useContext(PreviewContext);
  const code = props.children?.toString() || '';
  useEffect(() => clip(code), []);
  return active === 'code' ? (
    <div className="theme-bg-black">
      <ShikiHighlighter 
        className="flex-grow" 
        language="tsx" 
        theme="github-dark"
      >
        {code.trim()}
      </ShikiHighlighter>
    </div>
  ) : null;
};

export function Preview(props: PreviewProps) {
  //props
  const { 
    children,
    className, 
    height, 
    noCode,
    noExample,
    style, 
    title, 
  } = props;
  //hooks
  const { _ } = useLanguage();
  const [ active, setActive ] = useState<'example' | 'code'>('example');
  const [ code, clip ] = useState<string>('');
  //handlers
  const copy = () => {
    navigator.clipboard.writeText(code);
    notify('success', _('Copied to clipboard'))
  };
  //render
  return (
    <PreviewContext.Provider value={{ clip, active, height }}>
      <section className={className} style={style}>
        {!!title || (!noCode && !noExample) ? (
          <header className="flex items-center p-3 theme-bg-4 theme-white">
            {!!title 
              ? (<h4 className="flex-grow">{title}</h4>) 
              : (<div className="flex-grow" />)
            }
            <div>
              {!noCode && (<i className="fas fa-fw fa-copy mr-2" onClick={copy}></i>)}
              {!noExample && !noCode ? (
                <>
                  {active === 'example' ? (
                    <i className="fas fa-fw fa-code mr-2" onClick={() => setActive('code')}></i>
                  ) : (
                    <i className="fas fa-fw fa-eye mr-2" onClick={() => setActive('example')}></i>
                  )}
                </>
              ) : null}
            </div>
          </header>
        ) : null}
        
        {children}
      </section>
    </PreviewContext.Provider>
  );
};

export default Object.assign(Preview, {
  Example: PreviewExample,
  Code: PreviewCode
});