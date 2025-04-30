import type { CSSProperties, ReactNode } from 'react';

/**
 * Breadcrumb Item Type
 */
export type BreadcrumbItem = {
  href?: string;
  label: ReactNode;
  icon?: string;
};

/**
 * Breadcrumb Props
 */
export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xl2?: boolean;
  xl3?: boolean;
  xl4?: boolean;
  xl5?: boolean;
  info?: boolean;
  warning?: boolean;
  success?: boolean;
  error?: boolean;
  muted?: boolean;
  className?: string;
  style?: CSSProperties;
};

/**
 * Breadcrumb Item Component
 */
const Item: React.FC<BreadcrumbItem & { isLast: boolean; separator?: ReactNode; sizeClass: string }> = ({
  href,
  label,
  icon,
  isLast,
  separator = <i className="fas fa-fw fa-chevron-right" />,
  sizeClass,
}) => {
  const content = href ? (
    <a href={href} className={`frui-breadcrumb-link ${sizeClass}`}>
      {icon && <i className={`fas fa-fw fa-${icon} frui-icon-margin`} />}
      {label}
    </a>
  ) : (
    <span className={`frui-breadcrumb-label ${sizeClass}`}>
      {icon && <i className={`fas fa-fw fa-${icon} frui-icon-margin`} />}
      {label}
    </span>
  );

  return (
    <>
      {content}
      {!isLast && <span className={`frui-breadcrumb-separator frui-separator-margin ${sizeClass}`}>{separator}</span>}
    </>
  );
};

/**
 * Breadcrumb Component (Main)
 */
export default function Breadcrumb(props: BreadcrumbProps) {
  const { 
    items = [],
    separator,
    xs,
    sm,
    md,
    lg,
    xl,
    xl2,
    xl3,
    xl4,
    xl5,
    info,
    warning,
    success,
    error,
    muted,
    className,
    style,
  } = props;

  const defaults: {
    classes: string[],
    styles: Record<string, string>
  } = {
    classes: ['frui-breadcrumb', 'frui-flex-center'],
    styles: {}
  };

  // Size handling
  const size = xs ? 'xs' : 
    sm ? 'sm' : 
    md ? 'md' : 
    lg ? 'lg' : 
    xl ? 'xl' : 
    xl2 ? '2xl' : 
    xl3 ? '3xl' : 
    xl4 ? '4xl' : 
    xl5 ? '5xl' : 'md';
  defaults.classes.push(`frui-text-${size}`);

  // Color handling
  if (info) defaults.classes.push('frui-tx-info');
  else if (warning) defaults.classes.push('frui-tx-warning');
  else if (success) defaults.classes.push('frui-tx-success');
  else if (error) defaults.classes.push('frui-tx-error');
  else if (muted) defaults.classes.push('frui-tx-muted');

  const map = {
    classes: [...defaults.classes, className].filter(Boolean).join(' '),
    styles: { ...defaults.styles, ...style }
  };

  const trail = items.filter(item => !!item.label);

  return (
    <nav className={map.classes} style={map.styles} aria-label="breadcrumb">
      {trail.map((item, index) => (
        <Item
          key={index}
          {...item}
          isLast={index === trail.length - 1}
          separator={separator}
          sizeClass={`frui-text-${size}`}
        />
      ))}
    </nav>
  );
};