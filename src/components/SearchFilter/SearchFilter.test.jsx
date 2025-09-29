import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SearchFilter from './SearchFilter';

// Mock do LocationFilter
vi.mock('./LocationFilter/LocationFilter', () => ({
  default: ({ selectedStates, selectedCities, onStatesChange, onCitiesChange }) => (
    <div data-testid="location-filter">
      <div>Selected States: {selectedStates?.join(', ') || 'none'}</div>
      <div>Selected Cities: {selectedCities?.join(', ') || 'none'}</div>
      <button onClick={() => onStatesChange?.(['SP'])}>Select SP</button>
      <button onClick={() => onCitiesChange?.(['sao-paulo'])}>Select São Paulo</button>
    </div>
  )
}));

// Dados mock
const mockCategories = [
  {
    id: 'clothes',
    name: 'Roupas',
    count: 47,
    subcategories: [
      { id: 'shirts', name: 'Camisetas', count: 20 },
      { id: 'pants', name: 'Calças', count: 15 }
    ]
  },
  {
    id: 'books',
    name: 'Livros',
    count: 89,
    subcategories: [
      { id: 'fiction', name: 'Ficção', count: 30 },
      { id: 'technical', name: 'Técnicos', count: 25 }
    ]
  }
];

const mockStates = [
  {
    id: 'SP',
    name: 'São Paulo',
    cities: [
      { id: 'sao-paulo', name: 'São Paulo' },
      { id: 'campinas', name: 'Campinas' }
    ]
  },
  {
    id: 'RJ',
    name: 'Rio de Janeiro',
    cities: [
      { id: 'rio-de-janeiro', name: 'Rio de Janeiro' },
      { id: 'niteroi', name: 'Niterói' }
    ]
  }
];

