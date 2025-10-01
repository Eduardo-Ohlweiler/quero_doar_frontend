import apiService from "../apiService/apiService.js";
import LastDonationPreviewDTO from "./dto/LastDonationPreviewDTO";
import DonationTagDTO from "./dto/donationTagDTO.js";

//routes import
const GET_DONATION_PREVIEW_LAST_ROUTE = import.meta.env.VITE_GET_DONATION_PREVIEW_LAST_ROUTE || "/donation/preview/last";
const GET_TAG_PUBLIC_ALL_ROUTE = import.meta.env.VITE_GET_TAG_PUBLIC_ALL_ROUTE || "/tag/public/all";

class DonationService {

    async GetLastDonationPreview() {
        try {
            let donationPreviewData = await apiService.get(GET_DONATION_PREVIEW_LAST_ROUTE);
            console.log(donationPreviewData);
            // Usando acceptNulls=true para permitir nulls vindos da API
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
}

const donationService = new DonationService();
export default donationService;