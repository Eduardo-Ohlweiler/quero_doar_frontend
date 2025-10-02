import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearch } from '../context/SearchContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const useSearchBar = (options = {}) => {
    const {
        navigateOnSearch = true,
        searchRoute = '/search',
        syncWithUrl = true,
        onSearch: customOnSearch,
    } = options;

    const navigate = useNavigate();
    const location = useLocation();
    const { searchTerm, performSearch, updateSearchTerm } = useSearch();
    const [localValue, setLocalValue] = useState('');
    const isUserActionRef = useRef(false);

    useEffect(() => {
        if (!syncWithUrl || isUserActionRef.current) {
            isUserActionRef.current = false;
            return;
        }

        const urlParams = new URLSearchParams(location.search);
        const urlSearchTerm = urlParams.get('q') || '';

        if (urlSearchTerm !== localValue) {
            updateSearchTerm(urlSearchTerm);
            setLocalValue(urlSearchTerm);
        }
    }, [location.search, syncWithUrl, updateSearchTerm]);

    const handleSearch = useCallback((term) => {
        const trimmedTerm = term?.trim() || '';
        
        if (customOnSearch) {
            customOnSearch(trimmedTerm);
        }

        if (navigateOnSearch) {
            if (trimmedTerm) {
                navigate(`${searchRoute}?q=${encodeURIComponent(trimmedTerm)}`);
            } else {
                navigate(searchRoute);
            }
        }

        performSearch(trimmedTerm);
    }, [customOnSearch, performSearch, navigateOnSearch, navigate, searchRoute]);

    const handleChange = useCallback((e) => {
        const newValue = e.target.value;
        isUserActionRef.current = true;
        setLocalValue(newValue);
        updateSearchTerm(newValue);
    }, [updateSearchTerm]);

    const handleClear = useCallback(() => {
        isUserActionRef.current = true;
        setLocalValue('');
        updateSearchTerm('');
        
        if (syncWithUrl && location.pathname === searchRoute) {
            const newParams = new URLSearchParams(location.search);
            newParams.delete('q');
            const newSearch = newParams.toString();
            navigate(`${searchRoute}${newSearch ? `?${newSearch}` : ''}`, { replace: true });
        }
    }, [updateSearchTerm, syncWithUrl, location, searchRoute, navigate]);

    return {
        value: localValue,
        onChange: handleChange,
        onSearch: handleSearch,
        clear: handleClear,
        searchTerm,
        hasSearchTerm: Boolean(searchTerm?.trim()),
    };
};