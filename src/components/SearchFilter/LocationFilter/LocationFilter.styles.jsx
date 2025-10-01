/**
 * LocationFilter Styles
 * 
 * Estilos otimizados para o componente LocationFilter.
 * Removidos estilos não utilizados para reduzir entropia.
 * Focado na interface de combobox e tags otimizadas.
 */

import { cva } from 'class-variance-authority';

// ========================================
// ESTILOS PRINCIPAIS
// ========================================

/**
 * Container principal do filtro de localização
 * Espaçamento vertical entre grupos de estado e cidade
 */
export const locationFilterStyles = cva(
  'space-y-4'
);

/**
 * Grupo de estados - seção superior
 * Espaçamento compacto entre elementos relacionados
 */
export const locationFilterStateGroupStyles = cva(
  'space-y-2'
);

// ========================================
// ESTILOS DE INTERFACE (COMBOBOX)
// ========================================

/**
 * Estilo do combobox (botão de seleção)
 * Interface consistente para estados e cidades
 */
export const locationFilterComboboxStyles = cva(
  'w-full flex items-center gap-3 px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer transition-colors',
  'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]'
);

/**
 * Dropdown com opções de seleção
 * Posicionamento absoluto com z-index alto
 */
export const locationFilterDropdownStyles = cva(
  'absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden'
);

/**
 * Opção individual dentro do dropdown
 * Hover effect para melhor UX
 */
export const locationFilterOptionStyles = cva(
  'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-gray-50'
);

// ========================================
// ESTILOS DE TAGS
// ========================================

/**
 * Container das tags selecionadas
 * Fundo diferenciado para destacar seleções
 */
export const locationFilterSelectedTagStyles = cva(
  'mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md'
);

/**
 * Tag individual para item selecionado
 * Inclui botão de remoção integrado
 */
export const locationFilterTagStyles = cva(
  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
);