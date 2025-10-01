import { cva } from 'class-variance-authority';

/**
 * SearchFilter Styles
 * 
 * Estilos otimizados para o componente SearchFilter.
 * Removidos estilos não utilizados para reduzir entropia.
 */

// ========================================
// ESTILOS PRINCIPAIS
// ========================================

/**
 * Container principal do filtro
 * Layout responsivo com espaçamento consistente
 */
export const searchFilterStyles = cva(
  'bg-white rounded-lg border border-gray-200 shadow-sm p-6 w-full max-w-sm space-y-6'
);

/**
 * Header do filtro com título e botão de limpar
 * Alinhamento horizontal com separador visual
 */
export const searchFilterHeaderStyles = cva(
  'flex items-center justify-between border-b border-gray-200 pb-4'
);

/**
 * Título principal do filtro
 * Tipografia consistente com a hierarquia do design system
 */
export const searchFilterTitleStyles = cva(
  'text-lg font-semibold text-gray-900'
);

// ========================================
// ESTILOS DE SEÇÕES
// ========================================

/**
 * Container de seção individual
 * Espaçamento vertical entre elementos da seção
 */
export const searchFilterSectionStyles = cva(
  'space-y-3'
);

/**
 * Cabeçalho de seção com botão de toggle
 * Alinhamento horizontal com controles
 */
export const searchFilterSectionHeaderStyles = cva(
  'flex items-center justify-between'
);

/**
 * Título de seção individual
 * Tipografia secundária na hierarquia
 */
export const searchFilterSectionTitleStyles = cva(
  'text-sm font-semibold text-gray-900'
);

/**
 * Botão de toggle para expandir/recolher seções
 * Estados de hover e transições suaves
 */
export const searchFilterSectionToggleStyles = cva(
  'text-gray-400 hover:text-gray-600 transition-colors p-1 -m-1 rounded'
);

/**
 * Container de conteúdo da seção
 * Espaçamento vertical entre itens de conteúdo
 */
export const searchFilterSectionContentStyles = cva(
  'space-y-3'
);

// ========================================
// ESTILOS DE GRUPOS
// ========================================

/**
 * Grupo de checkboxes
 * Espaçamento vertical compacto entre checkboxes relacionados
 */
export const searchFilterCheckboxGroupStyles = cva(
  'space-y-2'
);

// ========================================
// ESTILOS DE TOOLTIP
// ========================================

/**
 * Tooltip informativo
 * Positioning, styling e indicadores visuais
 * Inclui pseudo-elemento para seta de direcionamento
 */
export const searchFilterTooltipStyles = cva(
  'absolute z-10 left-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-95',
  'before:content-[""] before:absolute before:-top-1 before:left-3 before:w-2 before:h-2 before:bg-gray-900 before:transform before:rotate-45'
);