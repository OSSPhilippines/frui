//types
import type { FieldPasswordProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import usePassword from '../hooks/useFieldPassword';
//helpers
import { makeGroupStyles, makeGroupClasses } from '../utils';

/**
 * Password Field Component (Main)
 */
const FieldPassword: React.FC<FieldPasswordProps> = (props) => {
  //remove type
  const { 
    error,
    errorColor,
    styles = {},
    classNames = {},
    ...attributes 
  } = props;
  //hooks
  const { showing, toggle } = usePassword();
  //variables
  const map = {
    styles: makeGroupStyles(styles, {
      field: { display: 'flex' },
      control: undefined,
      toggle: {
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        borderColor: error ? errorColor : 'black',
        borderStyle: 'solid',
        borderLeft: 0,
        borderBottomWidth: '1px',
        borderRightWidth: '1px',
        borderTopWidth: '1px',
        color: error ? errorColor : '#666666',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        textAlign: 'center'
      }
    }),
    classNames: makeGroupClasses(classNames, {
      field: undefined,
      control: undefined,
      toggle: undefined
    })
  };

  return (
    <div style={map.styles.field} className={map.classNames.field}>
      <Input 
        {...attributes} 
        error={error} 
        type={showing ? 'text': 'password'} 
        style={map.styles.control} 
        className={map.classNames.control}
      />
      <span 
        style={map.styles.toggle} 
        className={map.classNames.toggle} 
        onClick={toggle}
      >
        {showing ? '✷': 'A' }
      </span>
    </div>
  );
};

export default FieldPassword;