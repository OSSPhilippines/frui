//types
import type { ButtonProps } from '../types';
//react
import React from 'react';
//helpers
import { makeClasses, makeStyles } from '../utils';

/**
 * Generic Button Component (Main)
 */
const Button: React.FC<ButtonProps> = (props) => {
  // Separate component related props from field attributes
  const { 
    style,
    className,
    block,
    color,
    xs,
    sm,
    md,
    lg,
    xl,
    curved,
    rounded,
    pill,
    danger, 
    warning, 
    success, 
    info,
    muted,
    outline, 
    transparent, 
    solid, 
    children,
    ...attributes 
  } = props;

  const text = danger ? 'text-[#DC3545]'
    : warning ? 'text-[#FFC107]'
    : success ? 'text-[#28A745]'
    : info ? 'text-[#1474FC]'
    : muted ? 'text-[#999999]'
    : 'text-black';

  const border = danger ? 'border-[#DC3545]'
    : warning ? 'border-[#FFC107]'
    : success ? 'border-[#28A745]'
    : info ? 'border-[#1474FC]'
    : muted ? 'border-[#999999]'
    : 'border-[#CCCCCC]';

  const background = danger ? 'bg-[#DC3545]'
    : warning ? 'bg-[#FFC107]'
    : success ? 'bg-[#28A745]'
    : info ? 'bg-[#1474FC]'
    : muted ? 'bg-[#999999]'
    : 'bg-[#CCCCCC]';

  const layout = outline ? 'outline' 
    : solid ? 'solid'
    : transparent ? 'transparent'
    : 'solid';

  //determine size
  const sizes = [ 'xs', 'sm', 'md', 'lg', 'xl' ];
  const size = xs ? 'xs' 
    : sm ? 'sm' 
    : md ? 'md' 
    : lg ? 'lg' 
    : xl ? 'xl' 
    : 'md';
  const padding = [ 
    ['py-1', 'px-2'], //xs
    ['py-1.5', 'px-3'], //sm
    ['py-2', 'px-4'], //md
    ['py-4', 'px-8'], //lg
    ['py-6', 'px-12'] //xl
  ][sizes.indexOf(size)];
  const font = [ 
    'text-xs', 
    'text-sm', 
    'text-md', 
    'text-xl', 
    'text-3xl' 
  ][sizes.indexOf(size)];

  //determine radius
  const radius = curved ? 'rounded-[5px]' 
    : rounded ? 'rounded-[15px]' 
    : pill ? 'rounded-full' 
    : undefined;

  const map = {
    classes: makeClasses(className, [
      block ? 'block' : undefined,
      'border',
      border,
      radius,
      font,
      padding[0],
      padding[1],
      'text-center',
      layout === 'outline' ? 'bg-white'
        : layout === 'solid' ? background 
        : undefined,
      layout === 'outline' || layout === 'transparent' ? text
        : muted ? 'text-[#DEDEDE]' 
        : 'text-white'
    ].filter(Boolean).join(' ')),
    styles: makeStyles(style, {
      borderColor: color,
      color: layout === 'outline' || layout === 'transparent' 
        ? color 
        : undefined,
      backgroundColor: layout === 'solid' ? color : undefined
    })
  };

  return (
    <button {...attributes} className={map.classes} style={map.styles}>
      {children}
    </button>
  );
}

export default Button;