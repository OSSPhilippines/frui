//modules
import type { JSX } from 'react';

export type Crumb = { 
  href?: string, 
  label: string|JSX.Element, 
  icon?: string,
  permit?: string[]
};

export type CrumbsProps = {
  crumbs: Crumb[], 
  className?: string
};

const Item = ({ href, label, icon, last }: Crumb & { last?: boolean }) => {
  const item = href
    ? <a href={href} className="crumb">{label}</a>
    : <span className="crumb">{label}</span>

  return (
    <>
      {icon && <i className={`icon fas fa-fw fa-${icon}`}></i>}
      {item}
      {!last && <i className="next fas fa-fw fa-chevron-right"></i>}
    </>
  )
}

const Header = ({ trail }: { trail: Crumb[] }) => {
  if (trail.length === 0) return null;
  const item = trail[trail.length - 1];
  const href = item.href || trail[trail.length - 2]?.href;
  if (href) {
    return (
      <a className="crumbs-header" href={href}>
        <i className="back fas fa-fw fa-chevron-left"></i>
        {!!item.icon && <i className={`icon fas fa-fw fa-${item.icon}`}></i>}
        <span className="label">{item.label}</span>
      </a>
    );
  }
  return (
    <div className="crumbs-header">
      {!!item.icon && <i className={`icon fas fa-fw fa-${item.icon}`}></i>}
      <span className="label">{item.label}</span>
    </div>
  );
};

export default function Crumbs({ crumbs, className }: CrumbsProps) {
  const trail = [ ...crumbs ].filter(item => !!item.label);

  const classNames = [ 'crumbs' ];

  if (className) {
    classNames.push(className);
  }

  return (
    <nav>
      <div className={classNames.join(' ')}>
        {trail.map((item, key) => (
          <Item 
            key={key} 
            href={item.href} 
            label={item.label} 
            icon={item.icon} 
            last={key === (trail.length - 1)}
          />
        ))}
      </div>
      <Header trail={trail} />
    </nav>
  );
}