import React from 'react';
import './FormField.css';

interface BaseFieldProps {
  label: string;
  required?: boolean;
  error?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: 'text' | 'url' | 'email';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface TextAreaFieldProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  required = false,
  error,
  type = 'text',
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? 'error' : ''}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <span id={`${label}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  required = false,
  error,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={error ? 'error' : ''}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && (
        <span id={`${label}-error`} className="error-message">
          {error}
        </span>
      )}
    </div>
  );
};