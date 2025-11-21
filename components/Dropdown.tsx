//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX, ReactNode, Ref } from 'react';
import { createPortal } from 'react-dom';
import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  useRef 
} from 'react';
//frui
import type { 
  CallableClassStyleProps,
  CallableSlotStyleProp,
  CallableChildrenProps,
  ClassStyleProps, 
  ChildrenProps,
  SlotStyleProp
} from './types.js';
import getClassStyles from './helpers/getClassStyles.js';
import getSlotStyles from './helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type DropdownData = { label?: string, value: string };

export type DropdownStates = {
  //the current selected option/s
  active: boolean
};

export type DropdownContextProps = {
  //clear handler
  clear: () => void,
  //whether to accept multiple selections
  multiple?: boolean,
  //whether the dropdown is open
  opened: boolean,
  //slot: style to apply to the select control
  option?: CallableSlotStyleProp<DropdownStates>,
  //toggle handler for dropdown
  open: (show: boolean) => void,
  //options count
  options: number,
  //select handler
  select: (option: string) => void,
  //the current selected option/s
  selected: string[]
};

export type DropdownConfig = {
  //selector used to get the element to which the dialog will be
  // appended to when activated
  append?: string,  
  //position of the dropdown
  bottom?: boolean,
  //uncontrolled serializable select value
  defaultValue?: string|string[],
  //position of the dropdown
  left?: boolean,
  //whether to accept multiple selections
  multiple?: boolean,
  //drop down handler
  onDropdown?: (show: boolean) => void,
  //update handler
  onUpdate?: (value: string|string[]) => void,
  //position of the dropdown
  top?: boolean,
  //position of the dropdown
  right?: boolean,
  //controlled select value
  value?: string|string[]
};

export type DropdownOptionProps = CallableClassStyleProps<DropdownStates> 
  & CallableChildrenProps<DropdownStates> 
  & { value: string };

export type DropdownControlProps = ClassStyleProps & ChildrenProps;
export type DropdownFootProps = ClassStyleProps & ChildrenProps;
export type DropdownHeadProps = ClassStyleProps & ChildrenProps;

export type DropdownDropdownProps = ClassStyleProps & ChildrenProps & {
  position?: [ number, number ],
  ref: Ref<HTMLDivElement>
};

export type DropdownProps = ClassStyleProps & ChildrenProps & DropdownConfig & {
  //slot: style to apply to the select drop down container
  container?: SlotStyleProp,
  //whether the select is in an error state
  error?: boolean,
  //dropdown handler
  onDropdown?: (show: boolean) => void,
  //update handler
  onUpdate?: (value: string|string[]) => void,
  //slot: style to apply to the select control
  option?: CallableSlotStyleProp<DropdownStates>,
  //serialized list of options as array or object
  options?: DropdownData[]|Record<string, string>
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Build options from either children or data
 */
export function buildOptions(
  children?: ReactNode,
  data?: DropdownData[] | Record<string, string>,
  selected: string[] = [],
  multiple?: boolean
) {
  if (children) {
    const options = getOptions(children, selected, multiple);
    if (options.options.length > 0 || options.selected.length > 0) {
      return options;
    }
  } 
  if (data) {
    return makeOptions(data, selected, multiple);
  }
  return { options: [], selected: [] };
};

/**
 * Calculate dropdown position based on select and dropdown 
 * sizes and direction
 */
export function getAbsolutePosition(
  container: HTMLDivElement, 
  dropdown: HTMLDivElement,
  direction: { top: boolean, bottom: boolean, left: boolean, right: boolean }
) {
  const { top, bottom, left, right } = direction;
  //Calculate based on the container's position on the page. Then
  // use `createPortal` later to move the dropdown to the end of the 
  // document body to avoid overflow issues.
  const containerRect = container.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  const position = { x: 0, y: 0 };

  switch (true) {
    case left:
      //(to the top of the container relative to the page)
      position.y = containerRect.top;
      //(to the left of the container relative to the page)
      position.x = containerRect.left - dropdownRect.width;
      break;
    case right:
      //(to the top of the container relative to the page)
      position.y = containerRect.top;
      //(to the right of the container relative to the page)
      position.x = containerRect.left + containerRect.width;
      break;
    case top:
      //(above the container relative to the page)
      position.y = containerRect.top - dropdownRect.height;
      position.x = containerRect.left;
      break;
    case bottom:
    default:
      //y = container bottom + arrow size
      //(below the container relative to the page)
      position.y = containerRect.bottom;
      position.x = containerRect.left;
      break;
  }
  return position;
};

/**
 * Get node from children or use default
 */
export function getComponent(
  component: Function,
  propName: string,
  children?: ReactNode
): ReactNode {
  if (!children) return null;
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) continue;
    //if child is a DropdownHead
    if (child.type === component || child.props?.[propName]) {
      return child;
    }
  }
  return null;
};

