/**
 * TagList Component
 * 
 * Componente modular para exibir e gerenciar listas de tags.
 * Suporta múltiplos tipos de tags (estados, cidades) com funcionalidades:
 * 
 * - Renderização otimizada de tags com consolidação automática
 * - Botão de remoção individual para cada tag
 * - Botão "Limpar tudo" global
 * - Suporte a tags especiais (ex: "Todos estados")
 * - Interface consistente com sistema de design
 * 
 * @component
 * @example
 * <TagList
 *   title="Estados selecionados"
 *   tags={[{ id: 1, label: 'São Paulo', type: 'state' }]}
 *   onRemoveTag={handleRemoveTag}
 *   onClearAll={handleClearAll}
 *   showClearAll={true}
 * />
 */

import PropTypes from 'prop-types';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import Button from '../Button/Button';
import {
  tagListStyles,
  tagListHeaderStyles,
  tagListTitleStyles,
  tagListTagsContainerStyles,
  tagListTagStyles,
  tagListConsolidatedTagStyles
} from './TagList.styles';

/**
 * TagList - Componente principal para exibição de tags
 * 
 * @param {Object} props - Props do componente
 * @param {string} props.title - Título da seção de tags
 * @param {Array} props.tags - Array de tags para exibir
 * @param {Function} props.onRemoveTag - Callback para remover uma tag específica
 * @param {Function} props.onClearAll - Callback para limpar todas as tags
 * @param {boolean} props.showClearAll - Se deve mostrar o botão "Limpar tudo"
 * @param {string} props.className - Classes CSS adicionais
 * @returns {JSX.Element} Componente renderizado
 */
export default function TagList({
  title,
  tags = [],
  onRemoveTag,
  onClearAll,
  showClearAll = false,
  className,
  ...rest
}) {
  if (!tags || tags.length === 0) {
    return null;
  }

  /**
   * Renderiza uma tag (normal ou consolidada)
   * @param {Object} tag - Objeto da tag
   * @returns {JSX.Element} Tag renderizada
   */
  const renderTag = (tag) => {
    const isConsolidated = tag.consolidated;
    const tagClassName = isConsolidated 
      ? tagListConsolidatedTagStyles() 
      : tagListTagStyles();

    return (
      <span
        key={isConsolidated ? `consolidated-${tag.id}` : `tag-${tag.type}-${tag.id}`}
        className={tagClassName}
      >
        {isConsolidated && <FaCheck className="w-3 h-3" />}
        {tag.label}
        <button
          onClick={() => onRemoveTag?.(tag.id, tag.type)}
          className="ml-1 hover:text-red-600 transition-colors"
          aria-label={`Remover ${tag.label}`}
        >
          <FaTimes className="w-3 h-3" />
        </button>
      </span>
    );
  };

  return (
    <div
      className={twMerge(tagListStyles(), className)}
      {...rest}
    >
      {/* Header com título e botão limpar tudo */}
      <div className={tagListHeaderStyles()}>
        <span className={tagListTitleStyles()}>
          {title}
        </span>
        {showClearAll && (
          <Button
            appearance="ghost"
            size="small"
            onClick={onClearAll}
            className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:bg-[var(--color-primary)]/10"
          >
            Limpar tudo
          </Button>
        )}
      </div>

      {/* Container das tags */}
      <div className={tagListTagsContainerStyles()}>
        {tags.map(renderTag)}
      </div>
    </div>
  );
}

TagList.propTypes = {
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    consolidated: PropTypes.bool,
    // Propriedades adicionais para tags específicas
    displayName: PropTypes.string,
    stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })),
  onRemoveTag: PropTypes.func,
  onClearAll: PropTypes.func,
  showClearAll: PropTypes.bool,
  className: PropTypes.string
};
