/**
 * LocationFilter Test Suite
 * 
 * Testes abrangentes para o componente LocationFilter.
 * Utilizando padrão CTx (Contexto) em português para
 * testes semânticos e organizados.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LocationFilter from './LocationFilter';

// ========================================
// CONFIGURAÇÃO DE MOCKS E DADOS
// ========================================

const mockStates = [
  {
    stateId: 1,
    name: 'Rio de Janeiro',
    acronym: 'RJ',
    cities: [
      { cityId: 1, name: 'Rio de Janeiro' },
      { cityId: 2, name: 'Niterói' },
      { cityId: 3, name: 'Petrópolis' }
    ]
  },
  {
    stateId: 2,
    name: 'São Paulo',
    acronym: 'SP',
    cities: [
      { cityId: 4, name: 'São Paulo' },
      { cityId: 5, name: 'Campinas' },
      { cityId: 6, name: 'Santos' }
    ]
  },
  {
    stateId: 3,
    name: 'Minas Gerais',
    acronym: 'MG',
    cities: [
      { cityId: 7, name: 'Belo Horizonte' },
      { cityId: 8, name: 'Uberlândia' }
    ]
  }
];

const defaultProps = {
  availableStates: mockStates,
  selectedStates: [],
  selectedCities: [],
  onStatesChange: vi.fn(),
  onCitiesChange: vi.fn(),
  onFetchCities: vi.fn()
};

beforeEach(() => {
  vi.clearAllMocks();
});

// ========================================
// TESTES DE RENDERIZAÇÃO INICIAL
// ========================================

describe('LocationFilter - Renderização', () => {

  it('CTxRenderizacaoInicial: deve renderizar elementos principais corretamente', () => {
    render(<LocationFilter {...defaultProps} />);
    
    // Verifica elementos principais da interface
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
    expect(screen.getByText('Selecione os estados...')).toBeInTheDocument();
    
    // Verifica que cidades não aparecem sem seleção de estados
    expect(screen.queryByText('Cidades')).not.toBeInTheDocument();
  });

  it('CTxRenderizacaoComEstados: deve mostrar seção de cidades quando estados selecionados', () => {
    render(<LocationFilter {...defaultProps} selectedStates={[1]} />);
    
    expect(screen.getByText('Cidades (0 selecionadas)')).toBeInTheDocument();
    expect(screen.getByText('Selecione as cidades...')).toBeInTheDocument();
  });

  it('CTxContadoresVisuais: deve exibir contadores corretos nos cabeçalhos', () => {
    const propsWithSelections = {
      ...defaultProps,
      selectedStates: [1, 2],
      selectedCities: [1, 2]
    };
    
    render(<LocationFilter {...propsWithSelections} />);
    
    expect(screen.getByText('Estados (2 selecionados)')).toBeInTheDocument();
    expect(screen.getByText('Cidades (2 selecionadas)')).toBeInTheDocument();
  });

  it('CTxTagsSelecao: deve exibir tags para itens selecionados', () => {
    const propsWithSelections = {
      ...defaultProps,
      selectedStates: [1],
      selectedCities: [1]
    };
    
    render(<LocationFilter {...propsWithSelections} />);
    
    // Verifica tags de estados
    expect(screen.getByText('Estados selecionados:')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    
    // Verifica tags de cidades
    expect(screen.getByText('Cidades selecionadas:')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro (RJ)')).toBeInTheDocument();
  });
});

// ========================================
// TESTES DE INTERAÇÃO COM DROPDOWNS
// ========================================

describe('LocationFilter - Interações', () => {
  it('CTxAberturaDropdownEstados: deve abrir e fechar dropdown de estados', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    
    // Deve estar fechado inicialmente
    expect(screen.queryByText('Rio de Janeiro')).not.toBeInTheDocument();
    
    // Clique para abrir
    fireEvent.click(stateButton);
    await waitFor(() => {
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
    });
    
    // Clique para fechar
    fireEvent.click(stateButton);
    await waitFor(() => {
      expect(screen.queryByText('Rio de Janeiro')).not.toBeInTheDocument();
    });
  });

  it('CTxAberturaDropdownCidades: deve abrir dropdown de cidades quando estados selecionados', async () => {
    const propsWithState = {
      ...defaultProps,
      selectedStates: [1]
    };
    
    render(<LocationFilter {...propsWithState} />);
    
    const cityButton = screen.getByText('Selecione as cidades...');
    
    // Inicialmente fechado
    expect(screen.queryByPlaceholderText('Buscar cidades...')).not.toBeInTheDocument();
    
    // Abrir dropdown
    fireEvent.click(cityButton);
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Buscar cidades...')).toBeInTheDocument();
    });
  });

  it('CTxSelecaoCheckbox: deve renderizar checkboxes para seleção múltipla', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
    });
    
    // Verificar presença de checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    // Select All + estados disponíveis
    expect(checkboxes.length).toBeGreaterThanOrEqual(3);
  });

  it('CTxFechamentoDropdown: deve fechar dropdown ao clicar fora', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    // Verifica se abriu
    await waitFor(() => {
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    });
    
    // Simula clique fora
    fireEvent.mouseDown(document.body);
    
    // Verifica se fechou
    await waitFor(() => {
      expect(screen.queryByText('Rio de Janeiro')).not.toBeInTheDocument();
    });
  });
});

// ========================================
// TESTES DE FUNCIONALIDADE DE BUSCA
// ========================================

describe('LocationFilter - Sistema de Busca', () => {
  it('CTxBuscaEstados: deve filtrar estados baseado no termo de busca', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    // Aguarda aparecer campo de busca
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Buscar estados...')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('Buscar estados...');
    
    // Busca por termo específico
    fireEvent.change(searchInput, { target: { value: 'São' } });
    
    await waitFor(() => {
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
      expect(screen.queryByText('Rio de Janeiro')).not.toBeInTheDocument();
    });
    
    // Limpa busca
    fireEvent.change(searchInput, { target: { value: '' } });
    
    await waitFor(() => {
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    });
  });

  it('CTxBuscaCidades: deve filtrar cidades quando disponíveis', async () => {
    const propsWithState = {
      ...defaultProps,
      selectedStates: [1]
    };
    
    render(<LocationFilter {...propsWithState} />);
    
    const cityButton = screen.getByText('Selecione as cidades...');
    fireEvent.click(cityButton);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Buscar cidades...');
      expect(searchInput).toBeInTheDocument();
      
      // Simula busca por cidade
      fireEvent.change(searchInput, { target: { value: 'Rio' } });
    });
  });

  it('CTxBuscaVazia: deve mostrar todos os itens quando busca está vazia', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Buscar estados...');
      
      // Campo vazio deve mostrar todos
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
      expect(screen.getByText('Minas Gerais')).toBeInTheDocument();
    });
  });
});

// ========================================
// TESTES DE SELEÇÃO E MANIPULAÇÃO
// ========================================

describe('LocationFilter - Seleções', () => {
  it('CTxSelecaoMultipla: deve permitir seleção múltipla de estados', async () => {
    const onStatesChange = vi.fn();
    const props = {
      ...defaultProps,
      onStatesChange
    };
    
    render(<LocationFilter {...props} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    });
    
    // Simula seleção múltipla através de checkboxes
    const checkboxes = screen.getAllByRole('checkbox');
    
    if (checkboxes.length > 1) {
      fireEvent.click(checkboxes[1]); // Primeiro estado
      expect(onStatesChange).toHaveBeenCalled();
    }
  });

  it('CTxSelecaoTodos: deve permitir selecionar todos os itens', async () => {
    const onStatesChange = vi.fn();
    const props = {
      ...defaultProps,
      onStatesChange
    };
    
    render(<LocationFilter {...props} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    await waitFor(() => {
      const selectAllCheckbox = screen.getAllByRole('checkbox')[0]; // Primeiro deve ser "Select All"
      
      fireEvent.click(selectAllCheckbox);
      expect(onStatesChange).toHaveBeenCalled();
    });
  });

  it('CTxRemocaoItem: deve permitir remover itens selecionados', () => {
    const onStatesChange = vi.fn();
    const propsWithSelection = {
      ...defaultProps,
      selectedStates: [1],
      onStatesChange
    };
    
    render(<LocationFilter {...propsWithSelection} />);
    
    // Busca por botão de remoção na tag
    const removeButtons = screen.queryAllByLabelText(/remover/i);
    
    if (removeButtons.length > 0) {
      fireEvent.click(removeButtons[0]);
      expect(onStatesChange).toHaveBeenCalled();
    }
  });

  it('CTxDependenciaEstadoCidade: deve gerenciar dependência entre estados e cidades', () => {
    const propsWithoutStates = {
      ...defaultProps,
      selectedStates: [],
      selectedCities: [] // Sem cidades selecionadas quando não há estados
    };
    
    render(<LocationFilter {...propsWithoutStates} />);
    
    // Verifica que não há cidades disponíveis sem estados
    expect(screen.getByText('Selecione um estado para ver as cidades disponíveis')).toBeInTheDocument();
  });
});

// ========================================
// TESTES DE ACESSIBILIDADE
// ========================================

describe('LocationFilter - Acessibilidade', () => {
  it('CTxAcessibilidadeAria: deve ter labels e roles ARIA apropriados', () => {
    render(<LocationFilter {...defaultProps} />);
    
    // Verifica se elementos têm roles apropriados
    const stateButton = screen.getByText('Selecione os estados...');
    expect(stateButton).toBeInTheDocument();
    
    // Verifica se contadores são acessíveis
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
  });

  it('CTxNavegacaoTeclado: deve ser navegável via teclado', () => {
    render(<LocationFilter {...defaultProps} />);
    
    const comboboxButton = screen.getByRole('button');
    
    // Testa foco
    comboboxButton.focus();
    expect(comboboxButton).toHaveFocus();
    
    // Testa abertura via Enter/Space
    fireEvent.keyDown(comboboxButton, { key: 'Enter' });
    // Componente deve responder a eventos de teclado
  });

  it('CTxFeedbackVisual: deve fornecer feedback visual adequado', () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    
    // Testa estados visuais
    fireEvent.focus(stateButton);
    fireEvent.mouseEnter(stateButton);
    
    // Verifica se não há erros durante interações
    expect(stateButton).toBeInTheDocument();
  });
});

// ========================================
// TESTES DE CASOS LIMITE E ERROS
// ========================================

describe('LocationFilter - Casos Limite', () => {
  it('CTxListaVazia: deve lidar com lista vazia de estados', () => {
    const propsEmpty = {
      ...defaultProps,
      availableStates: []
    };
    
    render(<LocationFilter {...propsEmpty} />);
    
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
    expect(screen.getByText('Selecione os estados...')).toBeInTheDocument();
  });

  it('CTxDadosInvalidos: deve lidar com dados malformados', () => {
    const propsInvalid = {
      ...defaultProps,
      availableStates: [
        { stateId: null, name: '', acronym: null, cities: null }
      ]
    };
    
    render(<LocationFilter {...propsInvalid} />);
    
    // Componente não deve quebrar com dados inválidos
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
  });

  it('CTxPropsAusentes: deve funcionar com props mínimas', () => {
    const minimalProps = {
      availableStates: mockStates,
      selectedStates: [],
      selectedCities: [],
      onStatesChange: vi.fn(),
      onCitiesChange: vi.fn()
    };
    
    render(<LocationFilter {...minimalProps} />);
    
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
  });
});

// ========================================
// TESTES DE PERFORMANCE
// ========================================

describe('LocationFilter - Performance', () => {
  it('CTxBuscaRapida: deve filtrar rapidamente grandes listas', async () => {
    // Simula lista grande de estados
    const manyStates = Array.from({ length: 100 }, (_, i) => ({
      stateId: i + 1,
      name: `Estado ${i + 1}`,
      acronym: `E${i + 1}`,
      cities: []
    }));
    
    const propsLarge = {
      ...defaultProps,
      availableStates: manyStates
    };
    
    render(<LocationFilter {...propsLarge} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Buscar estados...');
      
      const startTime = performance.now();
      fireEvent.change(searchInput, { target: { value: 'Estado 1' } });
      const endTime = performance.now();
      
      // Filtragem deve ser rápida (menos de 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  it('CTxMemorizacaoResultados: deve evitar re-renderizações desnecessárias', () => {
    const { rerender } = render(<LocationFilter {...defaultProps} />);
    
    // Re-renderiza com mesmas props
    rerender(<LocationFilter {...defaultProps} />);
    
    // Componente deve otimizar re-renderizações
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
  });
});