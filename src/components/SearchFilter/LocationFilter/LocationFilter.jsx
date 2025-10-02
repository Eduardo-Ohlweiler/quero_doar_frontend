/**
 * LocationFilter Component
 * 
 * Componente de filtro avançado de localização com interface de combobox.
 * Suporta seleção múltipla de estados e cidades com funcionalidades avançadas:
 * 
 * - Interface de combobox consistente para estados e cidades
 * - Busca em tempo real com debounce
 * - Seleção em lote ("Selecionar todos")
 * - Tags otimizadas para seleções completas
 * - Agrupamento hierárquico por estado
 * - Gerenciamento inteligente de dependências (cidades dependem de estados)
 * - Fechamento automático por clique externo
 * - Navegação por teclado
 * 
 * @component
 * @example
 * <LocationFilter
 *   availableStates={states}
 *   selectedStates={[1, 2]}
 *   selectedCities={[101, 102]}
 *   onStatesChange={handleStatesChange}
 *   onCitiesChange={handleCitiesChange}
 *   onFetchCities={handleFetchCities}
 * />
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaSearch, FaCheck, FaChevronDown, FaTimes, FaMapMarkerAlt, FaMinus } from 'react-icons/fa';
import Input from '../../Input/Input';
import TagList from '../../TagList/TagList';
import {
  locationFilterStyles,
  locationFilterStateGroupStyles,
  locationFilterComboboxStyles,
  locationFilterDropdownStyles,
  locationFilterOptionStyles
} from './LocationFilter.styles';

// ========================================
// FUNÇÕES UTILITÁRIAS PARA TAGLIST
// ========================================

/**
 * Converte dados de estados selecionados para formato de tags
 * @param {Array} selectedStates - IDs dos estados selecionados
 * @param {Array} availableStates - Estados disponíveis
 * @returns {Array} Array de tags formatadas para o TagList
 */
const convertStatesToTags = (selectedStates, availableStates) => {
  // Se todos os estados estão selecionados, criar tag consolidada
  if (selectedStates.length === availableStates.length && availableStates.length > 0) {
    return [{
      id: 'all-states',
      label: `Todos estados (${selectedStates.length})`,
      type: 'state',
      consolidated: true
    }];
  }

  // Criar tags individuais para estados
  return selectedStates.map(stateId => {
    const state = availableStates.find(s => s.stateId === stateId);
    return {
      id: stateId,
      label: state?.name || `Estado ${stateId}`,
      type: 'state',
      consolidated: false,
      stateId
    };
  });
};

/**
 * Converte dados de cidades selecionadas para formato de tags
 * @param {Array} selectedCities - IDs das cidades selecionadas  
 * @param {Array} selectedStates - IDs dos estados selecionados
 * @param {Array} availableStates - Estados disponíveis
 * @returns {Array} Array de tags formatadas para o TagList
 */
const convertCitiesToTags = (selectedCities, selectedStates, availableStates) => {
  const tags = [];
  const stateGroups = new Map();
  
  // Agrupar cidades por estado
  selectedCities.forEach(cityId => {
    selectedStates.forEach(stateId => {
      const state = availableStates.find(s => s.stateId === stateId);
      if (state && state.cities) {
        const city = state.cities.find(c => c.cityId === cityId);
        if (city) {
          if (!stateGroups.has(stateId)) {
            stateGroups.set(stateId, {
              stateName: state.name,
              stateAcronym: state.acronym,
              totalCities: state.cities.length,
              selectedCities: []
            });
          }
          stateGroups.get(stateId).selectedCities.push({
            cityId: city.cityId,
            cityName: city.name
          });
        }
      }
    });
  });

  // Criar tags baseadas nos grupos
  stateGroups.forEach((group, stateId) => {
    const allCitiesSelected = group.selectedCities.length === group.totalCities;
    
    if (allCitiesSelected) {
      // Tag consolidada para o estado
      tags.push({
        id: `state-cities-${stateId}`,
        label: `${group.stateName} (Todas cidades)`,
        type: 'city-group',
        consolidated: true,
        stateId,
        cityIds: group.selectedCities.map(c => c.cityId)
      });
    } else {
      // Tags individuais das cidades
      group.selectedCities.forEach(city => {
        tags.push({
          id: city.cityId,
          label: `${city.cityName} (${group.stateAcronym})`,
          type: 'city',
          consolidated: false,
          cityId: city.cityId,
          stateId
        });
      });
    }
  });

  return tags;
};

