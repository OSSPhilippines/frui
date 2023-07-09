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

  const colour = color? color
    : error ? '#DC3545'
    : warning ? '#FFC107'
    : info ? '#1474FC'
    : success ? '#28A745'
    : muted ? '#999999'
    : '#FFC107';

  const round = curved ? '5px' 
    : rounded ? '12px' 
    : pill ? '10000px' 
    : undefined;

  const map = {
    classes: makeClasses(className, ''),
    styles: makeStyles(style, {
      borderColor: colour,
      borderRadius: round,
      borderStyle: 'solid',
      borderWidth: '1px',
      backgroundColor: layout === 'solid' ? colour : undefined,
      color: layout === 'outline' ? colour : 'white',
      paddingBottom: '2px',
      paddingLeft: '8px',
      paddingRight: '8px',
      paddingTop: '2px'
    })
  };
  

  return (
    <span className={map.classes} style={map.styles}>
      {children}
    </span>
  );
};

export default Badge;