/**
 * Extracts nodes from children, data, and selected values
 */
export function getComponents(
  children?: ReactNode,
  data?: DropdownData[] | Record<string, string>,
  selected: string[] = [],
  multiple?: boolean
) {
  const nodes = buildOptions(children, data, selected, multiple);
  const control = getControl(children);
  const footer = getFooter(children);
  const header = getHeader(children);
  return { ...nodes, control, footer, header };
};

/**
 * Get first control component from children nodes
 */
export function getControl(children?: ReactNode) {
  return getComponent(
    DropdownControl, 
    'selectDropdownControl', 
    children
  );
};

/**
 * Get first foot component from children node
 */
export function getFooter(children?: ReactNode) {
  return getComponent(
    DropdownFoot, 
    'selectDropdownFoot', 
    children
  );
};

/**
 * Get first head component from children node
 */
export function getHeader(children?: ReactNode) {
  return getComponent(
    DropdownHead, 
    'selectDropdownHead', 
    children
  );
};

/**
 * Get options from children nodes
 */
export function getOptions<T = unknown>(
  children: ReactNode, 
  values: T[], 
  multiple?: boolean
) {
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  const options: ReactNode[] = [];
  const selected: ReactNode[] = [];
  const others: ReactNode[] = [];
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) {
      others.push(child);
      continue;
    }
    //an array can be from options.map(...)
    if (Array.isArray(child)) {
      const nested = getOptions(child, values, multiple);
      options.push(...nested.options);
      selected.push(...nested.selected);
      others.push(...nested.others);
      continue;
    }
    //if child is a DropdownOption
    if (child.type === DropdownOption || child.props?.selectOption) {
      //if multiple selections allowed
      if (multiple) {
        //check if option is selected
        if (values.includes(child.props.value)) {
          //add to selected
          selected.push(child);
        } else {
          //add to options
          options.push(child);
        }
      //single selection
      } else if (values.includes(child.props.value)) {
        //only add first match
        if (selected.length === 0) {
          //add to selected
          selected.push(child);
        }
        //dont add to options
      } else {
        //add to options
        options.push(child);
      }
      continue;
    }
    others.push(child);
  }
  return { options, selected, others };
};

/**
 * Calculate dropdown position based on select and dropdown 
 * sizes and direction
 */
export function getRelativePosition(
  container: HTMLDivElement, 
  dropdown: HTMLDivElement,
  direction: { top: boolean, bottom: boolean, left: boolean, right: boolean }
) {
  const { top, bottom, left, right } = direction;
  const containerRect = container.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  const position = { x: 0, y: 0 };

  switch (true) {
    case left:
      position.y = 0;
      //(to the left of the container)
      position.x = -(dropdownRect.width);
      break;
    case right:
      position.y = 0;
      //(to the right of the container)
      position.x = containerRect.width;
      break;
    case top:
      //(above the container)
      position.y = -(dropdownRect.height);
      position.x = 0;
      break;
    case bottom:
    default:
      //y = container bottom + arrow size
      //(below the container)
      position.y = containerRect.height;
      position.x = 0;
      break;
  }
  return position;
};

/**
 * Make options from data (array or object)
 */