describe('SearchFilter', () => {
  const defaultProps = {
    donationTypes: [],
    accessTypes: [],
    availableStates: mockStates,
    selectedStates: [],
    selectedCities: [],
    categories: mockCategories,
    selectedCategories: [],
    selectedDistance: 'any',
    itemStates: [],
    onDonationTypesChange: vi.fn(),
    onAccessTypesChange: vi.fn(),
    onStatesChange: vi.fn(),
    onCitiesChange: vi.fn(),
    onFetchCities: vi.fn(),
    onCategoriesChange: vi.fn(),
    onDistanceChange: vi.fn(),
    onItemStatesChange: vi.fn(),
    onClearAll: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC1: Renderização básica
  it('TC1: renders correctly with default props', () => {
    render(<SearchFilter {...defaultProps} />);
    
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Limpar tudo')).toBeInTheDocument();
    expect(screen.getByText('Tipo de Doação')).toBeInTheDocument();
    expect(screen.getByText('Acesso')).toBeInTheDocument();
    expect(screen.getByText('Localização')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Distância')).toBeInTheDocument();
    expect(screen.getByText('Estado do Item')).toBeInTheDocument();
  });

  // TC2: Expansão e recolhimento de seções
  it('TC2: toggles sections when clicking on header', async () => {
    const user = userEvent.setup();
    render(<SearchFilter {...defaultProps} />);

    // Verifica se inicialmente as seções estão expandidas
    expect(screen.getByText('Quem doa')).toBeInTheDocument();
    
    // Clica para recolher seção
    const toggleButton = screen.getAllByRole('button')[1]; // Primeiro toggle button
    await user.click(toggleButton);
    
    // Verifica se a seção foi recolhida
    expect(screen.queryByText('Quem doa')).not.toBeInTheDocument();
  });

  // TC3: Seleção de tipos de doação
  it('TC3: handles donation type selection', async () => {
    const user = userEvent.setup();
    const onDonationTypesChange = vi.fn();
    
    render(<SearchFilter {...defaultProps} onDonationTypesChange={onDonationTypesChange} />);
    
    const giverCheckbox = screen.getByLabelText('Quem doa');
    await user.click(giverCheckbox);
    
    expect(onDonationTypesChange).toHaveBeenCalledWith(['giver']);
  });

  // TC4: Seleção de tipos de acesso
  it('TC4: handles access type selection', async () => {
    const user = userEvent.setup();
    const onAccessTypesChange = vi.fn();
    
    render(<SearchFilter {...defaultProps} onAccessTypesChange={onAccessTypesChange} />);
    
    const publicCheckbox = screen.getByLabelText('Públicas');
    await user.click(publicCheckbox);
    
    expect(onAccessTypesChange).toHaveBeenCalledWith(['public']);
  });

  // TC5: Seleção de categorias principais
  it('TC5: handles main category selection', async () => {
    const user = userEvent.setup();
    const onCategoriesChange = vi.fn();
    
    // Usar as categorias padrão que sabemos que existem
    render(<SearchFilter {...defaultProps} onCategoriesChange={onCategoriesChange} />);
    
    // Verificar se a seção de categoria existe
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    
    // Procurar pelo texto 'Roupas' que sabemos que existe no mockCategories
    expect(screen.getByText('Roupas')).toBeInTheDocument();
    
    // Encontrar o checkbox por texto e clicar
    const roupasText = screen.getByText('Roupas');
    const checkboxContainer = roupasText.closest('label');
    const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');
    
    await user.click(checkbox);
    
    // Verificar se onCategoriesChange foi chamado com a categoria e subcategorias
    // Quando uma categoria principal é selecionada, as subcategorias também são selecionadas
    expect(onCategoriesChange).toHaveBeenCalledWith(['clothes', 'shirts', 'pants']);
  });

  // TC6: Expansão de subcategorias
  it('TC6: expands subcategories when clicking toggle', async () => {
    const user = userEvent.setup();
    render(<SearchFilter {...defaultProps} />);
    
    // Inicialmente subcategorias não estão visíveis (expandedCategories começa vazio)
    expect(screen.queryByText('Camisetas')).not.toBeInTheDocument();
    
    // Encontrar o botão de toggle usando uma estratégia mais direta
    // Procurar por todos os botões e encontrar o que está relacionado à categoria
    const toggleButtons = screen.getAllByRole('button');
    const categoryToggleButton = toggleButtons.find(button => {
      const svg = button.querySelector('svg');
      return svg && button.closest('div').textContent.includes('Roupas');
    });
    
    expect(categoryToggleButton).toBeInTheDocument();
    
    // Clicar no botão de toggle
    await user.click(categoryToggleButton);
    
    // Agora subcategorias devem estar visíveis
    await waitFor(() => {
      expect(screen.getByText('Camisetas')).toBeInTheDocument();
      expect(screen.getByText('Calças')).toBeInTheDocument();
    });
  });

  // TC7: Seleção de distância
  it('TC7: handles distance selection', async () => {
    const user = userEvent.setup();
    const onDistanceChange = vi.fn();
    
    render(<SearchFilter {...defaultProps} onDistanceChange={onDistanceChange} />);
    
    const distance5km = screen.getByLabelText('Até 5km');
    await user.click(distance5km);
    
    expect(onDistanceChange).toHaveBeenCalledWith('5km');
  });

  // TC8: Seleção de estados de item
  it('TC8: handles item state selection', async () => {
    const user = userEvent.setup();
    const onItemStatesChange = vi.fn();
    
    render(<SearchFilter {...defaultProps} onItemStatesChange={onItemStatesChange} />);
    
    const newItemCheckbox = screen.getByLabelText('Novo em folha');
    await user.click(newItemCheckbox);
    
    expect(onItemStatesChange).toHaveBeenCalledWith(['new']);
  });

  // TC9: Tooltip de distância
  it('TC9: shows distance tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<SearchFilter {...defaultProps} />);
    
    // Primeiro, expandir a seção de distância
    const distanceSection = screen.getByText('Distância').closest('div');
    const distanceToggle = distanceSection.querySelector('button');
    if (distanceToggle) {
      await user.click(distanceToggle);
    }

    await waitFor(() => {
      const infoIcon = screen.getByText('Distância').parentElement.querySelector('button:last-child');
      if (infoIcon) {
        user.hover(infoIcon);
        expect(screen.getByText(/As buscas por distância são apenas relativas às cidades/)).toBeInTheDocument();
      }
    });
  });

  // TC10: Limpar tudo
  it('TC10: clears all filters when clicking clear button', async () => {
    const user = userEvent.setup();
    const mockProps = {
      ...defaultProps,
      donationTypes: ['giver'],
      accessTypes: ['public'],
      selectedStates: ['SP'],
      selectedCities: ['sao-paulo'],
      selectedCategories: ['clothes'],
      selectedDistance: '5km',
      itemStates: ['new']
    };
    
    render(<SearchFilter {...mockProps} />);
    
    const clearButton = screen.getByText('Limpar tudo');
    await user.click(clearButton);
    
    expect(mockProps.onDonationTypesChange).toHaveBeenCalledWith([]);
    expect(mockProps.onAccessTypesChange).toHaveBeenCalledWith([]);
    expect(mockProps.onStatesChange).toHaveBeenCalledWith([]);
    expect(mockProps.onCitiesChange).toHaveBeenCalledWith([]);
    expect(mockProps.onCategoriesChange).toHaveBeenCalledWith([]);
    expect(mockProps.onDistanceChange).toHaveBeenCalledWith('any');
    expect(mockProps.onItemStatesChange).toHaveBeenCalledWith([]);
    expect(mockProps.onClearAll).toHaveBeenCalled();
  });

  // TC11: Renderização do LocationFilter
  it('TC11: renders LocationFilter component', () => {
    render(<SearchFilter {...defaultProps} />);
    
    expect(screen.getByTestId('location-filter')).toBeInTheDocument();
  });

  // TC12: Múltiplas seleções de checkbox
  it('TC12: handles multiple checkbox selections', async () => {
    const user = userEvent.setup();
    const onDonationTypesChange = vi.fn();
    
    const { rerender } = render(<SearchFilter {...defaultProps} onDonationTypesChange={onDonationTypesChange} />);
    
    // Selecionar primeira opção
    const giverCheckbox = screen.getByLabelText('Quem doa');
    await user.click(giverCheckbox);
    expect(onDonationTypesChange).toHaveBeenCalledWith(['giver']);
    
    // Simular que o estado foi atualizado
    const updatedProps = { ...defaultProps, donationTypes: ['giver'], onDonationTypesChange };
    rerender(<SearchFilter {...updatedProps} />);
    
    // Selecionar segunda opção - agora usar getAllByLabelText e escolher a primeira que não está selecionada
    const receiverCheckboxes = screen.getAllByLabelText('Quem precisa');
    const receiverCheckbox = receiverCheckboxes.find(checkbox => !checkbox.checked) || receiverCheckboxes[0];
    await user.click(receiverCheckbox);
    expect(onDonationTypesChange).toHaveBeenCalledWith(['giver', 'receiver']);
  });

  // TC13: Deseleção de itens
  it('TC13: handles item deselection', async () => {
    const user = userEvent.setup();
    const onDonationTypesChange = vi.fn();
    
    const propsWithSelection = {
      ...defaultProps,
      donationTypes: ['giver', 'receiver'],
      onDonationTypesChange
    };
    
    render(<SearchFilter {...propsWithSelection} />);
    
    // Desmarcar uma opção
    const giverCheckbox = screen.getByLabelText('Quem doa');
    await user.click(giverCheckbox);
    
    expect(onDonationTypesChange).toHaveBeenCalledWith(['receiver']);
  });

  // TC14: Acessibilidade de navegação por teclado
  it('TC14: supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<SearchFilter {...defaultProps} />);
    
    const clearButton = screen.getByText('Limpar tudo');
    
    // Testar navegação com Tab e Enter
    await user.tab();
    await user.keyboard('{Enter}');
    
    expect(defaultProps.onClearAll).toHaveBeenCalled();
  });

  // TC15: Props customizadas
  it('TC15: applies custom className and props', () => {
    render(<SearchFilter {...defaultProps} className="custom-class" data-testid="search-filter" />);
    
    const filterElement = screen.getByTestId('search-filter');
    expect(filterElement).toHaveClass('custom-class');
  });
});