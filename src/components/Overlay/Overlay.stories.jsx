import React, { useState } from 'react';
import Overlay from './Overlay';

export default {
  title: 'Components/Overlay',
  component: Overlay,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isActive: {
      control: 'boolean',
      description: 'Controla se o overlay está ativo/visível'
    },
    animated: {
      control: 'boolean',
      description: 'Se deve aplicar animações de entrada/saída'
    },
    closeOnBackgroundClick: {
      control: 'boolean',
      description: 'Se deve fechar automaticamente ao clicar fora do conteúdo'
    },
    zLevel: {
      control: { type: 'select' },
      options: ['low', 'medium', 'high'],
      description: 'Nível do z-index do overlay'
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais para o container'
    },
    contentClassName: {
      control: 'text',
      description: 'Classes CSS adicionais para o conteúdo'
    },
    onBackgroundClick: {
      action: 'background-clicked',
      description: 'Callback chamado ao clicar no fundo'
    },
    onClose: {
      action: 'close-requested',
      description: 'Callback chamado quando o overlay deve ser fechado'
    }
  }
};

// Template base
const Template = (args) => {
  const [isActive, setIsActive] = useState(args.isActive || false);

  const toggleOverlay = () => {
    setIsActive(!isActive);
  };

  const handleClose = () => {
    setIsActive(false);
    if (args.onClose) {
      args.onClose();
    }
  };

  const handleBackgroundClick = () => {
    if (args.onBackgroundClick) {
      args.onBackgroundClick();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Página de Exemplo</h1>
        <p className="text-gray-600 mb-6">
          Este é o conteúdo da página que ficará atrás do overlay. 
          Quando o overlay estiver ativo, estes elementos não poderão ser clicados.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={toggleOverlay}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isActive ? 'Fechar Overlay' : 'Abrir Overlay'}
          </button>
          
          <div className="flex gap-3">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
              Botão 1
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
              Botão 2
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
              Botão 3
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Conteúdo da Página</h2>
            <p className="text-gray-600">
              Este conteúdo demonstra como o overlay bloqueia a interação com elementos de fundo.
            </p>
          </div>
        </div>
      </div>
      
      <Overlay
        {...args}
        isActive={isActive}
        onClose={handleClose}
        onBackgroundClick={handleBackgroundClick}
      >
        {args.children}
      </Overlay>
    </div>
  );
};

// Story padrão
export const Default = Template.bind({});
Default.args = {
  children: (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Modal de Exemplo</h2>
      <p className="text-gray-600 mb-6">
        Este é o conteúdo que aparece sobre o overlay. 
        Clique fora desta área para fechar o modal.
      </p>
      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Ação Principal
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  ),
  isActive: false,
  animated: false,
  closeOnBackgroundClick: true,
  zLevel: 'high'
};

// Overlay com animação
export const WithAnimation = Template.bind({});
WithAnimation.args = {
  ...Default.args,
  animated: true
};

// Overlay que NÃO fecha ao clicar fora
export const NoCloseOnBackgroundClick = Template.bind({});
NoCloseOnBackgroundClick.args = {
  ...Default.args,
  closeOnBackgroundClick: false,
  animated: true,
  children: (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">⚠️ Modal Bloqueado</h2>
      <p className="text-gray-600 mb-6">
        Este modal NÃO fecha ao clicar fora. Você deve usar o botão "Fechar Overlay" 
        no topo da página ou o botão abaixo.
      </p>
      <div className="flex gap-3">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
          Ação Obrigatória
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  )
};

// Overlay com fundo customizado
export const CustomBackground = Template.bind({});
CustomBackground.args = {
  ...Default.args,
  className: 'bg-red-500/30 backdrop-blur-md',
  animated: true,
  closeOnBackgroundClick: true
};

// Overlay com z-index baixo
export const LowZIndex = Template.bind({});
LowZIndex.args = {
  ...Default.args,
  zLevel: 'low',
  animated: true,
  closeOnBackgroundClick: true
};

// Overlay com conteúdo complexo
export const ComplexContent = Template.bind({});
ComplexContent.args = {
  ...Default.args,
  animated: true,
  closeOnBackgroundClick: true,
  children: (
    <div className="bg-white rounded-xl shadow-2xl max-w-lg mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
        <h2 className="text-2xl font-bold text-white">⚠️ Confirmação</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-6">
          Tem certeza que deseja realizar esta ação? Esta operação não pode ser desfeita.
        </p>
        <div className="flex gap-3 justify-end">
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors">
            Cancelar
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
};

// Overlay com formulário
export const FormModal = Template.bind({});
FormModal.args = {
  ...Default.args,
  animated: true,
  closeOnBackgroundClick: false, // Formulários geralmente não devem fechar acidentalmente
  children: (
    <div className="bg-white rounded-xl shadow-2xl max-w-md mx-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Novo Usuário</h2>
        <p className="text-sm text-gray-500 mb-4">
          Este formulário não fecha ao clicar fora para evitar perda de dados.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite seu email"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button 
              type="button"
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

// Overlay sempre ativo (para testes visuais)
export const AlwaysActive = Template.bind({});
AlwaysActive.args = {
  ...Default.args,
  isActive: true,
  animated: true,
  closeOnBackgroundClick: true
};
