//types
import type { MarkdownProps } from '../types/fields';
//using react-dom/server to render markdown... on the client side
import { renderToStaticMarkup } from 'react-dom/server';
//hooks
import useMarkdown from '../hooks/useMarkdown';
//components
import MarkdownFrame from 'markdown-to-jsx';
import Textarea from './Textarea';
import Button from '../Button';

/**
 * Form Markdown Component (Main)
 */
export default function Markdown(props: MarkdownProps) {
  const {
    onUpdate,
    defaultValue,
    rows = 9,
    ...attributes
  } = props;
  //hooks
  const { value, mode, handlers } = useMarkdown({ 
    onUpdate, 
    defaultValue: defaultValue as string|undefined
  });

  const previewStyles = {
    display: mode === 'preview' ? 'block' : 'none'
  };

  const markdown = renderToStaticMarkup(
    <MarkdownFrame children={value} />
  );

  return (
    <div className="field-markdown">
      <div className="field-markdown-nav">
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
          defaultValue={defaultValue} 
          onUpdate={handlers.update} 
        />
      </div>
      <iframe 
        className="field-markdown-preview" 
        style={previewStyles} 
        srcDoc={markdown} 
      />
    </div>
  );
};