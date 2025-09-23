import { cva } from 'class-variance-authority';

export const topCategoryStyles = cva(
    // Container principal com fundo transparente e espaçamento
    'w-full bg-transparent py-8 px-4'
);

export const topCategoryHeaderStyles = cva(
    // Header centralizado com espaçamento
    'text-center mb-8'
);

export const topCategoryTitleStyles = cva(
    // Título principal com ícone
    'text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center'
);

export const topCategorySubtitleStyles = cva(
    // Subtítulo descritivo
    'text-gray-600 text-sm md:text-base'
);

export const topCategoryGridStyles = cva(
    // Grid responsivo que exibe categorias em linha horizontal
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto'
);
