<p align="center">
  <img src="https://github.com/cblanquera/frui/assets/120378/cef637e2-ef31-429d-b8a5-35c32ce00752" />
</p>

# Free React UI (FRUI)

A collection of vanilla react and tailwind components, fields and 
output formats written in typescript.

Checkout the [Examples](https://ossphilippines.github.io/frui)

## Install

```bash
$ npm install frui
```

## Usage

`frui` was written first in vanilla react with no other dependencies. 
You can start importing components like the following.

```js
import { Loader, fields, formats } from 'frui';
const { Datetime } = fields;
const { Overflow } = formats;
//or
import { Alert, Badge } from 'frui-react';
import { Input, Password } from 'frui-react/fields';
import { HTML, Markdown } from 'frui-react/formats';
//or
import Table, { Thead, Trow, Tcol } from 'frui-react/Table';
import Select from 'frui-react/fields/Select';
import Email from 'frui-react/formats/Email';
```

## Tailwind Setup

After you install `frui`, open `tailwind.config.js` and add the `frui` 
location in the `content` section.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //...
    './node_modules/frui-tailwind/**/*.{jsx,tsx}'
    //...
  ],
  //...
}
```

## Tailwind Usage

Tailwind components in `frui` has also been written from the ground up 
and you can importing components like the following.

```js
import { Alert, Badge } from 'frui-tailwind';
import { Input, Password } from 'frui-tailwind/fields';
import { HTML, Markdown } from 'frui-tailwind/formats';
//or
import Table, { Thead, Trow, Tcol } from 'frui-react/Table';
import Select from 'frui-tailwind/fields/Select';
import Email from 'frui-tailwind/formats/Email';
```

## Components (13)

 - Accordian *(TODO)*
 - Alert
 - Badge
 - Button
 - Control
 - Crumbs *(TODO)*
 - Loader
 - Modal
 - Pagination *(TODO)*
 - Progress *(TODO)*
 - Table
 - Tabs *(TODO)*
 - Tree *(TODO)*

## Fields (32)

 - Autocomplete
 - Checkbox
 - Checklist *(TODO)*
 - Code *(TODO)*
 - Color *(TODO)*
 - Country
 - Currency
 - Date
 - Datetime
 - Fieldset
 - File
 - Filelist
 - Image
 - Imagelist
 - Input
 - JSON *(TODO)*
 - Markdown
 - Mask
 - Metadata (String, Number, Date, Datetime, Time)
 - Number
 - Password
 - Radio
 - Radio Group *(TODO)*
 - Select
 - Slider *(TODO)*
 - Slug
 - Switch
 - Taglist
 - Textarea
 - Textlist
 - Time
 - WYSIWYG *(TODO)*

## Formats (20)

 - Color
 - Currency
 - Date
 - Email
 - Formula
 - HTML
 - Image
 - Imagelist
 - JSON
 - Link
 - List (Ordered, Unordered)
 - Markdown
 - Metadata
 - Number
 - Overflow (Char, Word)
 - Phone
 - Separated (Space, Comma, Line)
 - Table
 - Taglist
 - Yesno