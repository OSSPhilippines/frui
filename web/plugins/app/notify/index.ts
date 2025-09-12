import type { ToastOptions } from 'react-toastify';
import React from 'react';
import UniversalCookie from 'universal-cookie';
import { toast, ToastContainer } from 'react-toastify';

const cookie = new UniversalCookie();
const cookieConfig = { path: '/' };

export const toastConfig = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

export { ToastContainer };

export function flash(type: string, message: string, close: number = 5000) {
  cookie.set('flash', JSON.stringify({ type, message, close }), cookieConfig);
};

export function unload() {
  const value = cookie.get('flash');
  if (value) {
    cookie.remove('flash', cookieConfig);
    const args: Record<string, any> = JSON.parse(value as string);
    notify(args.type, args.message, args.close);
  }
};

export default function notify(
  type: string, 
  message: string|React.ReactNode,
  autoClose?: number
) {
  if (!autoClose) {
    autoClose = toastConfig.autoClose || 5000;
  }
  const options = { ...toastConfig, autoClose } as ToastOptions;
  switch (type) {
    case 'info': toast.info(message, options); break;
    case 'warn': toast.warn(message, options); break;
    case 'error': toast.error(message, options); break;
    case 'success': toast.success(message, options); break;
  }
}