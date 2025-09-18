import React, { useState } from 'react';
import PasswordRecovery from './PasswordRecovery';

export default {
  title: 'Components/PasswordRecovery',
  component: PasswordRecovery,
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
      options: ['validating', 'invalid', 'reset', 'success'],
      description: 'Modo de exibição do componente',
    },
    onGotoLogin: { 
      action: 'goto login',
      description: 'Função chamada quando o usuário clica para ir ao login'
    },
    onResetPassword: { 
      action: 'reset password',
      description: 'Função chamada quando o usuário submete a nova senha'
    },
    isResetting: {
      control: { type: 'boolean' },
      description: 'Estado de carregamento do reset de senha',
    },
  },
};

/**
 * Estado de carregamento durante a validação do token.
 * Note o ícone maior e centralização aprimorada.
 */
export const Validating = {
  args: {
    mode: 'validating',
  },
};

/**
 * Estado de token inválido ou expirado
 */
export const InvalidToken = {
  args: {
    mode: 'invalid',
    isResetting: false,
  },
};

/**
 * Estado de redefinição de senha com formulário
 */
export const ResetPassword = {
  args: {
    mode: 'reset',
    isResetting: false,
  },
};

/**
 * Estado de carregamento durante o reset da senha
 */
export const ResettingPassword = {
  args: {
    mode: 'reset',
    isResetting: true,
  },
};

/**
 * Estado de sucesso após redefinir a senha
 */
export const PasswordResetSuccess = {
  args: {
    mode: 'success',
    isResetting: false,
  },
};

/**
 * Demonstração interativa das transições entre estados.
 * Clique nos botões para ver as animações de fade in/out.
 */
export const TransitionDemo = {
  render: (args) => {
    const [currentMode, setCurrentMode] = useState('validating');
    
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
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <button 
            onClick={() => handleModeChange('validating')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'validating' ? '#3b82f6' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Validating
          </button>
          <button 
            onClick={() => handleModeChange('invalid')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'invalid' ? '#f59e0b' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Invalid
          </button>
          <button 
            onClick={() => handleModeChange('reset')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'reset' ? '#3b82f6' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Reset
          </button>
          <button 
            onClick={() => handleModeChange('success')}
            style={{
              padding: '8px 16px',
              background: currentMode === 'success' ? '#10b981' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Success
          </button>
        </div>
        <PasswordRecovery 
          {...args} 
          mode={currentMode}
        />
      </div>
    );
  },
  args: {
    isResetting: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use os botões no topo para alternar entre os diferentes estados e observe as animações suaves de transição.'
      }
    }
  }
};