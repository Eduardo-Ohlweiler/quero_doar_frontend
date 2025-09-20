import { cva } from 'class-variance-authority';

// Estilo principal do card
export const donationPreviewStyles = cva(
    // Estilos base - animação sutil no hover, cursor pointer, transições suaves
    'relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden cursor-pointer transition-all duration-250 ease-out hover:scale-[1.01] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:ring-offset-2',
    {
        variants: {
            layout: {
                vertical: 'flex flex-col w-full max-w-sm h-[380px]', // altura reduzida
                horizontal: 'flex flex-row w-full h-32 sm:h-36'
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Estilos da imagem
export const donationPreviewImageStyles = cva(
    'relative overflow-hidden bg-gray-100',
    {
        variants: {
            layout: {
                vertical: 'w-full h-48 shrink-0',
                horizontal: 'w-32 sm:w-36 h-full shrink-0'
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Container do conteúdo
export const donationPreviewContentStyles = cva(
    'flex flex-col p-3 flex-1 min-h-0',
    {
        variants: {
            layout: {
                vertical: 'gap-1',
                horizontal: 'gap-2 justify-between'
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Header com título
export const donationPreviewHeaderStyles = cva(
    'flex-shrink-0',
    {
        variants: {
            layout: {
                vertical: '',
                horizontal: ''
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Estilos do título
export const donationPreviewTitleStyles = cva(
    'font-semibold text-gray-900 leading-tight',
    {
        variants: {
            layout: {
                vertical: 'text-lg line-clamp-1',
                horizontal: 'text-base line-clamp-1'
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Estilos da descrição
export const donationPreviewDescriptionStyles = cva(
    'text-gray-600 leading-relaxed',
    {
        variants: {
            layout: {
                vertical: 'text-sm line-clamp-3 flex-1',
                horizontal: 'text-sm line-clamp-2 flex-1'
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Meta informações (localização e tempo)
// export const donationPreviewMetaStyles = cva(
//     'flex',
//     {
//         variants: {
//             layout: {
//                 vertical: 'flex-row justify-between',
//                 horizontal: 'flex-col items-start gap-1'
//             }
//         },
//         defaultVariants: {
//             layout: 'vertical'
//         }
//     }
// );

// Seção do usuário e botão de ação
export const donationPreviewUserSectionStyles = cva(
    // 'flex items-center gap-2 flex-shrink-0 mt-auto',
    'flex',
    {
        variants: {
            layout: {
                vertical: 'pt-2 border-t border-gray-100',
                horizontal: 'flex-row justify-between'
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Container da ação (botão)
export const donationPreviewActionStyles = cva(
    'flex-shrink-0',
    {
        variants: {
            layout: {
                vertical: '',
                horizontal: ''
            }
        },
        defaultVariants: {
            layout: 'vertical'
        }
    }
);

// Badge de tipo (Doação/Solicitação)
export const donationPreviewBadgeStyles = cva(
    'absolute top-3 left-3 z-20 px-2 py-1 rounded-full text-xs font-medium text-white shadow-sm',
    {
        variants: {
            variant: {
                donation: 'bg-green-500',
                request: 'bg-blue-500'
            }
        },
        defaultVariants: {
            variant: 'donation'
        }
    }
);

// Estilos auxiliares para truncamento de texto
export const textTruncateStyles = {
    // Para uso com Tailwind line-clamp
    '.line-clamp-1': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '1',
    },
    '.line-clamp-2': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '2',
    },
    '.line-clamp-3': {
        overflow: 'hidden',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': '3',
    }
};
