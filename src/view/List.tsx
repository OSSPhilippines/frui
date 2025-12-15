//--------------------------------------------------------------------//
// Imports

//types
import type { HTMLLinkProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type ListProps = HTMLLinkProps & { 
  value: (string|number)[], ordered?: boolean 
};

//--------------------------------------------------------------------//
// Components

/**
 * List Format Component (Main)
 */
export function List(props: ListProps) {
  const { value, ordered, className, style = {} } = props;
  const classNames = ['frui-view-list'];
  if (className) {
    classNames.push(className);
  }
  if (ordered) {
    return (
      <ol className={classNames.join(' ')} style={style}>
        {value.map((value, i) => <li key={i}>{value}</li>)}
      </ol>
    );
  }
  return (
    <ul className={classNames.join(' ')} style={style}>
      {value.map((value, i) => <li key={i}>{value}</li>)}
    </ul>
  );
};

//defaults to list
export default List;