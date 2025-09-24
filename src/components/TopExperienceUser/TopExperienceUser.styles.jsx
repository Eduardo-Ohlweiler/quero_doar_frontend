import { cva } from 'class-variance-authority';

// Container principal
export const topExperienceUserStyles = cva([
    'relative',
    'cursor-pointer',
    'transition-all',
    'duration-250',
    'ease-out',
    'hover:scale-101',
    // 'focus:outline-none',
    // 'focus:ring-1',
    // 'focus:ring-[var(--color-primary)]/50',
    // 'focus:ring-offset-2',
    // 'w-full',
    // 'max-w-xs',
    // 'mx-auto',
], {
    variants: {
        variant: {
            first: [],
            second: [],
            third: [],
            default: [],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Badge de ranking
export const topExperienceUserRankBadgeStyles = cva([
    'absolute',
    'top-0',
    'left-1/6',
    'transform',
    '-translate-x-1/2',
    '-translate-y-1/2',
    'z-5',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    // 'gap-0',
    // 'px-4',
    // 'py-2',
    'h-13',
    'w-13',
    'rounded-full',
    'text-gray-900',
    'font-bold',
    'shadow-sm',
    // 'border-2',
    // 'border-white/80',
], {
    variants: {
        variant: {
            first: [
                'bg-gradient-to-r',
                'from-yellow-400/90',
                'to-yellow-600/90',
                'border',
                'border-yellow-600/60',
            ],
            second: [
                'bg-gradient-to-r',
                'from-gray-400/90',
                'to-gray-600/90',
                'border',
                'border-gray-600/60',
                'shadow-gray-200',
            ],
            third: [
                'bg-gradient-to-r',
                'from-amber-600',
                'to-amber-800',
                'shadow-amber-200',
            ],
            default: [
                'bg-gradient-to-r',
                'from-blue-500',
                'to-blue-700',
                'shadow-blue-200',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Card principal
export const topExperienceUserCardStyles = cva([
    'relative',
    'p-6',
    'pt-2',
    'rounded-3xl',
    'backdrop-blur-sm',
    'border',
    'border-white/60',
    'overflow-hidden',
    'h-60',
    'w-60',
], {
    variants: {
        variant: {
            first: [
                'bg-yellow-200/20',
                'border-yellow-600/60',

            ],
            second: [
                'bg-gray-200/20', 
                'border-gray-400/60',
            ],
            third: [
                'bg-amber-600/20',
                'border-amber-400/60',
            ],
            default: [
                'bg-white/20',
                'border-gray-400/60',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Conteúdo do card
export const topExperienceUserContentStyles = cva([
    // 'relative',
    // 'z-10',
    'text-center',
], {
    variants: {
        variant: {
            first: [],
            second: [],
            third: [],
            default: [],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Nome do usuário
export const topExperienceUserNameStyles = cva([
    'font-bold',
    'text-gray-800',
    'mb-2',
    'line-clamp-1',
], {
    variants: {
        variant: {
            first: [
                'text-xl',
                'md:text-2xl',
            ],
            second: [
                'text-xl',
                'md:text-2xl',
            ],
            third: [
                'text-xl',
                'md:text-2xl',
            ],
            default: [
                'text-lg',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Localização
export const topExperienceUserLocationStyles = cva([
    'flex',
    'items-center',
    'justify-center',
    'gap-1',
    'text-gray-600',
    'mb-4',
    'text-sm',
    'line-clamp-1',
], {
    variants: {
        variant: {
            first: [
                'text-sm',
                'md:text-base',
            ],
            second: [
                'text-sm',
                'md:text-base',
            ],
            third: [
                'text-sm',
                'md:text-base',
            ],
            default: [
                'text-xs',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Container das estatísticas
export const topExperienceUserStatsStyles = cva([
    'flex',
    'justify-center',
    'gap-6',
    'mt-4',
], {
    variants: {
        variant: {
            first: [
                'gap-8',
            ],
            second: [
                'gap-8',
            ],
            third: [
                'gap-8',
            ],
            default: [
                'gap-4',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Valor das estatísticas
export const topExperienceUserStatValueStyles = cva([
    'font-bold',
    'text-[var(--color-primary)]',
    'leading-none',
], {
    variants: {
        variant: {
            first: [
                'text-2xl',
                // 'md:text-3xl',
            ],
            second: [
                'text-2xl',
                // 'md:text-3xl',
            ],
            third: [
                'text-2xl',
                // 'md:text-3xl',
            ],
            default: [
                'text-xl',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Label das estatísticas
export const topExperienceUserStatLabelStyles = cva([
    'text-gray-600',
    // 'text-xs',
    'font-medium',
    'uppercase',
    'tracking-wider',
    // 'mt-1',
], {
    variants: {
        variant: {
            first: [
                'text-xs',
                // 'md:text-sm',
            ],
            second: [
                'text-xs',
                // 'md:text-sm',
            ],
            third: [
                'text-xs',
                // 'md:text-sm',
            ],
            default: [
                'text-xs',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
