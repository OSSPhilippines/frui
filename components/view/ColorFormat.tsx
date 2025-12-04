//--------------------------------------------------------------------//
// Imports

//types
import type { CSSProperties } from 'react';

//--------------------------------------------------------------------//
// Types

export type ColorFormatProps = { 
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
 * ColorFormat Component (Main)
 */
export function ColorFormat(props: ColorFormatProps) {
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
    const classNames = ['frui-format-color'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        <span className="frui-format-color-box" style={boxStyles} />
        <span className="frui-format-color-text">
          {value}
        </span>
      </span>
    );
  } else if (box) {
    const classNames = ['frui-format-color-box'];
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
  const classNames = ['frui-format-color-text'];
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
export default ColorFormat;