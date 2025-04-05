//types
import type { ReactNode, CSSProperties } from 'react';

/**
 * Alert Props
 */
export type AlertProps = {
  color?: string,
  info?: boolean, 
  warning?: boolean, 
  success?: boolean, 
  error?: boolean, 
  muted?: boolean, 
  solid?: boolean, 
  outline?: boolean,
  curved?: boolean,
  rounded?: boolean, 
  pill?: boolean,
  style?: CSSProperties,
  className?: string,
  children?: ReactNode
};

/**
 * Alert Component (Main)
 */
export default function Alert(props: AlertProps) {
  const { 
    color,
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
    classes: [ 'frui-alert' ],
    styles: {}
  }

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

  return (
    <div className={map.classes} style={map.styles}>
      {children}
    </div>
  );
};