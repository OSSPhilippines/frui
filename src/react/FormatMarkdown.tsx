//types
import type { FormatMarkdownProps } from '../types';
//react
import React from 'react';
//components
import Markdown from 'markdown-to-jsx';

const FormatMarkdown: React.FC<FormatMarkdownProps> = ({ value }) => {
  return (
    <Markdown children={value} />
  );
};

export default FormatMarkdown;