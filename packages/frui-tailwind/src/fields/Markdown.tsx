//types
import type { MarkdownProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//using react-dom/server to render markdown... on the client side
import { renderToStaticMarkup } from 'react-dom/server';
//hooks
import useMarkdown from 'frui-core/dist/hooks/useMarkdown';
//components
import MarkdownFrame from 'markdown-to-jsx';
import Textarea from './Textarea';
import Button from '../Button';

/**
 * Form Markdown Component (Main)
 */
const Markdown: React.FC<MarkdownProps> = (props) => {
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

  const previewStyles = [
    mode === 'preview' ? 'block' : 'hidden',
    'boder',
    'border-black',
    'text-black',
    'padding-2',
    'w-full'
  ].join(' ');

  const markdown = renderToStaticMarkup(<MarkdownFrame children={value} />);

  return (
    <div>
      <div className="text-right">
        <Button muted={mode === 'edit'} onClick={() => handlers.mode('edit')} className="text-lg">✎</Button>
        <Button muted={mode === 'preview'} onClick={() => handlers.mode('preview')} className="text-lg">⚎</Button>
      </div>
      <div className={mode === 'edit' ? 'block' : 'hidden'}>
        <Textarea {...attributes} rows={rows} defaultValue={defaultValue} onUpdate={handlers.update} />
      </div>
      <iframe className={previewStyles} srcDoc={markdown} />
    </div>
  );
};

export default Markdown;