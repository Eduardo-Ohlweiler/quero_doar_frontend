import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { topCategoryStyles, topCategoryHeaderStyles, topCategoryTitleStyles, topCategorySubtitleStyles, topCategoryGridStyles } from './TopCategory.styles';
import CategoryCard from '../CategoryCard/CategoryCard';
import { GiClothes } from 'react-icons/gi';
import { MdDesk, MdPets, MdOutlineApps } from 'react-icons/md';
import { FaUtensils, FaBookOpen, FaLaptop, FaBowlFood, FaBaby } from 'react-icons/fa6';
import { TbHorseToy } from 'react-icons/tb';
import { FaTools } from 'react-icons/fa';

export default function TopCategory({
    categories = [],
    onCategoryClick,
    className,
    title = "Categorias Populares",
    subtitle = "Encontre doações por categoria",
    maxCategories = 5,
    ...rest
}) {
    const displayCategories = categories
        .sort((a, b) => b.donationAvailable - a.donationAvailable) // Ordena por donationAvailable (descendente)
        .slice(0, maxCategories) // Corta os top 5 ou maxCategories
        .sort((a, b) => a.name.localeCompare(b.name)); // Ordena por name (ascendente)

    const categoryIcon = (categoryName) => {
        switch (categoryName) {
            case "Roupas":
                return <GiClothes />;
            case "Móveis":
                return <MdDesk />;
            case "Utensílios Domésticos":
                return <FaUtensils />;
            case "Livros e Material Escolar":
                return <FaBookOpen />;
            case "Brinquedos":
                return <TbHorseToy />;
            case "Eletrônicos":
                return <FaLaptop />;
            case "Pets":
                return <MdPets />;
            case "Alimentos":
                return <FaBowlFood />;
            case "Itens para Bebês":
                return <FaBaby />;
            case "Ferramentas e Materiais":
                return <FaTools />;
            default:
                return <MdOutlineApps />;
        }

    }

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
                        key={category.donationId || category.name}
                        title={category.name}
                        count={category.donationAvailable}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {categoryIcon(category.name)}
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
