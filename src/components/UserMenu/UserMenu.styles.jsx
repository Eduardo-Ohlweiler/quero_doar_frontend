import { cva } from 'class-variance-authority';

export const userMenuStyles = cva(
    // Estilo base - trigger principal
    'inline-flex items-center gap-2 rounded-lg font-semibold duration-250 ease-in-out box-border focus:outline-none shadow-[inset_0_0_0_0px_white] focus-visible:shadow-[inset_0_0_0_3px_white] border-[0.5px] border-white/40 border-solid backdrop-blur-[2px] cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100',
    {
        variants: {
            size: {
                small: 'px-1 py-0.5 text-sm',
                medium: 'px-1.5 py-1 text-base',
                large: 'px-2 py-1.5 text-lg',
            },
            appearance: {
                primary: 'text-white bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] disabled:bg-[var(--color-primary)]/80 disabled:text-white/50',
                secondary: 'text-[var(--color-primary)] bg-white/80 hover:bg-white disabled:bg-white/80 disabled:text-[var(--color-primary)]/50',
                ghost: 'text-white hover:bg-white/10 disabled:bg-transparent disabled:text-white/50',
            },
        },
        defaultVariants: {
            size: 'medium',
            appearance: 'secondary',
        },
    }
);

export const userMenuChevronStyles = cva(
    'transition-transform duration-200',
    {
        variants: {
            size: {
                small: 'w-3 h-3',
                medium: 'w-4 h-4',
                large: 'w-5 h-5',
            },
            isOpen: {
                true: 'transform rotate-180',
                false: '',
            },
            appearance: {
                primary: 'text-white/80',
                secondary: 'text-[var(--color-primary)]/80',
                ghost: 'text-white/80',
            },
        },
        defaultVariants: {
            size: 'medium',
            isOpen: false,
        },
    }
);

export const userMenuDropdownStyles = cva(
    'absolute right-0 top-full mt-2 py-0 z-50 backdrop-blur-[2px] rounded-lg shadow-lg border overflow-hidden transition-all duration-200 ease-in-out transform origin-top-right border-white/40',
    {
        variants: {
            size: {
                small: 'w-48 text-sm',
                medium: 'w-56 text-base',
                large: 'w-64 text-lg',
            },
            appearance: {
                primary: 'bg-[var(--color-primary)]/80',
                secondary: 'bg-white/90',
                ghost: 'bg-transparent',
            },
            isOpen: {
                true: 'opacity-100 scale-100 translate-y-0',
                false: 'opacity-0 scale-95 -translate-y-2 pointer-events-none',
            },
        },
        defaultVariants: {
            size: 'medium',
            appearance: 'secondary',
            isOpen: false,
        },
    }
);

export const userMenuItemStyles = cva(
    'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 focus:outline-none border-b last:border-b-0 border-white/40',
    {
        variants: {
            size: {
                small: 'px-3 py-2 text-sm',
                medium: 'px-4 py-3 text-base',
                large: 'px-5 py-4 text-lg',
            },
            appearance: {
                primary: 'text-white hover:bg-[var(--color-primary)]',
                secondary: 'text-[var(--color-primary)] hover:bg-white/60',
                ghost: 'text-white hover:bg-white/10 ',
            },
        },
        defaultVariants: {
            size: 'medium',
            appearance: 'secondary',
        },
    }
);

export const userMenuIconStyles = cva(
    'flex-shrink-0',
    {
        variants: {
            size: {
                small: 'w-3 h-3',
                medium: 'w-4 h-4',
                large: 'w-5 h-5',
            },
            appearance: {
                primary: 'text-white/80',
                secondary: 'text-[var(--color-primary)]',
                ghost: 'text-white/80',
            },
        },
        defaultVariants: {
            size: 'medium',
            appearance: 'secondary',
        },
    }
);
