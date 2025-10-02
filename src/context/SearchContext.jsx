import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const SearchContext = createContext(undefined);

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const listenersRef = useRef([]);

    const updateSearchTerm = useCallback((term) => {
        setSearchTerm(term || '');
    }, []);

    const performSearch = useCallback((term) => {
        const trimmedTerm = term?.trim() || '';
        
        setSearchTerm(trimmedTerm);

        if (trimmedTerm && searchHistory[0] !== trimmedTerm) {
            setSearchHistory(prev => {
                const newHistory = [trimmedTerm, ...prev.filter(item => item !== trimmedTerm)];
                return newHistory.slice(0, 10);
            });
        }

        listenersRef.current.forEach(listener => {
            try {
                listener(trimmedTerm);
            } catch (error) {
                if (process.env.NODE_ENV === 'development') {
                    console.error('Search listener error:', error);
                }
            }
        });
    }, [searchHistory]);

    const onSearch = useCallback((callback) => {
        if (typeof callback !== 'function') {
            if (process.env.NODE_ENV === 'development') {
                console.error('Search listener must be a function');
            }
            return () => {};
        }

        listenersRef.current.push(callback);
        
        return () => {
            listenersRef.current = listenersRef.current.filter(listener => listener !== callback);
        };
    }, []);

    const clearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    const clearHistory = useCallback(() => {
        setSearchHistory([]);
    }, []);

    const removeFromHistory = useCallback((term) => {
        setSearchHistory(prev => prev.filter(item => item !== term));
    }, []);

    const value = {
        searchTerm,
        searchHistory,
        isSearching: Boolean(searchTerm?.trim()),
        hasSearchTerm: Boolean(searchTerm?.trim()),
        hasHistory: searchHistory.length > 0,
        performSearch,
        clearSearch,
        updateSearchTerm,
        clearHistory,
        removeFromHistory,
        onSearch,
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