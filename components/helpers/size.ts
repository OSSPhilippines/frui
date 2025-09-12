//src
import type { SizeProps } from '../types';

/**
 * Set text size style
 */
export default function setTextSizeClass(
  props: SizeProps, 
  classNames: string[]
) {
  if (props.xs) {
    classNames.push('frui-tx-xs');
  } else if (props.sm) {
    classNames.push('frui-tx-sm');
  } else if (props.md) {
    classNames.push('frui-tx-md');
  } else if (props.lg) {
    classNames.push('frui-tx-lg');
  } else if (props.xl) {
    classNames.push('frui-tx-xl');
  } else if (props.xl2) {
    classNames.push('frui-tx-2xl');
  } else if (props.xl3) {
    classNames.push('frui-tx-3xl');
  } else if (props.xl4) {
    classNames.push('frui-tx-4xl');
  } else if (props.xl5) {
    classNames.push('frui-tx-5xl');
  }
  return [ ...classNames ];
};