//types
import type { TaglistProps } from '../types/formats';
//components
import Badge from '../Badge';

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