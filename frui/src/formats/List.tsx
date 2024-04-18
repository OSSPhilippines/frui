//types
import type { HTMLLinkProps } from '../types';

/**
 * List Props
 */
export type ListProps = HTMLLinkProps & { value: (string|number)[], ordered?: boolean };

/**
 * List Format Component (Main)
 */
export default function List(props: ListProps) {
  const { value, ordered, className, style = {} } = props;
  const classNames = ['format-list'];
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