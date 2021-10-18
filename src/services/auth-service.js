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

    register(first_name, last_name, email, password) {
        return api.post("/users/", {
            first_name,
            last_name,
            email,
            password,
        });
    }
}

export default new AuthService();
