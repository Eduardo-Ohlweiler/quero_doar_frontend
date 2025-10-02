/**
 * TagList Styles
 * 
 * Estilos para o componente TagList.
 * Baseado nos estilos do LocationFilter para manter consistência.
 */

import { cva } from 'class-variance-authority';

// ========================================
// ESTILOS PRINCIPAIS
// ========================================

/**
 * Container principal da lista de tags
 * Espaçamento e layout vertical
 */
export const tagListStyles = cva(
  'mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md'
);

/**
 * Header com título e botão limpar tudo
 * Layout flexível com espaçamento entre elementos
 */
export const tagListHeaderStyles = cva(
  'flex items-center justify-between mb-2'
);

/**
 * Título da seção de tags
 * Tipografia pequena e consistente
 */
export const tagListTitleStyles = cva(
  'text-xs font-medium text-gray-600'
);

/**
 * Container das tags propriamente ditas
 * Layout flexível com wrap e espaçamento
 */
export const tagListTagsContainerStyles = cva(
  'flex flex-wrap gap-1'
);

/**
 * Tag individual padrão
 * Estilo base para tags normais
 */
export const tagListTagStyles = cva(
  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
);

/**
 * Tag consolidada (ex: "Todos estados")
 * Destaque visual diferenciado para tags especiais
 */
export const tagListConsolidatedTagStyles = cva(
  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 border border-green-300 rounded-md'
);
