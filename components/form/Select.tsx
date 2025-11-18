//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode, Ref } from 'react';
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
} from '../types.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type SelectData = { label?: string, value: string };

export type SelectStates = {
  //the current selected option/s
  active: boolean
};

export type SelectContextProps = {
  //whether to accept multiple selections
  multiple?: boolean,
  //whether the dropdown is open
  opened: boolean,
  //slot: style to apply to the select control
  option?: CallableSlotStyleProp<SelectStates>,
  //options count
  options: number,
  //clear handler
  clear: () => void,
  //toggle handler for dropdown
  open: (show: boolean) => void,
  //select handler
  select: (option: string) => void,
  //the current selected option/s
  selected: string[]
};

export type SelectConfig = {
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

export type SelectOptionProps = CallableClassStyleProps<SelectStates> 
  & CallableChildrenProps<SelectStates> 
  & { value: string };

export type SelectPlaceholderProps = ClassStyleProps & ChildrenProps;

export type SelectDisplayProps = ClassStyleProps & ChildrenProps & {
  //position of the dropdown
  bottom?: boolean,
  //position of the dropdown
  left?: boolean,
  //position of the dropdown
  right?: boolean,
  //dropdown handler
  onOpen?: (opened: boolean) => void,
  //position of the dropdown
  top?: boolean
};

export type SelectDropdownHeadProps = ClassStyleProps & ChildrenProps;
export type SelectDropdownFootProps = ClassStyleProps & ChildrenProps;

export type SelectDropdownProps = ClassStyleProps & ChildrenProps & {
  position?: [ number, number ],
  ref: Ref<HTMLDivElement>
};

export type SelectProps = ClassStyleProps & ChildrenProps & SelectConfig & {
  //slot: style to apply to the select display
  display?: SlotStyleProp,
  //slot: style to apply to the select drop down
  dropdown?: SlotStyleProp,
  //whether the select is in an error state
  error?: boolean,
  //name used by forms
  name?: string,
  //dropdown handler
  onDropdown?: (show: boolean) => void,
  //update handler
  onUpdate?: (value: string|string[]) => void,
  //slot: style to apply to the select control
  option?: CallableSlotStyleProp<SelectStates>,
  //serialized list of options as array or object
  options?: SelectData[]|Record<string, string>,
  //placeholder text when no option is selected
  placeholder?: string
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Build options from either children or data
 */
export function buildOptions(
  children?: ReactNode,
  data?: SelectData[] | Record<string, string>,
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
export function getDropdownPosition(
  container: HTMLDivElement, 
  tooltip: HTMLDivElement,
  direction: { top: boolean, bottom: boolean, left: boolean, right: boolean }
) {
  const { top, bottom, left, right } = direction;
  const containerRect = container.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const position = { x: 0, y: 0 };

  switch (true) {
    case left:
      position.y = 0;
      //(to the left of the container)
      position.x = -(tooltipRect.width);
      break;
    case right:
      position.y = 0;
      //(to the right of the container)
      position.x = containerRect.width;
      break;
    case top:
      //(above the container)
      position.y = -(tooltipRect.height);
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
 * Get footer from children or use default
 */
export function getFooter(
  children?: ReactNode
): ReactNode {
  if (!children) return null;
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) continue;
    //if child is a SelectDropdownFoot
    if (child.type === SelectDropdownFoot || child.props?.selectDropdownFoot) {
      return child;
    }
  }
  return null;
};

/**
 * Get header from children or use default
 */
export function getHeader(
  children?: ReactNode
): ReactNode {
  if (!children) return null;
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) continue;
    //if child is a SelectDropdownHead
    if (child.type === SelectDropdownHead || child.props?.selectDropdownHead) {
      return child;
    }
  }
  return null;
};

/**
 * Extracts nodes from children, data, and selected values
 */
export function getNodes(
  children?: ReactNode,
  data?: SelectData[] | Record<string, string>,
  selected: string[] = [],
  multiple?: boolean
) {
  const nodes = buildOptions(children, data, selected, multiple);
  const placeholder = getPlaceholder(children);
  const header = getHeader(children);
  const footer = getFooter(children);
  return { ...nodes, placeholder, header, footer };
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
    //if child is a SelectOption
    if (child.type === SelectOption || child.props?.selectOption) {
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
 * Get placeholder from children or use default
 */
export function getPlaceholder(
  children?: ReactNode, 
  defaultValue = 'Choose Option...'
): ReactNode {
  if (!children) return defaultValue;
  const nodes = !Array.isArray(children) 
    ? [ children ].filter(Boolean)
    : children;
  for (const child of nodes) {
    //skip null/undefined child
    if (!child) continue;
    //if child is a SelectPlaceholder
    if (child.type === SelectPlaceholder || child.props?.selectPlaceholder) {
      return child;
    }
  }
  return (
    <SelectPlaceholder>{defaultValue}</SelectPlaceholder>
  );
};

/**
 * Make options from data (array or object)
 */
export function makeOptions(
  data: SelectData[] | Record<string, string>,
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
      <SelectOption key={i} value={value} style={style}>
        {label || value}
      </SelectOption>
    );
  }
  return getOptions(options, selected, multiple);
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Select context hook
 */
export function useSelectContext() {
  return useContext(SelectContext);
};

/**
 * Select Hook Aggregate
 */
export function useSelect(config: SelectConfig) {
  //props
  const { 
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
    || defaultValue === null ;
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
  const [ selected, setSelected ] = useState(defaultValues);
  // position of the tooltip
  const [ position, setPosition ] = useState<[ number, number ]>([0, 0]);
  //variables
  const refs = {
    container: useRef<HTMLDivElement>(null),
    dropdown: useRef<HTMLDivElement>(null)
  };
  //handlers
  const handlers = {
    clear: () => setSelected([]),
    open,
    select: (option: string) => {
      //if multiple selections allowed
      if (multiple) {
        //if option is already selected, remove it
        if (selected.includes(option)) {
          const values = selected.filter(s => s !== option);
          setSelected(values);
          onUpdate && onUpdate(values);
        //else add it
        } else {
          const values = [ ...selected, option ];
          setSelected(values);
          onUpdate && onUpdate(values);
        }
      //single selection
      } else {
        setSelected([ option ]);
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
      setSelected(value);
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
    //if not visible, or if container or tooltip ref is not set, skip
    if (!opened || !refs.container.current || !refs.dropdown.current) {
      return;
    }

    const position = getDropdownPosition(
      refs.container.current, 
      refs.dropdown.current, 
      { top: !!top, bottom: !!bottom, left: !!left, right: !!right }
    );

    setPosition([ position.x, position.y ]);
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
  
  return {
    refs,
    opened,
    selected,
    position,
    handlers
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Select context
 */
export const SelectContext = createContext<SelectContextProps>({
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
 * Styled Select Option Component
 * This is used for serialized options.
 */
export function SelectOption(props: SelectOptionProps) {
  //props
  const { value, className, style, children } = props;
  //hooks
  const { select, selected, option } = useContext(SelectContext);
  //variables
  const active = selected.includes(value);
  // get slot styles
  const slot = option ? getSlotStyles(option, { active }) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 
      'frui-form-select-option', 
      ...(active ? [ 'frui-form-select-option-active' ] : []) 
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
 * Styled Select Placeholder Component
 */
export function SelectPlaceholder(props: SelectPlaceholderProps) {
  //props
  const { children, className, style } = props;
  //hooks
  const { open, opened } = useContext(SelectContext);
  //variables
  // determine classes
  const classes = [ 'frui-form-select-placeholder' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  //handlers
  const toggle = () => open(!opened);
  //render
  return (
    <div className={classes.join(' ')} style={styles} onClick={toggle}>
      {children}
    </div>
  );
};

/**
 * Styled Select Display Component
 */
export function SelectDisplay(props: SelectDisplayProps) {
  //props
  const { 
    bottom,
    children, 
    className, 
    left,
    right,
    style,
    top
  } = props;
  //hooks
  const { 
    open, 
    opened, 
    clear, 
    selected,
    options
  } = useContext(SelectContext);
  //variables
  // determine classes
  const classes = [ 'frui-form-select-display' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  // determine direction symbol
  const direction = top ? '▲' 
    : bottom ? '▼' 
    : left ? '◀' 
    : right ? '▶' 
    : '▼';
  //handlers
  const toggle = () => open(!opened);
  //render
  return (
    <div className={classes.join(' ')} style={styles}>
      <div className="frui-form-select-selected">
        {children}
      </div>
      <div className="frui-form-select-controls">
        {selected.length > 0 && (
          <span 
            className="frui-form-select-clear"
            onClick={clear}
          >&times;</span>
        )}
        {options > 0 && (
          <span 
            className="frui-form-select-toggle"
            onClick={toggle}
          >
            {direction}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Styled Select Dropdown Foot Component
 */
export function SelectDropdownFoot(props: SelectDropdownFootProps) {
  //props
  const { children, className, style } = props;
  //variables
  // determine classes
  const classes = [ 'frui-form-select-dropdown-foot' ];
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
 * Styled Select Dropdown Header Component
 */
export function SelectDropdownHead(props: SelectDropdownHeadProps) {
  //props
  const { children, className, style } = props;
  //variables
  // determine classes
  const classes = [ 'frui-form-select-dropdown-head' ];
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
 * Styled Select Dropdown Component
 */
export function SelectDropdown(props: SelectDropdownProps) {
  //props
  const { 
    children, 
    className, 
    position = [ 0, 0 ],
    ref, 
    style 
  } = props;
  //hooks
  const { multiple, opened } = useContext(SelectContext);
  //variables
  // determine classes
  const classes = [ 'frui-form-select-dropdown' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  styles.left = position[0];
  styles.top = position[1];
  //get nodes
  const nodes = {
    options: getOptions(children, [], multiple).options,
    header: getHeader(children),
    footer: getFooter(children)
  };
  //render
  if (!opened) return null;
  return (
    <div ref={ref} className={classes.join(' ')} style={styles}>
      {nodes.header}
      <div className="frui-form-select-options">
        {nodes.options}
      </div>
      {nodes.footer}
    </div>
  );
};

/**
 * Styled Select Component (Main)
 */
export function Select(props: SelectProps) {
  //props
  const { 
    //position of the dropdown
    bottom, //?: boolean
    //children (options)
    children,
    //custom class name
    className,
    //uncontrolled serializable select value
    defaultValue, //?: T
    //slot: style to apply to the select display
    display, //: SlotStyleProp
    //slot: style to apply to the select drop down
    dropdown, //: SlotStyleProp
    //whether the select is in an error state
    error, //?: boolean
    //position of the dropdown
    left, //?: boolean
    //whether to accept multiple selections
    multiple, //?: boolean
    //name used by forms
    name, //?: string
    //dropdown handler
    onDropdown, //?: (show: boolean) => void
    //update handler
    onUpdate, //?: (value: string) => void
    //slot: style to apply to the select control
    option, //: CallableSlotStyleProp<SelectStates>
    //serialized list of options as array or object
    options, //: SelectOption[]|Record<string, string>
    //placeholder text when no option is selected
    placeholder, //?: string
    //position of the dropdown
    right, //?: boolean
    //custom inline styles
    style,
    //position of the dropdown
    top, //?: boolean
    //controlled select value
    value //?: T
  } = props;
  //hooks
  const {
    //handlers
    handlers,
    //whether the dropdown is open
    opened,
    //position of the dropdown
    position,
    //container and dropdown references
    refs,
    //the current selected option/s
    selected
  } = useSelect({
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
  // determine classes
  const classes = [ 'frui-form-select' ];
  className && classes.push(className);
  if (error) {
    classes.push('frui-form-select-error');
  }
  if (top) {
    classes.push('frui-form-select-top');
  } else if (left) {
    classes.push('frui-form-select-left');
  } else if (right) {
    classes.push('frui-form-select-right');
  } else {
    classes.push('frui-form-select-bottom');
  }
  // determine styles
  const styles = { ...style };
  // get slot styles
  const displayStyles = display ? getSlotStyles(display, {}) : {};
  const dropdownStyles = dropdown ? getSlotStyles(dropdown, {}) : {};
  // determine provider
  const nodes = getNodes(
    children,
    options,
    selected,
    multiple
  );
  const provider = { 
    multiple,
    opened,
    option,
    options: nodes.options.length,
    clear: handlers.clear,
    open: handlers.open,
    select: handlers.select,
    selected
  } as SelectContextProps;
  //render
  const label = getPlaceholder(children, placeholder);
  return (
    <SelectContext.Provider value={provider}>
      <div 
        ref={refs.container} 
        className={classes.join(' ')} 
        style={styles}
      >
        {/* Selected options & dropdown toggler */}
        <SelectDisplay 
          className={displayStyles.className} 
          style={displayStyles.style}
          onOpen={handlers.open}
          bottom={bottom}
          left={left}
          right={right}
          top={top}
        >
          {nodes.selected.length > 0  ? nodes.selected : label}
        </SelectDisplay>
        {/* Other options, search input */}
        {nodes.options.length > 0 && (
          <SelectDropdown 
            ref={refs.dropdown}
            className={dropdownStyles.className} 
            style={dropdownStyles.style} 
            position={position}
          >
            {nodes.header}
            {nodes.options}
            {nodes.footer}
          </SelectDropdown>
        )}
        {/* Hidden values (for form submission) */}
        {selected.map((selected, i) => typeof selected !== 'undefined' 
          && selected !== null ? (
            <input 
              key={i} 
              name={name} 
              type="hidden" 
              value={selected.toString()} 
            />
          ) : null
        )}
      </div>
    </SelectContext.Provider>
  );
};

//defaults to select
export default Object.assign(Select, {
  Context: SelectContext,
  Display: SelectDisplay,
  Dropdown: SelectDropdown,
  Option: SelectOption,
  Head: SelectDropdownHead,
  Foot: SelectDropdownFoot,
  Placeholder: SelectPlaceholder,
  getDropdownPosition,
  getFooter,
  getHeader,
  getNodes,
  getPlaceholder,
  getOptions,
  makeOptions,
  buildOptions,
  useSelect,
  useSelectContext
});
