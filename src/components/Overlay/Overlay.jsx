import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  overlayContainerStyles,
  contentContainerStyles
} from './Overlay.styles';

/**
 * Componente Overlay
 * 
 * Cria uma sobreposição escura sobre a tela, útil para modais, popups, etc.
 * 
 * @param {Object} props - As propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo a ser exibido sobre o overlay
 * @param {boolean} props.isActive - Controla se o overlay está ativo/visível
 * @param {boolean} props.animated - Se deve aplicar animações de entrada/saída
 * @param {boolean} props.closeOnBackgroundClick - Se deve fechar ao clicar fora do conteúdo
 * @param {Function} props.onBackgroundClick - Callback chamado ao clicar no fundo do overlay
 * @param {Function} props.onClose - Callback chamado quando o overlay deve ser fechado
 * @param {string} props.className - Classes CSS adicionais para o container
 * @param {string} props.contentClassName - Classes CSS adicionais para o conteúdo
 * @param {'low'|'medium'|'high'} props.zLevel - Nível do z-index
 * @param {Object} props.style - Estilos inline para o container
 */
const Overlay = ({
  children,
  isActive = false,
  animated = false,
  closeOnBackgroundClick = true,
  onBackgroundClick = null,
  onClose = null,
  className = '',
  contentClassName = '',
  zLevel = 'high',
  style = {}
}) => {
  // Handler para clique no background
  const handleBackgroundClick = (event) => {
    // Só executa se clicar diretamente no background, não no conteúdo
    if (event.target === event.currentTarget) {
      // Sempre chama onBackgroundClick se fornecido
      if (onBackgroundClick) {
        onBackgroundClick(event);
      }
      
      // Só fecha automaticamente se closeOnBackgroundClick for true
      if (closeOnBackgroundClick && onClose) {
        onClose(event);
      }
    }
  };

  // Se não está ativo e não há animação, não renderiza nada para otimização
  if (!isActive && !animated) {
    return null;
  }

  return (
    <div
      className={clsx(
        overlayContainerStyles({ isActive, animated, zLevel }),
        className
      )}
      style={style}
      onClick={handleBackgroundClick}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isActive}
    >
      <div
        className={clsx(
          contentContainerStyles({ animated }),
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};

Overlay.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  animated: PropTypes.bool,
  closeOnBackgroundClick: PropTypes.bool,
  onBackgroundClick: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  zLevel: PropTypes.oneOf(['low', 'medium', 'high']),
  style: PropTypes.object
};

export default Overlay;
