//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';
import type { HTMLButtonProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type ButtonProps = HTMLButtonProps & {
  href?: string,
  target?: string,
  title?: string,
  block?: boolean,
  full?: boolean,
  color?: string,
  xs?: boolean, 
  sm?: boolean, 
  md?: boolean, 
  lg?: boolean, 
  xl?: boolean, 
  xl2?: boolean, 
  xl3?: boolean, 
  xl4?: boolean, 
  xl5?: boolean, 
  curved?: boolean,
  rounded?: boolean,
  pill?: boolean,
  info?: boolean, 
  warning?: boolean, 
  success?: boolean, 
  error?: boolean, 
  muted?: boolean, 
  outline?: boolean, 
  solid?: boolean, 
  style?: CSSProperties|false
};

//--------------------------------------------------------------------//
// Components

/**
 * Generic Button Component (Main)
 */
export function Button(props: ButtonProps) {
  // Separate component related props from field attributes
  const { 
    href,
    target,
    title,
    block,
    full,
    color,
    xs,
    sm,
    md,
    lg,
    xl,
    xl2, 
    xl3, 
    xl4, 
    xl5, 
    curved,
    rounded,
    pill,
    info, 
    warning,
    success, 
    error, 
    muted,
    outline, 
    solid, 
    style,
    className,
    children,
    ...attributes 
  } = props;
  
  const defaults: {
    classes: string[],
    styles: Record<string, string>
  } = {
    classes: [ 'frui-button' ],
    styles: {}
  }

  if (block) {
    defaults.classes.push('frui-block');
  }
  if (full) {
    defaults.classes.push('frui-full');
  }

  //determine size
  const size = xs ? 'xs' 
    : sm ? 'sm' 
    : md ? 'md' 
    : lg ? 'lg' 
    : xl ? 'xl' 
    : xl2 ? '2xl' 
    : xl3 ? '3xl' 
    : xl4 ? '4xl' 
    : xl5 ? '5xl' 
    : 'md';
  defaults.classes.push(`frui-button-${size}`);

  const layout = outline 
    ? 'outline' 
    : solid 
    ? 'solid'
    : 'solid';

  if (curved) {
    defaults.classes.push('frui-curved');
  } else if (rounded) {
    defaults.classes.push('frui-rounded');
  } else if (pill) {
    defaults.classes.push('frui-pill');
  }

  if (layout === 'outline') {
    defaults.classes.push('frui-solid', 'frui-thin');
    if (color) {
      defaults.styles.borderColor = color;
      defaults.styles.color = color;
    } else if (info) {
      defaults.classes.push('frui-bd-info', 'frui-tx-info');
    } else if (warning) {
      defaults.classes.push('frui-bd-warning', 'frui-tx-warning');
    } else if (success) {
      defaults.classes.push('frui-bd-success', 'frui-tx-success');
    } else if (error) {
      defaults.classes.push('frui-bd-error', 'frui-tx-error');
    } else if (muted) {
      defaults.classes.push('frui-bd-muted', 'frui-tx-muted');
    }
  } else {
    defaults.classes.push('frui-tx-white');
    if (color) {
      defaults.styles.backgroundColor = color;
    } else if (info) {
      defaults.classes.push('frui-bg-info');
    } else if (warning) {
      defaults.classes.push('frui-bg-warning');
    } else if (success) {
      defaults.classes.push('frui-bg-success');
    } else if (error) {
      defaults.classes.push('frui-bg-error');
    } else if (muted) {
      defaults.classes.push('frui-bg-muted');
    }
  } 

  const map = {
    classes: [ ...defaults.classes, className].join(' '),
    styles: { ...defaults.styles, ...style }
  };

  if (href) {
    return (
      <a 
        href={href} 
        target={target}
        title={title}
        className={map.classes} 
        style={map.styles}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      title={title}
      className={map.classes} 
      style={map.styles} 
      {...attributes}
    >
      {children}
    </button>
  );
};

//defaults to button
export default Button;