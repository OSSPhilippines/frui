//--------------------------------------------------------------------//
// Imports

//modules
import MarkdownFrame from 'markdown-to-jsx';

//--------------------------------------------------------------------//
// Types

export type MarkdownProps = { value: string };

//--------------------------------------------------------------------//
// Components

/**
 * Markdown Format Component (Main)
 */
export function Markdown({ value }: MarkdownProps) {
  return (
    <MarkdownFrame children={value} />
  );
};

//defaults to markdown
export default Markdown;