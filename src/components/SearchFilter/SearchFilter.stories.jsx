import React, { useState } from 'react';
import SearchFilter from './SearchFilter';

export default {
  title: 'Components/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componente de filtro lateral para busca e filtragem de doações com múltiplos critérios.'
      }
    }
  },
  argTypes: {
    donationTypes: {
      description: 'Array com tipos de doação selecionados',
      control: { type: 'object' }
    },
    accessTypes: {
      description: 'Array com tipos de acesso selecionados',
      control: { type: 'object' }
    },
    selectedStates: {
      description: 'Array com IDs dos estados selecionados',
      control: { type: 'object' }
    },
    selectedCities: {
      description: 'Array com IDs das cidades selecionadas',
      control: { type: 'object' }
    },
    categories: {
      description: 'Array com categorias disponíveis',
      control: { type: 'object' }
    },
    selectedCategories: {
      description: 'Array com IDs das categorias selecionadas',
      control: { type: 'object' }
    },
    selectedDistance: {
      description: 'Distância selecionada',
      control: { type: 'select' },
      options: ['any', '2km', '5km', '10km', '50km']
    },
    itemStates: {
      description: 'Array com estados do item selecionados',
      control: { type: 'object' }
    }
  }
};

// Dados mock
const mockStates = [
  {
    id: 'SP',
    name: 'São Paulo',
    cities: [
      { id: 'sao-paulo', name: 'São Paulo' },
      { id: 'campinas', name: 'Campinas' },
      { id: 'santos', name: 'Santos' },
      { id: 'sorocaba', name: 'Sorocaba' },
      { id: 'ribeirao-preto', name: 'Ribeirão Preto' }
    ]
  },
  {
    id: 'RJ',
    name: 'Rio de Janeiro',
    cities: [
      { id: 'rio-de-janeiro', name: 'Rio de Janeiro' },
      { id: 'niteroi', name: 'Niterói' },
      { id: 'petropolis', name: 'Petrópolis' },
      { id: 'volta-redonda', name: 'Volta Redonda' }
    ]
  },
  {
    id: 'MG',
    name: 'Minas Gerais',
    cities: [
      { id: 'belo-horizonte', name: 'Belo Horizonte' },
      { id: 'uberlandia', name: 'Uberlândia' },
      { id: 'contagem', name: 'Contagem' },
      { id: 'juiz-de-fora', name: 'Juiz de Fora' }
    ]
  }
];

const mockCategories = [
  {
    id: 'clothes',
    name: 'Roupas',
    count: 47,
    subcategories: [
      { id: 'shirts', name: 'Camisetas', count: 20 },
      { id: 'pants', name: 'Calças', count: 15 },
      { id: 'dresses', name: 'Vestidos', count: 8 },
      { id: 'shoes', name: 'Sapatos', count: 4 }
    ]
  },
  {
    id: 'furniture',
    name: 'Móveis',
    count: 23,
    subcategories: [
      { id: 'chairs', name: 'Cadeiras', count: 10 },
      { id: 'tables', name: 'Mesas', count: 8 },
      { id: 'sofas', name: 'Sofás', count: 5 }
    ]
  },
  {
    id: 'books',
    name: 'Livros',
    count: 89,
    subcategories: [
      { id: 'fiction', name: 'Ficção', count: 30 },
      { id: 'technical', name: 'Técnicos', count: 25 },
      { id: 'educational', name: 'Educacionais', count: 20 },
      { id: 'children', name: 'Infantis', count: 14 }
    ]
  },
  {
    id: 'electronics',
    name: 'Eletrônicos',
    count: 15,
    subcategories: [
      { id: 'phones', name: 'Celulares', count: 8 },
      { id: 'computers', name: 'Computadores', count: 4 },
      { id: 'tvs', name: 'TVs', count: 3 }
    ]
  },
  {
    id: 'toys',
    name: 'Brinquedos',
    count: 73,
    subcategories: [
      { id: 'dolls', name: 'Bonecas', count: 25 },
      { id: 'cars', name: 'Carrinhos', count: 20 },
      { id: 'games', name: 'Jogos', count: 18 },
      { id: 'puzzles', name: 'Quebra-cabeças', count: 10 }
    ]
  }
];

// Story padrão
export const Default = {
  args: {
    donationTypes: [],
    accessTypes: [],
    availableStates: mockStates,
    selectedStates: [],
    selectedCities: [],
    categories: mockCategories,
    selectedCategories: [],
    selectedDistance: 'any',
    itemStates: []
  }
};

// Story com algumas seleções
export const WithSelections = {
  args: {
    donationTypes: ['giver'],
    accessTypes: ['public', 'private'],
    availableStates: mockStates,
    selectedStates: ['SP', 'RJ'],
    selectedCities: ['sao-paulo', 'campinas', 'rio-de-janeiro'],
    categories: mockCategories,
    selectedCategories: ['clothes', 'shirts', 'pants'],
    selectedDistance: '5km',
    itemStates: ['new', 'like_new']
  }
};

