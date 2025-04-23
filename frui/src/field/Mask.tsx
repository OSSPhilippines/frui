//types
import type { InputProps } from './Input.js';
//components
import Input from './Input.js';
import 'inputmask';

/**
 * Mask Props
 */
export type MaskProps = InputProps & { 
  mask?: string,
  regex?: string,
  alias?: string,
  repeat?: number,
  greedy?: boolean,
  numericInput?: boolean,
  rightAlign?: boolean,
  definitions?: Record<string, any>
  onReady?: Function
};

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
    
    const im = new Inputmask({
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
  }

  return <Input passRef={ref} {...attributes} />
};