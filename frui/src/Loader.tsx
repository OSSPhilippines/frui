//types
import type { LoaderProps } from './types/components';
//react
import React from 'react';

/**
 * Loader Component (Main)
 */
const Loader: React.FC<LoaderProps> = (props) => {
  const { show, color, label, style = {}, className } = props;
  style.borderColor = color || '#666666';
  const container: Record<string, string> = {};
  if (show === false) {
    container.display = 'none';
  }
  const classNames = ['loader'];
  if (className) {
    classNames.push(className);
  }
  return (
    <div style={container}>
      <span className={classNames.join(' ')} style={style} />
      {label}
    </div>
  );
};

export default Loader;