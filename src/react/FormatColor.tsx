//types
import type { FormatColorProps } from '../types';
//react
import React from 'react';
//helpers
import { makeGroupStyles, makeGroupClasses, makeStyles } from '../utils';

const FormatColor: React.FC<FormatColorProps> = (props) => {
  const { 
    value, 
    box = true, 
    text = true,
    sm,
    md,
    lg,
    className, 
    classNames,
    style,  
    styles
  } = props;
  const size = sm ? '8px': md ? '12px' : lg ? '16px' : '12px';
  const map = {
    styles: makeGroupStyles(styles, {
      container: makeStyles(style, {
        alignItems: 'center', 
        display: 'flex'
      }),
      box: {
        backgroundColor: value, 
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '1px',
        display: 'inline-block', 
        height: size, 
        marginRight: '4px', 
        width: size
      },
      text: undefined
    }),
    classes: makeGroupClasses(classNames, {
      container: className,
      box: undefined,
      text: undefined
    })
  };
  if (box && text) {
    return (
      <span className={map.classes.container} style={map.styles.container}>
        <span className={map.classes.box} style={map.styles.box} />
        <span className={map.classes.text} style={map.styles.text}>
          {value}
        </span>
      </span>
    );
  } else if (box) {
    return (<span className={map.classes.box} style={map.styles.box} />);
  }
  //text
  return (
    <span className={map.classes.text} style={map.styles.text}>
      {value}
    </span>
  );
};

export default FormatColor;