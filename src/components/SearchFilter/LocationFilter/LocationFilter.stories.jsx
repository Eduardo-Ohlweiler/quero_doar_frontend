import React, { useState } from 'react';
import LocationFilter from './LocationFilter';

export default {
  title: 'Components/SearchFilter/LocationFilter',
  component: LocationFilter,
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    onStatesChange: { action: 'onStatesChange' },
    onCitiesChange: { action: 'onCitiesChange' },
    onFetchCities: { action: 'onFetchCities' }
  }
};

// Mock data
const mockStates = [
  {
    id: 'rj',
    name: 'Rio de Janeiro',
    cities: [
      { id: 'rj-1', name: 'Rio de Janeiro' },
      { id: 'rj-2', name: 'Niterói' },
      { id: 'rj-3', name: 'Petrópolis' },
      { id: 'rj-4', name: 'Volta Redonda' },
      { id: 'rj-5', name: 'Nova Iguaçu' },
      { id: 'rj-6', name: 'Belford Roxo' },
      { id: 'rj-7', name: 'São Gonçalo' },
      { id: 'rj-8', name: 'Duque de Caxias' },
      { id: 'rj-9', name: 'Nova Friburgo' },
      { id: 'rj-10', name: 'Macaé' }
    ]
  },
  {
    id: 'sp',
    name: 'São Paulo',
    cities: [
      { id: 'sp-1', name: 'São Paulo' },
      { id: 'sp-2', name: 'Campinas' },
      { id: 'sp-3', name: 'Santos' },
      { id: 'sp-4', name: 'São José dos Campos' },
      { id: 'sp-5', name: 'Ribeirão Preto' },
      { id: 'sp-6', name: 'Sorocaba' },
      { id: 'sp-7', name: 'São Bernardo do Campo' },
      { id: 'sp-8', name: 'Santo André' },
      { id: 'sp-9', name: 'Osasco' },
      { id: 'sp-10', name: 'Guarulhos' }
    ]
  },
  {
    id: 'mg',
    name: 'Minas Gerais',
    cities: [
      { id: 'mg-1', name: 'Belo Horizonte' },
      { id: 'mg-2', name: 'Uberlândia' },
      { id: 'mg-3', name: 'Contagem' },
      { id: 'mg-4', name: 'Juiz de Fora' },
      { id: 'mg-5', name: 'Montes Claros' }
    ]
  }
];

// Template for interactive stories
const Template = (args) => {
  const [selectedStates, setSelectedStates] = useState(args.selectedStates || []);
  const [selectedCities, setSelectedCities] = useState(args.selectedCities || []);

  const handleFetchCities = async (stateId) => {
    // Simular async fetch
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Fetching cities for state:', stateId);
    return mockStates.find(state => state.id === stateId)?.cities || [];
  };

  return (
    <div className="max-w-sm">
      <LocationFilter
        {...args}
        availableStates={mockStates}
        selectedStates={selectedStates}
        selectedCities={selectedCities}
        onStatesChange={setSelectedStates}
        onCitiesChange={setSelectedCities}
        onFetchCities={handleFetchCities}
      />
    </div>
  );
};

// Default story
export const Default = Template.bind({});
Default.args = {};

// With selected states
export const WithSelectedStates = Template.bind({});
WithSelectedStates.args = {
  selectedStates: ['rj']
};

// With selected cities
export const WithSelectedCities = Template.bind({});
WithSelectedCities.args = {
  selectedStates: ['rj', 'sp'],
  selectedCities: ['rj-1', 'rj-2', 'sp-1']
};

// Multiple states with many cities
export const MultipleCities = Template.bind({});
MultipleCities.args = {
  selectedStates: ['rj', 'sp'],
  selectedCities: ['rj-1', 'rj-2', 'rj-3', 'sp-1', 'sp-2', 'sp-3', 'sp-4']
};

// Empty state
export const NoStates = Template.bind({});
NoStates.args = {
  availableStates: []
};

// Loading state simulation
export const LoadingCities = Template.bind({});
LoadingCities.args = {
  selectedStates: ['rj'],
  selectedCities: []
};

// Large dataset (simulating many cities like Rio de Janeiro's 92 municipalities)
const largeDataset = [
  {
    id: 'rj',
    name: 'Rio de Janeiro',
    cities: Array.from({ length: 92 }, (_, i) => ({
      id: `rj-${i + 1}`,
      name: `Cidade ${i + 1} - RJ`
    }))
  },
  {
    id: 'sp', 
    name: 'São Paulo',
    cities: Array.from({ length: 645 }, (_, i) => ({
      id: `sp-${i + 1}`,
      name: `Cidade ${i + 1} - SP`
    }))
  }
];

export const LargeDataset = (args) => {
  const [selectedStates, setSelectedStates] = useState(['rj']);
  const [selectedCities, setSelectedCities] = useState([]);

  return (
    <div className="max-w-sm">
      <LocationFilter
        {...args}
        availableStates={largeDataset}
        selectedStates={selectedStates}
        selectedCities={selectedCities}
        onStatesChange={setSelectedStates}
        onCitiesChange={setSelectedCities}
        onFetchCities={() => Promise.resolve([])}
      />
    </div>
  );
};
LargeDataset.args = {};

// Playground
export const Playground = Template.bind({});
Playground.args = {
  selectedStates: ['rj'],
  selectedCities: ['rj-1']
};

// Interface consistente - demonstra comboboxes para ambos
export const ConsistentInterface = Template.bind({});
ConsistentInterface.args = {};
ConsistentInterface.storyName = 'Interface Consistente (Estados + Cidades)';
ConsistentInterface.parameters = {
  docs: {
    description: {
      story: 'Demonstra a interface consistente com comboboxes tanto para estados quanto para cidades. Economiza espaço e oferece uma experiência de usuário uniforme.'
    }
  }
};

// Select All - demonstra funcionalidades de seleção em lote
export const SelectAllFeatures = {
  render: (args) => {
    const [selectedStates, setSelectedStates] = useState(['sp']);
    const [selectedCities, setSelectedCities] = useState(['sp-1', 'sp-2', 'sp-3', 'sp-4', 'sp-5', 'sp-6', 'sp-7', 'sp-8', 'sp-9', 'sp-10']); // Todas as cidades de SP

    return (
      <div className="max-w-sm space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Demonstração das Funcionalidades Select All</h3>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
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
        story: 'Demonstra as funcionalidades de Select All: seleção de todos os estados, seleção de todas as cidades por estado, agrupamento visual e indicadores de estado (completo/parcial). Inclui as novas tags otimizadas para "Todos estados" e "Estado (Todas cidades)".'
      }
    }
  }
};

// Estado Completo - demonstra tag otimizada para estado com todas cidades
export const StateWithAllCities = {
  render: (args) => {
    const [selectedStates, setSelectedStates] = useState(['sp', 'rj']);
    const [selectedCities, setSelectedCities] = useState([
      // Todas as cidades de SP (10 cidades)
      'sp-1', 'sp-2', 'sp-3', 'sp-4', 'sp-5', 'sp-6', 'sp-7', 'sp-8', 'sp-9', 'sp-10',
      // Apenas algumas cidades do RJ
      'rj-1', 'rj-2'
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
    const [selectedStates, setSelectedStates] = useState(['rj', 'sp', 'mg']);
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