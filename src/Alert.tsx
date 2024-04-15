//types
import type { AlertProps } from './types/components';

/**
 * Alert Component (Main)
 */
export default function Alert(props: AlertProps) {
  const { 
    color,
    primary,
    secondary,
    info, 
    warning,
    success, 
    error, 
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

  const defaults: {
    classes: string[],
    styles: Record<string, string>
  } = {
    classes: [ 'alert' ],
    styles: {}
  }

  if (curved) {
    defaults.classes.push('curved');
  } else if (rounded) {
    defaults.classes.push('rounded');
  } else if (pill) {
    defaults.classes.push('pill');
  }

  if (layout === 'outline') {
    defaults.classes.push('solid', 'thin');
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
    <div className={map.classes} style={map.styles}>
      {children}
    </div>
  );
};