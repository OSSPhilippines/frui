import type { CSSProperties } from 'react';
/**
 * ProgressBar Props
 */
export type ProgressBarProps = {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * ProgressBar Component
 */
export default function ProgressBar(props: ProgressBarProps) {
  const {
    value,
    max = 100,
    color,
    className,
    style
  } = props;

  const percent = Math.min(100, (value / max) * 100);

  const progressClasses = ['frui-progress'];
  const barClasses = ['frui-progress-bar'];

  if (className) {
    progressClasses.push(className);
    barClasses.push(className); 
  }

  const barStyle: CSSProperties = {
    width: `${percent}%`,
    backgroundColor: color || 'currentColor', // Still allow color prop
    ...style // Still allow custom inline styles
  };

  return (
    <div className={progressClasses.join(' ')}>
      <div className={barClasses.join(' ')} style={barStyle}></div>
    </div>
  );
}