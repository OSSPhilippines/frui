//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import WYSIWYG from '../../frui/src/field/WYSIWYG.js';

//--------------------------------------------------------------------//
// Mocks

Object.assign(document, {
  execCommand: vi.fn()
});

Object.assign(window, {
  getSelection: vi.fn(() => ({
    rangeCount: 1,
    getRangeAt: vi.fn(() => ({
      extractContents: vi.fn(() => ({
        querySelectorAll: vi.fn(() => [])
      })),
      cloneContents: vi.fn(() => document.createElement('div')),
      deleteContents: vi.fn(),
      insertNode: vi.fn(),
      selectNodeContents: vi.fn()
    })),
    removeAllRanges: vi.fn(),
    addRange: vi.fn()
  })),
  prompt: vi.fn(),
  open: vi.fn(() => ({
    document: {
      write: vi.fn(),
      close: vi.fn()
    }
  })),
  print: vi.fn()
});

URL.createObjectURL = vi.fn(() => 'blob:mock-url');
URL.revokeObjectURL = vi.fn();

//--------------------------------------------------------------------//
// Helpers

const defaultProps = {
  value: '<p>Initial content</p>'
};

//--------------------------------------------------------------------//
// Tests

describe('WYSIWYG component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('renders editor with initial content', () => {
      render(<WYSIWYG {...defaultProps} />);
      const editor = screen.getByLabelText('Rich Text Editor');
      expect(editor).toBeInTheDocument();
      expect(editor).toHaveAttribute('contentEditable', 'true');
    });

    it('renders toolbar when features enabled', () => {
      render(<WYSIWYG history style list />);
      expect(screen.getByLabelText('Undo')).toBeInTheDocument();
      expect(screen.getByLabelText('Bold')).toBeInTheDocument();
      expect(
        screen.getByLabelText('Ordered List')
      ).toBeInTheDocument();
    });

    it('does not render toolbar when features disabled', () => {
      render(<WYSIWYG />);
      expect(screen.queryByLabelText('Undo')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Bold')).not.toBeInTheDocument();
    });

    it('applies RTL class when dir is rtl', () => {
      const { container } = render(<WYSIWYG dir="rtl" />);
      expect(
        container.querySelector('.frui-wysiwyg-rtl')
      ).toBeInTheDocument();
    });
  });

  describe('toolbar actions', () => {
    it('executes undo command', () => {
      render(<WYSIWYG history />);
      const undoBtn = screen.getByLabelText('Undo');
      fireEvent.click(undoBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'undo',
        false,
        undefined
      );
    });

    it('executes redo command', () => {
      render(<WYSIWYG history />);
      const redoBtn = screen.getByLabelText('Redo');
      fireEvent.click(redoBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'redo',
        false,
        undefined
      );
    });

    it('executes bold command', () => {
      render(<WYSIWYG style />);
      const boldBtn = screen.getByLabelText('Bold');
      fireEvent.click(boldBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'bold',
        false,
        undefined
      );
    });

    it('executes italic command', () => {
      render(<WYSIWYG style />);
      const italicBtn = screen.getByLabelText('Italic');
      fireEvent.click(italicBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'italic',
        false,
        undefined
      );
    });

    it('executes underline command', () => {
      render(<WYSIWYG style />);
      const underlineBtn = screen.getByLabelText('Underline');
      fireEvent.click(underlineBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'underline',
        false,
        undefined
      );
    });

    it('executes ordered list command', () => {
      render(<WYSIWYG list />);
      const listBtn = screen.getByLabelText('Ordered List');
      fireEvent.click(listBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertOrderedList',
        false,
        undefined
      );
    });

    it('executes unordered list command', () => {
      render(<WYSIWYG list />);
      const listBtn = screen.getByLabelText('Unordered List');
      fireEvent.click(listBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertUnorderedList',
        false,
        undefined
      );
    });

    it('changes font', () => {
      render(<WYSIWYG font />);
      const fontSelect = screen.getByLabelText('Font');
      fireEvent.change(fontSelect, { target: { value: 'Arial' } });
      expect(document.execCommand).toHaveBeenCalledWith(
        'fontName',
        false,
        'Arial'
      );
    });

    it('changes font size', () => {
      render(<WYSIWYG size />);
      const sizeSelect = screen.getByLabelText('Font Size');
      fireEvent.change(sizeSelect, { target: { value: '16px' } });
      expect(document.execCommand).toHaveBeenCalledWith(
        'fontSize',
        false,
        '16px'
      );
    });

    it('changes block format', () => {
      render(<WYSIWYG format />);
      const formatSelect = screen.getByLabelText('Block Format');
      fireEvent.change(formatSelect, { target: { value: 'h1' } });
      expect(document.execCommand).toHaveBeenCalledWith(
        'formatBlock',
        false,
        'h1'
      );
    });

    it('inserts paragraph', () => {
      render(<WYSIWYG paragraph />);
      const paragraphBtn = screen.getByLabelText('Paragraph');
      fireEvent.click(paragraphBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'formatBlock',
        false,
        'p'
      );
    });

    it('inserts blockquote', () => {
      render(<WYSIWYG blockquote />);
      const blockquoteBtn = screen.getByLabelText('Blockquote');
      fireEvent.click(blockquoteBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'formatBlock',
        false,
        'blockquote'
      );
    });

    it('executes indent command', () => {
      render(<WYSIWYG indent />);
      const indentBtn = screen.getByLabelText('Indent');
      fireEvent.click(indentBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'indent',
        false,
        undefined
      );
    });

    it('executes outdent command', () => {
      render(<WYSIWYG indent />);
      const outdentBtn = screen.getByLabelText('Outdent');
      fireEvent.click(outdentBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'outdent',
        false,
        undefined
      );
    });

    it('executes align left command', () => {
      render(<WYSIWYG align />);
      const alignBtn = screen.getByLabelText('Align Left');
      fireEvent.click(alignBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'justifyLeft',
        false,
        undefined
      );
    });

    it('executes align center command', () => {
      render(<WYSIWYG align />);
      const alignBtn = screen.getByLabelText('Align Center');
      fireEvent.click(alignBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'justifyCenter',
        false,
        undefined
      );
    });

    it('executes align right command', () => {
      render(<WYSIWYG align />);
      const alignBtn = screen.getByLabelText('Align Right');
      fireEvent.click(alignBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'justifyRight',
        false,
        undefined
      );
    });

    it('inserts horizontal rule', () => {
      render(<WYSIWYG rule />);
      const ruleBtn = screen.getByLabelText('Horizontal Rule');
      fireEvent.click(ruleBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'insertHorizontalRule',
        false,
        undefined
      );
    });
  });

  describe('text styling', () => {
    it('changes text color', () => {
      render(<WYSIWYG color />);
      const colorInput = screen.getByLabelText('Text Color');
      fireEvent.change(
        colorInput, { target: { value: '#ff0000' } }
      );
      expect(document.execCommand).toHaveBeenCalledWith(
        'foreColor',
        false,
        '#ff0000'
      );
    });

    it('changes highlight color', () => {
      render(<WYSIWYG highlight />);
      const highlightInput = screen.getByLabelText('Highlight');
      fireEvent.change(highlightInput, {
        target: { value: '#ffff00' }
      });
      expect(document.execCommand).toHaveBeenCalledWith(
        'hiliteColor',
        false,
        '#ffff00'
      );
    });

    it('executes strikethrough command', () => {
      render(<WYSIWYG text />);
      const strikeBtn = screen.getByLabelText('Strikethrough');
      fireEvent.click(strikeBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'strikeThrough',
        false,
        undefined
      );
    });

    it('executes subscript command', () => {
      render(<WYSIWYG text />);
      const subBtn = screen.getByLabelText('Subscript');
      fireEvent.click(subBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'subscript',
        false,
        undefined
      );
    });

    it('executes superscript command', () => {
      render(<WYSIWYG text />);
      const supBtn = screen.getByLabelText('Superscript');
      fireEvent.click(supBtn);
      expect(document.execCommand).toHaveBeenCalledWith(
        'superscript',
        false,
        undefined
      );
    });
  });

  describe('media insertion', () => {
    it('prompts for link URL', () => {
      (window.prompt as any).mockReturnValue('https://example.com');
      render(<WYSIWYG link />);
      const linkBtn = screen.getByLabelText('Insert Link');
      fireEvent.click(linkBtn);
      expect(window.prompt).toHaveBeenCalledWith(
        'Enter URL',
        'https://'
      );
      expect(document.execCommand).toHaveBeenCalledWith(
        'createLink',
        false,
        'https://example.com'
      );
    });

    it('prompts for video URL', () => {
      (window.prompt as any).mockReturnValue(
        'https://youtube.com/embed/test'
      );
      render(<WYSIWYG video />);
      const videoBtn = screen.getByLabelText('Insert Video');
      fireEvent.click(videoBtn);
      expect(window.prompt).toHaveBeenCalled();
    });

    it('prompts for audio URL', () => {
      (window.prompt as any).mockReturnValue(
        'https://example.com/audio.mp3'
      );
      render(<WYSIWYG audio />);
      const audioBtn = screen.getByLabelText('Insert Audio');
      fireEvent.click(audioBtn);
      expect(window.prompt).toHaveBeenCalled();
    });

    it('prompts for math expression', () => {
      (window.prompt as any).mockReturnValue('x^2');
      render(<WYSIWYG math />);
      const mathBtn = screen.getByLabelText('Insert Math');
      fireEvent.click(mathBtn);
      expect(window.prompt).toHaveBeenCalled();
    });

    it('inserts table with prompt values', () => {
      (window.prompt as any)
        .mockReturnValueOnce('2')
        .mockReturnValueOnce('3');
      render(<WYSIWYG table />);
      const tableBtn = screen.getByLabelText('Insert Table');
      fireEvent.click(tableBtn);
      expect(window.prompt).toHaveBeenCalledTimes(2);
    });
  });

  describe('code view toggle', () => {
    it('toggles between WYSIWYG and code view', () => {
      render(<WYSIWYG code value="<p>Test</p>" />);
      const editor = screen.getByLabelText('Rich Text Editor');
      const codeBtn = screen.getByLabelText('Switch to Code View');

      expect(editor).toHaveAttribute('contentEditable', 'true');

      fireEvent.click(codeBtn);

      expect(editor).toHaveAttribute('contentEditable', 'false');
      expect(
        screen.getByLabelText('Switch to WYSIWYG View')
      ).toBeInTheDocument();
    });

    it('disables toolbar buttons in code view', () => {
      render(<WYSIWYG code style history />);
      const codeBtn = screen.getByLabelText('Switch to Code View');
      fireEvent.click(codeBtn);

      expect(screen.getByLabelText('Bold')).toBeDisabled();
      expect(screen.getByLabelText('Undo')).toBeDisabled();
    });

    it('keeps code toggle enabled in code view', () => {
      render(<WYSIWYG code />);
      const codeBtn = screen.getByLabelText('Switch to Code View');
      fireEvent.click(codeBtn);

      const wysiwygBtn = screen.getByLabelText(
        'Switch to WYSIWYG View'
      );
      expect(wysiwygBtn).not.toBeDisabled();
    });
  });

  describe('callbacks', () => {
    it('calls onChange on input', () => {
      const handleChange = vi.fn();
      render(<WYSIWYG onChange={handleChange} />);
      const editor = screen.getByLabelText('Rich Text Editor');

      fireEvent.input(editor);

      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onUpdate with value and action', () => {
      const handleUpdate = vi.fn();
      render(<WYSIWYG onUpdate={handleUpdate} style />);
      const boldBtn = screen.getByLabelText('Bold');

      fireEvent.click(boldBtn);

      expect(handleUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          value: expect.any(String),
          action: 'bold'
        })
      );
    });

    it('calls onChange in code view', () => {
      const handleChange = vi.fn();
      render(<WYSIWYG code onChange={handleChange} />);

      const codeBtn = screen.getByLabelText('Switch to Code View');
      fireEvent.click(codeBtn);

      const textarea = screen.getByRole('textbox');
      fireEvent.change(textarea, {
        target: { value: '<p>New content</p>' }
      });

      expect(handleChange).toHaveBeenCalledWith(
        '<p>New content</p>'
      );
    });
  });

  describe('utility features', () => {
    it('opens preview in new window', () => {
      render(<WYSIWYG preview value="<p>Preview test</p>" />);
      const previewBtn = screen.getByLabelText('Preview Content');

      fireEvent.click(previewBtn);

      expect(window.open).toHaveBeenCalledWith('', '_blank');
    });

    it('triggers print', () => {
      render(<WYSIWYG print />);
      const printBtn = screen.getByLabelText('Print');

      fireEvent.click(printBtn);

      expect(window.print).toHaveBeenCalled();
    });

    it('saves content as HTML file', () => {
      render(<WYSIWYG save value="<p>Save test</p>" />);
      const saveBtn = screen.getByLabelText('Save as HTML');

      fireEvent.click(saveBtn);

      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });
  });

  describe('direction controls', () => {
    it('toggles text direction', () => {
      render(<WYSIWYG dir="ltr" />);
      const editor = screen.getByLabelText('Rich Text Editor');

      expect(editor).toHaveAttribute('dir', 'ltr');
    });

    it('sets LTR direction', () => {
      render(<WYSIWYG dir="rtl" />);
      const ltrBtn = screen.getByLabelText('Left to Right');

      fireEvent.click(ltrBtn);

      const editor = screen.getByLabelText('Rich Text Editor');
      expect(editor).toHaveAttribute('dir', 'ltr');
    });

    it('sets RTL direction', () => {
      render(<WYSIWYG dir="ltr" />);
      const rtlBtn = screen.getByLabelText('Right to Left');

      fireEvent.click(rtlBtn);

      const editor = screen.getByLabelText('Rich Text Editor');
      expect(editor).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('value synchronization', () => {
    it('updates editor when value prop changes', () => {
      const { rerender } = render(
        <WYSIWYG value="<p>Initial</p>" />
      );
      const editor = screen.getByLabelText('Rich Text Editor');

      expect(editor.innerHTML).toBe('<p>Initial</p>');

      rerender(<WYSIWYG value="<p>Updated</p>" />);

      expect(editor.innerHTML).toBe('<p>Updated</p>');
    });

    it('maintains hidden input value', () => {
      const { container } = render(
        <WYSIWYG value="<p>Test</p>" name="content" />
      );
      const hiddenInput = container.querySelector(
        'input[ type="hidden" ]'
      ) as HTMLInputElement;

      expect(hiddenInput).toHaveAttribute('name', 'content');
      expect(hiddenInput.value).toBe('<p>Test</p>');
    });
  });
});