import { cva } from 'class-variance-authority';

export const headerStyles = cva(
  'bg-white/60 h-14 border-b border-white/80 shadow-md w-full flex items-center justify-between backdrop-blur-[4px]',
  {
    variants: {
      variant: {
        default: '',
        withSearch: 'py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
