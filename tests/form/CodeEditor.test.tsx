//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor
} from '@testing-library/react';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
//frui
import CodeEditor, {
  getEditorOptions,
  getLanguageExtension
} from '../../src/form/CodeEditor.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('@codemirror/state', () => ({
  __esModule: true,
  EditorState: { create: vi.fn(() => ({})) }
}));

vi.mock('@codemirror/view', () => ({
  __esModule: true,
  EditorView: class {
    static updateListener = { of: vi.fn(() => ({})) };
    constructor(_: unknown) {}
    destroy = vi.fn();
  },
  lineNumbers: vi.fn(() => ({}))
}));

vi.mock('codemirror', () => ({
  __esModule: true,
  basicSetup: {},
  minimalSetup: {}
}));

vi.mock('@codemirror/language-data', () => ({
  __esModule: true,
  languages: [
    {
      name: 'javascript',
      alias: [ 'js' ],
      load: vi.fn(async () => {}),
      support: { language: 'mockLang' }
    }
  ]
}));

vi.mock('@codemirror/language', () => ({
  __esModule: true,
  LanguageDescription: class {},
  LanguageSupport: class {}
}));

//--------------------------------------------------------------------//
// Tests

describe('getEditorOptions()', () => {
  it('includes minimal setup extensions', () => {
    const opts = getEditorOptions('minimal', false, []);
    expect(Array.isArray(opts)).toBe(true);
    expect((opts as unknown[]).length).toBeGreaterThan(0);
  });

  it('adds line numbers when numbers=true', () => {
    const opts = getEditorOptions('basic', true, []);
    expect((opts as unknown[]).length).toBeGreaterThanOrEqual(1);
  });
});

describe('getLanguageExtension()', () => {
  it('returns language support when language found', async () => {
    const ext = await getLanguageExtension('javascript');
    expect(ext).toEqual(
      expect.objectContaining({
        language: 'mockLang'
      })
    );
  });

  it('returns undefined for unsupported language', async () => {
    const ext = await getLanguageExtension('unknown');
    expect(ext).toBeUndefined();
  });
});

describe('<CodeEditor />', () => {
  it('renders with default minimal setup and textarea', () => {
    render(<CodeEditor />);
    const field = screen.getByRole('textbox');
    expect(field).toHaveClass('frui-form-code-editor-field');
    expect(field).toHaveValue('');
  });

  it('renders with provided defaultValue', () => {
    render(<CodeEditor defaultValue="console.log('hi')" />);
    const field = 
      screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(field.value).toBe("console.log('hi')");
  });

  it('applies custom className and style', () => {
    render(
      <CodeEditor className="custom" style={{ width: 300 }} />
    );
    const outer = document.querySelector(
      '.frui-form-code-editor.custom'
    ) as HTMLDivElement;
    expect(outer).toBeInTheDocument();
    expect(outer.style.width).toBe('300px');
  });

  it('applies line numbers option when numbers=true', () => {
    render(<CodeEditor numbers />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'frui-form-code-editor-field'
    );
  });

  it('updates value when prop changes', async () => {
    const { rerender } = render(<CodeEditor value="first" />);
    const textarea = 
      screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('first');
    rerender(<CodeEditor value="second" />);
    await waitFor(() => expect(textarea.value).toBe('second'));
  });

  it('loads language if language set', async () => {
    render(<CodeEditor language="javascript" />);
    await waitFor(() => {
      const area = screen.getByRole('textbox');
      expect(area).toBeInTheDocument();
    });
  });
});