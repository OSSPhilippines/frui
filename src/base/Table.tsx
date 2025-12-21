//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX, ReactNode, CSSProperties } from 'react';
import { createContext, useContext } from 'react';

//frui
import type {  
  ClassStyleProps,
  ChildrenProps,
  HTMLTableProps,
  HTMLTableHeadProps,
  HTMLTableRowProps,
  HTMLTableCellProps
} from '../types.js';

import getSlotStyles from '../helpers/getSlotStyles.js';

//--------------------------------------------------------------------//
// Types

//serializable column primitive
export type Column = ClassStyleProps & {
  //the amount of columns to span
  colSpan?: number,
  //disable wrapping of content
  noWrap?: boolean,
  //the amount of rows to span
  rowSpan?: number,
  //sticky position to bottom of the table
  stickyBottom?: boolean,
  //sticky position to left of the table
  stickyLeft?: boolean,
  //sticky position to right of the table
  stickyRight?: boolean,
  //sticky position to top of the table
  stickyTop?: boolean,
  //sets min width to 100px (uses an invisible rule)
  wrap1?: boolean,
  //sets min width to 200px (uses an invisible rule)
  wrap2?: boolean,
  //sets min width to 300px (uses an invisible rule)
  wrap3?: boolean,
  //sets min width to 400px (uses an invisible rule)
  wrap4?: boolean,
  //sets min width to 500px (uses an invisible rule)
  wrap5?: boolean
};

//serializable foot primitive
export type Foot = ClassStyleProps & {
  //the amount of columns to span
  colSpan?: number,
  //disable wrapping of content
  noWrap?: boolean,
  //the amount of rows to span
  rowSpan?: number,
  //sticky position to bottom of the table
  stickyBottom?: boolean,
  //sticky position to left of the table
  stickyLeft?: boolean,
  //sticky position to right of the table
  stickyRight?: boolean,
  //sets min width to 100px (uses an invisible rule)
  wrap1?: boolean,
  //sets min width to 200px (uses an invisible rule)
  wrap2?: boolean,
  //sets min width to 300px (uses an invisible rule)
  wrap3?: boolean,
  //sets min width to 400px (uses an invisible rule)
  wrap4?: boolean,
  //sets min width to 500px (uses an invisible rule)
  wrap5?: boolean
};

//serializable head primitive
export type Head = ClassStyleProps & {
  //the amount of columns to span
  colSpan?: number,
  //disable wrapping of content
  noWrap?: boolean,
  //the amount of rows to span
  rowSpan?: number,
  //sticky position to left of the table
  stickyLeft?: boolean,
  //sticky position to right of the table
  stickyRight?: boolean,
  //sticky position to top of the table
  stickyTop?: boolean,
  //sets min width to 100px (uses an invisible rule)
  wrap1?: boolean,
  //sets min width to 200px (uses an invisible rule)
  wrap2?: boolean,
  //sets min width to 300px (uses an invisible rule)
  wrap3?: boolean,
  //sets min width to 400px (uses an invisible rule)
  wrap4?: boolean,
  //sets min width to 500px (uses an invisible rule)
  wrap5?: boolean
};

//derrivative of SlotStyleProp except also accepts Column
export type ColumnSlot = string | CSSProperties | Column;
//derrivative of SlotStyleProp except also accepts Foot
export type FootSlot = string | CSSProperties | Foot;
//derrivative of SlotStyleProp except also accepts Column
export type HeadSlot = string | CSSProperties | Head;

//a utility type for adding class/style props
export type AddClassStyle = {
  //additional classname to apply (aside from the context)
  addClassName?: string,
  //additional style to apply (aside from the context)
  addStyle?: CSSProperties
};

export type TableContextProps = {
  //slot: class/style to apply to each column element
  //takes an array for striping
  column?: ColumnSlot | ColumnSlot[],
  //slot: class/style to apply to each foot element
  foot?: FootSlot,
  //slot: class/style to apply to each head element
  head?: HeadSlot,
  //current stripe index
  index: number
};