/**
 * LocationFilter - Componente principal de filtro de localização
 * 
 * @param {Object} props - Props do componente
 * @param {Array} props.availableStates - Estados disponíveis com suas cidades
 * @param {Array} props.selectedStates - IDs dos estados selecionados
 * @param {Array} props.selectedCities - IDs das cidades selecionadas
 * @param {Function} props.onStatesChange - Callback para mudanças nos estados
 * @param {Function} props.onCitiesChange - Callback para mudanças nas cidades
 * @param {Function} props.onFetchCities - Callback para buscar cidades de um estado
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Componente renderizado
 */
export default function LocationFilter({
  availableStates = [],
  selectedStates = [],
  selectedCities = [],
  onStatesChange,
  onCitiesChange,
  onFetchCities,
  className,
  ...rest
}) {
  // ========================================
  // HOOKS DE ESTADO
  // ========================================
  
  /**
   * Termos de busca para filtrar opções nos dropdowns
   */
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  
  /**
   * Controle de visibilidade dos dropdowns
   */
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  
  /**
   * Referências para controle de foco e clique externo
   */
  const cityDropdownRef = useRef(null);
  const cityInputRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const stateInputRef = useRef(null);

  // ========================================
  // EFEITOS E LISTENERS
  // ========================================

  /**
   * Effect para fechar dropdowns ao clicar fora
   * Implementa o padrão de "click outside" para melhor UX
   */
  useEffect(() => {
    /**
     * Handler para cliques externos aos dropdowns
     * @param {Event} event - Evento de clique
     */
    const handleClickOutside = (event) => {
      // Fechar dropdown de cidades se clique for externo
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
        setCitySearchTerm(''); // Limpar busca ao fechar
      }
      
      // Fechar dropdown de estados se clique for externo
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setShowStateDropdown(false);
        setStateSearchTerm(''); // Limpar busca ao fechar
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ========================================
  // HANDLERS DE MUDANÇA DE ESTADO
  // ========================================

  /**
   * Handler para mudanças na seleção de estados
   * Gerencia automaticamente as cidades relacionadas
   * 
   * @param {number} stateId - ID do estado sendo modificado
   * @param {boolean} isSelected - Se o estado deve ser selecionado ou removido
   */
  const handleStateChange = (stateId, isSelected) => {
    let newSelectedStates = [...selectedStates];
    let newSelectedCities = [...selectedCities];

    if (isSelected) {
      // Adicionar estado se não estiver selecionado
      if (!newSelectedStates.includes(stateId)) {
        newSelectedStates.push(stateId);
        // Buscar cidades do estado quando selecionado
        onFetchCities?.(stateId);
      }
    } else {
      // Remover estado e todas as suas cidades
      newSelectedStates = newSelectedStates.filter(id => id !== stateId);
      const state = availableStates.find(s => s.stateId === stateId);
      if (state && state.cities) {
        const stateCityIds = state.cities.map(city => city.cityId);
        newSelectedCities = newSelectedCities.filter(cityId => !stateCityIds.includes(cityId));
      }
    }

    onStatesChange?.(newSelectedStates);
    if (newSelectedCities.length !== selectedCities.length) {
      onCitiesChange?.(newSelectedCities);
    }
  };

  /**
   * Handler para mudanças na seleção de cidades
   * Opera de forma independente, sem afetar estados
   * 
   * @param {number} cityId - ID da cidade sendo modificada
   * @param {boolean} isSelected - Se a cidade deve ser selecionada ou removida
   */
  const handleCityChange = (cityId, isSelected) => {
    let newSelectedCities = [...selectedCities];

    if (isSelected) {
      // Adicionar cidade se não estiver selecionada
      if (!newSelectedCities.includes(cityId)) {
        newSelectedCities.push(cityId);
      }
    } else {
      // Remover cidade
      newSelectedCities = newSelectedCities.filter(id => id !== cityId);
    }

    onCitiesChange?.(newSelectedCities);
  };

  // ========================================
  // HANDLERS DE INTERFACE (DROPDOWNS)
  // ========================================

  /**
   * Toggle do dropdown de cidades
   * Só permite abertura se houver estados selecionados
   */
  const toggleCityDropdown = () => {
    if (selectedStates.length === 0) return; // Prevenir abertura sem estados
    
    setShowCityDropdown(prev => !prev);
    
    // Focar no input de busca ao abrir
    if (!showCityDropdown) {
      setTimeout(() => cityInputRef.current?.focus(), 100);
    } else {
      setCitySearchTerm('');
    }
  };

  /**
   * Toggle do dropdown de estados
   * Sempre disponível independente de seleções
   */
  const toggleStateDropdown = () => {
    setShowStateDropdown(prev => !prev);
    
    // Focar no input de busca ao abrir
    if (!showStateDropdown) {
      setTimeout(() => stateInputRef.current?.focus(), 100);
    } else {
      setStateSearchTerm(''); // Limpar busca ao fechar
    }
  };

  // ========================================
  // HANDLERS DE REMOÇÃO (TAGS)
  // ========================================

  /**
   * Remove uma cidade específica via tag
   * @param {number} cityId - ID da cidade a ser removida
   */
  const removeSelectedCity = (cityId) => {
    const newSelectedCities = selectedCities.filter(id => id !== cityId);
    onCitiesChange?.(newSelectedCities);
  };

  /**
   * Remove um estado específico via tag
   * Remove automaticamente todas as cidades deste estado
   * @param {number} stateId - ID do estado a ser removido
   */
  const removeSelectedState = (stateId) => {
    const newStates = selectedStates.filter(id => id !== stateId);
    // Remover também todas as cidades desse estado
    const state = availableStates.find(s => s.stateId === stateId);
    if (state && state.cities) {
      const stateCityIds = state.cities.map(city => city.cityId);
      const newCities = selectedCities.filter(id => !stateCityIds.includes(id));
      onCitiesChange?.(newCities);
    }
    onStatesChange?.(newStates);
  };

  // ========================================
  // HANDLERS DE SELEÇÃO EM LOTE
  // ========================================

  /**
   * Handler para selecionar/deselecionar todos os estados
   * Quando deseleciona, remove automaticamente todas as cidades
   */
  const handleSelectAllStates = () => {
    const allStateIds = availableStates.map(state => state.stateId);
    const areAllSelected = allStateIds.every(id => selectedStates.includes(id));
    
    if (areAllSelected) {
      // Deselecionar todos estados e suas cidades
      onStatesChange?.([]);
      onCitiesChange?.([]);
    } else {
      // Selecionar todos estados
      onStatesChange?.(allStateIds);
      // Buscar cidades para todos estados que não têm dados
      allStateIds.forEach(stateId => {
        if (!availableStates.find(s => s.stateId === stateId)?.cities) {
          onFetchCities?.(stateId);
        }
      });
    }
  };

  /**
   * Handler para selecionar/deselecionar todas as cidades de um estado
   * @param {number} stateId - ID do estado cujas cidades serão selecionadas
   */
  const handleSelectAllCitiesForState = (stateId) => {
    const state = availableStates.find(s => s.stateId === stateId);
    if (!state || !state.cities) return;

    const stateCityIds = state.cities.map(city => city.cityId);
    const areAllSelected = stateCityIds.every(cityId => selectedCities.includes(cityId));

    let newSelectedCities = [...selectedCities];

    if (areAllSelected) {
      // Desmarcar todas as cidades do estado
      newSelectedCities = newSelectedCities.filter(cityId => !stateCityIds.includes(cityId));
    } else {
      // Marcar todas as cidades do estado
      stateCityIds.forEach(cityId => {
        if (!newSelectedCities.includes(cityId)) {
          newSelectedCities.push(cityId);
        }
      });
    }

    onCitiesChange?.(newSelectedCities);
  };

  const handleSelectAllCities = (stateId) => {
    const state = availableStates.find(s => s.stateId === stateId);
    if (!state || !state.cities) return;

    const stateCityIds = state.cities.map(city => city.cityId);
    const areAllSelected = stateCityIds.every(cityId => selectedCities.includes(cityId));

    let newSelectedCities = [...selectedCities];

    if (areAllSelected) {
      // Desmarcar todas as cidades do estado
      newSelectedCities = newSelectedCities.filter(cityId => !stateCityIds.includes(cityId));
    } else {
      // Marcar todas as cidades do estado
      stateCityIds.forEach(cityId => {
        if (!newSelectedCities.includes(cityId)) {
          newSelectedCities.push(cityId);
        }
      });
    }

    onCitiesChange?.(newSelectedCities);
  };

  // ========================================
  // HANDLERS PARA TAGLIST
  // ========================================

  /**
   * Handler para remoção de tags via TagList
   * @param {string|number} tagId - ID da tag a ser removida
   * @param {string} tagType - Tipo da tag (state, city, city-group)
   */
  const handleRemoveTag = (tagId, tagType) => {
    switch (tagType) {
      case 'state':
        if (tagId === 'all-states') {
          // Remover todos os estados e cidades
          onStatesChange?.([]);
          onCitiesChange?.([]);
        } else {
          // Remover estado específico
          removeSelectedState(tagId);
        }
        break;
      
      case 'city':
        // Remover cidade específica
        removeSelectedCity(tagId);
        break;
      
      case 'city-group':
        // Remover todas as cidades de um estado específico
        const stateId = parseInt(tagId.replace('state-cities-', ''));
        const state = availableStates.find(s => s.stateId === stateId);
        if (state && state.cities) {
          const stateCityIds = state.cities.map(city => city.cityId);
          const newCities = selectedCities.filter(cityId => !stateCityIds.includes(cityId));
          onCitiesChange?.(newCities);
        }
        break;
      
      default:
        console.warn(`Tipo de tag não reconhecido: ${tagType}`);
    }
  };

  /**
   * Handler para limpar todas as tags de estados
   */
  const handleClearAllStates = () => {
    onStatesChange?.([]);
    onCitiesChange?.([]);
  };

  /**
   * Handler para limpar todas as tags de cidades
   */
  const handleClearAllCities = () => {
    onCitiesChange?.([]);
  };

  // ========================================
  // COMPUTED VALUES E MEMO
  // ========================================

  /**
   * Todas as cidades disponíveis dos estados selecionados
   * Usado para popular o dropdown de cidades
   */
  const allAvailableCities = useMemo(() => {
    const cities = [];
    selectedStates.forEach(stateId => {
      const state = availableStates.find(s => s.stateId === stateId);
      if (state && state.cities) {
        state.cities.forEach(city => {
          cities.push({
            ...city,
            stateId,
            stateName: state.name,
            displayName: `${city.name} (${state.acronym})`
          });
        });
      }
    });
    return cities;
  }, [selectedStates, availableStates]);

  // Filtrar estados por termo de busca
  const filteredStatesForDropdown = useMemo(() => {
    if (!stateSearchTerm) return availableStates;
    return availableStates.filter(state =>
      state.name.toLowerCase().includes(stateSearchTerm.toLowerCase())
    );
  }, [availableStates, stateSearchTerm]);



  // Agrupar cidades por estado para o dropdown (com filtro de busca)
  const citiesByState = useMemo(() => {
    const groups = [];
    selectedStates.forEach(stateId => {
      const state = availableStates.find(s => s.stateId === stateId);
      if (!state || !state.cities) return;

      const filteredCities = state.cities.filter(city => {
        if (!citySearchTerm) return true;
        return city.name.toLowerCase().includes(citySearchTerm.toLowerCase()) ||
               state.name.toLowerCase().includes(citySearchTerm.toLowerCase());
      });

      if (filteredCities.length > 0) {
        groups.push({
          stateId: state.stateId,
          stateName: state.name,
          cities: filteredCities.map(city => ({
            ...city,
            displayName: `${city.name} (${state.acronym})`
          }))
        });
      }
    });
    return groups;
  }, [selectedStates, availableStates, citySearchTerm]);

  // Filtrar e agrupar cidades por estado (para uso antigo, se necessário)
  const filteredCitiesByState = useMemo(() => {
    const result = [];

    selectedStates.forEach(stateId => {
      const state = availableStates.find(s => s.stateId === stateId);
      if (!state || !state.cities) return;

      const filteredCities = state.cities.filter(city =>
        city.name.toLowerCase().includes(citySearchTerm.toLowerCase())
      );

      if (filteredCities.length > 0) {
        result.push({
          ...state,
          cities: filteredCities
        });
      }
    });

    return result;
  }, [selectedStates, availableStates, citySearchTerm]);

  // ========================================
  // DADOS PARA TAGLIST
  // ========================================

  /**
   * Tags de estados formatadas para o TagList
   */
  const stateTags = useMemo(() => {
    return convertStatesToTags(selectedStates, availableStates);
  }, [selectedStates, availableStates]);

  /**
   * Tags de cidades formatadas para o TagList
   */
  const cityTags = useMemo(() => {
    return convertCitiesToTags(selectedCities, selectedStates, availableStates);
  }, [selectedCities, selectedStates, availableStates]);

  const totalSelectedCities = selectedCities.length;
  const hasSelectedStates = selectedStates.length > 0;

  return (
    <div
      className={twMerge(clsx(
        locationFilterStyles(),
        className
      ))}
      {...rest}
    >
      {/* Estados - Combobox */}
      <div className={locationFilterStateGroupStyles()}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Estados ({selectedStates.length} selecionados)
        </h4>
        
        {/* Combobox de Estados */}
        <div className="relative" ref={stateDropdownRef}>
          <div 
            className={locationFilterComboboxStyles()} 
            onClick={toggleStateDropdown}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleStateDropdown();
              }
            }}
          >
            <FaMapMarkerAlt className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="flex-1 text-left">
              {selectedStates.length === 0
                ? 'Selecione os estados...'
                : `${selectedStates.length} estado${selectedStates.length > 1 ? 's' : ''} selecionado${selectedStates.length > 1 ? 's' : ''}`
              }
            </span>
            <FaChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
              showStateDropdown ? 'rotate-180' : ''
            }`} />
          </div>

          {/* Dropdown de Estados */}
          {showStateDropdown && (
            <div className={locationFilterDropdownStyles()}>
              {/* Campo de busca */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    ref={stateInputRef}
                    type="text"
                    placeholder="Buscar estados..."
                    value={stateSearchTerm}
                    onChange={(e) => setStateSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                  />
                  {stateSearchTerm && (
                    <button
                      onClick={() => setStateSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Lista de estados */}
              <div className="max-h-64 overflow-y-auto">
                {filteredStatesForDropdown.length > 0 ? (
                  <>
                    {/* Select All Estados */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
                      <label className="flex items-center gap-2 p-2 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          checked={availableStates.length > 0 && availableStates.every(state => selectedStates.includes(state.stateId))}
                          onChange={handleSelectAllStates}
                          className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                        />
                        <FaCheck className="w-3 h-3 text-[var(--color-primary)]" />
                        <span className="text-[var(--color-primary)]">
                          Estados ({selectedStates.length}/{availableStates.length})
                        </span>
                      </label>
                    </div>

                    {/* Estados individuais */}
                    {filteredStatesForDropdown.map((state) => (
                      <label
                        key={state.stateId}
                        className={locationFilterOptionStyles()}
                      >
                        <input
                          type="checkbox"
                          checked={selectedStates.includes(state.stateId)}
                          onChange={(e) => handleStateChange(state.stateId, e.target.checked)}
                          className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">
                          {state.name}
                        </span>
                      </label>
                    ))}
                  </>
                ) : (
                  <div className="px-3 py-6 text-sm text-gray-500 text-center">
                    {stateSearchTerm
                      ? 'Nenhum estado encontrado'
                      : 'Nenhum estado disponível'
                    }
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Tags dos estados selecionados usando TagList */}
        <TagList
          title="Estados selecionados:"
          tags={stateTags}
          onRemoveTag={handleRemoveTag}
          onClearAll={handleClearAllStates}
          showClearAll={stateTags.length > 0}
        />
      </div>

      {/* Lista de Cidades - Combobox */}
      {hasSelectedStates && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">
              Cidades ({totalSelectedCities} selecionadas)
            </h4>
          </div>

          {/* Combobox de Cidades */}
          <div className="relative" ref={cityDropdownRef}>
            <div 
              className={locationFilterComboboxStyles()} 
              onClick={toggleCityDropdown}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCityDropdown();
                }
              }}
            >
              <FaMapMarkerAlt className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="flex-1 text-left">
                {selectedCities.length === 0
                  ? selectedStates.length === 0 
                    ? 'Selecione um estado primeiro...'
                    : 'Selecione as cidades...'
                  : `${selectedCities.length} cidade${selectedCities.length > 1 ? 's' : ''} selecionada${selectedCities.length > 1 ? 's' : ''}`
                }
              </span>
              <FaChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                showCityDropdown ? 'rotate-180' : ''
              }`} />
            </div>

            {/* Dropdown */}
            {showCityDropdown && (
              <div className={locationFilterDropdownStyles()}>
                {/* Campo de busca */}
                <div className="p-3 border-b border-gray-200">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      ref={cityInputRef}
                      type="text"
                      placeholder="Buscar cidades..."
                      value={citySearchTerm}
                      onChange={(e) => setCitySearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                    />
                    {citySearchTerm && (
                      <button
                        onClick={() => setCitySearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Lista de cidades agrupadas por estado */}
                <div className="max-h-64 overflow-y-auto">
                  {citiesByState.length > 0 ? (
                    citiesByState.map((stateGroup) => {
                      const stateCityIds = stateGroup.cities.map(city => city.cityId);
                      const selectedStateCities = stateCityIds.filter(cityId => selectedCities.includes(cityId));
                      const areAllSelected = stateCityIds.length > 0 && selectedStateCities.length === stateCityIds.length;
                      const areSomeSelected = selectedStateCities.length > 0 && selectedStateCities.length < stateCityIds.length;

                      return (
                        <div key={stateGroup.stateId} className="mb-2">
                          {/* Cabeçalho do Estado com Select All */}
                          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-2">
                            <label className={`flex items-center gap-2 p-2 text-sm font-medium cursor-pointer hover:bg-gray-100 rounded ${
                              areAllSelected ? 'text-green-700' : areSomeSelected ? 'text-amber-700' : 'text-[var(--color-primary)]'
                            }`}>
                              <input
                                type="checkbox"
                                checked={areAllSelected}
                                onChange={() => handleSelectAllCitiesForState(stateGroup.stateId)}
                                className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                              />
                              {areAllSelected ? (
                                <FaCheck className="w-3 h-3 text-green-600" />
                              ) : areSomeSelected ? (
                                <FaMinus className="w-3 h-3 text-amber-600" />
                              ) : (
                                <FaCheck className="w-3 h-3 text-[var(--color-primary)]" />
                              )}
                              <span>
                                {stateGroup.stateName} ({selectedStateCities.length}/{stateCityIds.length})
                              </span>
                            </label>
                          </div>

                          {/* Cidades do estado */}
                          <div className="pl-2">
                            {stateGroup.cities.map((city) => (
                              <label
                                key={`${stateGroup.stateId}-${city.cityId}`}
                                className={locationFilterOptionStyles()}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedCities.includes(city.cityId)}
                                  onChange={(e) => handleCityChange(city.cityId, e.target.checked)}
                                  className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                                />
                                <span className="text-sm text-gray-600">
                                  {city.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="px-3 py-6 text-sm text-gray-500 text-center">
                      {citySearchTerm
                        ? 'Nenhuma cidade encontrada'
                        : selectedStates.length === 0
                          ? 'Selecione pelo menos um estado primeiro'
                          : 'Carregando cidades...'
                      }
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tags das cidades selecionadas usando TagList */}
          <TagList
            title="Cidades selecionadas:"
            tags={cityTags}
            onRemoveTag={handleRemoveTag}
            onClearAll={handleClearAllCities}
            showClearAll={cityTags.length > 0}
          />
        </div>
      )}

      {!hasSelectedStates && (
        <div className="text-sm text-gray-500 text-center py-4">
          Selecione um estado para ver as cidades disponíveis
        </div>
      )}
    </div>
  );
}

LocationFilter.propTypes = {
  availableStates: PropTypes.arrayOf(PropTypes.shape({
    stateId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    cities: PropTypes.arrayOf(PropTypes.shape({
      cityId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }))
  })),
  selectedStates: PropTypes.arrayOf(PropTypes.number),
  selectedCities: PropTypes.arrayOf(PropTypes.number),
  onStatesChange: PropTypes.func,
  onCitiesChange: PropTypes.func,
  onFetchCities: PropTypes.func,
  className: PropTypes.string
};