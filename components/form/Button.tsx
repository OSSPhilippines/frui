//types
import type { CSSProperties } from 'react';
import type { HTMLButtonProps } from '../types.js';

/**
 * Button Props
 */
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
  transparent?: boolean, 
  solid?: boolean, 
  style?: CSSProperties|false
};

/**
 * Generic Button Component (Main)
 */
export default function Button(props: ButtonProps) {
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
    transparent, 
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
    classes: [ 'frui-btn' ],
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
  defaults.classes.push(`frui-btn-${size}`);

  const layout = outline 
    ? 'outline' 
    : transparent
    ? 'transparent'
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

  if (layout === 'outline' || layout === 'transparent') {
    defaults.classes.push('frui-solid', 'frui-thin');
    if (layout === 'outline') {
      defaults.classes.push('frui-bg-white');
    }
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