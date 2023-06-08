//types
import type { ChangeEvent, MouseEvent } from 'react';
import type { FieldInputConfig } from '../types';
//hooks
import { useState, useEffect } from 'react';

export default function useFieldSwitch(config: FieldInputConfig) {
  const { onChange, onUpdate, defaultChecked, checked } = config;
  const [ isChecked, check ] = useState(Boolean(defaultChecked || checked));
  const [ isHovering, hover ] = useState(false);
  useEffect(() => {
    if (typeof checked === 'undefined') return;
    if (checked !== isChecked) {
      check(checked);
    }
  }, [ checked ]);
  return {
    isHovering,
    isChecked,
    handlers: {
      out: (e: MouseEvent<HTMLInputElement>) => hover(false),
      over: (e: MouseEvent<HTMLInputElement>) => hover(true),
      change: (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked !== checked) {
          check(e.target.checked);
        }
        onChange && onChange(e);
        onUpdate && onUpdate(e.target.value, e.target.checked);
      }
    }
  };
}