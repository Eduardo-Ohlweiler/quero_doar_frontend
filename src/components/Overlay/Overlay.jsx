import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import {
  overlayContainerStyles,
  contentContainerStyles
} from './Overlay.styles';

/**
 * Componente Overlay - Sobreposição modal para interface de usuário
 * 
 * Cria uma camada de sobreposição que bloqueia a interação com o conteúdo de fundo,
 * fornecendo um contexto isolado para modais, diálogos e outros elementos temporários.
 * 
 * @component
 * @example
 * // Overlay básico que fecha ao clicar fora
 * <Overlay isActive={showModal} onClose={() => setShowModal(false)}>
 *   <div>Conteúdo do modal</div>
 * </Overlay>
 * 
 * @example
 * // Overlay que não fecha ao clicar fora (para formulários críticos)
 * <Overlay 
 *   isActive={showForm} 
 *   closeOnBackgroundClick={false}
 *   onClose={() => setShowForm(false)}
 * >
 *   <form>Formulário importante</form>
 * </Overlay>
 * 
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo a ser renderizado sobre o overlay
 * @param {boolean} [props.isActive=false] - Define se o overlay está visível e ativo
 * @param {boolean} [props.animated=false] - Habilita animações de entrada e saída
 * @param {boolean} [props.closeOnBackgroundClick=true] - Permite fechamento ao clicar no fundo
 * @param {boolean} [props.preventBodyScroll=true] - Previne scroll do body quando ativo
 * @param {Function} [props.onBackgroundClick] - Callback executado ao clicar no fundo
 * @param {Function} [props.onClose] - Callback executado para fechar o overlay
 * @param {string} [props.className=''] - Classes CSS adicionais para o container
 * @param {string} [props.contentClassName=''] - Classes CSS adicionais para o conteúdo
 * @param {'low'|'medium'|'high'} [props.zLevel='high'] - Nível hierárquico do z-index
 * @param {Object} [props.style={}] - Estilos inline para personalização avançada
 * @returns {JSX.Element|null} O componente overlay ou null se inativo
 */
const Overlay = ({
  children,
  isActive = false,
  animated = false,
  closeOnBackgroundClick = true,
  preventBodyScroll = true,
  onBackgroundClick,
  onClose,
  className = '',
  contentClassName = '',
  zLevel = 'high',
  style = {}
}) => {
  /**
   * Gerencia o bloqueio de scroll do body quando o overlay está ativo
   * Restaura o estado original quando o overlay é fechado ou desmontado
   */
  useEffect(() => {
    if (!preventBodyScroll || !isActive) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calcula a largura da scrollbar para evitar "jump" visual
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    
    // Cleanup: restaura estado original
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isActive, preventBodyScroll]);

  /**
   * Handler otimizado para cliques no background
   * Implementa separação clara de responsabilidades:
   * 1. Detecção precisa do target (background vs conteúdo)
   * 2. Notificação via callback
   * 3. Ação de fechamento condicional
   */
  const handleBackgroundClick = useCallback((event) => {
    // Garante que o clique foi diretamente no overlay, não propagado do conteúdo
    if (event.target !== event.currentTarget) {
      return;
    }

    // Sempre notifica sobre o clique no background (para analytics, logs, etc.)
    onBackgroundClick?.(event);
    
    // Executa fechamento apenas se configurado para tal
    if (closeOnBackgroundClick) {
      onClose?.(event);
    }
  }, [onBackgroundClick, closeOnBackgroundClick, onClose]);

  /**
   * Otimização de renderização:
   * - Se inativo e sem animação: não renderiza (economia de DOM)
   * - Se inativo com animação: renderiza para permitir transição de saída
   */
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
  preventBodyScroll: PropTypes.bool,
  onBackgroundClick: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  zLevel: PropTypes.oneOf(['low', 'medium', 'high']),
  style: PropTypes.object
};

export default Overlay;
