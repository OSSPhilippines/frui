//types
import type { DateProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//components
import Input from './Input';
//hooks
import useDate from 'frui-core/dist/hooks/useDate';
//helpers
import { makeStyles } from 'frui-core/dist/utils';

const padding = {
  paddingBottom: '7px',
  paddingLeft: '7px',
  paddingRight: '7px',
  paddingTop: '7px'
};

/**
 * Date  Component
 */
const DateField: React.FC<DateProps> = (props) => {
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


export default DateField;