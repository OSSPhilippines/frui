import { useEffect, useRef, useState } from 'react';

interface WYSIWYGProps {
  value?: string;
  history?: boolean;
  font?: boolean;
  size?: boolean;
  format?: boolean;
  paragraph?: boolean;
  blockquote?: boolean;
  style?: boolean;
  color?: boolean;
  highlight?: boolean;
  text?: boolean;
  textStyle?: boolean;
  remove?: boolean;
  indent?: boolean;
  align?: boolean;
  rule?: boolean;
  list?: boolean;
  lineheight?: boolean;
  table?: boolean;
  link?: boolean;
  image?: boolean;
  imageGallery?: boolean;
  video?: boolean;
  audio?: boolean;
  math?: boolean;
  fullscreen?: boolean;
  showblocks?: boolean;
  code?: boolean;
  preview?: boolean;
  print?: boolean;
  save?: boolean;
  template?: boolean;
  dir?: 'ltr' | 'rtl';
  onChange?: (value: string) => void;
  onUpdate?: (state: { value: string; action: string }) => void;
  [key: string]: any;
}

export default function WYSIWYG({
  value = '',
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
}: WYSIWYGProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML && !isCodeView) {
      editorRef.current.innerHTML = value;
      setCurrentValue(value);
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = value;
      }
    }
  }, [value, isCodeView]);

  const handleInput = () => {
    if (editorRef.current && hiddenInputRef.current) {
      const content = editorRef.current.innerHTML;
      hiddenInputRef.current.value = content;
      setCurrentValue(content);
      onChange?.(content);
      onUpdate?.({ value: content, action: 'input' });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCodeView || !editorRef.current) return;
    const target = e.target as HTMLElement;
    const link = target.closest('a[href]');
    if (link && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const execCommand = (command: string, value?: string) => {
    if (!editorRef.current || isCodeView) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    editorRef.current.focus();
    handleInput();
    onUpdate?.({ value: editorRef.current.innerHTML || '', action: command });
  };

  const handleListOrdered = () => execCommand('insertOrderedList');
  const handleListUnordered = () => execCommand('insertUnorderedList');
  const handleUndo = () => execCommand('undo');
  const handleRedo = () => execCommand('redo');
  
  const handleFont = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCommand('fontName', e.target.value);
    e.target.value = '';
  };

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCommand('fontSize', e.target.value);
    e.target.value = '';
  };

  const handleFormat = (e: React.ChangeEvent<HTMLSelectElement>) => execCommand('formatBlock', e.target.value);
  const handleParagraph = () => execCommand('formatBlock', 'p');
  const handleBlockquote = () => execCommand('formatBlock', 'blockquote');
  const handleBold = () => execCommand('bold');
  const handleItalic = () => execCommand('italic');
  const handleUnderline = () => execCommand('underline');
  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => execCommand('foreColor', e.target.value);
  const handleHighlight = (e: React.ChangeEvent<HTMLInputElement>) => execCommand('hiliteColor', e.target.value);
  const handleStrikethrough = () => execCommand('strikeThrough');
  const handleSubscript = () => execCommand('subscript');
  const handleSuperscript = () => execCommand('superscript');

  const handleTextStyle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const style = e.target.value;
    if (!editorRef.current || isCodeView) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const fragment = range.extractContents();
      const styleSpans = fragment.querySelectorAll('span[class*="__frui-wysiwyg-t-"]');
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
    handleInput();
    e.target.value = '';
  };

  const handleRemoveFormat = () => {
    if (!editorRef.current || isCodeView) return;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = document.createElement('div');
      container.appendChild(range.cloneContents());
      const styledElements = container.querySelectorAll('b, i, u, strike, sub, sup, font, span[style], span[class*="__frui-wysiwyg-t-"]');
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
    handleInput();
    onUpdate?.({ value: editorRef.current.innerHTML || '', action: 'removeFormat' });
  };

  const handleIndent = () => execCommand('indent');
  const handleOutdent = () => execCommand('outdent');
  const handleAlignLeft = () => execCommand('justifyLeft');
  const handleAlignCenter = () => execCommand('justifyCenter');
  const handleAlignRight = () => execCommand('justifyRight');
  const handleRule = () => execCommand('insertHorizontalRule');
  const handleLineHeight = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editorRef.current && !isCodeView) {
      editorRef.current.style.lineHeight = e.target.value;
      handleInput();
    }
  };
  const handleTable = () => {
    if (isCodeView) return;
    const rows = prompt('Enter number of rows', '2');
    const cols = prompt('Enter number of columns', '2');
    if (rows && cols && !isNaN(+rows) && !isNaN(+cols)) {
      const tableHTML = `<table border="1">${Array.from({ length: parseInt(rows) }, () =>
        `<tr>${Array.from({ length: parseInt(cols) }, () => '<td> </td>').join('')}</tr>`
      ).join('')}</table>`;
      execCommand('insertHTML', tableHTML);
    }
  };
  const handleLink = () => {
    if (isCodeView) return;
    const url = prompt('Enter URL', 'https://');
    if (url && /^https?:\/\//.test(url)) execCommand('createLink', url);
  };
  const handleImage = () => fileInputRef.current?.click();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCodeView) return;
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => execCommand('insertImage', reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleImageGallery = () => galleryInputRef.current?.click();
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCodeView) return;
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => execCommand('insertImage', reader.result as string);
          reader.readAsDataURL(file);
        }
      });
    }
  };
  const handleVideo = () => {
    if (isCodeView) return;
    const url = prompt('Enter video URL (e.g., YouTube embed)', '');
    if (url && /^https?:\/\//.test(url)) {
      execCommand('insertHTML', `<iframe src="${url}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`);
    }
  };
  const handleAudio = () => {
    if (isCodeView) return;
    const url = prompt('Enter audio URL', '');
    if (url && /^https?:\/\//.test(url)) {
      execCommand('insertHTML', `<audio controls src="${url}"></audio>`);
    }
  };
  const handleMath = () => {
    if (isCodeView) return;
    const expr = prompt('Enter math expression (e.g., x^2)', '');
    if (expr) {
      execCommand('insertHTML', `<span class="frui-wysiwyg-math">[Math: ${expr}]</span>`);
    }
  };
  const handleFullscreen = () => {
    if (editorRef.current) {
      if (!document.fullscreenElement) {
        editorRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };
  const handleShowBlocks = () => {
    if (editorRef.current && !isCodeView) {
      editorRef.current.classList.toggle('frui-wysiwyg-show-block');
    }
  };
  const handleCodeViewToggle = () => {
    if (editorRef.current && textareaRef.current && hiddenInputRef.current) {
      if (!isCodeView) {
        textareaRef.current.value = editorRef.current.innerHTML;
        hiddenInputRef.current.value = editorRef.current.innerHTML;
        textareaRef.current.style.display = 'block';
        editorRef.current.style.display = 'none';
      } else {
        editorRef.current.innerHTML = textareaRef.current.value;
        hiddenInputRef.current.value = textareaRef.current.value;
        textareaRef.current.style.display = 'none';
        editorRef.current.style.display = 'block';
      }
      setIsCodeView(!isCodeView);
      setCurrentValue(!isCodeView ? textareaRef.current.value : editorRef.current.innerHTML);
      onChange?.(!isCodeView ? textareaRef.current.value : editorRef.current.innerHTML);
      onUpdate?.({ value: !isCodeView ? textareaRef.current.value : editorRef.current.innerHTML, action: 'codeViewToggle' });
    }
  };
  const handlePreview = () => {
    if (editorRef.current) {
      const win = window.open('', '_blank');
      win?.document.write(`<html><body>${editorRef.current.innerHTML}</body></html>`);
      win?.document.close();
    }
  };
  const handlePrint = () => window.print();
  const handleSave = () => {
    if (editorRef.current) {
      const blob = new Blob([editorRef.current.innerHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'editor-content.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  };
  const handleTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateHTML = e.target.value;
    if (templateHTML && !isCodeView) execCommand('insertHTML', templateHTML);
    e.target.value = '';
  };
  const handleDirToggle = () => {
    if (editorRef.current && !isCodeView) {
      const currentDir = editorRef.current.getAttribute('dir') || 'ltr';
      editorRef.current.setAttribute('dir', currentDir === 'ltr' ? 'rtl' : 'ltr');
      handleInput();
    }
  };
  const handleDirLTR = () => {
    if (editorRef.current && !isCodeView) {
      editorRef.current.setAttribute('dir', 'ltr');
      handleInput();
    }
  };
  const handleDirRTL = () => {
    if (editorRef.current && !isCodeView) {
      editorRef.current.setAttribute('dir', 'rtl');
      handleInput();
    }
  };

  return (
    <div className={`frui-wysiwyg ${dir === 'rtl' ? 'frui-wysiwyg-rtl' : ''}`}>
      <div className="frui-wysiwyg-toolbar">
        {history && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleUndo} title="Undo" aria-label="Undo" disabled={isCodeView}>
              <i className="fas fa-fw fa-undo"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleRedo} title="Redo" aria-label="Redo" disabled={isCodeView}>
              <i className="fas fa-fw fa-redo"></i>
            </button>
          </div>
        )}
        {font && (
          <div className="frui-wysiwyg-btn-module">
            <select 
              className="frui-wysiwyg-btn-select" 
              onChange={handleFont} 
              title="Font" 
              aria-label="Font"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>Font</option>
              <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
              <option value="Comic Sans MS" style={{ fontFamily: 'Comic Sans MS' }}>Comic Sans MS</option>
              <option value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
              <option value="Impact" style={{ fontFamily: 'Impact' }}>Impact</option>
              <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
              <option value="Tahoma" style={{ fontFamily: 'Tahoma' }}>Tahoma</option>
              <option value="Trebuchet MS" style={{ fontFamily: 'Trebuchet MS' }}>Trebuchet MS</option>
              <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
            </select>
          </div>
        )}
        {size && (
          <div className="frui-wysiwyg-btn-module">
            <select 
              className="frui-wysiwyg-btn-select" 
              onChange={handleSize} 
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
              onChange={handleFormat} 
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
            <button className="frui-wysiwyg-btn" onClick={handleParagraph} title="Paragraph" aria-label="Paragraph" disabled={isCodeView}>
              <i className="fas fa-fw fa-paragraph"></i>
            </button>
          </div>
        )}
        {blockquote && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleBlockquote} title="Blockquote" aria-label="Blockquote" disabled={isCodeView}>
              <i className="fas fa-fw fa-quote-right"></i>
            </button>
          </div>
        )}
        {style && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleBold} title="Bold" aria-label="Bold" disabled={isCodeView}>
              <i className="fas fa-fw fa-bold"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleItalic} title="Italic" aria-label="Italic" disabled={isCodeView}>
              <i className="fas fa-fw fa-italic"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleUnderline} title="Underline" aria-label="Underline" disabled={isCodeView}>
              <i className="fas fa-fw fa-underline"></i>
            </button>
          </div>
        )}
        {color && (
          <div className="frui-wysiwyg-btn-module">
            <input
              type="color"
              onChange={handleColor}
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
              onChange={handleHighlight}
              title="Highlight"
              aria-label="Highlight"
              style={{ width: '34px', height: '34px', padding: 0, border: 'none' }}
              disabled={isCodeView}
            />
          </div>
        )}
        {text && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleStrikethrough} title="Strikethrough" aria-label="Strikethrough" disabled={isCodeView}>
              <i className="fas fa-fw fa-strikethrough"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleSubscript} title="Subscript" aria-label="Subscript" disabled={isCodeView}>
              <i className="fas fa-fw fa-subscript"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleSuperscript} title="Superscript" aria-label="Superscript" disabled={isCodeView}>
              <i className="fas fa-fw fa-superscript"></i>
            </button>
          </div>
        )}
        {textStyle && (
          <div className="frui-wysiwyg-btn-module">
            <select 
              className="frui-wysiwyg-btn-select" 
              onChange={handleTextStyle} 
              title="Text Style" 
              aria-label="Text Style"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>T Style</option>
              <option value="code" style={{ backgroundColor: '#f9f9f9', border: '1px solid #e1e1e1', padding: '0 4px' }}>Code</option>
              <option value="translucent" style={{ opacity: 0.6 }}>Translucent</option>
              <option value="shadow" style={{ textShadow: '2px 2px 2px #b1b1b1' }}>Shadow</option>
              <option value="spaced" style={{ letterSpacing: '2px', wordSpacing: '4px' }}>Spaced</option>
              <option value="bordered" style={{ border: '2px solid #000', padding: '2px 6px' }}>Bordered</option>
              <option value="neon" style={{ textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #ff00de', color: '#fff', backgroundColor: '#000', padding: '2px 6px' }}>NEON</option>
            </select>
          </div>
        )}
        {remove && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleRemoveFormat} title="Remove Format" aria-label="Remove Format" disabled={isCodeView}>
              <i className="fas fa-fw fa-eraser"></i>
            </button>
          </div>
        )}
        {indent && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleIndent} title="Indent" aria-label="Indent" disabled={isCodeView}>
              <i className="fas fa-fw fa-indent"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleOutdent} title="Outdent" aria-label="Outdent" disabled={isCodeView}>
              <i className="fas fa-fw fa-outdent"></i>
            </button>
          </div>
        )}
        {align && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleAlignLeft} title="Align Left" aria-label="Align Left" disabled={isCodeView}>
              <i className="fas fa-fw fa-align-left"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleAlignCenter} title="Align Center" aria-label="Align Center" disabled={isCodeView}>
              <i className="fas fa-fw fa-align-center"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleAlignRight} title="Align Right" aria-label="Align Right" disabled={isCodeView}>
              <i className="fas fa-fw fa-align-right"></i>
            </button>
          </div>
        )}
        {rule && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleRule} title="Horizontal Rule" aria-label="Horizontal Rule" disabled={isCodeView}>
              <i className="fas fa-fw fa-minus"></i>
            </button>
          </div>
        )}
        {list && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleListOrdered} title="Ordered List" aria-label="Ordered List" disabled={isCodeView}>
              <i className="fas fa-fw fa-list-ol"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleListUnordered} title="Unordered List" aria-label="Unordered List" disabled={isCodeView}>
              <i className="fas fa-fw fa-list-ul"></i>
            </button>
          </div>
        )}
        {lineheight && (
          <div className="frui-wysiwyg-btn-module">
            <select 
              className="frui-wysiwyg-btn-select" 
              onChange={handleLineHeight} 
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
            <button className="frui-wysiwyg-btn" onClick={handleTable} title="Table" aria-label="Insert Table" disabled={isCodeView}>
              <i className="fas fa-fw fa-table"></i>
            </button>
          </div>
        )}
        {link && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleLink} title="Link" aria-label="Insert Link" disabled={isCodeView}>
              <i className="fas fa-fw fa-link"></i>
            </button>
          </div>
        )}
        {image && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleImage} title="Image" aria-label="Insert Image" disabled={isCodeView}>
              <i className="fas fa-fw fa-image"></i>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>
        )}
        {imageGallery && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleImageGallery} title="Image Gallery" aria-label="Insert from Gallery" disabled={isCodeView}>
              <i className="fas fa-fw fa-images"></i>
            </button>
            <input
              type="file"
              ref={galleryInputRef}
              onChange={handleGalleryUpload}
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              aria-hidden="true"
            />
          </div>
        )}
        {video && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleVideo} title="Video" aria-label="Insert Video" disabled={isCodeView}>
              <i className="fas fa-fw fa-video"></i>
            </button>
          </div>
        )}
        {audio && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleAudio} title="Audio" aria-label="Insert Audio" disabled={isCodeView}>
              <i className="fas fa-fw fa-volume-up"></i>
            </button>
          </div>
        )}
        {math && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleMath} title="Math" aria-label="Insert Math" disabled={isCodeView}>
              <i className="fas fa-fw fa-square-root-alt"></i>
            </button>
          </div>
        )}
        {fullscreen && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleFullscreen} title="Fullscreen" aria-label="Toggle Fullscreen">
              <i className="fas fa-fw fa-expand"></i>
            </button>
          </div>
        )}
        {showblocks && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleShowBlocks} title="Show Blocks" aria-label="Toggle Block Visibility" disabled={isCodeView}>
              <i className="fas fa-fw fa-border-all"></i>
            </button>
          </div>
        )}
        {code && (
          <div className="frui-wysiwyg-btn-module">
            <button 
              className="frui-wysiwyg-btn" 
              onClick={handleCodeViewToggle} 
              title={isCodeView ? "WYSIWYG View" : "Code View"} 
              aria-label={isCodeView ? "Switch to WYSIWYG View" : "Switch to Code View"}
            >
              <i className={`fas fa-fw ${isCodeView ? 'fa-eye' : 'fa-code'}`}></i>
            </button>
          </div>
        )}
        {preview && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handlePreview} title="Preview" aria-label="Preview Content">
              <i className="fas fa-fw fa-eye"></i>
            </button>
          </div>
        )}
        {print && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handlePrint} title="Print" aria-label="Print">
              <i className="fas fa-fw fa-print"></i>
            </button>
          </div>
        )}
        {save && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleSave} title="Save" aria-label="Save as HTML">
              <i className="fas fa-fw fa-save"></i>
            </button>
          </div>
        )}
        {template && (
          <div className="frui-wysiwyg-btn-module">
            <select 
              className="frui-wysiwyg-btn-select" 
              onChange={handleTemplate} 
              title="Template" 
              aria-label="Insert Template"
              defaultValue=""
              disabled={isCodeView}
            >
              <option value="" disabled>Template</option>
              <option value="<p><strong>Header</strong><br>Content</p>">Simple Block</option>
              <option value="<table border='1'><tr><td>Cell</td></tr></table>">Table Block</option>
            </select>
          </div>
        )}
        {dir && (
          <div className="frui-wysiwyg-btn-module">
            <button className="frui-wysiwyg-btn" onClick={handleDirToggle} title="Toggle Direction" aria-label="Toggle Text Direction" disabled={isCodeView}>
              <i className="fas fa-fw fa-exchange-alt"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleDirLTR} title="Left to Right" aria-label="Left to Right" disabled={isCodeView}>
              <i className="fas fa-fw fa-long-arrow-alt-left"></i>
            </button>
            <button className="frui-wysiwyg-btn" onClick={handleDirRTL} title="Right to Left" aria-label="Right to Left" disabled={isCodeView}>
              <i className="fas fa-fw fa-long-arrow-alt-right"></i>
            </button>
          </div>
        )}
      </div>
      <input
        type="hidden"
        ref={hiddenInputRef}
        value={currentValue}
        {...attributes}
      />
      <div
        ref={editorRef}
        className="frui-wysiwyg-editable"
        contentEditable={!isCodeView}
        onInput={handleInput}
        onClick={handleClick}
        dir={dir}
        aria-label="Rich Text Editor"
      />
      <textarea 
        ref={textareaRef} 
        style={{ 
          display: isCodeView ? 'block' : 'none',
          width: '100%',
          minHeight: '200px',
          padding: '16px',
          fontFamily: 'monospace',
          fontSize: '13px',
          backgroundColor: '#f9f9f9',
          border: 'none',
          resize: 'vertical'
        }} 
        onChange={(e) => {
          if (isCodeView && hiddenInputRef.current) {
            hiddenInputRef.current.value = e.target.value;
            setCurrentValue(e.target.value);
            onChange?.(e.target.value);
            onUpdate?.({ value: e.target.value, action: 'input' });
          }
        }}
        defaultValue={value}
      />
    </div>
  );
}