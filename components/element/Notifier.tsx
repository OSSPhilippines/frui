//--------------------------------------------------------------------//
// Imports

//modules
import type { JSX } from 'react';
import type { Id, ToastOptions } from 'react-toastify';
import { createContext, useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import UniversalCookie from 'universal-cookie';

//frui
import type { ChildrenProps } from '../types.js';

//--------------------------------------------------------------------//
// Types

export type { ToastOptions };

export type CookieOptions = {
  domain?: string,
  expires?: Date,
  httpOnly?: boolean,
  maxAge?: number,
  path?: string,
  partitioned?: boolean,
  priority?: 'low' | 'medium' | 'high',
  sameSite?: boolean | 'lax' | 'strict' | 'none',
  secure?: boolean
};

export type NotifierOptions = ToastOptions & CookieOptions & {
  name?: string
};

export type NotifierProviderProps = ChildrenProps & NotifierOptions;

export type NotifierProps = ChildrenProps & NotifierOptions & {
  info?: boolean,
  warning?: boolean,
  error?: boolean,
  success?: boolean
};

export type NotifierPayload = {
  type: string,
  message: string,
  config: ToastOptions
};

//--------------------------------------------------------------------//
// Constants

export const cookie = new UniversalCookie();

export const defaults: NotifierOptions = {
  autoClose: 5000,
  closeOnClick: true,
  draggable: true,
  hideProgressBar: false,
  name: 'flash',
  path: '/',
  position: 'bottom-center',
  pauseOnFocusLoss: false,
  pauseOnHover: true,
  rtl: false,
  theme: 'dark'
};

//--------------------------------------------------------------------//
// Helpers

/**
 * Layers the options over the defaults and returns separated config
 */
export function configure(options: NotifierOptions = {}) {
  const config = { ...defaults, ...options };
  const toast = {
    autoClose: config.autoClose,
    closeOnClick: config.closeOnClick,
    draggable: config.draggable,
    hideProgressBar: config.hideProgressBar,
    name: config.name,
    position: config.position,
    pauseOnFocusLoss: config.pauseOnFocusLoss,
    pauseOnHover: config.pauseOnHover,
    rtl: config.rtl,
    theme: config.theme
  };
  const cookie = {
    domain: config.domain,
    expires: config.expires,
    httpOnly: config.httpOnly,
    maxAge: config.maxAge,
    path: config.path,
    partitioned: config.partitioned,
    priority: config.priority,
    sameSite: config.sameSite,
    secure: config.secure
  };
  return { toast, cookie, name: config.name };
};

/**
 * Dismiss a toast by id or all if no id
 */
export function dismiss(id?: Id) {
  toast.dismiss(id);
};

/**
 * No hook flash
 */
export function flash(
  type: string, 
  message: string, 
  options: NotifierOptions = {}
) {
  const { 
    toast: toastConfig, 
    cookie: cookieConfig, 
    name
  } = configure(options);
  //create cookie data
  const data = JSON.stringify({ type, message, config: toastConfig });
  //set the cookie
  cookie.set(name!, data, cookieConfig);
};

/**
 * No hook notify function
 */
export function notify(
  type: string, 
  message: string | JSX.Element,
  options: ToastOptions = {}
) {
  const config = configure(options);
  switch (type) {
    case 'info': return toast.info(message, config.toast); 
    case 'warning': return toast.warn(message, config.toast);
    case 'error': return toast.error(message, config.toast);
    case 'success': return toast.success(message, config.toast);
  }
  return null;
};

/**
 * No hook unload
 */
export function unload(options?: CookieOptions, name = defaults.name) {
  //just extract the cookie config
  const { cookie: cookieConfig } = configure(options);
  //get the flash cookie
  const value = cookie.get(name!);
  //if we have a cookie
  if (value) {
    //remove it
    cookie.remove(name!, cookieConfig);
    //extract the notifier type, message and toast config
    const { 
      type, 
      message, 
      config 
    }: NotifierPayload = typeof value === 'string' 
      ? JSON.parse(value) 
      : value;
    //show the notification
    return notify(type, message, configure(config).toast);
  }
  return null;
};

//--------------------------------------------------------------------//
// Hooks

/**
 * Notify hook
 */
export function useNotifier() {
  const context = useContext(NotifierContext);
  const { cookie, toast, name } = configure(context);
  return {
    config: { cookie, toast, name },
    dismiss,
    notify: (
      type: string, 
      message: string | JSX.Element,
      options: ToastOptions = {}
    ) => notify(type, message, {...toast, ...options }),
    flash: (
      type: string, 
      message: string,
      options: NotifierOptions = {}
    ) => flash(
      type, 
      message, 
      { 
        ...{ name }, 
        ...toast, 
        ...cookie, 
        ...options 
      }),
    unload: () => unload(cookie, name)
  };
};

//--------------------------------------------------------------------//
// Components

/**
 * Notifier container component
 * (this is used in the provider)
 */
export const NotifierContainer = ToastContainer;

/**
 * Notifier context
 */
export const NotifierContext = createContext<NotifierOptions>(defaults);

/**
 * Notifier provider component
 * (this is what to put in app.tsx)
 */
export function NotifierProvider(props: NotifierProviderProps) {
  //props
  const { children, ...config } = props;
  //render
  return (
    <NotifierContext.Provider value={config}>
      {children}
      <NotifierContainer />
    </NotifierContext.Provider>
  );
};

/**
 * Notifier component
 */
export function Notifier(props: NotifierProps) {
  //props
  const { children, info, warning, error, success, ...options } = props;
  //hooks
  const { notify } = useNotifier();
  //variables
  const type = info ? 'info'
    : warning ? 'warning'
    : error ? 'error'
    : success ? 'success'
    : 'info';
  //effects
  useEffect(() => {
    let id: Id | null = null;
    if (children) {
      id = notify(type, children as JSX.Element, options);
    }
    return () => {
      if (id) dismiss(id);
    };
  }, []);
  //render
  return null;
};

export default Object.assign(Notifier, {
  Container: NotifierContainer,
  Context: NotifierContext,
  Provider: NotifierProvider,
  defaults,
  useNotifier,
  notify,
  flash,
  unload,
  dismiss
});