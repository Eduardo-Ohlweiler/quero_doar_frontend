import { cva } from 'class-variance-authority';

export const containerStyles = cva(
    'relative overflow-hidden rounded-lg w-full max-w-4xl min-h-[480px] border-1 border-white/60 bg-white/10',
    {
        variants: {
            mode: {
                signIn: '',
                signUp: 'right-panel-active',
            },
        },
        defaultVariants: {
            mode: 'signIn',
        },
    }
);

export const formContainerStyles = cva(
    'absolute top-0 h-full transition-all duration-600 ease-in-out',
    {
        variants: {
            type: {
                signIn: 'left-0 w-1/2 z-[2]',
                signUp: 'left-0 w-1/2 opacity-0 z-[1]',
            },
            active: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                type: 'signIn',
                active: true,
                class: 'transform translate-x-full',
            },
            {
                type: 'signUp',
                active: true,
                class: 'transform translate-x-full opacity-100 z-[5] animate-[show_0.6s]',
            },
        ],
        defaultVariants: {
            type: 'signIn',
            active: false,
        },
    }
);

export const singleFormGroupStyles = cva(
    'absolute inset-0 flex items-center justify-center flex-col px-12 h-full transition-all duration-600 ease-in-out'
);

export const overlayContainerStyles = cva(
    'absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-[100]',
    {
        variants: {
            active: {
                true: 'transform -translate-x-full',
                false: '',
            },
        },
        defaultVariants: {
            active: false,
        },
    }
);

export const overlayStyles = cva(
    'bg-gradient-primary text-white relative -left-full h-full w-[200%] transform translate-x-0 transition-transform duration-600 ease-in-out',
    {
        variants: {
            active: {
                true: 'transform translate-x-1/2',
                false: '',
            },
        },
        defaultVariants: {
            active: false,
        },
    }
);

export const overlayPanelStyles = cva(
    'absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transform transition-transform duration-600 ease-in-out',
    {
        variants: {
            side: {
                left: '-translate-x-[20%]',
                right: 'right-0 translate-x-0',
            },
            active: {
                true: '',
                false: '',
            },
        },
        compoundVariants: [
            {
                side: 'left',
                active: true,
                class: 'transform translate-x-0',
            },
            {
                side: 'right',
                active: true,
                class: 'transform translate-x-[20%]',
            },
        ],
        defaultVariants: {
            side: 'left',
            active: false,
        },
    }
);

export const titleStyles = cva(
    'font-bold text-2xl text-white mb-0'
);

export const subtitleStyles = cva(
    'text-sm text-white/90 mb-5'
);

export const textStyles = cva(
    'text-sm font-light leading-5 tracking-wide text-white my-5 mx-0'
);

export const linkStyles = cva(
    'text-white/60 text-sm no-underline my-4 hover:text-white transition-colors duration-200 cursor-pointer',
);

export const FormVisibility = cva(
    'transition-opacity duration-500',
    {
        variants: {
            visible: {
                true: 'opacity-100 z-10',
                false: 'opacity-0 z-[-10] pointer-events-none',
            },
        },
        defaultVariants: {
            visible: false,
        },
    }
);
