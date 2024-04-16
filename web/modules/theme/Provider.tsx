'use client';
//types
import type { ReactNode } from 'react';
import type { LanguageProp } from './Context';
//hooks
import { useState, useEffect } from 'react';
//components
import ThemeContext from './Context';
//helpers
import { getCookie, setCookie } from 'cookies-next';

export type ThemeProviderProps = { 
  languages?: LanguageProp
  children: ReactNode 
};

// (this is what to put in app.tsx)
const ThemeProvider: React.FC<ThemeProviderProps> = props => {
  const { languages = {}, children } = props;
  const [ theme, setTheme ] = useState('blue');
  const [ mode, setMode ] = useState('light');
  const change = (theme: string) => {
    setTheme(theme);
    setCookie('theme', theme);
  };
  const toggle = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setCookie('mode', newMode);
  };
  const value = { mode, theme, languages, toggle, change };
  useEffect(() => {
    setMode(getCookie('mode') as string || 'light');
    setTheme(getCookie('theme') as string || 'blue');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;