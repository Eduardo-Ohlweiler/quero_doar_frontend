import { cva } from 'class-variance-authority';

export const containerStyles = cva(
    'relative overflow-hidden rounded-lg w-full max-w-2xl min-h-[400px] border-1 border-white/60 bg-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out'
);

export const contentStyles = cva(
    'flex items-center justify-center flex-col px-12 py-16 h-full text-center transition-all duration-500 ease-in-out opacity-100',
    {
        variants: {
            mode: {
                loading: 'min-h-[400px] justify-center',
                activated: 'justify-center',
                expired: 'justify-center',
            },
        },
        defaultVariants: {
            mode: 'activated',
        },
    }
);

export const iconStyles = cva(
    'mb-6 transition-all duration-500 ease-in-out',
    {
        variants: {
            type: {
                success: 'text-green-400 text-6xl',
                error: 'text-yellow-400 text-6xl',
                loading: 'text-blue-400 text-8xl',
            },
        },
        defaultVariants: {
            type: 'success',
        },
    }
);

export const titleStyles = cva(
    'font-bold mb-4 transition-all duration-500 ease-in-out',
    {
        variants: {
            type: {
                success: 'text-green-400 text-2xl',
                error: 'text-yellow-400 text-2xl',
                loading: 'text-blue-400 text-3xl',
            },
        },
        defaultVariants: {
            type: 'success',
        },
    }
);

export const messageStyles = cva(
    'text-white/90 text-base leading-6 mb-8 max-w-md transition-all duration-500 ease-in-out',
    {
        variants: {
            mode: {
                loading: 'text-lg mb-0',
                default: 'text-base mb-8',
            },
        },
        defaultVariants: {
            mode: 'default',
        },
    }
);

export const buttonContainerStyles = cva(
    'flex flex-col sm:flex-row gap-4 items-center justify-center transition-all duration-500 ease-in-out'
);

export const fadeInAnimation = cva(
    'animate-fadeIn'
);

export const fadeOutAnimation = cva(
    'animate-fadeOut'
);