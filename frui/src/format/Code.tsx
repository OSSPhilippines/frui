import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useEffect, useState } from 'react';

// copy should reveal the copy button, but onCopy should be defined to modify its behavior
// meanwhile, the presence of onCopy should be enough to show the copy button

export default function Code(props: {
  children: string;
  className?: string;
  classes?: {
    root?: string;
    copy?: string;
    code?: string;
  };
  copy?: boolean;
  onCopy?: () => void;
  language?: string;
  numbers?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const {
    children,
    className,
    classes = {root: className},
    copy,
    onCopy,
    language,
    numbers,
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

  //classes
  const rootClassNames = ['frui-format-code-container'];
  if (classes.root) {
    rootClassNames.push(classes.root);
  }
  const copyClassNames = ['frui-format-code-copy'];
  if (classes.copy) {
    copyClassNames.push(classes.copy);
  }
  const codeClassNames = ['frui-format-code'];
  if (classes.code) {
    codeClassNames.push(classes.code);
  }

  return (
    <div className={rootClassNames.join(' ')}>
      {copy && (
        <div onClick={copy && handleCopy} className={copyClassNames.join(' ')}>
          <span>❐</span> Copy
        </div>
      )}
      {mounted && (
        <SyntaxHighlighter
          language={language}
          showLineNumbers={numbers}
          style={atomOneDark}
          customStyle={{background: "transparent !important"}}
          className={codeClassNames.join(' ')}
        >
          {body}
        </SyntaxHighlighter>
      )}
    </div>
  );
}
