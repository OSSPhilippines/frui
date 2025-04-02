//types
import type { CSSProperties } from 'react';

/**
 * Loader Props
 */
export type LoaderProps = {
  color?: string,
  show?: boolean,
  label?: string,
  style?: CSSProperties,
  className?: string,
};

/**
 * Loader Component (Main)
 */
const Loader = (props: LoaderProps): JSX.Element => {
  const { show, color, label, style = {}, className } = props;
  style.borderColor = color || '#666666';
  const container: Record<string, string> = {};
  if (show === false) {
    container.display = 'none';
  }
  const classNames = ['frui-loader'];
  if (className) {
    classNames.push(className);
  }
  return (
    <div style={container}>
      <span className={classNames.join(' ')} style={style} />
      {label}
    </div>
  );
};

export default Loader;