//--------------------------------------------------------------------//
// Imports

//modules
import type { 
  ChangeEvent, 
  RefObject,
  MouseEvent as ReactMouseEvent 
} from 'react';
import { 
  createContext,
  useContext,
  useEffect, 
  useRef,
  useState 
} from 'react';

//frui
import type {
  ChildrenProps,
  ClassStyleProps,
  SlotStyleProp
} from '../types.js';
import type { 
  BackgroundColorProps, 
  ColorProps 
} from '../helpers/tools/ColorTool.js';
import type { InputProps } from './Input.js';
import ColorTool from '../helpers/tools/ColorTool.js';
import getSlotStyles from '../helpers/getSlotStyles.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Types

export type SliderContextProps = {
  //angle arc of the slider in degrees 
  // 0 = flat line, 180 = half circle, 360 = full circle
  angle: number,
  //makes sure the lower handle value is always less than 
  // or equal to the higher handle value
  asc: boolean,
  //makes sure the lower handle value is always more than 
  // or equal to the lower handle value
  desc: boolean,
  //maximum value
  max: number,
  //minimum value
  min: number,
  //whether to use 1 or 2 handles
  range: boolean,
  //increment step value
  step: number,
  //track HTML reference
  track: RefObject<HTMLDivElement | null>,
  //update values
  update: (values: [ number, number ]) => void,
  //controlled value
  values: [ number, number ]
};

export type SliderHandleConfig = { index: number };

export type SliderInputProps = InputProps & { index: number };

export type SliderTrackProps = ClassStyleProps 
  & ChildrenProps 
  & ColorProps 
  & { ref: RefObject<HTMLDivElement | null> };

export type SliderConfig = {
  //angle arc of the slider in degrees 
  // 0 = flat line, 180 = half circle, 360 = full circle
  angle?: string | number,
  //makes sure the lower handle value is always less than 
  // or equal to the higher handle value
  asc?: boolean,
  //uncontrolled initial value
  defaultValue?: string | number | [ number, number ],
  //makes sure the lower handle value is always more than 
  // or equal to the lower handle value
  desc?: boolean,
  //maximum value
  max?: string | number,
  //minimum value
  min?: string | number,
  //update handler
  onUpdate?: (values: number | [ number, number ]) => void,
  //whether to use 1 or 2 handles
  range?: boolean,
  //increment step value
  step?: string | number,
  //controlled value
  value?: string | number | [ number, number ]
};

export type SliderHandleProps = ClassStyleProps 
  & ColorProps 
  & SliderHandleConfig;

export type SliderConnectionProps = ClassStyleProps & ColorProps;

export type SliderProps = ClassStyleProps 
  & ColorProps 
  & BackgroundColorProps  
  & SliderConfig
  & { 
    //whether to add a connecting line between handles
    // (if not range, then from the far left of the slider)
    connect?: boolean,
    //slot: styles for handles
    handles?: SlotStyleProp,
    //slot: styles for inputs
    inputs?: SlotStyleProp,
    //name of the slider input for HTML forms
    name?: string,
    //slot: styles for track
    track?: SlotStyleProp
  };

//--------------------------------------------------------------------//
// Helpers

/**
 * Clamp value within min/max and snap to step
 */
export function clamp(
  value: string | number, 
  min: number, 
  max: number, 
  step: number
) {
  //make sure value is a number
  let clamped = toNumber(value, min);
  //if less than min, set to min
  if (clamped < min) clamped = min;
  //if greater than max, set to max
  if (clamped > max) clamped = max;
  //snap to step
  clamped = Math.round((clamped - min) / step) * step + min;
  return clamped;
};

/**
 * Convert string to number
 */
export function toNumber(value?: string | number, defaultValue = 0) {
  const number = Number(value);
  return isNaN(number) ? defaultValue : number;
};

/**
 * Convert value prop to number array
 */
