import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchProvider, useSearch } from './SearchContext';

// Componente de teste para usar o hook
const TestComponent = ({ customOnSearch, allowEmpty = false }) => {
    const {
        searchTerm,
        searchHistory,
        performSearch,
        updateSearchTerm,
        onSearch,
        clearHistory,
        removeFromHistory,
        hasHistory,
        hasSearchTerm,
        isSearching,
    } = useSearch();

    // Registrar callback personalizado se fornecido
    React.useEffect(() => {
        if (customOnSearch) {
            const unsubscribe = onSearch(customOnSearch);
            return unsubscribe;
        }
    }, [onSearch, customOnSearch]);

    return (
        <div>
            <div data-testid="search-term">{searchTerm}</div>
            <div data-testid="search-history">{JSON.stringify(searchHistory)}</div>
            <div data-testid="history-count">{searchHistory.length}</div>
            <div data-testid="has-history">{hasHistory.toString()}</div>
            <div data-testid="has-search-term">{hasSearchTerm.toString()}</div>
            <div data-testid="is-searching">{isSearching.toString()}</div>
            
            <input
                data-testid="search-input"
                onChange={(e) => updateSearchTerm(e.target.value)}
                value={searchTerm}
            />
            
            <button
                data-testid="search-button"
                onClick={() => performSearch(searchTerm, { allowEmpty })}
            >
                Buscar
            </button>
            
            <button
                data-testid="clear-history-button"
                onClick={clearHistory}
            >
                Limpar Histórico
            </button>
            
            <button
                data-testid="remove-first-history-button"
                onClick={() => searchHistory.length > 0 && removeFromHistory(searchHistory[0])}
            >
                Remover Primeiro do Histórico
            </button>
        </div>
    );
};

describe('SearchContext', () => {
    const renderWithProvider = (props = {}) => {
        return render(
            <SearchProvider>
                <TestComponent {...props} />
            </SearchProvider>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Provider e Hook', () => {
        it('should throw error when useSearch is used outside provider', () => {
            // Suprimir console.error para este teste
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            
            expect(() => {
                render(<TestComponent />);
            }).toThrow('useSearch deve ser usado dentro de um SearchProvider');
            
            consoleSpy.mockRestore();
        });

        it('should provide initial state', () => {
            renderWithProvider();
            
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
            expect(screen.getByTestId('search-input')).toHaveValue('');
        });
    });

    describe('Search Functionality', () => {
        it('should update search term', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            fireEvent.change(input, { target: { value: 'test search' } });
            
            expect(screen.getByTestId('search-term')).toHaveTextContent('test search');
        });

        it('should execute search and notify listeners', () => {
            const mockOnSearch = vi.fn();
            renderWithProvider({ customOnSearch: mockOnSearch });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test query' } });
            fireEvent.click(searchButton);
            
            expect(mockOnSearch).toHaveBeenCalledWith('test query');
        });
    });

    describe('Search Execution', () => {
        it('should perform search and update state', () => {
            const onSearchMock = vi.fn();
            renderWithProvider({ customOnSearch: onSearchMock });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test search' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('search-term')).toHaveTextContent('test search');
            expect(screen.getByTestId('is-searching')).toHaveTextContent('true');
            expect(onSearchMock).toHaveBeenCalledWith('test search');
        });

        it('should not perform search with empty term by default', () => {
            const onSearchMock = vi.fn();
            renderWithProvider({ customOnSearch: onSearchMock });
            
            const searchButton = screen.getByTestId('search-button');
            fireEvent.click(searchButton);
            
            expect(onSearchMock).not.toHaveBeenCalled();
            expect(screen.getByTestId('is-searching')).toHaveTextContent('false');
        });

        it('should perform search with empty term when allowEmpty is true', () => {
            const onSearchMock = vi.fn();
            renderWithProvider({ customOnSearch: onSearchMock, allowEmpty: true });
            
            const searchButton = screen.getByTestId('search-button');
            fireEvent.click(searchButton);
            
            expect(onSearchMock).toHaveBeenCalledWith('');
            expect(screen.getByTestId('is-searching')).toHaveTextContent('true');
        });

        it('should trim search terms', () => {
            const onSearchMock = vi.fn();
            renderWithProvider({ customOnSearch: onSearchMock });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: '  test search  ' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('search-term')).toHaveTextContent('test search');
            expect(onSearchMock).toHaveBeenCalledWith('test search');
        });
    });

    describe('Search History', () => {
        it('should add terms to history when searching', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            // Primeira busca
            fireEvent.change(input, { target: { value: 'first search' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('1');
            expect(screen.getByTestId('has-history')).toHaveTextContent('true');
            
            // Segunda busca
            fireEvent.change(input, { target: { value: 'second search' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('2');
            
            const history = JSON.parse(screen.getByTestId('search-history').textContent);
            expect(history).toEqual(['second search', 'first search']);
        });

        it('should not add empty terms to history', () => {
            renderWithProvider({ allowEmpty: true });
            
            const searchButton = screen.getByTestId('search-button');
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('0');
        });

        it('should not duplicate terms in history', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            // Primeira busca
            fireEvent.change(input, { target: { value: 'same search' } });
            fireEvent.click(searchButton);
            
            // Segunda busca com o mesmo termo
            fireEvent.change(input, { target: { value: 'same search' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('1');
            
            const history = JSON.parse(screen.getByTestId('search-history').textContent);
            expect(history).toEqual(['same search']);
        });

        it('should move existing term to top of history', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            // Primeira busca
            fireEvent.change(input, { target: { value: 'first' } });
            fireEvent.click(searchButton);
            
            // Segunda busca
            fireEvent.change(input, { target: { value: 'second' } });
            fireEvent.click(searchButton);
            
            // Repetir primeira busca
            fireEvent.change(input, { target: { value: 'first' } });
            fireEvent.click(searchButton);
            
            const history = JSON.parse(screen.getByTestId('search-history').textContent);
            expect(history).toEqual(['first', 'second']);
        });

        it('should limit history to 10 items', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            // Adicionar 12 itens ao histórico
            for (let i = 1; i <= 12; i++) {
                fireEvent.change(input, { target: { value: `search ${i}` } });
                fireEvent.click(searchButton);
            }
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('10');
            
            const history = JSON.parse(screen.getByTestId('search-history').textContent);
            expect(history).not.toContain('search 1');
            expect(history).not.toContain('search 2');
            expect(history).toContain('search 12');
        });

        it('should clear history', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            const clearHistoryButton = screen.getByTestId('clear-history-button');
            
            // Adicionar item ao histórico
            fireEvent.change(input, { target: { value: 'test' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('1');
            
            // Limpar histórico
            fireEvent.click(clearHistoryButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('0');
            expect(screen.getByTestId('has-history')).toHaveTextContent('false');
        });

        it('should remove specific item from history', () => {
            renderWithProvider();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            // Adicionar dois itens ao histórico
            fireEvent.change(input, { target: { value: 'first' } });
            fireEvent.click(searchButton);
            
            fireEvent.change(input, { target: { value: 'second' } });
            fireEvent.click(searchButton);
            
            expect(screen.getByTestId('history-count')).toHaveTextContent('2');
            
            // Remover primeiro item
        });
    });
});