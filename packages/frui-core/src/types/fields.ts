import type { 
  LegacyRef, 
  ReactNode, 
  ChangeEvent, 
  KeyboardEvent
} from 'react';

import type {
  ExtendsType,
  HTMLInputProps,
  HTMLTextareaProps
} from './common';

import type { FieldsetProps } from './components';

// Autocomplete component
export type AutocompleteDropdownProps = { 
  options: string[]
  show: boolean,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  select: (value: string) => void,
  match: (option: string) => void
};
export type AutocompleteConfig = {
  defaultValue?: string|number|readonly string[],
  onQuery?: (query: string) => void,
  onDropdown?: (show: boolean) => void,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  onUpdate?: (value: string) => void
};
export type AutocompleteProps = InputProps & {
  options: string[],
  error?: boolean,
  errorColor?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onQuery?: (query: string) => void,
  onDropdown?: (show: boolean) => void
};

// checkbox component
export type CheckboxProps = HTMLInputProps & {
  label?: string,
  error?: any,
  color?: string,
  check?: boolean,
  circle?: boolean,
  square?: boolean,
  sharp?: boolean,
  rounded?: boolean,
  outline?: boolean,
  solid?: boolean,
  errorColor?: string,
  style?: React.CSSProperties,
  className?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onUpdate?: (value: string|number|undefined, checked: boolean) => void
};

// country component
export type CountryData = {
  countryCode: string,
  countryName: string,
  currencyType: string,
  currencyCode: string,
  currencyName: string,
  currencyPlural: string,
  currencySymbol: string,
  language: string
};
export type CountryOption = SelectOption<CountryData>;
export type CountryConfig = {
  value: string | CountryOption | undefined,
  map: (country: CountryData) => CountryOption
};
export type CountryProps = ExtendsType<SelectProps, {
  options?: undefined,
  value?: CountryOption|string
}>;

// currency component
export type CurrencyOption = SelectOption<CountryData>;
export type CurrencyConfig = CountryConfig;
export type CurrencyProps = ExtendsType<SelectProps, {
  options?: undefined,
  value?: CurrencyOption|string
}>;

// date component
export type DateInput = string|number|Date;
export type DateConfig = {
  defaultValue?: DateInput, 
  onUpdate?: (value: string) => void
};
export type DateProps = ExtendsType<InputProps, {
  defaultValue?: DateInput
}>;

// datetime component
export type DatetimeInput = string|number|Date;
export type DatetimeConfig = {
  defaultValue?: DatetimeInput, 
  onUpdate?: (value: string) => void
};
export type DatetimeProps = ExtendsType<InputProps, {
  defaultValue?: DatetimeInput
}>;

// file component
export type FileConfig = InputConfig & {
  defaultValue?: string,
  onUpload?: (file: File, update: (url: string) => void) => void
};
export type FileProps = InputProps & {
  defaultValue?: string,
  locale?: Record<string, string>,
  style?: React.CSSProperties,
  className?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onUpdate?: (value: string) => void,
  onUpload?: (file: File, update: (url: string) => void) => void
};

// file list component
export type FilelistConfig = InputConfig & {
  defaultValue?: string[],
  onUpload?: (files: File[], update: (urls: string[]) => void) => void
};
export type FilelistProps = InputProps & {
  locale?: Record<string, string>,
  defaultValue?: string[],
  style?: React.CSSProperties,
  className?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onUpdate?: (value: string[]) => void,
  onUpload?: (files: File[], update: (urls: string[]) => void) => void
};

// input component
export type InputConfig = {
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: Function, 
  onUpdate?: Function
};
export type InputProps = ExtendsType<HTMLInputProps, {
  style?: React.CSSProperties|false,
  label?: string,
  error?: any,
  errorColor?: string,
  onUpdate?: (value: string) => void,
  passRef?: LegacyRef<HTMLInputElement>
}>;

// markdown component
export type MarkdownConfig = {
  defaultValue?: string,
  onUpdate?: Function
};
export type MarkdownProps = TextareaProps;

// mask component
export type MaskProps = InputProps & { 
  mask?: string,
  regex?: string,
  alias?: string,
  repeat?: number,
  greedy?: boolean,
  numericInput?: boolean,
  rightAlign?: boolean,
  definitions?: Record<string, any>
  onReady?: Function
};

