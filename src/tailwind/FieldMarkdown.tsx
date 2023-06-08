//types
import type { FieldMarkdownProps } from '../types';
//react
import React from 'react';
//using react-dom/server to render markdown... on the client side
import { renderToStaticMarkup } from 'react-dom/server';
//hooks
import useMarkdown from '../hooks/useFieldMarkdown';
//components
import Markdown from 'markdown-to-jsx';
import FieldTextarea from './FieldTextarea';
import Button from './Button';

/**
 * Form Markdown Component (Main)
 */
const FieldMarkdown: React.FC<FieldMarkdownProps> = (props) => {
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

  const markdown = renderToStaticMarkup(<Markdown children={value} />);

  return (
    <div>
      <div className="text-right">
        <Button muted={mode === 'edit'} onClick={() => handlers.mode('edit')} className="text-lg">✎</Button>
        <Button muted={mode === 'preview'} onClick={() => handlers.mode('preview')} className="text-lg">⚎</Button>
      </div>
      <div className={mode === 'edit' ? 'block' : 'hidden'}>
        <FieldTextarea {...attributes} rows={rows} defaultValue={defaultValue} onUpdate={handlers.update} />
      </div>
      <iframe className={previewStyles} srcDoc={markdown} />
    </div>
  );
};

export default FieldMarkdown;