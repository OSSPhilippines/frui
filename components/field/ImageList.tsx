//--------------------------------------------------------------------//
// Imports

//frui
import type { FilelistProps } from './Filelist.js';
import { useFileList } from './Filelist.js';
import Input from './Input.js';

//--------------------------------------------------------------------//
// Components

/**
 * Generic File  Component (Main)
 */
export function ImageList(props: FilelistProps) {
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
  const { queued, uploaded, handlers } = useFileList({ 
    defaultValue: defaultValue || value,
    onChange, 
    onUpdate, 
    onUpload 
  });
  //variables
  const classNames = [ 'frui-field-image-list' ];
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
        className="frui-field-image-list-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="frui-field-image-list-file">
          <img src={url} alt="preview" className="frui-field-image-list-preview" />
          <a 
            className="frui-field-image-list-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-field-image-list-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      ))}
      {queued > 0 && (
        <div className="frui-field-image-list-file">
          <span className="frui-field-image-list-link">
            {uploading}
          </span>
        </div>
      )}
    </div>
  );
};

//defaults to imagelist
export default ImageList;