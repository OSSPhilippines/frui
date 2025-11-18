//--------------------------------------------------------------------//
// Imports

//modules
import { 
  createContext, 
  useContext, 
  useEffect, 
  useState 
} from 'react'; 

//frui
import type {  
  ExtendsType,
  CallableClassStyleProps,
  CallableSlotStyleProp,
  CallableChildrenProps,
  SlotStyleProp,
  HTMLElementProps
} from './types.js';
import getClassStyles from './helpers/getClassStyles.js';
import getSlotStyles from './helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type TabsStates = { active: boolean };

export type TabsConfig = {
  //default active tab value
  defaultValue?: string,
  //change value handler
  onChange?: (value: string) => void,
  //controlled value
  value?: string
};

export type TabsContextProps = {
  //slot: class/style to apply to each content element
  content?: SlotStyleProp,
  //change value handler
  change: (value: string) => void,
  //slot: class/style to apply to each tab element
  tab?: CallableSlotStyleProp<TabsStates>,
  //tab item value
  tabValue?: string,
  //active tab value
  value?: string
};

export type TabsHeadProps = HTMLElementProps & {
  //slot: class/style to apply to each tab
  tab?: CallableSlotStyleProp<TabsStates>
};

export type TabsLabelProps = ExtendsType<
  HTMLElementProps<HTMLDivElement>,
  CallableClassStyleProps<TabsStates>
    & CallableChildrenProps<TabsStates>
    //unique name for the tab
    & { value?: string }
>;

export type TabsBodyProps = HTMLElementProps & {
  //slot: class/style to apply to each content
  content?: SlotStyleProp
};

export type TabsContentProps = HTMLElementProps<HTMLDivElement> & {
  //unique name for the tab
  value?: string
};

export type TabsActiveProps = HTMLElementProps<HTMLDivElement>;
export type TabsInactiveProps = HTMLElementProps<HTMLDivElement>;

export type TabsProps = TabsConfig 
  & HTMLElementProps<HTMLDivElement> 
  & {
    //slot: class/style to apply to each content
    content?: SlotStyleProp,
    //slot: class/style to apply to each tab
    tab?: CallableSlotStyleProp<TabsStates>,
  };

//--------------------------------------------------------------------//
// Hooks

/**
 * Tabs hook
 */
export function useTabs(config: TabsConfig) {
  //config
  const { 
    //default active tab value
    defaultValue, //?: string
    //change value handler
    onChange, //: (value: string) => void
    //controlled value
    value //?: string
  } = config;
  //hooks
  const [ activeValue, setActiveValue ] = useState(defaultValue);
  //handlers
  const handlers = {
    change: (value: string) => {
      setActiveValue(value);
      onChange && onChange(value);
    }
  };
  //effects
  // if there's a controlled value
  useEffect(() => {
    // set active value if different
    if (typeof value === 'string' && value !== activeValue) {
      setActiveValue(value);
    }
  }, [ value ]);
  return { activeValue, handlers };
};

/**
 * Tab context hook
 */
export function useTabsContext() {
  return useContext(TabsContext);
};

//--------------------------------------------------------------------//
// Components

/**
 * Tab context
 */
export const TabsContext = createContext<TabsContextProps>({
  change: () => {}
});

/**
 * Tab active component
 */
export function TabsActive(props: TabsActiveProps) {
  //props
  const { className, style, children, ...attributes } = props;
  //hooks
  const { value, tabValue } = useTabsContext();
  //variables
  // configure classes
  const classes = [ 'frui-accordion-active' ];
  if (className) {
    classes.push(className);
  }
  //render
  return tabValue && value === tabValue ? (
    <div {...attributes} className={classes.join(' ')} style={style}>
      {children}
    </div>
  ) : null;
};

/**
 * Tab inactive component
 */
export function TabsInactive(props: TabsInactiveProps) {
  //props
  const { className, style, children, ...attributes } = props;
  //hooks
  const { value, tabValue } = useTabsContext();
  //variables
  // configure classes
  const classes = [ 'frui-accordion-inactive' ];
  if (className) {
    classes.push(className);
  }
  //render
  return !tabValue || value !== tabValue ? (
    <div {...attributes} className={classes.join(' ')} style={style}>
      {children}
    </div>
  ) : null;
};

