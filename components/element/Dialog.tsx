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

export type DialogProviderContextProps = {
  //container id
  containerId: string
};

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

export type DialogOverlayProps = HTMLElementProps<HTMLDivElement>;

export type DialogConfig = {
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
  //slot: props for overlay element
  & { 
    overlay?: false | HTMLElementProps<HTMLDivElement> & {
      //whether to close the dialog when clicking outside
      close: boolean
    } 
  };

//--------------------------------------------------------------------//
// Hooks

/**
 * Use dialog hook
 * (use this in your react component to control dialogs)
 */
export function useDialogContext() {
  const { containerId } = useContext(DialogProviderContext);
  const context = useContext(DialogContext);
  return { containerId, ...context };
};

/**
 * Dialog aggregate hook wrapper
 */
export function useDialog(config: DialogConfig) {
  //props
  const { 
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
  const { containerId } = useContext(DialogProviderContext);
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
      const container = document.getElementById(containerId);
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
    containerId, 
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
 * Dialog context
 */
export const DialogProviderContext = createContext<DialogProviderContextProps>({
  //container id
  containerId: ''
});

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
 * Dialog provider component
 * (put this in app.tsx)
 */
export function DialogProvider(props: DialogProviderProps) {
  //props
  const { 
    //overlay (container) class name
    className, //?: string
    //pass the children
    children, //?: ReactNode
    //container id
    id: containerId = 'dialog-root',
    //overlay (container) styles
    style //?: React.CSSProperties
  } = props;
  //variables
  // configure classes
  const classes = [ 'frui-dialog-container' ];
  if (className) classes.push(className);
  //render
  return (
    <DialogProviderContext.Provider value={{ containerId }}>
    {children}
    {!!containerId && (
      <div 
        id={containerId} 
        className={classes.join(' ')} 
        style={style}
      ></div>
    )}
    </DialogProviderContext.Provider>
  );
};

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
    //contents of the dialog
    children, //?: ReactNode
    //dialog class name
    className, //?: string=
    ...attributes
  } = props;
  //variables
  // configure classes
  const classes = [ 'frui-dialog-overlay' ];
  if (className) classes.push(className);
  return (
    <div {...attributes} className={classes.join(' ')}>
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
    //contents of the dialog
    children, //?: ReactNode
    //dialog class name
    className, //?: string
    //slot: class/style to apply to overlay element
    overlay, //?: false | HTMLElementProps<HTMLDivElement> & ...
    //dialog styles
    style, //?: React.CSSProperties
    ...attributes
  } = props;
  //hooks
  const { dialogOpened, handlers } = useDialog(props);
  //variables
  const { closeDialog, openDialog, portal } = handlers;
  // configure classes
  const classes = [ 'frui-dialog' ];
  if (className) classes.push(className);
  // handlers
  const onOverlayClick = () => {
    overlay && overlay.close && closeDialog();
  };
  const ignoreOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  // configure provider
  const provider = { closeDialog, dialogOpened, openDialog };
  //render
  if (!dialogOpened) return null;
  return (
    <DialogContext.Provider value={provider}>
      {portal(
        <DialogOverlay {...overlay} onClick={onOverlayClick}>
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
};

export default Object.assign(Dialog, {
  Context: DialogContext,
  Provider: DialogProvider,
  Overlay: DialogOverlay,
  Close: DialogClose,
  useContext: useDialogContext,
  useDialog
});