export type TableRuleProps = { width: string };
export type TableColProps = Column 
  & AddClassStyle 
  & ChildrenProps 
  & HTMLTableCellProps;
export type TableFootProps = Foot 
  & AddClassStyle 
  & ChildrenProps 
  & HTMLTableHeadProps;
export type TableHeadProps = Head 
  & AddClassStyle 
  & ChildrenProps 
  & HTMLTableHeadProps;
export type TableRowProps = ClassStyleProps 
  & ChildrenProps 
  & HTMLTableRowProps 
  & {
    //slot: class/style to apply to each column element
    column?: ColumnSlot,
    //current stripe index
    index?: number
  };

export type TableProps = ClassStyleProps 
  & ChildrenProps 
  & HTMLTableProps 
  & {
    //slot: class/style to apply to each column element
    //takes an array for striping
    column?: ColumnSlot | ColumnSlot[],
    //slot: class/style to apply to each foot element
    foot?: FootSlot,
    //slot: class/style to apply to each head element
    head?: HeadSlot,
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

/**
 * Returns actual slot value based on the index
 */
export function getColumnSlot(
  slot?: ColumnSlot | ColumnSlot[], 
  index = 0
) {
  if (Array.isArray(slot)) {
    return getColumnSlot(slot[index % slot.length]);
  } else if (typeof slot === 'string') {
    return { className: slot };
  } else if (typeof slot === 'object') {
    return { style: slot };
  }
  return {};
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Table stripe hook. This returns a function that can be used to get 
 * a column prop from the list of props passed in a round-robin fashion.
 */
export function useStripe(...stripes: Column[]) {
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
export function TableColumn(props: TableColProps) {
  //hooks
  const { column, index } = useTableContext();
  //variables
  // get the slot for this column (if any)
  const slot = getColumnSlot(column, index);
  // now get the props
  const {
    //additional classname to apply (aside from the context)
    addClassName, //?: string,
    //additional style to apply (aside from the context)
    addStyle, //?: CSSProperties
    children,
    className,
    //the amount of columns to span
    colSpan, //?: number
    //disable wrapping of content
    noWrap, //?: boolean
    //the amount of rows to span
    rowSpan, //?: number
    //sticky position to bottom of the table
    stickyBottom, //?: boolean
    //sticky position to left of the table
    stickyLeft, //?: boolean
    //sticky position to top of the table
    stickyTop, //?: boolean
    //sticky position to right of the table
    stickyRight, //?: boolean
    //sets min width to 100px (uses an invisible rule)
    wrap1, //?: boolean
    //sets min width to 200px (uses an invisible rule)
    wrap2, //?: boolean
    //sets min width to 300px (uses an invisible rule)
    wrap3, //?: boolean
    //sets min width to 400px (uses an invisible rule)
    wrap4, //?: boolean
    //sets min width to 500px (uses an invisible rule)
    wrap5, //?: boolean
    style,
    ...attributes
  } = Object.assign({}, slot, props) as TableColProps;
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
  }
  // if there are additional classes
  if (addClassName) {
    //add additional classes
    classes.push(addClassName);
  }
  if (addStyle) {
    //add additional style
    Object.assign(styles, addStyle);
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
    //additional classname to apply (aside from the context)
    addClassName, //?: string,
    //additional style to apply (aside from the context)
    addStyle, //?: CSSProperties
    children,
    className,
    //the amount of columns to span
    colSpan, //?: number
    //disable wrapping of content
    noWrap, //?: boolean
    //the amount of rows to span
    rowSpan, //?: number
    //sticky position to bottom of the table
    stickyBottom, //?: boolean
    //sticky position to left of the table
    stickyLeft, //?: boolean
    //sticky position to right of the table
    stickyRight, //?: boolean
    //sets min width to 100px (uses an invisible rule)
    wrap1, //?: boolean
    //sets min width to 200px (uses an invisible rule)
    wrap2, //?: boolean
    //sets min width to 300px (uses an invisible rule)
    wrap3, //?: boolean
    //sets min width to 400px (uses an invisible rule)
    wrap4, //?: boolean
    //sets min width to 500px (uses an invisible rule)
    wrap5, //?: boolean
    style,
    ...attributes
  } = props;
  //hooks
  const { foot } = useTableContext();
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
  } else if (foot) {
    //get slot styles
    const slot = getSlotStyles(foot, {});
    //if slot has className
    if (slot.className) {
      //add slot className
      classes.push(slot.className);
    }
    //if slot has style
    if (slot.style) {
      //add slot style
      Object.assign(styles, slot.style);
    }
  }
  // if there are additional classes
  if (addClassName) {
    //add additional classes
    classes.push(addClassName);
  }
  if (addStyle) {
    //add additional style
    Object.assign(styles, addStyle);
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
 * Table Header Component
 */
export function TableHead(props: TableHeadProps) {
  //props
  const {
    //additional classname to apply (aside from the context)
    addClassName, //?: string
    //additional style to apply (aside from the context)
    addStyle, //?: CSSProperties
    children,
    className,
    //the amount of columns to span
    colSpan, //?: number
    //disable wrapping of content
    noWrap, //?: boolean
    //the amount of rows to span
    rowSpan, //?: number
    //sticky position to left of the table
    stickyLeft, //?: boolean
    //sticky position to right of the table
    stickyRight, //?: boolean
    //sticky position to top of the table
    stickyTop, //?: boolean
    //sets min width to 100px (uses an invisible rule)
    wrap1, //?: boolean
    //sets min width to 200px (uses an invisible rule)
    wrap2, //?: boolean
    //sets min width to 300px (uses an invisible rule)
    wrap3, //?: boolean
    //sets min width to 400px (uses an invisible rule)
    wrap4, //?: boolean
    //sets min width to 500px (uses an invisible rule)
    wrap5, //?: boolean
    style,
    ...attributes
  } = props;
  //hooks
  const { head } = useTableContext();
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
  } else if (head) {
    //get slot styles
    const slot = getSlotStyles(head, {});
    //if slot has className
    if (slot.className) {
      //add slot className
      classes.push(slot.className);
    }
    //if slot has style
    if (slot.style) {
      //add slot style
      Object.assign(styles, slot.style);
    }
  }
  // if there are additional classes
  if (addClassName) {
    //add additional classes
    classes.push(addClassName);
  }
  if (addStyle) {
    //add additional style
    Object.assign(styles, addStyle);
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
  const { children, className, column, index, style } = props;
  //hooks
  const context = useTableContext();
  //variables
  // configure classes
  const classes = [ 'frui-table-row' ];
  // if className prop
  if (className) {
    //add className prop
    classes.push(className);
  }
  // configure context provider
  const provider = { 
    ...context, 
    index: typeof index === 'number' ? index : context.index, 
    column: column || context.column
  };
  //render
  return (
    <TableContext.Provider value={provider}>
      <tr className={classes.join(' ')} style={style}>
        {children}
      </tr>
    </TableContext.Provider>
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
    //slot: class/style to apply to each column element
    //takes an array for striping
    column, //?: ColumnSlot | ColumnSlot[]
    //slot: class/style to apply to each foot element
    foot, //?: FootSlot
    //slot: class/style to apply to each head element
    head, //?: HeadSlot
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
    column,
    foot,
    head,
    index: 0
  };
  // collect head, body and foot components
  const headChildren = getHead(children);
  const bodyChildren = getBody(children);
  const footChildren = getFoot(children);
  //render
  return (
    <TableContext.Provider value={provider}>
      <div className={classes.join(' ')} style={style}>
        <table className="frui-table">
          {headChildren && <thead><tr>{headChildren}</tr></thead>}
          {bodyChildren && <tbody>{bodyChildren}</tbody>}
          {footChildren && <tfoot><tr>{footChildren}</tr></tfoot>}
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
  TableColumn as Tcol,
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
    Col: TableColumn,
    Row: TableRow,
    Group: TableGroup,
    Rule: TableRule,
    useStripe,
    useContext: useTableContext
  }
);