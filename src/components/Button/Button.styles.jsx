import { cva } from 'class-variance-authority';

export const buttonStyles = cva(

    // Estilo padrão, aplicado a todas variantes de estilos
    'inline-flex items-center justify-center font-semibold rounded-lg duration-250 ease-in-out box-border focus:outline-none shadow-[inset_0_0_0_0px_white] focus-visible:shadow-[inset_0_0_0_3px_white] border-[0.5px] border-white/40 border-solid backdrop-blur-[2px] cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100',
    {

        // Variantes de estilos
        variants: {
            appearance: {
                primary: 'text-white bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] disabled:bg-[var(--color-primary)]/80 disabled:text-white/50',
                secondary: 'text-[var(--color-primary)] bg-white/80 hover:bg-white disabled:bg-white/80 disabled:text-[var(--color-primary)]/50',
                ghost: 'text-white hover:bg-white/10 disabled:bg-transparent disabled:text-white/50',
            },
            size: {
                small: 'px-3 py-1.5 text-sm',
                medium: 'px-4 py-2 text-base',
                large: 'px-5 py-3 text-lg',
            },
        },
        defaultVariants: {
            appearance: 'primary',
            size: 'medium',
        },
    }
);