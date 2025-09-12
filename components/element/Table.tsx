//types
import type { JSX, ReactNode, CSSProperties } from 'react';
import type { AnyReactChildren } from '../types.js';
//react
import React from 'react';

/**
 * Table Rule Props
 */
export type TableRuleProps = { width: string };

/**
 * Table Column Props
 */
export type TableColProps = {
  style?: CSSProperties,
  className?: string,
  children?: AnyReactChildren,
  stickyBottom?: boolean,
  stickyLeft?: boolean,
  stickyRight?: boolean,
  stickyTop?: boolean,
  noWrap?: boolean,
  rowSpan?: number,
  colSpan?: number,
  wrap1?: boolean,
  wrap2?: boolean,
  wrap3?: boolean,
  wrap4?: boolean,
  wrap5?: boolean
};

/**
 * Table Footer Props
 */
export type TableFootProps = {
  style?: CSSProperties,
  className?: string,
  children?: AnyReactChildren,
  stickyBottom?: boolean,
  stickyLeft?: boolean,
  stickyRight?: boolean,
  noWrap?: boolean,
  rowSpan?: number,
  colSpan?: number,
};

/**
 * Table Header Props
 */
export type TableHeadProps = {
  style?: CSSProperties,
  className?: string,
  children?: AnyReactChildren,
  stickyLeft?: boolean,
  stickyRight?: boolean,
  stickyTop?: boolean,
  noWrap?: boolean,
  rowSpan?: number,
  colSpan?: number,
  wrap1?: boolean,
  wrap2?: boolean,
  wrap3?: boolean,
  wrap4?: boolean,
  wrap5?: boolean
};

/**
 * Table Row Props
 */
export type TableRowProps = {
  style?: CSSProperties,
  className?: string,
  children?: AnyReactChildren,
  noWrap?: boolean,
  rowSpan?: number,
  colSpan?: number,
};

/**
 * Table Props
 */
export type TableProps = {
  style?: CSSProperties,
  className?: string,
  children?: ReactNode|ReactNode[]
};

/**
 * Invisible Rule Component
 */
const Rule: React.FC<TableRuleProps> = ({ width }) => {
  return <hr style={{ borderWidth: 0, margin: 0, width }} />
};

/**
 * Table Column Component
 */
class TableCol extends React.Component<TableColProps> {
  table() {
    return 'TableCol';
  }

  render() {
    const {
      stickyBottom,
      stickyLeft,
      stickyRight,
      stickyTop,
      noWrap,
      rowSpan,
      colSpan,
      wrap1,
      wrap2,
      wrap3,
      wrap4,
      wrap5,
      className,
      children,
      ...attributes
    } = this.props;
    const classNames = [ 'frui-tbl-col' ];
    if (stickyBottom || stickyLeft || stickyRight || stickyTop) { 
      classNames.push('frui-tbl-sticky');
      if (stickyBottom) {
        classNames.push('frui-tbl-sticky-b', 'frui-tbl-z1');
      } 
      if (stickyLeft) {
        classNames.push('frui-tbl-sticky-l', 'frui-tbl-z2');
      }
      if (stickyRight) {
        classNames.push('frui-tbl-sticky-r', 'frui-tbl-z2');
      }
      if (stickyTop) {
        classNames.push('frui-tbl-sticky-t', 'frui-tbl-z1');
      }
    }

    if (noWrap) {
      classNames.push('frui-tbl-nowrap');
    }

    const extras: Record<string, number> = {};
    if (rowSpan) {
      extras.rowSpan = rowSpan || 0;
    }
    if (colSpan) {
      extras.colSpan = colSpan || 0;
    }

    let rule = null;
    if (wrap1) {
      rule = (<Rule width="100px" />);
    } else if (wrap2) {
      rule = (<Rule width="200px" />);
    } else if (wrap3) {
      rule = (<Rule width="300px" />);
    } else if (wrap4) {
      rule = (<Rule width="400px" />);
    } else if (wrap5) {
      rule = (<Rule width="500px" />);
    } 

    if (className) {
      classNames.push(className);
    }

    return (
      <td valign="top" {...attributes} className={classNames.join(' ')} {...extras}>
        {children}
        {rule}
      </td>
    );
  }
}

/**
 * Table Footer Component
 */
class TableFoot extends React.Component<TableFootProps> {
  table() {
    return 'TableFoot';
  }

