//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode } from 'react';
//frui
import type { 
  CallableSlotStyleProp,
  ClassStyleProps, 
  ChildrenProps,
  SlotStyleProp
} from '../types.js';
import type {
  DropdownStates,
  DropdownConfig
} from '../Dropdown.js';
import Dropdown from '../Dropdown.js';
import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

export type SelectData = { label?: string, value: string };

export type SelectPlaceholderProps = ClassStyleProps & ChildrenProps;

export type SelectControlProps = ClassStyleProps & ChildrenProps & {
  //position of the dropdown
  bottom?: boolean,
  //position of the dropdown
  left?: boolean,
  //name used by forms
  name?: string,
  //serialized list of options as array or object
  options?: SelectData[]|Record<string, string>,
  //placeholder text when no option is selected
  placeholder?: string,
  //position of the dropdown
  right?: boolean,
  //position of the dropdown
  top?: boolean
};

export type SelectProps = ClassStyleProps & ChildrenProps & DropdownConfig & {
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
  option?: CallableSlotStyleProp<DropdownStates>,
  //serialized list of options as array or object
  options?: SelectData[]|Record<string, string>,
  //placeholder text when no option is selected
  placeholder?: string
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Extracts nodes from children, data, and selected values
 */
export function getComponents(
  children?: ReactNode,
  data?: SelectData[] | Record<string, string>,
  selected: string[] = [],
  multiple?: boolean
) {
  const nodes = Dropdown.getComponents(children, data, selected, multiple);
  const placeholder = getPlaceholder(children);
  return { ...nodes, placeholder };
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

//--------------------------------------------------------------------//
// Components

/**
 * Styled Select Placeholder Component
 */
export function SelectPlaceholder(props: SelectPlaceholderProps) {
  //props
  const { children, className, style } = props;
  //hooks
  const { open, opened } = Dropdown.useContext();
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
 * Styled Select Control Component
 */
export function SelectControl(props: SelectControlProps) {
  //props
  const { 
    //position of the dropdown
    bottom, //?: boolean
    //children (options)
    children,
    //custom class name
    className,
    //position of the dropdown
    left, //?: boolean
    //name used by forms
    name, //?: string
    //serialized list of options as array or object
    options, //: SelectOption[]|Record<string, string>
    //placeholder text when no option is selected
    placeholder, //?: string
    //position of the dropdown
    right, //?: boolean
    //custom inline styles
    style,
    //position of the dropdown
    top //?: boolean
  } = props;
  //hooks
  const {
    multiple,
    open, 
    opened, 
    clear, 
    selected,
    options: optionsCount
  } = Dropdown.useContext();
  //variables
  // determine classes
  const classes = [ 'frui-form-select-control' ];
  className && classes.push(className);
  // determine styles
  const styles = { ...style };
  // determine direction symbol
  const direction = top ? '▲' 
    : bottom ? '▼' 
    : left ? '◀' 
    : right ? '▶' 
    : '▼';
  // get selected options
  const components = Dropdown.buildOptions(
    children,
    options,
    selected,
    multiple
  );
  // determine label
  const label = getPlaceholder(children, placeholder);
  //handlers
  const toggle = () => open(!opened);
  //render
  return (
    <div className={classes.join(' ')} style={styles}>
      <div className="frui-form-select-control-selected">
        {components.selected.length > 0  ? components.selected : label}
      </div>
      <div className="frui-form-select-control-actions">
        {selected.length > 0 && (
          <span 
            className="frui-form-select-control-actions-clear"
            onClick={clear}
          >&times;</span>
        )}
        {optionsCount > 0 && (
          <span 
            className="frui-form-select-control-actions-toggle"
            onClick={toggle}
          >
            {direction}
          </span>
        )}
      </div>
      {/* Hidden values (for form submission) */}
      {!!name && selected.map((selected, i) => typeof selected !== 'undefined' 
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
  );
};

/**
 * Styled Select Component (Main)
 */
export function Select(props: SelectProps) {
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
  //variables
  // determine classes
  const classes = [ 'frui-form-select' ];
  className && classes.push(className);
  if (error) {
    classes.push('frui-form-select-error');
  }
  // get slot styles
  const displayStyles = display ? getSlotStyles(display, {}) : {};
  const dropdownStyles = dropdown ? getSlotStyles(dropdown, {}) : {};
  //render
  return (
    <Dropdown
      {...dropdownStyles}
      append={append}
      bottom={bottom}
      defaultValue={defaultValue}
      container={{ className: classes.join(' '), style }}
      left={left}
      multiple={multiple}
      onDropdown={onDropdown}
      onUpdate={onUpdate}
      option={option}
      options={options}
      right={right}
      top={top}
      value={value}
    >
      <Dropdown.Control>
        <SelectControl 
          className={displayStyles.className} 
          style={displayStyles.style}
          bottom={bottom}
          left={left}
          name={name}
          options={options}
          placeholder={placeholder}
          right={right}
          top={top}
        >
          {children}
        </SelectControl>
      </Dropdown.Control>
      {children}
    </Dropdown>
  );
};

//defaults to select
export default Object.assign(Select, {
  Context: Dropdown.Context,
  Control: SelectControl,
  Option: Dropdown.Option,
  Head: Dropdown.Head,
  Foot: Dropdown.Foot,
  Placeholder: SelectPlaceholder,
  getComponents,
  getPlaceholder
});
