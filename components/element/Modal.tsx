//--------------------------------------------------------------------//
// Imports

//modules
import type { ReactNode, CSSProperties } from 'react';
import { 
  createContext, 
  createElement,
  useContext, 
  useState, 
  useEffect
} from 'react';

//frui
import Button from '../form/Button.js';
import { useNotify } from './Notify.js';

//--------------------------------------------------------------------//
// Types

export type ModalConfirmProps = { 
  open: Function,
  message: ReactNode
  confirmed: Function,
  confirm?: string,
  cancel?: string
};

export type ModalContextProps = { 
  _title: string,
  _className: string,
  _body?: ReactNode,
  opened: boolean,
  title: (title: string) => void,
  open: (opened: boolean) => void,
  className: (className: string) => void,
  body: (body: ReactNode) => void
};

export type ModalProviderProps = { 
  title?: string,
  className?: string,
  children: ReactNode
};

export type ModalProps = {
  opened?: boolean,
  fixed?: boolean,
  absolute?: boolean,
  onClose?: Function,
  title?: string,
  curved?: boolean,
  rounded?: boolean,
  pill?: boolean,
  style?: CSSProperties,
  color?: string,
  className?: string,
  children?: React.ReactNode
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Modal hook to access modal context
 */
export function useModal() {
  const { className, title, body, open } = useContext(ModalContext);
  return { className, title, body, open };
};

/**
 * Confirm hook to open a confirm modal
 */
export function useConfirm(config: {
  label: () => string,
  message: () => ReactNode,
  action: () => Promise<void>
}) {
  const { label, message, action } = config;
  const { open, title, body } = useModal();
  const { notify } = useNotify();
  const confirmed = () => action().then(() => {
    open(false);
  }).catch(e => {
    open(false);
    notify('error', e.message);
  });
  const confirm = () => {
    title(label());
    body(createElement(ModalConfirm, { 
      open, 
      message: message(), 
      confirmed
    }));
    open(true);
  };

  return { confirm };
};

//--------------------------------------------------------------------//
// Context & Provider

/**
 * Modal context state
 */
export const ModalContext = createContext<ModalContextProps>({ 
  _title: '', 
  _className: '', 
  _body: undefined,
  opened: false, 
  title: () => {},
  className: () => {},
  body: () => {},
  open: () => {},
});

/**
 * Modal provider component
 * (this is what to put in app.tsx) 
 */
export function ModalProvider({ children, ...config }: ModalProviderProps) {
  const [ ready, isReady ] = useState(false);
  const [ opened, open ] = useState(false);
  const [ _title, title ] = useState(config.title || '');
  const [ _className, className ] = useState(config.className || '');
  const [ _body, body ] = useState<React.ReactNode>();

  const value = { 
    _title,
    _className, 
    _body, 
    opened, 
    className, 
    title,
    body,
    open 
  };

  useEffect(() => {
    isReady(true);
  }, []);
  
  return (
    <ModalContext.Provider value={value}>
      {children}
      {ready && (
        <Modal 
          title={_title} 
          className={_className} 
          opened={opened} 
          onClose={() => open(false)}
        >
          {_body}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

//--------------------------------------------------------------------//
// Components

/**
 * Modal confirm component
 */
export function ModalConfirm(props: ModalConfirmProps) {
  const { 
    open, 
    message, 
    confirmed, 
    confirm = 'Confirm', 
    cancel = 'Cancel' 
  } = props;
  return (
    <div className="modal-confirm">
      <p className="message">{message}</p>
      <Button success className="confirm" onClick={() => {
        open(false);
        confirmed();
      }}>
        <i className="icon fas fa-fw fa-check"></i>
        {confirm}
      </Button>
      <Button error className="cancel" onClick={() => open(false)}>
        <i className="icon fas fa-fw fa-ban"></i>
        {cancel}
      </Button>
    </div>
  )
};

/**
 * Modal component (main)
 */
export function Modal(props: ModalProps) {
  const { 
    opened = false, 
    absolute,
    title, 
    curved,
    rounded,
    pill, 
    color,
    style = {},
    className, 
    onClose, 
    children 
  } = props;

  if (opened) {
    style.display = 'flex';
  }

  const classNames = [ 'frui-modal' ];
  if (absolute) {
    classNames.push('frui-modal-absolute');
  } else {
    classNames.push('frui-modal-fixed');
  }
  if (className) {
    classNames.push(className);
  }
  const overlay = ['frui-modal-overlay'];
  if (curved) {
    overlay.push('frui-curved');
  } else if (rounded) {
    overlay.push('frui-rounded');
  } else if (pill) {
    overlay.push('frui-pill');
  }

  const headStyle = color ? { backgroundColor: color } : undefined;

  return (
    <div className={classNames.join(' ')} style={style}>
      <section className={overlay.join(' ')}>
        <header className="frui-modal-head" style={headStyle}>
          <h6 className="frui-modal-title">
            {title}
          </h6>
          {typeof onClose === 'function' && (
            <button 
              className="frui-modal-close" 
              onClick={() => { onClose() }}
            >
              &times;
            </button>
          )}
        </header>
        <main className="frui-modal-body">
          {children}
        </main>
      </section>
    </div>
  )
};

//defaults to modal
export default Modal;