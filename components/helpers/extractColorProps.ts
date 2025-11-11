import type { 
  BackgroundColorProps,
  BorderColorProps,
  ColorProps,
  TextColorProps
} from '../types.js';

export function backgroundToColorProps(bgProps: BackgroundColorProps) {
  return {
    color: bgProps.bgcolor,
    info: bgProps.bginfo,
    warning: bgProps.bgwarning,
    success: bgProps.bgsuccess,
    error: bgProps.bgerror,
    muted: bgProps.bgmuted,
    black: bgProps.bgblack,
    white: bgProps.bgwhite,
    primary: bgProps.bgprimary,
    secondary: bgProps.bgsecondary,
    tertiary: bgProps.bgtertiary
  } as ColorProps;
};

/**
 * Extract color props from a props object
 */
export function extractColorProps(props: Record<string, unknown>) {
  const {
    color,
    info,
    warning,
    success,
    error,
    muted,
    black,
    white,
    primary,
    secondary,
    tertiary
  } = props;

  return {
    color,
    info,
    warning,
    success,
    error,
    muted,
    black,
    white,
    primary,
    secondary,
    tertiary
  } as ColorProps;
};

/**
 * Extract text color props from a props object
 */
export function extractTextColorProps(props: Record<string, unknown>) {
  const {
    txcolor,
    txinfo,
    txwarning,
    txsuccess,
    txerror,
    txmuted,
    txblack,
    txwhite,
    txprimary,
    txsecondary,
    txtertiary
  } = props;

  return {
    txcolor,
    txinfo,
    txwarning,
    txsuccess,
    txerror,
    txmuted,
    txblack,
    txwhite,
    txprimary,
    txsecondary,
    txtertiary
  } as TextColorProps;
};

/**
 * Extract background color props from a props object
 */
export function extractBackgroundColorProps(props: Record<string, unknown>) {
  const {
    bgcolor,
    bginfo,
    bgwarning,
    bgsuccess,
    bgerror,
    bgmuted,
    bgblack,
    bgwhite,
    bgprimary,
    bgsecondary,
    bgtertiary
  } = props;

  return {
    bgcolor,
    bginfo,
    bgwarning,
    bgsuccess,
    bgerror,
    bgmuted,
    bgblack,
    bgwhite,
    bgprimary,
    bgsecondary,
    bgtertiary
  } as BackgroundColorProps;
};

/**
 * Extract border color props from a props object
 */
export function extractBorderColorProps(props: Record<string, unknown>) {
  const {
    bdcolor,
    bdinfo,
    bdwarning,
    bdsuccess,
    bderror,
    bdmuted,
    bdblack,
    bdwhite,
    bdprimary,
    bdsecondary,
    bdtertiary
  } = props;

  return {
    bdcolor,
    bdinfo,
    bdwarning,
    bdsuccess,
    bderror,
    bdmuted,
    bdblack,
    bdwhite,
    bdprimary,
    bdsecondary,
    bdtertiary
  } as BorderColorProps;
};

/**
 * Extract all color props from a props object
 */
export function extractAllColorProps(props: Record<string, unknown>) {
  return {
    ...extractColorProps(props),
    ...extractTextColorProps(props),
    ...extractBackgroundColorProps(props),
    ...extractBorderColorProps(props)
  };
}

export default extractColorProps;