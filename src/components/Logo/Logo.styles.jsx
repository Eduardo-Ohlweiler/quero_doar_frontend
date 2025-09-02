import { cva } from 'class-variance-authority';

export const logoStyles = cva(
    'inline-flex items-center transition-all duration-300',
    {
        variants: {
            variant: {
                full: 'gap-2',
                symbol: 'gap-0',
                text: 'gap-0',
            },
            appearance: {
                default: 'text-gray-500 hover:text-gray-700',
                minimal: 'text-white/70 hover:text-white',
                outlined: 'text-white/60 hover:text-white/80',
            },
            size: {
                xs: 'text-base',
                sm: 'text-lg',
                md: 'text-xl',
                lg: 'text-2xl',
                xl: 'text-3xl',
                '2xl': 'text-4xl',
            },
            color: {
                primary: '!text-[var(--color-primary)]',
                white: '!text-white',
                dark: '!text-gray-900',
                current: '!text-current',
            },
        },
        compoundVariants: [
            // Para a variante full, aplicar gap baseado no tamanho
            {
                variant: 'full',
                size: 'xs',
                class: 'gap-1',
            },
            {
                variant: 'full',
                size: 'sm',
                class: 'gap-1.5',
            },
            {
                variant: 'full',
                size: 'md',
                class: 'gap-2',
            },
            {
                variant: 'full',
                size: 'lg',
                class: 'gap-2.5',
            },
            {
                variant: 'full',
                size: 'xl',
                class: 'gap-3',
            },
            {
                variant: 'full',
                size: '2xl',
                class: 'gap-3.5',
            },
        ],
        defaultVariants: {
            variant: 'full',
            size: 'md',
            color: 'primary',
        },
    }
);

export const logoSymbolStyles = cva(
    'flex-shrink-0 transition-all duration-300',
    {
        variants: {
            size: {
                xs: 'w-4 h-4',
                sm: 'w-5 h-5',
                md: 'w-6 h-6',
                lg: 'w-8 h-8',
                xl: 'w-10 h-10',
                '2xl': 'w-12 h-12',
            },
            color: {
                primary: '!text-[var(--color-primary)]',
                white: '!text-white',
                dark: '!text-gray-900',
                current: '!text-current',
            },
        },
        defaultVariants: {
            size: 'md',
            color: 'primary',
        },
    }
);

export const logoTextStyles = cva(
    'font-bold transition-all duration-300 whitespace-nowrap',
    {
        variants: {
            size: {
                xs: 'text-base',
                sm: 'text-lg',
                md: 'text-xl',
                lg: 'text-2xl',
                xl: 'text-3xl',
                '2xl': 'text-4xl',
            },
            color: {
                primary: '!text-[var(--color-primary)]',
                white: '!text-white',
                dark: '!text-gray-900',
                current: '!text-current',
            },
        },
        defaultVariants: {
            size: 'md',
            color: 'primary',
        },
    }
);
