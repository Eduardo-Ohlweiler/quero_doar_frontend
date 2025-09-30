import { useState, forwardRef } from 'react';
import { searchBarStyles, searchInputStyles, searchIconStyles } from './SearchBar.styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Spinner from '../Spinner/Spinner';

const SearchIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const SearchBar = forwardRef(({
    appearance = 'default',
    size = 'md',
    placeholder = 'Buscar...',
    iconPosition = 'left',
    loading = false,
    onSearch,
    className,
    disabled,
    value,
    onChange,
    ...rest
}, ref) => {
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
    
    const handleKeyDown = (e) => {
        rest.onKeyDown?.(e);
        if (e.key === 'Enter' && onSearch && !e.defaultPrevented) {
            e.preventDefault();
            onSearch(inputValue);
        }
    };
    
    const isDisabled = disabled || loading;
    
    const spinnerSize = size === 'sm' ? 'small' : size === 'lg' ? 'medium' : 'small';
    
    const spinnerColor = appearance === 'default' 
        ? 'primary' 
        : 'white';

    const handleIconClick = () => {
        if (onSearch && !isDisabled) {
            onSearch(inputValue);
        }
    };

    return (
        <div className={twMerge(clsx(searchBarStyles({ appearance, size }), className))}>
            {iconPosition === 'left' && (
                <div 
                    className={searchIconStyles({ appearance, size, position: 'left' })}
                    onClick={handleIconClick}
                    role={onSearch ? "button" : undefined}
                    tabIndex={onSearch && !isDisabled ? 0 : -1}
                    aria-label="Executar busca"
                    onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && onSearch && !isDisabled) {
                            e.preventDefault();
                            handleIconClick();
                        }
                    }}
                >
                    {loading ? (
                        <Spinner 
                            size={spinnerSize} 
                            strokeWidth="thin" 
                            color={spinnerColor}
                        />
                    ) : (
                        <SearchIcon className="w-full h-full" />
                    )}
                </div>
            )}
            
            <input
                ref={ref}
                type="search"
                className={twMerge(clsx(
                    searchInputStyles({ 
                        appearance, 
                        size, 
                        iconPosition 
                    })
                ))}
                placeholder={placeholder}
                disabled={isDisabled}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                aria-busy={loading || undefined}
                aria-label={rest['aria-label'] || `Buscar ${placeholder.toLowerCase()}`}
                {...(() => {
                    // Filtrar props que não devem ser passadas para o elemento DOM
                    const { searchTerm, hasSearchTerm, clear, ...validProps } = rest;
                    return validProps;
                })()}
            />
            
            {iconPosition === 'right' && (
                <div 
                    className={searchIconStyles({ appearance, size, position: 'right' })}
                    onClick={handleIconClick}
                    role={onSearch ? "button" : undefined}
                    tabIndex={onSearch && !isDisabled ? 0 : -1}
                    aria-label="Executar busca"
                    onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && onSearch && !isDisabled) {
                            e.preventDefault();
                            handleIconClick();
                        }
                    }}
                >
                    {loading ? (
                        <Spinner 
                            size={spinnerSize} 
                            strokeWidth="thin" 
                            color={spinnerColor}
                        />
                    ) : (
                        <SearchIcon className="w-full h-full" />
                    )}
                </div>
            )}
        </div>
    );
});

SearchBar.displayName = 'SearchBar';

SearchBar.propTypes = {
    appearance: PropTypes.oneOf(['default', 'minimal', 'outlined']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    placeholder: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    loading: PropTypes.bool,
    onSearch: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
};

export default SearchBar;
