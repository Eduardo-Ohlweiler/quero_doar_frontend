import { cva } from 'class-variance-authority';

// Estilos do container principal do overlay
export const overlayContainerStyles = cva(
  [
    // Estilos base - sempre aplicados
    'fixed inset-0 w-screen h-screen',
    'flex items-center justify-center',
    'bg-black/50 backdrop-blur-sm',
    'transition-all duration-300 ease-in-out',
  ],
  {
    variants: {
      // Controla visibilidade e interatividade
      isActive: {
        true: 'pointer-events-auto opacity-100',
        false: 'pointer-events-none opacity-0 invisible'
      },
      // Controla animações
      animated: {
        true: 'animate-in fade-in duration-300',
        false: ''
      },
      // Diferentes níveis de z-index
      zLevel: {
        low: 'z-40',
        medium: 'z-50',
        high: 'z-[9999]'
      }
    },
    defaultVariants: {
      isActive: false,
      animated: false,
      zLevel: 'high'
    }
  }
);

// Estilos do container de conteúdo
export const contentContainerStyles = cva(
  [
    // Estilos base
    'relative max-w-[90vw] max-h-[90vh]',
    'overflow-auto pointer-events-auto',
    'bg-transparent'
  ],
  {
    variants: {
      // Animações específicas do conteúdo
      animated: {
        true: 'animate-in zoom-in-95 duration-300 delay-75',
        false: ''
      }
    },
    defaultVariants: {
      animated: false
    }
  }
);
