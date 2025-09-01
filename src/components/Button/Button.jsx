import { buttonStyles } from './Button.styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Spinner from '../Spinner/Spinner';

export default function Button({ appearance = 'primary', size = 'medium', loading = false, children, className, disabled, ...rest }) {
    const isDisabled = disabled || loading;
    const spinnerSize = size === 'small' ? 'small' : size === 'large' ? 'medium' : 'small';
    
    return (
        <button
            className={twMerge(clsx(buttonStyles({ appearance, size }), className))}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            {...rest}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <Spinner 
                        size={spinnerSize} 
                        strokeWidth="thin" 
                        color={appearance === 'primary' ? 'white' : '[var(--color-primary)]'} 
                    />
                    <span>Carregando...</span>
                </div>
            ) : children}
        </button>
    );
}

Button.propTypes = {
    appearance: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    loading: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};