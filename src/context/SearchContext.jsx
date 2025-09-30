import React, { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// Criação do Context
const SearchContext = createContext();

// Hook customizado para usar o SearchContext
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch deve ser usado dentro de um SearchProvider');
    }
    return context;
};

// Provider do SearchContext
export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchListeners, setSearchListeners] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Função para registrar listener para quando busca for executada
    const onSearch = useCallback((callback) => {
        setSearchListeners(prev => [...prev, callback]);
        
        // Retorna função para desregistrar
        return () => {
            setSearchListeners(prev => prev.filter(listener => listener !== callback));
        };
    }, []);

    // Função para executar uma busca
    const performSearch = useCallback((term, options = {}) => {
        const trimmedTerm = term?.trim() || '';
        
        if (!trimmedTerm && !options.allowEmpty) {
            setIsSearching(false);
            return;
        }

        setSearchTerm(trimmedTerm);
        setIsSearching(true);

        // Adicionar ao histórico se não for vazio e não for uma repetição imediata
        if (trimmedTerm && searchHistory[0] !== trimmedTerm) {
            setSearchHistory(prev => {
                const newHistory = [trimmedTerm, ...prev.filter(item => item !== trimmedTerm)];
                // Manter apenas os últimos 10 itens do histórico
                return newHistory.slice(0, 10);
            });
        }

        // Notificar todos os listeners sobre a busca
        if (trimmedTerm || options.allowEmpty) {
            searchListeners.forEach(listener => {
                try {
                    listener(trimmedTerm);
                } catch (error) {
                    console.error('Erro no listener de busca:', error);
                }
            });
        }

        // Callback adicional se fornecido
        if (options.onSearch) {
            options.onSearch(trimmedTerm);
        }
    }, [searchHistory, searchListeners]);

    // Função para limpar a busca
    const clearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    // Função para atualizar o termo de busca sem executar a busca
    const updateSearchTerm = useCallback((term) => {
        setSearchTerm(term || '');
    }, []);

    // Função para limpar o histórico
    const clearHistory = useCallback(() => {
        setSearchHistory([]);
    }, []);

    // Função para remover um item do histórico
    const removeFromHistory = useCallback((term) => {
        setSearchHistory(prev => prev.filter(item => item !== term));
    }, []);

    const value = {
        // Estado
        searchTerm,
        searchHistory,
        isSearching,
        
        // Ações
        performSearch,
        clearSearch,
        updateSearchTerm,
        clearHistory,
        removeFromHistory,
        onSearch,
        
        // Propriedades computadas
        hasSearchTerm: Boolean(searchTerm?.trim()),
        hasHistory: searchHistory.length > 0,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SearchContext;