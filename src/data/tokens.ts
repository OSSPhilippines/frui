export const fields: Record<string, { component: string, value: string }> = {
  autocomplete: {
    component: 'FieldAutocomplete',
    value: 'string'
  },
  checkbox: {
    component: 'FieldCheckbox',
    value: 'boolean'
  },
  //checklist: {
  //  component: 'FieldChecklist',
  //  value: 'T[]'
  //},
  //code: {
  //  component: 'FieldCode',
  //  value: 'string'
  //},
  //color: {
  //  component: 'FieldColor',
  //  value: 'string'
  //},
  country: {
    component: 'FieldCountry',
    value: 'string'
  },
  currency: {
    component: 'FieldCurrency',
    value: 'string'
  },
  date: {
    component: 'FieldDate',
    value: 'string|number|Date'
  },
  datetime: {
    component: 'FieldDatetime',
    value: 'string|number|Date'
  },
  //fieldset: {
  //  component: 'FieldFieldset',
  //  value: 'T[]'
  //},
  file: {
    component: 'FieldFile',
    value: 'string'
  },
  filelist: {
    component: 'FieldFilelist',
    value: 'string[]'
  },
  image: {
    component: 'FieldImage',
    value: 'string'
  },
  imagelist: {
    component: 'FieldImagelist',
    value: 'string[]'
  },
  input: {
    component: 'FieldInput',
    value: 'string|number'
  },
  //json: {
  //  component: 'FieldJSON',
  //  value: 'Record<string, any>'
  //},
  mask: {
    component: 'FieldMask',
    value: 'string'
  },
  metadata: {
    component: 'FieldMetadata',
    value: 'Record<string, T>'
  },
  //none
  number: {
    component: 'FieldNumber',
    value: 'number|string'
  },
  password: {
    component: 'FieldPassword',
    value: 'string'
  },
  radio: {
    component: 'FieldRadio',
    value: 'string|number|boolean'
  },
  //radiolist: {
  //  component: 'FieldRadiolist',
  //  value: 'string|number|boolean'
  //},
  select: {
    component: 'FieldSelect',
    value: 'T'
  },
  'switch': {
    component: 'FieldSwitch',
    value: 'boolean'
  },
  taglist: {
    component: 'FieldTaglist',
    value: 'string[]'
  },
  textarea: {
    component: 'FieldTextarea',
    value: 'string'
  },
  textlist: {
    component: 'FieldTextlist',
    value: 'string[]'
  },
  time: {
    component: 'FieldTime',
    value: 'string|number|Date'
  },
  //wysiwyg: {
  //  component: 'FieldWYSIWYG',
  //  value: 'string'
  //}
};

export const formats: Record<string, { component: string, value: string }> = {
  color: {
    component: 'FormatColor',
    value: 'string'
  },
  country: {
    component: 'FormatCountry',
    value: 'string'
  },
  currency: {
    component: 'FormatCurrency',
    value: 'string'
  },
  date: {
    component: 'FormatDate',
    value: 'string|number|Date'
  },
  email: {
    component: 'FormatEmail',
    value: 'string'
  },
  formula: {
    component: 'FormatFormula',
    value: 'number|string'
  },
  //hide
  html: {
    component: 'FormatHTML',
    value: 'string'
  },
  image: {
    component: 'FormatImage',
    value: 'string'
  },
  imagelist: {
    component: 'FormatImagelist',
    value: 'string[]'
  },
  json: {
    component: 'FormatJSON',
    value: 'Record<string, any>'
  },
  link: {
    component: 'FormatLink',
    value: 'string'
  },
  list: {
    component: 'FormatList',
    value: '(string|number)[]'
  },
  markdown: {
    component: 'FormatMarkdown',
    value: 'string'
  },
  metadata: {
    component: 'FormatMetadata',
    value: 'Record<string, string|number>'
  },
  //none
  number: {
    component: 'FormatNumber',
    value: 'number|string'
  },
  oveflow: {
    component: 'FormatOverflow',
    value: 'string'
  },
  phone: {
    component: 'FormatPhone',
    value: 'string'
  },
  rating: {
    component: 'FormatRating',
    value: 'number'
  },
  separated: {
    component: 'FormatSeparated',
    value: '(string|number)[]'
  },
  table: {
    component: 'FormatTable',
    value: 'Record<string, string|number>[]'
  },
  taglist: {
    component: 'FormatTaglist',
    value: 'string[]'
  },
  text: {
    component: 'FormatText',
    value: 'string|number'
  },
  yesno: {
    component: 'FormatYesno',
    value: 'boolean'
  }
};