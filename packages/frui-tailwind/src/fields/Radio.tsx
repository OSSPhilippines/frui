//types
import type { RadioProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//hooks
import useRadio from 'frui-core/dist/hooks/useRadio';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from 'frui-core/dist/utils';

/**
 * Styled Radio  Component (Main)
 */
const Radio: React.FC<RadioProps> = (props) => {
  //separate component related props from field attributes
  const {   
    defaultChecked,
    checked,
    label, 
    error, 
    errorColor = '#DC3545',
    color = '#32A3CE',
    check,
    circle,
    square,
    sharp,
    rounded,
    outline,
    solid,
    style,
    className,
    styles,
    classNames,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { isChecked, isHovering, handlers } = useRadio({ 
    onChange, 
    onUpdate, 
    checked,
    defaultChecked 
  });

  //we cant store the escape character in a variable
  //so we need to wrap it in a react component
  const char = check ? (<span>&#10003;</span>)
    : square ? (<span>&#9632;</span>)
    : circle ? (<span>&#9679;</span>)
    : (<span>&#9679;</span>);

  //variables
  const map = {
    classes: makeGroupClasses(classNames, {
      container: undefined,
      control: [
        'cursor-pointer',
        'h-[18px]',
        'opacity-0',
        'outline-none',
        'absolute',
        'w-[18px]',
        'z-[12]'
      ].filter(Boolean).join(' '),
      label: [
        'inline-block',
        'font-normal',
        'leading-[20px]',
        'm-0',
        'min-h-[18px]',
        'min-w-[18px]',
        'relative',
        'z-[11]'
      ].filter(Boolean).join(' '),
      wrapper: [
        'border',
        sharp ? undefined : 'rounded-full',
        isChecked 
          ? 'shadow-[0_1px_2px_rgba(0,0,0,0.05),_inset_0px_-15px_10px_-12px_rgba(0,0,0,0.05),_inset_15px_10px_-12px_rgba(255,255,255,0.1)]'
          : '0_1px_2px_rgba(0,0,0,0.05)',
        'inline-block',
        'text-[12px]',
        isChecked ? 'font-black' : 'font-normal',
        'h-4',
        'leading-[14px]',
        'min-w-[16px]',
        'mr-[5px]',
        'mt-[-4px]',
        'text-center',
        'align-middle'
      ].filter(Boolean).join(' ')
    }),
    styles: makeGroupStyles(styles, {
      container: { color: error ? errorColor: undefined },
      control: undefined,
      label: undefined,
      wrapper: {
        backgroundColor: solid && isChecked ? color : '#FAFAFA',
        borderColor: isChecked ? color : isHovering ? color : '#C8C8C8',
        color: solid ? '#FAFAFA' : color
      }
    })
  }
  //render
  return (
    <label className={map.classes.container} style={map.styles.container}>
      <input 
        {...attributes} 
        onChange={handlers.change} 
        onMouseOut={handlers.out}
        onMouseOver={handlers.over}
        type="radio" 
        className={map.classes.control} 
        style={map.styles.control}
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className={map.classes.label} style={map.styles.label}>
        <span className={map.classes.wrapper} style={map.styles.wrapper}>
          {isChecked && char}
        </span>
        {label}
      </span>
    </label>
  );
}

export default Radio;