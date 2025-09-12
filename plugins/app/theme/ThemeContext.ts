import { createContext } from 'react';

export type LanguageProp = Record<string, {
  label: string,
  translations: Record<string, string>
}>;

export type ThemeContextProps = { 
  mode: string,
  theme: string,
  languages: LanguageProp,
  toggle: () => void
  change: (theme: string) => void
};

const ThemeContext = createContext<ThemeContextProps>({
  mode: 'light', 
  theme: 'blue',
  languages: {},
  toggle: () => {},
  change: (_theme: string) => {}
});

export default ThemeContext;