// metadata component
export type MetadataType = [ string, string|number|Date ];
export type MetadataConfig = {
  type?: string,
  values?: (MetadataType|undefined)[],
  index: number,
  set: (values: (MetadataType|undefined)[]) => void
};
export type MetadataProps = FieldsetProps<MetadataType>;

// number component
export type NumberOptions = {
  min?: number,
  max?: number,
  separator?: string,
  decimal?: string,
  decimals?: number,
  absolute?: boolean
};
export type NumberProps = InputProps & {
  separator?: string,
  decimal?: string,
  absolute?: boolean,
  width?: string,
  controls?: Function,
  onUpdate?: Function
};

// password component
export type PasswordProps = InputProps & {
  error?: boolean,
  errorColor?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false
};

// radio component
export type RadioProps = HTMLInputProps & {
  label?: string,
  error?: any,
  color?: string,
  check?: boolean,
  circle?: boolean,
  square?: boolean,
  sharp?: boolean,
  rounded?: boolean,
  outline?: boolean,
  solid?: boolean,
  errorColor?: string,
  style?: React.CSSProperties,
  className?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onUpdate?: (value: string|number|undefined, checked: boolean) => void
};

// select component
export type SelectOption<T = any> = {
  label: ReactNode,
  value?: T,
  keyword?: string|Function
};
export type SelectConfig = {
  value?: SelectOption,
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption) => void,
  onUpdate?: (value: string|number) => void
};
export type SelectDropdownProps = { 
  options: SelectOption[]|Record<string, string>
  show: boolean,
  error?: boolean,
  searchable?: boolean,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  select: (value: SelectOption) => void,
  search: (e: KeyboardEvent) => void,
  match: (option: SelectOption) => void
};
export type SelectProps = {
  value?: SelectOption,
  options: SelectOption[]|Record<string, string>,
  searchable?: boolean,
  placeholder?: string,
  error?: boolean,
  errorColor?: string,
  style?: React.CSSProperties,
  className?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onDropdown?: (show: boolean) => void,
  onSelected?: (value: SelectOption) => void,
  onUpdate?: (value: string|number) => void
};

// slug component
export type SlugConfig = InputConfig & {
  dash?: boolean,
  line?: boolean,
  camel?: boolean,
  value: string|number|readonly string[]|undefined,
  defaultValue?: string|number|readonly string[]|undefined
};
export type SlugProps = InputProps & {
  dash?: boolean,
  line?: boolean,
  camel?: boolean
};

// switch component
export type SwitchProps = HTMLInputProps & {
  label?: string,
  error?: any,
  rounded?: boolean,
  onoff?: boolean,
  yesno?: boolean,
  checkex?: boolean,
  sunmoon?: boolean,
  knob?: 'none'|'ridge'|'checkex',
  blue?: boolean,
  orange?: boolean,
  green?: boolean,
  theme?: string|number,
  errorColor?: string,
  style?: React.CSSProperties,
  className?: string,
  styles?: Record<string, React.CSSProperties|false|undefined>|false,
  classNames?: Record<string, string|false|undefined>|false,
  onUpdate?: (value: string|number|undefined, checked: boolean) => void
};

// taglist component
export type TaglistConfig = {
  onChange?: Function, 
  onUpdate?: Function
};
export type TaglistProps = ExtendsType<HTMLInputProps, {
  error?: any,
  errorColor?: string,
  onUpdate?: (value: string) => void,
  className?: string, 
  classNames?: Record<string, string|false|undefined>|false,
  style?: React.CSSProperties,
  styles?: Record<string, React.CSSProperties|false|undefined>|false
}>;

// textarea component
export type TextareaConfig = {
  onChange?: Function, 
  onUpdate?: Function
};
export type TextareaProps = ExtendsType<HTMLTextareaProps, {
  style?: React.CSSProperties|false,
  error?: any,
  errorColor?: string,
  onUpdate?: (value: string) => void,
  passRef?: LegacyRef<HTMLTextAreaElement>
}>;

// textlist component
export type TextlistType = string;
export type TextlistConfig = {
  type?: string,
  values?: (TextlistType|undefined)[],
  index: number,
  set: (values: (TextlistType|undefined)[]) => void
};
export type TextlistProps = FieldsetProps<TextlistType>;

// time component
export type TimeInput = string|number|Date;
export type TimeConfig = {
  defaultValue?: TimeInput, 
  onUpdate?: (value: string) => void
};
export type TimeProps = ExtendsType<InputProps, {
  defaultValue?: TimeInput
}>;