//types
import type { FileProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useFile from '../hooks/useFile';

/**
 * Generic Image  Component (Main)
 */
export default function Image(props: FileProps) {
  //separate component related props from field attributes
  const { 
    locale = { uploading: 'Uploading...' },
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
          className="field-image-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="field-image-file">
          <span className="field-image-link">
            {locale.uploading}
          </span>
        </div>
      )}
      {url && (
        <div className="field-image-file">
          <a 
            className="field-image-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            <img 
              src={url} 
              alt="preview" 
              className="field-image-image" 
            />
            {url}
          </a>
          <div 
            className="field-image-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
};