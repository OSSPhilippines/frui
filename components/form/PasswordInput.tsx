//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
//frui
import type { ExtendsType, SlotStyleProp } from '../types.js';
import type { InputProps } from './Input.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import getClassStyles from '../helpers/getClassStyles.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type PasswordInputProps = ExtendsType<InputProps, {
  input?: SlotStyleProp,
  toggle?: SlotStyleProp,
  error?: boolean
}>;

//--------------------------------------------------------------------//
// Hooks

/**
 * Password Input Hook Aggregate
 */
export function usePasswordInput() {
  const [ showing, show ] = useState(false);
  const toggle = () => show(!showing);
  return { toggle, showing };
};

//--------------------------------------------------------------------//
// Components

/**
 * Password Input Component (Main)
 */
export function PasswordInput(props: PasswordInputProps) {
  //remove type
  const { 
    error, 
    className, 
    input, 
    style,
    toggle: toggler,
    ...attributes 
  } = props;
  //hooks
  const { showing, toggle } = usePasswordInput();

  //configure classes
  const classes = [ 'frui-form-input-password' ];
  className && classes.push(className);
  //get slot styles
  const slots = {
    input: input ? getSlotStyles(input, {}): {},
    toggle: toggler ? getSlotStyles(toggler, {}): {}
  };
  const styles = {
    input: getClassStyles({
      //default classes to apply
      classes: [ 'frui-form-input-password-control' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.input.className,
        //prefer direct props over slot props
        style: slots.input.style
      },
      //state to pass to callable props
      state: {}
    }),
    toggle: getClassStyles({
      //default classes to apply
      classes: [ 'frui-form-input-password-toggle' ],
      //style props
      props: {
        //prefer direct props over slot props
        className: slots.toggle.className,
        //prefer direct props over slot props
        style: slots.toggle.style
      },
      //state to pass to callable props
      state: {}
    })
  };

  return (
    <div className={classes.join(' ')} style={style}>
      <Input 
        {...attributes} 
        error={error} 
        type={showing ? 'text': 'password'} 
        className={styles.input.classes.join(' ')}
        style={styles.input.styles}
      />
      <span 
        className={styles.toggle.classes.join(' ')} 
        onClick={toggle}
        style={styles.toggle.styles}
      >
        {showing ? '✷': 'A' }
      </span>
    </div>
  );
};

//defaults to password input
export default Object.assign(PasswordInput, { usePasswordInput, use: usePasswordInput });