export function makeOptions(
  data: DropdownData[] | Record<string, string>,
  selected: string[], 
  multiple?: boolean
) {
  if (!Array.isArray(data)) {
    if (typeof data === 'object') {
      data = Object.entries(data).map(([ key, val ]) => ({
        label: key,
        value: val
      }));
    } else {
      data = [];
    }
  }
  const style = { padding: '2px 8px' };
  const options: ReactNode[] = [];
  for (let i = 0; i < data.length; i++) {
    const { label, value } = data[i];
    options.push(
      <DropdownOption key={i} value={value} style={style}>
        {label || value}
      </DropdownOption>
    );
  }
  return getOptions(options, selected, multiple);
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Dropdown context hook
 */
export function useDropdownContext() {
  return useContext(DropdownContext);
};

/**
 * Dropdown Hook Aggregate
 */
export function useDropdown(config: DropdownConfig) {
  //props
  const { 
    //selector used to get the element to which the dialog will be
    // appended to when activated
    append, //?: string  
    //position of the dropdown
    bottom, //?: boolean
    //uncontrolled serializable select value
    defaultValue, //?: string|string[]
    //position of the dropdown
    left, //?: boolean
    //whether to accept multiple selections
    multiple, //?: boolean
    //drop down handler
    onDropdown, //?: (show: boolean) => void
    //update handler
    onUpdate, //?: (value: string|string[]) => void
    //position of the dropdown
    top, //?: boolean
    //position of the dropdown
    right, //?: boolean
    //controlled select value
    value //?: string|string[]
  } = config;
  //if no default value
  const noValue = typeof defaultValue === 'undefined' 
    || defaultValue === null;
  const defaultValues = noValue
    //use empty array
    ? [] 
    //if default value is array
    : Array.isArray(defaultValue) 
    //just use it
    // (we can tell type based if multiple is true)
    ? defaultValue
    //else wrap in array 
    : [ defaultValue ];
  //hooks
  // whether the dropdown is open
  const [ opened, open ] = useState(false);
  // the current selected option/s
  const [ selected, setDropdowned ] = useState(defaultValues);
  // position of the dropdown (applicable for both relative and absolute dropdowns)
  const [ position, setPosition ] = useState<[ number, number ]>([0, 0]);
  // max width of the dropdown (should be applicable for absolute dropdowns)
  const [ width, setWidth ] = useState(0);
  //variables
  const refs = {
    container: useRef<HTMLDivElement>(null),
    dropdown: useRef<HTMLDivElement>(null)
  };
  const absolute = Boolean(append);
  //handlers
  const handlers = {
    clear: () => setDropdowned([]),
    open,
    portal(dropdown: JSX.Element) {
      //if no append selector
      if (!append) {
        //return the dropdown as is
        return dropdown;
      }
      const container = document.querySelector(append);
      if (!container) return null;
      return createPortal(dropdown, container);
    },
    select: (option: string) => {
      //if multiple selections allowed
      if (multiple) {
        //if option is already selected, remove it
        if (selected.includes(option)) {
          const values = selected.filter(s => s !== option);
          setDropdowned(values);
          onUpdate && onUpdate(values);
        //else add it
        } else {
          const values = [ ...selected, option ];
          setDropdowned(values);
          onUpdate && onUpdate(values);
        }
      //single selection
      } else {
        setDropdowned([ option ]);
        onUpdate && onUpdate(option);
        //close the dropdown
        open(false);
      }
    }
  };
  //effects
  // when controlled value changes
  useEffect(() => {
    if (value === undefined) return;
    if (!multiple && typeof value === 'string') {
      //update selected value
      handlers.select(value);
    } else if (multiple && Array.isArray(value)) {
      //update selected values
      setDropdowned(value);
    }
    //trigger update handler
    value && onUpdate && onUpdate(value);
  }, [ value ]);
  // when dropdown opens/closes
  useEffect(() => {
    //trigger dropdown handler
    opened && onDropdown && onDropdown(true);
    !opened && onDropdown && onDropdown(false);
  }, [ opened ]);
  // when dropdown opens, calculate position
  useEffect(() => {
    //if not visible, or if container or dropdown ref is not set, skip
    if (!opened || !refs.container.current || !refs.dropdown.current) {
      return;
    }
    //determine position based on where we are appending to
    const position = absolute
      ? getAbsolutePosition(
        refs.container.current, 
        refs.dropdown.current, 
        { top: !!top, bottom: !!bottom, left: !!left, right: !!right }
      )
      : getRelativePosition(
        refs.container.current, 
        refs.dropdown.current, 
        { top: !!top, bottom: !!bottom, left: !!left, right: !!right }
      );
    //update the position state
    setPosition([ position.x, position.y ]);
    //determine max width
    const rect = refs.container.current.getBoundingClientRect();
    setWidth(rect.width);
  }, [ 
    opened,
    selected,
    refs.container,
    refs.dropdown,
    top, 
    bottom, 
    left, 
    right
  ]);
  // consider resize and scroll for portalled dropdowns
  useEffect(() => {
    if (!absolute) return;
    const reshape = () => {
      if (!refs.container.current || !refs.dropdown.current) {
        return;
      }
      //determine position based on where we are appending to
      const position = absolute
        ? getAbsolutePosition(
          refs.container.current, 
          refs.dropdown.current, 
          { top: !!top, bottom: !!bottom, left: !!left, right: !!right }
        )
        : getRelativePosition(
          refs.container.current, 
          refs.dropdown.current, 
          { top: !!top, bottom: !!bottom, left: !!left, right: !!right }
        );
      //update the position state
      setPosition([ position.x, position.y ]);
      //determine max width
      const rect = refs.container.current.getBoundingClientRect();
      setWidth(rect.width);
    };
    window.addEventListener('resize', reshape);
    //start from the container ref and traverse up to find scrollable parents
    let parent = refs.container.current as HTMLElement | null;
    do {
      parent = parent?.parentElement || null;
      if (!parent) break;
      parent.addEventListener('scroll', reshape);
    } while (refs.container.current?.parentElement);
    //cleanup
    return () => {
      window.removeEventListener('resize', reshape);
      let parent = refs.container.current as HTMLElement | null;
      do {
        parent = parent?.parentElement || null;
        if (!parent) break;
        parent.removeEventListener('scroll', reshape);
      } while (refs.container.current?.parentElement);
    };
  }, []);
  
  return {
    absolute,
    width,
    opened,
    refs,
    selected,
    position,
    handlers
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Dropdown context
 */
export const DropdownContext = createContext<DropdownContextProps>({
  //clear handler
  clear: () => {},
  //toggle handler
  open: () => {},
  //whether the dropdown is open
  opened: false,
  //options count
  options: 0,
  //select an option
  select: () => {},
  //the current selected option/s
  selected: []
});

/**
 * Styled Dropdown Option Component
 * This is used for serialized options.
 */
export function DropdownOption(props: DropdownOptionProps) {
  //props
  const { value, className, style, children } = props;
  //hooks
  const { select, selected, option } = useDropdownContext();
  //variables
  const active = selected.includes(value);
  // get slot styles
  const slot = option ? getSlotStyles(option, { active }) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 
      'frui-dropdown-option', 
      ...(active ? [ 'frui-dropdown-option-active' ] : []) 
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
  //handlers
  const onClick = () => select(value);
  //render
  return (
    <div className={classes.join(' ')} style={styles} onClick={onClick}>
      {typeof children === 'function' ? children({ active }) : (children || value)}
    </div>
  );
};

/**
 * Styled Dropdown Dropdown Foot Component
 */
export function DropdownFoot(props: DropdownFootProps) {
  //props
  const { children, className, style } = props;
  //variables
  // determine classes
  const classes = [ 'frui-dropdown-foot' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  //render
  return (
    <footer className={classes.join(' ')} style={styles}>
      {children}
    </footer>
  );
};

/**
 * Styled Dropdown Dropdown Header Component
 */
export function DropdownHead(props: DropdownHeadProps) {
  //props
  const { children, className, style } = props;
  //variables
  // determine classes
  const classes = [ 'frui-dropdown-head' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  //render
  return (
    <header className={classes.join(' ')} style={styles}>
      {children}
    </header>
  );
};

/**
 * Container for the contents of the dropdown controls
 */
export function DropdownControl(props: DropdownControlProps) {
  //props
  const { children, className, style } = props;
  //variables
  // determine classes
  const classes = [ 'frui-dropdown-control' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  //render
  return (
    <div className={classes.join(' ')} style={styles}>
      {children}
    </div>
  );
};

/**
 * Styled Dropdown Component (Main)
 */
export function Dropdown(props: DropdownProps) {
  //props
  const { 
    //selector used to get the element to which the dialog will be
    // appended to when activated
    append, //?: string  
    //position of the dropdown
    bottom, //?: boolean
    //children (options)
    children,
    //custom class name
    className,
    //uncontrolled serializable select value
    defaultValue, //?: string|string[]
    //slot: style to apply to the select drop down container
    container, //: SlotStyleProp
    //position of the dropdown
    left, //?: boolean
    //whether to accept multiple selections
    multiple, //?: boolean
    //dropdown handler
    onDropdown, //?: (show: boolean) => void
    //update handler
    onUpdate, //?: (value: string) => void
    //slot: style to apply to the select control
    option, //: CallableSlotStyleProp<DropdownStates>
    //serialized list of options as array or object
    options, //: DropdownOption[]|Record<string, string>
    //position of the dropdown
    right, //?: boolean
    //custom inline styles
    style,
    //position of the dropdown
    top, //?: boolean
    //controlled select value
    value //?: string|string[]
  } = props;
  //hooks
  const {
    //whether the dropdown has been portalled to a different location
    absolute,
    //handlers
    handlers,
    //max width of the dropdown
    width,
    //whether the dropdown is open
    opened,
    //position of the dropdown
    position,
    //container and dropdown references
    refs,
    //the current selected option/s
    selected
  } = useDropdown({
    append,
    bottom,
    defaultValue,
    left,
    multiple,
    onDropdown,
    onUpdate,
    right,
    top,
    value
  });
  //variables
  // determine direction
  const direction = top ? 'top' 
    : bottom ? 'bottom' 
    : left ? 'left' 
    : right ? 'right' 
    : 'bottom';
  // determine classes
  const classes = [ 'frui-dropdown' ];
  // - add direction
  classes.push(`frui-dropdown-${direction}`);
  // - add absolute class if applicable
  absolute && classes.push('frui-dropdown-absolute');
  // - add custom class name
  className && classes.push(className);
  // determine styles
  const styles = { 
    //only if the dropdown is portalled, set widths
    width: absolute ? `${width}px` : undefined,
    //still, let styles prop override
    ...style,
    left: `${position[0]}px`,
    top: `${position[1]}px`
  };
  // get slot styles
  const containerStyles = container 
    ? getSlotStyles(container, {}) 
    : {};
  containerStyles.className = [ 
    'dropdown-container', 
    containerStyles.className || '' 
  ].filter(Boolean).join(' ');
  // determine provider
  const components = getComponents(
    children,
    options,
    selected,
    multiple
  );
  const provider = { 
    multiple,
    opened,
    option,
    options: components.options.length,
    clear: handlers.clear,
    open: handlers.open,
    select: handlers.select,
    selected
  };
  //render
  return (
    <DropdownContext.Provider value={provider}>
      <div 
        ref={refs.container} 
        className={containerStyles.className} 
        style={containerStyles.style} 
      >
        {components.control}
        {opened && components.options.length > 0 && handlers.portal(
          <div 
            ref={refs.dropdown} 
            className={classes.join(' ')} 
            style={styles}
          >
            {components.header}
            <div className="frui-dropdown-options">
              {components.options}
            </div>
            {components.footer}
          </div>
        )}
      </div>
    </DropdownContext.Provider>
  );
};

//defaults to select
export default Object.assign(Dropdown, {
  getAbsolutePosition,
  getComponent,
  getComponents,
  getControl,
  getFooter,
  getHeader,
  getOptions,
  getRelativePosition,
  makeOptions,
  buildOptions,
  useDropdown,
  useDropdownContext,
  Context: DropdownContext,
  Control: DropdownControl,
  Option: DropdownOption,
  Head: DropdownHead,
  Foot: DropdownFoot,
  use: useDropdown,
  useContext: useDropdownContext
});
