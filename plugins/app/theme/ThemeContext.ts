import { createContext } from 'react';

export type ThemeContextProps = { 
  ready: boolean,
  mode: string,
  theme: string,
  change: (options: { theme?: string, mode?: string }) => void
};

const ThemeContext = createContext<ThemeContextProps>({
  ready: false,
  mode: 'light', 
  theme: 'blue',
  change: () => {}
});

export default ThemeContext;