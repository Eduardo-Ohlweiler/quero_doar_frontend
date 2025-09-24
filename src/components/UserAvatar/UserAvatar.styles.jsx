import { cva } from 'class-variance-authority';

export const userAvatarStyles = cva(
    'backdrop-blur-sm',
    {
        variants: {
            size: {
                small: 'w-8 h-8 text-xs',
                medium: 'w-10 h-10 text-sm',
                large: 'w-12 h-12 text-base',
                xlarge: 'w-14 h-14 text-lg',
                xxlarge: 'w-16 h-16 text-xl',
                xxxlarge: 'w-20 h-20 text-2xl',
            },
            appearance: {
                primary: 'bg-[var(--color-primary)]/80',
                secondary: '',
                ghost: 'bg-white/10',
            },
            frame: {
                true: '',
                false: 'rounded-full',
            },
            display: {
                'photo-only': '',
                'photo-with-name': '',
                'name-only': '',
            },
        },
        compoundVariants: [
            {
                frame: true,
                appearance: 'primary',
                class: 'rounded-full border-2 border-white/40 shadow-lg',
            },
            {
                frame: true,
                appearance: 'secondary', 
                class: 'rounded-full border-2 border-[var(--color-primary)]/40 shadow-lg',
            },
            {
                frame: true,
                appearance: 'ghost',
                class: 'rounded-full border-2 border-white/40 shadow-lg',
            },
        ],
        defaultVariants: {
            size: 'medium',
            appearance: 'primary',
            frame: false,
            display: 'photo-only',
        },
    }
);

export const userAvatarImageStyles = cva(
    'object-cover rounded-full',
    {
        variants: {
            frame: {
                true: '',
                false: '',
            },
            hasLevel: {
                true: '',
                false: '',
            },
        },
        defaultVariants: {
            frame: false,
            hasLevel: false,
        },
    }
);

export const userAvatarInitialsStyles = cva(
    'font-bold select-none h-full flex items-center justify-center',
    {
        variants: {
            size: {
                small: 'text-xs',
                medium: 'text-sm',
                large: 'text-base',
                xlarge: 'text-lg',
                xxlarge: 'text-xl',
                xxxlarge: 'text-2xl',
            },
            appearance: {
                primary: 'text-white',
                secondary: 'text-[var(--color-primary)]',
                ghost: 'text-white',
            },
        },
        defaultVariants: {
            size: 'medium',
        },
    }
);

export const userAvatarLevelStyles = cva(
    'absolute font-medium rounded-lg border-1 flex items-center justify-center backdrop-blur-[2px] z-1',
    {
        variants: {
            size: {
                small: '-bottom-[-10px] -left-[-20px] w-7.5 h-2 text-[6px]',
                medium: '-bottom-[-9px] -left-[-20px] w-9.5 h-3 text-[8px]',
                large: '-bottom-[-8px] -left-[-20px] w-11.5 h-4 text-[10px]',
                xlarge: '-bottom-[-6px] -left-[-20px] w-13.5 h-5 text-xs',
                xxlarge: '-bottom-[-4px] -left-[-20px] w-15.5 h-6 text-sm',
                xxxlarge: '-bottom-[-2px] -left-[-20px] w-16 h-6 text-sm',
            },
            appearance: {
                primary: 'bg-[var(--color-primary)]/80 border-white/40 text-white',
                secondary: 'bg-white/80 border-white/40 text-[var(--color-primary)]',
                ghost: 'bg-white/80 border-white/40 text-[var(--color-primary)]',
            },
        },
        defaultVariants: {
            size: 'medium',
            appearance: 'primary',
        },
    }
);

export const userAvatarNameStyles = cva(
    'font-medium',
    {
        variants: {
            size: {
                small: 'text-sm ml-1',
                medium: 'text-base ml-1.5',
                large: 'text-lg ml-2',
                xlarge: 'text-2xl ml-2.5',
                xxlarge: 'text-3xl ml-3',
                xxxlarge: 'text-4xl ml-4',
            },
            appearance: {
                primary: 'text-white',
                secondary: 'text-[var(--color-primary)]',
                ghost: 'text-white',
            },
        },
        
        defaultVariants: {
            size: 'medium',
        },
    }
);

export const userAvatarContainerStyles = cva(
    'inline-flex items-center',
    {
        variants: {
            display: {
                'photo-only': '',
                'photo-with-name': '',
                'name-only': '',
            },
        },
        defaultVariants: {
            display: 'photo-only',
        },
    }
);
