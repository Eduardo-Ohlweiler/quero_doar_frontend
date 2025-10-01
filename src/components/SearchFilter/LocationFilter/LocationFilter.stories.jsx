/**
 * LocationFilter Stories
 * 
 * Conjunto abrangente de casos de uso para o componente LocationFilter.
 * Demonstra funcionalidades de filtragem por localização com interface
 * de combobox e sistema de tags otimizadas.
 * 
 * @author LocationFilter Team
 * @version 2.0.0
 */

import React, { useState } from 'react';
import LocationFilter from './LocationFilter';

// ========================================
// CONFIGURAÇÃO DO STORYBOOK
// ========================================

export default {
  title: 'Components/SearchFilter/LocationFilter',
  component: LocationFilter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## LocationFilter

Componente avançado de filtro de localização com interface de combobox.
Oferece seleção múltipla de estados e cidades com busca integrada,
sistema de tags otimizadas e funcionalidade de seleção em lote.

### Características Principais:
- 🗺️ **Interface de Combobox**: Seleção intuitiva com dropdown
- 🔍 **Busca Integrada**: Filtro rápido por estados e cidades
- 🏷️ **Tags Otimizadas**: Visualização clara das seleções
- ⚡ **Seleção em Lote**: Selecionar/desselecionar todos
- 🔗 **Dependência Inteligente**: Cidades filtradas por estados selecionados
        `
      }
    }
  },
  argTypes: {
    availableStates: {
      description: 'Lista de estados disponíveis com suas respectivas cidades',
      control: { type: 'object' }
    },
    selectedStates: {
      description: 'Array de IDs dos estados selecionados',
      control: { type: 'object' }
    },
    selectedCities: {
      description: 'Array de IDs das cidades selecionadas',
      control: { type: 'object' }
    },
    onStatesChange: { 
      description: 'Callback executado quando estados são alterados',
      action: 'onStatesChange' 
    },
    onCitiesChange: { 
      description: 'Callback executado quando cidades são alteradas',
      action: 'onCitiesChange' 
    },
    onFetchCities: { 
      description: 'Callback para buscar cidades dos estados selecionados',
      action: 'onFetchCities' 
    }
  }
};

// ========================================
// DADOS MOCK PARA DEMONSTRAÇÃO
// ========================================

/**
 * Estados mock com suas respectivas cidades
 * Dados realistas para demonstrar funcionalidades
 */
const mockStates = [
  {
    stateId: 1,
    name: 'Rio de Janeiro',
    acronym: 'RJ',
    cities: [
      { cityId: 1, name: 'Rio de Janeiro' },
      { cityId: 2, name: 'Niterói' },
      { cityId: 3, name: 'Petrópolis' },
      { cityId: 4, name: 'Volta Redonda' },
      { cityId: 5, name: 'Nova Iguaçu' },
      { cityId: 6, name: 'Belford Roxo' },
      { cityId: 7, name: 'São Gonçalo' },
      { cityId: 8, name: 'Duque de Caxias' },
      { cityId: 9, name: 'Nova Friburgo' },
      { cityId: 10, name: 'Macaé' }
    ]
  },
  {
    stateId: 2,
    name: 'São Paulo',
    acronym: 'SP',
    cities: [
      { cityId: 11, name: 'São Paulo' },
      { cityId: 12, name: 'Campinas' },
      { cityId: 13, name: 'Santos' },
      { cityId: 14, name: 'São José dos Campos' },
      { cityId: 15, name: 'Ribeirão Preto' },
      { cityId: 16, name: 'Sorocaba' },
      { cityId: 17, name: 'São Bernardo do Campo' },
      { cityId: 18, name: 'Santo André' },
      { cityId: 19, name: 'Osasco' },
      { cityId: 20, name: 'Guarulhos' }
    ]
  },
  {
    stateId: 3,
    name: 'Minas Gerais',
    acronym: 'MG',
    cities: [
      { cityId: 21, name: 'Belo Horizonte' },
      { cityId: 22, name: 'Uberlândia' },
      { cityId: 23, name: 'Contagem' },
      { cityId: 24, name: 'Juiz de Fora' },
      { cityId: 25, name: 'Montes Claros' }
    ]
  }
];

// ========================================
// TEMPLATE INTERATIVO
// ========================================

/**
 * Template base para stories interativas
 * Permite testar funcionalidades em tempo real
 */
const Template = (args) => {
  const [selectedStates, setSelectedStates] = useState(args.selectedStates || []);
  const [selectedCities, setSelectedCities] = useState(args.selectedCities || []);

  /**
   * Simula busca assíncrona de cidades
   * @param {number} stateId - ID do estado para buscar cidades
   */
  const handleFetchCities = async (stateId) => {
    // Simular delay de API real
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Buscando cidades para estado:', stateId);
    return mockStates.find(state => state.stateId === stateId)?.cities || [];
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      padding: '24px', 
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <LocationFilter
        {...args}
        availableStates={args.availableStates || mockStates}
        selectedStates={selectedStates}
        selectedCities={selectedCities}
        onStatesChange={setSelectedStates}
        onCitiesChange={setSelectedCities}
        onFetchCities={handleFetchCities}
      />
    </div>
  );
};

// ========================================
// STORIES PRINCIPAIS
// ========================================

/**
 * Estado inicial padrão - interface limpa
 * Demonstra a interface inicial sem seleções
 */
export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'Estado inicial do componente sem nenhuma seleção prévia. Interface limpa e pronta para uso.'
    }
  }
};

/**
 * Com estados pré-selecionados
 * Mostra como o componente renderiza com seleções iniciais
 */
export const ComEstadosSelecionados = Template.bind({});
ComEstadosSelecionados.args = {
  selectedStates: [1]
};
ComEstadosSelecionados.parameters = {
  docs: {
    description: {
      story: 'Componente com um estado pré-selecionado, mostrando a seção de cidades ativada.'
    }
  }
};

/**
 * Com estados e cidades selecionados
 * Demonstra o estado completo com ambas as seleções
 */
export const ComCidadesSelecionadas = Template.bind({});
ComCidadesSelecionadas.args = {
  selectedStates: [1, 2],
  selectedCities: [1, 2, 11]
};
ComCidadesSelecionadas.parameters = {
  docs: {
    description: {
      story: 'Demonstra o componente com estados e cidades já selecionados, incluindo o sistema de tags.'
    }
  }
};

/**
 * Múltiplas seleções - caso de uso intenso
 * Simula uso real com muitas seleções
 */
export const SelecaoIntensiva = Template.bind({});
SelecaoIntensiva.args = {
  selectedStates: [1, 2],
  selectedCities: [1, 2, 3, 11, 12, 13, 14]
};
SelecaoIntensiva.parameters = {
  docs: {
    description: {
      story: 'Caso de uso intensivo com múltiplas seleções de estados e cidades, testando o sistema de tags otimizadas.'
    }
  }
};

/**
 * Lista vazia - caso limite
 * Testa comportamento sem dados disponíveis
 */
export const ListaVazia = Template.bind({});
ListaVazia.args = {
  availableStates: []
};
ListaVazia.parameters = {
  docs: {
    description: {
      story: 'Comportamento do componente quando não há estados disponíveis para seleção.'
    }
  }
};

/**
 * Estado de carregamento
 * Simula busca de cidades em progresso
 */
export const EstadoCarregamento = Template.bind({});
EstadoCarregamento.args = {
  selectedStates: [1],
  selectedCities: []
};
EstadoCarregamento.parameters = {
  docs: {
    description: {
      story: 'Demonstra o comportamento durante o carregamento de cidades após seleção de estados.'
    }
  }
};

// Large dataset (simulating many cities like Rio de Janeiro's 92 municipalities)
const largeDataset = [
  {
    stateId: 1,
    name: 'Rio de Janeiro',
    acronym: 'RJ',
    cities: Array.from({ length: 92 }, (_, i) => ({
      cityId: i + 1,
      name: `Cidade ${i + 1} - RJ`
    }))
  },
  {
    stateId: 2, 
    name: 'São Paulo',
    acronym: 'SP',
    cities: Array.from({ length: 645 }, (_, i) => ({
      cityId: i + 93,
      name: `Cidade ${i + 1} - SP`
    }))
  }
];

/**
 * Teste de performance com dataset grande
 * Avalia comportamento com muitos municípios
 */
export const TestePerformance = (args) => {
  const [selectedStates, setSelectedStates] = useState([1]);
  const [selectedCities, setSelectedCities] = useState([]);

  const handleFetchCities = async (stateId) => {
    // Simula delay de API para dataset grande
    await new Promise(resolve => setTimeout(resolve, 800));
    return largeDataset.find(state => state.stateId === stateId)?.cities || [];
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      padding: '24px', 
      backgroundColor: '#fef7f0',
      borderRadius: '8px',
      border: '1px solid #fed7aa'
    }}>
      <h3 style={{ marginBottom: '16px', color: '#ea580c', fontSize: '16px', fontWeight: '600' }}>
        🚀 Teste de Performance (Dataset Grande)
      </h3>
      <LocationFilter
        {...args}
        availableStates={largeDataset}
        selectedStates={selectedStates}
        selectedCities={selectedCities}
        onStatesChange={setSelectedStates}
        onCitiesChange={setSelectedCities}
        onFetchCities={handleFetchCities}
      />
    </div>
  );
};
TestePerformance.parameters = {
  docs: {
    description: {
      story: 'Teste de performance com dataset grande simulando cenários reais de uso com muitos municípios (RJ: 92, SP: 645+ municípios).'
    }
  }
};

/**
 * Playground interativo
 * Área livre para testes e experimentação
 */
export const Playground = Template.bind({});
Playground.args = {
  selectedStates: [1],
  selectedCities: [1]
};
Playground.parameters = {
  docs: {
    description: {
      story: '🎮 Playground interativo para testar todas as funcionalidades do componente livremente.'
    }
  }
};

/**
 * Interface consistente com comboboxes
 * Demonstra padronização visual entre estados e cidades
 */
export const InterfaceConsistente = Template.bind({});
InterfaceConsistente.args = {};
InterfaceConsistente.parameters = {
  docs: {
    description: {
      story: 'Demonstra a interface consistente com comboboxes tanto para estados quanto para cidades. Economiza espaço e oferece uma experiência de usuário uniforme.'
    }
  }
};

/**
 * Funcionalidades de seleção em lote
 * Demonstra recursos avançados de seleção múltipla
 */
export const FuncionalidadesSelecaoLote = {
  render: (args) => {
    const [selectedStates, setSelectedStates] = useState([2]);
    const [selectedCities, setSelectedCities] = useState([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]); // Todas as cidades de SP

    return (
      <div style={{ maxWidth: '400px', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
            🎯 Funcionalidades Select All
          </h3>
          <ul style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
            <li>• Botão "Estados (X/Y)" para selecionar todos os estados</li>
            <li>• Botão por estado para selecionar todas as cidades</li>
            <li>• Estados com todas as cidades selecionadas ficam verdes</li>
            <li>• Estados com algumas cidades selecionadas ficam amarelos</li>
            <li>• Agrupamento de cidades por estado no dropdown</li>
            <li>• <strong>Tags otimizadas:</strong> "Todos estados" e "Estado (Todas cidades)"</li>
          </ul>
        </div>
        <LocationFilter
          {...args}
          availableStates={mockStates}
          selectedStates={selectedStates}
          selectedCities={selectedCities}
          onStatesChange={setSelectedStates}
          onCitiesChange={setSelectedCities}
          onFetchCities={() => Promise.resolve([])}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstra as funcionalidades avançadas de seleção em lote: seleção de todos os estados, seleção de todas as cidades por estado, agrupamento visual e indicadores de estado (completo/parcial). Inclui as novas tags otimizadas.'
      }
    }
  }
};

// Estado Completo - demonstra tag otimizada para estado com todas cidades
export const StateWithAllCities = {
  render: (args) => {
    const [selectedStates, setSelectedStates] = useState([2, 1]);
    const [selectedCities, setSelectedCities] = useState([
      // Todas as cidades de SP (10 cidades)
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      // Apenas algumas cidades do RJ
      1, 2
    ]);

    return (
      <div className="max-w-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Tag Otimizada: "Estado (Todas cidades)"</h3>
          <p className="text-sm text-gray-600 mb-4">
            SP com todas as cidades selecionadas mostra "São Paulo (Todas cidades)". 
            RJ com algumas cidades mostra tags individuais.
          </p>
        </div>
        <LocationFilter
          {...args}
          availableStates={mockStates}
          selectedStates={selectedStates}
          selectedCities={selectedCities}
          onStatesChange={setSelectedStates}
          onCitiesChange={setSelectedCities}
          onFetchCities={() => Promise.resolve([])}
        />
      </div>
    );
  }
};

// Todos Estados - demonstra tag otimizada para todos estados
export const AllStatesSelected = {
  render: (args) => {
    const [selectedStates, setSelectedStates] = useState([1, 2, 3]);
    const [selectedCities, setSelectedCities] = useState([]);

    return (
      <div className="max-w-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Tag Otimizada: "Todos Estados"</h3>
          <p className="text-sm text-gray-600 mb-4">
            Quando todos os estados estão selecionados, mostra uma tag consolidada "Todos estados (X)" em verde.
          </p>
        </div>
        <LocationFilter
          {...args}
          availableStates={mockStates}
          selectedStates={selectedStates}
          selectedCities={selectedCities}
          onStatesChange={setSelectedStates}
          onCitiesChange={setSelectedCities}
          onFetchCities={() => Promise.resolve([])}
        />
      </div>
    );
  }
};