//--------------------------------------------------------------------//
// Imports

//modules
import { useState } from 'react';
import { useLanguage, Translate } from 'r22n';

//frui
import Bread from 'components/element/Bread.js';
import WYSIWYG from 'components/field/WYSIWYG.js';

//plugins
import type { PageProps } from 'plugins/app/types.js';
import { 
  LayoutPanel, 
  LayoutProvider, 
  ThemeHead, 
  Props, 
  Code, 
  C,
  Preview
} from 'plugins/app/index.js';

//--------------------------------------------------------------------//
// Constants

const props = [
  [ 'className', 'string', 'No', 'Standard HTML class names' ],
  [ 'value', 'string', 'No', 'Initial content in HTML format' ],
  [ 'history', 'boolean', 'No', 'Enable undo/redo buttons' ],
  [ 'font', 'boolean', 'No', 'Enable font family selection' ],
  [ 'size', 'boolean', 'No', 'Enable font size selection' ],
  [ 'format', 'boolean', 'No', 'Enable block format options (e.g., headings)' ],
  [ 'paragraph', 'boolean', 'No', 'Enable paragraph formatting button' ],
  [ 'blockquote', 'boolean', 'No', 'Enable blockquote formatting button' ],
  [ 'style', 'boolean', 'No', 'Enable bold, italic, underline buttons' ],
  [ 'color', 'boolean', 'No', 'Enable text color picker' ],
  [ 'highlight', 'boolean', 'No', 'Enable background highlight picker' ],
  [
    'text',
    'boolean',
    'No',
    'Enable strikethrough, subscript, superscript buttons',
  ],
  [
    'textStyle',
    'boolean',
    'No',
    'Enable custom text styles (e.g., Code, Shadow) with single-style application',
  ],
  [ 'remove', 'boolean', 'No', 'Enable remove format button (preserves inherited styles)' ],
  [ 'indent', 'boolean', 'No', 'Enable indent/outdent buttons' ],
  [
    'align',
    'boolean',
    'No',
    'Enable left, center, right alignment buttons',
  ],
  [ 'rule', 'boolean', 'No', 'Enable horizontal rule button' ],
  [ 'list', 'boolean', 'No', 'Enable ordered/unordered list buttons' ],
  [ 'lineheight', 'boolean', 'No', 'Enable line height selection' ],
  [ 'table', 'boolean', 'No', 'Enable table insertion' ],
  [ 'link', 'boolean', 'No', 'Enable link insertion' ],
  [ 'image', 'boolean', 'No', 'Enable image upload' ],
  [
    'imageGallery',
    'boolean',
    'No',
    'Enable multiple image upload (gallery simulation)',
  ],
  [ 'video', 'boolean', 'No', 'Enable video embedding' ],
  [ 'audio', 'boolean', 'No', 'Enable audio embedding' ],
  [ 'math', 'boolean', 'No', 'Enable math expression insertion' ],
  [ 'fullscreen', 'boolean', 'No', 'Enable fullscreen toggle' ],
  [ 'showblocks', 'boolean', 'No', 'Enable block visibility toggle' ],
  [ 'code', 'boolean', 'No', 'Enable code view toggle' ],
  [ 'preview', 'boolean', 'No', 'Enable content preview in new window' ],
  [ 'print', 'boolean', 'No', 'Enable print button' ],
  [ 'save', 'boolean', 'No', 'Enable save as HTML button' ],
  [ 'template', 'boolean', 'No', 'Enable predefined template insertion' ],
  [
    'dir',
    `'ltr' | 'rtl'`,
    'No',
    'Set text direction (left-to-right or right-to-left)',
  ],
  [
    'onChange',
    'Function',
    'No',
    'Handler for content changes (value: string)',
  ],
  [
    'onUpdate',
    'Function',
    'No',
    'Handler for updates ({ value: string, action: string })',
  ],
  [ 'name', 'string', 'No', 'Used for form integration' ],
  [ 'error', 'string', 'No', 'Display error message and highlight field' ],
  [ 'style', 'CSS Object', 'No', 'Standard CSS object for custom styling' ]
];

