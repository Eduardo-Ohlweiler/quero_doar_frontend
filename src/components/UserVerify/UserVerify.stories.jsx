import React, { useState, useEffect } from 'react';
import UserVerify from './UserVerify';

export default {
  title: 'Components/UserVerify',
  component: UserVerify,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f5f7' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['activated', 'expired', 'loading'],
      description: 'Modo de exibição do componente',
    },
    onNavigateToLogin: { 
      action: 'navigate to login',
      description: 'Função chamada quando o usuário clica para ir ao login'
    },
    onResendVerificationEmail: { 
      action: 'resend verification email',
      description: 'Função chamada quando o usuário solicita reenvio do email'
    },
    isResending: {
      control: { type: 'boolean' },
      description: 'Estado de carregamento do reenvio de email',
    },
  },
};

/**
 * Estado de carregamento durante a validação do token.
 * Note o ícone maior e centralização aprimorada.
 */
export const Loading = {
  args: {
    mode: 'loading',
  },
};

/**
 * Estado padrão mostrando conta ativada com sucesso
 */
export const AccountActivated = {
  args: {
    mode: 'activated',
    isResending: false,
  },
};

/**
 * Estado de token expirado ou inválido
 */
export const TokenExpired = {
  args: {
    mode: 'expired',
    isResending: false,
  },
};

/**
 * Estado de carregamento durante o reenvio do email
 */
export const ResendingEmail = {
  args: {
    mode: 'expired',
    isResending: true,
  },
};

/**
 * Demonstração interativa das transições entre estados.
 * Clique nos botões para ver as animações de fade in/out.
 */
export const TransitionDemo = {
  render: (args) => {
    const [currentMode, setCurrentMode] = useState('loading');
    
    const handleModeChange = (newMode) => {
      setCurrentMode(newMode);
    };

    return (
      <div>
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 1000,
          background: 'rgba(0,0,0,0.8)',
          padding: '10px 20px',
          borderRadius: '8px',
          display: 'flex',
          gap: '10px'
        }}>
          <button 
            onClick={() => handleModeChange('loading')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'loading' ? '#3b82f6' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Loading
          </button>
          <button 
            onClick={() => handleModeChange('activated')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'activated' ? '#10b981' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Activated
          </button>
          <button 
            onClick={() => handleModeChange('expired')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'expired' ? '#f59e0b' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Expired
          </button>
        </div>
        <UserVerify 
          {...args} 
          mode={currentMode}
        />
      </div>
    );
  },
  args: {
    isResending: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os botões no topo para alternar entre os diferentes estados e observe as animações suaves de transição.'
      }
    }
  }
};