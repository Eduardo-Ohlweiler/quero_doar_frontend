import apiService from "../apiService/apiService";
import VCategoryDonationAvailable from "./dto/vCategoryDonationAvailable";
import CategoryDTO from "./dto/categoryDTO";

const GET_CATEGORY_DONATION_AVAILABLE_ROUTE = import.meta.env.VITE_GET_CATEGORY_DONATION_AVAILABLE_ROUTE || "/api/category/donation/available";
const GET_CATEGORY_PUBLIC_ALL_ROUTE = import.meta.env.VITE_GET_CATEGORY_PUBLIC_ALL_ROUTE || "/api/category/public/all";

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

    async GetAllCategories() {
        try {
            let categoriesData = await apiService.get(GET_CATEGORY_PUBLIC_ALL_ROUTE);
            return categoriesData.map(cat => CategoryDTO.fromJson(cat));
        } catch (error) {
            console.error(error);
            return Promise.reject(new Error(error.message));
        }
    }

}

const categoryService = new CategoryService();
export default categoryService;