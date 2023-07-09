//types
import type { TaglistProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//hooks
import useTaglist from 'frui-core/dist/hooks/useTaglist';
//helpers
import { 
  makeGroupClasses, 
  makeGroupStyles, 
  makeClasses 
} from 'frui-core/dist/utils';

/**
 * Generic Taglist  Component (Main)
 */
const Taglist: React.FC<TaglistProps> = (props) => {
  //separate component related props from field attributes
  const {  
    error, 
    errorColor = '#DC3545',
    className,
    classNames,
    style,
    styles,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { input, tags, handlers } = useTaglist({ onChange, onUpdate });

  const map = {
    styles: makeGroupStyles(styles, {
      container: undefined,
      tag: undefined,
      remove: undefined,
      input: style
    }),
    classes: makeGroupClasses(classNames, {
      container: [
        'border-black',
        'border-solid',
        'border-1',
        'box-border',
        'rounded-md',
        'text-black',
        'flex',
        'max-w-full',
        'overflow-scroll',
        'pl-1',
        'w-full'
      ].join(' '),
      tag: [
        'items-center',
        'bg-orange-500',
        'border-orange-500',
        'border-solid',
        'border-1',
        'rounded-md',
        'text-white',
        'flex',
        'mb-0.5',    
        'mr-1',
        'mt-0.5',
        'pl-2',
        'pr-[5px]',
        'whitespace-nowrap'
      ].join(' '),
      remove: [
        'bg-unset',
        'border-none',
        'color-white',
        'cursor-pointer',
        'flex',
        'py-0.5',
        'pl-1.5',
        'pr-1'
      ].join(' '),
      input: makeClasses(className, [
        'border-0',
        'outline-none',
        'p-2',
        'min-w-50',
        'w-full'
      ].join(' '))
    })
  };

  //render
  return (
    <div className={map.classes.container} style={map.styles.container}>
      {tags.map((tag, i) => (
        <div key={i} className={map.classes.tag} style={map.styles.tag}>
          {tag}
          <button 
            className={map.classes.remove} 
            style={map.styles.remove}
            onClick={() => handlers.remove(i)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        {...attributes}
        className={map.classes.input} 
        style={map.styles.input}
        value={input}
        onKeyDown={handlers.edit}
        onKeyUp={handlers.save}
        onChange={handlers.change}
      />
    </div>
  );
}

export default Taglist;