// src/components/TextArea/TextArea.styles.jsx
import { cva } from 'class-variance-authority';

export const textAreaContainerStyles = cva(
  'relative w-full backdrop-blur-[2px] border-[0.5px] border-solid rounded-lg transition-all duration-250 ease-in-out',
  {
    variants: {
      appearance: {
        // Corrigido para ter borda cinza
        default: 'bg-white/80 border-gray-300', 
        minimal: 'bg-transparent border-white/20',
        outlined: 'bg-white/10 border-white/60',
        'outlined-white': 'bg-white/10 border-white/60',
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
        // Corrigido para focar com 'blue' no default
        appearance: 'default', 
        class: 'border-blue-500 ring-1 ring-blue-500',
      },
      {
        focused: true,
        error: false,
        appearance: ['minimal', 'outlined', 'outlined-white'],
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
      focused: false,
      error: false,
      disabled: false,
    },
  }
);

export const textAreaFieldStyles = cva(
  'flex-1 bg-transparent border-none outline-none placeholder:transition-colors placeholder:duration-250 w-full',
  {
    variants: {
      appearance: {
        // Corrigido para texto cinza
        default: 'text-gray-800 placeholder:text-gray-500', 
        minimal: 'text-white placeholder:text-white/70',
        outlined: 'text-black placeholder:text-black/60',
        'outlined-white': 'text-white placeholder:text-white/60',
      },
      size: {
        sm: 'p-2 text-sm',
        md: 'p-3 text-base',
        lg: 'p-4 text-lg',
      },
    },
    defaultVariants: {
      appearance: 'default',
      size: 'md',
    },
  }
);

export const textAreaLabelStyles = cva(
  'text-sm font-medium transition-colors duration-250 mb-1',
  {
    variants: {
      appearance: {
        // Corrigido para texto cinza
        default: 'text-gray-700', 
        minimal: 'text-white',
        outlined: 'text-white',
        'outlined-white': 'text-white',
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
        appearance: ['minimal', 'outlined', 'outlined-white'],
        error: true,
        class: 'text-red-300',
      },
    ],
    defaultVariants: {
      appearance: 'default',
      disabled: false,
      error: false,
    },
  }
);

export const textAreaHelperTextStyles = cva(
  'text-xs transition-colors duration-250 mt-1',
  {
    variants: {
      appearance: {
        default: 'text-gray-600',
        minimal: 'text-white/70',
        outlined: 'text-white/80',
        'outlined-white': 'text-white/80',
      },
      error: {
        true: 'text-red-500', // Cor de erro padrão
        false: '',
      },
    },
    compoundVariants: [
      {
        error: true,
        appearance: ['minimal', 'outlined', 'outlined-white'],
        class: 'text-red-300'
      }
    ],
    defaultVariants: {
      appearance: 'default',
      error: false,
    },
  }
);