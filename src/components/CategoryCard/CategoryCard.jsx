import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { categoryCardStyles, categoryCardIconStyles, categoryCardTitleStyles, categoryCardCountStyles } from './CategoryCard.styles';

export default function CategoryCard({
    children,
    title,
    count,
    onClick,
    className,
    disabled = false,
    ...rest
}) {
    return (
        <div
            className={twMerge(clsx(
                categoryCardStyles({ disabled }),
                className
            ))}
            onClick={disabled ? undefined : onClick}
            role={onClick && !disabled ? "button" : undefined}
            tabIndex={onClick && !disabled ? 0 : undefined}
            onKeyDown={onClick && !disabled ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(e);
                }
            } : undefined}
            aria-label={onClick && !disabled ? `Categoria ${title} com ${count} itens disponíveis` : undefined}
            {...rest}
        >
            {/* Ícone */}
            <div className={categoryCardIconStyles()}>
                {children}
            </div>

            {/* Título */}
            <h3 className={categoryCardTitleStyles()}>
                {title}
            </h3>

            {/* Contador */}
            <p className={categoryCardCountStyles()}>
                {count} {count === 1 ? 'item disponível' : 'itens disponíveis'}
            </p>
        </div>
    );
}

CategoryCard.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
};
