//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

//frui
import type { HTMLProps, ChildrenProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type TableContextProps = {
  cols?: string | string[],
  foots?: string,
  heads?: string,
  index: number
};

export type TableRuleProps = { width: string };

export type TableColProps = HTMLProps & ChildrenProps & {
  addClass?: string,
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
  addClass?: string,
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
  addClass?: string,
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
  cols?: string,
  colSpan?: number,
  noWrap?: boolean,
  rowSpan?: number,
  stripe?: number
};

export type TableProps = HTMLProps & ChildrenProps & {
  cols?: string | string[],
  foots?: string,
  heads?: string
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
      } else if (typeof child === 'object' && child.props && 'thead' in child.props) {
        head.push(child);
      } else if (typeof child?.type?.prototype?.table === 'function' 
        && child.type.prototype.table() === 'TableHead'
      ) {
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
      } else if (typeof child === 'object' && child.props && 'tfoot' in child.props) {
        foot.push(child);
      } else if (typeof child?.type?.prototype?.table === 'function' 
        && child.type.prototype.table() === 'TableFoot'
      ) {
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
      } else if (typeof child === 'object' && child.props && 'tbody' in child.props) {
        body.push(child);
      } else if (typeof child?.type?.prototype?.table === 'function' 
        && child.type.prototype.table() === 'TableGroup'
      ) {
        const children = child.props.children || [];
        if (Array.isArray(children) && children.length > 0) {
          body.push(...children);
        }
      } else if (typeof child?.type?.prototype?.table === 'function' 
        && child.type.prototype.table() === 'TableRow'
      ) {
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
export function useStripe(...colors: string[]) {
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
    return colors[next % colors.length];
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
export class TableCol extends React.Component<TableColProps> {
  //set context to table
  static contextType = TableContext;
  declare context: React.ContextType<typeof TableContext>;

  /**
   * This is a marker to identify the component type.
   * (used in `getBody()`)
   */
  table() {
    return 'TableCol';
  }

  /**
   * Render component method
   */
  render() {
    //props
    const {
      addClass,
      children,
      className,
      colSpan,
      noWrap,
      rowSpan,
      stickyBottom,
      stickyLeft,
      stickyRight,
      stickyTop,
      wrap1,
      wrap2,
      wrap3,
      wrap4,
      wrap5,
      ...attributes
    } = this.props;
    //variables
    // configure classes
    const classes = [ 'frui-table-col' ];
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
    // else if context has cols prop
    } else if (this.context.cols) {
      if (typeof this.context.cols === 'string') {
        //add cols prop from context
        classes.push(this.context.cols);
      // else if cols is an array
      } else if (Array.isArray(this.context.cols)) {
        //add cols prop from context based on index
        classes.push(this.context.cols[
          this.context.index % this.context.cols.length
        ]);
      }
      //if there are additional classes
      if (addClass) {
        //add additional classes
        classes.push(addClass);
      }
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
      rule = (<Rule width="100px" />);
    // - if wrap 2
    } else if (wrap2) {
      //add wrap 2 rule
      rule = (<Rule width="200px" />);
    // - if wrap 3
    } else if (wrap3) {
      //add wrap 3 rule
      rule = (<Rule width="300px" />);
    // - if wrap 4
    } else if (wrap4) {
      //add wrap 4 rule
      rule = (<Rule width="400px" />);
    // - if wrap 5
    } else if (wrap5) {
      //add wrap 5 rule
      rule = (<Rule width="500px" />);
    } 
    //render
    return (
      <td valign="top" {...attributes} className={classes.join(' ')} {...extras}>
        {children}
        {rule}
      </td>
    );
  }
};

/**
 * Table Footer Component
 */
export class TableFoot extends React.Component<TableFootProps> {
  //set context to table
  static contextType = TableContext;
  declare context: React.ContextType<typeof TableContext>;

  /**
   * This is a marker to identify the component type.
   * (used in `getFoot()`)
   */
  table() {
    return 'TableFoot';
  }

  /** 
   * Render component method
   */
  render() {
    //props
    const {
      addClass,
      children,
      className,
      colSpan,
      noWrap,
      rowSpan,
      stickyBottom,
      stickyLeft,
      stickyRight,
      wrap1,
      wrap2,
      wrap3,
      wrap4,
      wrap5,
      ...attributes
    } = this.props;
    //variables
    // configure classes
    const classes = [ 'frui-table-foot' ];
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
    // else if context has foots prop
    } else if (this.context.foots) {
      //add heads prop from context
      classes.push(this.context.foots);
      //if there are additional classes
      if (addClass) {
        //add additional classes
        classes.push(addClass);
      }
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
      rule = (<Rule width="100px" />);
    // - if wrap 2
    } else if (wrap2) {
      //add wrap 2 rule
      rule = (<Rule width="200px" />);
    // - if wrap 3
    } else if (wrap3) {
      //add wrap 3 rule
      rule = (<Rule width="300px" />);
    // - if wrap 4
    } else if (wrap4) {
      //add wrap 4 rule
      rule = (<Rule width="400px" />);
    // - if wrap 5
    } else if (wrap5) {
      //add wrap 5 rule
      rule = (<Rule width="500px" />);
    } 
    //render
    return (
      <th {...attributes} className={classes.join(' ')} {...extras}>
        {children}
        {rule}
      </th>
    );
  }
};

/**
 * Table Group Component
 * This can be used to group rows together in an iterator instead 
 * of `<></>` which is not detected by `getBody()`.
 */
export class TableGroup extends React.Component<TableRowProps> {
  /**
   * This is a marker to identify the component type.
   * (used in `getBody()`)
   */
  table() {
    return 'TableGroup';
  }

  /**
   * Render component method
   */
  render() {
    return this.props.children;
  }
};

/**
 * Table Row Component
 */
export class TableRow extends React.Component<TableRowProps> {
  //set context to table
  static contextType = TableContext;
  declare context: React.ContextType<typeof TableContext>;

  /**
   * This is a marker to identify the component type.
   * (used in `getBody()`)
   */
  table() {
    return 'TableRow';
  }

  /**
   * Render component method
   */
  render() {
    //props
    const {
      children,
      className,
      cols,
      colSpan,
      noWrap,
      rowSpan,
      stripe = 0,
      ...attributes
    } = this.props;
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
      ...this.context,
      index: stripe,
      cols: cols || this.context.cols
    };
    //render
    return (
      <TableContext.Provider value={provider}>
        <tr {...attributes} className={classes.join(' ')} {...extras}>
          {children}
        </tr>
      </TableContext.Provider>
    );
  }
};

