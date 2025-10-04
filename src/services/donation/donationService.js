import apiService from "../apiService/apiService.js";
import LastDonationPreviewDTO from "./dto/LastDonationPreviewDTO";
import DonationTagDTO from "./dto/donationTagDTO.js";
import PagedResult from "../system/dto/PagedResult.js";

import { DONATION_TYPE_OPTIONS, ACCESS_TYPE_OPTIONS, DISTANCE_OPTIONS } from './constant/donationFilter';

//routes import
const GET_DONATION_PREVIEW_LAST_ROUTE = import.meta.env.VITE_GET_DONATION_PREVIEW_LAST_ROUTE || "/donation/preview/last";
const GET_TAG_PUBLIC_ALL_ROUTE = import.meta.env.VITE_GET_TAG_PUBLIC_ALL_ROUTE || "/tag/public/all";

const GET_DONATION_PUBLIC_SEARCH_ROUTE = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_ROUTE;
const GET_DONATION_PUBLIC_SEARCH_SEARCH_TERM_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_SEARCH_TERM_PARAM;
const GET_DONATION_PUBLIC_SEARCH_PAGE_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_PAGE_PARAM;
const GET_DONATION_PUBLIC_SEARCH_SIZE_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_SIZE_PARAM;
const GET_DONATION_PUBLIC_SEARCH_SORT_BY_DISTANCE_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_SORT_BY_DISTANCE_PARAM;
const GET_DONATION_PUBLIC_SEARCH_ONLY_PUBLIC_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_ONLY_PUBLIC_PARAM;
const GET_DONATION_PUBLIC_SEARCH_ONLY_PRIVATE_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_ONLY_PRIVATE_PARAM;
const GET_DONATION_PUBLIC_SEARCH_DISTANCE_KM_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_DISTANCE_KM_PARAM;
const GET_DONATION_PUBLIC_SEARCH_SUBCATEGORIES_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_SUBCATEGORIES_PARAM;
const GET_DONATION_PUBLIC_SEARCH_STATES_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_STATES_PARAM;
const GET_DONATION_PUBLIC_SEARCH_CITIES_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_CITIES_PARAM;
const GET_DONATION_PUBLIC_SEARCH_TAGS_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_TAGS_PARAM;
const GET_DONATION_PUBLIC_SEARCH_DONATION_TYPES_PARAM = import.meta.env.VITE_GET_DONATION_PUBLIC_SEARCH_DONATION_TYPES_PARAM;

class DonationService {

