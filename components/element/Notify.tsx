//modules
import type { ReactNode } from 'react';
import type { ToastOptions } from 'react-toastify';
import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UniversalCookie from 'universal-cookie';

//--------------------------------------------------------------------//
// Types

export type NotifyContextProps = {
  config: {
    position: string,
    autoClose: number,
    hideProgressBar: boolean,
    closeOnClick: boolean,
    pauseOnHover: boolean,
    draggable: boolean,
    theme: string,
  }
};

export type NotifyProviderProps = { 
  config?: {
    position: string,
    autoClose: number,
    hideProgressBar: boolean,
    closeOnClick: boolean,
    pauseOnHover: boolean,
    draggable: boolean,
    theme: string,
  },
  children: ReactNode 
};

//--------------------------------------------------------------------//
// Constants

export const config = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export const NotifyContainer = ToastContainer;

//--------------------------------------------------------------------//
// Context & Provider

export const NotifyContext = createContext<NotifyContextProps>({ config });

// (this is what to put in app.tsx)
export function NotifyProvider(props: NotifyProviderProps) {
  const { 
    children, 
    config = {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    } 
  } = props;
  
  return (
    <NotifyContext.Provider value={{ config }}>
      {children}
    </NotifyContext.Provider>
  );
};

//--------------------------------------------------------------------//
// Hooks and Functions

const cookieConfig = { path: '/' };
const cookie = new UniversalCookie();

/**
 * No hook notify function
 */
export function notify(
  type: string, 
  message: string|React.ReactNode,
  autoClose?: number
) {
  if (!autoClose) {
    autoClose = config.autoClose || 5000;
  }
  const options = { ...config, autoClose } as ToastOptions;
  switch (type) {
    case 'info': toast.info(message, options); break;
    case 'warn': toast.warn(message, options); break;
    case 'error': toast.error(message, options); break;
    case 'success': toast.success(message, options); break;
  }
};

/**
 * No hook flash
 */
export function flash(type: string, message: string, close: number = 5000) {
  cookie.set('flash', JSON.stringify({ type, message, close }), cookieConfig);
};

/**
 * No hook unload
 */
export function unload() {
  const value = cookie.get('flash');
  if (value) {
    cookie.remove('flash', cookieConfig);
    const args: Record<string, any> = typeof value === 'string' 
      ? JSON.parse(value) 
      : value;
    notify(args.type, args.message, args.close);
  }
};

export function useNotify() {
  const { config } = useContext(NotifyContext);
  const handlers = {
    notify(
      type: string, 
      message: string|React.ReactNode,
      autoClose?: number
    ) {
      if (!autoClose) {
        autoClose = config.autoClose || 5000;
      }
      const options = { ...config, autoClose } as ToastOptions;
      switch (type) {
        case 'info': toast.info(message, options); break;
        case 'warn': toast.warn(message, options); break;
        case 'error': toast.error(message, options); break;
        case 'success': toast.success(message, options); break;
      }
    },
    flash,
    unload() {
      const value = cookie.get('flash');
      if (value) {
        cookie.remove('flash', cookieConfig);
        const args: Record<string, any> = JSON.parse(value as string);
        handlers.notify(args.type, args.message, args.close);
      }
    }
  };
  return handlers;
};