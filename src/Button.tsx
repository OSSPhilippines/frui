//types
import type { ButtonProps } from './types/components';

/**
 * Generic Button Component (Main)
 */
export default function Button(props: ButtonProps) {
  // Separate component related props from field attributes
  const { 
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
    primary,
    secondary,
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
    classes: [ 'btn' ],
    styles: {}
  }

  if (block) {
    defaults.classes.push('block');
  }
  if (full) {
    defaults.classes.push('full');
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
  defaults.classes.push(`.btn-${size}`);

  const layout = outline 
    ? 'outline' 
    : transparent
    ? 'transparent'
    : solid 
    ? 'solid'
    : 'solid';

  if (curved) {
    defaults.classes.push('curved');
  } else if (rounded) {
    defaults.classes.push('rounded');
  } else if (pill) {
    defaults.classes.push('pill');
  }

  if (layout === 'outline' || layout === 'transparent') {
    defaults.classes.push('solid', 'thin');
    if (layout === 'outline') {
      defaults.classes.push('bg-white');
    }
    if (color) {
      defaults.styles.borderColor = color;
      defaults.styles.color = color;
    } else if (primary) {
      defaults.classes.push('bd-primary', 'tx-primary');
    } else if (secondary) {
      defaults.classes.push('bd-secondary', 'tx-secondary');
    } else if (info) {
      defaults.classes.push('bd-info', 'tx-info');
    } else if (warning) {
      defaults.classes.push('bd-warning', 'tx-warning');
    } else if (success) {
      defaults.classes.push('bd-success', 'tx-success');
    } else if (error) {
      defaults.classes.push('bd-error', 'tx-error');
    } else if (muted) {
      defaults.classes.push('bd-muted', 'tx-muted');
    }
  } else {
    defaults.classes.push('tx-white');
    if (color) {
      defaults.styles.backgroundColor = color;
    } else if (primary) {
      defaults.classes.push('bg-primary');
    } else if (secondary) {
      defaults.classes.push('bg-secondary');
    } else if (info) {
      defaults.classes.push('bg-info');
    } else if (warning) {
      defaults.classes.push('bg-warning');
    } else if (success) {
      defaults.classes.push('bg-success');
    } else if (error) {
      defaults.classes.push('bg-error');
    } else if (muted) {
      defaults.classes.push('bg-muted');
    }
  } 

  const map = {
    classes: [ ...defaults.classes, className].join(' '),
    styles: { ...defaults.styles, ...style }
  };

  return (
    <button className={map.classes} style={map.styles} {...attributes}>
      {children}
    </button>
  );
};