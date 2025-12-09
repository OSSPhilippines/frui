import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Component, 
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ImgHTMLAttributes,
  InputHTMLAttributes,
  ReactNode, 
  TableHTMLAttributes,
  TextareaHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from 'react';

//General types
export type ExtendsType<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type Hash = Record<string, any>;

//Native HTML types

//Can be used for div, header, footer, section, article, span, etc.
export type HTMLElementProps<T = HTMLElement> = DetailedHTMLProps<
  HTMLAttributes<T>,
  T
>;

export type HTMLButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>, 
  HTMLButtonElement
>;

export type HTMLHeadingProps = HTMLElementProps<HTMLHeadingElement>;

export type HTMLLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>, 
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

export type HTMLParagraphProps = HTMLElementProps<HTMLParagraphElement>;
export type HTMLPreProps = HTMLElementProps<HTMLPreElement>;

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

//class name style props

export type ReactType = {
  type: Function | Component,
  props: Record<string, unknown>
};

export type CallableClassName<S> = (props: S) => string;

export type CallableStyle<S> = (props: S) => CSSProperties;

export type CallableSlotStyle<S> = (props: S) => string 
  | CSSProperties | ClassStyleProps;

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