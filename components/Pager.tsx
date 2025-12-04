//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties, JSX } from 'react';

//frui
import type { 
  ExtendsType,
  CallableClassStyleProps,
  HTMLElementProps 
} from './types.js';

//--------------------------------------------------------------------//
// Types

export type PagerState = {
  active: boolean
};

export type PagerProps = ExtendsType<
  HTMLElementProps<HTMLDivElement>,
  CallableClassStyleProps<PagerState> 
    &  {
      total?: number,
      skip?: number, 
      take?: number, 
      radius?: number,
      onUpdate?: (page: number) => void,
      prev?: boolean | JSX.Element,
      next?: boolean | JSX.Element,
      start?: boolean | JSX.Element,
      end?: boolean | JSX.Element
    }
>;

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
    onUpdate,
    start,
    end,
    next,
    prev,
    ...attributes
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
  const refresh = (page: number) => onUpdate 
    && onUpdate(Math.max(page - 1, 0) * take);
  //get style handlers
  const classNameHandler: Function = typeof props.className === 'function' 
    ? props.className 
    : () => props.className || '';
  const styleHandler: Function = typeof props.style === 'function' 
    ? props.style 
    : () => props.style || {};
  //get all possible style states
  const className = classNameHandler({ active: false }) as string;
  const style = styleHandler({ active: false }) as CSSProperties;
  const activeClassName = classNameHandler({ active: true }) as string;
  const activeStyle = styleHandler({ active: true }) as CSSProperties;
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
          {...attributes}
          className={startClass} 
          style={style}
          onClick={() => refresh(1)}
        >
          {typeof start !== 'boolean' ? start : '«'}
        </div>
      )}
      {!currentIsFirst && prev && (
        <div 
          {...attributes}
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
          {...attributes}
          className={page === currentPage ? activeClass : pageClass}
          style={page === currentPage ? activeStyle : style}
          onClick={() => refresh(page)}
        >
          {page}
        </div>
      ))}
      {!currentIsLast && next && (
        <div 
          {...attributes}
          className={nextClass}
          style={style}
          onClick={() => refresh(currentPage + 1)}
        >
          {typeof next !== 'boolean' ? next : '›'}
        </div>
      )}
      {showEnd && end && (
        <div 
          {...attributes}
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
export default Object.assign(Pager, { flatClass });
