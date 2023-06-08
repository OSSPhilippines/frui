//types
import type { LoaderProps } from '../types';
//react
import React from 'react';
//helpers
import { makeClasses, makeStyles } from '../utils';

/**
 * Loader Component (Main)
 */
const Loader: React.FC<LoaderProps> = (props) => {
  const { show, color, label, style, className } = props;
  const map = {
    classes: makeClasses(className, [
      'align-middle',
      'border-solid',
      'border-y-2',
      'border-l-2',
      'animate-spin',
      'inline-block',
      'rounded-full',
      'w-5 h-5 mr-2'
    ].join(' ')),
    style: makeStyles(style, {
      borderColor: color
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