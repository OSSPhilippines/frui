//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX, ReactNode } from 'react';
import { createContext, useContext } from 'react';

//frui
import type { 
  ClassStyleProp, 
  HTMLProps, 
  ChildrenProps 
} from '../types.js';
import applyClassStyle from '../helpers/style.js';

//--------------------------------------------------------------------//
// Types

export type TableContextProps = {
  columnClassStyle?: ClassStyleProp | ClassStyleProp[],
  footClassStyle?: ClassStyleProp,
  headClassStyle?: ClassStyleProp,
  index: number
};

export type TableRuleProps = { width: string };

export type TableColProps = HTMLProps & ChildrenProps & {
  addClassStyle?: ClassStyleProp,
  colSpan?: number,
  noWrap?: boolean,
  rowSpan?: number,
  stickyBottom?: boolean,
  stickyLeft?: boolean,
  stickyRight?: boolean,
  stickyTop?: boolean,
  wrap1?: boolean,
  wrap2?: boolean,
  wrap3?: boolean,
  wrap4?: boolean,
  wrap5?: boolean
};

export type TableFootProps = HTMLProps & ChildrenProps & {
  addClassStyle?: ClassStyleProp,
  colSpan?: number,
  noWrap?: boolean,
  rowSpan?: number,
  stickyBottom?: boolean,
  stickyLeft?: boolean,
  stickyRight?: boolean,
  wrap1?: boolean,
  wrap2?: boolean,
  wrap3?: boolean,
  wrap4?: boolean,
  wrap5?: boolean
};

export type TableHeadProps = HTMLProps & ChildrenProps & {
  addClassStyle?: ClassStyleProp,
  colSpan?: number,
  noWrap?: boolean,
  rowSpan?: number,
  stickyLeft?: boolean,
  stickyRight?: boolean,
  stickyTop?: boolean,
  wrap1?: boolean,
  wrap2?: boolean,
  wrap3?: boolean,
  wrap4?: boolean,
  wrap5?: boolean
};

export type TableRowProps = HTMLProps & ChildrenProps & {
  columnClassStyle?: ClassStyleProp,
  colSpan?: number,
  noWrap?: boolean,
  rowSpan?: number,
  stripe?: number
};

