import { cva } from 'class-variance-authority';

export const skeletonStyles = cva(
    // Estilo base: animação de pulse com gradiente personalizado
    'animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
    {
        variants: {
            variant: {
                rectangular: '',
                circular: '',
                text: '',
            },
            width: {
                full: 'w-full',
                auto: 'w-auto',
                '16': 'w-16',
                '24': 'w-24',
                '32': 'w-32',
                '48': 'w-48',
                '64': 'w-64',
                '80': 'w-80',
                '96': 'w-96',
            },
            height: {
                '2': 'h-2',
                '3': 'h-3',
                '4': 'h-4',
                '5': 'h-5',
                '6': 'h-6',
                '8': 'h-8',
                '10': 'h-10',
                '12': 'h-12',
                '16': 'h-16',
                '20': 'h-20',
                '24': 'h-24',
                '32': 'h-32',
            },
            rounded: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                full: 'rounded-full',
            },
        },
        compoundVariants: [
            {
                variant: 'circular',
                class: 'rounded-full',
            },
            {
                variant: 'text',
                class: 'rounded-sm',
            },
        ],
        defaultVariants: {
            variant: 'rectangular',
            width: 'full',
            height: '4',
            rounded: 'md',
        },
    }
);