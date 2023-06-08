//types
import type { FieldDateProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useDate from '../hooks/useFieldDate';
//helpers
import { makeStyles } from '../utils';

const padding = {
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
  paddingTop: '7px'
};

/**
 * Date Field Component
 */
const FieldDate: React.FC<FieldDateProps> = (props) => {
  const { defaultValue, style, onUpdate, ...attributes } = props;
  const map = makeStyles(style, padding) || {};
  const update = useDate({ onUpdate });
  return (
    <Input 
      type="date"
      defaultValue={defaultValue 
        ? new Date(defaultValue).toISOString().split('T')[0]
        : undefined
      }
      {...attributes}
      onUpdate={update}
      style={style !== false ? map: false}
    />
  );
};


export default FieldDate;