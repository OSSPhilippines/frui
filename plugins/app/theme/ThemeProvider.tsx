//modules
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import UniversalCookie from 'universal-cookie';
//src
import ThemeContext from './ThemeContext.js';

export type ThemeProviderProps = { 
  mode?: string,
  theme?: string,
  children: ReactNode 
};

const cookie = new UniversalCookie();

// (this is what to put in app.tsx)
export default function ThemeProvider(props: ThemeProviderProps) {
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