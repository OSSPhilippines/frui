//--------------------------------------------------------------------//
// Imports

//modules
import type { CSSProperties } from 'react';
import type { Highlighter } from 'shiki';
import type { Theme, Themes } from 'react-shiki';
import ShikiHighlighter from 'react-shiki';
//frui
import type { ClassStyleProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type CodeProps = ClassStyleProps & {
  addDefaultStyles?: boolean,
  children?: string,
  highlighter?: Highlighter,
  langClassName?: string,
  langStyle?: CSSProperties,
  language: string,
  numbers?: boolean,
  showLanguage?: boolean,
  showLineNumbers?: boolean,
  startingLineNumber?: number,
  tabindex?: number,
  theme?: Theme | Themes,
  value?: string
};

//--------------------------------------------------------------------//
// Components

/**
 * Code Component (Main)
 */
export function Code(props: CodeProps) {
  //props
  const { 
    children,
    value, 
    numbers,
    showLanguage = false, 
    theme = 'github-dark',
    ...attributes 
  } = props;
  attributes.showLineNumbers = typeof attributes.showLineNumbers === 'boolean' 
    ? attributes.showLineNumbers 
    : numbers;
  //render
  return (
    <ShikiHighlighter 
      {...attributes} 
      showLanguage={showLanguage} 
      theme={theme}
    >
      {children || value || ''}
    </ShikiHighlighter>
  );
};

//defaults to code highlighter
export default Code;