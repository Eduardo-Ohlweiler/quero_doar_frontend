import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaChevronDown, FaChevronUp, FaFilter, FaTimes, FaInfoCircle } from 'react-icons/fa';
import LocationFilter from './LocationFilter/LocationFilter';
import Checkbox from '../Checkbox/Checkbox';
import RadioGroup from '../RadioGroup/RadioGroup';
import {
  searchFilterStyles,
  searchFilterHeaderStyles,
  searchFilterTitleStyles,
  searchFilterClearButtonStyles,
  searchFilterSectionStyles,
  searchFilterSectionHeaderStyles,
  searchFilterSectionTitleStyles,
  searchFilterSectionToggleStyles,
  searchFilterSectionContentStyles,
  searchFilterCheckboxGroupStyles,
  searchFilterCheckboxItemStyles,
  searchFilterCheckboxStyles,
  searchFilterLabelStyles,
  searchFilterCountStyles,
  searchFilterRadioGroupStyles,
  searchFilterRadioItemStyles,
  searchFilterRadioStyles,
  searchFilterTooltipStyles
} from './SearchFilter.styles';

export default function SearchFilter({
  // Filtro por doações
  donationTypes = [],
  onDonationTypesChange,
  
  // Filtro por tipo de doação
  accessTypes = [],
  onAccessTypesChange,
  
  // Filtro por localização
  availableStates = [],
  selectedStates = [],
  selectedCities = [],
  onStatesChange,
  onCitiesChange,
  onFetchCities,
  
  // Filtro por categoria
  categories = [],
  selectedCategories = [],
  onCategoriesChange,
  
  // Filtro por distância
  selectedDistance = 'any',
  onDistanceChange,
  
  // Filtro por estado do item
  itemStates = [],
  onItemStatesChange,
  
  // Props gerais
  className,
  onClearAll,
  ...rest
}) {
  // Estados para controlar seções expandidas/recolhidas
  const [expandedSections, setExpandedSections] = useState({
    donationType: true,
    accessType: true,
    location: true,
    category: true,
    distance: true,
    itemState: true
  });

  // Estados para controlar expansão de subcategorias
  const [expandedCategories, setExpandedCategories] = useState({});

  // Estados para tooltips
  const [showDistanceTooltip, setShowDistanceTooltip] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleClearAll = () => {
    onDonationTypesChange?.([]);
    onAccessTypesChange?.([]);
    onStatesChange?.([]);
    onCitiesChange?.([]);
    onCategoriesChange?.([]);
    onDistanceChange?.('any');
    onItemStatesChange?.([]);
    onClearAll?.();
  };

  // Opções de tipo de doação
  const donationTypeOptions = [
    { id: 'giver', label: 'Quem doa', count: 0 },
    { id: 'receiver', label: 'Quem precisa', count: 0 }
  ];

  // Opções de tipo de acesso
  const accessTypeOptions = [
    { id: 'public', label: 'Públicas', count: 0 },
    { id: 'private', label: 'Privadas', count: 0 }
  ];

  // Opções de distância
  const distanceOptions = [
    { id: 'any', label: 'Qualquer distância' },
    { id: '2km', label: 'Até 2km' },
    { id: '5km', label: 'Até 5km' },
    { id: '10km', label: 'Até 10km' },
    { id: '50km', label: 'Até 50km' }
  ];

  // Opções de estado do item
  const itemStateOptions = [
    { id: 'new', label: 'Novo em folha', count: 0 },
    { id: 'like_new', label: 'Quase novo', count: 0 },
    { id: 'good', label: 'Bem conservado', count: 0 },
    { id: 'used', label: 'Com sinais de uso', count: 0 },
    { id: 'needs_repair', label: 'Precisa de reparos', count: 0 }
  ];

  const handleCheckboxChange = (value, currentArray, onChange) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    onChange?.(newArray);
  };

  const handleCategoryChange = (categoryId, isSelected) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    let newSelectedCategories = [...selectedCategories];

    if (isSelected) {
      // Adicionar categoria principal e todas as subcategorias
      if (!newSelectedCategories.includes(categoryId)) {
        newSelectedCategories.push(categoryId);
      }
      if (category.subcategories) {
        category.subcategories.forEach(sub => {
          if (!newSelectedCategories.includes(sub.id)) {
            newSelectedCategories.push(sub.id);
          }
        });
      }
    } else {
      // Remover categoria principal e todas as subcategorias
      newSelectedCategories = newSelectedCategories.filter(id => id !== categoryId);
      if (category.subcategories) {
        category.subcategories.forEach(sub => {
          newSelectedCategories = newSelectedCategories.filter(id => id !== sub.id);
        });
      }
    }

    onCategoriesChange?.(newSelectedCategories);
  };

  const handleSubcategoryChange = (subcategoryId, isSelected) => {
    let newSelectedCategories = [...selectedCategories];

    if (isSelected) {
      if (!newSelectedCategories.includes(subcategoryId)) {
        newSelectedCategories.push(subcategoryId);
      }
    } else {
      newSelectedCategories = newSelectedCategories.filter(id => id !== subcategoryId);
      // Remover categoria principal se todas as subcategorias foram desmarcadas
      const parentCategory = categories.find(cat => 
        cat.subcategories && cat.subcategories.some(sub => sub.id === subcategoryId)
      );
      if (parentCategory && parentCategory.subcategories) {
        const remainingSubcategories = parentCategory.subcategories.filter(sub =>
          newSelectedCategories.includes(sub.id)
        );
        if (remainingSubcategories.length === 0) {
          newSelectedCategories = newSelectedCategories.filter(id => id !== parentCategory.id);
        }
      }
    }

    onCategoriesChange?.(newSelectedCategories);
  };

  const renderSectionHeader = (title, sectionKey, tooltip = null) => (
    <div className={searchFilterSectionHeaderStyles()}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleSection(sectionKey)}
          className={searchFilterSectionToggleStyles()}
          aria-expanded={expandedSections[sectionKey]}
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

  return (
    <div
      className={twMerge(clsx(
        searchFilterStyles(),
        className
      ))}
      {...rest}
    >
      {/* Header */}
      <div className={searchFilterHeaderStyles()}>
        <div className="flex items-center gap-2">
          <FaFilter className="w-4 h-4 text-[var(--color-primary)]" />
          <h2 className={searchFilterTitleStyles()}>Filtros</h2>
        </div>
        <button
          onClick={handleClearAll}
          className={searchFilterClearButtonStyles()}
        >
          Limpar tudo
        </button>
      </div>

      {/* Filtro por Doações */}
      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Tipo de Doação', 'donationType')}
        {expandedSections.donationType && (
          <div className={searchFilterSectionContentStyles()}>
            <div className="space-y-1">
              {donationTypeOptions.map((option) => (
                <Checkbox
                  key={option.id}
                  label={option.label}
                  count={option.count > 0 ? option.count : undefined}
                  checked={donationTypes.includes(option.id)}
                  onChange={(checked) => handleCheckboxChange(option.id, donationTypes, onDonationTypesChange)}
                  size="medium"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filtro por Tipo de Acesso */}
      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Acesso', 'accessType')}
        {expandedSections.accessType && (
          <div className={searchFilterSectionContentStyles()}>
            <div className="space-y-1">
              {accessTypeOptions.map((option) => (
                <Checkbox
                  key={option.id}
                  label={option.label}
                  count={option.count > 0 ? option.count : undefined}
                  checked={accessTypes.includes(option.id)}
                  onChange={(checked) => handleCheckboxChange(option.id, accessTypes, onAccessTypesChange)}
                  size="medium"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filtro por Localização */}
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

      {/* Filtro por Categoria */}
      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Categoria', 'category')}
        {expandedSections.category && (
          <div className={searchFilterSectionContentStyles()}>
            <div className={searchFilterCheckboxGroupStyles()}>
              {categories.map((category) => {
                const isMainCategorySelected = selectedCategories.includes(category.id);
                const selectedSubcategoriesCount = category.subcategories 
                  ? category.subcategories.filter(sub => selectedCategories.includes(sub.id)).length 
                  : 0;

                return (
                  <div key={category.id} className="space-y-1">
                    {/* Categoria Principal */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Checkbox
                          label={category.name}
                          count={category.count > 0 ? category.count : undefined}
                          checked={isMainCategorySelected}
                          onChange={(checked) => handleCategoryChange(category.id, checked)}
                          size="medium"
                        />
                      </div>
                      {category.subcategories && category.subcategories.length > 0 && (
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        >
                          {expandedCategories[category.id] ? (
                            <FaChevronUp className="w-3 h-3" />
                          ) : (
                            <FaChevronDown className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Subcategorias */}
                    {category.subcategories && 
                     category.subcategories.length > 0 && 
                     expandedCategories[category.id] && (
                      <div className="ml-4 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <Checkbox
                            key={subcategory.id}
                            label={subcategory.name}
                            count={subcategory.count > 0 ? subcategory.count : undefined}
                            checked={selectedCategories.includes(subcategory.id)}
                            onChange={(checked) => handleSubcategoryChange(subcategory.id, checked)}
                            size="medium"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filtro por Distância */}
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
              options={distanceOptions.map(option => ({
                value: option.id,
                label: option.label
              }))}
              onChange={(value) => onDistanceChange?.(value)}
              size="medium"
              orientation="vertical"
            />
          </div>
        )}
      </div>

      {/* Filtro por Estado do Item */}
      <div className={searchFilterSectionStyles()}>
        {renderSectionHeader('Estado do Item', 'itemState')}
        {expandedSections.itemState && (
          <div className={searchFilterSectionContentStyles()}>
            <div className="space-y-1">
              {itemStateOptions.map((option) => (
                <Checkbox
                  key={option.id}
                  label={option.label}
                  count={option.count > 0 ? option.count : undefined}
                  checked={itemStates.includes(option.id)}
                  onChange={(checked) => handleCheckboxChange(option.id, itemStates, onItemStatesChange)}
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
  // Filtro por doações
  donationTypes: PropTypes.arrayOf(PropTypes.string),
  onDonationTypesChange: PropTypes.func,
  
  // Filtro por tipo de doação
  accessTypes: PropTypes.arrayOf(PropTypes.string),
  onAccessTypesChange: PropTypes.func,
  
  // Filtro por localização
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
  
  // Filtro por categoria
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    count: PropTypes.number,
    subcategories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number
    }))
  })),
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onCategoriesChange: PropTypes.func,
  
  // Filtro por distância
  selectedDistance: PropTypes.string,
  onDistanceChange: PropTypes.func,
  
  // Filtro por estado do item
  itemStates: PropTypes.arrayOf(PropTypes.string),
  onItemStatesChange: PropTypes.func,
  
  // Props gerais
  className: PropTypes.string,
  onClearAll: PropTypes.func
};
