//types
import type { FieldSwitchProps } from '../types';
//react
import React from 'react';
//hooks
import useFieldSwitch from '../hooks/useFieldSwitch';
//helpers
import { 
  makeGroupStyles, 
  makeGroupClasses 
} from '../utils';

/**
 * Styled Switch Field Component (Main)
 */
const FieldSwitch: React.FC<FieldSwitchProps> = (props) => {
  //separate component related props from field attributes
  const {   
    defaultChecked,
    checked,
    label, 
    error, 
    errorColor = '#DC3545',
    rounded,
    onoff,
    yesno,
    checkex,
    sunmoon,
    knob = 'none',
    blue,
    orange,
    green,
    style,
    className,
    styles,
    classNames,
    onChange,
    onUpdate,
    ...attributes 
  } = props;
  //hooks
  const { isChecked, handlers } = useFieldSwitch({ 
    onChange, 
    onUpdate, 
    checked,
    defaultChecked 
  });

  //variables
  const theme = {
    wrapper: {
      background: blue ? ['bg-[#8B9AA3]', 'bg-[#468FCC]']
        : orange ? ['bg-[#888888]', 'bg-[#FF893C]']
        : green ? ['bg-[#DC3545]', 'bg-[#28A745]']
        : ['bg-[#F5F5F5]', 'bg-[#8AB2C9]'],
      border: blue ? ['border-[#8B9AA3]', 'border-[#468FCC]']
        : orange ? ['border-[#CCCCCC]', 'border-[#FF893C]']
        : green ? ['border-[#DC3545]', 'border-[#28A745]']
        : ['border-[#CCCCCC]', 'border-[#468FCC]'],
      color: blue ? ['text-white', 'text-white']
        : orange ? ['text-[#DDDDDD]', 'text-white']
        : green ? ['text-white', 'text-white']
        : ['text-[#999999]', 'text-white']
    },
    knob: {
      background: blue ? ['bg-[#F9F9F9]', 'bg-[#F9F9F9]']
        : orange ? ['bg-[#F9F9F9]', 'bg-[#F9F9F9]']
        : green ? ['bg-[#F9F9F9]', 'bg-[#F9F9F9]']
        : ['bg-white', 'bg-white'],
      color: blue ? ['text-[#D5D5D5]', 'text-[#468FCC]']
        : orange ? ['text-[#D5D5D5]', 'text-[#FF893C]']
        : green ? ['text-[#DC3545]', 'text-[#28A745]']
        : ['text-[#D5D5D5]', 'text-[#8AB2C9]']
    }
  };

  const map = {
    classes: makeGroupClasses(classNames, {
      container: 'm-0 relative',
      control: [
        'cursor-pointer',
        'h-[25px]',
        'opacity-0',
        'absolute',
        'w-[55px]',
        'z-[12]'
      ].filter(Boolean).join(' ').trim(),
      label: [
        'inline-block',
        'font-normal',
        'leading-[20px]',
        'my-0',
        'mx-1',
        'min-h-[24px]',
        'min-w-[18px]',
        'relative',
        'z-[11]'
      ].filter(Boolean).join(' ').trim(),
      wrapper: [
        isChecked ? theme.wrapper.background[1]: theme.wrapper.background[0],
        isChecked ? theme.wrapper.border[1]: theme.wrapper.border[0],
        'border',
        rounded === true ? 'rounded-[12px]': undefined,
        'shadow-[inset_0px_2px_2px_0px_rgba(0,0,0,0.2)]',
        isChecked ? theme.wrapper.color[1]: theme.wrapper.color[0],
        'inline-block',
        'font-bold',
        'h-5',
        'leading-[18px]',
        'mr-[5px]',
        'overflow-hidden',
        'p-0',
        'relative',
        'text-left',
        isChecked ? 'indent-[9px]' : 'indent-[-19px]',
        'top-[5px]',
        'transition-[text-indent]',
        'duration-300',
        'ease-[ease]',
        'w-[52px]'
      ].filter(Boolean).join(' ').trim(),
      knob: [
        isChecked ? theme.knob.background[1]: theme.knob.background[0],
        rounded === true ? 'rounded-full': undefined,
        'shadow-[0px_1px_1px_1px_rgba(0,0,0,0.3)]',
        isChecked ? theme.knob.color[1]: theme.knob.color[0],
        'text-[10px]',
        'font-[lighter]',
        isChecked ? 'left-[34px]' : 'left-[-3px]',
        'leading-[20px]',
        'h-[22px]',
        'p-0',
        'absolute',
        'text-center',
        'drop-shadow-[-1px_0_0_rgba(0,0,0,0.15)]',
        'top-1',
        'transition-[left]',
        'duration-300',
        'ease-[ease]',
        'w-[22px]'
      ].filter(Boolean).join(' ').trim()
    }),
    styles: makeGroupStyles(styles, {
      container: undefined,
      control: undefined,
      label: undefined,
      wrapper: {
        fontFamily: 'Arial, Helvetica, sans-serif'
      },
      knob: {
        fontFamily: 'Arial, Helvetica, sans-serif'
      }
    })
  };

  //render
  return (
    <label className={map.classes.container} style={map.styles.container}>
      <input 
        {...attributes} 
        onChange={handlers.change} 
        onMouseOut={handlers.out}
        onMouseOver={handlers.over}
        type="checkbox" 
        className={map.classes.control} 
        style={map.styles.control}
        checked={checked}
        defaultChecked={defaultChecked}
      />
      <span className={map.classes.label} style={map.styles.label}>
        <span className={map.classes.wrapper} style={map.styles.wrapper}>
          {onoff && (
            <span className="text-[11px] relative top-[-1px]">
              <span className="inline-block ml-[-8px]">
                ON
              </span>
              <span className="inline-block ml-[68px]">
                OFF
              </span>
            </span>
          )}
          {(yesno || (!onoff && !checkex && !sunmoon)) && (
            <span className="text-[11px] relative top-[-1px]">
              <span className="inline-block ml-[-11px]">
                YES
              </span>
              <span className="inline-block ml-[70px]">
                NO
              </span>
            </span>
          )}
          {checkex && (
            <span className="text-[16px]">
              <span className="inline-block ml-[-5px]">
                &#10003;
              </span>
              <span className="inline-block ml-[70px]">
                &#10006;
              </span>
            </span>
          )}
          {sunmoon && (
            <span className="text-[16px]">
              <span className="inline-block ml-[-5px]">
                &#9788;
              </span>
              <span className="inline-block ml-[70px] relative top-[1px]">
                &#9789;
              </span>
            </span>
          )}
        </span>
        {label}
        <span className={map.classes.knob} style={map.styles.knob}>
          {knob === 'ridge' && (<span>|||</span>)}
          {knob === 'checkex' && (
            <span>
              {isChecked ? (
                <span className="text-[16px] relative top-[1px]">
                  &#10003;
                </span>
              ) : (
                <span className="text-[16px] relative top-[1px]">
                  &#10006;
                </span>
              )}
            </span>
          )}
        </span>
      </span>
    </label>
  );
}

export default FieldSwitch;