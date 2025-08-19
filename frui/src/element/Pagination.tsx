//types
import type { CSSProperties, ReactNode } from 'react';

/**
 * Pagination Props
 */
export type PaginationProps = {
  total?: number;
  start?: number;
  range?: number;
  radius?: 0 | 1 | 2 | 3 | 4;
  next?: boolean;
  prev?: boolean;
  rewind?: boolean;
  forward?: boolean;
  link?: boolean;
  control?: boolean;
  border?: boolean;
  background?: boolean;
  square?: number;
  size?: string;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
  xl2?: boolean;
  xl3?: boolean;
  xl4?: boolean;
  xl5?: boolean;
  color?: string;
  white?: boolean;
  black?: boolean;
  info?: boolean;
  warning?: boolean;
  success?: boolean;
  error?: boolean;
  muted?: boolean;
  primary?: boolean;
  secondary?: boolean;
  page?: (page: number) => void;
  className?: string;
  style?: CSSProperties;
};

/**
 * Pagination Component (Main)
 */
export default function Pagination(props: PaginationProps) {
  const {
    total = 0,
    start = 0,
    range = 50,
    radius = 2,
    next,
    prev,
    rewind,
    forward,
    link = false,
    control = false,
    border = true,
    background = true,
    square = 0,
    size,
    xs,
    sm,
    md,
    lg,
    xl,
    xl2,
    xl3,
    xl4,
    xl5,
    color,
    white,
    black,
    info,
    warning,
    success,
    error,
    muted,
    primary,
    secondary,
    page: select = () => {},
    className,
    style,
  } = props;

  const defaults: {
    classes: string[];
    styles: Record<string, string>;
  } = {
    classes: ['frui-pagination'],
    styles: {}
  };

  //size handling
  const sizeClass = size || (
    xs ? 'xs' : 
    sm ? 'sm' : 
    md ? 'md' : 
    lg ? 'lg' : 
    xl ? 'xl' : 
    xl2 ? '2xl' : 
    xl3 ? '3xl' : 
    xl4 ? '4xl' : 
    xl5 ? '5xl' : 'md'
  );
  defaults.classes.push(`frui-text-${sizeClass}`);

  //color handling
  const colorClass = color || (
    white ? 'white' : 
    black ? 'black' : 
    info ? 'info' : 
    warning ? 'warning' : 
    success ? 'success' : 
    error ? 'error' : 
    muted ? 'muted' : 
    primary ? 'primary' : 
    secondary ? 'secondary' : ''
  );
  if (colorClass) defaults.classes.push(`frui-tx-${colorClass}`);

  //additional styling
  defaults.classes.push(`radius-${radius}`);
  if (square > 0) {
    defaults.classes.push('square');
    defaults.styles['--square-size'] = `${square}px`;
  }
  if (link) defaults.classes.push('link');
  if (control) defaults.classes.push('control');
  if (!border) defaults.classes.push('no-border');
  if (!background) defaults.classes.push('no-background');

  const map = {
    classes: [...defaults.classes, className].filter(Boolean).join(' '),
    styles: { ...defaults.styles, ...style }
  };

  const totalPages = Math.ceil(total / range);
  const currentPage = Math.ceil((start + 1) / range) || 1;

  const calculatePages = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
      page => page >= currentPage - radius && page <= currentPage + radius
    );
    return pages.length > 1 ? pages : [];
  };

  const pages = calculatePages();

  const renderButton = (content: ReactNode, pageNum: number | null, isControl = false, disabled = false) => {
    const onClick = pageNum !== null && !disabled ? () => select(pageNum) : undefined;
    const commonProps = {
      className: `frui-pagination-btn ${isControl ? 'control' : ''}`,
      onClick,
      disabled,
      'aria-label': typeof content === 'string' ? content : undefined,
    };

    return link && !isControl ? (
      <a href={`#page-${pageNum}`} {...commonProps}>
        {content}
      </a>
    ) : (
      <button type="button" {...commonProps}>
        {content}
      </button>
    );
  };

  const renderSpan = (content: ReactNode) => {
    const isCustomColor = color && !white && !black && !info && !warning && !success && !error && !muted && !primary && !secondary;
    const activeStyle = isCustomColor && currentPage === content ? {
      backgroundColor: color,
      borderColor: color,
      color: '#FFFFFF'
    } : {};

    return (
      <span
        className={`frui-pagination-span ${currentPage === content ? 'active' : ''}`}
        style={activeStyle}
      >
        {content}
      </span>
    );
  };

  return (
    <nav className={map.classes} style={map.styles} aria-label="pagination">
      {(rewind && renderButton(<i className="fas fa-fw fa-fast-backward" />, 1, true, currentPage === 1 || pages[0] === 1))}
      {(prev && renderButton(<i className="fas fa-fw fa-chevron-left" />, currentPage - 1, true, currentPage === 1))}
      {pages.map(page => (
        <div key={page}>
          {(page === currentPage ? renderSpan(page) : renderButton(page, page))}
        </div>
      ))}
      {(next && renderButton(<i className="fas fa-fw fa-chevron-right" />, currentPage + 1, true, currentPage === totalPages))}
      {(forward && renderButton(<i className="fas fa-fw fa-fast-forward" />, totalPages, true, currentPage === totalPages || pages[pages.length - 1] === totalPages))}
    </nav>
  );
}; 