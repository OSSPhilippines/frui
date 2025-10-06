import type {
  Component, 
  ReactNode, 
  CSSProperties,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  ButtonHTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
  HTMLAttributes
} from 'react';

//Native HTML types

export type HTMLElementProps<T = HTMLElement> = DetailedHTMLProps<
  HTMLAttributes<T>,
  T
>;

export type HTMLPreProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLPreElement>, 
  HTMLPreElement
>;

export type HTMLLinkProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLAnchorElement>, 
  HTMLAnchorElement
>;

export type HTMLImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>, 
  HTMLImageElement
>;

export type HTMLInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>, 
  HTMLInputElement
>;

export type HTMLTableProps = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableElement>, 
  HTMLTableElement
>;

export type HTMLTableHeadProps = DetailedHTMLProps<
  ThHTMLAttributes<HTMLTableCellElement>, 
  HTMLTableCellElement
>;

export type HTMLTableRowProps = DetailedHTMLProps<
  TableHTMLAttributes<HTMLTableRowElement>, 
  HTMLTableRowElement
>;

export type HTMLTableCellProps = DetailedHTMLProps<
  TdHTMLAttributes<HTMLTableCellElement>, 
  HTMLTableCellElement
>;

export type HTMLTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>, 
  HTMLTextAreaElement
>;

export type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, 
  HTMLButtonElement
>;

//color props

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

//attribute props

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

export type ReactType = {
  type: Function | Component,
  props: Record<string, unknown>
};

//class name style props

export type CallableClassName<S> = (props: S) => string;

export type CallableStyle<S> = (props: S) => CSSProperties;

export type CallableSlotStyle<S> = (props: S) => string | CSSProperties | ClassStyleProps;

export type CallableClassNameProp<S> = string | CallableClassName<S>;

export type CallableStyleProp<S> = CSSProperties | CallableStyle<S>;

export type SlotStyleProp = string
  | CSSProperties 
  | ClassStyleProps;

export type CallableSlotStyleProp<S> = SlotStyleProp | CallableSlotStyle<S>;

export type ClassStyleProps = {
  className?: string,
  style?: CSSProperties
};

export type CallableClassStyleProps<S> = {
  className?: CallableClassNameProp<S>,
  style?: CallableStyleProp<S>
};

//children props

export type ChildrenProps = {
  children?: ReactNode
};

export type CallableChildrenProps<S> = {
  children?: ReactNode | ((state: S) => ReactNode)
};