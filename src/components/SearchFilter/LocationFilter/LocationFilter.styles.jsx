import { cva } from 'class-variance-authority';

// Container principal do filtro de localização
export const locationFilterStyles = cva(
  'space-y-4'
);

// Grupo de estados
export const locationFilterStateGroupStyles = cva(
  'space-y-2'
);

export const locationFilterStateItemStyles = cva(
  'flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -m-2 rounded transition-colors'
);

export const locationFilterStateCheckboxStyles = cva(
  'w-4 h-4 text-[var(--color-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2 cursor-pointer'
);

export const locationFilterStateLabelStyles = cva(
  'text-sm text-gray-700 group-hover:text-gray-900 cursor-pointer flex-1'
);

// Grupo de cidades
export const locationFilterCityGroupStyles = cva(
  'border-t border-gray-200 pt-4 space-y-3'
);

export const locationFilterCityHeaderStyles = cva(
  'flex items-center justify-between'
);

export const locationFilterCityHeaderTitleStyles = cva(
  'text-xs font-medium text-gray-600 uppercase tracking-wide'
);

export const locationFilterCitySelectAllStyles = cva(
  'flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer hover:underline',
  {
    variants: {
      variant: {
        default: 'text-[var(--color-primary)] hover:text-[var(--color-secondary)]',
        selected: 'text-green-600 hover:text-green-700',
        partial: 'text-amber-600 hover:text-amber-700'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export const locationFilterCityListStyles = cva(
  'max-h-64 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
);

export const locationFilterCityItemStyles = cva(
  'flex items-center gap-2 cursor-pointer group hover:bg-gray-50 py-1 px-2 -mx-2 rounded text-sm transition-colors'
);

export const locationFilterCityCheckboxStyles = cva(
  'w-3.5 h-3.5 text-[var(--color-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-1 cursor-pointer'
);

export const locationFilterCityLabelStyles = cva(
  'text-sm text-gray-600 group-hover:text-gray-800 cursor-pointer flex-1'
);

// Busca de cidades
export const locationFilterSearchStyles = cva(
  'mb-3'
);

// Combobox de cidades
export const locationFilterComboboxStyles = cva(
  'w-full flex items-center gap-3 px-3 py-2 text-sm border border-gray-300 rounded-md cursor-pointer transition-colors',
  'hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]'
);

// Dropdown de cidades
export const locationFilterDropdownStyles = cva(
  'absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden'
);

// Opção do dropdown
export const locationFilterOptionStyles = cva(
  'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors hover:bg-gray-50'
);

// Container de tags selecionadas
export const locationFilterSelectedTagStyles = cva(
  'mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md'
);

// Tag individual
export const locationFilterTagStyles = cva(
  'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md'
);