// types
import type { CSSProperties } from 'react';
// hooks
import { useRef, useState, useEffect, useCallback } from 'react';

export type JsonValue = object | string | null;

export type JsonFieldProps = {
  name?: string,
  value?: JsonValue,
  defaultValue?: JsonValue,
  onChange?: (value: object | null) => void,
  onError?: (error: string | null) => void,
  placeholder?: string,
  disabled?: boolean,
  readOnly?: boolean,
  className?: string,
  style?: CSSProperties,
  rows?: number,
  indent?: number,
  validateOnChange?: boolean
};

function useJsonField(config: JsonFieldProps) {
  // 1. config
  const {
    value,
    defaultValue,
    onChange,
    onError,
    name,
    placeholder = 'Enter JSON...',
    disabled = false,
    readOnly = false,
    className,
    style,
    rows = 6,
    indent = 2,
    validateOnChange = true
  } = config;
  // 2. hooks
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Determine if component is controlled to decide state management strategy
  const isControlled = value !== undefined;
  // Initialize with properly formatted JSON string based on input type
  const initialValue = isControlled ? value : (defaultValue ?? '');
  const [internalValue, setInternalValue] = useState<string>(() => {
    if (typeof initialValue === 'object' && initialValue !== null) {
      return JSON.stringify(initialValue, null, indent);
    }
    return typeof initialValue === 'string' ? initialValue : '';
  });
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  // 3. variables
  // Use controlled value when available, otherwise use internal state
  const currentValue = (() => {
    if (isControlled) {
      if (typeof value === 'object' && value !== null) {
        return JSON.stringify(value, null, indent);
      }
      return (value as string) || '';
    }
    return internalValue;
  })();
  // Build CSS classes based on component state
  const classNames = ['frui-field-json'];
  if (className) classNames.push(className);
  const textareaClassNames = [
    'frui-field-json-textarea',
    'w-full p-3 border rounded font-mono text-sm resize-vertical'
  ];
  // Apply validation styling based on JSON validity
  if (isValid) {
    textareaClassNames.push('border-gray-300');
  } else {
    textareaClassNames.push('border-red-500');
  }
  // Apply state-specific styling for accessibility and UX
  if (disabled) {
    textareaClassNames.push('bg-gray-100 cursor-not-allowed');
  } else if (readOnly) {
    textareaClassNames.push('bg-gray-50');
  } else {
    textareaClassNames.push('bg-white');
  }
  textareaClassNames.push('focus:outline-none focus:ring-2 focus:ring-blue-500');
  // 4. handlers
  // Validate JSON string and return parsing results
  const validateJson = useCallback((jsonString: string): { isValid: boolean; parsed?: object; error?: string } => {
    if (!jsonString.trim()) {
      return { isValid: true };
    }

    try {
      const parsed = JSON.parse(jsonString);
      return { isValid: true, parsed };
    } catch (err) {
      return {
        isValid: false,
        error: err instanceof Error ? err.message : 'Invalid JSON format'
      };
    }
  }, []);

  const handleChange = useCallback((newValue: string) => {
    // Only update internal state for uncontrolled components
    if (!isControlled) {
      setInternalValue(newValue);
    }

    // Validate JSON if required to provide immediate feedback
    if (validateOnChange) {
      const validation = validateJson(newValue);
      setIsValid(validation.isValid);
      setError(validation.error || null);

      // Notify parent of validation errors for form handling
      onError?.(validation.error || null);

      // Only call onChange with valid JSON to prevent invalid data propagation
      if (validation.isValid && onChange) {
        onChange(validation.parsed || null);
      }
    } else {
      // Always notify parent without validation when validation is disabled
      onChange?.(newValue as any);
    }
  }, [isControlled, validateOnChange, validateJson, onError, onChange]);

  const formatJson = useCallback(() => {
    // Format the current JSON with proper indentation for better readability
    const validation = validateJson(currentValue);
    if (validation.isValid && validation.parsed) {
      const formatted = JSON.stringify(validation.parsed, null, indent);
      handleChange(formatted);
    }
  }, [currentValue, validateJson, indent, handleChange]);
  // 5. effects
  useEffect(() => {
    // Sync controlled value changes and validate new values
    if (isControlled && typeof value === 'object' && value !== null) {
      const formatted = JSON.stringify(value, null, indent);
      if (formatted !== currentValue) {
        setInternalValue(formatted);
        // Validate the new value to update error state
        const validation = validateJson(formatted);
        setIsValid(validation.isValid);
        setError(validation.error || null);
        onError?.(validation.error || null);
      }
    }
  }, [value, indent, isControlled, currentValue, validateJson, onError]);
  // 6. Return usable variables
  return {
    textareaRef,
    currentValue,
    error,
    isValid,
    disabled,
    readOnly,
    placeholder,
    rows,
    name,
    classNames,
    textareaClassNames,
    style,
    handleChange,
    formatJson
  };
}

export default function JsonField(props: JsonFieldProps) {
  // 1. hooks
  const {
    textareaRef,
    currentValue,
    error,
    isValid,
    disabled,
    readOnly,
    placeholder,
    rows,
    name,
    classNames,
    textareaClassNames,
    style,
    handleChange,
    formatJson
  } = useJsonField(props);
  // 2. render
  return (
    <div className={classNames.join(' ')} style={style}>
      <div className="frui-field-json-container relative">
        <textarea
          ref={textareaRef}
          name={name}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={formatJson}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          className={textareaClassNames.join(' ')}
        />

        {/* Format button for better JSON readability */}
        {!readOnly && !disabled && (
          <button
            type="button"
            onClick={formatJson}
            className="frui-field-json-format-btn absolute top-2 right-2 px-2 py-1 text-xs
            bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Format
          </button>
        )}
      </div>

      {/* Error feedback for invalid JSON */}
      {error && (
        <div className="frui-field-json-error mt-1 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Hidden input for form submission */}
      {name && (
        <input
          name={name}
          type="hidden"
          value={isValid ? currentValue : ''}
        />
      )}
    </div>
  );
}