/**
 * LocationFilter Component
 * 
 * Componente de filtro avançado de localização usando Combobox + DropdownList.
 * Oferece seleção múltipla de estados e cidades com busca e tags otimizadas.
 * 
 * @component
 */

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import Combobox from '../../Combobox/Combobox';
import DropdownList from '../../DropdownList/DropdownList';
import TagList from '../../TagList/TagList';
import {
  locationFilterStyles,
  locationFilterStateGroupStyles
} from './LocationFilter.styles';

/**
 * Converte estados selecionados para formato de tags
 * @param {number[]} selectedStates - IDs dos estados selecionados
 * @param {Array} availableStates - Estados disponíveis
 * @returns {Array} Tags formatadas
 */
const convertStatesToTags = (selectedStates, availableStates) => {
  if (selectedStates.length === availableStates.length && availableStates.length > 0) {
    return [{
      id: 'all-states',
      label: 'Todos os estados',
      type: 'state'
    }];
  }

  return selectedStates.map(stateId => {
    const state = availableStates.find(s => s.stateId === stateId);
    return {
      id: stateId,
      label: state ? state.name : `Estado ${stateId}`,
      type: 'state'
    };
  });
};

/**
 * Converte cidades selecionadas para formato de tags otimizadas
 * Usa Map para melhor performance (O(1)) em grandes datasets
 * Agrupa cidades por estado e detecta quando todas as cidades de um estado estão selecionadas
 * 
 * @param {number[]} selectedCities - IDs das cidades selecionadas
 * @param {number[]} selectedStates - IDs dos estados selecionados
 * @param {Array} availableStates - Estados disponíveis com suas cidades
 * @returns {Array} Tags formatadas
 */
