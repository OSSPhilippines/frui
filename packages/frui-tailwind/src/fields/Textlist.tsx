//types
import type { TextlistType } from 'frui-core/dist/types/fields';
import type { 
  FieldsProps, 
  FieldsetProps
} from 'frui-core/dist/types/components';
//react
import React from 'react';
//components
import Input from './Input';
import Button from '../Button';
import make from '../Fieldset';
//hooks
import useTextlists from 'frui-core/dist/hooks/useTextlist';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from 'frui-core/dist/utils';

/**
 * Fields Component 
 */
const Fields: React.FC<FieldsProps<TextlistType>> = (props) => {
  const { 
    data,
    values, 
    index, 
    error,
    styles,
    classNames,
    set
  } = props;

  const placeholder = data?.placeholder as string | undefined;

  //variables
  const map = {
    styles: makeGroupStyles(styles, {
      row: undefined,
      button: undefined,
      value: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      row: [
        'flex',
        'mb-0.5'
      ].filter(Boolean).join(' '),
      button: [
        'items-center',
        'flex',
        'justify-center',
        'ml-0.5'
      ].filter(Boolean).join(' '),
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
 * Textlist Component (Main)
 */
const Textlist: React.FC<FieldsetProps<TextlistType>> = (props) => {
  return (<Fieldset {...props} emptyValue={''} />);
}

export default Textlist;