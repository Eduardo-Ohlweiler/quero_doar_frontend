//TODO: Adicionar virtualização por grupos para o caso de cidades, como pode haver mais de 5k cidades no Brasil

/**
 * DropdownList Component
 * 
 * Componente modular de dropdown com funcionalidades avançadas:
 * - Campo de busca opcional
 * - Cabeçalho fixo com seleção em lote
 * - Suporte a grupos hierárquicos
 * - Checkboxes para seleção múltipla
 * - Navegação por teclado
 * 
 * @component
 * @example
 * <DropdownList
 *   items={items}
 *   selectedIds={[1, 2]}
 *   onChange={handleChange}
 *   label="Estados"
 *   showSearch={true}
 * />
 */

import { useState, useRef, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaSearch, FaCheck, FaTimes, FaMinus } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import {
  dropdownListContainerStyles,
  dropdownListSearchStyles,
  dropdownListContentStyles,
  dropdownListHeaderStyles,
  dropdownListGroupHeaderStyles,
  dropdownListOptionStyles
} from './DropdownList.styles';

/**
 * DropdownList - Componente principal
 * 
 * @param {Object} props - Props do componente
 * @param {Array} props.items - Itens para exibir (pode ser flat ou agrupado)
 * @param {Array} props.selectedIds - IDs dos itens selecionados
 * @param {Function} props.onChange - Callback para mudança de seleção
 * @param {Function} props.onSelectAll - Callback para selecionar todos
 * @param {Function} props.onSelectGroup - Callback para selecionar grupo
 * @param {string} props.label - Label do cabeçalho principal
 * @param {boolean} props.showSearch - Se deve mostrar campo de busca
 * @param {string} props.searchPlaceholder - Placeholder do campo de busca
 * @param {boolean} props.grouped - Se os itens são agrupados
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Componente renderizado
 */
export default function DropdownList({
  items = [],
  selectedIds = [],
  onChange,
  onSelectAll,
  onSelectGroup,
  label = 'Items',
  showSearch = true,
  searchPlaceholder = 'Buscar...',
  grouped = false,
  className,
  ...rest
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);
  
  /**
   * Filtra itens baseado no termo de busca
   */
  const filteredItems = useMemo(() => {
    if (grouped) {
      const validItems = items.filter(group => (group.items?.length || 0) > 0);
      
      if (!searchTerm) return validItems;
      
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      return validItems
        .map(group => ({
          ...group,
          items: group.items?.filter(item =>
            item.label?.toLowerCase().includes(lowerSearchTerm) ||
            group.label?.toLowerCase().includes(lowerSearchTerm)
          ) || []
        }))
        .filter(group => group.items.length > 0);
    }

    if (!searchTerm) return items;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      item.label?.toLowerCase().includes(lowerSearchTerm)
    );
  }, [items, searchTerm, grouped]);

  /**
   * Conta total de itens disponíveis
   */
  const totalItems = useMemo(() => {
    if (grouped) {
      return items.reduce((sum, group) => sum + (group.items?.length || 0), 0);
    }
    return items.length;
  }, [items, grouped]);

  /**
   * Verifica se todos os itens estão selecionados
   */
  const allSelected = useMemo(() => {
    if (grouped) {
      const allItemIds = items.flatMap(group =>
        group.items?.map(item => item.id) || []
      );
      return allItemIds.length > 0 && allItemIds.every(id => selectedIds.includes(id));
    }
    return items.length > 0 && items.every(item => selectedIds.includes(item.id));
  }, [items, selectedIds, grouped]);

  /**
   * Handler para selecionar/desselecionar todos
   */
  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!allSelected);
    }
  };

  /**
   * Handler para selecionar/desselecionar um grupo
   */
  const handleSelectGroup = (groupId) => {
    if (onSelectGroup) {
      onSelectGroup(groupId);
    }
  };

  /**
   * Handler para selecionar/desselecionar um item
   */
  const handleItemChange = (itemId, isSelected) => {
    if (onChange) {
      onChange(itemId, isSelected);
    }
  };

  /**
   * Limpa o campo de busca
   */
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  /**
   * Renderiza um grupo de itens
   */
  const renderGroup = (group) => {
    const groupItemIds = group.items?.map(item => item.id) || [];
    const selectedGroupItems = groupItemIds.filter(id => selectedIds.includes(id));
    const allGroupSelected = groupItemIds.length > 0 && selectedGroupItems.length === groupItemIds.length;
    const someGroupSelected = selectedGroupItems.length > 0 && !allGroupSelected;

    const getGroupCheckboxColor = () => {
      if (allGroupSelected) return 'text-green-700';
      if (someGroupSelected) return 'text-amber-700';
      return 'text-[var(--color-primary)]';
    };

    const GroupIcon = allGroupSelected ? FaCheck : someGroupSelected ? FaMinus : FaCheck;
    const iconColor = allGroupSelected ? 'text-green-600' : someGroupSelected ? 'text-amber-600' : 'text-[var(--color-primary)]';

    return (
      <div key={group.id} className="mb-2">
        <div className={dropdownListGroupHeaderStyles()}>
          <label
            className={twMerge(
              'flex items-center gap-2 p-2 text-sm font-medium cursor-pointer hover:bg-gray-100 rounded',
              getGroupCheckboxColor()
            )}
          >
            <input
              type="checkbox"
              checked={allGroupSelected}
              onChange={() => handleSelectGroup(group.id)}
              className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
            />
            <GroupIcon className={twMerge('w-3 h-3', iconColor)} />
            <span>
              {group.label} ({selectedGroupItems.length}/{groupItemIds.length})
            </span>
          </label>
        </div>

        <div className="pl-2">
          {group.items?.map(item => (
            <label
              key={item.id}
              className={dropdownListOptionStyles()}
            >
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={(e) => handleItemChange(item.id, e.target.checked)}
                className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
              />
              <span className="text-sm text-gray-600">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  /**
   * Renderiza itens flat (não agrupados)
   */
  const renderFlatItems = () => {
    return filteredItems.map(item => (
      <label
        key={item.id}
        className={dropdownListOptionStyles()}
      >
        <input
          type="checkbox"
          checked={selectedIds.includes(item.id)}
          onChange={(e) => handleItemChange(item.id, e.target.checked)}
          className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
        />
        <span className="text-sm text-gray-700">
          {item.label}
        </span>
      </label>
    ));
  };

  return (
    <div
      className={twMerge(dropdownListContainerStyles(), className)}
      {...rest}
    >
      {showSearch && (
        <div className={dropdownListSearchStyles()}>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Limpar busca"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className={dropdownListContentStyles()}>
        {filteredItems.length > 0 ? (
          <>
            <div className={dropdownListHeaderStyles()}>
              <label className="flex items-center gap-2 p-2 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
                />
                <FaCheck className="w-3 h-3 text-[var(--color-primary)]" />
                <span className="text-[var(--color-primary)]">
                  {label} ({selectedIds.length}/{totalItems})
                </span>
              </label>
            </div>

            {grouped ? (
              filteredItems.map(renderGroup)
            ) : (
              renderFlatItems()
            )}
          </>
        ) : (
          <div className="px-3 py-6 text-sm text-gray-500 text-center">
            {searchTerm
              ? 'Nenhum item encontrado'
              : 'Nenhum item disponível'
            }
          </div>
        )}
      </div>
    </div>
  );
}

DropdownList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.array // Para grupos
  })).isRequired,
  selectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectGroup: PropTypes.func,
  label: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
  grouped: PropTypes.bool,
  className: PropTypes.string
};
