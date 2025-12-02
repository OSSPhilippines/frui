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

//General types
export type ExtendsType<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type Hash = Record<string, any>;

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