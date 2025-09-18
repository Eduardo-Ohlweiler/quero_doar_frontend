import { cva } from 'class-variance-authority';

export const containerStyles = cva(
    'relative overflow-hidden rounded-lg w-full max-w-2xl min-h-[400px] border-1 border-white/60 bg-white/10 backdrop-blur-sm transition-all duration-500 ease-in-out'
);

export const contentStyles = cva(
    'flex items-center justify-center flex-col h-full text-center transition-all duration-500 ease-in-out opacity-100',
    {
        variants: {
            mode: {
                validating: 'min-h-[400px] justify-center px-12 py-16',
                invalid: 'justify-center px-12 py-16',
                reset: 'justify-center px-6 py-8 ',
                success: 'justify-center px-12 py-16',
            },
        },
        defaultVariants: {
            mode: 'validating',
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
                info: 'text-blue-400 text-6xl',
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
                info: 'text-blue-400 text-2xl',
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

export const formStyles = cva(
    'w-full max-w-md space-y-6 transition-all duration-500 ease-in-out'
);