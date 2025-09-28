import { cva } from 'class-variance-authority';

// Container principal do filtro
export const searchFilterStyles = cva(
  'bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full max-w-sm space-y-6'
);

// Header do filtro
export const searchFilterHeaderStyles = cva(
  'flex items-center justify-between border-b border-gray-200 pb-4'
);

export const searchFilterTitleStyles = cva(
  'text-lg font-semibold text-gray-900'
);

export const searchFilterClearButtonStyles = cva(
  'text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-medium transition-colors cursor-pointer'
);

// Seções do filtro
export const searchFilterSectionStyles = cva(
  'space-y-3'
);

export const searchFilterSectionHeaderStyles = cva(
  'flex items-center justify-between'
);

export const searchFilterSectionTitleStyles = cva(
  'text-sm font-semibold text-gray-900'
);

export const searchFilterSectionToggleStyles = cva(
  'text-gray-400 hover:text-gray-600 transition-colors p-1 -m-1 rounded'
);

export const searchFilterSectionContentStyles = cva(
  'space-y-3'
);

// Grupos de checkbox
export const searchFilterCheckboxGroupStyles = cva(
  'space-y-2'
);

export const searchFilterCheckboxItemStyles = cva(
  'flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -m-2 rounded transition-colors'
);

export const searchFilterCheckboxStyles = cva(
  'w-4 h-4 text-[var(--color-primary)] bg-gray-100 border-gray-300 rounded focus:ring-[var(--color-primary)] focus:ring-2 cursor-pointer'
);

export const searchFilterLabelStyles = cva(
  'text-sm text-gray-700 group-hover:text-gray-900 cursor-pointer flex-1'
);

export const searchFilterCountStyles = cva(
  'text-xs text-gray-500 ml-auto'
);

// Grupos de radio
export const searchFilterRadioGroupStyles = cva(
  'space-y-2'
);

export const searchFilterRadioItemStyles = cva(
  'flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -m-2 rounded transition-colors'
);

export const searchFilterRadioStyles = cva(
  'w-4 h-4 text-[var(--color-primary)] bg-gray-100 border-gray-300 focus:ring-[var(--color-primary)] focus:ring-2 cursor-pointer'
);

// Tooltip
export const searchFilterTooltipStyles = cva(
  'absolute z-10 left-0 top-6 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-95',
  'before:content-[""] before:absolute before:-top-1 before:left-3 before:w-2 before:h-2 before:bg-gray-900 before:transform before:rotate-45'
);