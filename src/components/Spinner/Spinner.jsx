import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { spinnerStyles } from './Spinner.styles';

export default function Spinner({ 
    size = 'medium', 
    strokeWidth = 'medium', 
    color = 'primary', 
    className,
    ...rest 
}) {
    return (
        <div
            className={twMerge(clsx(spinnerStyles({ size, strokeWidth, color }), className))}
            data-testid='loading-spinner'
            aria-label="Carregando..."
            {...rest}
        >
            <span className="sr-only">Carregando...</span>
        </div>
    );
}

Spinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
    strokeWidth: PropTypes.oneOf(['thin', 'medium', 'thick']),
    color: PropTypes.oneOf(['primary', 'white', 'blue', 'green', 'red']),
    className: PropTypes.string,
};
