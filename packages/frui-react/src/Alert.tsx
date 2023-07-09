//types
import type { AlertProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//helpers
import { makeClasses, makeStyles } from 'frui-core/dist/utils';

/**
 * Alert Component (Main)
 */
const Alert: React.FC<AlertProps> = props => {
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
    : undefined;

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
      paddingBottom: '16px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '16px'
    })
  };
  

  return (
    <div className={map.classes} style={map.styles}>
      {children}
    </div>
  );
};

export default Alert;