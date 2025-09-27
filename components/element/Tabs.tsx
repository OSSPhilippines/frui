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
  ClassStyleProp, 
  HTMLProps, 
  ChildrenProps 
} from '../types.js';
import applyClassStyle from '../helpers/style.js';

//--------------------------------------------------------------------//
// Types

export type TabsContextProps = {
  //class/style to apply to active tab
  activeClassStyle?: ClassStyleProp,
  //class/style to apply to each content
  contentClassStyle?: ClassStyleProp,
  //change value handler
  onChange: (value: string) => void,
  //class/style to apply to each tab
  tabClassStyle?: ClassStyleProp,
  //tab item value
  tabValue?: string,
  //active tab value
  value?: string
};

export type TabsHeadProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active tab
  activeClassStyle?: ClassStyleProp,
  //class/style to apply to each tab
  tabClassStyle?: ClassStyleProp
};

export type TabsLabelProps = HTMLProps & ChildrenProps & {
  //class/style to apply if active
  activeClassStyle?: ClassStyleProp,
  //unique name for the tab
  value?: string
};

export type TabsBodyProps = HTMLProps & ChildrenProps & {
  //class/style to apply to each content
  contentClassStyle?: ClassStyleProp
};

export type TabsContentProps = HTMLProps & ChildrenProps & {
  //unique name for the tab
  value?: string
};

export type TabsActiveProps = HTMLProps & ChildrenProps;
export type TabsInactiveProps = HTMLProps & ChildrenProps;

export type TabsProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active tab
  activeClassStyle?: ClassStyleProp,
  //change value handler
  onChange?: (value: string) => void,
  //class/style to apply to each content
  contentClassStyle?: ClassStyleProp,
  //default active tab value
  defaultValue?: string,
  //class/style to apply to each tab
  tabClassStyle?: ClassStyleProp,
  //controlled value
  value?: string
};

//--------------------------------------------------------------------//
// Hooks

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
  onChange: () => {}
});

/**
 * Tab active component
 */
export function TabsActive(props: TabsActiveProps) {
  //props
  const { className, style, children } = props;
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
    <div className={classes.join(' ')} style={style}>
      {children}
    </div>
  ) : null;
};

/**
 * Tab inactive component
 */
export function TabsInactive(props: TabsInactiveProps) {
  //props
  const { className, style, children } = props;
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
    <div className={classes.join(' ')} style={style}>
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
    //class/style to apply to active tab
    activeClassStyle, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //tabs style
    style, //?: CSSProperties
    //class/style to apply to each tab
    tabClassStyle //?: ClassStyleProp
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
    active: activeClassStyle || context.activeClassStyle, 
    tab: tabClassStyle || context.tabClassStyle
  };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <header className={classes.join(' ')} style={style}>
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
    //class/style to apply if active
    activeClassStyle, //?: ClassStyleProp
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
  const isActive = value && context.value === value;
  // configure classes and styles
  const classes = [ 'frui-tabs-label' ];
  const styles = { ...style };
  // if active tab
  if (isActive) {
    //add active class
    classes.push('frui-tabs-label-active');
    //if TabsLabel has an active prop
    if (activeClassStyle) {
      //use the active prop from TabsLabel
      applyClassStyle(classes, styles, activeClassStyle);
    //if the context has an active prop
    } else if (context.activeClassStyle) {
      //use the active prop from context
      applyClassStyle(classes, styles, context.activeClassStyle);
    //there are no active props
    //if TabsLabel has a className prop
    } else if (className) {
      //use the className prop from TabsLabel
      classes.push(className);
    } else if (context.tabClassStyle) {
      //use the tabs prop from context
      applyClassStyle(classes, styles, context.tabClassStyle);
    }
  //not active tab
  //if TabsLabel has a className prop
  } else if (className) {
    //use the className prop from TabsLabel
    classes.push(className);
  //if the context has a tabs prop
  } else if (context.tabClassStyle) {
    //use the tabs prop from context
    applyClassStyle(classes, styles, context.tabClassStyle);
  }
  // configure context provider
  const provider = { ...context, tabValue: value };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <div
        className={classes.join(' ')}
        style={style}
        onClick={() => value && context.onChange(value)}
        data-active={isActive ? 'true' : 'false'}
      >
        {children}
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
    //class/style to apply to each content
    contentClassStyle, //?: ClassStyleProp
    //tabs style
    style, //?: CSSProperties
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
    contentClassStyle: contentClassStyle || context.contentClassStyle
  };
  //render
  return (
    <TabsContext.Provider value={provider}>
      <main className={classes.join(' ')} style={style}>
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
  // configure classes and styles
  const classes = [ 'frui-tabs-content' ];
  const styles = { ...style };
  //if TabsContent has a className prop
  if (className) {
    //use the className prop from TabsContent
    classes.push(className);
  //if the context has a tabs prop
  } else if (context.contentClassStyle) {
    //use the tabs prop from context
    applyClassStyle(classes, styles, context.contentClassStyle);
  }
  //render
  return value && context.value === value ? (
    <div className={classes.join(' ')} style={style}>
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
    //class/style to apply to active tab
    activeClassStyle, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //change value handler
    onChange, //: (value: string) => void
    //class/style to apply to each content
    contentClassStyle, //?: ClassStyleProp
    //default active tab value
    defaultValue, //?: string
    //tabs style
    style, //?: CSSProperties
    //class/style to apply to each tab
    tabClassStyle, //?: ClassStyleProp
    //controlled value
    value //?: string
  } = props;
  //hooks
  const [ activeValue, change ] = useState<string|undefined>(defaultValue);
  //variables
  // configure classes
  const classes = [ 'frui-tabs' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    activeClassStyle, 
    onChange: (value: string) => {
      change(value);
      onChange && onChange(value);
    },
    contentClassStyle, 
    tabClassStyle,
    value: activeValue
  };
  //effects
  // if there's a controlled value
  useEffect(() => {
    // set active value if different
    if (typeof value === 'string' && value !== activeValue) {
      change(value);
    }
  }, [ value ]);
  //render
  return (
    <TabsContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

//defaults to tab
export default Object.assign(
  Tabs, 
  {
    Head: TabsHead,
    Label: TabsLabel,
    Body: TabsBody,
    Content: TabsContent,
    Active: TabsActive,
    Inactive: TabsInactive,
    Context: TabsContext,
    useContext: useTabsContext
  }
);