// Story interativa
export const Interactive = () => {
  const [filters, setFilters] = useState({
    donationTypes: [],
    accessTypes: [],
    selectedStates: [],
    selectedCities: [],
    selectedCategories: [],
    selectedDistance: 'any',
    itemStates: []
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFetchCities = (stateId) => {
    console.log('Buscando cidades para o estado:', stateId);
    // Simular delay de busca
    setTimeout(() => {
      console.log('Cidades carregadas para:', stateId);
    }, 1000);
  };

  const handleClearAll = () => {
    setFilters({
      donationTypes: [],
      accessTypes: [],
      selectedStates: [],
      selectedCities: [],
      selectedCategories: [],
      selectedDistance: 'any',
      itemStates: []
    });
    console.log('Todos os filtros foram limpos');
  };

  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        <SearchFilter
          donationTypes={filters.donationTypes}
          onDonationTypesChange={(value) => handleFilterChange('donationTypes', value)}
          
          accessTypes={filters.accessTypes}
          onAccessTypesChange={(value) => handleFilterChange('accessTypes', value)}
          
          availableStates={mockStates}
          selectedStates={filters.selectedStates}
          selectedCities={filters.selectedCities}
          onStatesChange={(value) => handleFilterChange('selectedStates', value)}
          onCitiesChange={(value) => handleFilterChange('selectedCities', value)}
          onFetchCities={handleFetchCities}
          
          categories={mockCategories}
          selectedCategories={filters.selectedCategories}
          onCategoriesChange={(value) => handleFilterChange('selectedCategories', value)}
          
          selectedDistance={filters.selectedDistance}
          onDistanceChange={(value) => handleFilterChange('selectedDistance', value)}
          
          itemStates={filters.itemStates}
          onItemStatesChange={(value) => handleFilterChange('itemStates', value)}
          
          onClearAll={handleClearAll}
        />
      </div>
      
      <div className="flex-1 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Estado Atual dos Filtros</h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong>Tipos de Doação:</strong> {filters.donationTypes.join(', ') || 'Nenhum'}
          </div>
          <div>
            <strong>Tipos de Acesso:</strong> {filters.accessTypes.join(', ') || 'Nenhum'}
          </div>
          <div>
            <strong>Estados:</strong> {filters.selectedStates.join(', ') || 'Nenhum'}
          </div>
          <div>
            <strong>Cidades:</strong> {filters.selectedCities.join(', ') || 'Nenhuma'}
          </div>
          <div>
            <strong>Categorias:</strong> {filters.selectedCategories.join(', ') || 'Nenhuma'}
          </div>
          <div>
            <strong>Distância:</strong> {filters.selectedDistance}
          </div>
          <div>
            <strong>Estado do Item:</strong> {filters.itemStates.join(', ') || 'Nenhum'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Story com muitas opções para testar scroll
export const WithManyOptions = {
  args: {
    donationTypes: [],
    accessTypes: [],
    availableStates: [
      ...mockStates,
      { id: 'RS', name: 'Rio Grande do Sul', cities: [{ id: 'porto-alegre', name: 'Porto Alegre' }] },
      { id: 'PR', name: 'Paraná', cities: [{ id: 'curitiba', name: 'Curitiba' }] },
      { id: 'SC', name: 'Santa Catarina', cities: [{ id: 'florianopolis', name: 'Florianópolis' }] },
      { id: 'BA', name: 'Bahia', cities: [{ id: 'salvador', name: 'Salvador' }] },
      { id: 'GO', name: 'Goiás', cities: [{ id: 'goiania', name: 'Goiânia' }] }
    ],
    selectedStates: [],
    selectedCities: [],
    categories: [
      ...mockCategories,
      {
        id: 'sports',
        name: 'Esportes',
        count: 35,
        subcategories: [
          { id: 'balls', name: 'Bolas', count: 15 },
          { id: 'bikes', name: 'Bicicletas', count: 10 },
          { id: 'equipment', name: 'Equipamentos', count: 10 }
        ]
      },
      {
        id: 'kitchen',
        name: 'Cozinha',
        count: 28,
        subcategories: [
          { id: 'appliances', name: 'Eletrodomésticos', count: 12 },
          { id: 'utensils', name: 'Utensílios', count: 16 }
        ]
      }
    ],
    selectedCategories: [],
    selectedDistance: 'any',
    itemStates: []
  }
};

// Story com dados vazios
export const Empty = {
  args: {
    donationTypes: [],
    accessTypes: [],
    availableStates: [],
    selectedStates: [],
    selectedCities: [],
    categories: [],
    selectedCategories: [],
    selectedDistance: 'any',
    itemStates: []
  }
};