//hooks
import { useContext } from 'react';
//components
import SessionContext from './ThemeContext.js';
export function useTheme() {
  return useContext(SessionContext);
};