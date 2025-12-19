//--------------------------------------------------------------------//
// Imports

//tests
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
//frui
import Code from '../../frui/src/format/Code.js';

//--------------------------------------------------------------------//
// Mocks

vi.mock('r22n', () => ({
  useLanguage: () => ({
    _: (text: string) => text
  })
}));

vi.mock('react-syntax-highlighter', () => ({
  __esModule: true,
  default: ({
    children,
    className,
    language,
    showLineNumbers,
    style
  }: {
    children: string,
    className?: string,
    language?: string,
    showLineNumbers?: boolean,
    style?: object
  }) => (
    <pre
      className={className}
      data-testid="syntax-highlighter"
    >
      <code>{children}</code>
    </pre>
  )
}));

vi.mock('react-syntax-highlighter/dist/cjs/styles/hljs', () => ({
  atomOneDark: {}
}));

//--------------------------------------------------------------------//
// Tests

describe('<Code /> Component', () => {
  it('renders inline code when no language is provided', () => {
    render(<Code>console.log('hello')</Code>);
    const code = screen.getByText("console.log('hello')");
    expect(code).toBeInTheDocument();
    expect(code.tagName).toBe('CODE');
  });

  it('renders with custom className', () => {
    render(
      <Code className="custom-class" language="javascript">
        console.log('hello')
      </Code>
    );

    const container = screen.getByTestId('syntax-highlighter')
      .closest('div');

    expect(container).toHaveClass('custom-class');
  });

  it('renders SyntaxHighlighter when language is provided', () => {
    render(
      <Code language="javascript">console.log('hello')</Code>
    );
    expect(
      screen.getByTestId('syntax-highlighter')
    ).toBeInTheDocument();
  });

  it('adds bash prefix to bash code', () => {
    render(<Code language="bash">ls -la</Code>);
    const codeElement = screen.getByText('$ ls -la');
    expect(codeElement).toBeInTheDocument();
  });

  it('shows line numbers when numbers prop is true', () => {
    render(
      <Code language="javascript" numbers>
        console.log('hello')
      </Code>
    );
    const highlighter = screen.getByTestId('syntax-highlighter');
    expect(highlighter).toBeInTheDocument();
  });

  it('shows copy button when copy prop is true', () => {
    render(
      <Code copy language="javascript">
        console.log('hello')
      </Code>
    );
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('triggers onCopy and copies text', () => {
    const onCopy = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn()
      }
    });

    render(
      <Code copy onCopy={onCopy} language="javascript">
        console.log('hello')
      </Code>
    );

    const copyButton = screen.getByText('Copy');
    fireEvent.click(copyButton);

    expect(onCopy).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "console.log('hello')"
    );
  });

  it('does not show copy button when copy prop is false', () => {
    render(
      <Code language="javascript">console.log('hello')</Code>
    );
    expect(screen.queryByText('Copy')).not.toBeInTheDocument();
  });

  it('uses custom syntax style when provided', () => {
    const customStyle = { code: { color: 'red' } };
    render(
      <Code language="javascript" syntaxStyle={customStyle}>
        console.log('hello')
      </Code>
    );
    expect(
      screen.getByTestId('syntax-highlighter')
    ).toBeInTheDocument();
  });
});