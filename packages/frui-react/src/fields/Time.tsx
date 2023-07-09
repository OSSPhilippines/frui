//types
import type { TimeProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useTime from 'frui-core/dist/hooks/useTime';
//helpers
import { makeStyles } from 'frui-core/dist/utils';

const padding = {
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
  paddingTop: '7px'
};

/**
 * Time  Component
 */
const Time: React.FC<TimeProps> = (props) => {
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

export default Time;