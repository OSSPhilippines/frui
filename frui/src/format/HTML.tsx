/**
 * HTML Props
 */
export type HTMLProps = { value: string };

/**
 * HTML Format Component (Main)
 */
export default function HTML({ value }: HTMLProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: value }} />
  );
};