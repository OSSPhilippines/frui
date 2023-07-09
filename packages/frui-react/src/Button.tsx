//types
import type { ButtonProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//helpers
import { makeStyles } from 'frui-core/dist/utils';

/**
 * Generic Button Component (Main)
 */
const Button: React.FC<ButtonProps> = (props) => {
  // Separate component related props from field attributes
  const { 
    style,
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
 
  // Default styles
  let map = style || {};
  if (style !== false) {
    //determine theme
    const themes = {
      danger: '#DC3545', 
      warning: '#FFC107', 
      success: '#28A745', 
      info: '#1474FC',
      muted: '#999999'
    };

    const theme = color ? color 
      : danger ? themes.danger 
      : warning ? themes.warning 
      : success ? themes.success 
      : info ? themes.info 
      : muted ? themes.muted 
      : undefined;

    //determine size
    const sizes = [ 'xs', 'sm', 'md', 'lg', 'xl' ];
    const size = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'md';
    const padding = [ [2, 4], [4, 8], [8, 16], [16, 48], [24, 64] ][sizes.indexOf(size)];
    const font = [ 0.5, 0.75, 1, 1.25, 1.5 ][sizes.indexOf(size)];

    //determine radius
    const radius = curved ? '5px' : rounded ? '15px' : pill ? '1000px' : undefined;
    map = makeStyles(style, {
      borderColor: theme,
      borderRadius: radius,
      borderStyle: 'solid',
      borderWidth: '1px',
      display: block ? 'block' : undefined,
      fontSize: `${font}em`,
      paddingBottom: `${padding[0]}px`,
      paddingLeft: `${padding[1]}px`,
      paddingRight: `${padding[1]}px`,
      paddingTop: `${padding[0]}px`,
      textAlign: 'center'
    }) || {};
    //if theme
    if (theme) {
      if (outline) {
        map.backgroundColor = 'white';
        map.color = theme;
      } else if (transparent) {
        map.color = theme;
      } else if (muted) {
        map.backgroundColor = theme;
        map.color = '#DEDEDE';
      } else {
        map.backgroundColor = theme;
        map.color = 'white';
      }
    }
  }

  return (
    <button style={style !== false ? map: undefined} {...attributes}>
      {children}
    </button>
  );
}

export default Button;