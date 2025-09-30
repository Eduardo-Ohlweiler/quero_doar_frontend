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
    const [userInteracting, setUserInteracting] = useState(false);
    const [lastUrlSync, setLastUrlSync] = useState('');
    const [userIntentionallyClearedField, setUserIntentionallyClearedField] = useState(false);

    // Sincronizar valor local com o contexto apenas se não está interagindo e não limpou intencionalmente
    useEffect(() => {
        if (!userInteracting && !userIntentionallyClearedField) {
            setLocalValue(searchTerm);
        }
    }, [searchTerm, userInteracting, userIntentionallyClearedField]);

    // Sincronizar com parâmetros da URL se habilitado
    useEffect(() => {
        if (syncWithUrl && !userInteracting && !userIntentionallyClearedField) {
            const urlParams = new URLSearchParams(location.search);
            const urlSearchTerm = urlParams.get('q') || '';
            
            // Só sincroniza se a URL realmente mudou para um valor diferente
            // e não é resultado de uma interação do usuário
            if (urlSearchTerm !== lastUrlSync && urlSearchTerm !== searchTerm) {
                if (urlSearchTerm) {
                    // Nova busca via URL
                    updateSearchTerm(urlSearchTerm);
                    setLocalValue(urlSearchTerm);
                    setLastUrlSync(urlSearchTerm);
                } else if (!localValue && !searchTerm) {
                    // URL sem parâmetro e campos vazios - tudo ok
                    setLastUrlSync('');
                }
            } else if (!localValue && !searchTerm && urlSearchTerm) {
                // Primeira carga da página com parâmetro q
                updateSearchTerm(urlSearchTerm);
                setLocalValue(urlSearchTerm);
                setLastUrlSync(urlSearchTerm);
            }
        }
    }, [location.search, syncWithUrl, searchTerm, updateSearchTerm, localValue, userInteracting, lastUrlSync, userIntentionallyClearedField]);

    // Reset do flag userInteracting após um delay mais longo
    useEffect(() => {
        if (userInteracting) {
            const timeout = setTimeout(() => {
                setUserInteracting(false);
            }, 1000); // Delay ainda maior para garantir que não há re-sincronização
            return () => clearTimeout(timeout);
        }
    }, [userInteracting]);

    // Reset do flag de limpeza intencional quando usuário digita algo novo
    useEffect(() => {
        if (localValue && userIntentionallyClearedField) {
            setUserIntentionallyClearedField(false);
        }
    }, [localValue, userIntentionallyClearedField]);

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
        
        // Marcar que usuário está interagindo
        setUserInteracting(true);
        
        // Se usuário apagou tudo, marcar como limpeza intencional
        if (newValue === '' && localValue !== '') {
            setUserIntentionallyClearedField(true);
        } else if (newValue !== '') {
            // Se digitou algo novo, resetar flag de limpeza
            setUserIntentionallyClearedField(false);
        }
        
        setLocalValue(newValue);
        
        // Atualizar o contexto
        updateSearchTerm(newValue);
    }, [updateSearchTerm, localValue]);

    // Função para limpar a busca
    const handleClear = useCallback(() => {
        setUserInteracting(true);
        setUserIntentionallyClearedField(true); // Marcar limpeza intencional
        setLocalValue('');
        updateSearchTerm('');
        setLastUrlSync(''); // Reset do tracking de URL
        
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