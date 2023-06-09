//types
import type { 
  TableColProps,
  TableFootProps,
  TableHeadProps,
  TableRowProps,
  TableRuleProps,
  TableProps
} from '../types';
import { ReactNode } from 'react';
//react
import React from 'react';

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
    const props = this.props;
    const style = Object.assign({}, props.style || {}, {
      borderColor: 'black',
      borderStyle: 'solid',
      borderTopWidth: '1px',
      paddingBottom: '16px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '16px'
    });
    if (props.stickyBottom) {
      style.position = 'sticky';
      style.zIndex = 1;
      style.bottom = 0;
    } 
    if (props.stickyLeft) {
      style.position = 'sticky';
      style.zIndex = 2;
      style.left = 0;
    }
    if (props.stickyRight) {
      style.position = 'sticky';
      style.zIndex = 2;
      style.right = 0;
    }
    if (props.stickyTop) {
      style.position = 'sticky';
      style.zIndex = 1;
      style.top = 0;
    }
    if (props.noWrap) {
      style.whiteSpace = 'nowrap';
    }

    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }

    let rule = null;
    if (props.wrap1) {
      rule = (<Rule width="100px" />);
    } else if (props.wrap2) {
      rule = (<Rule width="200px" />);
    } else if (props.wrap3) {
      rule = (<Rule width="300px" />);
    } else if (props.wrap4) {
      rule = (<Rule width="400px" />);
    } else if (props.wrap5) {
      rule = (<Rule width="500px" />);
    } 

    return (
      <td valign="top" className={props.className} style={style} {...extras}>
        {props.children}
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
    const props = this.props;
    const style = Object.assign({}, props.style || {}, {
      borderColor: 'black',
      borderStyle: 'solid',
      borderTopWidth: '1px',
      paddingBottom: '16px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '16px'
    });

    if (props.stickyBottom) {
      style.position = 'sticky';
      style.zIndex = 1;
      style.bottom = 0;
    } 
    if (props.stickyLeft) {
      style.position = 'sticky';
      style.zIndex = 2;
      style.left = 0;
    }
    if (props.stickyRight) {
      style.position = 'sticky';
      style.zIndex = 2;
      style.right = 0;
    }
    if (props.noWrap) {
      style.whiteSpace = 'nowrap';
    }

    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }

    return (
      <th className={props.className} style={style} {...extras}>
        {props.children}
      </th>
    );
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
    const props = this.props;
    const style = Object.assign({}, props.style || {}, {
      paddingBottom: '16px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '16px'
    });

    if (props.noWrap) {
      style.whiteSpace = 'nowrap';
    }
  
    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }
  
    return (
      <tr className={props.className} style={style} {...extras}>
        {props.children}
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
    const props = this.props;
    const style = Object.assign({}, props.style || {}, {
      borderColor: 'black',
      borderStyle: 'solid',
      borderTopWidth: '1px',
      paddingBottom: '16px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '16px'
    });

    if (props.stickyLeft) {
      style.position = 'sticky';
      style.zIndex = 2;
      style.left = 0;
    }
    if (props.stickyRight) {
      style.position = 'sticky';
      style.zIndex = 2;
      style.right = 0;
    }
    if (props.stickyTop) {
      style.position = 'sticky';
      style.top = '-top-px';
      if (props.stickyLeft && props.stickyRight) {
        style.zIndex = 4;
      } else if (props.stickyLeft || props.stickyRight) {
        style.zIndex = 3;
      } else {
        style.zIndex = 1;
      }
    }
    if (props.noWrap) {
      style.whiteSpace = 'nowrap';
    }

    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }

    return (
      <th className={props.className} style={style} {...extras}>
        {props.children}
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
const Table: React.FC<TableProps> = function Table(props) {
  let children = props.children || []
  if (!Array.isArray(children)) {
    children = [ children ];
  }
  const head = getHead(children)
  const body = getBody(children)
  const foot = getFoot(children)

  return (
    <div className="overflow-auto flex-grow h-full w-full">
      <table className="border-spacing-0 w-full">
        {head && <thead><tr>{head}</tr></thead>}
        {body && <tbody>{body}</tbody>}
        {foot && <tfoot><tr>{foot}</tr></tfoot>}
      </table>
    </div>
  )
};

export default Table;

export {
  Table,
  TableHead as Thead,
  TableFoot as Tfoot,
  TableCol as Tcol,
  TableRow as Trow
};