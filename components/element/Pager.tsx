//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX } from 'react';

//frui
import type { HTMLProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type PagerProps = HTMLProps & {
  activeClass?: string,
  total?: number,
  skip?: number, 
  take?: number, 
  radius?: number,
  onClick?: (page: number) => void,
  prev?: boolean | JSX.Element,
  next?: boolean | JSX.Element,
  start?: boolean | JSX.Element,
  end?: boolean | JSX.Element
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Flat class names into a single string
 */
export function flatClass(...classes: (string | string[])[]) {
  const newClass: string[] = [];
  for (const className of classes) {
    if (Array.isArray(className)) {
      newClass.push(...className);
    } else {
      newClass.push(className);
    }
  }
  return newClass.filter(Boolean).join(' ');
};

//--------------------------------------------------------------------//
// Components

/**
 * Pager component (main)
 */
export function Pager(props: PagerProps) {
  //hooks
  const { 
    total = 0, 
    skip = 0, 
    take = 50, 
    radius = 0, 
    onClick = () => {},
    start,
    end,
    next,
    prev,
    activeClass: activeClassName,
    className,
    style
  } = props;
  //calculate current page
  const currentPage = Math.floor(skip / take) + 1;
  const lastPage = Math.ceil(total / take);
  const currentIsFirst = currentPage <= 1;
  const currentIsLast = currentPage >= lastPage;
  const lowerBound = Math.max(1, currentPage - radius);
  const upperBound = Math.min(lastPage, currentPage + radius);
  //determine pages to show
  const showPages: number[] = [];
  for (let i = 1; i <= lastPage; i++) {
    if (radius > 0) {
      if (lowerBound <= i && i <= upperBound) {
        showPages.push(i);
      }
      continue;
    }
    showPages.push(i);
  }
  const showStart = showPages[0] !== 1;
  const showEnd = showPages[showPages.length - 1] !== lastPage;
  const refresh = (page: number) => onClick(Math.max(page - 1, 0) * take);
  //set default classes
  const classes = [];
  //if custom class, add it
  if (className) classes.push(className);
  const startClass = flatClass(
    'frui-pager-page', 
    'frui-pager-start', 
    classes
  );
  const endClass = flatClass(
    'frui-pager-page', 
    'frui-pager-end', 
    classes
  );
  const prevClass = flatClass(
    'frui-pager-page', 
    'frui-pager-prev', 
    classes
  );
  const nextClass = flatClass(
    'frui-pager-page', 
    'frui-pager-next', 
    classes
  );
  const pageClass = flatClass(
    'frui-pager-page', 
    classes
  );
  const activeClass = flatClass(
    'frui-pager-page', 
    'frui-pager-active', 
    activeClassName || classes
  );
  //render
  if (total <= take) return null;
  return (
    <>
      {showStart && start && (
        <div 
          className={startClass} 
          style={style} 
          onClick={() => refresh(1)}
        >
          {typeof start !== 'boolean' ? start : '«'}
        </div>
      )}
      {!currentIsFirst && prev && (
        <div 
          className={prevClass} 
          style={style} 
          onClick={() => refresh(currentPage - 1)}
        >
          {typeof prev !== 'boolean' ? prev : '‹'}
        </div>
      )}
      {showPages.map((page, i) => (
        <div
          key={i}
          className={page === currentPage ? activeClass : pageClass}
          style={style}
          onClick={() => refresh(page)}
        >
          {page}
        </div>
      ))}
      {!currentIsLast && next && (
        <div 
          className={nextClass} 
          style={style}
          onClick={() => refresh(currentPage + 1)}
        >
          {typeof next !== 'boolean' ? next : '›'}
        </div>
      )}
      {showEnd && end && (
        <div 
          className={endClass}
          style={style}
          onClick={() => refresh(lastPage)}
        >
          {typeof end !== 'boolean' ? end : '≫'}
        </div>
      )}
    </>
  );
};

//defaults to pager
export default Pager;
