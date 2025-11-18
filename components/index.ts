import * as Element from './element/index.js';
import * as Field from './form/index.js';
import * as Form from './form/index.js';
import * as Format from './format/index.js';

export type { AlertProps } from './element/Alert';
export type { BadgeProps } from './element/Badge';
export type { LoaderProps } from './element/Loader';
export type {
  ModalContextProps,
  ModalProviderProps, 
  ModalProps
} from './element/Modal';
export type { 
  TableColProps,
  TableFootProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableRuleProps
} from './element/Table';
export type { TooltipProps, TooltipDirection } from './element/Tooltip';
export type { ButtonProps } from './Button.js';
export type { ControlProps } from './form/FieldControl.js';
export type { 
  FieldsProps, 
  FieldsetConfig, 
  FieldsetProps
} from './form/Fieldset.js';
export type {
  ColorProps,
  ColorPropType,
  BackgroundColorProps,
  BorderColorProps,
  TextColorProps,
  DisplayProps,
  AlignProps,
  RadiusProps,
  SizeProps,
  FillProps,
  ClassStyleProps,
  ChildrenProps
} from './types.js'

export { ModalContext, ModalProvider, useModal } from './element/Modal';
export {
  Thead,
  Tfoot,
  Tcol,
  Trow,
  Tgroup
} from './element/Table';
export { useFieldset } from './form/Fieldset.js';

import Alert from './element/Alert';
import Badge from './element/Badge';
import Loader from './element/Loader';
import Modal from './element/Modal';
import Table from './element/Table';
import Tooltip from './element/Tooltip';
import Button from './Button.js';
import Control from './form/FieldControl.js';
import Fieldset from './form/Fieldset.js';

import setColorClass from './helpers/color/setColorClass.js';
import setBackgroundColorClass from './helpers/color/setBackgroundColorClass.js';
import setBorderColorClass from './helpers/color/setBorderColorClass.js';
import setTextColorClass from './helpers/color/setTextColorClass.js';
import setTextAlignClass from './helpers/setTextAlignClass.js';
import setDisplayClass from './helpers/setDisplayClass.js';
import setRadiusClass from './helpers/setRadiusClass.js';
import setTextSizeClass from './helpers/setTextSizeClass.js';

export {
  Element,
  Field,
  Form,
  Format,
  Alert,
  Badge,
  Loader,
  Modal,
  Table,
  Tooltip,
  Button,
  Control,
  Fieldset,
  setColorClass,
  setBackgroundColorClass,
  setBorderColorClass,
  setTextColorClass,
  setTextAlignClass,
  setDisplayClass,
  setRadiusClass,
  setTextSizeClass
};