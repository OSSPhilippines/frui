<p align="center">
  <img src="https://github.com/cblanquera/frui/assets/120378/cef637e2-ef31-429d-b8a5-35c32ce00752" />
</p>

# Friendly React UI (FRUI)

A collection of vanilla react and tailwind components, fields and 
output formats written in typescript.

Checkout the [Examples](https://cblanquera.github.io/frui)

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