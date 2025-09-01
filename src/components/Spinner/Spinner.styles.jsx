import { cva } from "class-variance-authority";

export const spinnerStyles = cva(
    // Estilo base: círculo com animação de rotação
    'inline-block rounded-full border-solid animate-spin',
    {
        variants: {
            size: {
                small: 'w-4 h-4',
                medium: 'w-8 h-8', 
                large: 'w-12 h-12',
                xlarge: 'w-16 h-16',
            },
            strokeWidth: {
                thin: 'border-2',
                medium: 'border-4',
                thick: 'border-8',
            },
            color: {
                primary: 'border-gray-200 border-t-[var(--color-primary)]',
                white: 'border-gray-300 border-t-white',
                blue: 'border-gray-200 border-t-blue-500',
                green: 'border-gray-200 border-t-green-500',
                red: 'border-gray-200 border-t-red-500',
            },
        },
        defaultVariants: {
            size: 'medium',
            strokeWidth: 'medium',
            color: 'primary',
        },
    }
);