//types
import type { ReactNode, CSSProperties } from 'react';
//react
import React, { createContext } from 'react';
//hooks
import { useState, useEffect, useContext } from 'react'; 

/**
 * Modal Context Props
 */
export type ModalContextProps = { 
  _title: string,
  _className: string,
  _body?: ReactNode,
  _color?: string,
  opened: boolean,
  curved: boolean,
  rounded: boolean,
  pill: boolean,
  round: (size: 'none'|'rounded'|'curved'|'pill') => void,
  title: (title: string) => void,
  color: (color: string) => void,
  open: (opened: boolean) => void,
  className: (className: string) => void,
  body: (body: ReactNode) => void
};

export type ModalProviderProps = { 
  title?: string,
  color?: string,
  opened?: boolean,
  curved?: boolean,
  rounded?: boolean,
  pill?: boolean,
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

export const ModalContext = createContext<ModalContextProps>({ 
  _title: '', 
  _className: '', 
  _body: undefined,
  _color: '',
  opened: false,
  curved: false,
  rounded: false,
  pill: false,
  title: () => {},
  className: () => {},
  round: () => {},
  color: () => {},
  body: () => {},
  open: () => {},
});

export function ModalProvider({ children, ...config }: ModalProviderProps) {
  const [ ready, isReady ] = useState(false);
  const [ opened, open ] = useState(false);
  const [ _round, round ] = useState(config.curved 
    ? 'curved' : config.rounded 
    ? 'rounded' : config.pill
    ? 'pill': 'none'
  );
  const [ _title, title ] = useState(config.title || '');
  const [ _color, color ] = useState(config.color);
  const [ _className, className ] = useState(config.className || '');
  const [ _body, body ] = useState<React.ReactNode>();

  const value = { 
    _title,
    _className, 
    _body, 
    opened,
    curved: _round === 'curved',
    rounded: _round === 'rounded',
    pill: _round === 'pill', 
    className, 
    round,
    title,
    color,
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
          curved={_round === 'curved'}
          rounded={_round === 'rounded'}
          pill={_round === 'pill'}
          color={_color || undefined}
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

export function useModal() {
  const { className, title, body, round, color, open } = useContext(ModalContext);
  return { className, title, body, round, color, open };
}

export default function Modal(props: ModalProps) {
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

  const classNames = ['modal'];
  if (absolute) {
    classNames.push('modal-absolute');
  } else {
    classNames.push('modal-fixed');
  }
  if (className) {
    classNames.push(className);
  }
  const overlay = ['modal-overlay'];
  if (curved) {
    overlay.push('curved');
  } else if (rounded) {
    overlay.push('rounded');
  } else if (pill) {
    overlay.push('pill');
  }

  const headStyle = color ? { backgroundColor: color } : undefined;

  return (
    <div className={classNames.join(' ')} style={style}>
      <section className={overlay.join(' ')}>
        <header className="modal-head" style={headStyle}>
          <h6 className="modal-title">
            {title}
          </h6>
          {typeof onClose === 'function' && (
            <button className="modal-close" onClick={() => { onClose() }}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </header>
        <main className="modal-body">
          {children}
        </main>
      </section>
    </div>
  )
};