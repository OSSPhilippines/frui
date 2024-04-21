//hooks
import { useContext } from 'react';
//components
import SessionContext from './Context';
export function useTheme() {
  return useContext(SessionContext);
};