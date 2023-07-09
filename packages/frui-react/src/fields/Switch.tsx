//types
import type { SwitchProps } from 'frui-core/dist/types/fields';
//react
import React from 'react';
//hooks
import useSwitch from 'frui-core/dist/hooks/useSwitch';
//helpers
import { makeGroupStyles, makeGroupClasses } from 'frui-core/dist/utils';

/**
 * Styled Switch  Component (Main)
 */
const Switch: React.FC<SwitchProps> = (props) => {
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
  const { isChecked, handlers } = useSwitch({ 
    onChange, 
    onUpdate, 
    checked,
    defaultChecked 
  });

  //variables
  const theme = {
    wrapper: {
      background: blue ? ['#8B9AA3', '#468FCC']
        : orange ? ['#888888', '#FF893C']
        : green ? ['#DC3545', '#28A745']
        : ['#F5F5F5', '#8AB2C9'],
      border: blue ? ['#8B9AA3', '#468FCC']
        : orange ? ['#CCCCCC', '#FF893C']
        : green ? ['#DC3545', '#28A745']
        : ['#CCCCCC', '#468FCC'],
      color: blue ? ['#FFFFFF', '#FFFFFF']
        : orange ? ['#DDDDDD', '#FFFFFF']
        : green ? ['#FFFFFF', '#FFFFFF']
        : ['#999999', '#FFFFFF']
    },
    knob: {
      background: blue ? ['#F9F9F9', '#F9F9F9']
        : orange ? ['#F9F9F9', '#F9F9F9']
        : green ? ['#F9F9F9', '#F9F9F9']
        : ['#FFFFFF', '#FFFFFF'],
      color: blue ? ['#D5D5D5', '#468FCC']
        : orange ? ['#D5D5D5', '#FF893C']
        : green ? ['#DC3545', '#28A745']
        : ['#D5D5D5', '#8AB2C9']
    }
  };
  
  const map = {
    classes: makeGroupClasses(classNames, {
      container: undefined,
      control: undefined,
      label: undefined,
      wrapper: undefined,
      knob: undefined
    }),
    styles: makeGroupStyles(styles, {
      container: { 
        margin: 0,
        position: 'relative',
      },
      control: {
        cursor: 'pointer',
        height: '25px',
        opacity: 0,
        position: 'absolute',
        width: '55px',
        zIndex: 12
      },
      label: {
        display: 'inline-block',
        fontWeight: 'normal',
        lineHeight: '20px',
        margin: '0 4px',
        minHeight: '24px',
        minWidth: '18px',
        position: 'relative',
        zIndex: 11
      },
      wrapper: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        backgroundColor: isChecked 
          ? theme.wrapper.background[1] 
          : theme.wrapper.background[0],
        borderColor: isChecked 
          ? theme.wrapper.border[1] 
          : theme.wrapper.border[0],
        borderStyle: 'solid',
        borderWidth: '1px',
        borderRadius: rounded === true ? '12px': undefined,
        boxShadow: 'inset 0px 2px 2px 0px rgba(0, 0, 0, .2)',
        color: isChecked 
          ? theme.wrapper.color[1] 
          : theme.wrapper.color[0],
        display: 'inline-block',
        fontWeight: 'bold',
        height: '20px',
        lineHeight: '18px',
        marginRight: '5px',
        overflow: 'hidden',
        padding: 0,
        position: 'relative',
        textAlign: 'left',
        textIndent: isChecked ? '9px' : '-19px',
        top: '5px',
        transition: 'text-indent .4s ease',
        width: '52px'
      },
      knob: {
        backgroundColor: isChecked 
          ? theme.knob.background[1] 
          : theme.knob.background[0],
        borderRadius: rounded === true ? '100%': undefined,
        boxShadow: '0px 1px 1px 1px rgba(0, 0, 0, .3)',
        color: isChecked 
          ? theme.knob.color[1] 
          : theme.knob.color[0],
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '10px',
        fontWeight: 'lighter',
        left: isChecked ? '34px' : '-3px',
        lineHeight: '20px',
        height: '22px',
        padding: 0,
        position: 'absolute',
        textAlign: 'center',
        textShadow: '-1px 0px 0 rgba(0, 0, 0, 0.15)',
        top: '4px',
        transition: 'left .4s ease',
        width: '22px'
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
            <span style={{ fontSize: '11px', position: 'relative', top: '-1px' }}>
              <span style={{ display: 'inline-block', marginLeft: '-8px' }}>
                ON
              </span>
              <span style={{ display: 'inline-block', marginLeft: '68px' }}>
                OFF
              </span>
            </span>
          )}
          {(yesno || (!onoff && !checkex && !sunmoon)) && (
            <span style={{ fontSize: '11px', position: 'relative', top: '-1px' }}>
              <span style={{ display: 'inline-block', marginLeft: '-11px' }}>
                YES
              </span>
              <span style={{ display: 'inline-block', marginLeft: '70px' }}>
                NO
              </span>
            </span>
          )}
          {checkex && (
            <span style={{ fontSize: '16px' }}>
              <span style={{ display: 'inline-block', marginLeft: '-5px' }}>
                &#10003;
              </span>
              <span style={{ display: 'inline-block', marginLeft: '68px', position: 'relative', top: '1px' }}>
                &#10006;
              </span>
            </span>
          )}
          {sunmoon && (
            <span style={{ fontSize: '16px' }}>
              <span style={{ display: 'inline-block', marginLeft: '-5px' }}>
                &#9788;
              </span>
              <span style={{ display: 'inline-block', marginLeft: '68px', position: 'relative', top: '1px' }}>
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
                <span style={{fontSize: '16px', position: 'relative', top: '1px' }}>
                  &#10003;
                </span>
              ) : (
                <span style={{fontSize: '16px', position: 'relative', top: '1px' }}>
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

export default Switch;