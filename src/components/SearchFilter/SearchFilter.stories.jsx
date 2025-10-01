/**
 * SearchFilter Stories
 * 
 * Stories para demonstração e teste visual do componente SearchFilter otimizado.
 * Inclui todos os estados e interações do componente refatorado.
 */

import React, { useState } from 'react';
import SearchFilter from './SearchFilter';

export default {
  title: 'Components/SearchFilter',
  component: SearchFilter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## SearchFilter Component

Componente de filtros avançados com arquitetura híbrida otimizada:

### Filtros Estáticos
- **Tipos de doação**: Quem doa / Quem precisa
- **Tipos de acesso**: Públicas / Privadas
- **Distância**: Opções fixas de alcance

### Filtros Dinâmicos
- **Localização**: Estados e cidades com integração API
- **Categorias**: Estrutura hierárquica com subcategorias
- **Estado do item**: Tags dinâmicas configurables via props

### Funcionalidades
- Expand/collapse de seções
- Estados indeterminados para categorias
- Tooltips informativos
- Limpeza geral de filtros
- Acessibilidade completa
        `
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
    categoryId: 1,
    name: 'Roupas',
    subcategories: [
      { subcategoryId: 101, name: 'Camisetas' },
      { subcategoryId: 102, name: 'Calças' },
      { subcategoryId: 103, name: 'Vestidos' },
      { subcategoryId: 104, name: 'Sapatos' }
    ]
  },
  {
    categoryId: 2,
    name: 'Móveis',
    subcategories: [
      { subcategoryId: 201, name: 'Cadeiras' },
      { subcategoryId: 202, name: 'Mesas' },
      { subcategoryId: 203, name: 'Sofás' }
    ]
  },
  {
    categoryId: 3,
    name: 'Livros',
    subcategories: [
      { subcategoryId: 301, name: 'Ficção' },
      { subcategoryId: 302, name: 'Técnicos' },
      { subcategoryId: 303, name: 'Educacionais' },
      { subcategoryId: 304, name: 'Infantis' }
    ]
  },
  {
    categoryId: 4,
    name: 'Eletrônicos',
    subcategories: [
      { subcategoryId: 401, name: 'Celulares' },
      { subcategoryId: 402, name: 'Computadores' },
      { subcategoryId: 403, name: 'TVs' }
    ]
  },
  {
    categoryId: 5,
    name: 'Brinquedos',
    subcategories: [
      { subcategoryId: 501, name: 'Bonecas' },
      { subcategoryId: 502, name: 'Carrinhos' },
      { subcategoryId: 503, name: 'Jogos' },
      { subcategoryId: 504, name: 'Quebra-cabeças' }
    ]
  }
];

// Apenas tags de estado do item são dinâmicas
const mockItemStates = [
  { donationTagId: 10, name: 'Novo em folha' },
  { donationTagId: 11, name: 'Quase novo' },
  { donationTagId: 12, name: 'Bem conservado' },
  { donationTagId: 13, name: 'Com sinais de uso' },
  { donationTagId: 14, name: 'Precisa de reparos' }
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
    selectedDistance: null,
    itemStates: [],
    // Apenas tags de item são dinâmicas
    availableItemStates: mockItemStates
  }
};

// Story com algumas seleções
export const WithSelections = {
  args: {
    donationTypes: [1],
    accessTypes: [1, 2],
    availableStates: mockStates,
    selectedStates: ['SP', 'RJ'],
    selectedCities: ['sao-paulo', 'campinas', 'rio-de-Janeiro'],
    categories: mockCategories,
    selectedCategories: [101, 102],
    selectedDistance: 3,
    itemStates: [10, 11],
    // Apenas tags de item são dinâmicas
    availableItemStates: mockItemStates
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
    selectedDistance: null,
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
      selectedDistance: null,
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
          
          // Apenas tags de item são dinâmicas
          availableItemStates={mockItemStates}
          
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
        categoryId: 6,
        name: 'Esportes',
        subcategories: [
          { subcategoryId: 601, name: 'Bolas' },
          { subcategoryId: 602, name: 'Bicicletas' },
          { subcategoryId: 603, name: 'Equipamentos' }
        ]
      },
      {
        categoryId: 7,
        name: 'Cozinha',
        subcategories: [
          { subcategoryId: 701, name: 'Eletrodomésticos' },
          { subcategoryId: 702, name: 'Utensílios' }
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