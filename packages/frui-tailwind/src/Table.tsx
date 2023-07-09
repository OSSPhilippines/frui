//types
import type { 
  TableColProps,
  TableFootProps,
  TableHeadProps,
  TableRowProps,
  TableRuleProps,
  TableProps
} from 'frui-core/dist/types/components';
import { ReactNode } from 'react';
//react
import React from 'react';

/**
 * Invisible Rule Component
 */
const Rule: React.FC<TableRuleProps> = ({ width }) => {
  return <hr className={`border-0 m-0 ${width}`} />
};

/**
 * Table Column Component
 */
class TableCol extends React.Component<TableColProps> {
  table() {
    return 'TableCol';
  }

  render() {
    const props = this.props
    const classNames: string[] = [ 'p-2 border-t border-black' ];

    const sticky: Record<string, any> = {};
    if (props.stickyBottom) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-1';
      sticky.bottom = 'bottom-0';
    } 
    if (props.stickyLeft) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-2';
      sticky.left = 'left-0';
    }
    if (props.stickyRight) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-2';
      sticky.right = 'right-0';
    }
    if (props.stickyTop) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-1';
      sticky.top = 'top-0';
    }

    if (Object.values(sticky).length) {
      classNames.push(Object.values(sticky).join(' '))
    }

    if (props.className) {
      classNames.push(props.className);
    }

    if (props.noWrap) {
      classNames.push('whitespace-nowrap');
    }

    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }

    let rule = null
    if (props.wrap1) {
      rule = <Rule width="w-[100px]" />
    } else if (props.wrap2) {
      rule = <Rule width="w-[200px]" />
    } else if (props.wrap3) {
      rule = <Rule width="w-[300px]" />
    } else if (props.wrap4) {
      rule = <Rule width="w-[400px]" />
    } else if (props.wrap5) {
      rule = <Rule width="w-[500px]" />
    } 

    return (
      <td valign="top" className={classNames.join(' ')} {...extras}>
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
    const props = this.props
    const classNames: string[] = [ 'p-2 border-t border-black' ];

    const sticky: Record<string, any> = {};
    if (props.stickyBottom) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-1';
      sticky.bottom = 'bottom-0';
    } 
    if (props.stickyLeft) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-2';
      sticky.left = 'left-0';
    }
    if (props.stickyRight) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-2';
      sticky.right = 'right-0';
    }

    if (Object.values(sticky).length) {
      classNames.push(Object.values(sticky).join(' '))
    }

    if (props.className) {
      classNames.push(props.className);
    }

    if (props.noWrap) {
      classNames.push('whitespace-nowrap');
    }

    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }

    return (
      <th className={classNames.join(' ')} {...extras}>
        {props.children}
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
    const props = this.props
    const classNames: string[] = [ 'p-2' ];

    if (props.noWrap) {
      classNames.push('whitespace-nowrap');
    }
  
    if (props.className) {
      classNames.push(props.className);
    }
  
    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }
  
    return (
      <tr className={classNames.join(' ')} {...extras}>
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
    const props = this.props
    const classNames: string[] = [ 'p-2 border-t border-black' ];

    const sticky: Record<string, any> = {};
    if (props.stickyLeft) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-2';
      sticky.left = 'left-0';
    }
    if (props.stickyRight) {
      sticky.position = 'sticky';
      sticky.zIndex = 'z-2';
      sticky.right = 'right-0';
    }
    if (props.stickyTop) {
      sticky.position = 'sticky';
      sticky.top = '-top-px';
      if (sticky.left && sticky.right) {
        sticky.zIndex = 'z-4';
      } else if (sticky.left || sticky.right) {
        sticky.zIndex = 'z-3';
      } else {
        sticky.zIndex = 'z-1';
      }
    }

    if (Object.values(sticky).length) {
      classNames.push(Object.values(sticky).join(' '))
    }

    if (props.className) {
      classNames.push(props.className);
    }

    if (props.noWrap) {
      classNames.push('whitespace-nowrap');
    }

    const extras: Record<string, number> = {};
    if ('rowSpan' in props) {
      extras.rowSpan = props.rowSpan || 0;
    }
    if ('colSpan' in props) {
      extras.colSpan = props.colSpan || 0;
    }

    return (
      <th className={classNames.join(' ')} {...extras}>
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
  TableRow as Trow,
  TableGroup as Tgroup
};