  render() {
    const {
      stickyBottom,
      stickyLeft,
      stickyRight,
      noWrap,
      rowSpan,
      colSpan,
      className,
      children,
      ...attributes
    } = this.props;
    const classNames = [ 'frui-tbl-foot' ];
    if (stickyBottom || stickyLeft || stickyRight) { 
      classNames.push('frui-tbl-sticky');
      if (stickyBottom) {
        classNames.push('frui-tbl-sticky-b', 'frui-tbl-z1');
      } 
      if (stickyLeft) {
        classNames.push('frui-tbl-sticky-l', 'frui-tbl-z2');
      }
      if (stickyRight) {
        classNames.push('frui-tbl-sticky-r', 'frui-tbl-z2');
      }
      if (noWrap) {
        classNames.push('frui-tbl-nowrap');
      }
    }

    const extras: Record<string, number> = {};
    if (rowSpan) {
      extras.rowSpan = rowSpan || 0;
    }
    if (colSpan) {
      extras.colSpan = colSpan || 0;
    }

    if (className) {
      classNames.push(className);
    }

    return (
      <th {...attributes} className={classNames.join(' ')} {...extras}>
        {children}
      </th>
    );
  }
}

/**
 * Table Group Component
 */
class TableGroup extends React.Component<TableRowProps> {
  table() {
    return 'TableGroup';
  }

  render() {
    return this.props.children;
  }
}

/**
 * Table Row Component
 */
class TableRow extends React.Component<TableRowProps> {
  table() {
    return 'TableRow';
  }

  render() {
    const {
      noWrap,
      rowSpan,
      colSpan,
      className,
      children,
      ...attributes
    } = this.props;
    const classNames = [ 'frui-tbl-row' ];
    if (noWrap) {
      classNames.push('frui-tbl-nowrap');
    }
    const extras: Record<string, number> = {};
    if (rowSpan) {
      extras.rowSpan = rowSpan || 0;
    }
    if (colSpan) {
      extras.colSpan = colSpan || 0;
    }

    if (className) {
      classNames.push(className);
    }
  
    return (
      <tr {...attributes} className={classNames.join(' ')} {...extras}>
        {children}
      </tr>
    );
  }
}

/**
 * Table Header Component
 */
class TableHead extends React.Component<TableHeadProps> {
  table() {
    return 'TableHead';
  }

  render() {
    const {
      stickyTop,
      stickyLeft,
      stickyRight,
      noWrap,
      rowSpan,
      colSpan,
      wrap1,
      wrap2,
      wrap3,
      wrap4,
      wrap5,
      className,
      children,
      ...attributes
    } = this.props;
    const classNames = [ 'frui-tbl-head' ];
    if (stickyLeft || stickyRight || stickyTop) { 
      classNames.push('frui-tbl-sticky');
      if (stickyTop) {
        classNames.push('frui-tbl-sticky-t');
        if (stickyLeft && stickyRight) {
          classNames.push('frui-tbl-z4');
        } else if (stickyLeft || stickyRight) {
          classNames.push('frui-tbl-z3');
        } else {
          classNames.push('frui-tbl-z1');
        }
      }
      if (stickyLeft) {
        classNames.push('frui-tbl-sticky-l', 'frui-tbl-z1');
      }
      if (stickyRight) {
        classNames.push('frui-tbl-sticky-r', 'frui-tbl-z1');
      }
    }
    if (noWrap) {
      classNames.push('frui-tbl-nowrap');
    }
    const extras: Record<string, number> = {};
    if (rowSpan) {
      extras.rowSpan = rowSpan || 0;
    }
    if (colSpan) {
      extras.colSpan = colSpan || 0;
    }

    let rule = null;
    if (wrap1) {
      rule = (<Rule width="100px" />);
    } else if (wrap2) {
      rule = (<Rule width="200px" />);
    } else if (wrap3) {
      rule = (<Rule width="300px" />);
    } else if (wrap4) {
      rule = (<Rule width="400px" />);
    } else if (wrap5) {
      rule = (<Rule width="500px" />);
    } 

    if (className) {
      classNames.push(className);
    }

    return (
      <th {...attributes} className={classNames.join(' ')} {...extras}>
        {children}
        {rule}
      </th>
    );
  }
}

const getHead = function(children: ReactNode) {
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
  
  return head
};

const getFoot = function(children: ReactNode) {
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

const getBody = function(children: ReactNode) {
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

/**
 * Table Component (Main)
 */
export default function Table(props: TableProps) {
  let children = props.children || []
  if (!Array.isArray(children)) {
    children = [ children ];
  }
  const head = getHead(children);
  const body = getBody(children);
  const foot = getFoot(children);

  const classNames = [ 'frui-tbl-overflow' ];
  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <div className={classNames.join(' ')} style={props.style}>
      <table className="frui-tbl">
        {head && <thead><tr>{head}</tr></thead>}
        {body && <tbody>{body}</tbody>}
        {foot && <tfoot><tr>{foot}</tr></tfoot>}
      </table>
    </div>
  )
};

export {
  Table,
  TableHead as Thead,
  TableFoot as Tfoot,
  TableCol as Tcol,
  TableRow as Trow,
  TableGroup as Tgroup
};