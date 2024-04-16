//types
import type { TaglistProps } from '../types/fields';
//hooks
import useTaglist from '../hooks/useTaglist';

/**
 * Generic Taglist  Component (Main)
 */
export default function Taglist(props: TaglistProps) {
  //separate component related props from field attributes
  const {  
    error, 
    className,
    style,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { input, tags, handlers } = useTaglist({ onChange, onUpdate });

  const classNames = [ 'field-taglist' ];
  if (error) {
    classNames.push('tx-error');
  }
  if (className) {
    classNames.push(className);
  }

  //render
  return (
    <div {...attributes} className={classNames.join(' ')}>
      {tags.map((tag, i) => (
        <div key={i} className="field-taglist-tag">
          {tag}
          <button 
            className="field-taglist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        className="field-taglist-input"
        value={input}
        onKeyDown={handlers.edit}
        onKeyUp={handlers.save}
        onChange={handlers.change}
      />
    </div>
  );
}