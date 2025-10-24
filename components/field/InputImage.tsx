//--------------------------------------------------------------------//
// Imports

//types
import type { FileProps } from './InputFile.js';
//hooks
import { useInputFile } from './InputFile.js';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Components

/**
 * Generic Image  Component (Main)
 */
export function Image(props: FileProps) {
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
  const { uploading, url, handlers } = useInputFile({ 
    //files are not controllable because it relies on the file object
    //not the value attribute. Therefore, defaultValue is used instead
    //and value and defaultValue are used interchangeably.
    defaultValue: defaultValue || value as string|undefined,
    onChange, 
    onUpdate, 
    onUpload 
  });
  const classNames = [ 'field-image' ];
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
          className="frui-field-input-image-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="frui-field-input-image-file">
          <span className="frui-field-input-image-link">
            {locale}
          </span>
        </div>
      )}
      {url && (
        <div className="frui-field-input-image-file">
          <img 
            src={url} 
            alt="preview" 
            className="frui-field-input-image-image" 
          />
          <a 
            className="frui-field-input-image-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-input-image-reset"
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
export default Image;