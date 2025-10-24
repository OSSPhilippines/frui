//--------------------------------------------------------------------//
// Imports

//modules
import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import 'inputmask';

//frui
import type { ExtendsType } from '../types.js';
import type { InputProps } from './Input.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type InputMaskConfig = {
  ref?: RefObject<HTMLInputElement>,
  mask?: string,
  regex?: string,
  alias?: string,
  repeat?: number,
  greedy?: boolean,
  numericInput?: boolean,
  rightAlign?: boolean,
  definitions?: Record<string, any>
  onReady?: (im: Inputmask.Instance) => void
};

export type InputMaskProps = ExtendsType<InputProps, InputMaskConfig>;

//--------------------------------------------------------------------//
// Hooks

export function useInputMask(config: InputMaskConfig) {
  //config
  const { 
    ref: passRef,
    mask,
    regex,
    alias,
    repeat,
    greedy,
    numericInput,
    rightAlign,
    definitions,
    onReady
  } = config;
  const internalRef = useRef<HTMLInputElement>(null);
  const ref = passRef || internalRef;
  //effects
  useEffect(() => {
    if (!ref.current) return;
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
    im.mask(ref.current);
    onReady && onReady(im);
  }, [ ref ]);
  return { ref  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Mask  Component (Main)
 */
export function Mask(props: InputMaskProps) {
  //props
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

  const { ref } = useInputMask({
    mask,
    regex,
    alias,
    repeat,
    greedy,
    numericInput,
    rightAlign,
    definitions,
    onReady
  });

  return <Input ref={ref} {...attributes} />
};

//defaults to mask
export default Mask;