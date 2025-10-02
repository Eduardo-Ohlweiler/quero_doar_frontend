/**
 * Combobox Component
 * 
 * Componente de combobox genérico que combina um botão de seleção
 * com um dropdown customizável. Pode usar dropdown padrão ou aceitar
 * componentes customizados como DropdownList.
 * 
 * @component
 * @example
 * // Dropdown padrão
 * <Combobox
 *   label="Selecionar"
 *   placeholder="Escolha uma opção"
 *   items={items}
 *   selectedIds={[1, 2]}
 *   onChange={handleChange}
 * />
 * 
 * @example
 * // Dropdown customizado
 * <Combobox
 *   label="Selecionar"
 *   placeholder="Escolha uma opção"
 *   renderDropdown={(props) => <DropdownList {...props} />}
 * />
 */

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import {
  comboboxContainerStyles,
  comboboxButtonStyles,
  comboboxDropdownStyles,
  comboboxDefaultOptionStyles
} from './Combobox.styles';

/**
 * Combobox - Componente principal
 * 
 * @param {Object} props - Props do componente
 * @param {string} props.label - Label descritivo do combobox
 * @param {string} props.placeholder - Texto quando nenhum item selecionado
 * @param {Array} props.items - Itens para dropdown padrão
 * @param {Array} props.selectedIds - IDs dos itens selecionados
 * @param {Function} props.onChange - Callback para mudança de seleção
 * @param {Function} props.renderDropdown - Função para renderizar dropdown customizado
 * @param {boolean} props.disabled - Se o combobox está desabilitado
 * @param {boolean} props.showIcon - Se deve mostrar ícone de seta
 * @param {string} props.className - Classes CSS adicionais
 * @param {string} props.buttonClassName - Classes CSS do botão
 * @param {string} props.dropdownClassName - Classes CSS do dropdown
 * @returns {JSX.Element} Componente renderizado
 */
export default function Combobox({
  label = '',
  placeholder = 'Selecione...',
  buttonText,
  items = [],
  selectedIds = [],
  onChange,
  renderDropdown,
  disabled = false,
  showIcon = true,
  className,
  buttonClassName,
  dropdownClassName,
  children,
  ...rest
}) {
  // ========================================
  // ESTADO
  // ========================================
  
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // ========================================
  // EFEITO - FECHAR AO CLICAR FORA
  // ========================================
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // ========================================
  // HANDLERS
  // ========================================
  
  /**
   * Toggle do dropdown
   * A verificação de disabled não é necessária pois o botão já possui o atributo disabled
   */
  const handleToggle = () => setIsOpen(!isOpen);

  /**
   * Fecha o dropdown
   */
  const handleClose = () => setIsOpen(false);

  // ========================================
  // COMPUTED VALUES
  // ========================================
  
  /**
   * Texto exibido no botão
   * Prioridade: buttonText customizado > label do item único > contador de múltiplos > placeholder
   */
  const displayText = (() => {
    if (buttonText) return buttonText;
    if (selectedIds.length === 0) return placeholder;
    
    const selectedItems = items.filter(item => selectedIds.includes(item.id));
    if (selectedItems.length === 1) return selectedItems[0].label;
    
    return `${selectedIds.length} selecionados`;
  })();

  // ========================================
  // RENDERIZAÇÃO DO DROPDOWN
  // ========================================
  
  /**
   * Renderiza dropdown customizado ou padrão
   */
  const renderDropdownContent = () => {
    // Se há função de renderização customizada, usa ela
    if (renderDropdown) {
      return renderDropdown({
        items,
        selectedIds,
        onChange,
        onClose: handleClose,
      });
    }

    // Se há children, renderiza eles
    if (children) {
      return children;
    }

    // Dropdown padrão
    return (
      <div className="py-2">
        {items.map((item) => (
          <label
            key={item.id}
            className={comboboxDefaultOptionStyles()}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={(e) => onChange?.(item.id, e.target.checked)}
              className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2"
            />
            <span className="text-sm text-gray-700">
              {item.label}
            </span>
          </label>
        ))}
        
        {items.length === 0 && (
          <div className="px-3 py-4 text-sm text-gray-500 text-center">
            Nenhum item disponível
          </div>
        )}
      </div>
    );
  };

  // ========================================
  // RENDER PRINCIPAL
  // ========================================
  
  return (
    <div
      ref={containerRef}
      className={twMerge(comboboxContainerStyles(), className)}
      {...rest}
    >
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      {/* Botão do Combobox */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={twMerge(
          comboboxButtonStyles({ disabled }),
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-left truncate">
          {displayText}
        </span>
        
        {showIcon && (
          <FaChevronDown
            className={twMerge(
              'w-4 h-4 text-gray-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={twMerge(
            comboboxDropdownStyles(),
            dropdownClassName
          )}
        >
          {renderDropdownContent()}
        </div>
      )}
    </div>
  );
}

Combobox.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired
  })),
  selectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onChange: PropTypes.func,
  renderDropdown: PropTypes.func,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  dropdownClassName: PropTypes.string,
  children: PropTypes.node
};
