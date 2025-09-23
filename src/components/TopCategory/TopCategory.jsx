import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { topCategoryStyles, topCategoryHeaderStyles, topCategoryTitleStyles, topCategorySubtitleStyles, topCategoryGridStyles } from './TopCategory.styles';
import CategoryCard from '../CategoryCard/CategoryCard';

export default function TopCategory({
    categories = [],
    onCategoryClick,
    className,
    title = "Categorias Populares",
    subtitle = "Encontre doações por categoria",
    maxCategories = 5,
    ...rest
}) {
    // Limita ao número máximo de categorias (top 5)
    const displayCategories = categories.slice(0, maxCategories);

    const handleCategoryClick = (category) => {
        onCategoryClick?.(category);
    };

    return (
        <section
            className={twMerge(clsx(
                topCategoryStyles(),
                className
            ))}
            aria-label={title}
            {...rest}
        >
            {/* Header com título e subtítulo */}
            <div className={topCategoryHeaderStyles()}>
                <h2 className={topCategoryTitleStyles()}>
                    <span className="mr-2">📱</span>
                    {title}
                </h2>
                <p className={topCategorySubtitleStyles()}>
                    {subtitle}
                </p>
            </div>

            {/* Grid de categorias */}
            <div className={topCategoryGridStyles()}>
                {displayCategories.map((category) => (
                    <CategoryCard
                        key={category.id || category.title}
                        title={category.title}
                        count={category.count}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.icon}
                    </CategoryCard>
                ))}
            </div>

            {/* Mensagem quando não há categorias */}
            {displayCategories.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-500">
                        Nenhuma categoria disponível no momento
                    </p>
                </div>
            )}
        </section>
    );
}

TopCategory.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            title: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            icon: PropTypes.node.isRequired,
        })
    ),
    onCategoryClick: PropTypes.func,
    className: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    maxCategories: PropTypes.number,
};
