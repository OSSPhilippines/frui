//types
import type { MaskProps } from '../types/fields';
//components
import Input from './Input';

/**
 * Mask  Component (Main)
 */
export default function InputMask(props: MaskProps) {
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