//--------------------------------------------------------------------//
// Imports

//types
import type { TextareaProps } from './Textarea.js';
//hooks
import { type ReactNode, useState } from 'react';
//components
import MarkdownFrame from 'markdown-to-jsx';
import Textarea from './Textarea.js';
import Button from '../Button.js';
//using react-dom/server to render markdown... on the client side
import { renderToStaticMarkup } from 'react-dom/server';

//--------------------------------------------------------------------//
// Types

export type MarkdownEditorConfig = {
  onUpdate?: Function
};

export type MarkdownEditorProps = TextareaProps;

//--------------------------------------------------------------------//
// Hooks

/**
 * Markdown Hook Aggregate
 */
export function useMarkdownEditor({ onUpdate }: MarkdownEditorConfig) {
  const [ mode, setMode ] = useState<'preview'|'edit'>('edit');
  
  return {
    mode,
    handlers: {
      mode: setMode,
      update: (value: string) => {
        onUpdate && onUpdate(value);
      }
    }
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Form Markdown Component (Main)
 */
export function MarkdownEditor(props: MarkdownEditorProps) {
  //props
  const {
    onUpdate,
    defaultValue,
    value,
    rows = 9,
    children,
    ...attributes
  } = props;
  //hooks
  const { mode, handlers } = useMarkdownEditor({ onUpdate });
  //variables
  // determine preview display
  const previewStyles = {
    display: mode === 'preview' ? 'block' : 'none'
  };
  // determine current markdown content
  const current = (children?.toString() 
    || value 
    || defaultValue
    || ''
  ) as string;
  // render markdown to static markup
  const markdown = renderToStaticMarkup(
    <MarkdownFrame children={current} /> as ReactNode
  );
  //render
  return (
    <div className="frui-form-markdown-editor">
      <div className="frui-form-markdown-editor-nav">
        <Button 
          muted={mode === 'edit'} 
          onClick={() => handlers.mode('edit')}
        >✎</Button>
        <Button 
          muted={mode === 'preview'} 
          onClick={() => handlers.mode('preview')}
        >⚎</Button>
      </div>
      <div style={{ display: mode === 'edit' ? 'block' : 'none'}}>
        <Textarea 
          {...attributes} 
          rows={rows} 
          value={value}
          defaultValue={defaultValue} 
          onUpdate={handlers.update} 
        />
      </div>
      <iframe 
        className="frui-form-markdown-editor-preview" 
        style={previewStyles} 
        srcDoc={markdown} 
      />
    </div>
  );
};

//defaults to markdown
export default Object.assign(MarkdownEditor, { useMarkdownEditor, use: useMarkdownEditor });