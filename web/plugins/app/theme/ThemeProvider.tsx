//modules
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import UniversalCookie from 'universal-cookie';
//app
import type { LanguageProp } from './ThemeContext.js';
import ThemeContext from './ThemeContext.js';

export type ThemeProviderProps = { 
  languages?: LanguageProp
  children: ReactNode 
};

const cookie = new UniversalCookie();

// (this is what to put in app.tsx)
export default function ThemeProvider(props: ThemeProviderProps) {
  const { languages = {}, children } = props;
  const [ theme, setTheme ] = useState('blue');
  const [ mode, setMode ] = useState('light');
  const change = (theme: string) => {
    setTheme(theme);
    cookie.set('theme', theme);
  };
  const toggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    cookie.set('mode', newMode);
  };
  const value = { mode, theme, languages, toggle, change };
  useEffect(() => {
    setMode(cookie.get('mode') as string || 'light');
    setTheme(cookie.get('theme') as string || 'blue');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};