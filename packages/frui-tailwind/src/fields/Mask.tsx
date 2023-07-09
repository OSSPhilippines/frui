//types
import type { MaskProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';

/**
 * Mask  Component (Main)
 */
const Mask: React.FC<MaskProps> = (props) => {
  const { 
    mask,
    regex,
    alias,
    repeat,
    greedy,
    numericInput,
    rightAlign,
    definitions,
    onReady,
    ...attributes 
  } = props;
  const ref = (ref: HTMLInputElement) => {
    if (!ref) return;
    import('inputmask').then(Inputmask => {
      onReady && onReady(Inputmask.default);
      const im = new Inputmask.default({
        mask,
        regex,
        alias,
        repeat,
        greedy,
        numericInput,
        rightAlign,
        definitions
      });
      im.mask(ref);
    });
  }

  return <Input passRef={ref} {...attributes} />
};

export default Mask;