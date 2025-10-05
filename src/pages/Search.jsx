import SearchFilter from "../components/SearchFilter/SearchFilter";
import SearchPreview from "../components/SearchPreview/SearchPreview";
import { useState, useEffect, useRef, use } from "react";
import { useSearch } from "../context/SearchContext";

import locationService from "../services/location/locationService";
import categoryService from "../services/category/categoryService";
import donationService from "../services/donation/donationService";

export default function Search() {
    const { searchTerm, onSearch } = useSearch();
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [donations, setDonations] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
    const [donationFilter, setDonationFilter] = useState({
        donationTypes: [],          // Lista de IDs (números)
        accessTypes: [],            // Lista de IDs (números)
        selectedStates: [],         // Lista de Ids de estados selecionados
        selectedCities: [],         // Lista de Ids de cidades selecionadas
        selectedCategories: [],     // Lista de Ids de subcategorias selecionadas
        selectedDistance: null,     // ID da distância selecionada (número) ou null
        itemStates: [],             // Lista de Ids de tags (donationTagId)
        orderByDistance: false      // Ordenar por distância (booleano)
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        pageSize: 12,
        totalElements: 0,
        hasMoreItems: true
    });
    const handleSearchRef = useRef();


    const fetchStates = async () => {
        try {
            const data = await locationService.getStatesMinimal();
            setStates(data);
        } catch (error) {
            console.error("Erro ao buscar estados:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await categoryService.GetAllCategories();
            setCategories(data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const data = await donationService.GetAllTags();
            setTags(data);
        } catch (error) {
            console.error("Erro ao buscar tags:", error);
        }
    };

    useEffect(() => {
        // Fetch inicial
        (async () => {
            setLoading(true);
            await Promise.all([
                fetchStates(),
                fetchCategories(),
                fetchTags()
            ]);
            setLoading(false);
        })();

        // Inscreve no onSearch para reagir a buscas
        const unsubscribe = onSearch((term) => {
            handleSearchRef.current?.(term);
        }); 

        if(searchTerm) {
            handleSearch(searchTerm);
        }

        return () => {
            unsubscribe();
        };

    }, []);

    const fetchCitiesByStates = async (stateIds) => {
        try {
            const cities = await locationService.getCitiesByStateMinimal(stateIds);
            const stateIndex = states.findIndex(s => s.stateId === stateIds);
            if (stateIndex !== -1) {
                const updatedStates = [...states];
                updatedStates[stateIndex].cities = cities;
                setStates(updatedStates); 
            }
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
        }
    };

    const handleSearch = async (term) => {
        if(loading) {
            return;
        }

        setLoading(true);

        let search = term || searchTerm;

        try {
            const data = await donationService.SearchDonations(
                search,
                pagination.currentPage,
                pagination.pageSize,
                donationFilter,
                states
            );

            setDonations(data.elements);
            setPagination(prev => ({
                ...prev,
                totalElements: data.totalElements,
                hasMoreItems: (data.currentPage * data.pageSize) < data.totalElements
            }));
        } catch (error) {
            console.error("Erro ao buscar doações:", error);
            alert("Erro ao buscar doações. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [donationFilter]);

    useEffect(() => {
        handleSearchRef.current = handleSearch;
    }, [handleSearch]);

    const handleFilterByMyLocation = async () => {
        // TODO: Implementar funcionalidade
        // Obter localização
        // Definir filtro de localização
    }

    return (
        <section className="min-h-screen p-2 pt-16 bg-gradient-primary flex flex-row gap-2">
            <SearchFilter
                // Donations (fixo - não precisa passar props)
                donationTypes={donationFilter.donationTypes}
                onDonationTypesChange={(value) => setDonationFilter(prev => ({...prev, donationTypes: value}))}
                
                // Access (fixo - não precisa passar props)
                accessTypes={donationFilter.accessTypes}
                onAccessTypesChange={(value) => setDonationFilter(prev => ({...prev, accessTypes: value}))}
                
                // Location (dinâmico)
                availableStates={states}
                selectedStates={donationFilter.selectedStates}
                selectedCities={donationFilter.selectedCities}
                onStatesChange={(value) => setDonationFilter(prev => ({...prev, selectedStates: value}))}
                onCitiesChange={(value) => setDonationFilter(prev => ({...prev, selectedCities: value}))}
                onFetchCities={fetchCitiesByStates}
                onUseMyLocation={handleFilterByMyLocation}

                // Categories (dinâmico)
                categories={categories}
                selectedCategories={donationFilter.selectedCategories}
                onCategoriesChange={(value) => setDonationFilter(prev => ({...prev, selectedCategories: value}))}

                // Distance (fixo - não precisa passar props)
                selectedDistance={donationFilter.selectedDistance}
                onDistanceChange={(value) => setDonationFilter(prev => ({...prev, selectedDistance: value}))}

                // Item tags (dinâmico)
                availableItemStates={tags}
                itemStates={donationFilter.itemStates}
                onItemStatesChange={(value) => setDonationFilter(prev => ({...prev, itemStates: value}))}
            />
            <SearchPreview 
            
                searchTerm={searchTerm}
                isLoading={loading}
                donations={donations}
                totalResults={pagination.totalElements}
                itemsPerPage={pagination.pageSize}
                hasMoreItems={true}
                isWaiting={false}

                viewMode={viewMode}
                onViewModeChange={(mode) => {
                    setViewMode(mode);
                }}

                sortOptions={['Mais recentes', 'Mais perto']}
                selectedSort={'Mais recentes'}
                onSortChange={(option) => {
                    if(option === 'Mais perto') {
                        setDonationFilter(prev => ({...prev, orderByDistance: true}));
                    } else {
                        setDonationFilter(prev => ({...prev, orderByDistance: false}));
                    }
                }}

                

            
            />
        </section>
    )

}