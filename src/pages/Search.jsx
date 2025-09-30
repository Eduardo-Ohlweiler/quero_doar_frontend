import SearchFilter from "../components/SearchFilter/SearchFilter";
import SearchPreview from "../components/SearchPreview/SearchPreview";
import { useState, useEffect } from "react";

import locationService from "../services/location/locationService";
import categoryService from "../services/category/categoryService";

export default function Search() {

    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [donationFilter, setDonationFilter] = useState({
        donationTypes: [],          // "giver", "receiver"
        accessTypes: [],            // "public", "private"
        selectedStates: [],         // Lista de Ids de estados selecionados
        selectedCities: [],         // Lista de Ids de cidades selecionadas
        selectedCategories: [],     // Lista de Ids de subcategorias selecionadas
        selectedDistance: 'any',    // "any", "5km", "10km", "20km", "50km"
        itemStates: []              // Lista de Ids de tags 
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

    useEffect(() => {
        fetchStates();
        fetchCategories();
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
        // <section className="min-h-screen pt-20 bg-gray-100">
        <section className="min-h-screen p-2 pt-16 bg-gradient-primary flex flex-row gap-2">
            <SearchFilter
                // Donations
                donationTypes={donationFilter.donationTypes}
                onDonationTypesChange={(value) => setDonationFilter(prev => ({...prev, donationTypes: value}))}
                
                // Access
                accessTypes={donationFilter.accessTypes}
                onAccessTypesChange={(value) => setDonationFilter(prev => ({...prev, accessTypes: value}))}
                
                // Location
                availableStates={states}
                selectedStates={donationFilter.selectedStates}
                selectedCities={donationFilter.selectedCities}
                onStatesChange={(value) => setDonationFilter(prev => ({...prev, selectedStates: value}))}
                onCitiesChange={(value) => setDonationFilter(prev => ({...prev, selectedCities: value}))}
                onFetchCities={fetchCitiesByStates}

                // Categories
                categories={categories}
                selectedCategories={donationFilter.selectedCategories}
                onCategoriesChange={(value) => setDonationFilter(prev => ({...prev, selectedCategories: value}))}

                // Distance
                selectedDistance={donationFilter.selectedDistance}
                onDistanceChange={(value) => setDonationFilter(prev => ({...prev, selectedDistance: value}))}

                // Item States
                itemStates={donationFilter.itemStates}
                onItemStatesChange={(value) => setDonationFilter(prev => ({...prev, itemStates: value}))}
            />
            <SearchPreview />
        </section>
    )

}