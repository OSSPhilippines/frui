//--------------------------------------------------------------------//
// Imports

//modules
import { createElement } from 'react';
//frui
import type { 
  HTMLElementProps, 
  HTMLHeadingProps,
  HTMLParagraphProps
} from './types.ts';
import type { BorderStyleProps } from './helpers/tools/BorderStyleTool.js';
import type { ColorProps } from './helpers/tools/ColorTool.js';
import type { SizeProps } from './helpers/tools/SizeTool.js';
import type { BoxProps } from './Box.js';
import BorderStyleTool from './helpers/tools/BorderStyleTool.js';
import ColorTool from './helpers/tools/ColorTool.js';
import SizeTool from './helpers/tools/SizeTool.js';
import Box from './Box.js';

//--------------------------------------------------------------------//
// Types

export type CardFootProps = HTMLElementProps 
  & BorderStyleProps
  & SizeProps 
  & ColorProps 
  & {
    center?: boolean,
    left?: boolean,
    right?: boolean,
    stretch?: boolean
  };

export type CardHeadProps = HTMLElementProps 
  & BorderStyleProps
  & SizeProps 
  & ColorProps 
  & { stretch?: boolean };

export type CardBodyProps = HTMLElementProps 
  & BorderStyleProps
  & SizeProps 
  & ColorProps 
  & { stretch?: boolean };

export type CardTitleProps = HTMLHeadingProps 
  & SizeProps 
  & ColorProps 
  & { 
    bold?: boolean,
    capital?: boolean,
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    h4?: boolean,
    h5?: boolean,
    h6?: boolean,
    italic?: boolean,
    lower?: boolean,
    semi?: boolean,
    upper?: boolean
  };

export type CardDescriptionProps = HTMLParagraphProps 
  & SizeProps 
  & ColorProps 
  & { 
    bold?: boolean,
    capital?: boolean,
    italic?: boolean,
    lower?: boolean,
    semi?: boolean,
    upper?: boolean
  };


export type CardProps = BoxProps & {
  horizontal?: boolean
};

//--------------------------------------------------------------------//
// Components

/**
 * Card title component
 */
export function CardTitle(props: CardTitleProps) {
  //props
  const { 
    bold,
    capital, 
    children, 
    className, 
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    italic,
    lower,
    semi, 
    style,
    upper,
    ...attributes 
  } = Box.removeThemeProps(props);
  //variables
  const classes = [ 'frui-card-title' ];
  bold && classes.push('frui-bold');
  semi && classes.push('frui-semi');
  italic && classes.push('frui-italic');
  upper && classes.push('frui-uppercase');
  lower && classes.push('frui-lowercase');
  capital && classes.push('frui-capitalize');
  const styles = { ...style };
  // apply color tool
  ColorTool.get(props, 'txc').getClassStyles({ classes, styles });
  // apply size tool
  SizeTool.get(props, 'pa').getClassStyles({ classes, styles });
  // add custom classes
  className && classes.push(className);
  //render
  // use react createElement to create the heading element dynamically
  return createElement(
    h1 ? 'h1' 
    : h2 ? 'h2' 
    : h3 ? 'h3' 
    : h4 ? 'h4' 
    : h5 ? 'h5' 
    : h6 ? 'h6' 
    : 'h3', 
    { ...attributes, className: classes.join(' '), style: styles }, 
    children
  );
};

/**
 * Card description component
 */
export function CardDescription(props: CardDescriptionProps) {
  //props
  const { 
    bold,
    capital, 
    children, 
    className, 
    italic,
    lower,
    semi, 
    style,
    upper,
    ...attributes 
  } = Box.removeThemeProps(props);
  //variables
  const classes = [ 'frui-card-description' ];
  bold && classes.push('frui-bold');
  semi && classes.push('frui-semi');
  italic && classes.push('frui-italic');
  upper && classes.push('frui-uppercase');
  lower && classes.push('frui-lowercase');
  capital && classes.push('frui-capitalize');
  const styles = { ...style };
  // apply color tool
  ColorTool.get(props, 'txc').getClassStyles({ classes, styles });
  // apply size tool
  SizeTool.get(props, 'pa').getClassStyles({ classes, styles });
  // add custom classes
  className && classes.push(className);
  //render
  return (
    <p {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </p>
  )
};

/**
 * Card main body component
 */
export function CardBody(props: CardBodyProps) {
  //props
  const { 
    children, 
    className, 
    stretch,
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  //variables
  const classes = [ 'frui-card-body' ];
  stretch && classes.push('frui-fa-grow');
  const styles = { ...style };
  // apply border style tool
  BorderStyleTool.get(props).getClassStyles({ classes, styles });
  // apply color tool
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  // apply size tool
  SizeTool.get(props, 'pa').getClassStyles({ classes, styles });
  // add custom classes
  className && classes.push(className);
  //render
  return (
    <main {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </main>
  )
};

/**
 * Card footer component
 */
export function CardFoot(props: CardFootProps) {
  //props
  const { 
    children, 
    className, 
    stretch,
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  const {
    center,
    left,
    right
  } = props;
  //variables
  const classes = [ 'frui-card-foot', 'frui-flex' ];
  center && classes.push('frui-fx-center');
  left && classes.push('frui-fx-left');
  right && classes.push('frui-fx-right');
  stretch && classes.push('frui-fa-grow');
  const styles = { ...style };
  // apply border style tool
  BorderStyleTool.get(props).getClassStyles({ classes, styles });
  // apply color tool
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  // apply size tool
  SizeTool.get(props, 'pa').getClassStyles({ classes, styles });
  // add custom classes
  className && classes.push(className);
  //render
  return (
    <footer {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </footer>
  )
};

/**
 * Card header component
 */
export function CardHead(props: CardHeadProps) {
  //props
  const { 
    children, 
    className, 
    stretch,
    style,
    ...attributes 
  } = Box.removeThemeProps(props);
  //hooks
  //const context = useCardContext();
  //variables
  const classes = [ 'frui-card-head' ];
  stretch && classes.push('frui-fa-grow');
  const styles = { ...style };
  // apply border style tool
  BorderStyleTool.get(props).getClassStyles({ classes, styles });
  // apply color tool
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  // apply size tool
  SizeTool.get(props, 'pa').getClassStyles({ classes, styles });
  // add custom classes
  className && classes.push(className);
  //render
  return (
    <header {...attributes} className={classes.join(' ')} style={styles}>
      {children}
    </header>
  )
};

/**
 * Card component (main)
 */
export function Card(props: CardProps) {
  //props
  const { 
    asChild, 
    children, 
    className, 
    horizontal,
    ...boxProps 
  } = props;
  //variables
  const classes = [ 'frui-card' ];
  horizontal && classes.push('frui-flex');
  className && classes.push(className);
  //render
  return asChild ? (
    <Box {...boxProps} className={classes.join(' ')} asChild>
      {children}
    </Box>
  ) : (
    <Box {...boxProps} className={classes.join(' ')} asChild>
      <section>{children}</section>
    </Box>
  );
};

export default Object.assign(Card, {
  Body: CardBody,
  Foot: CardFoot,
  Head: CardHead,
  Title: CardTitle,
  Description: CardDescription
});
