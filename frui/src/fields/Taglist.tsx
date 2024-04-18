//types
import type { ChangeEvent, KeyboardEvent, CSSProperties } from 'react';
import type { ExtendsType, HTMLInputProps } from '../types';
//hooks
import { useState, useEffect } from 'react';

/**
 * Taglist Config
 */
export type TaglistConfig = {
  onChange?: Function, 
  onUpdate?: Function
};

/**
 * Taglist Props
 */
export type TaglistProps = ExtendsType<HTMLInputProps, {
  error?: any,
  onUpdate?: (value: string) => void,
  className?: string, 
  style?: CSSProperties
}>;

/**
 * Taglist Hook Aggregate
 */
export function useTaglist({ onChange, onUpdate }: TaglistConfig) {
  const [ input, setInput ] = useState('');
  const [ isKeyReleased, setIsKeyReleased ] = useState(false);
  const [ tags, setTags ] = useState<string[]>([]);
  
  useEffect(() => {
    onUpdate && onUpdate(tags);
  }, [ tags ]);
  
  return {
    input,
    tags,
    handlers: {
      change: (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);
        onChange && onChange(e);
      },
      remove: (index: number) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
      },
      edit: (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const trimmedInput = input.trim();
      
        if ((key === 'Enter' || key === ',') && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          setTags(prevState => [...prevState, trimmedInput]);
          setInput('');
        }
      
        if (key === 'Backspace' && !input.length && tags.length && isKeyReleased) {
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
          e.preventDefault();
          setTags(tagsCopy);
          setInput(poppedTag || '');
        }
      
        setIsKeyReleased(false);
      },
      save: () => {
        setIsKeyReleased(true);
      }
    }
  };
};

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