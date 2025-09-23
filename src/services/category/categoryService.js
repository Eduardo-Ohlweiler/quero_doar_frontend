import apiService from "../apiService/apiService";
import VCategoryDonationAvailable from "./dto/vCategoryDonationAvailable";

const GET_CATEGORY_DONATION_AVAILABLE_ROUTE = import.meta.env.VITE_GET_CATEGORY_DONATION_AVAILABLE_ROUTE || "/api/category/donation/available";

class CategoryService {

    async GetCategoriesWithDonationAvailable() {
        try {
            let categoriesData = await apiService.get(GET_CATEGORY_DONATION_AVAILABLE_ROUTE);
            return categoriesData.map(cat => VCategoryDonationAvailable.fromJson(cat));
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error(error.message));
        }
    }
}

const categoryService = new CategoryService();
export default categoryService;