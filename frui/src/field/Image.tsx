//types
import type { FileProps } from './File.js';
//hooks
import { useFile } from './File.js';
//components
import Input from './Input.js';

/**
 * Generic Image  Component (Main)
 */
export default function Image(props: FileProps) {
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
  const { uploading, url, handlers } = useFile({ 
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
          className="frui-field-image-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="frui-field-image-file">
          <span className="frui-field-image-link">
            {locale}
          </span>
        </div>
      )}
      {url && (
        <div className="frui-field-image-file">
          <img 
            src={url} 
            alt="preview" 
            className="frui-field-image-image" 
          />
          <a 
            className="frui-field-image-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-image-reset"
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