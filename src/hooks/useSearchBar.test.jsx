import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { SearchProvider } from '../context/SearchContext';
import { useSearchBar } from './useSearchBar';

// Mock do react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Componente de teste para usar o hook
const TestComponent = ({ options = {} }) => {
    const searchBarProps = useSearchBar(options);

    return (
        <div>
            <input
                data-testid="search-input"
                value={searchBarProps.value}
                onChange={searchBarProps.onChange}
            />
            <button
                data-testid="search-button"
                onClick={() => searchBarProps.onSearch(searchBarProps.value)}
            >
                Buscar
            </button>
            <button
                data-testid="clear-button"
                onClick={searchBarProps.clear}
            >
                Limpar
            </button>
            <div data-testid="search-term">{searchBarProps.searchTerm}</div>
            <div data-testid="has-search-term">{searchBarProps.hasSearchTerm ? 'true' : 'false'}</div>
        </div>
    );
};

describe('useSearchBar', () => {
    const renderWithProviders = (initialEntries = ['/'], options = {}) => {
        return render(
            <MemoryRouter initialEntries={initialEntries}>
                <SearchProvider>
                    <TestComponent options={options} />
                </SearchProvider>
            </MemoryRouter>
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Basic Functionality', () => {
        it('should provide initial state', () => {
            renderWithProviders();
            
            expect(screen.getByTestId('search-input')).toHaveValue('');
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
            expect(screen.getByTestId('has-search-term')).toHaveTextContent('false');
        });

        it('should update local value on input change', () => {
            renderWithProviders();
            
            const input = screen.getByTestId('search-input');
            fireEvent.change(input, { target: { value: 'test search' } });
            
            expect(input).toHaveValue('test search');
        });

        it('should clear local value when empty', () => {
            renderWithProviders();
            
            const input = screen.getByTestId('search-input');
            fireEvent.change(input, { target: { value: 'test' } });
            expect(input).toHaveValue('test');
            
            fireEvent.change(input, { target: { value: '' } });
            expect(input).toHaveValue('');
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
        });
    });

    describe('Search Execution', () => {
        it('should execute search and navigate by default', () => {
            renderWithProviders();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test search' } });
            fireEvent.click(searchButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/search?q=test%20search');
        });

        it('should not navigate when navigateOnSearch is false', () => {
            renderWithProviders(['/'], { navigateOnSearch: false });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test search' } });
            fireEvent.click(searchButton);
            
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        it('should use custom search route', () => {
            renderWithProviders(['/'], { searchRoute: '/custom-search' });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test' } });
            fireEvent.click(searchButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/custom-search?q=test');
        });

        it('should call custom onSearch callback', () => {
            const customOnSearch = vi.fn();
            renderWithProviders(['/'], { 
                navigateOnSearch: false,
                onSearch: customOnSearch 
            });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test search' } });
            fireEvent.click(searchButton);
            
            expect(customOnSearch).toHaveBeenCalledWith('test search');
        });

        it('should trim search terms', () => {
            const customOnSearch = vi.fn();
            renderWithProviders(['/'], { 
                navigateOnSearch: false,
                onSearch: customOnSearch 
            });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: '  test search  ' } });
            fireEvent.click(searchButton);
            
            expect(customOnSearch).toHaveBeenCalledWith('test search');
        });

        it('should navigate to search route without q param with empty search terms', () => {
            renderWithProviders();
            
            const searchButton = screen.getByTestId('search-button');
            fireEvent.click(searchButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/search');
        });

        it('should allow empty search execution for general search', () => {
            const customOnSearch = vi.fn();
            renderWithProviders(['/'], {
                navigateOnSearch: false,
                onSearch: customOnSearch
            });
            
            const searchButton = screen.getByTestId('search-button');
            fireEvent.click(searchButton);
            
            expect(customOnSearch).toHaveBeenCalledWith('');
        });

        it('should navigate to search route without q param with whitespace-only search terms', () => {
            renderWithProviders();
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: '   ' } });
            fireEvent.click(searchButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/search');
        });
    });

    describe('URL Synchronization', () => {
        it('should sync with URL search params by default', () => {
            renderWithProviders(['/search?q=url+search']);
            
            expect(screen.getByTestId('search-input')).toHaveValue('url search');
            expect(screen.getByTestId('search-term')).toHaveTextContent('url search');
            expect(screen.getByTestId('has-search-term')).toHaveTextContent('true');
        });

        it('should not sync with URL when syncWithUrl is false', () => {
            renderWithProviders(['/search?q=url+search'], { syncWithUrl: false });
            
            expect(screen.getByTestId('search-input')).toHaveValue('');
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
        });

        it('should handle empty URL search params', () => {
            renderWithProviders(['/search?q=']);
            
            expect(screen.getByTestId('search-input')).toHaveValue('');
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
            expect(screen.getByTestId('has-search-term')).toHaveTextContent('false');
        });

        it('should handle URL without search params', () => {
            renderWithProviders(['/search']);
            
            expect(screen.getByTestId('search-input')).toHaveValue('');
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
        });
    });

    describe('Clear Functionality', () => {
        it('should clear search values', () => {
            renderWithProviders();
            
            const input = screen.getByTestId('search-input');
            const clearButton = screen.getByTestId('clear-button');
            
            // Definir um valor
            fireEvent.change(input, { target: { value: 'test search' } });
            expect(input).toHaveValue('test search');
            
            // Limpar
            fireEvent.click(clearButton);
            expect(input).toHaveValue('');
            expect(screen.getByTestId('search-term')).toHaveTextContent('');
        });

        it('should navigate to clear URL params when on search route', () => {
            renderWithProviders(['/search?q=test&other=param'], { searchRoute: '/search' });
            
            const clearButton = screen.getByTestId('clear-button');
            fireEvent.click(clearButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/search?other=param', { replace: true });
        });

        it('should navigate to search route without params when no other params', () => {
            renderWithProviders(['/search?q=test'], { searchRoute: '/search' });
            
            const clearButton = screen.getByTestId('clear-button');
            fireEvent.click(clearButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/search', { replace: true });
        });

        it('should perform empty search and navigate without q param', () => {
            renderWithProviders(['/']);
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'test' } });
            fireEvent.change(input, { target: { value: '' } });
            fireEvent.click(searchButton);
            
            expect(mockNavigate).toHaveBeenCalledWith('/search');
        });
    });



    describe('Integration with SearchContext', () => {
        it('should execute search and update context', () => {
            const customOnSearch = vi.fn();
            renderWithProviders(['/'], { 
                navigateOnSearch: false,
                onSearch: customOnSearch 
            });
            
            const input = screen.getByTestId('search-input');
            const searchButton = screen.getByTestId('search-button');
            
            fireEvent.change(input, { target: { value: 'context test' } });
            fireEvent.click(searchButton);
            
            // Verificar que a busca foi executada
            expect(customOnSearch).toHaveBeenCalledWith('context test');
        });

        it('should reflect context changes in local value', () => {
            renderWithProviders(['/search?q=initial+search']);
            
            expect(screen.getByTestId('search-input')).toHaveValue('initial search');
            expect(screen.getByTestId('search-term')).toHaveTextContent('initial search');
        });
    });
});