const convertCitiesToTags = (selectedCities, selectedStates, availableStates) => {
  if (selectedCities.length === 0) return [];
  
  const tags = [];
  const stateGroups = new Map();
  const statesMap = new Map();
  
  availableStates.forEach(state => {
    if (state.cities) {
      statesMap.set(state.stateId, state);
    }
  });
  
  selectedCities.forEach(cityId => {
    for (const [stateId, state] of statesMap) {
      const city = state.cities.find(c => c.cityId === cityId);
      if (city) {
        if (!stateGroups.has(stateId)) {
          stateGroups.set(stateId, {
            state: state,
            cities: []
          });
        }
        stateGroups.get(stateId).cities.push(city);
        break;
      }
    }
  });

  stateGroups.forEach((group, stateId) => {
    const allStateCities = group.state.cities || [];
    const isAllCitiesSelected = allStateCities.length > 0 &&
                                group.cities.length === allStateCities.length;
    
    if (isAllCitiesSelected) {
      tags.push({
        id: `state-cities-${stateId}`,
        label: `${group.state.name} (todas as cidades)`,
        type: 'city-group'
      });
    } else {
      group.cities.forEach(city => {
        tags.push({
          id: city.cityId,
          label: `${city.name} (${group.state.acronym})`,
          type: 'city'
        });
      });
    }
  });

  return tags;
};

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
  const handleStateChange = (stateId, isSelected) => {
    if (isSelected) {
      if (!selectedStates.includes(stateId)) {
        onStatesChange?.([...selectedStates, stateId]);
        onFetchCities?.(stateId);
      }
    } else {
      onStatesChange?.(selectedStates.filter(id => id !== stateId));
      
      const state = availableStates.find(s => s.stateId === stateId);
      if (state?.cities) {
        const stateCityIds = new Set(state.cities.map(city => city.cityId));
        const newSelectedCities = selectedCities.filter(cityId => !stateCityIds.has(cityId));
        if (newSelectedCities.length !== selectedCities.length) {
          onCitiesChange?.(newSelectedCities);
        }
      }
    }
  };

  const handleCityChange = (cityId, isSelected) => {
    if (isSelected) {
      if (!selectedCities.includes(cityId)) {
        onCitiesChange?.([...selectedCities, cityId]);
      }
    } else {
      onCitiesChange?.(selectedCities.filter(id => id !== cityId));
    }
  };

  const handleSelectAllStates = (shouldSelectAll) => {
    if (shouldSelectAll) {
      const allStateIds = availableStates.map(state => state.stateId);
      onStatesChange?.(allStateIds);
      allStateIds.forEach(stateId => {
        if (!availableStates.find(s => s.stateId === stateId)?.cities) {
          onFetchCities?.(stateId);
        }
      });
    } else {
      onStatesChange?.([]);
      onCitiesChange?.([]);
    }
  };

  const handleSelectGroup = (groupId) => {
    const stateId = parseInt(groupId);
    const state = availableStates.find(s => s.stateId === stateId);
    if (!state?.cities) return;

    const stateCityIds = state.cities.map(city => city.cityId);
    const areAllSelected = stateCityIds.every(cityId => selectedCities.includes(cityId));

    if (areAllSelected) {
      const cityIdsSet = new Set(stateCityIds);
      const newSelectedCities = selectedCities.filter(cityId => !cityIdsSet.has(cityId));
      onCitiesChange?.(newSelectedCities);
    } else {
      const currentSelectedSet = new Set(selectedCities);
      const citiesToAdd = stateCityIds.filter(cityId => !currentSelectedSet.has(cityId));
      if (citiesToAdd.length > 0) {
        onCitiesChange?.([...selectedCities, ...citiesToAdd]);
      }
    }
  };

  const handleSelectAllCities = (shouldSelectAll) => {
    if (shouldSelectAll) {
      const allCityIds = selectedStates.flatMap(stateId => {
        const state = availableStates.find(s => s.stateId === stateId);
        return state?.cities?.map(city => city.cityId) || [];
      });
      onCitiesChange?.(allCityIds);
    } else {
      onCitiesChange?.([]);
    }
  };

  const handleRemoveTag = (tagId, tagType) => {
    switch (tagType) {
      case 'state': {
        if (tagId === 'all-states') {
          onStatesChange?.([]);
          onCitiesChange?.([]);
        } else {
          const newStates = selectedStates.filter(id => id !== tagId);
          const state = availableStates.find(s => s.stateId === tagId);
          if (state?.cities) {
            const stateCityIds = state.cities.map(city => city.cityId);
            const newCities = selectedCities.filter(id => !stateCityIds.includes(id));
            onCitiesChange?.(newCities);
          }
          onStatesChange?.(newStates);
        }
        break;
      }
      
      case 'city':
        onCitiesChange?.(selectedCities.filter(id => id !== tagId));
        break;
      
      case 'city-group': {
        const stateId = parseInt(tagId.replace('state-cities-', ''));
        const state = availableStates.find(s => s.stateId === stateId);
        if (state?.cities) {
          const stateCityIds = state.cities.map(city => city.cityId);
          const newCities = selectedCities.filter(cityId => !stateCityIds.includes(cityId));
          onCitiesChange?.(newCities);
        }
        break;
      }
      
      default:
        break;
    }
  };

  const handleClearAllStates = () => {
    onStatesChange?.([]);
    onCitiesChange?.([]);
  };

  const handleClearAllCities = () => {
    onCitiesChange?.([]);
  };

  const statesForDropdown = useMemo(() => {
    return availableStates.map(state => ({
      id: state.stateId,
      label: state.name
    }));
  }, [availableStates]);

  const citiesForDropdown = useMemo(() => {
    return selectedStates.map(stateId => {
      const state = availableStates.find(s => s.stateId === stateId);
      if (!state?.cities) return null;

      return {
        id: state.stateId,
        label: state.name,
        items: state.cities.map(city => ({
          id: city.cityId,
          label: city.name
        }))
      };
    }).filter(Boolean);
  }, [selectedStates, availableStates]);

  const stateTags = useMemo(() => {
    return convertStatesToTags(selectedStates, availableStates);
  }, [selectedStates, availableStates]);

  const cityTags = useMemo(() => {
    return convertCitiesToTags(selectedCities, selectedStates, availableStates);
  }, [selectedCities, selectedStates, availableStates]);

  const hasSelectedStates = selectedStates.length > 0;

  return (
    <div
      className={twMerge(locationFilterStyles(), className)}
      {...rest}
    >
      <div className={locationFilterStateGroupStyles()}>
        <Combobox
          label={`Estados (${selectedStates.length} selecionados)`}
          placeholder="Selecione os estados..."
          buttonText={
            selectedStates.length === 0
              ? 'Selecione os estados...'
              : `${selectedStates.length} estado${selectedStates.length > 1 ? 's' : ''} selecionado${selectedStates.length > 1 ? 's' : ''}`
          }
          items={statesForDropdown}
          selectedIds={selectedStates}
          renderDropdown={(props) => (
            <DropdownList
              {...props}
              label="Estados"
              showSearch={true}
              searchPlaceholder="Buscar estados..."
              grouped={false}
              onChange={handleStateChange}
              onSelectAll={handleSelectAllStates}
            />
          )}
        />

        <TagList
          title="Estados selecionados:"
          tags={stateTags}
          onRemoveTag={handleRemoveTag}
          onClearAll={handleClearAllStates}
          showClearAll={stateTags.length > 0}
        />
      </div>

      {hasSelectedStates && (
        <div className={locationFilterStateGroupStyles()}>
          <Combobox
            label={`Cidades (${selectedCities.length} selecionadas)`}
            placeholder="Selecione as cidades..."
            buttonText={
              selectedCities.length === 0
                ? 'Selecione as cidades...'
                : `${selectedCities.length} cidade${selectedCities.length > 1 ? 's' : ''} selecionada${selectedCities.length > 1 ? 's' : ''}`
            }
            items={citiesForDropdown}
            selectedIds={selectedCities}
            renderDropdown={(props) => (
              <DropdownList
                {...props}
                label="Cidades"
                showSearch={true}
                searchPlaceholder="Buscar cidades..."
                grouped={true}
                onChange={handleCityChange}
                onSelectAll={handleSelectAllCities}
                onSelectGroup={handleSelectGroup}
              />
            )}
          />

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
    acronym: PropTypes.string,
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
