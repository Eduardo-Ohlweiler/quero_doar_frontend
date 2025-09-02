import { logoStyles, logoSymbolStyles, logoTextStyles } from './Logo.styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import LogoSvg from './Logo.svg?react';

const Logo = ({ 
    variant = 'full', 
    size = 'md', 
    color = 'primary', 
    className,
    ...rest 
}) => {
    const renderSymbol = () => (
        <LogoSvg 
            className={twMerge(clsx(logoSymbolStyles({ size, color })))}
            aria-hidden="true"
        />
    );

    const renderText = () => (
        <span className={twMerge(clsx(logoTextStyles({ size, color })))}>
            Quero Doar
        </span>
    );

    const renderContent = () => {
        switch (variant) {
            case 'symbol':
                return renderSymbol();
            case 'text':
                return renderText();
            case 'full':
            default:
                return (
                    <>
                        {renderSymbol()}
                        {renderText()}
                    </>
                );
        }
    };

    const getAriaLabel = () => {
        if (variant === 'symbol') return `Símbolo Quero Doar`;
        if (variant === 'text') return `Texto Quero Doar`;
        return `Logo Quero Doar - ${size} - ${color}`;
    };

    return (
        <div
            className={twMerge(clsx(logoStyles({ variant, size, color }), className))}
            role="img"
            aria-label={getAriaLabel()}
            {...rest}
        >
            {renderContent()}
        </div>
    );
};

Logo.propTypes = {
    variant: PropTypes.oneOf(['full', 'symbol', 'text']),
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
    color: PropTypes.oneOf(['primary', 'white', 'dark', 'current']),
    className: PropTypes.string,
};

export default Logo;
