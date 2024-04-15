import type { ChangeEvent, KeyboardEvent } from 'react';
import type { TaglistConfig } from '../types/fields';

import { useState, useEffect } from 'react';

export default function useTaglist({ onChange, onUpdate }: TaglistConfig) {
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