import { buildLink } from "../util/stringUtil.js";
import apiService from "../apiService/apiService.js";
import VUser from "./view/vUser.js";
import VUserExperienceLastMonth from "./dto/VUserExperienceLastMonth.js";

//routes import
const GET_USER_VIEW_SEARCH_ROUTE = import.meta.env.VITE_GET_USER_VIEW_SEARCH_ROUTE || "/user/view/search";
const GET_USER_VIEW_SEARCH_USERID_PARAM = import.meta.env.VITE_GET_USER_VIEW_SEARCH_USERID_PARAM || "userId";
const GET_USER_VIEW_SEARCH_EMAIL_PARAM = import.meta.env.VITE_GET_USER_VIEW_SEARCH_EMAIL_PARAM || "email";
const GET_MEDIA_USER_ROUTE = import.meta.env.VITE_GET_MEDIA_USER_ROUTE || "/media/user/";
const GET_MEDIA_USER_DEFAULT_PHOTO = import.meta.env.VITE_GET_MEDIA_USER_DEFAULT_PHOTO || "default.webp";
const GET_USER_PUBLIC_HALL_OF_FAME_ROUTE = import.meta.env.VITE_GET_USER_PUBLIC_HALL_OF_FAME_ROUTE || "/api/user/public/hall-of-fame";

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

    /**
     * @obsolete Fotos do usuário agora são publicas e podem ser acessadas diretamente pela URL
     */
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

    async CreateUser(userData) {
        if (!userData || !userData.name || !userData.email || !userData.password) {
            return Promise.reject(new Error('Dados incompletos para criação de usuário'));
        }
        return apiService.post(
            "/user",
            { name: userData.name, email: userData.email, password: userData.password }
        );
    }

    /**
     * Busca os usuários com mais experiência no último mês.
     */
    async GetHallOfFame(top = 3) {
        if (top <= 0) {
            return Promise.reject(new Error('O número de usuários deve ser maior que zero'));
        }
        let users = await apiService.get(
            buildLink(
                [GET_USER_PUBLIC_HALL_OF_FAME_ROUTE, top.toString()]
            )
        );
        return users.map(user => VUserExperienceLastMonth.fromJson(user));
    }
}

const userService = new UserService();
export default userService;

