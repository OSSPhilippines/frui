import type { ReactNode, ReactElement } from 'react';

// General types
export type ExtendsType<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type AnyReactChildren = ReactNode|ReactElement|JSX.Element
  |ReactNode[]|ReactElement[]|JSX.Element[]|string;

// HTML types
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