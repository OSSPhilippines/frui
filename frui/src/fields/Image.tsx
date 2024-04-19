//types
import type { FileProps } from './File';
//hooks
import { useFile } from './File';
//components
import Input from './Input';

/**
 * Generic Image  Component (Main)
 */
export default function Image(props: FileProps) {
  //separate component related props from field attributes
  const { 
    uploading: locale = 'Uploading...',
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
    defaultValue,
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
          <a 
            className="frui-field-image-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            <img 
              src={url} 
              alt="preview" 
              className="frui-field-image-image" 
            />
            {url}
          </a>
          <div 
            className="frui-field-image-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
};