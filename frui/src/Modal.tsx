//types
import type { ReactNode } from 'react';
import { ModalProps } from './types/components';
//react
import React from 'react';
//hooks
import { useState } from 'react'; 

export const modal: Record<string, any> = {};

export function ModalProvider() {
  const [ opened, setOpened ] = useState(false);
  const [ className, setClassName ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState<ReactNode|undefined>();

  modal.className = (className: string) => setClassName(className);
  modal.title = (title: string) => setTitle(title);
  modal.body = (body: ReactNode|undefined) => setBody(body);
  modal.open = (open = true) => setOpened(open);
  modal.opened = opened;

  return React.createElement(Modal, {
    opened, 
    title, 
    className, 
    onClose: () => setOpened(false), 
  }, body);
};

export default function Modal(props: ModalProps) {
  const { 
    opened, 
    title, 
    style = {},
    className, 
    onClose, 
    children 
  } = props;

  if (opened) {
    style.display = 'flex';
  }

  const classNames = ['control'];
  if (className) {
    classNames.push(className);
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      <section className="modal-overlay">
        <header className="modal-head">
          <h6 className="modal-title">
            {title}
          </h6>
          <button className="modal-close" onClick={() => { onClose() }}>
            <i className="fas fa-times"></i>
          </button>
        </header>
        <main className="modal-body">
          {children}
        </main>
      </section>
    </div>
  )
};