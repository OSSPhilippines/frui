//--------------------------------------------------------------------//
// Imports

import type { CSSProperties } from 'react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ColorDisplay, { ColorProps } from '../view/ColorFormat.js';

export type RGBA = { r: number; g: number; b: number; a: number; };
export type HSVA = { h: number; s: number; v: number; a: number; };
export type Dragging = 'palette' | 'hue' | 'alpha' | null;

//--------------------------------------------------------------------//
// Types

export type ColorPickerConfig = {
  value?: string,
  defaultValue?: string,
  onChange?: (color: string) => void
};

export type ColorPickerProps = Omit<ColorProps, 'value'> & {
  value?: string,
  defaultValue?: string,
  onChange?: (color: string) => void,
  showAlpha?: boolean,
  showInputs?: boolean,
  swatches?: string[],
  pickerStyle?: CSSProperties,
  pickerClassName?: string
};

//--------------------------------------------------------------------//
// Constants

export const defaultHsva: HSVA = { h: 208, s: 61, v: 89, a: 0.75 };
export const defaultRgbaString = rgbaToString(hsvaToRgba(defaultHsva));

//--------------------------------------------------------------------//
// Helpers

export function hsvaToRgba(hsva: HSVA): RGBA {
  const s = hsva.s / 100;
  const v = hsva.v / 100;
  const h = hsva.h / 60;
  const a = hsva.a;
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  let r = 0, g = 0, b = 0;
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: a
  };
};

