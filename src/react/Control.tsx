//types
import type { ControlProps } from '../types';
//react
import React from 'react';
//helpers
import { makeGroupStyles, makeGroupClasses } from '../utils';

/**
 * Form Control Component (Main)
 */
const Control: React.FC<ControlProps> = (props) => {
  //separate component related props from field attributes
  const {   
    label, 
    error, 
    errorColor = '#DC3545',
    style,
    className,
    styles = {},
    classNames = {},
    children
  } = props;

  const map = {
    styles: makeGroupStyles(styles, {
      container: Object.assign({
        color: error?.length ? errorColor: undefined,
      }, style || {}),
      label: { display: 'block' },
      field: undefined,
      error: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      container: className,
      label: undefined,
      field: undefined,
      error: undefined
    })
  };

  return (
    <div style={map.styles.container} className={map.classNames.container}>
      {label && (
        <label style={map.styles.label} className={map.classNames.label}>
          {label}
        </label>
      )}
      <div style={map.styles.field} className={map.classNames.field}>
        {children}
      </div>
      {error?.length && (
        <div className={map.classNames.error} style={map.styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Control;