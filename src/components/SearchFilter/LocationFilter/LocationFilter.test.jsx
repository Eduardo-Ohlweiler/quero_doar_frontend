import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import LocationFilter from './LocationFilter';

describe('LocationFilter', () => {
  const mockStates = [
    {
      stateId: 1,
      name: 'Rio de Janeiro',
      cities: [
        { cityId: 1, name: 'Rio de Janeiro' },
        { cityId: 2, name: 'Niterói' },
        { cityId: 3, name: 'Petrópolis' }
      ]
    },
    {
      stateId: 2,
      name: 'São Paulo',
      cities: [
        { cityId: 4, name: 'São Paulo' },
        { cityId: 5, name: 'Campinas' },
        { cityId: 6, name: 'Santos' }
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

  it('should render states combobox', () => {
    render(<LocationFilter {...defaultProps} />);
    
    expect(screen.getByText('Estados (0 selecionados)')).toBeInTheDocument();
    expect(screen.getByText('Selecione os estados...')).toBeInTheDocument();
  });

  it('should show cities section when states are selected', () => {
    render(<LocationFilter {...defaultProps} selectedStates={[1]} />);
    
    expect(screen.getByText('Cidades (0 selecionadas)')).toBeInTheDocument();
  });

  it('should toggle dropdown when clicking the button', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    
    // Should be closed initially
    expect(screen.queryByText('Rio de Janeiro')).not.toBeInTheDocument();
    
    // Click to open
    fireEvent.click(stateButton);
    await waitFor(() => {
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
    });
    
    // Click to close
    fireEvent.click(stateButton);
    await waitFor(() => {
      expect(screen.queryByText('Rio de Janeiro')).not.toBeInTheDocument();
    });
  });

  it('should show state counter in header', () => {
    render(<LocationFilter {...defaultProps} selectedStates={[1, 2]} />);
    
    expect(screen.getByText('Estados (2 selecionados)')).toBeInTheDocument();
  });

  it('should show city counter in header', () => {
    render(
      <LocationFilter 
        {...defaultProps} 
        selectedStates={[1]} 
        selectedCities={[1, 2]} 
      />
    );
    
    expect(screen.getByText('Cidades (2 selecionadas)')).toBeInTheDocument();
  });

  it('should render with Select All functionality', async () => {
    render(<LocationFilter {...defaultProps} />);
    
    const stateButton = screen.getByText('Selecione os estados...');
    fireEvent.click(stateButton);
    
    await waitFor(() => {
      expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
      expect(screen.getByText('São Paulo')).toBeInTheDocument();
    });
    
    // Verificar que temos checkboxes para seleção
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThanOrEqual(3); // Select All + 2 states
  });

  it('should display counters correctly with selections', () => {
    const props = {
      ...defaultProps,
      selectedStates: [1, 2],
      selectedCities: [1, 2]
    };
    
    render(<LocationFilter {...props} />);
    
    expect(screen.getByText('Estados (2 selecionados)')).toBeInTheDocument();
    expect(screen.getByText('Cidades (2 selecionadas)')).toBeInTheDocument();
  });

  it('should show tags for selected states', () => {
    render(<LocationFilter {...defaultProps} selectedStates={[1]} />);
    
    expect(screen.getByText('Estados selecionados:')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro')).toBeInTheDocument();
  });

  it('should show tags for selected cities', () => {
    const props = {
      ...defaultProps,
      selectedStates: [1],
      selectedCities: [1]
    };
    
    render(<LocationFilter {...props} />);
    
    expect(screen.getByText('Cidades selecionadas:')).toBeInTheDocument();
    expect(screen.getByText('Rio de Janeiro, Rio de Janeiro')).toBeInTheDocument();
  });

  it('should handle city dropdown interaction', async () => {
    const props = {
      ...defaultProps,
      selectedStates: [1]
    };
    
    render(<LocationFilter {...props} />);
    
    const cityButton = screen.getByText('Selecione as cidades...');
    
    // Initially closed
    expect(screen.queryByPlaceholderText('Buscar cidades...')).not.toBeInTheDocument();
    
    // Open dropdown
    fireEvent.click(cityButton);
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Buscar cidades...')).toBeInTheDocument();
    });
  });
});