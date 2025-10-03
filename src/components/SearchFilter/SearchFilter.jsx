import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp, FaFilter, FaInfoCircle } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

import Button from '../Button/Button';
import LocationFilter from './LocationFilter/LocationFilter';
import Checkbox from '../Checkbox/Checkbox';
import RadioGroup from '../RadioGroup/RadioGroup';
import {
  searchFilterStyles,
  searchFilterHeaderStyles,
  searchFilterTitleStyles,
  searchFilterSectionStyles,
  searchFilterSectionHeaderStyles,
  searchFilterSectionTitleStyles,
  searchFilterSectionToggleStyles,
  searchFilterSectionContentStyles,
  searchFilterCheckboxGroupStyles,
  searchFilterTooltipStyles
} from './SearchFilter.styles';

import { DONATION_TYPE_OPTIONS, ACCESS_TYPE_OPTIONS, DISTANCE_OPTIONS } from '../../services/donation/constant/donationFilter';

/**
 * SearchFilter Component
 * 
 * Componente de filtros avançados com arquitetura híbrida:
 * - Filtros estáticos: Tipos de doação, acesso e distância (estrutura {id, name})
 * - Filtros dinâmicos: Estados/cidades, categorias e tags de item (estruturas específicas)
 * 
 * @component
 * @example
 * <SearchFilter
 *   donationTypes={[1, 2]}
 *   categories={categoriesData}
 *   availableItemStates={tagsData}
 *   onDonationTypesChange={handleDonationTypes}
 * />
 */
