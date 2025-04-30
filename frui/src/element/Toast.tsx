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
  info: { backgroundColor: '#E7F5FF', color: '#0C5460', borderColor: '#B8DAFF' },
  warning: { backgroundColor: '#FFF3CD', color: '#856404', borderColor: '#FFEEBA' },
  success: { backgroundColor: '#D4EDDA', color: '#155724', borderColor: '#C3E6CB' },
  error: { backgroundColor: '#F8D7DA', color: '#721C24', borderColor: '#F5C6CB' },
  muted: { backgroundColor: '#E9ECEF', color: '#6C757D', borderColor: '#DEE2E6' },
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
            color: toastStyle.color, // Inherits color, which might be a hex code
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