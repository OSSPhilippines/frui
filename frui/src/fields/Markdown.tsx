//types
import type { TextareaProps } from './Textarea';
//hooks
import { useState } from 'react';
//components
import MarkdownFrame from 'markdown-to-jsx';
import Textarea from './Textarea';
import Button from '../Button';
//using react-dom/server to render markdown... on the client side
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * Markdown Config
 */
export type MarkdownConfig = {
  onUpdate?: Function
};

/**
 * Markdown Props
 */
export type MarkdownProps = TextareaProps;

/**
 * Markdown Hook Aggregate
 */
export function useMarkdown({ onUpdate }: MarkdownConfig) {
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
}

/**
 * Form Markdown Component (Main)
 */
export default function Markdown(props: MarkdownProps) {
  const {
    onUpdate,
    defaultValue,
    value,
    rows = 9,
    children,
    ...attributes
  } = props;
  //hooks
  const { mode, handlers } = useMarkdown({ onUpdate });

  const previewStyles = {
    display: mode === 'preview' ? 'block' : 'none'
  };

  const current = (children?.toString() 
    || value 
    || defaultValue
    || ''
  ) as string;

  const markdown = renderToStaticMarkup(
    <MarkdownFrame children={current} />
  );

  return (
    <div className="frui-field-markdown">
      <div className="frui-field-markdown-nav">
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
        className="frui-field-markdown-preview" 
        style={previewStyles} 
        srcDoc={markdown} 
      />
    </div>
  );
};