//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type ColorProps = { 
  value: string, 
  box?: boolean, 
  text?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  className?: string, 
  style?: CSSProperties
};

//--------------------------------------------------------------------//
// Components

/**
 * Color Component (Main)
 */
export function Color(props: ColorProps) {
  const { 
    value, 
    box = true, 
    text = true,
    sm,
    md,
    lg,
    className, 
    style = {}
  } = props;
  const size = sm ? '8px': md ? '12px' : lg ? '16px' : '12px';
  const boxStyles = {
    backgroundColor: value, 
    height: size, 
    width: size
  };
  if (box && text) {
    const classNames = [ 'frui-view-color' ];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        <span className="frui-view-color-box" style={boxStyles} />
        <span className="frui-view-color-text">
          {value}
        </span>
      </span>
    );
  } else if (box) {
    const classNames = ['frui-view-color-box'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span 
        className={classNames.join(' ')} 
        style={{ ...style, ...boxStyles}} 
      />
    );
  }
  //text
  const classNames = ['frui-view-color-text'];
  if (className) {
    classNames.push(className);
  }
  return (
    <span className={classNames.join(' ')} style={style}>
      {value}
    </span>
  );
};

//defaults to color format
export default Color;