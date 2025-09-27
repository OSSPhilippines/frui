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

export type AccordionContextProps = {
  //class/style to apply to active label
  activeClassStyle?: ClassStyleProp,
  //class/style to apply to each content
  contentClassStyle?: ClassStyleProp,
  //accordion item value
  itemValue?: string,
  //change value handler
  onChange: (value: string) => void,
  //class/style to apply to each label
  labelClassStyle?: ClassStyleProp,
  //active accordion value
  value?: string
};

export type AccordionLabelProps = HTMLProps & ChildrenProps & {
  //class/style to apply if active
  activeClassStyle?: ClassStyleProp
};

export type AccordionContentProps = HTMLProps & ChildrenProps;

export type AccordionBellowProps = HTMLProps & ChildrenProps & {
  value?: string
};

export type AccordionProps = HTMLProps & ChildrenProps & {
  //class/style to apply to active label
  activeClassStyle?: ClassStyleProp,
  //class/style to apply to each content
  contentClassStyle?: ClassStyleProp,
  //default active accordion value
  defaultValue?: string,
  //change value handler
  onChange?: (value: string) => void,
  //class/style to apply to each label
  labelClassStyle?: ClassStyleProp,
  //controlled value
  value?: string
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Accordion context hook
 */
export function useAccordionContext() {
  return useContext(AccordionContext);
};

//--------------------------------------------------------------------//
// Components

/**
 * Accordion context
 */
export const AccordionContext = createContext<AccordionContextProps>({
  onChange: () => {}
});

/**
 * Accordion active component
 */
export function AccordionActive(props: AccordionContentProps) {
  //props
  const { className, style, children } = props;
  //hooks
  const { value, itemValue } = useAccordionContext();
  //variables
  // configure classes
  const classes = [ 'frui-accordion-active' ];
  if (className) {
    classes.push(className);
  }
  //render
  return itemValue && value === itemValue ? (
    <div className={classes.join(' ')} style={style}>
      {children}
    </div>
  ) : null;
};

/**
 * Accordion inactive component
 */
export function AccordionInactive(props: AccordionContentProps) {
  //props
  const { className, style, children } = props;
  //hooks
  const { value, itemValue } = useAccordionContext();
  //variables
  // configure classes
  const classes = [ 'frui-accordion-inactive' ];
  if (className) {
    classes.push(className);
  }
  //render
  return !itemValue || value !== itemValue ? (
    <div className={classes.join(' ')} style={style}>
      {children}
    </div>
  ) : null;
};

/**
 * Accordion label component
 */
export function AccordionLabel(props: AccordionLabelProps) {
  //props
  const {
    //class/style to apply if active
    activeClassStyle, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //tabs class name
    className, //?: string
    //tabs style
    style //?: CSSProperties
  } = props;
  //hooks
  const context = useAccordionContext();
  const { value, itemValue, labelClassStyle, onChange } = context;
  //variables
  const isActive = itemValue && value === itemValue;
  // configure classes and styles
  const classes = [ 'frui-accordion-label' ];
  const styles = { ...style };
  // if active tab
  if (isActive) {
    //add active class
    classes.push('frui-tabs-label-active');
    //if AccordionLabel has an active prop
    if (activeClassStyle) {
      //use the active prop from AccordionLabel
      applyClassStyle(classes, styles, activeClassStyle);
    //if the context has an active prop
    } else if (context.activeClassStyle) {
      //use the active prop from context
      applyClassStyle(classes, styles, context.activeClassStyle);
    //there are no active props
    //if AccordionLabel has a className prop
    } else if (className) {
      //use the className prop from AccordionLabel
      classes.push(className);
    } else if (labelClassStyle) {
      //use the labels prop from context
      applyClassStyle(classes, styles, labelClassStyle);
    }
  //not active tab
  //if AccordionLabel has a className prop
  } else if (className) {
    //use the className prop from AccordionLabel
    classes.push(className);
  //if the context has a labels prop
  } else if (labelClassStyle) {
    //use the labels prop from context
    applyClassStyle(classes, styles, labelClassStyle);
  }
  //render
  return (
    <div
      className={classes.join(' ')}
      style={style}
      onClick={
        () => itemValue && onChange(itemValue)
      }
      data-active={isActive ? 'true' : 'false'}
    >
      {children}
    </div>
  );
};

/**
 * Accordion content component
 */
export function AccordionContent(props: AccordionContentProps) {
  //props
  const { className, style, children } = props;
  //hooks
  const { value, contentClassStyle, itemValue } = useAccordionContext();
  //variables
  // configure classes and styles
  const classes = [ 'frui-accordion-content' ];
  const styles = { ...style };
  if (className) {
    classes.push(className);
  } else if (contentClassStyle) {
    applyClassStyle(classes, styles, contentClassStyle);
  }
  //render
  return itemValue && value === itemValue ? (
    <div className={classes.join(' ')} style={styles}>
      {children}
    </div>
  ) : null;
};

/**
 * Accordion bellow component
 */
export function AccordionBellow(props: AccordionBellowProps) {
  //props
  const { value, className, style, children } = props;
  //hooks
  const context = useAccordionContext();
  //variables
  // configure classes
  const classes = [ 'frui-accordion-bellow' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { ...context, itemValue: value };
  //render
  return (
    <AccordionContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

/**
 * Accordion component (main)
 */
export function Accordion(props: AccordionProps) {
  //props
  const { 
    //class/style to apply to active label
    activeClassStyle, //?: ClassStyleProp
    //children nodes
    children, //?: ReactNode
    //accordion class name
    className, //?: string
    //change value handler
    onChange, //: (value: string) => void
    //class/style to apply to each content
    contentClassStyle, //?: ClassStyleProp
    //default active accordion value
    defaultValue, //?: string
    //accordion style
    style, //?: CSSProperties
    //class/style to apply to each labels
    labelClassStyle, //?: ClassStyleProp
    //controlled value
    value //?: string
  } = props;
  //hooks
  const [ activeValue, change ] = useState<string|undefined>(defaultValue);
  //variables
  // configure classes
  const classes = [ 'frui-accordion' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    activeClassStyle, 
    onChange: (value: string) => {
      change(value);
      onChange && onChange(value);
    },
    contentClassStyle, 
    labelClassStyle,
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
    <AccordionContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

//defaults to accordion
export default Object.assign(
  Accordion, 
  {
    Bellow: AccordionBellow,
    Item: AccordionBellow,
    Label: AccordionLabel,
    Content: AccordionContent,
    Active: AccordionActive,
    Inactive: AccordionInactive,
    Context: AccordionContext,
    useContext: useAccordionContext
  }
);
