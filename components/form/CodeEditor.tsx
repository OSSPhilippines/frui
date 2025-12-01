//--------------------------------------------------------------------//
// Imports

//modules
import type { Extension } from '@codemirror/state';
import { useEffect, useRef, useState } from 'react';
import { minimalSetup, basicSetup } from 'codemirror';
import { EditorView, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import {
  LanguageSupport,
  LanguageDescription,
} from '@codemirror/language';
import { languages } from '@codemirror/language-data';

//frui
import type { HTMLTextareaProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type CodeEditorConfig = {
  defaultValue?: string,
  language: string,
  onUpdate?: (value?: string) => void,
  options: Extension,
  value?: string
};

export type CodeEditorProps = HTMLTextareaProps & {
  defaultValue?: string,
  extensions?: Extension[],
  language?: string,
  // might not be needed 
  // there's nothing special about it
  // could just add to extensions if necessary
  numbers?: boolean, 
  onUpdate?: (value?: string) => void,
  setup?: 'minimal' | 'basic' | 'custom',
  value?: string
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Defines CodeMirror options.
 */
export function getEditorOptions(
  setup: string,
  numbers: boolean,
  extensions: Extension[]
): Extension {
  //@codemirror provides basic and minimal setups
  const options: Extension[] = [];
  switch (setup) {
    case 'minimal':
      options.push(minimalSetup);
      break;
    case 'basic':
      options.push(basicSetup);
      break;
    case 'custom':
      options.push();
      break;
    //not necessary but added for completeness
    default:
      options.push();
      break;
  }
  //have to add user-defined extensions after the setup
  options.push(extensions);

  //adds numbers (redundant when using basic setup)
  if (numbers) {
    options.push(lineNumbers());
  }

  return options;
};

/**
 * Language extension loader
 */
export async function getLanguageExtension(
  language: string
): Promise<LanguageSupport | undefined> {
  const langName = language.toLowerCase();

  const lang = languages.find(
    (lang: LanguageDescription) =>
      lang.name.toLowerCase() === langName ||
      lang.alias?.map((a) => a.toLowerCase()).includes(langName)
  );

  if (lang) {
    await lang.load();
    const support: LanguageSupport | undefined = lang.support;
    return support;
  }

  return undefined;
};

//--------------------------------------------------------------------//
// Hooks

export function useCodeEditor(config: CodeEditorConfig) {
  //config
  const { 
    defaultValue,
    language, 
    onUpdate, 
    options,
    value
  } = config;
  //hooks
  const [ 
    currentValue, 
    setCurrentValue 
  ] = useState(defaultValue);
  const [ 
    languageExtension, 
    setLanguageExtension 
  ] = useState<LanguageSupport>();
  //variables
  const refs = {
    field: useRef<HTMLTextAreaElement | null>(null),
    editor: useRef<HTMLDivElement | null>(null),
    view: useRef<EditorView | null>(null),
  };
  const handlers = {
    create(parent?: HTMLDivElement) {
      if (!parent) return null;
      const state = EditorState.create({
        doc: currentValue || '',
        extensions: [
          options,
          languageExtension ?? [],
          EditorView.updateListener.of((viewUpdate) => {
            if (viewUpdate.docChanged && refs.view.current) {
              handlers.update(viewUpdate.state.doc.toString());
            }
          }),
        ]
      });
      return new EditorView({ state, parent });
    },
    update(value?: string) {
      setCurrentValue(value);
      onUpdate && onUpdate(value);
    }
  };
  // effects
  // whenever value changes, update currentValue
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [ value ]);
  // whenever language changes, load the corresponding extension
  useEffect(() => {
    getLanguageExtension(language).then(extension => {
      setLanguageExtension(extension);
    });
  }, [ language ]);
  // whenever languageExtension changes, re-initialize the editor
  useEffect(() => {
    if (refs.editor.current) {
      const view = handlers.create(refs.editor.current);
      if (view) {
        refs.view.current = view;
      }
    }

    return () => {
      if (refs.view.current) {
        refs.view.current.destroy();
      }
    };
  }, [ languageExtension ]);
  
  return {
    currentValue,
    languageExtension,
    refs,
    handlers
  };
};


//--------------------------------------------------------------------//
// Components

/**
 * Code Editor Component
 */
export function CodeEditor(props: CodeEditorProps) {
  //props
  const {
    className,
    defaultValue,
    extensions = [],
    language = '',
    numbers = false,
    onUpdate,
    setup = 'minimal',
    style,
    value,
    ...attributes
  } = props;
  //hooks
  const { currentValue, refs } = useCodeEditor({
    defaultValue,
    language,
    onUpdate,
    options: getEditorOptions(setup, numbers, extensions),
    value
  });
  //variables
  const classes = [ 'frui-form-code-editor' ];
  className && classes.push(className);
  //render
  return (
    <div className={classes.join(' ')} style={style}>
      <div className="frui-form-code-editor-container" ref={refs.editor}></div>
      <textarea 
        {...attributes} 
        className="frui-form-code-editor-field" 
        ref={refs.field} 
        value={currentValue} 
        readOnly
      />
    </div>
  );
};

//defaults to code editor
export default Object.assign(CodeEditor, {
  getEditorOptions,
  getLanguageExtension,
  useCodeEditor,
  getOptions: getEditorOptions,
  use: useCodeEditor
});
 