/**
 * Table Header Component
 */
export class TableHead extends React.Component<TableHeadProps> {
  //set context to table
  static contextType = TableContext;
  declare context: React.ContextType<typeof TableContext>;

  /**
   * This is a marker to identify the component type.
   * (used in `getHead()`)
   */
  table() {
    return 'TableHead';
  }

  /**
   * Render component method
   */
  render() {
    //props
    const {
      addClass,
      children,
      className,
      colSpan,
      noWrap,
      rowSpan,
      stickyTop,
      stickyLeft,
      stickyRight,
      wrap1,
      wrap2,
      wrap3,
      wrap4,
      wrap5,
      ...attributes
    } = this.props;
    //variables
    // configure classes
    const classes = [ 'frui-table-head' ];
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
    // else if context has heads prop
    } else if (this.context.heads) {
      //add heads prop from context
      classes.push(this.context.heads);
      //if there are additional classes
      if (addClass) {
        //add additional classes
        classes.push(addClass);
      }
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
      rule = (<Rule width="100px" />);
    // - if wrap 2
    } else if (wrap2) {
      //add wrap 2 rule
      rule = (<Rule width="200px" />);
    // - if wrap 3
    } else if (wrap3) {
      //add wrap 3 rule
      rule = (<Rule width="300px" />);
    // - if wrap 4
    } else if (wrap4) {
      //add wrap 4 rule
      rule = (<Rule width="400px" />);
    // - if wrap 5
    } else if (wrap5) {
      //add wrap 5 rule
      rule = (<Rule width="500px" />);
    } 
    //render
    return (
      <th {...attributes} className={classes.join(' ')} {...extras}>
        {children}
        {rule}
      </th>
    );
  }
};

/**
 * Invisible rule component
 */
export function Rule({ width }: TableRuleProps) {
  //just render
  return (
    <hr style={{ borderWidth: 0, margin: 0, width }} />
  );
};

/**
 * Table Component (Main)
 */
export function Table(props: TableProps) {
  //variables
  let children = props.children || []
  if (!Array.isArray(children)) {
    children = [ children ];
  }
  // configure classes
  const classes = [ 'frui-table-overflow' ];
  if (props.className) {
    classes.push(props.className);
  }
  // configure context provider
  const provider = { 
    cols: props.cols,
    foots: props.foots,
    heads: props.heads,
    index: 0
  };
  // collect head, body and foot components
  const head = getHead(children);
  const body = getBody(children);
  const foot = getFoot(children);
  //render
  return (
    <TableContext.Provider value={provider}>
      <div className={classes.join(' ')} style={props.style}>
        <table className="frui-table">
          {head && <thead><tr>{head}</tr></thead>}
          {body && <tbody>{body}</tbody>}
          {foot && <tfoot><tr>{foot}</tr></tfoot>}
        </table>
      </div>
    </TableContext.Provider>
  )
};

//--------------------------------------------------------------------//
// Other Exports

export {
  TableHead as Thead,
  TableFoot as Tfoot,
  TableCol as Tcol,
  TableRow as Trow,
  TableGroup as Tgroup
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
    Rule: Rule,
    useStripe
  }
);