//--------------------------------------------------------------------//
// Imports

//types
import type { FileInputProps } from './FileInput.js';
//hooks
import { useFileInput } from './FileInput.js';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Components

/**
 * Generic Image  Component (Main)
 */
export function ImageInput(props: FileInputProps) {
  //separate component related props from field attributes
  const { 
    uploading: locale = 'Uploading...',
    name,
    value,
    defaultValue,
    error,
    style,
    className,
    onChange,
    onUpdate,
    onUpload,
    ...attributes 
  } = props;
  //hooks
  const { uploading, url, handlers } = useFileInput({ 
    //files are not controllable because it relies on the file object
    //not the value attribute. Therefore, defaultValue is used instead
    //and value and defaultValue are used interchangeably.
    defaultValue: defaultValue || value as string|undefined,
    onChange, 
    onUpdate, 
    onUpload 
  });
  const classNames = [ 'frui-form-image-input' ];
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <div className={classNames.join(' ')} style={style}>
      {!url && !uploading && (
        <Input 
          {...attributes} 
          type="file" 
          accept="image/*"
          error={error}
          className="frui-form-image-input-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="frui-form-image-input-file">
          <span className="frui-form-image-input-link">
            {locale}
          </span>
        </div>
      )}
      {url && (
        <div className="frui-form-image-input-file">
          <img 
            src={url} 
            alt="preview" 
            className="frui-form-image-input-image" 
          />
          <a 
            className="frui-form-image-input-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-form-image-input-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      )}
    </div>
  );
};

//defaults to image
export default Object.assign(ImageInput, { 
  useImageInput: useFileInput,
  use: useFileInput
});