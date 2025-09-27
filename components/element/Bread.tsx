//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
import { 
  createContext, 
  useContext, 
  useId,
  useEffect,
  useState 
} from 'react';

//frui
import type { 
  ClassStyleProp, 
  HTMLProps, 
  ChildrenProps 
} from '../types.js';
import applyClassStyle from '../helpers/style.js';

//--------------------------------------------------------------------//
// Types

export type BreadContextProps = {
  //class/style to apply to active crumb
  activeClassStyle?: ClassStyleProp,
  //class/style to apply to each crumb
  crumbClassStyle?: ClassStyleProp,
  //remove last n crumbs from trail
  pop: (count?: number) => void,
  //add crumb to trail
  push: (id: string) => void,
  //crumb trail (ids[])
  trail: string[]
};

export type BreadSlicerProps = HTMLProps & ChildrenProps & {
  value?: string
};

export type BreadCrumbProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active crumb
  activeClassStyle?: ClassStyleProp,
  //href link for the crumb
  href?: string,
  //icon class name for the crumb (only font awesome)
  icon?: string
};

export type BreadProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active crumb
  activeClassStyle?: ClassStyleProp,
  //class/style to apply to each crumb
  crumbClassStyle?: ClassStyleProp
};

//--------------------------------------------------------------------//
// Constants

export const DEFAULT_SLICER = '/';

//--------------------------------------------------------------------//
// Helpers

/**
 * Build the breadcrumb trail from the children.
 * Adds the separator between crumbs.
 */
export function buildCrumbs(children: ReactNode) {
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  let slicer: ReactNode = DEFAULT_SLICER;
  const crumbs: ReactNode[] = [];
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) continue;
    //if child is a BreadSlicer
    if (child.type === BreadSlicer || child.props?.breadSlicer) {
      //update the slicer
      slicer = child;
    //if child is a BreadCrumb
    } else if (child.type === BreadCrumb) {
      //add slicer if there are already crumbs
      if (crumbs.length > 0) {
        crumbs.push(slicer);
      }
      //add the child
      crumbs.push(child);
    }
  }
  return crumbs;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Bread context hook
 */
export function useBreadContext() {
  return useContext(BreadContext);
};

//--------------------------------------------------------------------//
// Components

/**
 * Bread context
 */
export const BreadContext = createContext<BreadContextProps>({
  //remove last n crumbs from trail
  pop: () => {},
  //add crumb to trail and return lastId
  push: () => 0,
  //crumb trail (ids[])
  trail: []
});

/**
 * Bread slicer component. Separator between crumbs
 */
export function BreadSlicer(props: BreadSlicerProps) {
  //props
  const { value, className, style, children } = props;
  //hooks
  const id = useId();
  const context = useContext(BreadContext);
  const { trail } = context;
  //variables
  const shouldShow = id && trail.includes(id);
  // configure classes
  const classes = [ 'frui-bread-slicer' ];
  if (className) classes.push(className);
  const separator = children || value || DEFAULT_SLICER;
  //effects
  useEffect(() => {
    //add slicer to trail
    context.push(id);
    //remove slicer from trail on unmount
    return () => context.pop();
  }, []);
  //render
  if (!shouldShow) return null;
  return (
    <span className={classes.join(' ')} style={style}>
      {separator}
    </span>
  );
};

/**
 * Bread crumb component
 */
export function BreadCrumb(props: BreadCrumbProps) {
  //props
  const { 
    //class/style to apply to active crumb
    activeClassStyle, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //href link for the crumb
    href, //?: string
    //icon class name for the crumb (only font awesome)
    icon, //?: string
    //tabs style
    style //?: CSSProperties
  } = props;
  //hooks
  const id = useId();
  const context = useContext(BreadContext);
  const { trail } = context;
  //variables
  const isActive = id === trail[trail.length - 1];
  const shouldShow = id && trail.includes(id);
  // configure classes and styles
  const classes = [ 'frui-bread-crumb' ];
  const styles = { ...style };
  // if active crumb
  if (isActive) {
    //add active class
    classes.push('frui-bread-crumb-active');
    //if BreadCrumb has an active prop
    if (activeClassStyle) {
      //use the active prop from BreadCrumb
      applyClassStyle(classes, styles, activeClassStyle);
    //if the context has an active prop
    } else if (context.activeClassStyle) {
      //use the active prop from context
      applyClassStyle(classes, styles, context.activeClassStyle);
    //there are no active props
    //if BreadCrumb has a className prop
    } else if (className) {
      //use the className prop from BreadCrumb
      classes.push(className);
    //if the context has a crumbs prop
    } else if (context.crumbClassStyle) {
      //use the crumbs prop from context
      applyClassStyle(classes, styles, context.crumbClassStyle);
    }
  //not active crumb
  //if BreadCrumb has a className prop
  } else if (className) {
    //use the className prop from BreadCrumb
    classes.push(className);
  //if the context has a crumbs prop
  } else if (context.crumbClassStyle) {
    //use the crumbs prop from context
    applyClassStyle(classes, styles, context.crumbClassStyle);
  }
  //effects
  useEffect(() => {
    //add crumb to trail
    context.push(id);
    //remove crumb from trail on unmount
    return () => context.pop();
  }, []);
  //render
  if (!shouldShow) return null;
  if (href) return (
    <a
      href={href}
      className={classes.join(' ')}
      style={style}
      onClick={() => {
        const index = trail.indexOf(id);
        if (index >= 0) {
          //remove all crumbs after this one
          context.pop(trail.length - index - 1);
        }
      }}
      data-active={isActive ? 'true' : 'false'}
    >
      {!!icon && (
        <i className={`frui-bread-crumb-icon fas fa-fw fa-${icon}`}></i>
      )}
      {children}
    </a>
  );
  return (
    <span
      className={classes.join(' ')}
      style={style}
      onClick={() => {
        const index = trail.indexOf(id);
        if (index >= 0) {
          //remove all crumbs after this one
          context.pop(trail.length - index - 1);
        }
      }}
      data-active={isActive ? 'true' : 'false'}
    >
      {!!icon && (
        <i className={`frui-bread-crumb-icon fas fa-fw fa-${icon}`}></i>
      )}
      {children}
    </span>
  );
};

/**
 * Bread Component
 */
export function Bread(props: BreadProps) {
  //props
  const { 
    //class/style to apply to active crumb
    activeClassStyle, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //class/style to apply to each crumb
    crumbClassStyle, //?: ClassStyleProp
    //tabs style
    style //?: CSSProperties,
  } = props;
  //hooks
  const [ trail, setTrail ] = useState<string[]>([]);
  //variables
  // configure classes
  const classes = [ 'frui-bread' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    activeClassStyle,
    crumbClassStyle,
    //remove last n crumbs from trail
    pop: (count = 1) => {
      setTrail(trail => {
        if (count <= 0) return trail;
        return trail.slice(0, trail.length - count);
      });
    },
    //add crumb to trail and return lastId
    push: (id: string) => {
      setTrail(trail => {
        if (trail.includes(id)) return trail;
        return [ ...trail, id ];
      });
    },
    //crumb trail (ids[])
    trail
  };
  //render
  return (
    <BreadContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {buildCrumbs(children)}
      </div>
    </BreadContext.Provider>
  );
};

export default Object.assign(Bread, {
  Crumb: BreadCrumb,
  Slicer: BreadSlicer,
  Separator: BreadSlicer,
  Sep: BreadSlicer,
  Context: BreadContext,
  useContext: useBreadContext
});