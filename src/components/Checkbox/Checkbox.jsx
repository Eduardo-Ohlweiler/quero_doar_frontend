import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaCheck } from 'react-icons/fa';
import { checkboxStyles, checkboxLabelStyles, checkboxInputStyles, checkboxCountStyles } from './Checkbox.styles';

export default function Checkbox({
    id,
    name,
    checked = false,
    indeterminate = false,
    disabled = false,
    size = 'medium',
    label,
    description,
    count,
    onChange,
    className,
    children,
    ...rest
}) {
    const handleChange = (event) => {
        if (!disabled) {
            onChange?.(event.target.checked, event);
        }
    };

    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <label 
            className={twMerge(clsx(
                checkboxStyles({ size, disabled }),
                className
            ))}
            htmlFor={checkboxId}
        >
            <input
                id={checkboxId}
                name={name}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
                className={checkboxInputStyles({ size, checked, indeterminate, disabled })}
                ref={(input) => {
                    if (input) {
                        input.indeterminate = indeterminate;
                    }
                }}
                {...rest}
            />
            
            {label && (
                <span className={checkboxLabelStyles({ size, disabled })}>
                    {label}
                    {count !== undefined && (
                        <span className={checkboxCountStyles({ size })}>
                            ({count})
                        </span>
                    )}
                </span>
            )}
            
            {description && (
                <p className={clsx(
                    'text-gray-500 text-xs mt-1',
                    disabled && 'text-gray-400'
                )}>
                    {description}
                </p>
            )}
            
            {children}
        </label>
    );
}

Checkbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string,
    description: PropTypes.string,
    count: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node
};