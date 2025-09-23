import { cva } from 'class-variance-authority';

export const categoryCardStyles = cva(
    // Estilo base: card com bordas arredondadas, fundo branco, sombra sutil e efeitos de hover
    'flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-250 ease-out cursor-pointer hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:ring-offset-2',
    {
        variants: {
            disabled: {
                true: 'opacity-50 cursor-not-allowed hover:shadow-sm hover:scale-100 focus:ring-0',
                false: '',
            },
        },
        defaultVariants: {
            disabled: false,
        },
    }
);

export const categoryCardIconStyles = cva(
    // Container circular para o ícone com fundo verde (cor primária do projeto)
    'flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[var(--color-primary)] text-white text-2xl shadow-lg'
);

export const categoryCardTitleStyles = cva(
    // Título da categoria
    'text-lg font-semibold text-gray-900 mb-1 text-center'
);

export const categoryCardCountStyles = cva(
    // Texto do contador de itens
    'text-sm text-gray-600 text-center'
);
