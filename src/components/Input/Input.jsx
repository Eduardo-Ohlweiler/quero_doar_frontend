import { useState, forwardRef } from 'react';
import { inputContainerStyles, inputFieldStyles, inputIconStyles, inputLabelStyles, inputHelperTextStyles } from './Input.styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Spinner from '../Spinner/Spinner';

const Input = forwardRef(({
    appearance = 'default',
    size = 'md',
    type = 'text',
    placeholder,
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
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
    
    const isDisabled = disabled || loading;
    const hasError = Boolean(error);
    const hasIcon = Boolean(icon) || loading;
    
    const spinnerSize = size === 'sm' ? 'small' : size === 'lg' ? 'medium' : 'small';
    const spinnerColor = appearance === 'default' ? 'primary' : 'white';

    const inputId = rest.id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const renderIcon = () => {
        if (loading) {
            return (
                <Spinner 
                    size={spinnerSize} 
                    strokeWidth="thin" 
                    color={spinnerColor}
                />
            );
        }
        
        if (typeof icon === 'string') {
            return <span className="w-full h-full flex items-center justify-center">{icon}</span>;
        }
        
        return icon;
    };

    return (
        <div className={twMerge(clsx('flex flex-col gap-1', className))}>
            {label && (
                <label 
                    htmlFor={inputId}
                    className={inputLabelStyles({ 
                        appearance, 
                        required, 
                        disabled: isDisabled,
                        error: hasError 
                    })}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            
            <div className={inputContainerStyles({ 
                appearance, 
                size, 
                focused: isFocused, 
                error: hasError, 
                disabled: isDisabled 
            })}>
                {hasIcon && iconPosition === 'left' && (
                    <div className={inputIconStyles({ 
                        appearance, 
                        size, 
                        position: 'left',
                        error: hasError 
                    })}>
                        {renderIcon()}
                    </div>
                )}
                
                <input
                    ref={ref}
                    id={inputId}
                    type={type}
                    className={inputFieldStyles({ 
                        appearance, 
                        size, 
                        iconPosition: hasIcon ? iconPosition : 'none',
                        error: hasError
                    })}
                    placeholder={placeholder}
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
                    aria-busy={loading || undefined}
                    required={required}
                    {...rest}
                />
                
                {hasIcon && iconPosition === 'right' && (
                    <div className={inputIconStyles({ 
                        appearance, 
                        size, 
                        position: 'right',
                        error: hasError 
                    })}>
                        {renderIcon()}
                    </div>
                )}
            </div>
            
            {(helperText || error) && (
                <div 
                    id={`${inputId}-helper`}
                    className={inputHelperTextStyles({ 
                        appearance, 
                        error: hasError 
                    })}
                >
                    {error || helperText}
                </div>
            )}
        </div>
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    appearance: PropTypes.oneOf(['default', 'minimal', 'outlined', 'outlined-white']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
};

export default Input;