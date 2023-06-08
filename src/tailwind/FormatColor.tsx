//types
import type { FormatColorProps } from '../types';
//react
import React from 'react';
//helpers
import { makeGroupStyles, makeGroupClasses } from '../utils';
import { makeClasses } from '../utils';

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
  const size = sm ? 'w-2 h-2': md ? 'w-3 h-3' : lg ? 'w-4 h-4' : 'w-3 h-3';
  const map = {
    styles: makeGroupStyles(styles, {
      container: style,
      box: {
        backgroundColor: value
      },
      text: undefined
    }),
    classes: makeGroupClasses(classNames, {
      container: makeClasses(className, 'items-center flex'),
      box: `border border-black inline-block ${size} mr-1`,
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