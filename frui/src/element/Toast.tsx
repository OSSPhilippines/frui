import React, { useState, useEffect, ReactNode, CSSProperties } from 'react';

export type ToastProps = {
  message: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error' | 'muted';
  color?: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  closable?: boolean;
  onClose?: () => void;
};

const defaultToastStyle: CSSProperties = {
    position: 'relative', 
    padding: '10px 15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 1,
    transition: 'opacity 0.3s ease-in-out',
  };

const typeStyles: Record<NonNullable<ToastProps['type']>, CSSProperties> = {
  info: { backgroundColor: '#e7f5ff', color: '#0c5460', borderColor: '#b8daff' },
  warning: { backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeeba' },
  success: { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' },
  error: { backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' },
  muted: { backgroundColor: '#e9ecef', color: '#6c757d', borderColor: '#dee2e6' },
};

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  color,
  duration = 3000,
  className,
  style,
  closable,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (duration > 0 && isVisible) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onClose) {
            onClose();
          }
        }, 300); // Match the CSS transition duration
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, onClose]);

  const handleClose = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300); // Match the CSS transition duration
  };

  if (!isVisible && !isFadingOut) {
    return null;
  }

  const toastStyle = {
    ...defaultToastStyle,
    ...typeStyles[type],
    ...(color && { backgroundColor: color, color: 'white' }), // Apply custom color if passed
    ...style,
    opacity: isFadingOut ? 0 : 1, // Control opacity based on fading state
  };

  return (
    <div className={`frui-toast ${className || ''}`} style={toastStyle}>
      <span>{message}</span>
      {closable && (
        <button
          onClick={handleClose}
          style={{
            marginLeft: '10px',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: toastStyle.color,
            fontSize: '16px',
          }}
          aria-label="Close toast"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Toast;
