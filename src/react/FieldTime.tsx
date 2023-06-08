//types
import type { FieldTimeProps } from '../types';
//react
import React from 'react';
//components
import Input from './FieldInput';
//hooks
import useTime from '../hooks/useFieldTime';
//helpers
import { makeStyles } from '../utils';

const padding = {
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
  paddingTop: '7px'
};

/**
 * Time Field Component
 */
const FieldTime: React.FC<FieldTimeProps> = (props) => {
  const { defaultValue, style, ...attributes } = props;
  const map = makeStyles(style, padding) || {};
  const value = useTime({ defaultValue });
  return (
    <Input 
      type="time"
      defaultValue={value}
      {...attributes}
      style={style !== false ? map: false}
    />
  );
};

export default FieldTime;