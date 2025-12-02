//modules
import type { CSSProperties } from 'react';
import { useLanguage } from 'r22n';
import ShikiHighlighter from 'react-shiki';
//frui
import { notify } from 'components/Notifier.js';

export function InlineCode(props: { 
  l?: boolean,
  r?: boolean,
  bg?: string,
  color?: string,
  value?: string, 
  quote?: boolean, 
  children?: string 
}) {
  const { value, quote, l, r, children } = props;
  const body = value || children;
  const styles: CSSProperties = {};
  if (props.bg) styles.backgroundColor = props.bg;
  if (props.color) styles.color = props.color;
  return (
    <>
      {l?(<span>&nbsp;</span>):''}
      <code style={styles} className="text-sm text-t2 theme-bg-1 font-semibold inline-block p-0.5">
        {quote?'`':''}{body}{quote?'`':''}
      </code>
      {r?(<span>&nbsp;</span>):''}
    </>
  );
};

export default function Code(props: { 
  language: string,
  copy?: boolean,
  className?: string, 
  children: string 
}) {
  //props
  const { className, copy: canCopy = true, children, language } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const copy = () => {
    navigator.clipboard.writeText(children.toString());
    notify('success', _('Copied to clipboard'))
  }
  //render
  return (
    <div className={`flex text-sm theme-bg-black relative ${className || ''}`}>
      <ShikiHighlighter 
        className="flex-grow" 
        language={language} 
        theme="github-dark"
      >
        {children}
      </ShikiHighlighter>
      {canCopy && (
        <div className="absolute right-0 top-1 text-sm p-4 text-gray-400 cursor-pointer whitespace-nowrap" onClick={copy}>
          <i className="fas fa-copy"></i> {_('Copy')}
        </div>
      )}
    </div>
  )
}