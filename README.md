<p align="center">
  <img src="https://github.com/cblanquera/frui/assets/120378/cef637e2-ef31-429d-b8a5-35c32ce00752" />
</p>

# Free React UI (FRUI)

A collection of vanilla react and tailwind components, fields and 
output formats written in typescript.

Checkout the [Examples](https://cblanquera.github.io/frui)

### Why?

Working on a few projects that require the same fields and easy mapping 
to database columns. I looked around for typescript react interfaces 
*(both the free and paid versions)* without luck.

Mostly I created this component repository for selfish reasons and will 
be adding more components as are needed in my projects.

## Install

```bash
$ npm install frui
```

## React Usage

`frui` was written first in vanilla react with no other dependencies. 
You can start importing components like the following.

```js
import { Alert, FieldInput, FormatMarkdown } from 'frui/react';
//or
import FieldSelect from 'frui/react/FieldSelect';
```

## Tailwind Setup

After you install `frui`, open `tailwind.config.js` and add the `frui` 
location in the `content` section.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //...
    './node_modules/frui/**/*.{jsx,tsx}'
    //...
  ],
  //...
}
```

## Tailwind Usage

Tailwind components in `frui` has also been written from the ground up 
and you can importing components like the following.

```js
import { Alert, FieldInput, FormatMarkdown } from 'frui/tailwind';
//or
import FieldSelect from 'frui/tailwind/FieldSelect';
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

## Fields (31)

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