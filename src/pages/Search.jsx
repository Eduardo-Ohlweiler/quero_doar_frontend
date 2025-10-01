import SearchFilter from "../components/SearchFilter/SearchFilter";
import SearchPreview from "../components/SearchPreview/SearchPreview";
import { useState, useEffect } from "react";

import locationService from "../services/location/locationService";
import categoryService from "../services/category/categoryService";
import donationService from "../services/donation/donationService";

export default function Search() {

    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [donationFilter, setDonationFilter] = useState({
        donationTypes: [],          // Lista de IDs (números)
        accessTypes: [],            // Lista de IDs (números)
        selectedStates: [],         // Lista de Ids de estados selecionados
        selectedCities: [],         // Lista de Ids de cidades selecionadas
        selectedCategories: [],     // Lista de Ids de subcategorias selecionadas
        selectedDistance: null,     // ID da distância selecionada (número) ou null
        itemStates: []              // Lista de Ids de tags (donationTagId)
    });

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
        fetchStates();
        fetchCategories();
        fetchTags();
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
            <SearchPreview />
        </section>
    )

}