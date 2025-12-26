//--------------------------------------------------------------------//
// Imports

//frui
import CodeEditor, {
  getEditorOptions,
  getLanguageExtension,
  useCodeEditor
} from '../../src/form/CodeEditor.js';
//tests
import '@testing-library/jest-dom';
import {
  describe,
  expect,
  it,
  vi
} from 'vitest';
import {
  render,
  screen,
  waitFor
} from '@testing-library/react';

//--------------------------------------------------------------------//
// Mocks

vi.mock('@codemirror/state', () => ({
  __esModule: true,
  EditorState: {
    create: vi.fn(() => ({}))
  }
}));

vi.mock('@codemirror/view', () => ({
  __esModule: true,
  EditorView: class {
    static updateListener = {
      of: vi.fn((callback) => {
        return { callback };
      })
    };
    constructor(_: unknown) {}
    destroy = vi.fn();
  },
  lineNumbers: vi.fn(() => ({}))
}));

vi.mock('codemirror', () => ({
  __esModule: true,
  basicSetup: { name: 'basicSetup' },
  minimalSetup: { name: 'minimalSetup' }
}));

vi.mock('@codemirror/language-data', () => ({
  __esModule: true,
  languages: [
    {
      name: 'JavaScript',
      alias: [ 'js', 'javascript' ],
      load: vi.fn(async () => {}),
      support: { language: 'mockJavaScriptLang' }
    },
    {
      name: 'Python',
      alias: [ 'py' ],
      load: vi.fn(async () => {}),
      support: { language: 'mockPythonLang' }
    },
    {
      name: 'TypeScript',
      alias: [ 'ts' ],
      load: vi.fn(async () => {}),
      support: { language: 'mockTypeScriptLang' }
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

describe('CodeEditor', () => {
  describe('getEditorOptions()', () => {
    it('returns minimal setup extensions', () => {
      const opts = getEditorOptions('minimal', false, []);
      expect(Array.isArray(opts)).toBe(true);
      expect((opts as unknown[]).length).toBeGreaterThan(0);
    });

    it('returns basic setup extensions', () => {
      const opts = getEditorOptions('basic', false, []);
      expect(Array.isArray(opts)).toBe(true);
      expect((opts as unknown[]).length).toBeGreaterThan(0);
    });

    it('returns custom setup extensions', () => {
      const opts = getEditorOptions('custom', false, []);
      expect(Array.isArray(opts)).toBe(true);
    });

    it('handles default case', () => {
      const opts = getEditorOptions('unknown', false, []);
      expect(Array.isArray(opts)).toBe(true);
    });

    it('adds line numbers when numbers=true', () => {
      const opts = getEditorOptions('minimal', true, []);
      expect((opts as unknown[]).length).toBeGreaterThanOrEqual(2);
    });

    it('includes user extensions', () => {
      const customExt = { name: 'customExtension' };
      const opts = getEditorOptions('minimal', false, [ customExt ]);
      expect(Array.isArray(opts)).toBe(true);
      expect((opts as unknown[]).length).toBeGreaterThanOrEqual(2);
    });

    it('combines setup, numbers, and extensions', () => {
      const customExt = { name: 'custom' };
      const opts = getEditorOptions('basic', true, [ customExt ]);
      expect((opts as unknown[]).length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('getLanguageExtension()', () => {
    it('returns language support for javascript', async () => {
      const ext = await getLanguageExtension('javascript');
      expect(ext).toEqual(
        expect.objectContaining({
          language: 'mockJavaScriptLang'
        })
      );
    });

    it('returns language support for js alias', async () => {
      const ext = await getLanguageExtension('js');
      expect(ext).toEqual(
        expect.objectContaining({
          language: 'mockJavaScriptLang'
        })
      );
    });

    it('returns language support for python', async () => {
      const ext = await getLanguageExtension('python');
      expect(ext).toEqual(
        expect.objectContaining({
          language: 'mockPythonLang'
        })
      );
    });

    it('returns language support for py alias', async () => {
      const ext = await getLanguageExtension('py');
      expect(ext).toEqual(
        expect.objectContaining({
          language: 'mockPythonLang'
        })
      );
    });

    it('handles case-insensitive language names', async () => {
      const ext = await getLanguageExtension('JAVASCRIPT');
      expect(ext).toEqual(
        expect.objectContaining({
          language: 'mockJavaScriptLang'
        })
      );
    });

    it('handles case-insensitive aliases', async () => {
      const ext = await getLanguageExtension('JS');
      expect(ext).toEqual(
        expect.objectContaining({
          language: 'mockJavaScriptLang'
        })
      );
    });

    it('returns undefined for unsupported language', async () => {
      const ext = await getLanguageExtension('unknown');
      expect(ext).toBeUndefined();
    });

    it('returns undefined for empty string', async () => {
      const ext = await getLanguageExtension('');
      expect(ext).toBeUndefined();
    });
  });

  describe('<CodeEditor />', () => {
    it('renders with default setup', () => {
      render(<CodeEditor />);
      const field = screen.getByRole('textbox');
      expect(field).toHaveClass('frui-form-code-editor-field');
      expect(field).toHaveValue('');
    });

    it('renders with container element', () => {
      const { container } = render(<CodeEditor />);
      const editorContainer = container.querySelector(
        '.frui-form-code-editor-container'
      );
      expect(editorContainer).toBeInTheDocument();
    });

    it('renders with provided defaultValue', () => {
      render(<CodeEditor defaultValue="console.log('hi')" />);
      const field = 
        screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(field.value).toBe("console.log('hi')");
    });

    it('renders with controlled value', () => {
      render(<CodeEditor value="const x = 1;" />);
      const field = 
        screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(field.value).toBe('const x = 1;');
    });

    it('applies custom className', () => {
      const { container } = render(
        <CodeEditor className="custom-editor" />
      );
      const wrapper = 
        container.querySelector('.frui-form-code-editor');
      expect(wrapper).toHaveClass('custom-editor');
    });

    it('applies custom style', () => {
      const { container } = render(
        <CodeEditor style={{ width: '300px' }} />
      );
      const wrapper = container.querySelector(
        '.frui-form-code-editor'
      ) as HTMLDivElement;
      expect(wrapper.style.width).toBe('300px');
    });

    it('applies both className and style', () => {
      const { container } = render(
        <CodeEditor
          className="custom"
          style={{ width: '300px', height: '200px' }}
        />
      );
      const wrapper = container.querySelector(
        '.frui-form-code-editor'
      ) as HTMLDivElement;
      expect(wrapper).toHaveClass('custom');
      expect(wrapper.style.width).toBe('300px');
      expect(wrapper.style.height).toBe('200px');
    });

    it('renders with minimal setup', () => {
      render(<CodeEditor setup="minimal" />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });

    it('renders with basic setup', () => {
      render(<CodeEditor setup="basic" />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });

    it('renders with custom setup', () => {
      render(<CodeEditor setup="custom" />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });

    it('applies line numbers when numbers=true', () => {
      render(<CodeEditor numbers />);
      const field = screen.getByRole('textbox');
      expect(field).toHaveClass('frui-form-code-editor-field');
    });

    it('does not apply line numbers when numbers=false', () => {
      render(<CodeEditor numbers={false} />);
      const field = screen.getByRole('textbox');
      expect(field).toHaveClass('frui-form-code-editor-field');
    });

    it('updates value when prop changes', async () => {
      const { rerender } = render(<CodeEditor value="first" />);
      const textarea = 
        screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('first');

      rerender(<CodeEditor value="second" />);
      await waitFor(() => {
        expect(textarea.value).toBe('second');
      });
    });

    it('loads javascript language', async () => {
      render(<CodeEditor language="javascript" />);
      await waitFor(() => {
        const area = screen.getByRole('textbox');
        expect(area).toBeInTheDocument();
      });
    });

    it('loads python language', async () => {
      render(<CodeEditor language="python" />);
      await waitFor(() => {
        const area = screen.getByRole('textbox');
        expect(area).toBeInTheDocument();
      });
    });

    it('handles language changes', async () => {
      const { rerender } = render(
        <CodeEditor language="javascript" />
      );
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });

      rerender(<CodeEditor language="python" />);
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument();
      });
    });

    it('renders textarea as readOnly', () => {
      render(<CodeEditor />);
      const textarea = 
        screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea).toHaveAttribute('readonly');
    });

    it('passes additional HTML attributes to textarea', () => {
      render(
      <CodeEditor data-testid="custom-editor" aria-label="Code" />
    );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('data-testid', 'custom-editor');
      expect(textarea).toHaveAttribute('aria-label', 'Code');
    });

    it('handles custom extensions', () => {
      const customExt = { name: 'custom' };
      render(<CodeEditor extensions={[ customExt ]} />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });

    it('combines setup with extensions', () => {
      const customExt = { name: 'custom' };
      render(<CodeEditor setup="basic" extensions={[ customExt ]} />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });

    it('calls onUpdate when value changes', async () => {
      const onUpdate = vi.fn();
      const { rerender } = render(
        <CodeEditor value="initial" onUpdate={onUpdate} />
      );

      rerender(<CodeEditor value="updated" onUpdate={onUpdate} />);

      await waitFor(() => {
        expect(screen.getByRole('textbox')).toHaveValue('updated');
      });
    });

    it('renders empty editor when no value provided', () => {
      render(<CodeEditor />);
      const textarea = 
        screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('');
    });

    it('handles undefined language gracefully', () => {
      render(<CodeEditor language={undefined} />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });

    it('handles empty language string', () => {
      render(<CodeEditor language="" />);
      const field = screen.getByRole('textbox');
      expect(field).toBeInTheDocument();
    });
  });

  describe('useCodeEditor hook', () => {
    it('initializes with default value', () => {
      let hookResult: ReturnType<typeof useCodeEditor> | undefined;
      function TestComponent() {
        hookResult = useCodeEditor({
          defaultValue: 'test code',
          language: 'javascript',
          onUpdate: vi.fn(),
          options: [],
          value: undefined
        });
        return null;
      }
      render(<TestComponent />);
      expect(hookResult?.currentValue).toBe('test code');
    });

    it('provides refs for field, editor, and view', () => {
      let hookResult: ReturnType<typeof useCodeEditor> | undefined;
      function TestComponent() {
        hookResult = useCodeEditor({
          defaultValue: '',
          language: '',
          onUpdate: vi.fn(),
          options: [],
          value: undefined
        });
        return null;
      }
      render(<TestComponent />);
      expect(hookResult?.refs.field).toBeDefined();
      expect(hookResult?.refs.editor).toBeDefined();
      expect(hookResult?.refs.view).toBeDefined();
    });

    it('provides handlers for create and update', () => {
      let hookResult: ReturnType<typeof useCodeEditor> | undefined;
      function TestComponent() {
        hookResult = useCodeEditor({
          defaultValue: '',
          language: '',
          onUpdate: vi.fn(),
          options: [],
          value: undefined
        });
        return null;
      }
      render(<TestComponent />);
      expect(typeof hookResult?.handlers.create).toBe('function');
      expect(typeof hookResult?.handlers.update).toBe('function');
    });
  });

  describe('exports', () => {
    it('exports CodeEditor component', () => {
      expect(CodeEditor).toBeDefined();
    });

    it('exports getEditorOptions', () => {
      expect(CodeEditor.getEditorOptions).toBe(getEditorOptions);
      expect(CodeEditor.getOptions).toBe(getEditorOptions);
    });

    it('exports getLanguageExtension', () => {
      expect(CodeEditor.getLanguageExtension).toBe(getLanguageExtension);
    });

    it('exports useCodeEditor hook', () => {
      expect(CodeEditor.useCodeEditor).toBe(useCodeEditor);
      expect(CodeEditor.use).toBe(useCodeEditor);
    });
  });
});