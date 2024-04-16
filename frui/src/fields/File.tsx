//types
import type { FileProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useFile from '../hooks/useFile';

/**
 * Generic File  Component (Main)
 */
export default function File(props: FileProps) {
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
  const classNames = [ 'field-file' ];
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
          error={error}
          className="field-file-control"
          onChange={handlers.change} 
        />
      )}
      {!url && uploading && (
        <div className="field-file-file">
          <span className="field-file-link">
            {locale.uploading}
          </span>
        </div>
      )}
      {url && (
        <div className="field-file-file">
          <a 
            className="field-file-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="field-file-reset"
            onClick={() => handlers.reset()}
          >
            &times;
          </div>
        </div>
      )}
    </div>
  );
}