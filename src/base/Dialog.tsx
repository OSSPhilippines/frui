//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX } from 'react';
import { 
  createContext, 
  useContext, 
  useEffect,
  useState
} from 'react';
import { createPortal } from 'react-dom';

//frui
import type { 
  ClassStyleProps, 
  ChildrenProps, 
  HTMLElementProps
} from '../types.js';

//--------------------------------------------------------------------//
// Types

export type DialogContextProps = {
  //function to close dialog
  closeDialog: () => void,
  //whether the dialog is opened or not
  dialogOpened: boolean,
  //function to open dialog
  openDialog: () => void
};

export type DialogProviderProps = ClassStyleProps & ChildrenProps & {
  //id of the dialog container
  id?: string
};

export type DialogCloseProps = ClassStyleProps & ChildrenProps & {
  //triggers when dialog is closed
  onClose?: () => void
};

export type DialogOverlayProps = HTMLElementProps<HTMLDivElement> & {
  //whether to position the dialog absolutely (fixed by default)
  absolute?: boolean,
  //whether to close the dialog when clicking outside
  close?: boolean
};

export type DialogConfig = {
  //selector used to get the element to which the dialog will be
  // appended to when activated
  append?: string,  
  //uncontrolled open state
  defaultOpen?: boolean,
  //triggers when dialog is closed
  onClose?: () => void,
  //triggers when dialog is opened
  onOpen?: () => void,
  //controlled open state
  open?: boolean
};

export type DialogProps = DialogConfig 
  & HTMLElementProps<HTMLDivElement> 
  & {
    //slot: props for overlay element
    overlay?: boolean | HTMLElementProps<HTMLDivElement> & {
      //whether to position the dialog absolutely (fixed by default)
      absolute?: boolean,
      //whether to close the dialog when clicking outside
      close?: boolean
    }
  };

//--------------------------------------------------------------------//
// Hooks

/**
 * Use dialog hook
 * (use this in your react component to control dialogs)
 */
export function useDialogContext() {
  return useContext(DialogContext);
};

/**
 * Dialog aggregate hook wrapper
 */
