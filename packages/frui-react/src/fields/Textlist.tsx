//types
import type { TextlistType } from 'frui-core/dist/types/fields';
import type { FieldsProps, FieldsetProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//components
import Input from './Input';
import Button from '../Button';
import make from '../Fieldset';
//hooks
import useTextlists from 'frui-core/dist/hooks/useTextlist';
//helpers
import { makeGroupStyles, makeGroupClasses } from 'frui-core/dist/utils';

/**
 * Text Item Component 
 */
const Fields: React.FC<FieldsProps<TextlistType>> = (props) => {
  const { 
    data,
    values, 
    index, 
    error,
    errorColor,
    styles,
    classNames,
    set
  } = props;
  //variables
  const placeholder = data?.placeholder as string | undefined;

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
        marginLeft: '2px',
        paddingBottom: '4px',
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '2px'
      },
      value: {
        borderColor: error ? errorColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        color: error ? errorColor: 'black',
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
      value: undefined
    })
  };
  //handlers
  const { handlers } = useTextlists({ values, index, set });

  return (
    <div className={map.classNames.row} style={map.styles.row}>
      <Input 
        style={styles !== false ? map.styles.value : false}
        className={map.classNames.value}
        placeholder={placeholder}
        defaultValue={values ? values[index]: undefined}
        onUpdate={handlers.update}
        error={error}
        required 
      />
      <Button 
        outline
        danger
        onClick={handlers.remove}
        style={styles !== false ? map.styles.button: false}
        className={map.classNames.button}
      >
        &times;
      </Button>
    </div>
  );
};

const Fieldset = make<TextlistType>(Fields);

/**
 * Textlist set Component (Main)
 */
const Textlist: React.FC<FieldsetProps<TextlistType>> = (props) => {
  return (<Fieldset {...props} emptyValue={''} />);
}

export default Textlist;