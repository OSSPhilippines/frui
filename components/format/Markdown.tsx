//types
export type MarkdownProps = { value: string };
//components
import MarkdownFrame from 'markdown-to-jsx';

/**
 * Markdown Format Component (Main)
 */
export default function Markdown({ value }: MarkdownProps) {
  return (
    <MarkdownFrame children={value} />
  );
};