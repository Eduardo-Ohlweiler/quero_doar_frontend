import { cva } from 'class-variance-authority';

/**
 * DropdownList - Container Principal
 */
export const dropdownListContainerStyles = cva(
  'bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden',
  {
    variants: {
      size: {
        sm: 'max-h-60',
        md: 'max-h-96',
        lg: 'max-h-[32rem]',
      }
    },
    defaultVariants: {
      size: 'md'
    }
  }
);

/**
 * DropdownList - Área de Busca
 */
export const dropdownListSearchStyles = cva(
  'p-3 border-b border-gray-200 bg-gray-50'
);

/**
 * DropdownList - Área de Conteúdo
 */
export const dropdownListContentStyles = cva(
  'overflow-y-auto max-h-80'
);

/**
 * DropdownList - Cabeçalho Principal (Sticky)
 */
export const dropdownListHeaderStyles = cva(
  'sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm'
);

/**
 * DropdownList - Cabeçalho de Grupo (Sticky)
 */
export const dropdownListGroupHeaderStyles = cva(
  'sticky top-0 z-10 bg-gray-50 border-b border-gray-200'
);

/**
 * DropdownList - Item/Opção
 */
export const dropdownListOptionStyles = cva(
  'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150'
);
