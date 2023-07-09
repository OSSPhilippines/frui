//types
import type { ControlProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//helpers
import { makeGroupStyles, makeGroupClasses } from 'frui-core/dist/utils';

/**
 * Form Control Component (Main)
 */
const Control: React.FC<ControlProps> = (props) => {
  //separate component related props from field attributes
  const {   
    label, 
    error, 
    style,
    className,
    styles = {},
    classNames = {},
    children
  } = props;

  const map = {
    styles: makeGroupStyles(styles, {
      container: style,
      label: undefined,
      field: undefined,
      error: undefined
    }),
    classNames: makeGroupClasses(classNames, {
      container: [
        className,
        error?.length ? 'text-[#DC3545]' : undefined
      ].filter(Boolean).join(' ').trim(),
      label: 'block',
      field: undefined,
      error: undefined
    })
  };

  return (
    <div style={map.styles.container} className={map.classNames.container}>
      {!!label && (
        <label style={map.styles.label} className={map.classNames.label}>
          {label}
        </label>
      )}
      <div style={map.styles.field} className={map.classNames.field}>
        {children}
      </div>
      {!!error && error?.length > 0 && (
        <div className={map.classNames.error} style={map.styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Control;