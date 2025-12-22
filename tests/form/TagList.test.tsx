//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import TextEditor, {
  useTextEditor
} from '../../src/form/TextEditor';

//--------------------------------------------------------------------//
// Mocks

Object.defineProperty(window, 'getSelection', {
  writable: true,
  value: vi.fn(() => ({
    rangeCount: 0,
    removeAllRanges: vi.fn(),
    addRange: vi.fn(),
    getRangeAt: vi.fn(() => ({
      extractContents: vi.fn(
        () => document.createDocumentFragment()
      ),
      insertNode: vi.fn(),
      deleteContents: vi.fn(),
      cloneContents: vi.fn(
        () => document.createDocumentFragment()
      )
    }))
  }))
});

Object.defineProperty(document, 'execCommand', {
  configurable: true,
  writable: true,
  value: vi.fn(() => true)
});

//--------------------------------------------------------------------//
// Helpers

const setupHook = (config = {}) => {
  let hook: ReturnType<typeof useTextEditor> | undefined;
  const TestComp = () => {
    hook = useTextEditor(config);
    return null;
  };
  render(<TestComp />);
  return () => hook!;
};

//--------------------------------------------------------------------//
// Tests

describe('<TextEditor />', () => {
  it('renders base structure', () => {
    render(<TextEditor />);
    const editor = document.querySelector(
      '.frui-form-text-editor'
    );
    const editable = document.querySelector(
      '.frui-form-text-editor-editable'
    );
    expect(editor).toBeInTheDocument();
    expect(editable).toBeInTheDocument();
  });
  it('applies rtl direction class', () => {
    render(<TextEditor dir="rtl" />);
    const container = document.querySelector(
      '.frui-form-text-editor-rtl'
    );
    expect(container).toBeInTheDocument();
  });
  it('renders toolbar buttons for enabled props', () => {
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
        list
      />
    );
    const toolbar = document.querySelector(
      '.frui-form-text-editor-toolbar'
    );
    expect(toolbar).toBeInTheDocument();
    expect(
      toolbar?.querySelectorAll('button').length
    ).toBeGreaterThan(0);
  });
  it('clicks bold button executes execCommand', () => {
    render(<TextEditor style />);
    const btn = screen.getByTitle('Bold');
    act(() => {
      fireEvent.click(btn);
    });
    expect(document.execCommand).toHaveBeenCalledWith(
      'bold',
      false,
      undefined
    );
  });
  it('toggles show blocks class on click', () => {
    render(<TextEditor showblocks />);
    const button = screen.getByTitle('Show Blocks');
    const editable = document.querySelector(
      '.frui-form-text-editor-editable'
    ) as HTMLDivElement;
    act(() => {
      fireEvent.click(button);
    });
    expect(
      editable.classList.contains(
        'frui-form-text-editor-show-block'
      )
    ).toBe(true);
  });
  it('toggles code view displaying textarea', () => {
    render(<TextEditor code />);
    const toggle = screen.getByLabelText(
      'Switch to Code View'
    );
    act(() => {
      fireEvent.click(toggle);
    });
    const textarea = document.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });
});

describe('useTextEditor()', () => {
  it('initializes with provided value', () => {
    const getHook = setupHook({ value: '<p>Sample</p>' });
    const result = getHook();
    expect(result.value).toBe('<p>Sample</p>');
  });
  it('execCommand triggers onUpdate', () => {
    const onUpdate = vi.fn();
    const getHook = setupHook({
      value: 'test',
      onUpdate
    });
    const hook = getHook();
    hook.refs.editor.current = document.createElement(
      'div'
    );
    hook.refs.hidden.current = document.createElement(
      'input'
    );
    hook.refs.editor.current.innerHTML = 'data';
    act(() => {
      hook.handlers.execCommand('bold');
    });
    expect(document.execCommand).toHaveBeenCalledWith(
      'bold',
      false,
      undefined
    );
    expect(onUpdate).toHaveBeenCalled();
  });
  it(
    'input handler updates value and calls callbacks',
    () => {
      const onChange = vi.fn();
      const onUpdate = vi.fn();
      const getHook = setupHook({ onChange, onUpdate });
      const hook = getHook();
      hook.refs.editor.current = document.createElement(
        'div'
      );
      hook.refs.hidden.current = document.createElement(
        'input'
      );
      hook.refs.editor.current.innerHTML =
        '<p>Hello World</p>';
      act(() => {
        hook.handlers.input();
      });
      expect(onChange).toHaveBeenCalledWith(
        '<p>Hello World</p>'
      );
      expect(onUpdate).toHaveBeenCalled();
    }
  );
  it('toggles code view and triggers updates', () => {
    const onChange = vi.fn();
    const onUpdate = vi.fn();
    const getHook = setupHook({ onChange, onUpdate });
    const hook = getHook();
    hook.refs.editor.current = document.createElement(
      'div'
    );
    hook.refs.textarea.current = document.createElement(
      'textarea'
    );
    hook.refs.hidden.current = document.createElement(
      'input'
    );
    hook.refs.editor.current.innerHTML = '<p>Edit</p>';
    hook.refs.textarea.current.value = '<p>Edit</p>';
    act(() => {
      hook.blocks.codeViewToggle();
    });
    expect(onChange).toHaveBeenCalled();
    expect(onUpdate).toHaveBeenCalled();
  });
});