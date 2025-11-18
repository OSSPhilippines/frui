//--------------------------------------------------------------------//
// Imports

//frui
import type { FilelistProps } from './FileList.js';
import { useFileList } from './FileList.js';
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
  const classNames = [ 'frui-form-image-list' ];
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
        className="frui-form-image-list-control"
        onChange={handlers.change} 
      />
      {uploaded.length > 0 && uploaded.map((url, i) => (
        <div key={i} className="frui-form-image-list-file">
          <img src={url} alt="preview" className="frui-form-image-list-preview" />
          <a 
            className="frui-form-image-list-link"
            href={url} 
            target="_blank" 
            rel="noreferrer"
          >
            {url}
          </a>
          <div 
            className="frui-form-image-list-remove"
            onClick={() => handlers.remove(i)}
          >
            &times;
          </div>
          <input type="hidden" name={name} value={url} />
        </div>
      ))}
      {queued > 0 && (
        <div className="frui-form-image-list-file">
          <span className="frui-form-image-list-link">
            {uploading}
          </span>
        </div>
      )}
    </div>
  );
};

//defaults to imagelist
export default Object.assign(ImageList, { 
  useImageList: useFileList ,
  use: useFileList
});