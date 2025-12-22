//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
//frui
import TextEditor, { useTextEditor } from '../../src/form/TextEditor.js';

//--------------------------------------------------------------------//
// Mocks

Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: vi.fn(() => ({
    rangeCount: 1,
    removeAllRanges: vi.fn(),
    addRange: vi.fn(),
    getRangeAt: vi.fn(() => ({
      extractContents: vi.fn(() => {
        const frag = document.createDocumentFragment();
        const span = document.createElement('span');
        span.className = '__frui-form-text-editor-t-code';
        span.textContent = 'text';
        frag.appendChild(span);
        return frag;
      }),
      insertNode: vi.fn(),
      deleteContents: vi.fn(),
      cloneContents: vi.fn(() => {
        const frag = document.createDocumentFragment();
        const b = document.createElement('b');
        b.textContent = 'bold';
        frag.appendChild(b);
        return frag;
      }),
      selectNodeContents: vi.fn()
    }))
  }))
});

Object.defineProperty(document, 'execCommand', {
  configurable: true,
  writable: true,
  value: vi.fn(() => true)
});

global.prompt = vi.fn();

global.FileReader = class {
  onload: (() => void) | null = null;
  readAsDataURL() {
    if (this.onload) {
      setTimeout(() => {
        (this as unknown as { result: string }).result =
          'data:image/png;base64,ABC';
        this.onload?.();
      }, 0);
    }
  }
} as unknown as typeof FileReader;

Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(() => ({
    document: {
      write: vi.fn(),
      close: vi.fn()
    }
  }))
});

Object.defineProperty(window, 'print', {
  writable: true,
  value: vi.fn()
});

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: vi.fn(() => 'blob:mock-url')
});

Object.defineProperty(URL, 'revokeObjectURL', {
  writable: true,
  value: vi.fn()
});

//--------------------------------------------------------------------//
// Helpers

function setupHook(config = {}) {
  let hookResult: ReturnType<typeof useTextEditor>;
  function TestComponent() {
    hookResult = useTextEditor(config);
    return null;
  }
  render(<TestComponent />);
  return hookResult!;
}

function createFile(name: string, type: string) {
  return new File([ 'content' ], name, { type });
}

//--------------------------------------------------------------------//
// Tests

