//types
import type { ChangeEvent, KeyboardEvent, CSSProperties } from 'react';
import type { ExtendsType, HTMLInputProps } from '../types.js';
//hooks
import { useState, useEffect } from 'react';

/**
 * Taglist Config
 */
export type TaglistConfig = {
  value?: string[],
  defaultValue?: string[],
  onChange?: Function, 
  onUpdate?: Function
};

/**
 * Taglist Props
 */
export type TaglistProps = ExtendsType<HTMLInputProps, {
  name?: string,
  error?: any,
  color?: string,
  info?: boolean, 
  warning?: boolean, 
  success?: boolean, 
  danger?: boolean, 
  muted?: boolean, 
  onUpdate?: (value: string) => void,
  className?: string, 
  style?: CSSProperties
}>;

/**
 * Taglist Hook Aggregate
 */
export function useTaglist(config: TaglistConfig) {
  const { value, defaultValue, onChange, onUpdate } = config;
  const [ input, setInput ] = useState('');
  const [ isKeyReleased, setIsKeyReleased ] = useState(false);
  const [ tags, setTags ] = useState<string[]>(defaultValue || []);
  
  useEffect(() => {
    //prevent inf looping
    if (Array.isArray(value) 
      && JSON.stringify(value) === JSON.stringify(tags)
    ) return;
    onUpdate && onUpdate(tags);
  }, [ tags ]);

  //for controlled states we should update 
  //the values when the value prop changes
  useEffect(() => {
    if (!Array.isArray(value)) return;
    setTags(value)
  }, [ value ]);
  
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
        setTags(prevState => prevState.filter((_tag, i) => i !== index))
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
    name,
    value,
    defaultValue, 
    color,
    info, 
    warning, 
    success, 
    danger, 
    muted, 
    error, 
    className,
    style,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { input, tags, handlers } = useTaglist({ 
    onChange, 
    onUpdate,
    value: Array.isArray(value) 
      ? value 
      : typeof value === 'string' 
      ? value.split(',') 
      : undefined,
    defaultValue: Array.isArray(defaultValue) 
      ? defaultValue 
      : typeof defaultValue === 'string' 
      ? defaultValue.split(',') 
      : undefined,
  });

  const classNames = [ 'frui-field-taglist' ];
  if (error) {
    classNames.push('frui-tx-error');
  }
  if (className) {
    classNames.push(className);
  }

  const tagClasses = [ 'frui-field-taglist-tag' ];
  const tagStyle: CSSProperties = {};
  if (color) {
    tagStyle.backgroundColor = color;
  } else if (info) {
    tagClasses.push('frui-bg-info');
  } else if (warning) {
    tagClasses.push('frui-bg-warning');
  } else if (success) {
    tagClasses.push('frui-bg-success');
  } else if (error) {
    tagClasses.push('frui-bg-error');
  } else if (muted) {
    tagClasses.push('frui-bg-muted');
  } else {
    tagClasses.push('frui-bg-warning');
  }

  //render
  return (
    <div {...attributes} className={classNames.join(' ')}>
      {tags.map((tag, i) => (
        <div key={i} className={tagClasses.join(' ')} style={tagStyle}>
          {tag}
          <button 
            className="frui-field-taglist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </button>
          <input type="hidden" name={name} value={tag} />
        </div>
      ))}
      <input
        className="frui-field-taglist-input"
        value={input}
        onKeyDown={handlers.edit}
        onKeyUp={handlers.save}
        onChange={handlers.change}
      />
    </div>
  );
}