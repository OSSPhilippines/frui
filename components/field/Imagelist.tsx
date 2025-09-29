//--------------------------------------------------------------------//
// Imports

//types
import type { FilelistProps } from './Filelist.js';
//hooks
import { useFilelist } from './Filelist.js';
//components
import Input from './Input.js';

//--------------------------------------------------------------------//
// Components

/**
 * Generic File  Component (Main)
 */
export function Imagelist(props: FilelistProps) {
  //separate component related props from field attributes
  const { 
    uploading = 'Uploading...',
    name,
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
          <img src={url} alt="preview" className="frui-field-imagelist-preview" />
          <a 
            className="frui-field-imagelist-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-imagelist-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
          <input type="hidden" name={name} value={url} />
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
};

//defaults to imagelist
export default Imagelist;