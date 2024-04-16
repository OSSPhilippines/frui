//types
import type { MarkdownProps } from '../types/formats';
//components
import MarkdownFrame from 'markdown-to-jsx';

export default function Markdown({ value }: MarkdownProps) {
  return (
    <MarkdownFrame children={value} />
  );
};