//types
import type { LoaderProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//helpers
import { makeClasses, makeStyles } from 'frui-core/dist/utils';

/**
 * Loader Component (Main)
 */
const Loader: React.FC<LoaderProps> = (props) => {
  const { show, color, label, style, className } = props;
  const map = {
    classes: makeClasses(className, [''].join(' ')),
    style: makeStyles(style, {
      alignItems: 'middle',
      animation: 'spin 1s linear infinite',
      borderColor: color || '#666666',
      borderRadius: '50%',
      borderStyle: 'solid',
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderTopWidth: '2px',
      display: 'inline-block',
      height: '20px',
      marginRight: '4px',
      width: '20px'
    })
  };
  return (
    <div className={show === false ? 'hidden': undefined}>
      <span className={map.classes} style={map.style} />
      {label}
    </div>
  );
};

export default Loader;