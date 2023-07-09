//types
import type { DatetimeProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useDatetime from 'frui-core/dist/hooks/useDatetime';
//helpers
import { makeStyles } from 'frui-core/dist/utils';

const padding = {
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
  paddingTop: '7px'
};

/**
 * Datetime  Component
 */
const Datetime: React.FC<DatetimeProps> = (props) => {
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

export default Datetime;