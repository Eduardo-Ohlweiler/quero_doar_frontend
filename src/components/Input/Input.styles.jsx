import { cva } from 'class-variance-authority';

export const inputContainerStyles = cva(
    'relative flex items-center w-full backdrop-blur-[2px] border-[0.5px] border-solid rounded-lg transition-all duration-250 ease-in-out',
    {
        variants: {
            appearance: {
                default: 'bg-white/80 border-white/40',
                minimal: 'bg-transparent border-white/20',
                outlined: 'bg-white/10 border-white/60',
                'outlined-white': 'bg-white/10 border-white/60',
            },
            size: {
                sm: 'h-8',
                md: 'h-10',
                lg: 'h-12',
            },
            focused: {
                true: 'shadow-[inset_0_0_0_2px_white]',
                false: '',
            },
            error: {
                true: 'border-red-400 shadow-[inset_0_0_0_2px_rgb(248_113_113)]',
                false: '',
            },
            disabled: {
                true: 'opacity-50 cursor-not-allowed',
                false: '',
            },
        },
        compoundVariants: [
            {
                focused: true,
                error: false,
                class: 'shadow-[inset_0_0_0_2px_white]',
            },
            {
                focused: true,
                error: true,
                class: 'shadow-[inset_0_0_0_2px_rgb(248_113_113)]',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            size: 'md',
            focused: false,
            error: false,
            disabled: false,
        },
    }
);

export const inputFieldStyles = cva(
    'flex-1 bg-transparent border-none outline-none placeholder:transition-colors placeholder:duration-250',
    {
        variants: {
            appearance: {
                default: 'text-gray-800 placeholder:text-gray-500',
                minimal: 'text-white placeholder:text-white/70',
                outlined: 'text-black placeholder:text-black/60',
                'outlined-white': 'text-white placeholder:text-white/60',
            },
            size: {
                sm: 'px-2 py-1 text-sm',
                md: 'px-3 py-2 text-base',
                lg: 'px-4 py-3 text-lg',
            },
            iconPosition: {
                left: '',
                right: '',
                none: '',
            },
            error: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            // Icon position left adjustments
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
            // Icon position right adjustments
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
            // Error state text colors
            {
                appearance: 'default',
                error: true,
                class: 'text-red-700 placeholder:text-red-400',
            },
            {
                appearance: 'minimal',
                error: true,
                class: 'text-red-300 placeholder:text-red-200',
            },
            {
                appearance: 'outlined',
                error: true,
                class: 'text-red-600 placeholder:text-red-400',
            },
            {
                appearance: 'outlined-white',
                error: true,
                class: 'text-red-300 placeholder:text-red-200',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            size: 'md',
            iconPosition: 'none',
            error: false,
        },
    }
);

export const inputIconStyles = cva(
    'absolute flex items-center justify-center transition-all duration-250',
    {
        variants: {
            appearance: {
                default: 'text-gray-500',
                minimal: 'text-white/70',
                outlined: 'text-black/60',
                'outlined-white': 'text-white/70',
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
            error: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            // Position left
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
            // Position right
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
            // Error state colors
            {
                appearance: 'default',
                error: true,
                class: 'text-red-500',
            },
            {
                appearance: 'minimal',
                error: true,
                class: 'text-red-300',
            },
            {
                appearance: 'outlined',
                error: true,
                class: 'text-red-400',
            },
            {
                appearance: 'outlined-white',
                error: true,
                class: 'text-red-300',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            size: 'md',
            position: 'left',
            error: false,
        },
    }
);

export const inputLabelStyles = cva(
    'text-sm font-medium transition-colors duration-250',
    {
        variants: {
            appearance: {
                default: 'text-gray-700',
                minimal: 'text-white',
                outlined: 'text-white',
                'outlined-white': 'text-white',
            },
            required: {
                true: '',
                false: '',
            },
            disabled: {
                true: 'opacity-50',
                false: '',
            },
            error: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                appearance: 'default',
                error: true,
                class: 'text-red-700',
            },
            {
                appearance: 'minimal',
                error: true,
                class: 'text-red-300',
            },
            {
                appearance: 'outlined',
                error: true,
                class: 'text-red-300',
            },
            {
                appearance: 'outlined-white',
                error: true,
                class: 'text-red-300',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            required: false,
            disabled: false,
            error: false,
        },
    }
);

export const inputHelperTextStyles = cva(
    'text-xs transition-colors duration-250',
    {
        variants: {
            appearance: {
                default: '',
                minimal: '',
                outlined: '',
                'outlined-white': '',
            },
            error: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            // Helper text colors when NO error
            {
                error: false,
                appearance: 'default',
                class: 'text-gray-600',
            },
            {
                error: false,
                appearance: 'minimal',
                class: 'text-white/70',
            },
            {
                error: false,
                appearance: 'outlined',
                class: 'text-white/80',
            },
            {
                error: false,
                appearance: 'outlined-white',
                class: 'text-white/80',
            },
            // Error colors override everything
            {
                error: true,
                appearance: 'default',
                class: 'text-red-500',
            },
            {
                error: true,
                appearance: 'minimal',
                class: 'text-red-300',
            },
            {
                error: true,
                appearance: 'outlined',
                class: 'text-red-400',
            },
            {
                error: true,
                appearance: 'outlined-white',
                class: 'text-red-300',
            },
        ],
        defaultVariants: {
            appearance: 'default',
            error: false,
        },
    }
);