export function useDialog(config: DialogConfig) {
  //props
  const { 
    //selector used to get the element to which the dialog will be
    // appended to when activated
    append, //?: string  
    //uncontrolled open state
    defaultOpen = false, //?: boolean
    //triggers when dialog is closed
    onClose, //?: () => void
    //triggers when dialog is opened
    onOpen, //?: () => void
    //whether to open it or not
    //controlled open state
    open //?: boolean
  } = config;
  //hooks
  const [ dialogOpened, openDialog ] = useState(defaultOpen);
  const [ openedBefore, hasOpenedBefore ] = useState(false);
  //handlers
  const handlers = {
    closeDialog() {
      //if already closed, do nothing
      if (!dialogOpened) return;
      //close dialog
      openDialog(false);
      //if it has opened before, trigger onClose
      openedBefore && onClose && onClose();
    },
    openDialog() {
      //if already opened, do nothing
      if (dialogOpened) return;
      //open dialog
      openDialog(true);
      //if it hasn't opened before, mark as opened
      openedBefore || hasOpenedBefore(true);
      //and trigger onOpen
      onOpen && onOpen();
    },
    portal(dialog: JSX.Element) {
      if (!append) return null;
      const container = document.querySelector(append);
      if (!container) return null;
      return createPortal(dialog, container);
    }
  };
  //effects
  //whenever open changes, toggle the dialog
  useEffect(() => {
    //if no open state is provided, do nothing
    if (typeof open !== 'boolean') return;
    open ? handlers.openDialog() : handlers.closeDialog();
  }, [ open ]);

  return { 
    dialogOpened, 
    openedBefore, 
    handlers, 
    openDialog, 
    hasOpenedBefore 
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Dialog portal context
 */
export const DialogContext = createContext<DialogContextProps>({
  //function to close dialog
  closeDialog: () => {},
  //whether the dialog is opened or not
  dialogOpened: false,
  //function to open dialog
  openDialog: () => {}
});

/**
 * Dialog close component
 */
export function DialogClose(props: DialogCloseProps) {
  //props
  const { children, className, onClose, style } = props;
  //hooks
  const { closeDialog } = useDialogContext();
  //variables 
  const classes = [ 'frui-dialog-close' ];
  if (className) classes.push(className);
  const close = () => {
    //close dialog
    closeDialog();
    //trigger onClose
    onClose && onClose();
  };
  //render
  return (
    <div 
      className={classes.join(' ')} 
      onClick={close}
      style={style}
    >
      {children}
    </div>
  );
};

/**
 * Dialog overlay component
 */
export function DialogOverlay(props: DialogOverlayProps) {
  //props
  const { 
    //whether to position the dialog absolutely (fixed by default)
    absolute, //?: boolean
    //contents of the dialog
    children, //?: ReactNode
    //dialog class name
    className, //?: string
    //whether to close the dialog when clicking outside
    close, //?: boolean
    ...attributes
  } = props;
  //hooks
  const { closeDialog } = useDialogContext();
  //variables
  // configure classes
  const classes = [ 
    'frui-dialog-overlay', 
    absolute ? 'frui-absolute' : 'frui-fixed' 
  ];
  if (className) classes.push(className);
  return (
    <div 
      {...attributes} 
      className={classes.join(' ')} 
      onClick={() => close && closeDialog()}
    >
      {children}
    </div>
  );
};

/**
 * Dialog Component
 */
export function Dialog(props: DialogProps) {
  //props
  const { 
    //selector used to get the element to which the dialog will be
    // appended to when activated
    append, //?: string  
    //contents of the dialog
    children, //?: ReactNode
    //dialog class name
    className, //?: string
    //slot: props for overlay element
    overlay,
    //dialog styles
    style, //?: React.CSSProperties
    ...attributes
  } = props;
  //hooks
  const { dialogOpened, handlers } = useDialog(props);
  //variables
  // configure classes
  const classes = [ 'frui-dialog' ];
  className && classes.push(className);
  // handlers
  const ignoreOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  //render
  // if dialog is not opened, return null
  if (!dialogOpened) {
    return null;
  }
  // configure provider
  const provider = { 
    closeDialog: handlers.closeDialog, 
    dialogOpened, 
    openDialog: handlers.openDialog 
  };
  // if no overlay
  if (props.overlay === false) {
    // if append is provided, use portal (without overlay)
    if (append) {
      return (
        <DialogContext.Provider value={provider}>
          {handlers.portal(
            <div 
              {...attributes}
              className={classes.join(' ')} 
              style={style}
            >
              {children}
            </div>
          )}
        </DialogContext.Provider>
      );  
    }
    // otherwise, render normally (without overlay)
    return (
      <DialogContext.Provider value={provider}>
        <div 
          {...attributes}
          className={classes.join(' ')} 
          style={style}
        >
          {children}
        </div>
      </DialogContext.Provider>
    );
  }
  //extract close from overlay
  const overlayProps = typeof overlay === 'object' ? overlay: {};
  // if append is provided, use portal (with overlay)
  if (append) {
    return (
      <DialogContext.Provider value={provider}>
        {handlers.portal(
          <DialogOverlay {...overlayProps}>
            <div 
              {...attributes}
              className={classes.join(' ')} 
              onClick={ignoreOverlayClick}
              style={style}
            >
              {children}
            </div>
          </DialogOverlay>
        )}
      </DialogContext.Provider>
    );  
  }
  // otherwise, render normally (with overlay)
  return (
    <DialogContext.Provider value={provider}>
      <DialogOverlay {...overlayProps}>
        <div 
          {...attributes}
          className={classes.join(' ')} 
          onClick={ignoreOverlayClick}
          style={style}
        >
          {children}
        </div>
      </DialogOverlay>
    </DialogContext.Provider>
  );
};

//defaults to dialog
export default Object.assign(Dialog, {
  useDialog,
  useDialogContext,
  Context: DialogContext,
  Overlay: DialogOverlay,
  Close: DialogClose,
  useContext: useDialogContext,
  use: useDialog
});