export function toValues(
  value: string | number | [ number, number ], 
  range: boolean | undefined,
  min: number
): [ number, number ] {
  //make value into a number array (any length)
  const inputs = Array.isArray(value) ? value : [ value ];
  if (inputs.length === 1) {
    inputs.push(inputs[0]);
    inputs[0] = 0;
  }
  //final values list (output)
  return range
    ? [ toNumber(inputs[0], min), toNumber(inputs[1], min) ]
    : [ 0, toNumber(inputs[1], min) ];
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Slider context hook
 */
export function useSliderContext() {
  return useContext(SliderContext);
};

/**
 * Slider handle hook
 */
export function useSliderHandle(config: SliderHandleConfig) {
  //config
  const { index } = config;
  //hooks
  const context = useSliderContext();
  //variables
  const value = context.values[index] || 0;
  const percent = (
    (value - context.min) / (context.max - context.min)
  ) * 100;
  //handlers
  const handlers = {
    update(value: number) {
      const values: [ number, number ] = [ ...context.values ];
      values[index] = clamp(value, context.min, context.max, context.step);
      if (context.asc) {
        //dont let value to be less than previous
        if (values[index - 1] !== undefined) {
          values[index] = Math.max(values[index], values[index - 1]);
        }
        //dont let value to be more than next
        if (values[index + 1] !== undefined) {
          values[index] = Math.min(values[index], values[index + 1]);
        }
      } else if (context.desc) {
        //dont let value to be more than previous
        if (values[index - 1] !== undefined) {
          values[index] = Math.min(values[index], values[index - 1]);
        }
        //dont let value to be less than next
        if (values[index + 1] !== undefined) {
          values[index] = Math.max(values[index], values[index + 1]);
        }
      }
      context.update(values);
    },
    drag: {
      start(e: ReactMouseEvent<HTMLDivElement>) {
        e.preventDefault();
        document.addEventListener('mousemove', handlers.drag.move);
        document.addEventListener('mouseup', handlers.drag.stop);
      },
      move(e: MouseEvent) {
        //get slider
        const slider = context.track.current;
        //if no slider, return
        if (!slider) return;
        //calculate new value based on mouse position
        const bounds = slider.getBoundingClientRect();
        //convert mouse position to percentage
        const percent = (e.clientX - bounds.left) / bounds.width;
        //convert percentage to value
        const value = context.min + percent * (context.max - context.min);
        //update value (this will automatically clamp and snap to step)
        // (timeout may not be necessary, but helps with responsiveness)
        setTimeout(() => handlers.update(value));
      },
      stop() {
        document.removeEventListener('mousemove', handlers.drag.move);
        document.removeEventListener('mouseup', handlers.drag.stop);
      }
    }
  };
  return { context, handlers, percent, value };
};

/**
 * Main slider hook
 */
export function useSlider(config: SliderConfig) {
  //config
  const {
    //makes sure the lower handle value is always less than 
    // or equal to the higher handle value
    asc = false, //?: boolean
    //uncontrolled initial value
    defaultValue, //: string | number | [ number, number ]
    //makes sure the lower handle value is always more than 
    // or equal to the lower handle value
    desc = false, //?: boolean
    //maximum value
    //update handler
    onUpdate, //?: (values: number | [ number, number ]) => void,
    //whether to use 1 or 2 handles
    range = false, //?: boolean
    //controlled value
    value //: string | number | [ number, number ]
  } = config;
  // angle arc of the slider in degrees 
  // - 0 = flat line, 180 = half circle, 360 = full circle
  const angle = toNumber(config.angle, 0);
  // maximum value
  const max = toNumber(config.max, 10);
  // minimum value
  const min = toNumber(config.min, 0);
  // increment step value
  const step = toNumber(config.step, 1);
  //hooks
  const [ values, setValues ] = useState(
    toValues(defaultValue || 0, range, min)
  );
  //refs
  const refs = {
    track: useRef<HTMLDivElement>(null)
  };
  //handlers
  const handlers = {
    update(values: [ number, number ]) {
      setValues(prev => {
        //only update if values have changed
        if (prev[0] == values[0] && prev[1] == values[1]) {
          return prev;
        }
        //call update handler if provided
        onUpdate && onUpdate(
          range ? [ values[0], values[1] ] : values[1]
        );
        return values;
      });
    },
    updateValue1(e: ChangeEvent<HTMLInputElement>) {
      //get value from input
      let value = Number(e.target.value);
      //if not a number, return
      if (isNaN(value)) return;
      //if value is below min, set to min
      if (value < min) value = min;
      //if value is above max, set to max
      if (value > max) value = max;
      //(allow any step, even if step is set)
      range 
        ? handlers.update([ value, values[1] ])
        : handlers.update([ 0, value ]);
    },
    updateValue2(e: ChangeEvent<HTMLInputElement>) {
      //get value from input
      let value = Number(e.target.value);
      //if not a number, return
      if (isNaN(value)) return;
      //if value is below min, set to min
      if (value < min) value = min;
      //if value is above max, set to max
      if (value > max) value = max;
      //(allow any step, even if step is set)
      handlers.update([values[0], value]);
    }
  };
  //effects
  // whenever controlled value changes, update values
  useEffect(() => {
    if (value !== undefined) {
      setValues(toValues(value, range, min));
    }
  }, [ value ]);
  //return state and setters
  return { 
    handlers, 
    provider: {
      angle,
      asc,
      desc,
      max,
      min,
      range,
      step,
      track: refs.track,
      update: handlers.update,
      values
    }, 
    refs,
    values 
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Main slider context
 */
export const SliderContext = createContext<SliderContextProps>({
  //angle arc of the slider in degrees 
  // 0 = flat line, 180 = half circle, 360 = full circle
  angle: 0, //: number
  //makes sure the lower handle value is always less than 
  // or equal to the higher handle value
  asc: false, //: boolean,
  //makes sure the lower handle value is always more than 
  // or equal to the lower handle value
  desc: false, //: boolean,
  //maximum value
  max: 10, //: number
  //minimum value
  min: 0, //: number
  //whether to use 1 or 2 handles
  range: false, //: boolean
  //increment step value
  step: 1, //: number
  //track HTML reference
  track: { current: null }, //: RefObject<HTMLDivElement>|null,
  //update values
  update: () => {}, //: (values: [ number, number ]) => void,
  //controlled value
  values: [ 0, 0 ] //: [ number, number ]
});

/**
 * Slider handle component
 */
export function SliderHandle(props: SliderHandleProps) {
  //props
  const { 
    //CSS class name(s)
    className, //?: string
    //index of the handle (0 or 1)
    index,
    //inline CSS styles
    style = {}, //?: CSSProperties
  } = props;
  //hooks
  const { handlers, percent } = useSliderHandle({ index });
  //variables
  // determine CSS classes
  const classes = [ 'frui-form-slider-handle' ];
  className && classes.push(className);
  // determine CSS styles
  const styles = { ...style };
  styles.left = `${percent}%`;
  //set handle background color
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  //render
  return (
    <div 
      className={classes.join(' ')} 
      onMouseDown={handlers.drag.start}
      style={styles} 
    />
  );
};

/**
 * Slider input component
 */
export function SliderInput(props: SliderInputProps) {
  //props
  const { className, index } = props;
  //hooks
  const { max, min, step, values } = useContext(SliderContext);
  //variables
  // get value for this input
  const value = values[index] || 0;
  // determine CSS classes
  const classes = [ 'frui-form-slider-input' ];
  className && classes.push(className);
  //render
  return (
    <Input 
      {...props}
      className={classes.join(' ')} 
      max={max}
      min={min}
      step={step}
      type="number"
      value={value}
    />
  );
};

/**
 * Slider track component
 */
export function SliderTrack(props: SliderTrackProps) {
  //props
  const { className, children, ref, style } = props;
  //variables
  // determine CSS classes
  const classes = [ 'frui-form-slider-track' ];
  className && classes.push(className);
  // determine CSS styles
  const styles = { ...style };
  //set handle background color
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  //render
  return (
    <div ref={ref} className={classes.join(' ')} style={styles}>
      {children}
    </div>
  );
};

/**
 * Slider connection component
 */
export function SliderConnection(props: SliderConnectionProps) {
  //props
  const { className, style } = props;
  //hooks
  const { values, min, max, range } = useSliderContext();
  //sort values
  const ordered = [ ...values ].sort((a, b) => a - b);
  //calculate percents
  //we need to also consider that min/max maybe negative values...
  const percents = [
    range ? ((ordered[0] - min) / (max - min)) * 100 : 0,
    range 
      ? ((ordered[1] - min) / (max - min)) * 100 
      : ((values[1] - min) / (max - min)) * 100
  ];
  //variables
  // determine CSS classes
  const classes = [ 'frui-form-slider-connection' ];
  className && classes.push(className);
  // determine CSS styles
  const styles = { ...style };
  // - calculate where to start and end the connection
  styles.left = `${percents[0]}%`;
  styles.width = `${percents[1] - percents[0]}%`;
  //set connection background color
  ColorTool.get(props, 'bgc').getClassStyles({ classes, styles });
  //render
  return (
    <div className={classes.join(' ')} style={styles} />
  );
};

/**
 * Main slider component
 */
export function Slider(props: SliderProps) {
  //props
  const {
    //angle arc of the slider in degrees 
    // 0 = flat line, 180 = half circle, 360 = full circle
    angle = 0, //: string | number
    //makes sure the lower handle value is always less than 
    // or equal to the higher handle value
    asc = false, //?: boolean
    //CSS class name(s)
    className, //?: string
    //whether to add a connecting line between handles
    // (if not range, then from the far left of the slider)
    connect = false, //?: boolean
    //uncontrolled initial value
    defaultValue, //: string | number | [ number, number ]
    //makes sure the lower handle value is always more than 
    // or equal to the lower handle value
    desc = false, //?: boolean
    //display error state
    error, //?: boolean
    //slot: styles for handles
    handles, //?: SlotStyleProp
    //slot: styles for inputs
    inputs, //?: SlotStyleProp
    //maximum value
    max = 10, //?: number
    //minimum value
    min = 0, //?: number
    //name of the slider input
    name, //?: string
    //update handler
    onUpdate, //?: (values: number | [ number, number ]) => void,
    //whether to use 1 or 2 handles
    range = false, //?: boolean
    //increment step value
    step = 1, //?: number
    //inline CSS styles
    style, //?: CSSProperties
    //slot: styles for track
    track, //?: SlotStyleProp
    //controlled value
    value //: string | number | [ number, number ]
  } = props;
  //hooks
  const { handlers, provider, refs } = useSlider({
    angle,
    asc,
    defaultValue,
    desc,
    max,
    min,
    onUpdate,
    range,
    step,
    value
  });
  //variables
  // determine CSS classes
  const classes = [ 'frui-form-slider' ];
  className && classes.push(className);
  // determine CSS styles
  const styles = { ...style };
  // determine slot styles
  const slots = {
    connection: {} as ClassStyleProps,
    handles: handles ? getSlotStyles(handles, {}): {},
    inputs: inputs ? getSlotStyles(inputs, {}): {},
    track: track ? getSlotStyles(track, {}): {}
  };
  //add color props to handle and track styles
  const colors = ColorTool.get(props, 'bgc').config;;
  slots.handles = { ...slots.handles, ...colors };
  slots.connection = { ...slots.connection, ...colors };
  //render
  return range ? (
    <SliderContext.Provider value={provider}>
      <div className={classes.join(' ')} style={styles}>
        <SliderInput 
          {...slots.inputs}
          error={error}
          index={0} 
          name={name} 
          onChange={handlers.updateValue1}
        />
        <SliderTrack {...slots.track} ref={refs.track} color={props.bgc}>
          {connect && <SliderConnection {...slots.connection} />}
          <SliderHandle {...slots.handles} index={0} />
          <SliderHandle {...slots.handles} index={1} />
        </SliderTrack>
        <SliderInput 
          {...slots.inputs}
          error={error}
          index={1} 
          name={name} 
          onChange={handlers.updateValue2}
        />
      </div>
    </SliderContext.Provider>
  ) : (
    <SliderContext.Provider value={provider}>
      <div className={classes.join(' ')} style={styles}>
        <SliderInput 
          {...slots.inputs}
          error={error}
          index={1} 
          name={name} 
          onChange={handlers.updateValue1}
        />
        <SliderTrack {...slots.track} ref={refs.track}>
          {connect && <SliderConnection {...slots.connection} />}
          <SliderHandle {...slots.handles} index={1} />
        </SliderTrack>
      </div>
    </SliderContext.Provider>
  );
};

export default Object.assign(Slider, {
  Context: SliderContext,
  Connection: SliderConnection,
  Handle: SliderHandle,
  Input: SliderInput,
  Track: SliderTrack,
  useSlider
});