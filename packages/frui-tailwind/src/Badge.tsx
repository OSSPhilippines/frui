//types
import type { BadgeProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//helpers
import { makeClasses, makeStyles } from 'frui-core/dist/utils';

/**
 * Badge Component (Main)
 */
const Badge: React.FC<BadgeProps> = props => {
  const { 
    color,
    error, 
    warning, 
    success, 
    info, 
    muted,
    solid, 
    outline,
    curved,
    rounded,
    pill, 
    style,
    className,
    children 
  } = props;

  const layout = outline ? 'outline' 
    : solid ? 'solid'
    : 'solid';

  const background = error ? 'bg-[#DC3545]'
    : warning ? 'bg-[#FFC107]'
    : info ? 'bg-[#1474FC]'
    : success ? 'bg-[#28A745]'
    : muted ? 'bg-[#999999]'
    : undefined;
  
  const border = error ? 'border-[#DC3545]'
    : warning ? 'border-[#FFC107]'
    : info ? 'border-[#1474FC]'
    : success ? 'border-[#28A745]'
    : muted ? 'border-[#999999]'
    : undefined;
  
  const text = error ? 'text-[#DC3545]'
    : warning ? 'text-[#FFC107]'
    : info ? 'text-[#1474FC]'
    : success ? 'text-[#28A745]'
    : muted ? 'text-[#999999]'
    : undefined;

  const round = curved ? 'rounded-[5px]' 
    : rounded ? 'rounded-[12px]' 
    : pill ? 'rounded-full' 
    : undefined;

  const map = {
    classes: makeClasses(className, [
      'p-2', 
      'border',
      round,
      border,
      layout === 'outline' ? text : 'text-white',
      layout === 'solid' ? background : undefined
    ].filter(Boolean).join(' ')),
    styles: makeStyles(style, { 
      borderColor: color,
      color: layout === 'outline' ? color : undefined,
      backgroundColor: layout === 'solid' ? color : undefined
    })
  };

  return (
    <span className={map.classes} style={map.styles}>
      {children}
    </span>
  );
};

export default Badge;