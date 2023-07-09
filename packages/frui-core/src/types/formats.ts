import type { 
  HTMLLinkProps,
  HTMLImageProps, 
  HTMLPreProps 
} from './common';

import type { BadgeProps } from './components';

// color component
export type ColorProps = { 
  value: string, 
  box?: boolean, 
  text?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  className?: string, 
  classNames?: Record<string, string|false|undefined>|false
  style?: React.CSSProperties,
  styles?: Record<string, React.CSSProperties|false|undefined>|false
};
// country component
export type CountryProps = { 
  value: string, 
  flag?: boolean, 
  text?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  className?: string, 
  classNames?: Record<string, string|false|undefined>|false
  style?: React.CSSProperties,
  styles?: Record<string, React.CSSProperties|false|undefined>|false  
};
// currency component
export type CurrencyProps = {
  value: string, 
  flag?: boolean, 
  text?: boolean,
  sm?: boolean,
  md?: boolean,
  lg?: boolean,
  className?: string, 
  classNames?: Record<string, string|false|undefined>|false
  style?: React.CSSProperties,
  styles?: Record<string, React.CSSProperties|false|undefined>|false
};
// date component
export type DateProps = { 
  value: string|number|Date, 
  locale?: string,
  format?: string 
};
// email component
export type EmailProps = LinkProps;
// formula component
export type FormulaProps = { 
  value: string, 
  formula: string,
  data?: Record<string, any> 
};
// html component
export type HTMLProps = { value: string };
// image component
export type ImageProps = HTMLImageProps & { value: string };
// image component
export type ImagelistProps = HTMLImageProps & { value: string[] };
// json component
export type JSONProps = HTMLPreProps & { value: any };
// link component
export type LinkProps = HTMLLinkProps & { value: string, label?: string  };
// list component
export type ListProps = HTMLLinkProps & { value: (string|number)[], ordered?: boolean };
// markdown component
export type MarkdownProps = { value: string };
// metadata component
export type MetadataProps = { value: Record<string, string|number> };
// number component
export type NumberProps = { 
  value: string|number,
  separator?: string,
  decimal?: string,
  decimals?: number,
  absolute?: boolean 
};
// overflow component
export type OverflowProps = { 
  value: string, 
  length?: string|number, 
  words?: boolean,
  hellip?: boolean, 
};
// phone component
export type PhoneProps = LinkProps;
// rating component
export type RatingProps = { 
  value: string|number,
  max?: number,
  remainder?: boolean,
  round?: 'round'|'ceil'|'floor'
};
// separator component
export type SeparatedProps = { 
  value: (string|number)[], 
  separator?: string,
  className?: string,
  style?: React.CSSProperties
};
// table component
export type TableProps = { 
  value: Record<string, string|number>[],
  stripes?: [ [ string, string ], [ string, string ], [ string, string ] ]
};
// tag list component
export type TaglistProps = BadgeProps & { value: (string|number)[] };
// text component
export type TextProps = { value: string, format?: 'uppercase'|'lowercase'|'capitalize'|'none' };
// yes no component
export type YesnoProps = { value: any, yes?: string, no?: string };