    async GetLastDonationPreview() {
        try {
            let donationPreviewData = await apiService.get(GET_DONATION_PREVIEW_LAST_ROUTE);
            return LastDonationPreviewDTO.fromJson(donationPreviewData, true);
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error(error.message));
        }
    }

    async GetAllTags() {
        try {
            let data = await apiService.get(GET_TAG_PUBLIC_ALL_ROUTE);
            return data.map(tagJson => DonationTagDTO.fromJson(tagJson));
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error(error.message));
        }
    }

    async SearchDonations(searchTerm, page, size, donationFilter, states) {
        try {
            const [stateIds, cityIds] = this.#handleStatesCityParams(donationFilter.selectedStates, donationFilter.selectedCities, states);
            const searchDonationParams = this.#handleSearchDonationParams({
                stateIds,
                cityIds,
                donationTypes: donationFilter.donationTypes,
                accessTypes: donationFilter.accessTypes,
                selectedCategories: donationFilter.selectedCategories,
                selectedDistance: donationFilter.selectedDistance,
                itemStates: donationFilter.itemStates,
                orderByDistance: donationFilter.orderByDistance,
                searchTerm,
                page,
                size
            });
            const url = `${GET_DONATION_PUBLIC_SEARCH_ROUTE}?${searchDonationParams.toString()}`;
            let data = await apiService.get(url);
            console.log(data);
            return PagedResult.fromJson(data);
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error(error.message));
        }
    }

    #handleStatesCityParams(selectedStates, selectedCities, states) {
        let stateIds = [];
        let cityIds = [];

        // Normalizar e validar inputs
        const normalizedSelectedStates = Array.isArray(selectedStates) ? selectedStates : [];
        const normalizedSelectedCities = Array.isArray(selectedCities) ? selectedCities : [];
        const normalizedStates = Array.isArray(states) ? states : [];

        // Se não houver estados selecionados, não há filtro de estados/cidades
        if (normalizedSelectedStates.length === 0) {
            return [stateIds, cityIds];
        }

        /**
         * Regra de negócio:
         * 1. Se todas as cidades de um estado estão selecionadas,
         *    então esse estado é enviado em stateIds e nenhuma cidade desse estado é enviada em cityIds.
         * 2. Se o estado estiver selecionado e nenhuma cidade desse estado estiver selecionada,
         *    ignorar esse estado (não envia nem stateId nem cityIds).
         * 3. Se apenas algumas cidades de um estado estão selecionadas,
         *    então esse estado NÃO é enviado em stateIds e as cidades selecionadas são enviadas em cityIds.
         */
        normalizedSelectedStates.forEach(stateId => {
            // Validar que stateId é um número
            if (typeof stateId !== 'number') return;

            // Buscar estado na lista usando stateId (conforme StateMinimalDTO)
            const state = normalizedStates.find(s => s.stateId === stateId);
            if (!state) return; // Estado não encontrado, pular

            // Obter todas as cidades do estado (validando se cities existe e é array)
            const stateCities = Array.isArray(state.cities) ? state.cities : [];
            
            // Se o estado não tem cidades registradas, ignorar (regra 2)
            if (stateCities.length === 0) {
                return;
            }

            // Obter todos os IDs de cidades do estado usando cityId (conforme CityMinimalDTO)
            const allCityIdsInState = stateCities.map(c => c.cityId).filter(id => typeof id === 'number');

            // Obter cidades selecionadas que pertencem a este estado
            const selectedCityIdsInState = normalizedSelectedCities.filter(cityId => 
                typeof cityId === 'number' && allCityIdsInState.includes(cityId)
            );

            // Regra 2: Se nenhuma cidade deste estado foi selecionada, ignorar
            if (selectedCityIdsInState.length === 0) {
                return;
            }

            // Regra 1: Se todas as cidades do estado estão selecionadas, enviar o estado
            if (selectedCityIdsInState.length === allCityIdsInState.length) {
                stateIds.push(stateId);
            } else {
                // Regra 3: Apenas algumas cidades estão selecionadas, enviar as cidades
                cityIds.push(...selectedCityIdsInState);
            }
        });

        return [stateIds, cityIds];
    }

    #handleSearchDonationParams({stateIds, cityIds, donationTypes, accessTypes, 
        selectedCategories, selectedDistance, itemStates, orderByDistance, searchTerm, page, size}) {

        let params = new URLSearchParams();

        // searchTerm
        if (typeof searchTerm === 'string' && searchTerm.trim() !== '') {
            params.append(GET_DONATION_PUBLIC_SEARCH_SEARCH_TERM_PARAM, searchTerm.trim());
        }

        // page
        if (typeof page === 'number' && page >= 0) {
            params.append(GET_DONATION_PUBLIC_SEARCH_PAGE_PARAM, page.toString());
        }

        // size
        if (typeof size === 'number' && size > 0) {
            params.append(GET_DONATION_PUBLIC_SEARCH_SIZE_PARAM, size.toString());
        }

        // donationTypes
        if (Array.isArray(donationTypes) && donationTypes.length > 0) {
            donationTypes.forEach(typeId => {
                const typeOption = DONATION_TYPE_OPTIONS.find(option => option.id === typeId);
                params.append(GET_DONATION_PUBLIC_SEARCH_DONATION_TYPES_PARAM, typeOption.value);
            });
        }

        // accessTypes
        if (Array.isArray(accessTypes) && accessTypes.length > 0) {
            accessTypes.forEach(accessId => {
                const accessOption = ACCESS_TYPE_OPTIONS.find(option => option.id === accessId);
                if(accessOption.value === 'public') {
                    params.append(GET_DONATION_PUBLIC_SEARCH_ONLY_PUBLIC_PARAM, 'true');
                } else if (accessOption.value === 'private') {
                    params.append(GET_DONATION_PUBLIC_SEARCH_ONLY_PRIVATE_PARAM, 'true');
                }
            });
        }

        // selectedDistance
        if (typeof selectedDistance === 'number') {
            const distanceOption = DISTANCE_OPTIONS.find(option => option.id === selectedDistance);
            if (distanceOption) {
                params.append(GET_DONATION_PUBLIC_SEARCH_DISTANCE_KM_PARAM, distanceOption.value.toString());
            }
        }

        // orderByDistance
        if(orderByDistance === true) {
            params.append(GET_DONATION_PUBLIC_SEARCH_SORT_BY_DISTANCE_PARAM, 'true');
        }

        // itemStates
        if (Array.isArray(itemStates) && itemStates.length > 0) {
            itemStates.forEach(tagId => {
                params.append(GET_DONATION_PUBLIC_SEARCH_TAGS_PARAM, tagId.toString());
            });
        }

        // selectedCategories
        if (Array.isArray(selectedCategories) && selectedCategories.length > 0) {
            selectedCategories.forEach(categoryId => {
                params.append(GET_DONATION_PUBLIC_SEARCH_SUBCATEGORIES_PARAM, categoryId.toString());
            });
        }

        // states
        if (Array.isArray(stateIds) && stateIds.length > 0) {
            stateIds.forEach(stateId => {
                params.append(GET_DONATION_PUBLIC_SEARCH_STATES_PARAM, stateId.toString());
            });
        }

        // cities
        if (Array.isArray(cityIds) && cityIds.length > 0) {
            cityIds.forEach(cityId => {
                params.append(GET_DONATION_PUBLIC_SEARCH_CITIES_PARAM, cityId.toString());
            });
        }

        return params;
    }


}

const donationService = new DonationService();
export default donationService;