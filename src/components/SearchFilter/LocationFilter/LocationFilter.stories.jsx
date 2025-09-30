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

// Template for interactive stories
const Template = (args) => {
  const [selectedStates, setSelectedStates] = useState(args.selectedStates || []);
  const [selectedCities, setSelectedCities] = useState(args.selectedCities || []);

  const handleFetchCities = async (stateId) => {
    // Simular async fetch
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Fetching cities for state:', stateId);
    return mockStates.find(state => state.stateId === stateId)?.cities || [];
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
  selectedStates: [1]
};

// With selected cities
export const WithSelectedCities = Template.bind({});
WithSelectedCities.args = {
  selectedStates: [1, 2],
  selectedCities: [1, 2, 11]
};

// Multiple states with many cities
export const MultipleCities = Template.bind({});
MultipleCities.args = {
  selectedStates: [1, 2],
  selectedCities: [1, 2, 3, 11, 12, 13, 14]
};

// Empty state
export const NoStates = Template.bind({});
NoStates.args = {
  availableStates: []
};

// Loading state simulation
export const LoadingCities = Template.bind({});
LoadingCities.args = {
  selectedStates: [1],
  selectedCities: []
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

export const LargeDataset = (args) => {
  const [selectedStates, setSelectedStates] = useState([1]);
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
  selectedStates: [1],
  selectedCities: [1]
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
    const [selectedStates, setSelectedStates] = useState([2]);
    const [selectedCities, setSelectedCities] = useState([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]); // Todas as cidades de SP

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