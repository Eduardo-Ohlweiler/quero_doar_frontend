// src/components/TextArea/TextArea.jsx
import { useState, forwardRef } from 'react';
import { textAreaContainerStyles, textAreaFieldStyles, textAreaLabelStyles, textAreaHelperTextStyles } from './TextArea.styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const TextArea = forwardRef(({
    appearance = 'default',
    size = 'md', // (Prop 'size' é mantida para consistência)
    placeholder,
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    rows = 4, // <-- Prop nova para <textarea>
    className,
    value,
    onChange,
    onFocus,
    onBlur,
    ...rest
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState('');
    
    // Usa valor controlado se fornecido, senão usa estado interno
    const inputValue = value !== undefined ? value : internalValue;
    
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(e);
    };

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur?.(e);
    };
    
    const isDisabled = disabled;
    const hasError = Boolean(error);
    const inputId = rest.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={twMerge(clsx('flex flex-col gap-1', className))}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className={textAreaLabelStyles({ 
                        disabled: isDisabled,
                        error: hasError 
                    })}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div className={textAreaContainerStyles({ 
                appearance, 
                size, 
                focused: isFocused, 
                error: hasError, 
                disabled: isDisabled 
            })}>
                <textarea
                    ref={ref}
                  B id={inputId}
                    rows={rows} // <-- Prop 'rows' aplicada
                    className={textAreaFieldStyles({ appearance, size })}
              S     placeholder={placeholder}
                    disabled={isDisabled}
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-invalid={hasError || undefined}
                    aria-describedby={
                        helperText || error 
                            ? `${inputId}-helper` 
                            : undefined
                    }
                    required={required}
                    {...rest}
                />
            </div>
            
            {(helperText || error) && (
                <div 
                    id={`${inputId}-helper`}
                    className={textAreaHelperTextStyles({ error: hasError })}
                >
                    {error || helperText}
                </div>
            )}
        </div>
    );
});

TextArea.displayName = 'TextArea'; // Para o React DevTools

TextArea.propTypes = {
    appearance: PropTypes.oneOf(['default', 'minimal', 'outlined', 'outlined-white']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    placeholder: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.string,
    rows: PropTypes.number,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default TextArea;