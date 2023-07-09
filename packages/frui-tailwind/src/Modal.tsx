//types
import { ModalProps } from 'frui-core/dist/types/components';
//react
import React from 'react';
//hooks
import { useState } from 'react'; 
//helpers
import { makeGroupClasses, makeGroupStyles } from 'frui-core/dist/utils';

export const modal: Record<string, any> = {};

export const ModalProvider = () => {
  const [ opened, setOpened ] = useState(false);
  const [ className, setClassName ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState<React.ReactNode|undefined>();

  modal.className = (className: string) => setClassName(className);
  modal.title = (title: string) => setTitle(title);
  modal.body = (body: React.ReactNode|undefined) => setBody(body);
  modal.open = (open = true) => setOpened(open);
  modal.opened = opened;

  return React.createElement(Modal, {
    opened, 
    title, 
    className, 
    onClose: () => setOpened(false), 
  }, body);
};

const Modal: React.FC<ModalProps> = (props) => {
  const { 
    opened, 
    title, 
    style,
    className, 
    styles,
    classNames,
    onClose, 
    children 
  } = props;
  const map = {
    classes: makeGroupClasses(classNames, {
      overlay: [
        !opened? 'hidden': undefined,
        'bg-black',
        'bg-opacity-80',
        'max-h-full',
        'overflow-auto', 
        'fixed',
        'top-0',
        'bottom-0',
        'left-0',
        'right-0', 
        'flex',
        'items-center',
        'justify-center'
      ].filter(Boolean).join(' ').trim(),
      container: [
        'relative',
        'max-w-lg',
        'm-auto',
        className
      ].filter(Boolean).join(' ').trim(),
      head: 'flex items-center',
      title: 'flex-grow font-bold',
      close: 'text-2xl',
      body: undefined
    }),
    styles: makeGroupStyles(styles, {
      overlay: { zIndex: 10000 },
      container: style,
      head: undefined,
      title: undefined,
      close: undefined,
      body: undefined
    })
  };

  return (
    <div className={map.classes.overlay} style={map.styles.overlay}>
      <section 
        className={map.classes.container} 
        style={map.styles.container}
      >
        <header className={map.classes.head} style={map.styles.head}>
          <h6 className={map.classes.title} style={map.styles.title}>
            {title}
          </h6>
          <button 
            className={map.classes.close} 
            style={map.styles.close} onClick={() => { onClose() }}
          >
            <i className="fas fa-times"></i>
          </button>
        </header>
        <main className={map.classes.body} style={map.styles.body}>
          {children}
        </main>
      </section>
    </div>
  )
};

export default Modal;