import type { JSX, ReactNode, ReactElement, CSSProperties } from 'react';

//General types
export type ExtendsType<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type AnyReactChildren = ReactNode|ReactElement|JSX.Element
  |ReactNode[]|ReactElement[]|JSX.Element[]|string;

//HTML types
export type HTMLPreProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLPreElement>, 
  HTMLPreElement
>;

export type HTMLLinkProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLAnchorElement>, 
  HTMLAnchorElement
>;

export type HTMLImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>, 
  HTMLImageElement
>;

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>, 
  HTMLInputElement
>;

export type HTMLTextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>, 
  HTMLTextAreaElement
>;

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>, 
  HTMLButtonElement
>;

//Common props

export type ColorPropType = 'tx' | 'bg' | 'bd'; 

export type ColorProps = {
  info?: boolean, 
  warning?: boolean, 
  success?: boolean, 
  error?: boolean, 
  muted?: boolean,
  black?: boolean, 
  white?: boolean,
  primary?: boolean, 
  secondary?: boolean,
  tertiary?: boolean, 
  color?: string
};

export type TextColorProps = {
  txinfo?: boolean, 
  txwarning?: boolean, 
  txsuccess?: boolean, 
  txerror?: boolean, 
  txmuted?: boolean, 
  txblack?: boolean, 
  txwhite?: boolean,
  txprimary?: boolean, 
  txsecondary?: boolean,
  txtertiary?: boolean,
  txcolor?: string,
};

export type BackgroundColorProps = {
  bginfo?: boolean, 
  bgwarning?: boolean, 
  bgsuccess?: boolean, 
  bgerror?: boolean, 
  bgmuted?: boolean, 
  bgblack?: boolean, 
  bgwhite?: boolean,
  bgprimary?: boolean, 
  bgsecondary?: boolean,
  bgtertiary?: boolean,
  bgcolor?: string
};

export type BorderColorProps = {
  bdinfo?: boolean, 
  bdwarning?: boolean, 
  bdsuccess?: boolean, 
  bderror?: boolean, 
  bdmuted?: boolean, 
  bdblack?: boolean, 
  bdwhite?: boolean,
  bdprimary?: boolean, 
  bdsecondary?: boolean,
  bdtertiary?: boolean,
  bdcolor?: string,
};

export type SizeProps = {
  xs?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  xl?: boolean,
  xl2?: boolean,
  xl3?: boolean,
  xl4?: boolean,
  xl5?: boolean
};

export type DisplayProps = {
  block?: boolean,
  inline?: boolean,
  iblock?: boolean,
  flex?: boolean,
  iflex?: boolean,
  grid?: boolean,
  igrid?: boolean,
  hidden?: boolean
};

export type RadiusProps = {
  curved?: boolean,
  rounded?: boolean, 
  pill?: boolean
};

export type FillProps = {
  solid?: boolean,
  outline?: boolean
};

export type AlignProps = {
  left?: boolean,
  center?: boolean,
  right?: boolean,
  justify?: boolean
};

export type HTMLProps = {
  style?: CSSProperties,
  className?: string
};

export type ClassStyleProp = string | CSSProperties | [ string, CSSProperties ];

export type ChildrenProps = {
  children?: ReactNode
};