function SearchFilter({
  // Filtros estáticos - Tipos de doação
  donationTypes = [],
  onDonationTypesChange,
  
  // Filtros estáticos - Tipos de acesso
  accessTypes = [],
  onAccessTypesChange,
  
  // Filtros dinâmicos - Localização
  availableStates = [],
  selectedStates = [],
  selectedCities = [],
  onStatesChange,
  onCitiesChange,
  onFetchCities,
  
  // Filtros dinâmicos - Categorias
  categories = [],
  selectedCategories = [],
  onCategoriesChange,
  
  // Filtros estáticos - Distância
  selectedDistance = null,
  onDistanceChange,
  
  // Filtros dinâmicos - Estado do item (tags)
  itemStates = [],
  onItemStatesChange,
  availableItemStates = [],
  
  // Props gerais
  className,
  onClearAll,
  ...rest
}) {
  const [expandedSections, setExpandedSections] = useState({
    donationType: true,
    accessType: true,
    location: true,
    category: true,
    distance: true,
    itemState: true
  });

  const [expandedCategories, setExpandedCategories] = useState({});
  const [showDistanceTooltip, setShowDistanceTooltip] = useState(false);

  /**
   * Handler genérico para mudanças em checkboxes
   */
  const handleCheckboxChange = (value, currentArray, onChange) => {
    if (!onChange) return;
    
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    onChange(newArray);
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  /**
   * Handler para mudanças em categorias principais
   */
  const handleCategoryChange = (categoryId, isSelected) => {
    const category = categories.find(cat => cat.categoryId === categoryId);
    if (!category || !onCategoriesChange) return;

    let newSelectedCategories = [...selectedCategories];

    if (isSelected) {
      if (category.subcategories) {
        category.subcategories.forEach(sub => {
          if (!newSelectedCategories.includes(sub.subcategoryId)) {
            newSelectedCategories.push(sub.subcategoryId);
          }
        });
      }
    } else {
      if (category.subcategories) {
        category.subcategories.forEach(sub => {
          newSelectedCategories = newSelectedCategories.filter(id => id !== sub.subcategoryId);
        });
      }
    }

    onCategoriesChange(newSelectedCategories);
  };

  /**
   * Handler para mudanças em subcategorias
   */
  const handleSubcategoryChange = (subcategoryId, isSelected) => {
    if (!onCategoriesChange) return;
    
    let newSelectedCategories = [...selectedCategories];

    if (isSelected) {
      if (!newSelectedCategories.includes(subcategoryId)) {
        newSelectedCategories.push(subcategoryId);
      }
    } else {
      newSelectedCategories = newSelectedCategories.filter(id => id !== subcategoryId);
    }

    onCategoriesChange(newSelectedCategories);
  };

  const handleClearAll = () => {
    onDonationTypesChange?.([]);
    onAccessTypesChange?.([]);
    onStatesChange?.([]);
    onCitiesChange?.([]);
    onCategoriesChange?.([]);
    onDistanceChange?.(null);
    onItemStatesChange?.([]);
    onClearAll?.();
  };

  /**
   * Renderiza o cabeçalho de uma seção com toggle e tooltip opcional
   */
  const renderSectionHeader = (title, sectionKey, tooltip = null) => (
    <div className={searchFilterSectionHeaderStyles()}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleSection(sectionKey)}
          className={searchFilterSectionToggleStyles()}
          aria-expanded={expandedSections[sectionKey]}
          aria-label={`${expandedSections[sectionKey] ? 'Recolher' : 'Expandir'} seção ${title}`}
        >
          {expandedSections[sectionKey] ? (
            <FaChevronUp className="w-4 h-4" />
          ) : (
            <FaChevronDown className="w-4 h-4" />
          )}
        </button>
        <h3 className={searchFilterSectionTitleStyles()}>
          {title}
        </h3>
        {tooltip && (
          <div className="relative">
            <button
              onMouseEnter={() => sectionKey === 'distance' && setShowDistanceTooltip(true)}
              onMouseLeave={() => sectionKey === 'distance' && setShowDistanceTooltip(false)}
              onClick={() => sectionKey === 'distance' && setShowDistanceTooltip(!showDistanceTooltip)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Informações sobre distância"
            >
              <FaInfoCircle className="w-3 h-3" />
            </button>
            {sectionKey === 'distance' && showDistanceTooltip && (
              <div className={searchFilterTooltipStyles()}>
                {tooltip}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  /**
   * Renderiza uma lista de checkboxes genérica
   */
  const renderCheckboxList = (options, selectedValues, onChange) => (
    <div className="space-y-1">
      {options.map((option) => (
        <Checkbox
          key={option.id}
          label={option.name}
          checked={selectedValues.includes(option.id)}
          onChange={() => handleCheckboxChange(option.id, selectedValues, onChange)}
          size="medium"
        />
      ))}
    </div>
  );

  /**
   * Renderiza o filtro de categorias com lógica de indeterminate
   */
  const renderCategoriesFilter = () => (
    <div className={searchFilterCheckboxGroupStyles()}>
      {categories.map((category) => {
        const selectedSubcategoriesCount = category.subcategories 
          ? category.subcategories.filter(sub => selectedCategories.includes(sub.subcategoryId)).length 
          : 0;
        const totalSubcategoriesCount = category.subcategories ? category.subcategories.length : 0;
        
        // Estado indeterminate: algumas subcategorias selecionadas, mas não todas
        const isIndeterminate = selectedSubcategoriesCount > 0 && selectedSubcategoriesCount < totalSubcategoriesCount;
        
        // Categoria está "checked" apenas se TODAS as subcategorias estão selecionadas
        const isChecked = totalSubcategoriesCount > 0 && selectedSubcategoriesCount === totalSubcategoriesCount;

        return (
          <div key={category.categoryId} className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Checkbox
                  label={category.name}
                  checked={isChecked}
                  indeterminate={isIndeterminate}
                  onChange={(checked) => handleCategoryChange(category.categoryId, checked)}
                  size="medium"
                />
              </div>
              {category.subcategories && category.subcategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.categoryId)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  aria-label={`${expandedCategories[category.categoryId] ? 'Recolher' : 'Expandir'} subcategorias de ${category.name}`}
                >
                  {expandedCategories[category.categoryId] ? (
                    <FaChevronUp className="w-3 h-3" />
                  ) : (
                    <FaChevronDown className="w-3 h-3" />
                  )}
                </button>
              )}
            </div>

            {category.subcategories && 
             category.subcategories.length > 0 && 
             expandedCategories[category.categoryId] && (
              <div className="ml-4 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <Checkbox
                    key={subcategory.subcategoryId}
                    label={subcategory.name}
                    checked={selectedCategories.includes(subcategory.subcategoryId)}
                    onChange={(checked) => handleSubcategoryChange(subcategory.subcategoryId, checked)}
                    size="medium"
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={twMerge(clsx(
        searchFilterStyles(),
        className
      ))}
      {...rest}
    >
      <div className={searchFilterHeaderStyles()}>
        <div className="flex items-center gap-2">
          <FaFilter className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className={searchFilterTitleStyles()}>Filtros</h2>
        </div>
        <Button
          appearance="ghost"
          size="small"
          onClick={handleClearAll}
          className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-primary)]/10"
        >
          Limpar tudo
        </Button>
      </div>

      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Tipo de Doação', 'donationType')}
        {expandedSections.donationType && (
          <div className={searchFilterSectionContentStyles()}>
            {renderCheckboxList(DONATION_TYPE_OPTIONS, donationTypes, onDonationTypesChange)}
          </div>
        )}
      </div>

      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Acesso', 'accessType')}
        {expandedSections.accessType && (
          <div className={searchFilterSectionContentStyles()}>
            {renderCheckboxList(ACCESS_TYPE_OPTIONS, accessTypes, onAccessTypesChange)}
          </div>
        )}
      </div>

      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Localização', 'location')}
        {expandedSections.location && (
          <div className={searchFilterSectionContentStyles()}>
            <LocationFilter
              availableStates={availableStates}
              selectedStates={selectedStates}
              selectedCities={selectedCities}
              onStatesChange={onStatesChange}
              onCitiesChange={onCitiesChange}
              onFetchCities={onFetchCities}
            />
          </div>
        )}
      </div>

      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Categoria', 'category')}
        {expandedSections.category && (
          <div className={searchFilterSectionContentStyles()}>
            {renderCategoriesFilter()}
          </div>
        )}
      </div>

      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader(
          'Distância', 
          'distance',
          'As buscas por distância são apenas relativas às cidades, não pelo endereço da doação.'
        )}
        {expandedSections.distance && (
          <div className={searchFilterSectionContentStyles()}>
            <RadioGroup
              name="distance"
              value={selectedDistance}
              options={DISTANCE_OPTIONS.map(option => ({
                value: option.id,
                label: option.name
              }))}
              onChange={(value) => onDistanceChange?.(value)}
              size="medium"
              orientation="vertical"
            />
          </div>
        )}
      </div>

      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Estado do Item', 'itemState')}
        {expandedSections.itemState && (
          <div className={searchFilterSectionContentStyles()}>
            <div className="space-y-1">
              {availableItemStates.map((tag) => (
                <Checkbox
                  key={tag.donationTagId}
                  label={tag.name}
                  checked={itemStates.includes(tag.donationTagId)}
                  onChange={() => handleCheckboxChange(tag.donationTagId, itemStates, onItemStatesChange)}
                  size="medium"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SearchFilter.propTypes = {
  // Filtros estáticos - Doações
  donationTypes: PropTypes.arrayOf(PropTypes.number),
  onDonationTypesChange: PropTypes.func,
  
  // Filtros estáticos - Acesso
  accessTypes: PropTypes.arrayOf(PropTypes.number),
  onAccessTypesChange: PropTypes.func,
  
  // Filtros dinâmicos - Localização
  availableStates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    cities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }))
  })),
  selectedStates: PropTypes.arrayOf(PropTypes.string),
  selectedCities: PropTypes.arrayOf(PropTypes.string),
  onStatesChange: PropTypes.func,
  onCitiesChange: PropTypes.func,
  onFetchCities: PropTypes.func,
  
  // Filtros dinâmicos - Categorias
  categories: PropTypes.arrayOf(PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    subcategories: PropTypes.arrayOf(PropTypes.shape({
      subcategoryId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  })),
  selectedCategories: PropTypes.arrayOf(PropTypes.number),
  onCategoriesChange: PropTypes.func,
  
  // Filtros estáticos - Distância
  selectedDistance: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  onDistanceChange: PropTypes.func,
  
  // Filtros dinâmicos - Estado do item (tags)
  itemStates: PropTypes.arrayOf(PropTypes.number),
  onItemStatesChange: PropTypes.func,
  availableItemStates: PropTypes.arrayOf(PropTypes.shape({
    donationTagId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })),
  
  // Props gerais
  className: PropTypes.string,
  onClearAll: PropTypes.func
};

export default SearchFilter;