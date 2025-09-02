import { cva } from 'class-variance-authority';

export const searchBarStyles = cva(
    'relative flex items-center w-full backdrop-blur-[2px] border-[0.5px] border-white/40 border-solid rounded-lg focus-within:shadow-[inset_0_0_0_2px_white] transition-all duration-250 ease-in-out',
    {
        variants: {
            appearance: {
                default: 'bg-white/80 text-gray-800 placeholder:text-gray-500',
                minimal: 'bg-transparent text-white placeholder:text-white/70 border-white/20',
                outlined: 'bg-white/10 text-white placeholder:text-white/60 border-white/60',
            },
            size: {
                sm: 'h-8 text-sm',
                md: 'h-10 text-base',
                lg: 'h-12 text-lg',
            },
        },
        defaultVariants: {
            appearance: 'default',
            size: 'md',
        },
    }
);

export const searchInputStyles = cva(
    'flex-1 bg-transparent border-none outline-none placeholder:transition-colors placeholder:duration-250',
    {
        variants: {
            appearance: {
                default: 'text-gray-800 placeholder:text-gray-500',
                minimal: 'text-white placeholder:text-white/70',
                outlined: 'text-white placeholder:text-white/60',
            },
            size: {
                sm: 'px-2 py-1 text-sm',
                md: 'px-3 py-2 text-base',
                lg: 'px-4 py-3 text-lg',
            },
            iconPosition: {
                left: '',
                right: '',
            },
        },
        compoundVariants: [
            {
                iconPosition: 'left',
                size: 'sm',
                class: 'pl-8',
            },
            {
                iconPosition: 'left',
                size: 'md',
                class: 'pl-10',
            },
            {
                iconPosition: 'left',
                size: 'lg',
                class: 'pl-12',
            },
            {
                iconPosition: 'right',
                size: 'sm',
                class: 'pr-8',
            },
            {
                iconPosition: 'right',
                size: 'md',
                class: 'pr-10',
            },
            {
                iconPosition: 'right',
                size: 'lg',
                class: 'pr-12',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            size: 'md',
            iconPosition: 'left',
        },
    }
);

export const searchIconStyles = cva(
    'absolute flex items-center justify-center transition-all duration-250 cursor-pointer hover:scale-105 active:scale-95',
    {
        variants: {
            appearance: {
                default: 'text-gray-500 hover:text-gray-700',
                minimal: 'text-white/70 hover:text-white',
                outlined: 'text-white/60 hover:text-white/80',
            },
            size: {
                sm: 'w-4 h-4',
                md: 'w-5 h-5',
                lg: 'w-6 h-6',
            },
            position: {
                left: '',
                right: '',
            },
        },
        compoundVariants: [
            {
                position: 'left',
                size: 'sm',
                class: 'left-2',
            },
            {
                position: 'left',
                size: 'md',
                class: 'left-3',
            },
            {
                position: 'left',
                size: 'lg',
                class: 'left-4',
            },
            {
                position: 'right',
                size: 'sm',
                class: 'right-2',
            },
            {
                position: 'right',
                size: 'md',
                class: 'right-3',
            },
            {
                position: 'right',
                size: 'lg',
                class: 'right-4',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            size: 'md',
            position: 'left',
        },
    }
);
