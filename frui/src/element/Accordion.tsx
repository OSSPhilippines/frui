import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  HTMLAttributes,
  CSSProperties,
  ButtonHTMLAttributes,
  useId,
} from 'react';

interface AccordionContextProps {
  isOpen: boolean;
  detailsId: string;
  summaryId: string;
  disabled: boolean;
  toggle: (event: React.SyntheticEvent) => void;
}

export type AccordionProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  children: ReactNode;
  id?: string; // Optional ID - will be generated if missing
  expanded?: boolean; // Controlled state
  defaultExpanded?: boolean; // Uncontrolled state
  disabled?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  className?: string;
  style?: CSSProperties;
};

export type AccordionSummaryProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  children: ReactNode;
  expandIcon?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type AccordionDetailsProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const AccordionContext = createContext<AccordionContextProps | undefined>(undefined);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};


/**
 * Accordion Component
 */
export function Accordion({
  children,
  id: providedId,
  expanded: controlledExpanded,
  defaultExpanded = false,
  disabled = false,
  onChange,
  className,
  style,
  ...attributes
}: AccordionProps) {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
  const generatedId = useId(); // Generate a unique ID if none is provided
  const id = providedId || generatedId; // Use provided ID or generated one

  const isControlled = controlledExpanded !== undefined;
  const isOpen = isControlled ? controlledExpanded : uncontrolledExpanded;

  const summaryId = `${id}-summary`;
  const detailsId = `${id}-details`;

  const toggle = useCallback((event: React.SyntheticEvent) => {
    if (disabled) return;
    const newState = !isOpen;
    if (!isControlled) {
      setUncontrolledExpanded(newState);
    }
    onChange?.(event, newState);
  }, [isControlled, isOpen, onChange, disabled]);

  const contextValue = useMemo(() => ({
    isOpen,
    detailsId,
    summaryId,
    disabled,
    toggle,
  }), [isOpen, detailsId, summaryId, disabled, toggle]);

  const accordionClassName = `frui-accordion ${disabled ? 'frui-accordion-disabled' : ''} ${isOpen ? 'frui-accordion-open' : ''} ${className || ''}`;

  return (
    <AccordionContext.Provider value={contextValue}>
       <div className={accordionClassName} style={style} {...attributes}>
        {children}
       </div>
    </AccordionContext.Provider>
  );
}

/**
 * Accordion Summary Component
 */
export function AccordionSummary({
  children,
  expandIcon,
  className,
  style,
  ...attributes
}: AccordionSummaryProps) {
  const { isOpen, detailsId, summaryId, disabled, toggle } = useAccordionContext();
  const summaryClassName = `frui-accordion-button ${disabled ? 'frui-accordion-button-disabled' : ''} ${className || ''}`;
  const iconClassName = `frui-accordion-icon ${isOpen ? 'frui-accordion-icon-rotate' : ''}`;

  return (
    <button
      id={summaryId}
      className={summaryClassName}
      style={style}
      onClick={toggle}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-controls={detailsId}
      type="button"
      {...attributes}
    >
      {children}
      {expandIcon && <span className={iconClassName} aria-hidden="true">{expandIcon}</span>}
    </button>
  );
}

/**
 * Accordion Details Component
 */
export function AccordionDetails({
  children,
  className,
  style,
  ...attributes
}: AccordionDetailsProps) {
  const { isOpen, detailsId, summaryId } = useAccordionContext();
  const detailsClassName = `frui-accordion-content ${isOpen ? 'frui-accordion-content-open' : ''} ${className || ''}`;

  return (
    <div
      id={detailsId}
      className={detailsClassName}
      style={style}
      role="region"
      aria-labelledby={summaryId}
      {...attributes}
    >
      {children}
    </div>
  );
}