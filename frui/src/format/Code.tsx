import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// copy should reveal the copy button, but onCopy should be defined to modify its behavior
// meanwhile, the presence of onCopy should be enough to show the copy button

export default function Code(props: {
  children: string;
  className?: string;
  copy?: boolean;
  onCopy?: () => void;
  language?: string;
  numbers?: boolean;
  presetTheme?: { [key: string]: React.CSSProperties } | undefined,
  style?: CSSProperties;
  value?: string;
}) {
  const [ mounted, setMounted ] = useState(false);
  const { 
    children, 
    className, 
    copy, 
    onCopy, 
    language = 'javascript', 
    numbers, 
    presetTheme,
    style = {
      background: 'transparent',
      color: 'inherit',
      padding: '0 10px 10px',
      width: '100%'
    }
  } = props;

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
    <div className={className} style={{ position: 'relative' }}>
      {copy && (
        <div style={{
          textAlign: 'right',
          padding: '10px 10px 0 0',
          color: 'inherit',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }} onClick={copy && handleCopy}>
          <span>❐</span> Copy
        </div>
      )}
      {mounted && (
        <SyntaxHighlighter
          language={language}
          style={presetTheme}
          showLineNumbers={numbers}
          customStyle={style}
        >
          {body}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
