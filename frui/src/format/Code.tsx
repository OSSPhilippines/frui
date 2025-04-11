import { useLanguage } from 'r22n';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

// copy should reveal the copy button, but onCopy should be defined to modify its behavior
// meanwhile, the presence of onCopy should be enough to show the copy button

export default function Code(props: {
  copy?: boolean;
  className?: string;
  value?: string;
  language?: string;
  numbers?: boolean;
  onCopy?: () => void;
  children: string;
  syntaxStyle?: { [key: string]: React.CSSProperties };
}) {
  const [mounted, setMounted] = useState(false);
  const { children, className, copy, onCopy, language, numbers, syntaxStyle } =
    props;
  const { _ } = useLanguage();

  const body = children
    .split('\n')
    .map((line) => (language === 'bash' ? `$ ${line}` : line))
    .join('\n');

  //extends the default copy function if an extension is provided
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }
    navigator.clipboard.writeText(children.toString());
  };

  //only add highlighting when mounted
  //necessary because of problems with SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  //renders inline code if language is not provided
  if (!language) {
    return (
      <>
        <span>&nbsp;</span>
        <code className='text-sm text-t2 bg-b1 font-semibold inline-block p-0.5'>
          {body}
        </code>
        <span>&nbsp;</span>
      </>
    );
  }

  return (
    <div className={`flex text-sm bg-black ${className || ''}`}>
      {mounted && (
        <SyntaxHighlighter
          className='flex-grow !p-4 !bg-transparent'
          language={language}
          style={syntaxStyle || atomOneDark}
          showLineNumbers={numbers}
        >
          {body}
        </SyntaxHighlighter>
      )}

      {!mounted && (
        <pre
          className='flex-grow !p-4 !bg-transparent'
          style={{
            display: 'block',
            overflowX: 'auto',
            padding: '0.5em',
            color: 'rgb(171, 178, 191)',
            background: 'rgb(40, 44, 52)',
          }}
        >
          <code style={{ whiteSpace: 'pre' }}>{body}</code>
        </pre>
      )}

      {copy && (
        <div
          className='text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap'
          onClick={copy && handleCopy}
        >
          <i className='fas fa-copy'></i> {_('Copy')}
        </div>
      )}
    </div>
  );
}
