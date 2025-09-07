import { buildLink } from "../util/stringUtil.js";
import apiService from "../apiService/apiService.js";
import VUser from "./view/vUser.js";

//routes import
const GET_USER_VIEW_SEARCH_ROUTE = import.meta.env.VITE_GET_USER_VIEW_SEARCH_ROUTE || "/user/view/search";
const GET_USER_VIEW_SEARCH_USERID_PARAM = import.meta.env.VITE_GET_USER_VIEW_SEARCH_USERID_PARAM || "userId";
const GET_USER_VIEW_SEARCH_EMAIL_PARAM = import.meta.env.VITE_GET_USER_VIEW_SEARCH_EMAIL_PARAM || "email";
const GET_MEDIA_USER_ROUTE = import.meta.env.VITE_GET_MEDIA_USER_ROUTE || "/media/user/";
const GET_MEDIA_USER_DEFAULT_PHOTO = import.meta.env.VITE_GET_MEDIA_USER_DEFAULT_PHOTO || "default.webp";

class UserService {

    async GetUserViewSearch(userId = null, email = null) {
        if (!userId && !email) {
            return Promise.reject(new Error('userId ou email deve ser fornecido'));
        }

        let parameters = {
            [GET_USER_VIEW_SEARCH_USERID_PARAM]: userId,
            [GET_USER_VIEW_SEARCH_EMAIL_PARAM]: email
        };

        let vuser = await apiService.get(
            buildLink(
                [GET_USER_VIEW_SEARCH_ROUTE],
                parameters
            )
        );

        return VUser.fromJson(vuser);
    }

    async GetUserPhoto(filename) {
        if (!filename) {
            filename = GET_MEDIA_USER_DEFAULT_PHOTO;
        }

        let imageBlob = await apiService.get(
            buildLink(
                [GET_MEDIA_USER_ROUTE, filename]
            ),
            { responseType: 'image/webp' }
        );

        return imageBlob;
    }
}

const userService = new UserService();
export default userService;

