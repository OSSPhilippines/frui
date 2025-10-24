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
  ExtendsType,
  CallableClassStyleProps,
  CallableSlotStyleProp,
  CallableChildrenProps,
  ClassStyleProps,
  HTMLElementProps
} from '../types.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type BreadStates = { active: boolean };

//serializable primitive
export type Crumb = ClassStyleProps & {
  //href link for the crumb
  href?: string,
  //icon class name for the crumb (only font awesome)
  icon?: string,
  //label for the crumb
  label: string
};

export type BreadContextProps = {
  //slot: class/style to apply to each crumb element
  crumb?: CallableSlotStyleProp<BreadStates>,
  //remove last n crumbs from trail
  pop: (count?: number) => void,
  //add crumb to trail
  push: (id: string) => void,
  //crumb trail (ids[])
  trail: string[]
};

export type BreadSlicerProps = HTMLElementProps<HTMLSpanElement> & {
  value?: string
};

export type BreadCrumbProps = ExtendsType<
  HTMLElementProps<HTMLAnchorElement>,
  CallableClassStyleProps<BreadStates> 
    & CallableChildrenProps<BreadStates>
    & {
      //href link for the crumb
      href?: string,
      //icon class name for the crumb (only font awesome)
      icon?: string,
      //click handler for each crumb
      onClick?: () => void
    }
>;

export type BreadProps = HTMLElementProps<HTMLDivElement> & {
  //slot: class/style to apply to each crumb element
  crumb?: CallableSlotStyleProp<BreadStates>,
  //uncontrolled serializable bread trail array
  defaultValue?: Crumb[],
  //click handler for each crumb
  onClick?: () => void,
  //whether to remove last n crumbs from trail on click
  pop?: boolean,
  //controlled serializable bread trail array
  value?: Crumb[]
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
export function buildBreadTrail(children: ReactNode) {
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
  const { value, className, style, children, ...attributes } = props;
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
    <span {...attributes} className={classes.join(' ')} style={style}>
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
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //href link for the crumb
    href, //?: string
    //icon class name for the crumb (only font awesome)
    icon, //?: string
    //tabs style
    style, //?: CSSProperties
    ...attributes
  } = props;
  //hooks
  const id = useId();
  const context = useBreadContext();
  //variables
  const { trail, crumb } = context;
  const active = id === trail[trail.length - 1];
  const shouldShow = id && trail.includes(id);
  // get slot styles
  const slot = crumb ? getSlotStyles(crumb, { active }) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 
      'frui-bread-crumb', 
      ...(active ? ['frui-bread-crumb-active'] : []) 
    ],
    //style props
    props: {
      //prefer direct props over slot props
      className: className || slot.className,
      //prefer direct props over slot props
      style: style || slot.style
    },
    //state to pass to callable props
    state: { active }
  });
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
      {...attributes}
      href={href}
      className={classes.join(' ')}
      style={styles}
      onClick={() => {
        const index = trail.indexOf(id);
        if (index >= 0) {
          //remove all crumbs after this one
          context.pop(trail.length - index - 1);
        }
      }}
      data-active={active ? 'true' : 'false'}
    >
      {!!icon && (
        <i className={`frui-bread-crumb-icon fas fa-fw fa-${icon}`}></i>
      )}
      {typeof children === 'function' ? children({ active }) : children}
    </a>
  );
  return (
    <span
      {...attributes}
      className={classes.join(' ')}
      style={styles}
      onClick={() => {
        const index = trail.indexOf(id);
        if (index >= 0) {
          //remove all crumbs after this one
          context.pop(trail.length - index - 1);
        }
      }}
      data-active={active ? 'true' : 'false'}
    >
      {!!icon && (
        <i className={`frui-bread-crumb-icon fas fa-fw fa-${icon}`}></i>
      )}
      {typeof children === 'function' ? children({ active }) : children}
    </span>
  );
};

/**
 * Bread Component
 */
export function Bread(props: BreadProps) {
  //props
  const { 
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //slot: class/style to apply to each crumb element
    crumb, //?: CallableSlotStyleProp<BreadStates>,
    //uncontrolled serializable bread trail array
    defaultValue, //?: Crumb[],
    //tabs style
    style, //?: CSSProperties,
    //controlled serializable bread trail array
    value, //?: Crumb[]
    ...attributes
  } = props;
  //hooks
  const [ trail, setTrail ] = useState<string[]>([]);
  const [ crumbs, setCrumbs ] = useState<Crumb[]>(defaultValue || []);
  //variables
  // configure classes
  const classes = [ 'frui-bread' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    crumb,
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
  //effects
  // if there's a controlled value
  useEffect(() => {
    if (Array.isArray(value)) {
      setCrumbs(value);
    }
  }, [ value ]);
  //render
  return (
    <BreadContext.Provider value={provider}>
      <div {...attributes} className={classes.join(' ')} style={style}>
        {!!children 
          ? buildBreadTrail(children)
          : crumbs.map((crumb, index) => {
            const { className, href, icon, label, style } = crumb;
            return (
              <BreadCrumb 
                key={`crumb-${index}`} 
                className={className} 
                href={href} 
                icon={icon} 
                style={style}
              >
                {label}
              </BreadCrumb>
            );
          })
        }
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