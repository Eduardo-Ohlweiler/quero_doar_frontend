import { cva } from 'class-variance-authority';

export const checkboxStyles = cva([
    'flex',
    'items-center',
    'gap-2',
    'cursor-pointer',
    'transition-all',
    'duration-200',
    'hover:bg-[var(--color-primary)]/5',
    'rounded-md',
    'p-1'
], {
    variants: {
        size: {
            small: 'gap-2 text-xs',
            medium: 'gap-2 text-sm',
            large: 'gap-3 text-base'
        },
        disabled: {
            true: 'cursor-not-allowed opacity-60',
            false: ''
        }
    },
    defaultVariants: {
        size: 'medium',
        disabled: false
    }
});

export const checkboxInputStyles = cva([
    'border-2',
    'border-gray-300',
    'rounded',
    'focus:ring-2',
    'focus:ring-[var(--color-primary)]/30',
    'focus:ring-offset-1',
    'focus:border-[var(--color-primary)]',
    'hover:border-[var(--color-primary)]/70',
    'transition-all',
    'duration-200',
    'appearance-none',
    'relative',
    'flex-shrink-0'
], {
    variants: {
        size: {
            small: 'w-3 h-3',
            medium: 'w-4 h-4',
            large: 'w-5 h-5'
        },
        checked: {
            true: 'bg-[var(--color-primary)] border-[var(--color-primary)] after:content-["✓"] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-white after:font-bold after:text-xs',
            false: 'bg-white'
        },
        disabled: {
            true: 'cursor-not-allowed bg-gray-100 border-gray-200',
            false: ''
        }
    },
    defaultVariants: {
        size: 'medium',
        checked: false,
        disabled: false
    }
});

export const checkboxLabelStyles = cva([
    'flex-1',
    'transition-colors',
    'duration-200',
    'font-normal'
], {
    variants: {
        size: {
            small: 'text-xs',
            medium: 'text-sm',
            large: 'text-base'
        },
        disabled: {
            true: 'text-gray-400',
            false: 'text-gray-700'
        }
    },
    defaultVariants: {
        size: 'medium',
        disabled: false
    }
});

export const checkboxCountStyles = cva([
    'ml-1',
    'font-normal',
    'text-gray-500'
], {
    variants: {
        size: {
            small: 'text-xs',
            medium: 'text-xs',
            large: 'text-sm'
        }
    },
    defaultVariants: {
        size: 'medium'
    }
});