//types
import type { MetadataType } from 'frui-core/dist/types/fields';
import type { FieldsProps, FieldsetProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//components
import Button from '../Button';
import make from '../Fieldset';
import Input from './Input';
import Number from './Number';
import Date from './Date';
import Datetime from './Datetime';
import Time from './Time';
//hooks
import useMetadata from 'frui-core/dist/hooks/useMetadata';
//helpers
import { makeGroupStyles, makeGroupClasses } from 'frui-core/dist/utils';

/**
 * Key/Value Component 
 */
const Fields: React.FC<FieldsProps<MetadataType>> = (props) => {
  const {
    data = {},
    values, 
    index, 
    error,
    errorColor,
    styles,
    classNames,
    set
  } = props;
  //props
  const { type, min, max, step, placeholder } = data;
  //hooks
  const { handlers, input } = useMetadata({ 
    type,
    values, 
    index, 
    set 
  });
  //variables
  const value = values ? values[index]: undefined;
  const map = {
    styles: makeGroupStyles(styles, {
      row: {
        display: 'flex',
        marginBottom: '4px'
      },
      button: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '4px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '2px'
      },
      name: {
        borderColor: error ? errorColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: error ? errorColor: 'black',
        flexBasis: '30%',
        marginRight: '4px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '8px',
        width: '100%'
      },
      value: {
        borderColor: error ? errorColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: error ? errorColor: 'black',
        flexBasis: '70%',
        marginRight: '4px',
        paddingBottom: '8px',
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '8px',
        width: '100%'
      }
    }),
    classNames: makeGroupClasses(classNames, {
      row: undefined,
      button: undefined,
      name: undefined,
      value: undefined
    })
  };
  
  //render
  return (
    <div className={map.classNames.row} style={map.styles.row}>
      <Input 
        style={map.styles.name}
        className={map.classNames.name}
        placeholder={Array.isArray(placeholder) ? placeholder[0]: undefined}
        defaultValue={Array.isArray(value) ? value[0]: undefined}
        onUpdate={name => handlers.update('name', name)}
        error={error}
        required 
      />
      {input.isText && (
        <Input 
          type={type}
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1] as string|number: undefined}
          onUpdate={value => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isNumber && (
        <Number
          min={min}
          max={max}
          step={step}
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1] as string|number: undefined}
          onUpdate={(value: string) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'date' && (
        <Date 
          type="date"
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={value => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && type === 'time' && (
        <Time 
          type="time"
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={(value: string) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      {input.isDate && (type === 'datetime' || type === 'datetime-local') && (
        <Datetime 
          type="datetime-local"
          style={map.styles.value}
          className={map.classNames.value}
          placeholder={Array.isArray(placeholder) ? placeholder[1]: undefined}
          defaultValue={Array.isArray(value) ? value[1]: undefined}
          onUpdate={(value) => handlers.update('value', value)}
          error={error}
          required 
        />
      )}
      <Button 
        outline
        danger
        onClick={handlers.remove}
        style={map.styles.button}
        className={map.classNames.button}
      >
        &times;
      </Button>
    </div>
  );
};

const Fieldset = make<MetadataType>(Fields);

/**
 * Metadata set Component (Main)
 */
const Metadata: React.FC<FieldsetProps<MetadataType>> = (props) => {
  return (<Fieldset {...props} emptyValue={['', '']} />);
}

export default Metadata;