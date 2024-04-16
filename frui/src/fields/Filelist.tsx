//types
import type { FilelistProps } from '../types/fields';
//components
import Input from './Input';
//hooks
import useFilelist from '../hooks/useFilelist';

/**
 * Generic File  Component (Main)
 */
export default function Filelist(props: FilelistProps) {
  //separate component related props from field attributes
  const { 
    locale = {
      uploading: 'Uploading...',
      progress: '%s of %s uploaded',
      complete: '%s files uploaded'
    },
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
  const { queued, uploaded, handlers } = useFilelist({ 
    defaultValue,
    onChange, 
    onUpdate, 
    onUpload 
  });
  
  const classNames = [ 'field-filelist' ];
  if (className) {
    classNames.push(className);
  }
  //render
  return (
    <div className={classNames.join(' ')} style={style}>
      <Input 
        {...attributes} 
        multiple
        type="file" 
        error={error}
        className="field-filelist-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="field-filelist-file">
          <a 
            className="field-filelist-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="field-filelist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
        </div>
      ))}
      {queued > 0 && (
        <div className="field-filelist-file">
          <span className="field-filelist-link">
            {locale.uploading}
          </span>
        </div>
      )}
    </div>
  );
}