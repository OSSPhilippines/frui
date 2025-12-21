//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import UniversalCookie from 'universal-cookie';
import { useLanguage } from 'r22n';

//--------------------------------------------------------------------//
// Types

export type ThemeContextProps = { 
  ready: boolean,
  mode: string,
  theme: string,
  change: (options: { theme?: string, mode?: string }) => void
};

export type ThemeProviderProps = { 
  mode?: string,
  theme?: string,
  children: ReactNode 
};

export type ThemeHeadProps = {
  uri?: string,
  title?: string,
  description?: string,
  styles?: string[]
};

//--------------------------------------------------------------------//
// Constants

const cookie = new UniversalCookie();

//--------------------------------------------------------------------//
// Hooks

export function useThemeContext() {
  return useContext(ThemeContext);
};

//--------------------------------------------------------------------//
// Components

export const ThemeContext = createContext<ThemeContextProps>({
  ready: false,
  mode: 'light', 
  theme: 'blue',
  change: () => {}
});

export function ThemeHead(props: ThemeHeadProps) {
  const { 
    uri = '', 
    title: defaultTitle = 'Free ReactJS UI - FRUI', 
    description = 'FRUI is a suite of free react components you can use without the commitments.',
    styles = []
  } = props;
  const title = defaultTitle === 'Free ReactJS UI - FRUI' 
    ? defaultTitle 
    : `${defaultTitle.trim()} - Free ReactJS UI`;
  const { _ } = useLanguage();
  return (
    <>
      <title>{_(title)}</title>
      <meta name="description" content={_(description)} />
      <meta property="og:title" content={_(title)} />
      <meta property="og:description" content={_(description)} />
      <meta property="og:image" content="https://frui.js.org/frui-icon.png" />
      <meta property="og:url" content={`https://frui.js.org${uri}`} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@OSSPhilippines" />
      <meta name="twitter:title" content={_(title)} />
      <meta name="twitter:description" content={_(description)} />
      <meta name="twitter:image" content="https://frui.js.org/frui-icon.png" />
      <link rel="shortcut icon" href="https://frui.js.org/favicon.ico" type="image/png" />
      <link rel="icon" href="https://frui.js.org/favicon.ico" type="image/png" />
      <link rel="stylesheet" type="text/css" href="/styles/reset.css" />
      <link rel="stylesheet" type="text/css" href="/styles/globals.css" />
      {styles.map((href, index) => (
        <link key={index} rel="stylesheet" type="text/css" href={href} />
      ))}
    </>
  );
};

// (this is what to put in app.tsx)
export function ThemeProvider(props: ThemeProviderProps) {
  const { 
    mode: defaultMode = 'light', 
    theme: defaultTheme = 'blue',
    children 
  } = props;
  const [ mode, setMode ] = useState(defaultMode);
  const [ theme, setTheme ] = useState(defaultTheme);
  const [ ready, setReady ] = useState(false);
  const change = ({ theme, mode }: { theme?: string, mode?: string }) => {
    if (theme) {
      setTheme(theme);
      cookie.set('theme', theme);
    }
    if (mode) {
      setMode(mode);
      cookie.set('mode', mode);
    }
  };
  const value = { mode, theme, change, ready };
  useEffect(() => {
    setMode(cookie.get('mode') as string || 'light');
    setTheme(cookie.get('theme') as string || 'blue');
    setReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
