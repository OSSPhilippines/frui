//--------------------------------------------------------------------//
// Imports

import type { ChangeEvent, MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

//--------------------------------------------------------------------//
// Types

export type WYSIWYGConfig = {
  value?: string,
  onChange?: (value: string) => void,
  onUpdate?: (state: { value: string; action: string }) => void,
};

export type WYSIWYGProps = {
  value?: string,
  history?: boolean,
  font?: boolean,
  size?: boolean,
  format?: boolean,
  paragraph?: boolean,
  blockquote?: boolean,
  style?: boolean,
  color?: boolean,
  highlight?: boolean,
  text?: boolean,
  textStyle?: boolean,
  remove?: boolean,
  indent?: boolean,
  align?: boolean,
  rule?: boolean,
  list?: boolean,
  lineheight?: boolean,
  table?: boolean,
  link?: boolean,
  image?: boolean,
  imageGallery?: boolean,
  video?: boolean,
  audio?: boolean,
  math?: boolean,
  fullscreen?: boolean,
  showblocks?: boolean,
  code?: boolean,
  preview?: boolean,
  print?: boolean,
  save?: boolean,
  template?: boolean,
  dir?: 'ltr' | 'rtl',
  onChange?: (value: string) => void,
  onUpdate?: (state: { value: string; action: string }) => void,
  [key: string]: any
};

//--------------------------------------------------------------------//
// Hooks

export function useWYSIWYG(config: WYSIWYGConfig) {
  const { 
    value = '',
    onChange,
    onUpdate
  } = config;
  
  const [ isCodeView, setIsCodeView ] = useState(false);
  const [ currentValue, setCurrentValue ] = useState(value);

  useEffect(() => {
    if (refs.editor.current 
      && typeof value === 'string'
      && value !== refs.editor.current.innerHTML 
      && !isCodeView
    ) {
      refs.editor.current.innerHTML = value;
      setCurrentValue(value);
      if (refs.hidden.current) {
        refs.hidden.current.value = value;
      }
    }
  }, [ value, isCodeView ]);

  const refs = {
    editor: useRef<HTMLDivElement>(null),
    textarea: useRef<HTMLTextAreaElement>(null),
    hidden: useRef<HTMLInputElement>(null),
    file: useRef<HTMLInputElement>(null),
    gallery: useRef<HTMLInputElement>(null)
  };

  const blocks = {
    listOrdered: () => handlers.execCommand('insertOrderedList'),
    listUnordered: () => handlers.execCommand('insertUnorderedList'),
    undo: () => handlers.execCommand('undo'),
    redo: () => handlers.execCommand('redo'),
    font(e: ChangeEvent<HTMLSelectElement>) {
      handlers.execCommand('fontName', e.target.value);
      e.target.value = '';
    },
    size(e: ChangeEvent<HTMLSelectElement>) {
      handlers.execCommand('fontSize', e.target.value);
      e.target.value = '';
    },
    format(e: ChangeEvent<HTMLSelectElement>) {
      handlers.execCommand('formatBlock', e.target.value);
    },
    paragraph: () => handlers.execCommand('formatBlock', 'p'),
    blockquote: () => handlers.execCommand('formatBlock', 'blockquote'),
    bold: () => handlers.execCommand('bold'),
    italic: () => handlers.execCommand('italic'),
    underline: () => handlers.execCommand('underline'),
    color(e: ChangeEvent<HTMLInputElement>) {
      handlers.execCommand('foreColor', e.target.value);
    },
    highlight(e: ChangeEvent<HTMLInputElement>) {
      handlers.execCommand('hiliteColor', e.target.value);
    },
    strikethrough: () => handlers.execCommand('strikeThrough'),
    subscript: () => handlers.execCommand('subscript'),
    superscript: () => handlers.execCommand('superscript'),
    textStyle(e: ChangeEvent<HTMLSelectElement>) {
      const style = e.target.value;
      if (!refs.editor.current || isCodeView) return;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const fragment = range.extractContents();
        const styleSpans = fragment.querySelectorAll(
          'span[class*="__frui-wysiwyg-t-"]'
        );
        styleSpans.forEach(span => {
          const parent = span.parentNode;
          while (span.firstChild) {
            parent?.insertBefore(span.firstChild, span);
          }
          parent?.removeChild(span);
        });
        const span = document.createElement('span');
        span.className = `__frui-wysiwyg-t-${style}`;
        span.appendChild(fragment);
        range.insertNode(span);
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.selectNodeContents(span);
        selection.addRange(newRange);
      }
      handlers.input();
      e.target.value = '';
    },
    removeFormat: () => {
      if (!refs.editor.current || isCodeView) return;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const container = document.createElement('div');
        container.appendChild(range.cloneContents());
        const styledElements = container.querySelectorAll(
          'b, i, u, strike, sub, sup, font, span[style], '
          + 'span[class*="__frui-wysiwyg-t-"]'
        );
        styledElements.forEach(element => {
          const textNode = document.createTextNode(element.textContent || '');
          element.parentNode?.replaceChild(textNode, element);
        });
        container.normalize();
        const p = document.createElement('p');
        p.innerHTML = container.innerHTML || ' ';
        range.deleteContents();
        range.insertNode(p);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      handlers.input();
      onUpdate && onUpdate({ 
        value: refs.editor.current.innerHTML || '', 
        action: 'removeFormat' 
      });
    },
    indent: () => handlers.execCommand('indent'),
    outdent: () => handlers.execCommand('outdent'),
    alignLeft: () => handlers.execCommand('justifyLeft'),
    alignCenter: () => handlers.execCommand('justifyCenter'),
    alignRight: () => handlers.execCommand('justifyRight'),
    rule: () => handlers.execCommand('insertHorizontalRule'),
    lineHeight(e: ChangeEvent<HTMLSelectElement>) {
      if (refs.editor.current && !isCodeView) {
        refs.editor.current.style.lineHeight = e.target.value;
        handlers.input();
      }
    },
    table() {
      if (isCodeView) return;
      const rows = prompt('Enter number of rows', '2');
      const cols = prompt('Enter number of columns', '2');
      if (rows && cols && !isNaN(+rows) && !isNaN(+cols)) {
        const tableHTML = `<table border="1">${Array.from({ length: parseInt(rows) }, () =>
          `<tr>${Array.from({ length: parseInt(cols) }, () => '<td> </td>').join('')}</tr>`
        ).join('')}</table>`;
        handlers.execCommand('insertHTML', tableHTML);
      }
    },
    link() {
      if (isCodeView) return;
      const url = prompt('Enter URL', 'https://');
      if (url && /^https?:\/\//.test(url)) handlers.execCommand('createLink', url);
    },
    image: () => refs.file.current?.click(),
    imageUpload(e: ChangeEvent<HTMLInputElement>) {
      if (isCodeView) return;
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => handlers.execCommand('insertImage', reader.result as string);
        reader.readAsDataURL(file);
      }
    },
    imageGallery: () => refs.gallery.current?.click(),
    galleryUpload(e: ChangeEvent<HTMLInputElement>) {
      if (isCodeView) return;
      const files = e.target.files;
      if (files) {
        Array.from(files).forEach((file) => {
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => handlers.execCommand('insertImage', reader.result as string);
            reader.readAsDataURL(file);
          }
        });
      }
    },
    video() {
      if (isCodeView) return;
      const url = prompt('Enter video URL (e.g., YouTube embed)', '');
      if (url && /^https?:\/\//.test(url)) {
        handlers.execCommand('insertHTML', `<iframe src="${url}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`);
      }
    },
    audio() {
      if (isCodeView) return;
      const url = prompt('Enter audio URL', '');
      if (url && /^https?:\/\//.test(url)) {
        handlers.execCommand('insertHTML', `<audio controls src="${url}"></audio>`);
      }
    },
    math() {
      if (isCodeView) return;
      const expr = prompt('Enter math expression (e.g., x^2)', '');
      if (expr) {
        handlers.execCommand('insertHTML', `<span class="frui-wysiwyg-math">[Math: ${expr}]</span>`);
      }
    },
    fullscreen: () => {
      if (refs.editor.current) {
        if (!document.fullscreenElement) {
          refs.editor.current.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    },
    showBlocks() {
      if (refs.editor.current && !isCodeView) {
        refs.editor.current.classList.toggle('frui-wysiwyg-show-block');
      }
    },
    codeViewToggle() {
      if (refs.editor.current && refs.textarea.current && refs.hidden.current) {
        if (!isCodeView) {
          refs.textarea.current.value = refs.editor.current.innerHTML;
          refs.hidden.current.value = refs.editor.current.innerHTML;
          refs.textarea.current.style.display = 'block';
          refs.editor.current.style.display = 'none';
        } else {
          refs.editor.current.innerHTML = refs.textarea.current.value;
          refs.hidden.current.value = refs.textarea.current.value;
          refs.textarea.current.style.display = 'none';
          refs.editor.current.style.display = 'block';
        }
        setIsCodeView(!isCodeView);
        setCurrentValue(!isCodeView ? refs.textarea.current.value : refs.editor.current.innerHTML);
        onChange && onChange(!isCodeView ? refs.textarea.current.value : refs.editor.current.innerHTML);
        onUpdate && onUpdate({ value: !isCodeView ? refs.textarea.current.value : refs.editor.current.innerHTML, action: 'codeViewToggle' });
      }
    },
    preview() {
      if (refs.editor.current) {
        const win = window.open('', '_blank');
        win?.document.write(`<html><body>${refs.editor.current.innerHTML}</body></html>`);
        win?.document.close();
      }
    },
    print: () => window.print(),
    save() {
      if (refs.editor.current) {
        const blob = new Blob([refs.editor.current.innerHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'editor-content.html';
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    template(e: ChangeEvent<HTMLSelectElement>) {
      const templateHTML = e.target.value;
      if (templateHTML && !isCodeView) handlers.execCommand('insertHTML', templateHTML);
      e.target.value = '';
    },
    dirToggle() {
      if (refs.editor.current && !isCodeView) {
        const currentDir = refs.editor.current.getAttribute('dir') || 'ltr';
        refs.editor.current.setAttribute('dir', currentDir === 'ltr' ? 'rtl' : 'ltr');
        handlers.input();
      }
    },
    dirLTR() {
      if (refs.editor.current && !isCodeView) {
        refs.editor.current.setAttribute('dir', 'ltr');
        handlers.input();
      }
    },
    dirRTL() {
      if (refs.editor.current && !isCodeView) {
        refs.editor.current.setAttribute('dir', 'rtl');
        handlers.input();
      }
    }
  };

  const handlers = {
    change(e: ChangeEvent<HTMLTextAreaElement>) {
      if (isCodeView && refs.hidden.current) {
        refs.hidden.current.value = e.target.value;
        setCurrentValue(e.target.value);
        onChange?.(e.target.value);
        onUpdate?.({ value: e.target.value, action: 'input' });
      }  
    },
    input() {
      if (refs.editor.current && refs.hidden.current) {
        const content = refs.editor.current.innerHTML;
        refs.hidden.current.value = content;
        setCurrentValue(content);
        onChange?.(content);
        onUpdate?.({ value: content, action: 'input' });
      }
    },
    click(e: MouseEvent<HTMLDivElement>) {
      if (isCodeView || !refs.editor.current) return;
      const target = e.target as HTMLElement;
      const link = target.closest('a[href]');
      if (link && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
    },
    execCommand(command: string, value?: string) {
      if (!refs.editor.current || isCodeView) return;
      refs.editor.current.focus();
      document.execCommand(command, false, value);
      refs.editor.current.focus();
      handlers.input();
      onUpdate?.({ value: refs.editor.current.innerHTML || '', action: command });
    }
  };

  return { refs, blocks, handlers, isCodeView, value: currentValue };
};

//--------------------------------------------------------------------//
// Components

export function WYSIWYG(props: WYSIWYGProps) {
  const {
    history,
    font,
    size,
    format,
    paragraph,
    blockquote,
    style,
    color,
    highlight,
    text,
    textStyle,
    remove,
    indent,
    align,
    rule,
    list,
    lineheight,
    table,
    link,
    image,
    imageGallery,
    video,
    audio,
    math,
    fullscreen,
    showblocks,
    code,
    preview,
    print,
    save,
    template,
    dir,
    onChange,
    onUpdate,
    ...attributes
  } = props;

  const { 
    refs, 
    blocks, 
    handlers, 
    value,
    isCodeView
  } = useWYSIWYG({
    value: props.value,
    onChange,
    onUpdate
  });

  return (
    <div className={`frui-wysiwyg ${dir === 'rtl' ? 'frui-wysiwyg-rtl' : ''}`}>
      <div className="frui-wysiwyg-toolbar">
        {history && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.undo} 
              title="Undo" 
              aria-label="Undo" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-undo"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.redo} 
              title="Redo" 
              aria-label="Redo" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-redo"></i>
            </button>
          </div>
        )}
        {font && (
          <div className="frui-wysiwyg-btn-module">
            <select
              className="frui-wysiwyg-btn-select"
              onChange={blocks.font}
              title="Font"
              aria-label="Font"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>
                Font
              </option>
              <option value="Arial" style={{ fontFamily: 'Arial' }}>
                Arial
              </option>
              <option value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>
                Comic Sans MS
              </option>
              <option value="Courier New" style={{ fontFamily: 'Courier New' }}>
                Courier New
              </option>
              <option value="Impact" style={{ fontFamily: 'Impact' }}>
                Impact
              </option>
              <option value="Georgia" style={{ fontFamily: 'Georgia' }}>
                Georgia
              </option>
              <option value="Tahoma" style={{ fontFamily: 'Tahoma' }}>
                Tahoma
              </option>
              <option value="Trebuchet MS" style={{ fontFamily: 'Trebuchet MS' }}>
                Trebuchet MS
              </option>
              <option value="Verdana" style={{ fontFamily: 'Verdana' }}>
                Verdana
              </option>
            </select>
          </div>
        )}
        {size && (
          <div className="frui-wysiwyg-btn-module">
            <select
              className="frui-wysiwyg-btn-select"
              onChange={blocks.size}
              title="Size"
              aria-label="Font Size"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>Size</option>
              <option value="8px">8px</option>
              <option value="9px">9px</option>
              <option value="10px">10px</option>
              <option value="11px">11px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="22px">22px</option>
              <option value="24px">24px</option>
              <option value="26px">26px</option>
              <option value="28px">28px</option>
              <option value="36px">36px</option>
              <option value="48px">48px</option>
              <option value="72px">72px</option>
            </select>
          </div>
        )}
        {format && (
          <div className="frui-wysiwyg-btn-module">
            <select
              className="frui-wysiwyg-btn-select"
              onChange={blocks.format}
              title="Format"
              aria-label="Block Format"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>Format</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
              <option value="p">Paragraph</option>
              <option value="pre">Code</option>
            </select>
          </div>
        )}
        {paragraph && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.paragraph} 
              title="Paragraph" 
              aria-label="Paragraph" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-paragraph"></i>
            </button>
          </div>
        )}
        {blockquote && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.blockquote} 
              title="Blockquote" 
              aria-label="Blockquote" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-quote-right"></i>
            </button>
          </div>
        )}
        {style && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.bold} 
              title="Bold" 
              aria-label="Bold" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-bold"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.italic} 
              title="Italic" 
              aria-label="Italic" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-italic"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.underline} 
              title="Underline" 
              aria-label="Underline" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-underline"></i>
            </button>
          </div>
        )}
        {color && (
          <div className="frui-wysiwyg-btn-module">
            <input
              type="color"
              onChange={blocks.color}
              title="Text Color"
              aria-label="Text Color"
              style={{ width: '34px', height: '34px', padding: 0, border: 'none' }}
              disabled={isCodeView}
            />
          </div>
        )}
        {highlight && (
          <div className="frui-wysiwyg-btn-module">
            <input
              type="color"
              onChange={blocks.highlight}
              title="Highlight"
              aria-label="Highlight"
              style={{ width: '34px', height: '34px', padding: 0, border: 'none' }}
              disabled={isCodeView}
            />
          </div>
        )}
        {text && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.strikethrough} 
              title="Strikethrough" 
              aria-label="Strikethrough" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-strikethrough"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.subscript} 
              title="Subscript" 
              aria-label="Subscript" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-subscript"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.superscript} 
              title="Superscript" 
              aria-label="Superscript" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-superscript"></i>
            </button>
          </div>
        )}
        {textStyle && (
          <div className="frui-wysiwyg-btn-module">
            <select
              className="frui-wysiwyg-btn-select"
              onChange={blocks.textStyle}
              title="Text Style"
              aria-label="Text Style"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>T Style</option>
              <option 
                value="code" 
                style={{ backgroundColor: '#F9F9F9', 
                border: '1px solid #E1E1E1', padding: '0 4px' }}
              >
                Code
              </option>
              <option 
                value="translucent" 
                style={{ opacity: 0.6 }}
              >
                Translucent
              </option>
              <option 
                value="shadow" 
                style={{ textShadow: '2px 2px 2px #B1B1B1' }}
              >
                Shadow
              </option>
              <option 
                value="spaced" 
                style={{ 
                  letterSpacing: '2px', 
                  wordSpacing: '4px' 
                }}
              >
                  Spaced
              </option>
              <option 
                value="bordered" 
                style={{ 
                  border: '2px solid #000000', 
                  padding: '2px 6px' 
                }}
              >
                Bordered
              </option>
              <option 
                value="neon" 
                style={{ 
                  textShadow: '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 20px #FF00DE', 
                  color: '#FFFFFF', 
                  backgroundColor: '#000000', 
                  padding: '2px 6px' 
                }}
              >
                NEON
              </option>
            </select>
          </div>
        )}
        {remove && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.removeFormat} 
              title="Remove Format" 
              aria-label="Remove Format" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-eraser"></i>
            </button>
          </div>
        )}
        {indent && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.indent} 
              title="Indent" 
              aria-label="Indent" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-indent"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.outdent} 
              title="Outdent" 
              aria-label="Outdent" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-outdent"></i>
            </button>
          </div>
        )}
        {align && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.alignLeft} 
              title="Align Left" 
              aria-label="Align Left" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-align-left"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.alignCenter} 
              title="Align Center" 
              aria-label="Align Center" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-align-center"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.alignRight} 
              title="Align Right" 
              aria-label="Align Right" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-align-right"></i>
            </button>
          </div>
        )}
        {rule && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.rule} 
              title="Horizontal Rule" 
              aria-label="Horizontal Rule" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-minus"></i>
            </button>
          </div>
        )}
        {list && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.listOrdered} 
              title="Ordered List" 
              aria-label="Ordered List" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-list-ol"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.listUnordered} 
              title="Unordered List" 
              aria-label="Unordered List" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-list-ul"></i>
            </button>
          </div>
        )}
        {lineheight && (
          <div className="frui-wysiwyg-btn-module">
            <select
              className="frui-wysiwyg-btn-select"
              onChange={blocks.lineHeight}
              title="Line Height"
              aria-label="Line Height"
              defaultValue="1"
              disabled={isCodeView}
            >
              <option value="1">1</option>
              <option value="1.15">1.15</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
          </div>
        )}
        {table && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.table} 
              title="Table" 
              aria-label="Insert Table" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-table"></i>
            </button>
          </div>
        )}
        {link && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.link} 
              title="Link" 
              aria-label="Insert Link" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-link"></i>
            </button>
          </div>
        )}
        {image && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.image} 
              title="Image" 
              aria-label="Insert Image" disabled={isCodeView}>
              <i className="fas fa-fw fa-image"></i>
            </button>
            <input
              type="file"
              ref={refs.file}
              onChange={blocks.imageUpload}
              accept="image/*"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>
        )}
        {imageGallery && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.imageGallery} 
              title="Image Gallery" 
              aria-label="Insert from Gallery" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-images"></i>
            </button>
            <input
              type="file"
              ref={refs.gallery}
              onChange={blocks.galleryUpload}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>
        )}
        {video && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.video} 
              title="Video" 
              aria-label="Insert Video" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-video"></i>
            </button>
          </div>
        )}
        {audio && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.audio} 
              title="Audio" 
              aria-label="Insert Audio" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-volume-up"></i>
            </button>
          </div>
        )}
        {math && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.math} 
              title="Math" 
              aria-label="Insert Math" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-square-root-alt"></i>
            </button>
          </div>
        )}
        {fullscreen && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.fullscreen} 
              title="Fullscreen" 
              aria-label="Toggle Fullscreen"
            >
              <i className="fas fa-fw fa-expand"></i>
            </button>
          </div>
        )}
        {showblocks && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.showBlocks} 
              title="Show Blocks" 
              aria-label="Toggle Block Visibility" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-border-all"></i>
            </button>
          </div>
        )}
        {code && (
          <div className="frui-wysiwyg-btn-module">
            <button
              className="frui-wysiwyg-btn"
              onClick={blocks.codeViewToggle}
              title={isCodeView ? 'WYSIWYG View' : 'Code View'}
              aria-label={isCodeView 
                ? 'Switch to WYSIWYG View' 
                : 'Switch to Code View'
              }
            >
              <i className={`fas fa-fw ${isCodeView ? 'fa-eye' : 'fa-code'}`}></i>
            </button>
          </div>
        )}
        {preview && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.preview} 
              title="Preview" 
              aria-label="Preview Content"
            >
              <i className="fas fa-fw fa-eye"></i>
            </button>
          </div>
        )}
        {print && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.print} 
              title="Print" 
              aria-label="Print"
            >
              <i className="fas fa-fw fa-print"></i>
            </button>
          </div>
        )}
        {save && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.save} 
              title="Save" 
              aria-label="Save as HTML"
            >
              <i className="fas fa-fw fa-save"></i>
            </button>
          </div>
        )}
        {template && (
          <div className="frui-wysiwyg-btn-module">
            <select
              className="frui-wysiwyg-btn-select"
              onChange={blocks.template}
              title="Template"
              aria-label="Insert Template"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>Template</option>
              <option value="<p><strong>Header</strong><br>Content</p>">
                Simple Block
              </option>
              <option value="<table border='1'><tr><td>Cell</td></tr></table>">
                Table Block
              </option>
            </select>
          </div>
        )}
        {dir && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.dirToggle} 
              title="Toggle Direction" 
              aria-label="Toggle Text Direction" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-exchange-alt"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.dirLTR} 
              title="Left to Right" 
              aria-label="Left to Right" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-long-arrow-alt-left"></i>
            </button>
            <button 
              className="frui-wysiwyg-btn" 
              onClick={blocks.dirRTL} 
              title="Right to Left" 
              aria-label="Right to Left" 
              disabled={isCodeView}
            >
              <i className="fas fa-fw fa-long-arrow-alt-right"></i>
            </button>
          </div>
        )}
      </div>
      <input
        type="hidden"
        ref={refs.hidden}
        value={value}
        {...attributes}
      />
      <div
        ref={refs.editor}
        className="frui-wysiwyg-editable"
        contentEditable={!isCodeView}
        onInput={handlers.input}
        onClick={handlers.click}
        dir={dir}
        aria-label="Rich Text Editor"
      />
      <textarea
        ref={refs.textarea}
        style={{
          display: isCodeView ? 'block' : 'none',
          width: '100%',
          minHeight: '200px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '13px',
          backgroundColor: '#F9F9F9',
          border: 'none',
          resize: 'vertical'
        }}
        onChange={handlers.change}
        defaultValue={value}
      />
    </div>
  );
};

//defaults to wysiwyg
export default WYSIWYG;