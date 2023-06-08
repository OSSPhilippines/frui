//types
import type { FieldDatetimeProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useDatetime from '../hooks/useFieldDatetime';
//helpers
import { makeStyles } from '../utils';

const padding = {
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
  paddingTop: '7px'
};

/**
 * Datetime Field Component
 */
const FieldDatetime: React.FC<FieldDatetimeProps> = (props) => {
  const { defaultValue, style, onUpdate, ...attributes } = props;
  const map = makeStyles(style, padding) || {};
  const { value, update } = useDatetime({ defaultValue, onUpdate });
  return (
    <Input 
      type="datetime-local"
      defaultValue={value}
      {...attributes}
      onUpdate={update}
      style={style !== false ? map: false}
    />
  );
};

export default FieldDatetime;