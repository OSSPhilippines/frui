//types
import type { FilelistProps } from '../types/fields';
//hooks
import { useFilelist } from './Filelist';
//components
import Input from './Input';

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
  //variables
  const classNames = [ 'field-imagelist' ];
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
        accept="image/*"
        error={error}
        className="field-imagelist-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="field-imagelist-file">
          <a 
            className="field-imagelist-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            <img src={url} alt="preview" style={{ height: '20px', marginRight: '8px' }} />
            {url}
          </a>
          <div 
            className="field-imagelist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
        </div>
      ))}
      {queued > 0 && (
        <div className="field-imagelist-file">
          <span className="field-imagelist-link">
            {locale.uploading}
          </span>
        </div>
      )}
    </div>
  );
}