export type TableProps = HTMLProps & ChildrenProps & {
  columnClassStyle?: ClassStyleProp | ClassStyleProp[],
  footClassStyle?: ClassStyleProp,
  headClassStyle?: ClassStyleProp
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Collects all the table head elements from children
 */
export function getHead(children: ReactNode) {
  const head: JSX.Element[] = [];
  if (Array.isArray(children)) {
    for (const child of children) {
      if (!child) {
        continue;
      }
      if (Array.isArray(child)) {
        head.push.apply(head, getHead(child));
      } else if (typeof child === 'object' 
        && child.props 
        && 'thead' in child.props
      ) {
        head.push(child);
      } else if (child.type === TableHead) {
        head.push(child);
      }
    }
  }
  
  return head;
};

/**
 * Collects all the table foot elements from children
 */
export function getFoot(children: ReactNode) {
  const foot: JSX.Element[] = [];
  if (Array.isArray(children)) {
    for (const child of children) {
      if (Array.isArray(child)) {
        foot.push.apply(foot, getFoot(child));
      } else if (typeof child === 'object' 
        && child.props 
        && 'tfoot' in child.props
      ) {
        foot.push(child);
      } else if (child.type === TableFoot) {
        foot.push(child);
      }
    }
  }

  return foot;
};

/**
 * Collects all the table body elements from children
 */
export function getBody(children: ReactNode) {
  const body: JSX.Element[] = [];
  if (Array.isArray(children)) {
    for (const child of children) {
      if (Array.isArray(child)) {
        body.push.apply(body, getBody(child));
      } else if (typeof child === 'object' 
        && child.props 
        && 'tbody' in child.props
      ) {
        body.push(child);
      } else if (child.type === TableGroup) {
        const children = child.props.children || [];
        if (Array.isArray(children) && children.length > 0) {
          body.push(...children);
        }
      } else if (child.type === TableRow) {
        body.push(child);
      }
    }
  }

  return body;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Table stripe hook. This returns a function that can be used to get 
 * a color from the list of colors passed in a round-robin fashion.
 */
export function useStripe(...stripes: ClassStyleProp[]) {
  //hooks
  let active = 0;
  //handler
  const toggle = (change?: number|boolean) => {
    //determine next index
    let next = active;
    //if change is a number
    if (typeof change === 'number') {
      //set index to the changed number
      next = change;
    //else if change is true
    } else if (change) {
      //increment next index
      next += 1;
    }
    //if next index not the same as the active index
    if (next !== active) {
      //update the active index
      active = next;
    }
    //return the color at the next index
    return stripes[next % stripes.length];
  };

  return toggle;
};

/**
 * Table context hook
 */
export function useTableContext() {
  return useContext(TableContext);
};

//--------------------------------------------------------------------//
// Components

/**
 * Table context
 */
export const TableContext = createContext<TableContextProps>({
  index: 0
});

/**
 * Table column component
 */
export function TableCol(props: TableColProps) {
  //props
  const {
    addClassStyle,
    children,
    className,
    colSpan,
    noWrap,
    rowSpan,
    stickyBottom,
    stickyLeft,
    stickyRight,
    stickyTop,
    style,
    wrap1,
    wrap2,
    wrap3,
    wrap4,
    wrap5,
    ...attributes
  } = props;
  //hooks
  const context = useTableContext();
  //variables
  // configure classes and styles
  const classes = [ 'frui-table-col' ];
  const styles = { ...style };
  // if any sticky
  if (stickyBottom || stickyLeft || stickyRight || stickyTop) { 
    //add sticky class
    classes.push('frui-table-sticky');
    //if sticky bottom
    if (stickyBottom) {
      //add sticky bottom class and z-index 1
      classes.push('frui-table-sticky-b', 'frui-table-z1');
    } 
    //if sticky left
    if (stickyLeft) {
      //add sticky left class and z-index 1
      classes.push('frui-table-sticky-l', 'frui-table-z2');
    }
    //if sticky right
    if (stickyRight) {
      //add sticky right class and z-index 1
      classes.push('frui-table-sticky-r', 'frui-table-z2');
    }
    //if sticky top
    if (stickyTop) {
      //add sticky top class and z-index 1
      classes.push('frui-table-sticky-t', 'frui-table-z1');
    }
  }
  // if no wrap
  if (noWrap) {
    //add no wrap class
    classes.push('frui-table-nowrap');
  }
  // if className prop
  if (className) {
    //add className prop
    classes.push(className);
  // else if context has col style prop
  } else if (context.columnClassStyle) {
    if (!Array.isArray(context.columnClassStyle)) {
      //add col style prop from context
      applyClassStyle(classes, styles, context.columnClassStyle);
    // else col style is an array
    } else {
      //add col style prop from context based on index
      applyClassStyle(classes, styles, context.columnClassStyle[
        context.index % context.columnClassStyle.length
      ]);
    }
  }
  //if there are additional classes
  if (addClassStyle) {
    //add additional classes
    applyClassStyle(classes, styles, addClassStyle);
  }
  // configure attributes
  const extras: Record<string, number> = {};
  // - if row span
  if (rowSpan) {
    //add row span attribute
    extras.rowSpan = rowSpan || 0;
  }
  // - if col span
  if (colSpan) {
    //add col span attribute
    extras.colSpan = colSpan || 0;
  }
  
  // NOTE: Table sizing is very volatile when doing it organically.
  // Adding a rule with a specific width forces the browser to
  // respect the width of the column and wont shrink relative to the
  // other columns.

  // configure invisible rule
  let rule = null;
  // - if wrap 1
  if (wrap1) {
    //add wrap 1 rule
    rule = (<TableRule width="100px" />);
  // - if wrap 2
  } else if (wrap2) {
    //add wrap 2 rule
    rule = (<TableRule width="200px" />);
  // - if wrap 3
  } else if (wrap3) {
    //add wrap 3 rule
    rule = (<TableRule width="300px" />);
  // - if wrap 4
  } else if (wrap4) {
    //add wrap 4 rule
    rule = (<TableRule width="400px" />);
  // - if wrap 5
  } else if (wrap5) {
    //add wrap 5 rule
    rule = (<TableRule width="500px" />);
  } 
  //render
  return (
    <td 
      valign="top" 
      {...attributes} 
      className={classes.join(' ')} 
      style={styles} 
      {...extras}
    >
      {children}
      {rule}
    </td>
  );
};

/**
 * Table Footer Component
 */
export function TableFoot(props: TableFootProps) {
  //props
  const {
    addClassStyle,
    children,
    className,
    colSpan,
    noWrap,
    rowSpan,
    stickyBottom,
    stickyLeft,
    stickyRight,
    style,
    wrap1,
    wrap2,
    wrap3,
    wrap4,
    wrap5,
    ...attributes
  } = props;
  //hooks
  const context = useTableContext();
  //variables
  // configure classes and styles
  const classes = [ 'frui-table-foot' ];
  const styles = { ...style };
  // if any sticky
  if (stickyBottom || stickyLeft || stickyRight) {
    let zSet = false; 
    //add stick class
    classes.push('frui-table-sticky');
    //if stick bottom
    if (stickyBottom) {
      //add sticky bottom class
      classes.push('frui-table-sticky-b');
      //if also sticky left and right (together)
      if (stickyLeft && stickyRight) {
        //add a z-index 4
        classes.push('frui-table-z4');
        zSet = true;
      //if either sticky left or right
      } else if (stickyLeft || stickyRight) {
        //add a z-index 3
        classes.push('frui-table-z3');
        zSet = true;
      }
    } 
    //if sticky left
    if (stickyLeft) {
      //add sticky left class and z-index 1
      classes.push('frui-table-sticky-l');
    }
    //if sticky right
    if (stickyRight) {
      //add sticky right class and z-index 1
      classes.push('frui-table-sticky-r');
    }
    //if no z-index has been set
    if (!zSet) {
      //add a z-index 1
      classes.push('frui-table-z2');
    }
  }
  // if no wrap
  if (noWrap) {
    //add no wrap class
    classes.push('frui-table-nowrap');
  }
  // if className prop
  if (className) {
    //add className prop
    classes.push(className);
  // else if context has foot style prop
  } else if (context.footClassStyle) {
    //add foot style prop from context
    applyClassStyle(classes, styles, context.footClassStyle);
  }
  //if there are additional classes
  if (addClassStyle) {
    //add additional classes
    applyClassStyle(classes, styles, addClassStyle);
  }
  // configure attributes
  const extras: Record<string, number> = {};
  // - if row span
  if (rowSpan) {
    //add row span attribute
    extras.rowSpan = rowSpan || 0;
  }
  // - if col span
  if (colSpan) {
    //add col span attribute
    extras.colSpan = colSpan || 0;
  }

  // NOTE: Table sizing is very volatile when doing it organically.
  // Adding a rule with a specific width forces the browser to
  // respect the width of the column and wont shrink relative to the
  // other columns.

  // configure invisible rule
  let rule = null;
  // - if wrap 1
  if (wrap1) {
    //add wrap 1 rule
    rule = (<TableRule width="100px" />);
  // - if wrap 2
  } else if (wrap2) {
    //add wrap 2 rule
    rule = (<TableRule width="200px" />);
  // - if wrap 3
  } else if (wrap3) {
    //add wrap 3 rule
    rule = (<TableRule width="300px" />);
  // - if wrap 4
  } else if (wrap4) {
    //add wrap 4 rule
    rule = (<TableRule width="400px" />);
  // - if wrap 5
  } else if (wrap5) {
    //add wrap 5 rule
    rule = (<TableRule width="500px" />);
  } 
  //render
  return (
    <th 
      {...attributes} 
      className={classes.join(' ')} 
      style={styles}
      {...extras}
    >
      {children}
      {rule}
    </th>
  );
};

/**
 * Table Group Component
 * This can be used to group rows together in an iterator instead 
 * of `<></>` which is not detected by `getBody()`.
 */
export function TableGroup(props: TableRowProps) {
  return props.children;
};

/**
 * Table Row Component
 */
export function TableRow(props: TableRowProps) {
  //props
  const {
    children,
    className,
    columnClassStyle,
    colSpan,
    noWrap,
    rowSpan,
    stripe = 0,
    ...attributes
  } = props;
  //hooks
  const context = useTableContext();
  //variables
  // configure classes
  const classes = [ 'frui-table-row' ];
  // if no wrap
  if (noWrap) {
    //add no wrap class
    classes.push('frui-table-nowrap');
  }
  // if className prop
  if (className) {
    //add className prop
    classes.push(className);
  }
  // configure attributes
  const extras: Record<string, number> = {};
  if (rowSpan) {
    extras.rowSpan = rowSpan || 0;
  }
  if (colSpan) {
    extras.colSpan = colSpan || 0;
  }
  // configure context provider
  const provider = {
    ...context,
    index: stripe,
    columnClassStyle: columnClassStyle || context.columnClassStyle
  };
  //render
  return (
    <TableContext.Provider value={provider}>
      <tr {...attributes} className={classes.join(' ')} {...extras}>
        {children}
      </tr>
    </TableContext.Provider>
  );
};

/**
 * Table Header Component
 */
export function TableHead(props: TableHeadProps) {
  //props
  const {
    addClassStyle,
    children,
    className,
    colSpan,
    noWrap,
    rowSpan,
    stickyTop,
    stickyLeft,
    stickyRight,
    style,
    wrap1,
    wrap2,
    wrap3,
    wrap4,
    wrap5,
    ...attributes
  } = props;
  //hooks
  const context = useTableContext();
  //variables
  // configure classes and styles
  const classes = [ 'frui-table-head' ];
  const styles = { ...style };
  // if any sticky
  if (stickyLeft || stickyRight || stickyTop) { 
    let zSet = false;
    //add stick class
    classes.push('frui-table-sticky');
    //if stick top
    if (stickyTop) {
      //add sticky top class
      classes.push('frui-table-sticky-t');
      //if also sticky left and right (together)
      if (stickyLeft && stickyRight) {
        //add a z-index 4
        classes.push('frui-table-z4');
        zSet = true;
      //if either sticky left or right
      } else if (stickyLeft || stickyRight) {
        //add a z-index 3
        classes.push('frui-table-z3');
        zSet = true;
      }
    }
    //if sticky left
    if (stickyLeft) {
      //add sticky left class and z-index 1
      classes.push('frui-table-sticky-l');
    }
    //if sticky right
    if (stickyRight) {
      //add sticky right class and z-index 1
      classes.push('frui-table-sticky-r');
    }
    //if no z-index has been set
    if (!zSet) {
      //add a z-index 1
      classes.push('frui-table-z2');
    }
  }
  // if no wrap
  if (noWrap) {
    //add no wrap class 
    classes.push('frui-table-nowrap');
  }
  // if className prop
  if (className) {
    //add className prop
    classes.push(className);
  // else if context has head style prop
  } else if (context.headClassStyle) {
    //add head style prop from context
    applyClassStyle(classes, styles, context.headClassStyle);
  }
  //if there are additional classes
  if (addClassStyle) {
    //add additional classes
    applyClassStyle(classes, styles, addClassStyle);
  }
  // configure attributes
  const extras: Record<string, number> = {};
  // - if row span
  if (rowSpan) {
    //add row span attribute
    extras.rowSpan = rowSpan || 0;
  }
  // - if col span
  if (colSpan) {
    //add col span attribute
    extras.colSpan = colSpan || 0;
  }
  
  // NOTE: Table sizing is very volatile when doing it organically.
  // Adding a rule with a specific width forces the browser to
  // respect the width of the column and wont shrink relative to the
  // other columns.

  // configure invisible rule
  let rule = null;
  // - if wrap 1
  if (wrap1) {
    //add wrap 1 rule
    rule = (<TableRule width="100px" />);
  // - if wrap 2
  } else if (wrap2) {
    //add wrap 2 rule
    rule = (<TableRule width="200px" />);
  // - if wrap 3
  } else if (wrap3) {
    //add wrap 3 rule
    rule = (<TableRule width="300px" />);
  // - if wrap 4
  } else if (wrap4) {
    //add wrap 4 rule
    rule = (<TableRule width="400px" />);
  // - if wrap 5
  } else if (wrap5) {
    //add wrap 5 rule
    rule = (<TableRule width="500px" />);
  } 
  //render
  return (
    <th 
      {...attributes} 
      className={classes.join(' ')} 
      style={styles}
      {...extras}
    >
      {children}
      {rule}
    </th>
  );
};

/**
 * Invisible rule component
 */
export function TableRule({ width }: TableRuleProps) {
  //just render
  return (
    <hr style={{ borderWidth: 0, margin: 0, width }} />
  );
};

/**
 * Table Component (Main)
 */
export function Table(props: TableProps) {
  //props
  const {
    className,
    columnClassStyle,
    footClassStyle,
    headClassStyle,
    style
  } = props;
  //variables
  let children = props.children || []
  if (!Array.isArray(children)) {
    children = [ children ];
  }
  // configure classes
  const classes = [ 'frui-table-overflow' ];
  if (className) {
    classes.push(className);
  }
  // configure context provider
  const provider = { 
    columnClassStyle,
    footClassStyle,
    headClassStyle,
    index: 0
  };
  // collect head, body and foot components
  const head = getHead(children);
  const body = getBody(children);
  const foot = getFoot(children);
  //render
  return (
    <TableContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        <table className="frui-table">
          {head && <thead><tr>{head}</tr></thead>}
          {body && <tbody>{body}</tbody>}
          {foot && <tfoot><tr>{foot}</tr></tfoot>}
        </table>
      </div>
    </TableContext.Provider>
  );
};

//--------------------------------------------------------------------//
// Other Exports

export {
  TableHead as Thead,
  TableFoot as Tfoot,
  TableCol as Tcol,
  TableRow as Trow,
  TableGroup as Tgroup,
  TableRule as Trule
};

//defaults to table
export default Object.assign(
  Table, 
  {
    Head: TableHead,
    Foot: TableFoot,
    Col: TableCol,
    Row: TableRow,
    Group: TableGroup,
    Rule: TableRule,
    useStripe,
    useContext: useTableContext
  }
);