/**
 * Tab head component
 */
export function TabsHead(props: TabsHeadProps) {
  //props
  const { 
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //tabs style
    style, //?: CSSProperties
    //slot: class/style to apply to each tab
    tab, //?: CallableSlotStyleProp<TabsStates>
    ...attributes
  } = props;
  //hooks
  const context = useTabsContext();
  //variables
  // configure classes
  const classes = [ 'frui-tabs-head' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    ...context, 
    tab: tab || context.tab
  };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <header {...attributes} className={classes.join(' ')} style={style}>
        {children}
      </header>
    </TabsContext.Provider>
  );
};

/**
 * Tab label component
 */
export function TabsLabel(props: TabsLabelProps) {
  //props
  const {
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //tabs style
    style, //?: CSSProperties
    //unique name for the tab
    value, //?: string
    ...attributes
  } = props;
  //hooks
  const context = useTabsContext();
  //variables
  // determine active state
  const active = Boolean(value && context.value === value);
  // get slot styles
  const slot = context.tab ? getSlotStyles(context.tab, { active }) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 
      'frui-tabs-label', 
      ...(active ? ['frui-tabs-label-active'] : []) 
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
  // configure context provider
  const provider = { ...context, tabValue: value };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <div
        {...attributes}
        className={classes.join(' ')}
        style={styles}
        onClick={() => value && context.change(value)}
        data-active={active ? 'true' : 'false'}
      >
        {typeof children === 'function' ? children({ active }) : children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * Tab body component
 */
export function TabsBody(props: TabsBodyProps) {
  //props
  const {
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //slot: class/style to apply to each content
    content, //?: SlotStyleProp
    //tabs style
    style, //?: CSSProperties
    ...attributes
  } = props;
  //hooks
  const context = useTabsContext();
  //variables
  // configure classes
  const classes = [ 'frui-tabs-body' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    ...context, 
    content: content || context.content
  };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <main {...attributes} className={classes.join(' ')} style={style}>
        {children}
      </main>
    </TabsContext.Provider>
  );
};

/**
 * Tab content component
 */
export function TabsContent(props: TabsContentProps) {
  //props
  const {
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //tabs style
    style, //?: CSSProperties
    //unique name for the tab
    value //?: string
  } = props;
  //hooks
  const context = useTabsContext();
  //variables
  // get slot styles
  const slot = context.content ? getSlotStyles(context.content, {}) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 'frui-tabs-content' ],
    //style props
    props: {
      //prefer direct props over slot props
      className: className || slot.className,
      //prefer direct props over slot props
      style: style || slot.style
    },
    //state to pass to callable props
    state: {}
  });
  //render
  return value && context.value === value ? (
    <div className={classes.join(' ')} style={styles}>
      {children}
    </div>
  ) : null;
};

/**
 * Tab component (main)
 */
export function Tabs(props: TabsProps) {
  //props
  const { 
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //slot: class/style to apply to each content
    content, //?: SlotStyleProp
    //default active tab value
    defaultValue, //?: string
    //change value handler
    onChange, //: (value: string) => void
    //tabs style
    style, //?: CSSProperties
    //slot: class/style to apply to each tab
    tab, //?: CallableSlotStyleProp<TabsStates>,
    //controlled value
    value, //?: string
    ...attributes
  } = props;
  //hooks
  const { activeValue, handlers } = useTabs({
    defaultValue,
    onChange,
    value
  });
  //variables
  // configure classes
  const classes = [ 'frui-tabs' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    change: handlers.change,
    content, 
    tab,
    value: activeValue
  };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <div {...attributes} className={classes.join(' ')} style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

//defaults to tab
export default Object.assign(Tabs, {
  useTabs,
  useTabsContext,
  Head: TabsHead,
  Label: TabsLabel,
  Body: TabsBody,
  Content: TabsContent,
  Active: TabsActive,
  Inactive: TabsInactive,
  Context: TabsContext,
  useContext: useTabsContext,
  use: useTabs
});
