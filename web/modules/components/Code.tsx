//hooks
import { useLanguage } from 'r22n';
//components
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
//others
import notify from '../notify';

export default function Code(props: { 
  language: string,
  className?: string, 
  children: string 
}) {
  //props
  const { className, children, language } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const copy = () => {
    navigator.clipboard.writeText(children.toString());
    notify('success', _('Copied to clipboard'))
  }
  //render
  return (
    <div className={`flex text-sm bg-black ${className || ''}`}>
      <SyntaxHighlighter className="flex-grow !p-4 !bg-transparent" language={language} style={dark}>
        {children}
      </SyntaxHighlighter>
      <div className="text-sm p-4 cursor-pointer whitespace-nowrap" onClick={copy}>
        <i className="fas fa-copy"></i> {_('Copy')}
      </div>
    </div>
  )
}