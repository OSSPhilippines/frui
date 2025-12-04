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

export type MaskInputConfig = {
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

export type MaskInputProps = ExtendsType<InputProps, MaskInputConfig>;

//--------------------------------------------------------------------//
// Hooks

/**
 * MaskInput Hook Aggregate
 */
export function useMaskInput(config: MaskInputConfig) {
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
 * MaskInput Component (Main)
 */
export function MaskInput(props: MaskInputProps) {
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
  //hooks
  const { ref } = useMaskInput({
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
  //render
  return (
    <Input ref={ref} {...attributes} />
  );
};

//defaults to mask input
export default Object.assign(MaskInput, { useMaskInput, use: useMaskInput });