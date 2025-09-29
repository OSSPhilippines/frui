//--------------------------------------------------------------------//
// Imports

//modules
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { minimalSetup, basicSetup } from 'codemirror';
import { EditorView, lineNumbers } from '@codemirror/view';
import { EditorState, Extension } from '@codemirror/state';
import {
  LanguageSupport,
  LanguageDescription,
} from '@codemirror/language';
import { languages } from '@codemirror/language-data';

//frui
import Input from './Input.js';
import type { InputProps } from './Input.js';
import { ExtendsType } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type CodeEditorConfig = {
  language: string;
  onChange?: Function;
  onUpdate?: Function;
};

export type CodeEditorProps = ExtendsType<
  InputProps,
  {
    defaultValue?: string;
    extensions?: Extension[];
    language?: string;
    numbers?: boolean; //might not be needed (there's nothing special about it; could just add to extensions if necessary)
    setup?: 'minimal' | 'basic' | 'custom';
    value?: string;
  }
>;

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

export function useCodeEditor({
  language,
  onUpdate,
  onChange,
}: CodeEditorConfig) {
  const [languageExtension, setLanguageExtension] = useState<
    LanguageSupport | undefined
  >(undefined);

  useEffect(() => {
    getLanguageExtension(language).then((extension) => {
      setLanguageExtension(extension);
    });
  }, [language]);

  return {
    languageExtension,
    handlers: {
      update: (value: string) => {
        onUpdate && onUpdate(value);
      },
      change: (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event);
      },
    },
  };
};


//--------------------------------------------------------------------//
// Components

/**
 * Code Editor Component
 */
export function CodeEditor(props: CodeEditorProps) {
  const {
    defaultValue,
    extensions = [],
    language = '',
    numbers = false,
    onUpdate,
    onChange,
    setup = 'minimal',
    value,
    ...attributes
  } = props;

  const [currentValue, setCurrentValue] = useState<string>(value!);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const { languageExtension, handlers } = useCodeEditor({
    language,
    onChange,
    onUpdate,
  });
  const options = getEditorOptions(setup, numbers, extensions);

  useEffect(() => {
    if (editorRef.current) {
      const state = EditorState.create({
        doc: value ?? defaultValue ?? '',
        extensions: [
          options,
          languageExtension ?? [],
          EditorView.updateListener.of((viewUpdate) => {
            // if (onUpdate.docChanged && viewRef.current) {
            //   const newValue = viewRef.current.state.doc.toString();
            //   if (value) {
            //     setCurrentValue(newValue);
            //     handlers.update(newValue);
            //     handlers.change(newValue);
            //   } else {
            //     //default to uncontrolled
            //     inputRef.current!.value = newValue;
            //   }
            // }
            if (viewUpdate.docChanged && viewRef.current) {
              const newValue = viewUpdate.state.doc.toString();
              handlers.change({
                target: {
                  ...inputRef.current,
                  value: newValue,
                },
              } as ChangeEvent<HTMLInputElement>);
              handlers.update(newValue);

              if (value) {
                setCurrentValue(newValue);
              } else {
                inputRef.current!.value = newValue; //default to uncontrolled
              }
            }
          }),
        ],
      });

      viewRef.current = new EditorView({
        state,
        parent: editorRef.current,
      });
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, [languageExtension]);

  return (
    <div className={`frui-field-code-editor ${props.className || ''}`}>
      <Input
        {...attributes}
        passRef={inputRef}
        type='hidden'
        value={currentValue}
        defaultValue={defaultValue}
      />
      <div className='code-editor-container' ref={editorRef}></div>
    </div>
  );
};

//defaults to code editor
export default CodeEditor;
 