export function rgbaToHsva(rgba: RGBA): HSVA {
  const r = rgba.r / 255;
  const g = rgba.g / 255;
  const b = rgba.b / 255;
  const a = rgba.a;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const v = max;
  if (delta !== 0) {
    s = max === 0 ? 0 : delta / max;
    switch (max) {
      case r: h = (g - b) / delta + (g < b ? 6 : 0); break;
      case g: h = (b - r) / delta + 2; break;
      case b: h = (r - g) / delta + 4; break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  return {
    h: h,
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a: a
  };
};

export function rgbaToString(rgba: RGBA): string {
  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a.toFixed(2)})`;
};

export function parseColorString(colorString: string): RGBA | null {
  if (!colorString) return null;

  let match = colorString.match(/^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*([\d.]+))?\)$/i);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
    if (r > 255 || g > 255 || b > 255 || a < 0 || a > 1 || isNaN(a) || isNaN(r) || isNaN(g) || isNaN(b)) {
      return null;
    }
    return { r, g, b, a };
  }

  match = colorString.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i); // #RRGGBBAA or #RRGGBB
  if (match) {
    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);
    const a = match[4] !== undefined ? parseInt(match[4], 16) / 255 : 1;
     if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a) || a < 0 || a > 1) {
      return null;
    }
    return { r, g, b, a };
  }
  match = colorString.match(/^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i); // #RGBA or #RGB
  if (match) {
    const r = parseInt(match[1] + match[1], 16);
    const g = parseInt(match[2] + match[2], 16);
    const b = parseInt(match[3] + match[3], 16);
    const a = match[4] !== undefined ? parseInt(match[4] + match[4], 16) / 255 : 1;
     if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a) || a < 0 || a > 1) {
      return null;
    }
    return { r, g, b, a };
  }

  return null;
};

//--------------------------------------------------------------------//
// Hooks

export function useColorPicker(config: ColorPickerConfig) {
  const {
    value,
    defaultValue = defaultRgbaString,
    onChange
  } = config;

  const isControlled = value !== undefined;
  
  const [ displayPicker, setDisplayPicker ] = useState(false);
  const [ isDragging, setIsDragging ] = useState<Dragging>(null);
  const [ internalHsva, setInternalHsva ] = useState<HSVA>((): HSVA => {
    const colorString = isControlled ? value : defaultValue;
    const parsedRgba = parseColorString(colorString || defaultRgbaString);
    if (parsedRgba) {
      return rgbaToHsva(parsedRgba);
    }
    return defaultHsva;
  });

  const hsva = isControlled
    ? (parseColorString(value!) ? rgbaToHsva(parseColorString(value!)!) : internalHsva)
    : internalHsva;
  const currentRgba = hsvaToRgba(hsva);
  const currentRgbaString = rgbaToString(currentRgba);

  useEffect(() => {
    if (isControlled) {
      const externalRgba = parseColorString(value!);
      if (externalRgba) {
        const externalHsva = rgbaToHsva(externalRgba);
        if (Math.abs(externalHsva.h - internalHsva.h) > 1 ||
          Math.abs(externalHsva.s - internalHsva.s) > 1 ||
          Math.abs(externalHsva.v - internalHsva.v) > 1 ||
          Math.abs(externalHsva.a - internalHsva.a) > 0.01)
        {
          setInternalHsva(externalHsva);
        }
      }
    }
  }, [
    value, 
    isControlled, 
    internalHsva.h, 
    internalHsva.s, 
    internalHsva.v, 
    internalHsva.a
  ]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlers.mouseMove);
      window.addEventListener('mouseup', handlers.mouseUp, { once: true });
    }
    return () => {
      window.removeEventListener('mousemove', handlers.mouseMove);
      window.removeEventListener('mouseup', handlers.mouseUp);
    };
  }, [ isDragging ]);


  useEffect(() => {
    if (displayPicker) {
      document.addEventListener('mousedown', handlers.clickOutside);
    } else {
      document.removeEventListener('mousedown', handlers.clickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handlers.clickOutside);
    };
  }, [ displayPicker ]);

  const refs = {
    picker: useRef<HTMLDivElement>(null),
    wrapper: useRef<HTMLDivElement>(null),
    palette: useRef<HTMLDivElement>(null),
    hueSlider: useRef<HTMLInputElement>(null),
    alphaSlider: useRef<HTMLInputElement>(null)
  };

  const handlers = {
    colorDisplayClick: () => setDisplayPicker(prev => !prev),
    clickOutside: useCallback((event: MouseEvent) => {
      if (
        refs.picker.current && !refs.picker.current.contains(event.target as Node) &&
        refs.wrapper.current && !refs.wrapper.current.contains(event.target as Node)
      ) {
        setDisplayPicker(false);
      }
    }, []),
    mouseDown: (type: 'palette' | 'hue' | 'alpha', e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsDragging(type);
      e.preventDefault();
      handlers.mouseMove(e as unknown as MouseEvent);
    },
    mouseMove: (e: MouseEvent) => {
      if (!isDragging) return;

      if (isDragging === 'palette' && refs.palette.current) {
        const rect = refs.palette.current.getBoundingClientRect();
        let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        let y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
        const s = (x / rect.width) * 100;
        const v = 100 - (y / rect.height) * 100;
        updateColor({ s: Math.round(s), v: Math.round(v) }, 'drag');
      } else if (isDragging === 'hue' && refs.hueSlider.current) {
        const rect = refs.hueSlider.current.getBoundingClientRect();
        let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const h = Math.round((x / rect.width) * 360);
        updateColor({ h }, 'drag');
      } else if (isDragging === 'alpha' && refs.alphaSlider.current) {
        const rect = refs.alphaSlider.current.getBoundingClientRect();
        let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const a = parseFloat((x / rect.width).toFixed(2));
        updateColor({ a }, 'drag');
      }
    },
    mouseUp: () => isDragging && setIsDragging(null),
    hueChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateColor({ h: parseInt(e.target.value, 10) });
    },
    alphaChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateColor({ a: parseFloat(e.target.value) });
    },
    rgbaInputChange: (field: 'r' | 'g' | 'b' | 'a', fieldValue: string) => {
      let numericValue = field === 'a' ? parseFloat(fieldValue) : parseInt(fieldValue, 10);

      if (isNaN(numericValue) && fieldValue !== '') return;
      if (isNaN(numericValue) && fieldValue === '') numericValue = 0;


      const currentRgba = hsvaToRgba(hsva);
      let newRgba = { ...currentRgba };

      if (field === 'a') {
        newRgba.a = Math.max(0, Math.min(1, numericValue));
      } else {
        newRgba[field] = Math.max(0, Math.min(255, numericValue));
      }

      updateColor(rgbaToHsva(newRgba), 'direct');
    },
    swatchClick: (swatchColor: string) => {
      const parsed = parseColorString(swatchColor);
      if (parsed) {
        updateColor(rgbaToHsva(parsed), 'direct');
      }
    }
  };

  const updateColor = (
    newHsvaPartial: Partial<HSVA>, 
    source: 'direct' | 'drag' = 'direct'
  ) => {
    const newHsva = { ...hsva, ...newHsvaPartial };
    newHsva.h = Math.max(0, Math.min(360, Math.round(newHsva.h)));
    newHsva.s = Math.max(0, Math.min(100, Math.round(newHsva.s)));
    newHsva.v = Math.max(0, Math.min(100, Math.round(newHsva.v)));
    newHsva.a = Math.max(0, Math.min(1, parseFloat(newHsva.a.toFixed(2))));

    const newRgbaString = rgbaToString(hsvaToRgba(newHsva));
    const currentPropRgbaString = isControlled && parseColorString(value!) ? rgbaToString(parseColorString(value!)!) : null;

    if (!isControlled || (isControlled && source === 'drag')) {
      setInternalHsva(newHsva);
    }

    const notifyValue = currentPropRgbaString ?? rgbaToString(hsvaToRgba(internalHsva));
    if (onChange && newRgbaString !== notifyValue) {
      onChange(newRgbaString);
    }
  };

  return {
    refs,
    handlers,
    isControlled,
    hsva,
    currentRgba,
    currentRgbaString,
    displayPicker,
    setDisplayPicker,
    isDragging,
    setIsDragging,
    internalHsva,
    setInternalHsva
  };
};

//--------------------------------------------------------------------//
// Components

export function ColorPicker(props: ColorPickerProps) {
  const {
    value,
    defaultValue = defaultRgbaString,
    onChange,
    showAlpha = true,
    showInputs = true,
    swatches = [],
    className,
    style,
    pickerStyle,
    pickerClassName,
    box = true,
    text = true,
    sm,
    md,
    lg,
  } = props;

  const {
    refs,
    handlers,
    displayPicker,
    hsva,
    currentRgba,
    currentRgbaString,
  } = useColorPicker({
    value,
    defaultValue,
    onChange
  });

  const colorProps = { value: currentRgbaString, box, text, sm, md, lg };
  
  const wrapperClasses = ['frui-colorpicker-wrapper', className].filter(Boolean).join(' ');
  const popoverClasses = ['frui-colorpicker-popover', pickerClassName].filter(Boolean).join(' ');

  const palettePointerX = (hsva.s / 100) * 100;
  const palettePointerY = ((100 - hsva.v) / 100) * 100;
  const hueColor = `hsl(${hsva.h}, 100%, 50%)`;
  const alphaGradient = `linear-gradient(to right, rgba(${currentRgba.r},${currentRgba.g},${currentRgba.b},0), rgba(${currentRgba.r},${currentRgba.g},${currentRgba.b},1))`;

  const dynamicPopoverStyles = {
    ...pickerStyle,
    '--frui-cp-hue-color': hueColor,
    '--frui-cp-pointer-x': `${palettePointerX}%`,
    '--frui-cp-pointer-y': `${palettePointerY}%`,
    '--frui-cp-alpha-gradient': alphaGradient,
  } as CSSProperties;
  
  return (
    <div ref={refs.wrapper} className={wrapperClasses} style={style}>
      <div 
        onClick={handlers.colorDisplayClick} 
        className="frui-colorpicker-trigger" 
        role="button" 
        aria-haspopup="true" 
        aria-expanded={displayPicker}
      >
        <ColorDisplay {...colorProps} />
      </div>

      {displayPicker && (
        <div
          ref={refs.picker}
          className={popoverClasses}
          style={dynamicPopoverStyles}
          onClick={e => e.stopPropagation()}
        >
          <div
            ref={refs.palette}
            className="frui-colorpicker-palette"
            onMouseDown={e => handlers.mouseDown('palette', e)}
            style={{ backgroundColor: hueColor }}
          >
            <div className="frui-colorpicker-palette-saturation"></div>
            <div className="frui-colorpicker-palette-value"></div>
            <div className="frui-colorpicker-palette-pointer"></div>
          </div>

          <div className="frui-colorpicker-sliders">
            <div className="frui-colorpicker-slider-container">
              <label 
                htmlFor="frui-cp-hue-slider" 
                style={{ 
                  position: 'absolute', 
                  width: '1px', 
                  height: '1px', 
                  margin: '-1px', 
                  overflow: 'hidden', 
                  clip: 'rect(0, 0, 0, 0)' 
                }}
              >Hue</label>
              <input
                id="frui-cp-hue-slider"
                ref={refs.hueSlider}
                type="range"
                min="0"
                max="360"
                value={hsva.h}
                onMouseDown={e => handlers.mouseDown('hue', e)}
                onChange={handlers.hueChange}
                className="frui-colorpicker-slider frui-colorpicker-slider-hue"
              />
            </div>
            {showAlpha && (
              <div className="frui-colorpicker-slider-container">
                <label 
                  htmlFor="frui-cp-alpha-slider" 
                  style={{ 
                    position: 'absolute', 
                    width: '1px', 
                    height: '1px', 
                    margin: '-1px', 
                    overflow: 'hidden', 
                    clip: 'rect(0, 0, 0, 0)' 
                  }}
                >Alpha</label>
                <input
                  id="frui-cp-alpha-slider"
                  ref={refs.alphaSlider}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={hsva.a}
                  onMouseDown={e => handlers.mouseDown('alpha', e)}
                  onChange={handlers.alphaChange}
                  className="frui-colorpicker-slider frui-colorpicker-slider-alpha"
                />
              </div>
            )}
          </div>

          {showInputs && (
            <div className="frui-colorpicker-inputs">
              <div className="frui-colorpicker-input-group">
              <div>
                <input 
                  id="frui-cp-r" 
                  type="number" 
                  min="0" 
                  max="255" 
                  value={currentRgba.r} 
                  onChange={e => handlers.rgbaInputChange('r', e.target.value)} 
                  className="frui-colorpicker-input-field" 
                />
                <label 
                  htmlFor="frui-cp-r" 
                  className="frui-colorpicker-input-label"
                >R</label>
              </div>
              <div>
                <input 
                  id="frui-cp-g" 
                  type="number" 
                  min="0" 
                  max="255" 
                  value={currentRgba.g} 
                  onChange={e => handlers.rgbaInputChange('g', e.target.value)} 
                  className="frui-colorpicker-input-field" 
                />
                <label 
                  htmlFor="frui-cp-g" 
                  className="frui-colorpicker-input-label"
                >G</label>
              </div>
              <div>
                <input 
                  id="frui-cp-b" 
                  type="number" 
                  min="0" 
                  max="255" 
                  value={currentRgba.b} 
                  onChange={e => handlers.rgbaInputChange('b', e.target.value)} 
                  className="frui-colorpicker-input-field" 
                />
                <label 
                  htmlFor="frui-cp-b" 
                  className="frui-colorpicker-input-label"
                >B</label>
              </div>
              {showAlpha && (
                <div>
                  <input 
                    id="frui-cp-a" 
                    type="number" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={currentRgba.a.toFixed(2)} 
                    onChange={e => handlers.rgbaInputChange('a', e.target.value)} 
                    className="frui-colorpicker-input-field" 
                  />
                  <label 
                    htmlFor="frui-cp-a" 
                    className="frui-colorpicker-input-label"
                  >A</label>
                </div>
              )}
              </div>
            </div>
          )}

          {swatches && swatches.length > 0 && (
            <div className="frui-colorpicker-swatches">
              {swatches.map((swatchColor, index) => {
                const parsedSwatch = parseColorString(swatchColor);
                const swatchStyle: CSSProperties = parsedSwatch
                  ? { backgroundColor: rgbaToString(parsedSwatch) }
                  : { 
                    backgroundColor: 'transparent', 
                    border: '1px dashed #f00' 
                  };
                return (
                  <div
                    key={`${swatchColor}-${index}`}
                    className="frui-colorpicker-swatch"
                    title={swatchColor}
                    onClick={() => handlers.swatchClick(swatchColor)}
                    role="button"
                    aria-label={`Select color ${swatchColor}`}
                  >
                    <div
                      className="frui-colorpicker-swatch-color"
                      style={swatchStyle}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

//defaults to color picker
export default ColorPicker;