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

export type TabContextProps = {
  //class/style to apply to active tab
  active?: ClassStyleProp,
  //class/style to apply to each content
  contents?: ClassStyleProp,
  //change value handler
  onChange: (value: string) => void,
  //class/style to apply to each tab
  tabs?: ClassStyleProp,
  //tab item value
  tabValue?: string,
  //active tab value
  value?: string
};

export type TabHeadProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active tab
  active?: ClassStyleProp,
  //class/style to apply to each tab
  tabs?: ClassStyleProp
};

export type TabLabelProps = HTMLProps & ChildrenProps & {
  //class/style to apply if active
  active?: ClassStyleProp,
  //unique name for the tab
  value?: string
};

export type TabBodyProps = HTMLProps & ChildrenProps & {
  //class/style to apply to each content
  contents?: ClassStyleProp
};

export type TabContentProps = HTMLProps & ChildrenProps & {
  //unique name for the tab
  value?: string
};

export type TabActiveProps = HTMLProps & ChildrenProps;
export type TabInactiveProps = HTMLProps & ChildrenProps;

export type TabProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active tab
  active?: ClassStyleProp,
  //change value handler
  onChange?: (value: string) => void,
  //class/style to apply to each content
  contents?: ClassStyleProp,
  //default active tab value
  defaultValue?: string,
  //class/style to apply to each tab
  tabs?: ClassStyleProp,
  //controlled value
  value?: string
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Tab context hook
 */
export function useTabContext() {
  return useContext(TabContext);
};

//--------------------------------------------------------------------//
// Components

/**
 * Tab context
 */
export const TabContext = createContext<TabContextProps>({
  onChange: () => {}
});

/**
 * Tab active component
 */
export function TabActive(props: TabActiveProps) {
  //props
  const { className, style, children } = props;
  //hooks
  const { value, tabValue } = useTabContext();
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
export function TabInactive(props: TabInactiveProps) {
  //props
  const { className, style, children } = props;
  //hooks
  const { value, tabValue } = useTabContext();
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
export function TabHead(props: TabHeadProps) {
  //props
  const { 
    //class/style to apply to active tab
    active, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //tabs style
    style, //?: CSSProperties
    //class/style to apply to each tab
    tabs //?: ClassStyleProp
  } = props;
  //hooks
  const context = useTabContext();
  //variables
  // configure classes
  const classes = [ 'frui-tabs-head' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    ...context, 
    active: active || context.active, 
    tabs: tabs || context.tabs
  };
  //render
  return (
    <TabContext.Provider value={provider}>
      <header className={classes.join(' ')} style={style}>
        {children}
      </header>
    </TabContext.Provider>
  );
};

/**
 * Tab label component
 */
export function TabLabel(props: TabLabelProps) {
  //props
  const {
    //class/style to apply if active
    active, //?: ClassStyleProp
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
  const context = useTabContext();
  //variables
  const isActive = value && context.value === value;
  // configure classes and styles
  const classes = [ 'frui-tabs-label' ];
  const styles = { ...style };
  // if active tab
  if (isActive) {
    //add active class
    classes.push('frui-tabs-label-active');
    //if TabLabel has an active prop
    if (active) {
      //use the active prop from TabLabel
      applyClassStyle(classes, styles, active);
    //if the context has an active prop
    } else if (context.active) {
      //use the active prop from context
      applyClassStyle(classes, styles, context.active);
    //there are no active props
    //if TabLabel has a className prop
    } else if (className) {
      //use the className prop from TabLabel
      classes.push(className);
    } else if (context.tabs) {
      //use the tabs prop from context
      applyClassStyle(classes, styles, context.tabs);
    }
  //not active tab
  //if TabLabel has a className prop
  } else if (className) {
    //use the className prop from TabLabel
    classes.push(className);
  //if the context has a tabs prop
  } else if (context.tabs) {
    //use the tabs prop from context
    applyClassStyle(classes, styles, context.tabs);
  }
  // configure context provider
  const provider = { ...context, tabValue: value };
  //render
  return (
    <TabContext.Provider value={provider}>
      <div
        className={classes.join(' ')}
        style={style}
        onClick={() => value && context.onChange(value)}
        data-active={isActive ? 'true' : 'false'}
      >
        {children}
      </div>
    </TabContext.Provider>
  );
};

/**
 * Tab body component
 */
export function TabBody(props: TabBodyProps) {
  //props
  const {
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //class/style to apply to each content
    contents, //?: ClassStyleProp
    //tabs style
    style, //?: CSSProperties
  } = props;
  //hooks
  const context = useTabContext();
  //variables
  // configure classes
  const classes = [ 'frui-tabs-body' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    ...context, 
    contents: contents || context.contents
  };
  //render
  return (
    <TabContext.Provider value={provider}>
      <main className={classes.join(' ')} style={style}>
        {children}
      </main>
    </TabContext.Provider>
  );
};

/**
 * Tab content component
 */
export function TabContent(props: TabContentProps) {
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
  const context = useTabContext();
  //variables
  // configure classes and styles
  const classes = [ 'frui-tabs-content' ];
  const styles = { ...style };
  //if TabContent has a className prop
  if (className) {
    //use the className prop from TabContent
    classes.push(className);
  //if the context has a tabs prop
  } else if (context.contents) {
    //use the tabs prop from context
    applyClassStyle(classes, styles, context.contents);
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
export function Tabs(props: TabProps) {
  //props
  const { 
    //class/style to apply to active tab
    active, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //change value handler
    onChange, //: (value: string) => void
    //class/style to apply to each content
    contents, //?: ClassStyleProp
    //default active tab value
    defaultValue, //?: string
    //tabs style
    style, //?: CSSProperties
    //class/style to apply to each tab
    tabs, //?: ClassStyleProp
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
    active, 
    onChange: (value: string) => {
      change(value);
      onChange && onChange(value);
    },
    contents, 
    tabs,
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
    <TabContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {children}
      </div>
    </TabContext.Provider>
  );
};

//defaults to tab
export default Object.assign(
  Tabs, 
  {
    Head: TabHead,
    Label: TabLabel,
    Body: TabBody,
    Content: TabContent,
    Active: TabActive,
    Inactive: TabInactive
  }
);