const examples = [
//0
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  value="<p>Hello, <b>World</b>!</p>"
/>`,
//1
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  history 
  font 
  size 
  format 
  paragraph 
  blockquote 
  style 
  color 
  highlight 
  text 
  textStyle
  align 
  list 
  value="<p>Formatted <i>text</i> here.</p>"
/>`,
//2
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  history 
  font 
  size 
  format 
  paragraph 
  blockquote 
  style 
  color 
  highlight 
  text 
  textStyle
  remove 
  indent 
  align 
  rule 
  list 
  lineheight 
  table 
  link 
  image 
  imageGallery
  video 
  audio 
  math
  fullscreen 
  showblocks 
  code 
  preview
  print 
  save 
  template
  dir="ltr"
  value="<p>Full-featured <b>editor</b>.</p>"
/>`,
//3
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  history 
  style 
  align 
  dir="rtl"
  value="<p>مرحباً <b>بالعالم</b>!</p>"
/>`,
//4
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  history 
  style 
  onChange={value => console.log('change', value)}
  onUpdate={({ value, action }) => console.log('update', value, action)}
/>`,
//5
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  table 
  style 
  align 
  value="<table border='1'><tr><td><b>Cell 1</b></td><td>Cell 2</td></tr></table>"
/>`,
//6
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  image 
  video 
  link 
  value="<p>Check this <a href='https://example.com'>link</a> and image below:</p>"
/>`,
//7
`<WYSIWYG 
  className="w-full" 
  name="editorContent"
  template 
  style 
  value="<p>Start with a <b>template</b> or type here.</p>"
/>`
];

//--------------------------------------------------------------------//
// Components

/**
 * Crumbs component
 */
export function Crumbs() {
  return (
    <Bread crumbClassStyle="font-normal" activeClassStyle="font-bold">
      <Bread.Slicer />
      <Bread.Crumb icon="rectangle-list" href="/field">
        Fields
      </Bread.Crumb>
      <Bread.Crumb>WYSIWYG</Bread.Crumb>
    </Bread>
  );
};

/**
 * Aside right menu component
 */
export function Menu() {
  //hooks
  const { _ } = useLanguage();
  //render
  return (
    <aside className={
      'hidden lg:block absolute top-0 bottom-0 right-0 z-1 w-56 '
      + 'border-l theme-bc-1 text-sm'
    }>
      <h4 className={
        'p-3 border-b theme-bc-1 theme-bg-1 text-sm uppercase '
        + 'font-semibold'
      }>
        {_('Contents')}
      </h4>
      <div className="p-3">
        <a className="block pb-1 font-bold" href="#top">
          {_('WYSIWYG')}
        </a>
        <ul className="list-disc pl-2">
          <li className="ml-2 pb-1">
            <a href="#examples">{_('Examples')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#styles">{_('Global Styles')}</a>
          </li>
          <li className="ml-2 pb-1">
            <a href="#api">{_('API Reference')}</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

/**
 * Examples component
 */
export function Examples() {
  return (
    <div className="flex items-start rmd-block flex-wrap gap-4">
      {/* Info Example */}
      <Preview 
        height={100}
        title="Info Example" 
        className="border border-2 theme-bc-3 px-w-50-7 rmd-px-w-100-0"
      >
        <Preview.Example center padding>
          TODO
        </Preview.Example>
        <Preview.Code>{''}</Preview.Code>
      </Preview>
    </div>
  );
};

/**
 * Documentation body component
 */
export function Body() {
  // hooks
  const { _ } = useLanguage();
  const [ editorValue, setEditorValue ] = useState(
    '<p>Type here to see events...</p>'
  );
  const [lastEvent, setLastEvent] = useState<{
    type: string,
    value: string,
    action?: string
  } | null>(null);
  // render
  return (
    <div className={
      'absolute top-0 bottom-0 left-0 right-0 lg:right-56 px-3 pt-3 '
      + 'pb-5 h-full overflow-auto'
    }>
      <h1
        id="top"
        className="flex items-center uppercase font-bold text-xl"
      >
        {_('WYSIWYG')}
      </h1>
      <div>
        <p className="py-2">
          <Translate>
            Import the WYSIWYG field like the following.
          </Translate>
        </p>
        <Code language="typescript" className="mt-2">
          {`import WYSIWYG from 'frui/field/WYSIWYG';`}
        </Code>
      </div>

      <h2 id="basic" className="uppercase font-bold text-lg mt-8">
        {_('Basics')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            A basic example of a <C value="WYSIWYG" /> field with minimal
            setup.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              value="<p>Hello, <b>World</b>!</p>"
            />
          </div>
          <Code language="typescript">{examples[0]}</Code>
        </div>
      </div>

      <h2 id="features" className="uppercase font-bold text-lg mt-8">
        {_('Features')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Enable various formatting options using boolean props like{" "}
            <C value="history" />, <C value="font" />, <C value="style" />,
            and more.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              history
              font
              size
              format
              paragraph
              blockquote
              style
              color
              highlight
              text
              textStyle
              align
              list
              value="<p>Formatted <i>text</i> here.</p>"
            />
          </div>
          <Code language="typescript">{examples[1]}</Code>
        </div>
      </div>

      <h2 id="full" className="uppercase font-bold text-lg mt-8">
        {_('Full Example')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            A fully-loaded <C value="WYSIWYG" /> with all available features
            enabled.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              history
              font
              size
              format
              paragraph
              blockquote
              style
              color
              highlight
              text
              textStyle
              remove
              indent
              align
              rule
              list
              lineheight
              table
              link
              image
              imageGallery
              video
              audio
              math
              fullscreen
              showblocks
              code
              preview
              print
              save
              template
              dir="ltr"
              value="<p>Full-featured <b>editor</b>.</p>"
            />
          </div>
          <Code language="typescript">{examples[2]}</Code>
        </div>
      </div>

      <h2 id="rtl" className="uppercase font-bold text-lg mt-8">
        {_('RTL Support')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Use the <C value="dir" /> prop to switch to right-to-left text
            direction for languages like Arabic or Hebrew.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              history
              style
              align
              dir="rtl"
              value="<p>مرحباً <b>بالعالم</b>!</p>"
            />
          </div>
          <Code language="typescript">{examples[3]}</Code>
        </div>
      </div>

      <h2 id="events" className="uppercase font-bold text-lg mt-8">
        {_('Events')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Use <C value="onChange" /> and <C value="onUpdate" /> to handle
            content and state changes. Try typing or formatting below to see
            the events in action.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              history
              style
              onChange={(value) => {
                setEditorValue(value);
                setLastEvent({ type: "onChange", value });
              }}
              onUpdate={({ value, action }) => {
                setEditorValue(value);
                setLastEvent({ type: "onUpdate", value, action });
              }}
              value={editorValue}
            />
          </div>
          <Code language="typescript">{examples[4]}</Code>
        </div>
        {lastEvent && (
          <div className="mt-4">
            <p className="font-semibold">Last Event:</p>
            <Code language="json">
              {JSON.stringify(lastEvent, null, 2)}
            </Code>
          </div>
        )}
      </div>

      <h2 id="tables" className="uppercase font-bold text-lg mt-8">
        {_('Tables')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Use the <C value="table" /> prop to enable table insertion and
            edit tabular data directly.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              table
              style
              align
              value="<table border='1'><tr><td><b>Cell 1</b></td><td>Cell 2</td></tr></table>"
            />
          </div>
          <Code language="typescript">{examples[5]}</Code>
        </div>
      </div>

      <h2 id="media" className="uppercase font-bold text-lg mt-8">
        {_('Media')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Add images, videos, and links using <C value="image" />,{" "}
            <C value="video" />, and <C value="link" /> props for rich
            content. Links can be clicked with Ctrl (Windows) or Cmd (Mac) to open in a new tab.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              image
              video
              link
              value="<p>Check this <a href='https://example.com'>link</a> and image below:</p>"
            />
          </div>
          <Code language="typescript">{examples[6]}</Code>
        </div>
      </div>

      <h2 id="templates" className="uppercase font-bold text-lg mt-8">
        {_('Custom Templates')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            Use the <C value="template" /> prop to insert predefined content
            blocks for quick editing.
          </Translate>
        </p>
        <div className="curved overflow-hidden">
          <div className="flex items-center justify-center p-3 theme-bg-1">
            <WYSIWYG
              className="w-full"
              name="editorContent"
              template
              style
              value="<p>Start with a <b>template</b> or type here.</p>"
            />
          </div>
          <Code language="typescript">{examples[7]}</Code>
        </div>
      </div>

      <h2 id="styles" className="uppercase font-bold text-lg mt-8">
        {_('Global Styles')}
      </h2>
      <p className="py-4">
        <Translate>
          Customize with <C value="className" /> or target{" "}
          <C value="frui-wysiwyg" />, <C value="frui-wysiwyg-toolbar" />,{" "}
          <C value="frui-wysiwyg-btn" />, and{" "}
          <C value="frui-wysiwyg-editable" /> classes. Additional classes
          like <C value="__frui-wysiwyg-t-*" /> (e.g.,{" "}
          <C value="__frui-wysiwyg-t-code" />) apply custom text styles, with only one style applied at a time to prevent nesting.
        </Translate>
      </p>

      <h2 id="api" className="uppercase font-bold text-lg mt-8">
        {_('API Reference')}
      </h2>
      <div>
        <p className="py-4">
          <Translate>
            The <C value="<WYSIWYG>" /> field can be passed the 
            following props.
          </Translate>
        </p>
        <Props props={props} />
      </div>

      <div className="flex items-center border-t theme-bg-2 mt-8 p-4">
        <a className="theme-2" href="/field/time">
          {_('Time')}
        </a>
        <div className="flex-grow"></div>
        <a className="theme-2" href="/format">
          {_('Formats')}
        </a>
      </div>
    </div>
  );
};

/**
 * Page head (SEO) component
 */
export function Head(props: PageProps) {
  const { styles = [] } = props;
  return (
    <ThemeHead
      uri="/field/wysiwyg"
      title="WYSIWYG Field"
      description={
        'WYSIWYG is a field component that provides a rich text editor '
        + 'with various formatting options.'
      }
      styles={styles}
    />
  );
};

/**
 * Main page component
 */
export function Page() {
  return (
    <LayoutProvider>
      <LayoutPanel pathname="/field/wysiwyg">
        <main className="flex flex-col h-full w-full">
          <div className="p-3 theme-bg-2">
            <Crumbs />
          </div>
          <section className="flex-grow relative h-full">
            <Menu />
            <Body />
          </section>
        </main>
      </LayoutPanel>
    </LayoutProvider>
  );
};

//defaults to page
export default Page;
