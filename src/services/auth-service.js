import api from "./api";
import TokenService from "./token.service";

class AuthService {
    login(email, password) {
        return api
            .post("/token/", {
                email,
                password
            })
            .then(response => {
                if (response.data.access) {
                    TokenService.setUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        TokenService.removeUser();
    }

    register(email, password) {
        return api.post("/users/", {
            email,
            password
        });
    }
}

export default new AuthService();
