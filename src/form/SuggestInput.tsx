//--------------------------------------------------------------------//
// Imports

//frui
import type { 
  SlotStyleProp, 
  CallableSlotStyleProp 
} from '../types.js';
import type { 
  DropdownOptionProp,
  DropdownStates, 
  DropdownConfig 
} from '../base/Dropdown.js';
import type { InputProps } from './Input.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import Dropdown from '../base/Dropdown.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type SuggestInputControlConfig = {
  //number of characters to trigger suggestions
  chars?: number,
  //called whenever user types
  onQuery?: (query: string) => void
};

export type SuggestInputControlProps = SuggestInputControlConfig & InputProps;

export type SuggestInputProps = Omit<InputProps 
  & DropdownConfig
  & { 
    //number of characters to trigger suggestions
    chars?: number,
    //slot: style to apply to the select control
    control?: SlotStyleProp,
    //slot: style to apply to the select drop down
    dropdown?: SlotStyleProp,
    //called whenever user types
    onQuery?: (query: string) => void,
    //slot: style to apply to the select control
    option?: CallableSlotStyleProp<DropdownStates>,
    //serialized list of options as array or object
    options?: DropdownOptionProp
  }, 
  'multiple'
>;

//--------------------------------------------------------------------//
// Hooks

/**
 * SuggestInput Hook Aggregate
 */
export function useSuggestInputControl(config: SuggestInputControlConfig) {
  const {} = config;
};

//--------------------------------------------------------------------//
// Components

/**
 * Suggest input control component
 */
export function SuggestInputControl(props: SuggestInputControlProps) {
  //props
  const { 
    //number of characters to trigger suggestions
    chars,
    //custom class name
    className,
    //name used by forms
    name, //?: string
    //position of the dropdown
    //called whenever user types
    onQuery, //?: (query: string) => void
    //custom inline styles
    style,
    ...inputProps
  } = props;
  //variables
  // determine classes
  const classes = [ 'frui-form-suggest-input-control' ];
  className && classes.push(className);
  //hooks
  const { open, select, selected } = Dropdown.useContext();
  //handlers
  const handlers = {
    query(value: string) {
      if (typeof value === 'string') {
        select(value, false);
        if (!chars || value.length >= chars) {
          open(true);
          onQuery && onQuery(value);
        } else if (chars && value.length < chars) {
          open(false);
        }
      }
    },
    hide() {
      setTimeout(() => open(false));
    }
  };
  //render
  return (
    <Input
      {...inputProps}
      className={classes.join(' ')}
      style={style}
      name={name}
      value={selected[0] || ''}
      onUpdate={handlers.query}
      onBlur={handlers.hide}
    />
  );
};

/**
 * SuggestInput Component (Main)
 */
export function SuggestInput(props: SuggestInputProps) {
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
    //slot: style to apply to the select control
    control, //: SlotStyleProp
    //slot: style to apply to the select drop down
    dropdown, //: SlotStyleProp
    //whether the select is in an error state
    error, //?: boolean
    //position of the dropdown
    left, //?: boolean
    //dropdown handler
    onDropdown, //?: (show: boolean) => void
    //update handler
    onUpdate, //?: (value: string) => void
    //slot: style to apply to the select control
    option, //: CallableSlotStyleProp<SelectStates>
    //serialized list of options as array or object
    options, //: SelectOption[]|Record<string, string>
    //position of the dropdown
    right, //?: boolean
    //custom inline styles
    style,
    //position of the dropdown
    top, //?: boolean
    //controlled select value
    value, //?: T
    ...inputProps
  } = props;
  //variables
  // determine classes
  const classes = [ 'frui-form-suggest-input' ];
  className && classes.push(className);
  if (error) {
    classes.push('frui-form-suggest-input-error');
  }
  // get slot styles
  const controlStyles = control ? getSlotStyles(control, {}) : {};
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
      onDropdown={onDropdown}
      onUpdate={onUpdate}
      option={option}
      options={options}
      right={right}
      top={top}
      value={value}
    >
      <Dropdown.Control>
        <SuggestInputControl 
          {...inputProps}
          className={controlStyles.className} 
          style={controlStyles.style}
        />
      </Dropdown.Control>
      {children}
    </Dropdown>
  );
};

//defaults to suggest input
export default Object.assign(SuggestInput, {
  getAbsolutePosition: Dropdown.getAbsolutePosition,
  getComponents: Dropdown.getComponents,
  getControl: Dropdown.getControl,
  getFooter: Dropdown.getFooter,
  getHeader: Dropdown.getHeader,
  getOptions: Dropdown.getOptions,
  getRelativePosition: Dropdown.getRelativePosition,
  makeOptions: Dropdown.makeOptions,
  buildOptions: Dropdown.buildOptions,
  useDropdown: Dropdown.useDropdown,
  useDropdownContext: Dropdown.useDropdownContext,
  use: Dropdown.useDropdown,
  useContext: Dropdown.useDropdownContext,
  useSelect: Dropdown.useDropdown,
  Context: Dropdown.Context,
  Control: SuggestInputControl,
  Option: Dropdown.Option,
  Head: Dropdown.Head,
  Foot: Dropdown.Foot
});