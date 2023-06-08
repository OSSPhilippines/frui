//hooks
import { useState } from 'react';

export default function useFieldPassword() {
  const [ showing, show ] = useState(false);
  const toggle = () => show(!showing);
  return { toggle, showing };
}