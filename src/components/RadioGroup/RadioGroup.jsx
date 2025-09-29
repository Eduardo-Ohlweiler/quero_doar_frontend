import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { radioGroupStyles, radioItemStyles, radioInputStyles, radioLabelStyles } from './RadioGroup.styles';

export default function RadioGroup({
    name,
    value,
    options = [],
    disabled = false,
    size = 'medium',
    orientation = 'vertical',
    onChange,
    className,
    ...rest
}) {
    const handleChange = (optionValue, event) => {
        if (!disabled) {
            onChange?.(optionValue, event);
        }
    };

    const radioName = name || `radio-group-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div 
            className={twMerge(clsx(
                radioGroupStyles({ orientation }),
                className
            ))}
            role="radiogroup"
            {...rest}
        >
            {options.map((option) => {
                const isChecked = value === option.value;
                const isDisabled = disabled || option.disabled;
                const radioId = option.id || `${radioName}-${option.value}`;

                return (
                    <label
                        key={option.value}
                        className={radioItemStyles({ size, disabled: isDisabled })}
                        htmlFor={radioId}
                    >
                        <input
                            id={radioId}
                            name={radioName}
                            type="radio"
                            value={option.value}
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={(event) => handleChange(option.value, event)}
                            className={radioInputStyles({ size, checked: isChecked, disabled: isDisabled })}
                        />

                        <div className={radioLabelStyles({ size, disabled: isDisabled })}>
                            {option.label && (
                                <span>
                                    {option.label}
                                </span>
                            )}
                            {option.count !== undefined && (
                                <span className={clsx(
                                    'text-gray-500 font-normal ml-1',
                                    size === 'small' && 'text-xs',
                                    size === 'medium' && 'text-sm',
                                    size === 'large' && 'text-base',
                                    isDisabled && 'text-gray-400'
                                )}>
                                    ({option.count})
                                </span>
                            )}
                            {option.description && (
                                <div className={clsx(
                                    'text-gray-600 mt-1 font-normal',
                                    size === 'small' && 'text-xs',
                                    size === 'medium' && 'text-sm',
                                    size === 'large' && 'text-sm',
                                    isDisabled && 'text-gray-400'
                                )}>
                                    {option.description}
                                </div>
                            )}
                        </div>
                    </label>
                );
            })}
        </div>
    );
}

RadioGroup.propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
            description: PropTypes.string,
            count: PropTypes.number,
            disabled: PropTypes.bool,
            id: PropTypes.string
        })
    ),
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    onChange: PropTypes.func,
    className: PropTypes.string
};