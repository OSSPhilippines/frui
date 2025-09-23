//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX } from 'react';

//frui
import type { HTMLProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type Crumb = { 
  href?: string, 
  label: string | JSX.Element, 
  icon?: string
};

export type CrumbItemProps = Crumb & {
  last?: boolean,
  separator?: string | JSX.Element
};

export type CrumbsProps = HTMLProps & {
  crumbs: Crumb[],
  separator?: string | JSX.Element
};

//--------------------------------------------------------------------//
// Components

/**
 * Crumb item component
 */
export function CrumbItem(props: CrumbItemProps) {
  const { 
    href, 
    label, 
    icon, 
    last, 
    separator
  } = props;
  const item = href
    ? <a href={href} className="frui-crumbs-item">{label}</a>
    : <span className="frui-crumbs-item">{label}</span>
  return (
    <>
      {!!icon && <i className={`frui-crumbs-icon fas fa-fw fa-${icon}`}></i>}
      {item}
      {!last 
        ? separator || (<span className="frui-crumbs-separator">{' › '}</span>) 
        : null
      }
    </>
  );
};

/**
 * Crumbs component (main)
 */
export function Crumbs(props: CrumbsProps) {
  const { crumbs, className, separator, style } = props;
  const trail = [ ...crumbs ].filter(item => !!item.label);

  const classes = [ 'frui-crumbs' ];
  if (className) classes.push(className);
  return (
    <div className={classes.join(' ')} style={style}>
      {trail.map((item, key) => (
        <CrumbItem 
          key={key} 
          href={item.href} 
          label={item.label} 
          icon={item.icon} 
          last={key === (trail.length - 1)}
          separator={separator}
        />
      ))}
    </div>
  );
};

//defaults to crumbs
export default Crumbs;