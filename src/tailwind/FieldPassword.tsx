//types
import type { FieldPasswordProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import usePassword from '../hooks/useFieldPassword';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from '../utils';

/**
 * Password Field Component (Main)
 */
const FieldPassword: React.FC<FieldPasswordProps> = (props) => {
  //remove type
  const { 
    error,
    styles = {},
    classNames = {},
    ...attributes 
  } = props;
  //hooks
  const { showing, toggle } = usePassword();
  //variables
  const map = {
    styles: makeGroupStyles(styles, {
      field: undefined,
      control: undefined,
      toggle: undefined,
      icon: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      field: 'flex',
      control: undefined,
      toggle: [
        'items-center',
        'bg-[#EEEEEE]',
        'border-y',
        'border-r',
        error ? 'border-[#DC3545]' :'border-black',
        'cursor-pointer',
        'flex',
        'justify-center',
        'px-4',
        'text-center',
        error ? 'text-[#DC3545]' :'text-[#666666]'
      ].filter(Boolean).join(' ').trim()
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
        {showing ? '*': 'A' }
      </span>
    </div>
  );
};

export default FieldPassword;