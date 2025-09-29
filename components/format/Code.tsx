//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
import type { Highlighter } from 'shiki';
import type { Theme, Themes } from 'react-shiki';
import ShikiHighlighter from 'react-shiki';
//frui
import type { HTMLProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type CodeProps = HTMLProps & {
  addDefaultStyles?: boolean,
  highlighter?: Highlighter,
  langClassName?: string,
  langStyle?: CSSProperties,
  language: string,
  showLanguage?: boolean,
  showLineNumbers?: boolean,
  startingLineNumber?: number,
  tabindex?: number,
  theme?: Theme | Themes,
  value: string
};

//--------------------------------------------------------------------//
// Components

export function Code(props: CodeProps) {
  //props
  const { 
    value, 
    showLanguage = false, 
    theme = 'github-dark',
    ...attributes 
  } = props;
  //render
  return (
    <ShikiHighlighter 
      {...attributes} 
      showLanguage={showLanguage} 
      theme={theme}
    >
      {value}
    </ShikiHighlighter>
  );
};