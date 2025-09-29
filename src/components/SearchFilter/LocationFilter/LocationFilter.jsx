import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaSearch, FaCheck, FaChevronDown, FaTimes, FaMapMarkerAlt, FaMinus } from 'react-icons/fa';
import Input from '../../Input/Input';
import {
  locationFilterStyles,
  locationFilterStateGroupStyles,
  locationFilterStateItemStyles,
  locationFilterStateCheckboxStyles,
  locationFilterStateLabelStyles,
  locationFilterCityGroupStyles,
  locationFilterCityHeaderStyles,
  locationFilterCityHeaderTitleStyles,
  locationFilterCitySelectAllStyles,
  locationFilterCityListStyles,
  locationFilterCityItemStyles,
  locationFilterCityCheckboxStyles,
  locationFilterCityLabelStyles,
  locationFilterSearchStyles,
  locationFilterComboboxStyles,
  locationFilterDropdownStyles,
  locationFilterOptionStyles,
  locationFilterSelectedTagStyles,
  locationFilterTagStyles
} from './LocationFilter.styles';

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
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const cityDropdownRef = useRef(null);
  const cityInputRef = useRef(null);
  const stateDropdownRef = useRef(null);
  const stateInputRef = useRef(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false);
        setCitySearchTerm('');
      }
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setShowStateDropdown(false);
        setStateSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStateChange = (stateId, isSelected) => {
    let newSelectedStates = [...selectedStates];
    let newSelectedCities = [...selectedCities];

    if (isSelected) {
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

  const handleCityChange = (cityId, isSelected) => {
    let newSelectedCities = [...selectedCities];

    if (isSelected) {
      if (!newSelectedCities.includes(cityId)) {
        newSelectedCities.push(cityId);
      }
    } else {
      newSelectedCities = newSelectedCities.filter(id => id !== cityId);
    }

    onCitiesChange?.(newSelectedCities);
  };

  // Toggle dropdown de cidades
  const toggleCityDropdown = () => {
    if (selectedStates.length === 0) return;
    setShowCityDropdown(prev => !prev);
    if (!showCityDropdown) {
      setTimeout(() => cityInputRef.current?.focus(), 100);
    } else {
      setCitySearchTerm('');
    }
  };

  // Toggle dropdown de estados
  const toggleStateDropdown = () => {
    setShowStateDropdown(prev => !prev);
    if (!showStateDropdown) {
      setTimeout(() => stateInputRef.current?.focus(), 100);
    } else {
      setStateSearchTerm('');
    }
  };

  // Remover cidade selecionada via tag
  const removeSelectedCity = (cityId) => {
    const newSelectedCities = selectedCities.filter(id => id !== cityId);
    onCitiesChange?.(newSelectedCities);
  };

  // Remover estado selecionado via tag
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

  // Selecionar/deselecionar todos os estados
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
      // Buscar cidades para todos estados
      allStateIds.forEach(stateId => {
        if (!availableStates.find(s => s.stateId === stateId)?.cities) {
          onFetchCities?.(stateId);
        }
      });
    }
  };

  // Selecionar/deselecionar todas as cidades de um estado
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

  // Obter todas as cidades dos estados selecionados para o dropdown
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
            displayName: `${city.name}, ${state.name}`
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

  // Obter estados selecionados com nomes para as tags
  const selectedStatesWithNames = useMemo(() => {
    return availableStates.filter(state => selectedStates.includes(state.stateId));
  }, [availableStates, selectedStates]);

  // Obter cidades selecionadas com nomes completos para as tags
  const selectedCitiesWithNames = useMemo(() => {
    const cities = [];
    selectedStates.forEach(stateId => {
      const state = availableStates.find(s => s.stateId === stateId);
      if (state && state.cities) {
        state.cities.forEach(city => {
          if (selectedCities.includes(city.cityId)) {
            cities.push({
              ...city,
              stateId,
              stateName: state.name,
              displayName: `${city.name}, ${state.name}`
            });
          }
        });
      }
    });
    return cities;
  }, [selectedStates, availableStates, selectedCities]);

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
            displayName: `${city.name}, ${state.name}`
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

        {/* Tags dos estados selecionados */}
        {selectedStatesWithNames.length > 0 && (
          <div className={locationFilterSelectedTagStyles()}>
            <span className="text-xs font-medium text-gray-600 mb-2 block">
              Estados selecionados:
            </span>
            <div className="flex flex-wrap gap-1">
              {selectedStatesWithNames.length === availableStates.length ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded-md">
                  <FaCheck className="w-3 h-3" />
                  Todos estados ({selectedStatesWithNames.length})
                  <button
                    onClick={() => {
                      onStatesChange?.([]);
                      onCitiesChange?.([]);
                    }}
                    className="ml-1 hover:text-red-600 transition-colors"
                    aria-label="Remover todos estados"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ) : (
                selectedStatesWithNames.map((state) => (
                  <span
                    key={`state-tag-${state.stateId}`}
                    className={locationFilterTagStyles()}
                  >
                    {state.name}
                    <button
                      onClick={() => removeSelectedState(state.stateId)}
                      className="ml-1 hover:text-red-600 transition-colors"
                      aria-label={`Remover ${state.name}`}
                    >
                      <FaTimes className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lista de Cidades - Combobox */}
      {hasSelectedStates && (
        <div className={locationFilterCityGroupStyles()}>
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

          {/* Tags das cidades selecionadas */}
          {selectedCitiesWithNames.length > 0 && (
            <div className={locationFilterSelectedTagStyles()}>
              <span className="text-xs font-medium text-gray-600 mb-2 block">
                Cidades selecionadas:
              </span>
              <div className="flex flex-wrap gap-1">
                {(() => {
                  // Agrupar cidades por estado para verificar se todas do estado estão selecionadas
                  const stateGroups = new Map();
                  
                  selectedCitiesWithNames.forEach(city => {
                    if (!stateGroups.has(city.stateId)) {
                      const state = availableStates.find(s => s.stateId === city.stateId);
                      stateGroups.set(city.stateId, {
                        stateName: state?.name || '',
                        totalCities: state?.cities?.length || 0,
                        selectedCities: []
                      });
                    }
                    stateGroups.get(city.stateId).selectedCities.push(city);
                  });

                  const tags = [];
                  
                  stateGroups.forEach((group, stateId) => {
                    const allCitiesSelected = group.selectedCities.length === group.totalCities;
                    
                    if (allCitiesSelected) {
                      // Mostrar tag consolidada para o estado
                      tags.push(
                        <span
                          key={`state-all-${stateId}`}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded-md"
                        >
                          <FaCheck className="w-3 h-3" />
                          {group.stateName} (Todas cidades)
                          <button
                            onClick={() => {
                              // Remover todas as cidades do estado
                              const stateCityIds = group.selectedCities.map(city => city.cityId);
                              const newCities = selectedCities.filter(cityId => !stateCityIds.includes(cityId));
                              onCitiesChange?.(newCities);
                            }}
                            className="ml-1 hover:text-red-600 transition-colors"
                            aria-label={`Remover todas cidades de ${group.stateName}`}
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    } else {
                      // Mostrar tags individuais das cidades
                      group.selectedCities.forEach(city => {
                        tags.push(
                          <span
                            key={`tag-${city.stateId}-${city.cityId}`}
                            className={locationFilterTagStyles()}
                          >
                            {city.displayName}
                            <button
                              onClick={() => removeSelectedCity(city.cityId)}
                              className="ml-1 hover:text-red-600 transition-colors"
                              aria-label={`Remover ${city.displayName}`}
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      });
                    }
                  });

                  return tags;
                })()}
              </div>
            </div>
          )}
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