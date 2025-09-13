import React, { useState } from 'react';
import Overlay from '../Overlay/Overlay';

/**
 * Exemplo prático demonstrando o uso do componente Overlay
 * com diferentes configurações de fechamento
 */
const OverlayExample = () => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Exemplo do Componente Overlay
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seção 1: Modal que fecha ao clicar fora */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            ✅ Fecha ao clicar fora
          </h2>
          <p className="text-gray-600 mb-4">
            Este modal fecha automaticamente quando você clica fora do conteúdo.
            Ideal para: informações, avisos, seletores.
          </p>
          <button 
            onClick={() => openModal('closeable')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Abrir Modal (Fecha Fora)
          </button>
        </div>

        {/* Seção 2: Modal que NÃO fecha ao clicar fora */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            🔒 NÃO fecha ao clicar fora
          </h2>
          <p className="text-gray-600 mb-4">
            Este modal só fecha com ação explícita do usuário.
            Ideal para: formulários, confirmações críticas, processos importantes.
          </p>
          <button 
            onClick={() => openModal('locked')}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Abrir Modal (Bloqueado)
          </button>
        </div>
      </div>

      {/* Demonstração de elementos de fundo */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Elementos de Fundo</h3>
        <p className="text-gray-600 mb-4">
          Quando o overlay estiver ativo, estes elementos não poderão ser clicados:
        </p>
        <div className="space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Botão 1
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
            Botão 2
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors">
            Botão 3
          </button>
        </div>
      </div>

      {/* Modal que fecha ao clicar fora */}
      <Overlay
        isActive={modalType === 'closeable'}
        animated={true}
        closeOnBackgroundClick={true}
        onClose={closeModal}
        onBackgroundClick={() => console.log('Clique detectado no fundo - Modal fechará automaticamente')}
      >
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Modal Flexível
            </h2>
            <p className="text-gray-600 mb-6">
              Este modal fecha automaticamente quando você clica fora dele. 
              Isso proporciona uma experiência mais fluida para o usuário.
            </p>
            <div className="space-y-3">
              <button 
                onClick={closeModal}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Fechar com Botão
              </button>
              <p className="text-sm text-gray-500">
                Ou clique fora desta área para fechar
              </p>
            </div>
          </div>
        </div>
      </Overlay>

      {/* Modal que NÃO fecha ao clicar fora */}
      <Overlay
        isActive={modalType === 'locked'}
        animated={true}
        closeOnBackgroundClick={false}
        onClose={closeModal}
        onBackgroundClick={() => console.log('Clique detectado no fundo - Modal permanece aberto')}
      >
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Modal Crítico
            </h2>
            <p className="text-gray-600 mb-6">
              Este modal requer ação explícita do usuário. Clique fora e veja que 
              ele permanece aberto, evitando fechamentos acidentais.
            </p>
            <div className="space-y-3">
              <button 
                onClick={closeModal}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmar e Fechar
              </button>
              <p className="text-sm text-gray-500">
                Clique fora e veja que este modal não fecha
              </p>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export default OverlayExample;
