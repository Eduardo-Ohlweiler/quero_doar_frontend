import { cva } from 'class-variance-authority';

export const footerStyles = cva(
    // Estilo padrão aplicado a todas as variantes
    'w-full text-white',
    {
        variants: {
            variant: {
                full: 'mt-auto',
                minimal: 'mt-auto',
            },
            appearance: {
                gradient: '',
                white: '',
                ghost: '',
            },
        },
        defaultVariants: {
            variant: 'full',
            appearance: 'gradient',
        },
    }
);

export const footerContainerStyles = cva(
    // Estilo base do container
    'w-full backdrop-blur-[2px] border-t border-white/40',
    {
        variants: {
            variant: {
                full: '',
                minimal: '',
            },
            appearance: {
                gradient: 'bg-gradient-primary', // Usa a classe definida em @layer utilities
                white: 'bg-white text-[var(--color-primary)] border-t border-gray-200',
                ghost: 'bg-black/20 backdrop-blur-[10px] border-t border-white/10',
            },
        },
        defaultVariants: {
            variant: 'full',
            appearance: 'gradient',
        },
    }
);

export const footerSectionStyles = cva(
    // Estilo base das seções do footer
    'flex flex-col',
    {
        variants: {},
        defaultVariants: {},
    }
);