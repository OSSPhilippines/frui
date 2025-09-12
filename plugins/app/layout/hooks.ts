//modules
import { useState } from 'react';

export type LayoutPanelProps = {
  children?: React.ReactNode
};

export function useToggle(ison = false) {
  const [ on, isOn ] = useState(ison);
  const toggle = () => isOn(on => !on);
  return [ on, toggle ] as [ boolean, () => void ];
};
