//types
import type { ImagelistProps } from '../types/formats';

export default function Imagelist(props: ImagelistProps) {
  const { value, className, ...attributes } = props;
  const classNames = ['format-imagelist'];
  if (className) {
    classNames.push(className);
  }
  return (
    <div className={classNames.join(' ')}>
      {value.map((value, i) => (
        <img key={i} {...attributes} src={value} />
      ))}
    </div>
  );
};