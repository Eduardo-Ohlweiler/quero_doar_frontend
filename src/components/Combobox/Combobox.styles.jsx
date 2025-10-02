import { cva } from 'class-variance-authority';

/**
 * Combobox - Container Principal
 */
export const comboboxContainerStyles = cva(
  'relative w-full'
);

/**
 * Combobox - Botão de Seleção
 */
export const comboboxButtonStyles = cva(
  'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm border rounded-md transition-colors',
  {
    variants: {
      disabled: {
        true: 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200',
        false: 'bg-white text-gray-900 cursor-pointer border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]'
      }
    },
    defaultVariants: {
      disabled: false
    }
  }
);

/**
 * Combobox - Dropdown Container
 */
export const comboboxDropdownStyles = cva(
  'absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg'
);

/**
 * Combobox - Opção Padrão (dropdown simples)
 */
export const comboboxDefaultOptionStyles = cva(
  'flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150'
);
