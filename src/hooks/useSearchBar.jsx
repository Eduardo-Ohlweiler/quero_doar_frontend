import { useState, useEffect, useCallback } from 'react';
import { useSearch } from '../context/SearchContext';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook personalizado para integrar o SearchBar com o SearchContext
 * @param {Object} options - Opções de configuração
 * @param {boolean} options.navigateOnSearch - Se deve navegar para a página de busca automaticamente
 * @param {string} options.searchRoute - Rota para navegar quando uma busca for executada
 * @param {boolean} options.syncWithUrl - Se deve sincronizar com parâmetros da URL
 * @param {Function} options.onSearch - Callback customizado para quando uma busca for executada
 * @returns {Object} Propriedades e funções para usar com o SearchBar
 */
export const useSearchBar = (options = {}) => {
    const {
        navigateOnSearch = true,
        searchRoute = '/search',
        syncWithUrl = true,
        onSearch: customOnSearch,
    } = options;

    const navigate = useNavigate();
    const location = useLocation();
    const {
        searchTerm,
        performSearch,
        updateSearchTerm,
    } = useSearch();

    const [localValue, setLocalValue] = useState('');

    // Sincronizar valor local com o contexto
    useEffect(() => {
        setLocalValue(searchTerm);
    }, [searchTerm]);

    // Sincronizar com parâmetros da URL se habilitado
    useEffect(() => {
        if (syncWithUrl) {
            const urlParams = new URLSearchParams(location.search);
            const urlSearchTerm = urlParams.get('q') || '';
            
            if (urlSearchTerm !== searchTerm) {
                updateSearchTerm(urlSearchTerm);
                setLocalValue(urlSearchTerm);
            }
        }
    }, [location.search, syncWithUrl, searchTerm, updateSearchTerm]);

    // Função para executar a busca
    const handleSearch = useCallback((term) => {
        const searchTerm = term?.trim() || '';
        
        // Executar callback customizado se fornecido
        if (customOnSearch) {
            customOnSearch(searchTerm);
        }

        // Navegar para página de busca se habilitado
        if (navigateOnSearch && searchTerm) {
            const searchParams = new URLSearchParams();
            searchParams.set('q', searchTerm);
            navigate(`${searchRoute}?${searchParams.toString()}`);
        }

        // Executar busca no contexto - listeners serão notificados automaticamente
        performSearch(searchTerm);
    }, [customOnSearch, performSearch, navigateOnSearch, navigate, searchRoute]);

    // Função para tratar mudanças no input
    const handleChange = useCallback((e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        
        // Atualizar o contexto sem executar busca
        if (newValue === '') {
            updateSearchTerm('');
        }
    }, [updateSearchTerm]);

    // Função para limpar a busca
    const handleClear = useCallback(() => {
        setLocalValue('');
        updateSearchTerm('');
        
        if (syncWithUrl && location.pathname === searchRoute) {
            // Remove o parâmetro de busca da URL
            const newParams = new URLSearchParams(location.search);
            newParams.delete('q');
            const newSearch = newParams.toString();
            navigate(`${searchRoute}${newSearch ? `?${newSearch}` : ''}`, { replace: true });
        }
    }, [updateSearchTerm, syncWithUrl, location, searchRoute, navigate]);

    return {
        // Propriedades para o SearchBar
        value: localValue,
        
        // Handlers para o SearchBar
        onChange: handleChange,
        onSearch: handleSearch,
        
        // Funções utilitárias
        clear: handleClear,
        
        // Estado do contexto
        searchTerm,
        hasSearchTerm: Boolean(searchTerm?.trim()),
    };
};