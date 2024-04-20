//types
import type { FilelistProps } from './Filelist';
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
    uploading = 'Uploading...',
    defaultValue,
    value,
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
    defaultValue: defaultValue || value,
    onChange, 
    onUpdate, 
    onUpload 
  });
  //variables
  const classNames = [ 'frui-field-imagelist' ];
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
        className="frui-field-imagelist-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="frui-field-imagelist-file">
          <a 
            className="frui-field-imagelist-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            <img src={url} alt="preview" className="frui-field-imagelist-preview" />
            {url}
          </a>
          <div 
            className="frui-field-imagelist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
        </div>
      ))}
      {queued > 0 && (
        <div className="frui-field-imagelist-file">
          <span className="frui-field-imagelist-link">
            {uploading}
          </span>
        </div>
      )}
    </div>
  );
}