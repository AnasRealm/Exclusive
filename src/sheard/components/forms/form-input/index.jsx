import React from "react";
import "./style.css";

export const FormInput = React.forwardRef(({ 
  placeholder, 
  type = "text", 
  errorMessage, 
  ...props 
}, ref) => {
  return (
    <div className="form-input-group">
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`form-input ${errorMessage ? 'error' : ''}`}
        {...props}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
});

FormInput.displayName = "FormInput";