describe('TextEditor', () => {
  describe('rendering', () => {
    it('renders base structure', () => {
      render(<TextEditor />);
      expect(
        document.querySelector('.frui-form-text-editor')
      ).toBeInTheDocument();
      expect(
        document.querySelector('.frui-form-text-editor-editable')
      ).toBeInTheDocument();
    });

    it('applies rtl direction class', () => {
      render(<TextEditor dir="rtl" />);
      expect(
        document.querySelector('.frui-form-text-editor-rtl')
      ).toBeInTheDocument();
    });

    it('renders toolbar with enabled features', () => {
      render(<TextEditor history style table />);
      expect(screen.getByTitle('Undo')).toBeInTheDocument();
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
      expect(screen.getByTitle('Table')).toBeInTheDocument();
    });

    it('renders all toolbar features', () => {
      render(
        <TextEditor
          history
          font
          size
          format
          paragraph
          blockquote
          style
          color
          highlight
          text
          textStyle
          remove
          indent
          align
          rule
          list
          lineheight
          table
          link
          code
          preview
          print
          save
        />
      );
      expect(screen.getByTitle('Undo')).toBeInTheDocument();
      expect(screen.getByTitle('Font')).toBeInTheDocument();
      expect(screen.getByTitle('Bold')).toBeInTheDocument();
    });
  });

  describe('formatting commands', () => {
    it('executes bold, italic, underline', () => {
      render(<TextEditor style />);
      fireEvent.click(screen.getByTitle('Bold'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'bold',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Italic'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'italic',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Underline'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'underline',
        false,
        undefined
      );
    });

    it('executes text formatting', () => {
      render(<TextEditor text />);
      fireEvent.click(screen.getByTitle('Strikethrough'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'strikeThrough',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Subscript'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'subscript',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Superscript'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'superscript',
        false,
        undefined
      );
    });

    it('executes block formatting', () => {
      render(<TextEditor paragraph blockquote />);
      fireEvent.click(screen.getByTitle('Paragraph'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'formatBlock',
        false,
        'p'
      );
      fireEvent.click(screen.getByTitle('Blockquote'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'formatBlock',
        false,
        'blockquote'
      );
    });

    it('executes list commands', () => {
      render(<TextEditor list />);
      fireEvent.click(screen.getByTitle('Ordered List'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertOrderedList',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Unordered List'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertUnorderedList',
        false,
        undefined
      );
    });

    it('executes indent commands', () => {
      render(<TextEditor indent />);
      fireEvent.click(screen.getByTitle('Indent'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'indent',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Outdent'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'outdent',
        false,
        undefined
      );
    });

    it('executes alignment commands', () => {
      render(<TextEditor align />);
      fireEvent.click(screen.getByTitle('Align Left'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'justifyLeft',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Align Center'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'justifyCenter',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Align Right'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'justifyRight',
        false,
        undefined
      );
    });

    it('inserts horizontal rule', () => {
      render(<TextEditor rule />);
      fireEvent.click(screen.getByTitle('Horizontal Rule'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHorizontalRule',
        false,
        undefined
      );
    });

    it('executes history commands', () => {
      render(<TextEditor history />);
      fireEvent.click(screen.getByTitle('Undo'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'undo',
        false,
        undefined
      );
      fireEvent.click(screen.getByTitle('Redo'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'redo',
        false,
        undefined
      );
    });
  });

  describe('selectors', () => {
    it('changes font', () => {
      render(<TextEditor font />);
      fireEvent.change(screen.getByTitle('Font'), {
        target: { value: 'Arial' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'fontName',
        false,
        'Arial'
      );
    });

    it('changes font size', () => {
      render(<TextEditor size />);
      fireEvent.change(screen.getByTitle('Size'), {
        target: { value: '16px' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'fontSize',
        false,
        '16px'
      );
    });

    it('changes block format', () => {
      render(<TextEditor format />);
      fireEvent.change(screen.getByTitle('Format'), {
        target: { value: 'h1' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'formatBlock',
        false,
        'h1'
      );
    });

    it('changes text color', () => {
      render(<TextEditor color />);
      fireEvent.change(screen.getByTitle('Text Color'), {
        target: { value: '#ff0000' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'foreColor',
        false,
        '#ff0000'
      );
    });

    it('changes highlight color', () => {
      render(<TextEditor highlight />);
      fireEvent.change(screen.getByTitle('Highlight'), {
        target: { value: '#ffff00' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'hiliteColor',
        false,
        '#ffff00'
      );
    });

    it('changes line height', () => {
      render(<TextEditor lineheight />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      fireEvent.change(screen.getByTitle('Line Height'), {
        target: { value: '1.5' }
      });
      expect(editable.style.lineHeight).toBe('1.5');
    });
  });

  describe('text style and formatting', () => {
    it('applies text style', () => {
      render(<TextEditor textStyle />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      editable.innerHTML = 'Sample';
      fireEvent.change(screen.getByTitle('Text Style'), {
        target: { value: 'code' }
      });
      expect(editable).toBeInTheDocument();
    });

    it('removes format', () => {
      const onUpdate = vi.fn();
      render(<TextEditor remove onUpdate={onUpdate} />);
      fireEvent.click(screen.getByTitle('Remove Format'));
      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'removeFormat' })
      );
    });
  });

  describe('media insertion', () => {
    it('creates table with prompt', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce('2')
        .mockReturnValueOnce('3');
      render(<TextEditor table />);
      fireEvent.click(screen.getByTitle('Table'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHTML',
        false,
        expect.stringContaining('<table')
      );
    });

    it('does not create table when cancelled', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce(null);
      render(<TextEditor table />);
      fireEvent.click(screen.getByTitle('Table'));
      expect(document.execCommand).not.toHaveBeenCalledWith(
        'insertHTML',
        expect.anything(),
        expect.stringContaining('<table')
      );
    });

    it('inserts link with prompt', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce('https://example.com');
      render(<TextEditor link />);
      fireEvent.click(screen.getByTitle('Link'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'createLink',
        false,
        'https://example.com'
      );
    });

    it('does not insert link with invalid URL', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce('invalid-url');
      render(<TextEditor link />);
      fireEvent.click(screen.getByTitle('Link'));
      expect(document.execCommand).not.toHaveBeenCalledWith(
        'createLink',
        expect.anything(),
        'invalid-url'
      );
    });

    it('uploads and inserts image', async () => {
      render(<TextEditor image />);
      const fileInput = document.querySelector(
        'input[type="file"][accept="image/*"]:not([multiple])'
      ) as HTMLInputElement;
      const file = createFile('test.png', 'image/png');
      await act(async () => {
        fireEvent.change(fileInput, { target: { files: [ file ] } });
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertImage',
        false,
        'data:image/png;base64,ABC'
      );
    });

    it('uploads multiple images from gallery', async () => {
      render(<TextEditor imageGallery />);
      const fileInput = document.querySelector(
        'input[type="file"][accept="image/*"][multiple]'
      ) as HTMLInputElement;
      const file1 = createFile('test1.png', 'image/png');
      const file2 = createFile('test2.png', 'image/png');
      await act(async () => {
        fireEvent.change(fileInput, {
          target: { files: [ file1, file2 ] }
        });
        await new Promise((resolve) => setTimeout(resolve, 10));
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertImage',
        false,
        'data:image/png;base64,ABC'
      );
    });

    it('inserts video with prompt', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce('https://youtube.com/embed/abc');
      render(<TextEditor video />);
      fireEvent.click(screen.getByTitle('Video'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHTML',
        false,
        expect.stringContaining('<iframe')
      );
    });

    it('inserts audio with prompt', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce('https://example.com/audio.mp3');
      render(<TextEditor audio />);
      fireEvent.click(screen.getByTitle('Audio'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHTML',
        false,
        expect.stringContaining('<audio')
      );
    });

    it('inserts math expression', () => {
      (global.prompt as ReturnType<typeof vi.fn>)
        .mockReturnValueOnce('x^2');
      render(<TextEditor math />);
      fireEvent.click(screen.getByTitle('Math'));
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHTML',
        false,
        expect.stringContaining('[Math: x^2]')
      );
    });

    it('inserts template', () => {
      render(<TextEditor template />);
      fireEvent.change(screen.getByTitle('Template'), {
        target: { value: '<p><strong>Header</strong><br>Content</p>' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHTML',
        false,
        '<p><strong>Header</strong><br>Content</p>'
      );
    });
  });

  describe('utility features', () => {
    it('toggles show blocks', () => {
      render(<TextEditor showblocks />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      fireEvent.click(screen.getByTitle('Show Blocks'));
      expect(
        editable.classList.contains('frui-form-text-editor-show-block')
      ).toBe(true);
    });

    it('opens preview window', () => {
      render(<TextEditor preview value="<p>Preview</p>" />);
      fireEvent.click(screen.getByTitle('Preview'));
      expect(window.open).toHaveBeenCalledWith('', '_blank');
    });

    it('triggers print', () => {
      render(<TextEditor print />);
      fireEvent.click(screen.getByTitle('Print'));
      expect(window.print).toHaveBeenCalled();
    });

    it('saves content as HTML file', () => {
      render(<TextEditor save value="<p>Save</p>" />);
      fireEvent.click(screen.getByTitle('Save'));
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('code view', () => {
    it('toggles code view', () => {
      render(<TextEditor code value="<p>Test</p>" />);
      fireEvent.click(
        screen.getByLabelText('Switch to Code View')
      );
      const textarea = document.querySelector('textarea');
      expect(textarea).toBeVisible();
      expect(textarea?.value).toBe('<p>Test</p>');
    });

    it('updates content in code view', () => {
      const onChange = vi.fn();
      render(<TextEditor code onChange={onChange} />);
      fireEvent.click(
        screen.getByLabelText('Switch to Code View')
      );
      const textarea = document.querySelector('textarea')!;
      fireEvent.change(textarea, {
        target: { value: '<p>New</p>' }
      });
      expect(onChange).toHaveBeenCalledWith('<p>New</p>');
    });

    it('disables buttons in code view', () => {
      render(<TextEditor code style />);
      fireEvent.click(
        screen.getByLabelText('Switch to Code View')
      );
      expect(screen.getByTitle('Bold')).toBeDisabled();
    });

    it('switches back to WYSIWYG view', () => {
      render(<TextEditor code />);
      fireEvent.click(
        screen.getByLabelText('Switch to Code View')
      );
      fireEvent.click(
        screen.getByLabelText('Switch to TextEditor View')
      );
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      );
      expect(editable).toBeVisible();
    });
  });

  describe('text direction', () => {
    it('toggles text direction', () => {
      render(<TextEditor dir="ltr" />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      fireEvent.click(screen.getByTitle('Toggle Direction'));
      expect(editable.getAttribute('dir')).toBe('rtl');
    });

    it('sets LTR direction', () => {
      render(<TextEditor dir="rtl" />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      fireEvent.click(screen.getByTitle('Left to Right'));
      expect(editable.getAttribute('dir')).toBe('ltr');
    });

    it('sets RTL direction', () => {
      render(<TextEditor dir="ltr" />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      fireEvent.click(screen.getByTitle('Right to Left'));
      expect(editable.getAttribute('dir')).toBe('rtl');
    });
  });

  describe('event handling', () => {
    it('handles click on links with ctrl key', () => {
      render(
        <TextEditor value='<a href="https://example.com">Link</a>' />
      );
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      )!;
      const link = editable.querySelector('a')!;
      fireEvent.click(link, { ctrlKey: true });
      expect(window.open).toHaveBeenCalledWith(
        'https://example.com',
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('handles click on links with meta key', () => {
      render(
        <TextEditor value='<a href="https://example.com">Link</a>' />
      );
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      )!;
      const link = editable.querySelector('a')!;
      fireEvent.click(link, { metaKey: true });
      expect(window.open).toHaveBeenCalled();
    });

    it('calls onChange when content changes', () => {
      const onChange = vi.fn();
      render(<TextEditor onChange={onChange} />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      editable.innerHTML = '<p>Changed</p>';
      fireEvent.input(editable);
      expect(onChange).toHaveBeenCalledWith('<p>Changed</p>');
    });

    it('calls onUpdate with action', () => {
      const onUpdate = vi.fn();
      render(<TextEditor onUpdate={onUpdate} style />);
      fireEvent.click(screen.getByTitle('Bold'));
      expect(onUpdate).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'bold' })
      );
    });
  });

  describe('value synchronization', () => {
    it('syncs hidden input with content', () => {
      render(<TextEditor name="editor" />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      const hidden = document.querySelector(
        'input[type="hidden"]'
      ) as HTMLInputElement;
      editable.innerHTML = '<p>Content</p>';
      fireEvent.input(editable);
      expect(hidden.value).toBe('<p>Content</p>');
    });

    it('updates editor when value prop changes', () => {
      const { rerender } = render(
        <TextEditor value="<p>Initial</p>" />
      );
      rerender(<TextEditor value="<p>Updated</p>" />);
      const editable = document.querySelector(
        '.frui-form-text-editor-editable'
      ) as HTMLDivElement;
      expect(editable.innerHTML).toBe('<p>Updated</p>');
    });

    it('passes attributes to hidden input', () => {
      render(<TextEditor name="editor" data-test="value" />);
      const hidden = document.querySelector(
        'input[type="hidden"]'
      ) as HTMLInputElement;
      expect(hidden.name).toBe('editor');
      expect(hidden.getAttribute('data-test')).toBe('value');
    });
  });
});

describe('useTextEditor', () => {
  it('initializes with provided value', () => {
    const hook = setupHook({ value: '<p>Sample</p>' });
    expect(hook.value).toBe('<p>Sample</p>');
  });

  it('updates value on input', () => {
    const onChange = vi.fn();
    const hook = setupHook({ onChange });
    hook.refs.editor.current = document.createElement('div');
    hook.refs.hidden.current = document.createElement('input');
    hook.refs.editor.current.innerHTML = '<p>New</p>';
    act(() => {
      hook.handlers.input();
    });
    expect(onChange).toHaveBeenCalledWith('<p>New</p>');
  });

  it('execCommand triggers onUpdate', () => {
    const onUpdate = vi.fn();
    const hook = setupHook({ onUpdate });
    hook.refs.editor.current = document.createElement('div');
    hook.refs.hidden.current = document.createElement('input');
    hook.refs.editor.current.innerHTML = '<p>Test</p>';
    act(() => {
      hook.handlers.execCommand('bold');
    });
    expect(document.execCommand).toHaveBeenCalledWith(
      'bold',
      false,
      undefined
    );
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'bold' })
    );
  });

  it('toggles code view', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const hook = setupHook({ onChange, onUpdate });
    hook.refs.editor.current = document.createElement('div');
    hook.refs.textarea.current = document.createElement('textarea');
    hook.refs.hidden.current = document.createElement('input');
    hook.refs.editor.current.innerHTML = '<p>Test</p>';
    hook.refs.textarea.current.value = '<p>Test</p>';
    hook.refs.editor.current.style.display = 'block';
    hook.refs.textarea.current.style.display = 'none';
    act(() => {
      hook.blocks.codeViewToggle();
    });
    expect(hook.refs.textarea.current.style.display).toBe('block');
    expect(hook.refs.editor.current.style.display).toBe('none');
    expect(onChange).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'codeViewToggle' })
    );
  });

  it('handles change in code view', () => {
    const onChange = vi.fn();
    const hook = setupHook({ onChange });
    hook.refs.hidden.current = document.createElement('input');
    act(() => {
      hook.handlers.change({
        target: { value: '<p>Changed</p>' }
      } as never);
    });
    expect(hook.refs.hidden.current.value).toBe('');
  });
});