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
} from '../types.js';
import getClassStyles from '../helpers/getClassStyles.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type AccordionStates = { active: boolean };

export type AccordionContextProps = {
  //slot: class/style to apply to each content element
  content?: SlotStyleProp,
  //accordion item value
  itemValue?: string,
  //slot: class/style to apply to each label element
  label?: CallableSlotStyleProp<AccordionStates>,
  //change value handler
  onChange: (value: string) => void,
  //active accordion value
  value?: string
};

export type AccordionLabelProps = ExtendsType<
  HTMLElementProps<HTMLDivElement>, 
  CallableClassStyleProps<AccordionStates> 
    & CallableChildrenProps<AccordionStates>
>;

export type AccordionContentProps = HTMLElementProps<HTMLDivElement>;

export type AccordionBellowProps = ExtendsType<
  HTMLElementProps<HTMLDivElement>,
  CallableClassStyleProps<AccordionStates> 
    & { value?: string }
>;

export type AccordionProps = HTMLElementProps<HTMLDivElement> & {
  //slot: class/style to apply to each content element
  content?: SlotStyleProp,
  //default active accordion value
  defaultValue?: string,
  //slot: class/style to apply to each label element
  label?: CallableSlotStyleProp<AccordionStates>,
  //change value handler
  onChange?: (value: string) => void,
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
  const { className, style, children, ...attributes } = props;
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
    <div {...attributes} className={classes.join(' ')} style={style}>
      {children}
    </div>
  ) : null;
};

/**
 * Accordion inactive component
 */
export function AccordionInactive(props: AccordionContentProps) {
  //props
  const { className, style, children, ...attributes } = props;
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
    <div {...attributes} className={classes.join(' ')} style={style}>
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
    //children nodes
    children, //?: ReactNode
    //label class name
    className, //?: string
    //label style
    style, //?: CSSProperties
    ...attributes
  } = props;
  //hooks
  const context = useAccordionContext();
  //variables
  // extract context
  const { value, itemValue, label, onChange } = context;
  // determine active state
  const active = Boolean(itemValue && value === itemValue);
  // get slot styles
  const slot = label ? getSlotStyles(label, { active }) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 
      'frui-accordion-label', 
      ...(active ? ['frui-accordion-label-active'] : []) 
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
  //render
  return (
    <div
      {...attributes}
      className={classes.join(' ')}
      style={styles}
      onClick={() => itemValue && onChange(itemValue)}
      data-active={active ? 'true' : 'false'}
    >
      {typeof children === 'function' ? children({ active }) : children}
    </div>
  );
};

/**
 * Accordion content component
 */
export function AccordionContent(props: AccordionContentProps) {
  //props
  const { 
    //children nodes
    children, //?: ReactNode
    //content class name
    className, //?: string
    //content style
    style, //?: CSSProperties
    ...attributes
  } = props;
  //hooks
  const context = useAccordionContext();
  //variables
  // extract context
  const { value, itemValue, content } = context;
  // determine active state
  const active = itemValue && value === itemValue;
  // get slot styles
  const slot = content ? getSlotStyles(content, { active }) : {};
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 'frui-accordion-content' ],
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
  //render
  return itemValue && value === itemValue ? (
    <div {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </div>
  ) : null;
};

/**
 * Accordion bellow component
 */
export function AccordionBellow(props: AccordionBellowProps) {
  //props
  const { 
    value, 
    className, 
    style, 
    children,
    ...attributes
  } = props;
  //hooks
  const context = useAccordionContext();
  //variables
  // determine active state
  const active = Boolean(value && context.value === value);
  //get final classes and styles
  const { classes, styles } = getClassStyles({
    //default classes to apply
    classes: [ 'frui-accordion-bellow' ],
    //style props
    props: {
      //prefer direct props over slot props
      className: className,
      //prefer direct props over slot props
      style: style
    },
    //state to pass to callable props
    state: { active }
  });
  // configure context provider
  const provider = { ...context, itemValue: value };
  //render
  return (
    <AccordionContext.Provider value={provider}>
      <div {...attributes} className={classes.join(' ')} style={styles}>
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
    //children nodes
    children, //?: ReactNode
    //accordion class name
    className, //?: string
    //slot: class/style to apply to each content element
    content, //?: SlotStyleProp,
    //slot: class/style to apply to each label element
    label, //?: CallableSlotStyleProp<AccordionStates>,
    //change value handler
    onChange, //: (value: string) => void
    //default active accordion value
    defaultValue, //?: string
    //accordion style
    style, //?: CSSProperties
    //controlled value
    value, //?: string
    ...attributes
  } = props;
  //hooks
  const [ activeValue, change ] = useState<string|undefined>(defaultValue);
  //variables
  // configure classes
  const classes = [ 'frui-accordion' ];
  if (className) classes.push(className);
  // configure context provider
  const provider = { 
    content,
    label,
    onChange: (value: string) => {
      change(value);
      onChange && onChange(value);
    },
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
      <div {...attributes} className={classes.join(' ')} style={style}>
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
