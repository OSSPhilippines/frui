//types
import type { BadgeProps } from '../Badge';
//components
import Badge from '../Badge';

/**
 * Taglist Props
 */
export type TaglistProps = BadgeProps & { value: (string|number)[] };

/**
 * Taglist Format Component (Main)
 */
export default function Taglist(props: TaglistProps) {
  const { value, ...attributes } = props;
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {value.map((value, i) => (
        <Badge key={i} {...attributes}>{value}</Badge>
      ))}
    </span>
  );
};