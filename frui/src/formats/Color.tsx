//types
import type { CSSProperties } from 'react';

/**
 * Color Props
 */
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


/**
 * Color Format Component (Main)
 */
export default function Color(props: ColorProps) {
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
    const classNames = ['format-color'];
    if (className) {
      classNames.push(className);
    }
    return (
      <span className={classNames.join(' ')} style={style}>
        <span className="format-color-box" style={boxStyles} />
        <span className="format-color-text">
          {value}
        </span>
      </span>
    );
  } else if (box) {
    const classNames = ['format-color-box'];
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
  const classNames = ['format-color-text'];
  if (className) {
    classNames.push(className);
  }
  return (
    <span className={classNames.join(' ')} style={style}>
      {value}
    </span>
  );
};