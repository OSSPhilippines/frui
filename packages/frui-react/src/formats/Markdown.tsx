//types
import type { MarkdownProps } from 'frui-core/dist/types/formats';
//react
import React from 'react';
//components
import MarkdownFrame from 'markdown-to-jsx';

const Markdown: React.FC<MarkdownProps> = ({ value }) => {
  return (
    <MarkdownFrame children={value} />
  );
};

export default Markdown;