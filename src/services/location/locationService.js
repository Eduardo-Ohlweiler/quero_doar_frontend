import apiService from "../apiService/apiService";
import StateMinimalDTO from "./dto/stateMinimal";
import CityMinimalDTO from "./dto/cityMinimal";

const GET_LOCATION_PUBLIC_STATE_MINIMAL_ROUTE = import.meta.env.VITE_GET_LOCATION_PUBLIC_STATE_MINIMAL_ROUTE;
const GET_LOCATION_PUBLIC_STATE_CITIES_MINIMAL_ROUTE = import.meta.env.VITE_GET_LOCATION_PUBLIC_STATE_CITIES_MINIMAL_ROUTE;

class LocationService {
  // Busca a lista de estados com informações mínimas
  async getStatesMinimal() {
    try {
      const data = await apiService.get(GET_LOCATION_PUBLIC_STATE_MINIMAL_ROUTE);
      return data.map(stateData => StateMinimalDTO.fromJson(stateData));
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
      throw error;
    }
  }

    // Busca a lista de cidades para um estado específico com informações mínimas
    async getCitiesByStateMinimal(stateId) {
        try {
            const route = GET_LOCATION_PUBLIC_STATE_CITIES_MINIMAL_ROUTE.replace('{stateId}', stateId);
            const data = await apiService.get(route);
            return data.map(cityData => CityMinimalDTO.fromJson(cityData));
        } catch (error) {
            console.error(`Erro ao buscar cidades para o estado ${stateId}:`, error);
            throw error;
        }
    }
}

const locationService = new LocationService();
export default locationService;
