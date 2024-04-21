//hooks
import { useLanguage } from 'r22n';
//others
import notify from '../notify';

export default function Terminal(props: { 
  className?: string, 
  children: string 
}) {
  //props
  const { className, children } = props;
  //hooks
  const { _ } = useLanguage();
  //variables
  const copy = () => {
    navigator.clipboard.writeText(children.toString());
    notify('success', 'Copied to clipboard')
  }
  //render
  return (
    <div className={`flex bg-black text-white p-4 ${className || ''}`}>
      <pre className="text-sm flex-grow">
        <code>
          $ {children}
        </code>
      </pre>
      <span className="inline-block relative text-sm top-[-3px] cursor-pointer" onClick={copy}>
        <i className="fas fa-copy"></i> {_('Copy')}
      </span>
    </div>
  )
}