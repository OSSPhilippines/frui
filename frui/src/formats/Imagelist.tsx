//types
import type { HTMLImageProps } from '../types';

/**
 * Imagelist Props
 */
export type ImagelistProps = HTMLImageProps & { value: string[] };

/**
 * Imagelist Format Component (Main)
 */
export default function Imagelist(props: ImagelistProps) {
  const { value, className, ...attributes } = props;
  const classNames = ['frui-format-imagelist'];
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